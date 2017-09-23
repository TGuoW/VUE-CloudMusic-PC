import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import information from '@/components/retail/information'
import findMusic from '@/components/findMusic'
import recommend from '@/components/findMusic/recommend'
import songList from '@/components/findMusic/songList'
import transceiver from '@/components/findMusic/transceiver'
import rank from '@/components/findMusic/rank'
import singer from '@/components/findMusic/singer'
import newMusic from '@/components/findMusic/newMusic'
import FM from '@/components/FM/FM'
import MV from '@/components/MV/MV'
import asa from '@/components/retail/asa'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'link-active',
  routes: [
    {
      path: '/',
      redirect: '/findMusic'
    },
    {
      path: '/he',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/information',
      name: 'information',
      component: information
    },
    {
      path: '/FM',
      name: 'FM',
      component: FM
    },
    {
      path: '/MV',
      name: 'MV',
      component: MV
    },
    {
      path: '/findMusic',
      name: 'findMusic',
      component: findMusic,
      children: [
        {
          path: '/findMusic/',
          redirect: '/findMusic/recommend'
        },
        { path: '/findMusic/he',
          component: Hello
        },
        {
          path: '/findMusic/recommend',
          name: 'recommend',
          component: recommend
        },
        {
          path: '/findMusic/songList',
          name: 'songList',
          component: songList
        },
        {
          path: '/findMusic/transceiver',
          name: 'transceiver',
          component: transceiver
        },
        {
          path: '/findMusic/rank',
          name: 'rank',
          component: rank
        },
        {
          path: '/findMusic/singer',
          name: 'singer',
          component: singer
        },
        {
          path: '/findMusic/newMusic',
          name: 'newMusic',
          component: newMusic
        }
      ]
    },
    {
      path: '/asa',
      name: 'asa',
      component: asa
    }
  ]
})
