// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import lrz from 'lrz'
Vue.prototype.$axios = Axios;
import global from './assets/public/Global'//引用文件

Axios.defaults.baseURL = '/api';
Axios.defaults.headers.post['Content-Type'] = 'application/json';
Vue.config.productionTip = false;
Vue.prototype.GLOBAL = global;//挂载到Vue实例上面
import rem from './assets/js/rem';
import VueJsonp from 'vue-jsonp';
import wx from 'weixin-js-sdk';
Vue.use(VueJsonp)
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap,{
  ak:'7FmBTb8X2NelWLDNGQC6NLbvHqsjzsOe'//自己去百度API申请，免费的
})
import $ from 'jquery';
rem();
import VueWechatTitle from 'vue-wechat-title'
Vue.use(VueWechatTitle)
// import router from "./router.js"    // import router 的router 一定要小写， 不要写成Router, 否则报 can't match的报错


// 设置浏览器标题
Vue.directive('title', {
    inserted: function (el, binding) {
        document.title = '俱乐部'
    }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
