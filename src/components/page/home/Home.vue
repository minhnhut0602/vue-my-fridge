<template>
  <b-container fluid class="animated fadeIn home-container">
    <!-- User Interface controls -->
    <b-row>
      <b-col md="6">
        <b-form-group horizontal label="Filter" class="mb-0">
          <b-input-group>
            <b-form-select v-model="filter" :options="filterFoodTypes">
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col md="6">
        <div class="text-center">
          <b-button variant="danger">
            <b-badge variant="light" class="expired-badge">{{numberOfExpiredFilteredItems}}</b-badge> expired items
          </b-button>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <line-chart :chart-data="getLineChartCollection"></line-chart>
    </b-row>

    <!-- Main table element -->
    <b-table show-empty
             stacked="md"
             :items="items"
             :fields="fields"
             :current-page="currentPage"
             :per-page="perPage"
             :filter="filter"
             :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc"
             :sort-direction="sortDirection"
             @filtered="onFiltered">
    </b-table>

    <b-row>
      <b-col md="6" class="my-1">
        <b-pagination :total-rows="getTotalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import moment from 'moment';
  import { mapGetters, mapActions } from 'vuex';
  import LineChart from '@/utils/charts/LineChart.js';
  export default {
    name: 'c-home',
    components: {
      LineChart
    },
    computed: {
      filterFoodTypes () {
        return this.items
          .map(f => { return { text: f.type, value: f.type }; })
          .filter((obj, pos, arr) => {
            return arr.map(mapObj => mapObj['text']).indexOf(obj['text']) === pos;
          }).sort(function (a, b) {
            return a.text < b.text ? -1 : 1;
          });
      },
      getTotalRows () {
        return this.totalRows || this.items.length;
      },
      getLineChartCollection () {
        return this.lineChartDataCollection;
      },
      numberOfExpiredFilteredItems () {
        const now = moment();
        return this.items.filter(i => {
          const expirationItem = moment(i.expirationDate, 'MM/DD/YYYY');
          return i.type === this.filter && expirationItem.isBefore(now);
        }).length;
      },
      ...mapGetters('foods', {
        items: 'getFoods'
      })
    },
    created () {
      this.fetchFoods();
    },
    mounted () {
      this.setDefaultFilter();
      this.renderChart();
    },
    data () {
      return {
        fields: [
          { key: 'name', label: 'Name' },
          { key: 'type', label: 'Type', sortable: true },
          { key: 'expirationDate', label: 'Expiration Date', sortable: true }
        ],
        currentPage: 1,
        perPage: 5,
        pageOptions: [ 5, 10, 15 ],
        sortBy: null,
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        totalRows: null,
        lineChartDataCollection: null
      };
    },
    methods: {
      renderChart () {
        this.groupFoodsByDate().then(result => {
          this.collectChartFoodItems(result);
        }).catch(error => {
          console.log('error=', error);
        });
      },
      groupFoodsByDate () {
        const now = moment();
        return new Promise((resolve, reject) => {
          if (this.items) {
            const group = {};
            this.items.filter(i => {
              const expirationItem = moment(i.expirationDate, 'MM/DD/YYYY');
              return i.type === this.filter && expirationItem.isBefore(now);
            }).forEach(i => {
              const d = i.expirationDate;
              group[d] = group[i.expirationDate] || [];
              group[d].push(i);
            });
            resolve(group);
          } else {
            const error = new Error('not found!');
            reject(error);
          }
        });
      },
      collectChartFoodItems (groupByDate) {
        this.lineChartDataCollection = {
          datasets: [
            {
              label: '',
              borderColor: '#f87979',
              borderWidth: 1,
              backgroundColor: 'white',
              data: []
            }
          ]
        };
        this.lineChartDataCollection.labels = [];
        const dataset = this.lineChartDataCollection.datasets[0];
        dataset.label = this.filter; // current filter foods type
        console.log('groupByDate=', groupByDate);
        // get labels by date
        const orderedGroupByDate = {};
        Object.keys(groupByDate).sort().forEach((key) => {
          orderedGroupByDate[key] = groupByDate[key];
        });

        for (let key in orderedGroupByDate) {
          if (orderedGroupByDate.hasOwnProperty(key)) {
            this.lineChartDataCollection.labels.push(key);
            console.log('key=', key);
            console.log('orderedGroupByDate[key]=', orderedGroupByDate[key].length);
            dataset.data.push(orderedGroupByDate[key].length);
          }
        }
      },
      setDefaultFilter () {
        if (!this.filter) {
          this.filter = this.filterFoodTypes[0].text;
        }
      },
      onFiltered (filteredItems) {
        this.totalRows = filteredItems.length;
        this.currentPage = 1;
        this.renderChart();
      },
      ...mapActions('foods', {
        fetchFoods: 'fetchFoods'
      })
    }
  };
</script>
