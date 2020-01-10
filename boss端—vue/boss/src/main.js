// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible'
import './base/reset.css'
import Vant from 'vant';
import 'vant-css/lib/index.css';
import 'vant/lib/index.css'
import echarts from 'echarts'
import FastClick from 'fastclick'
import filters from './assets/js/formatMoney';
import store from './store/index';

Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

FastClick.attach(document.body);
Vue.prototype.$echarts = echarts;
Vue.use(Vant);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
