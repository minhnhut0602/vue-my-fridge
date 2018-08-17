import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const Home = () => import(`@/components/page/home/Home.vue`);

export default new VueRouter({
  routes: [
    {
      name: `home`,
      path: `/`,
      component: Home
    }
  ],
  mode: `history`
});
