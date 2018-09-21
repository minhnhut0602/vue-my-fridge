import '@babel/polyfill';
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import router from './router';
import store from './store';
import App from './components/App.vue';

Vue.use(BootstrapVue);

Vue.config.productionTip = false;
Vue.prototype.$bus = new Vue();

new Vue({
  render: h => h(App),
  router,
  store
}).$mount(`#app`);
