import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import realTimeSale from '@/components/realTimeSale'
import history from '@/components/history'
import everyReport from '@/components/everyReport'
import stock from '@/components/stock'
import maoriSale from '@/components/maoriSale'
import maoriCategory from '@/components/maoriCategory'
import maoriStore from '@/components/maoriStore'
import maoriStoreCtn from '@/components/maoriStoreCtn'
import loss from '@/components/loss'
import login from '@/components/login'
import realTimeCotegoryDetail from '@/components/realTimeCotegoryDetail'
import maoriCotegoryDetail from '@/components/maoriCotegoryDetail'
import defaultPage from '@/components/defaultPage/defaultPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'login'
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/realTimeSale',
      name: 'realTimeSale',
      component: realTimeSale
    },
    {
      path: '/history',
      name: 'history',
      component: history
    },
    {
      path: '/everyReport',
      name: 'everyReport',
      component: everyReport
    },
    {
      path: '/stock',
      name: 'stock',
      component: stock
    },
    {
      path: '/maoriSale',
      name: 'maoriSale',
      component: maoriSale,
      meta:{keepAlive: true}
    },
    {
      path: '/maoriCategory',
      name: 'maoriCategory',
      component: maoriCategory
    },
    {
      path: '/maoriStore',
      name: 'maoriStore',
      component: maoriStore,
    },
    {
      path: '/maoriStoreCtn',
      name: 'maoriStoreCtn',
      component: maoriStoreCtn
    },
    {
      path: '/loss',
      name: 'loss',
      component: loss
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/realTimeCotegoryDetail',
      name: 'realTimeCotegoryDetail',
      component: realTimeCotegoryDetail,
    },
    {
      path: '/maoriCotegoryDetail',
      name: 'maoriCotegoryDetail',
      component: maoriCotegoryDetail
    },
    {
      path: '/defaultPage',
      name: 'defaultPage',
      component: defaultPage
    },
  ]
})
