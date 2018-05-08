// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import store from '@/store/index'
import Vue from 'vue';
import App from './App';
import currency from './filters/currency'

Vue.config.productionTip = false;
Vue.filter('currency', currency);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App },
});
