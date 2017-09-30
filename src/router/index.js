import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import information from '@/components/detail/information'
import findMusic from '@/components/findMusic'
import recommend from '@/components/findMusic/recommend'
import songList from '@/components/findMusic/songList'
import transceiver from '@/components/findMusic/transceiver'
import rank from '@/components/findMusic/rank'
import singer from '@/components/findMusic/singer'
import newMusic from '@/components/findMusic/newMusic'
import FM from '@/components/FM/FM'
import MV from '@/components/MV/MV'
import featuredMV from '@/components/MV/featuredMV'

import allMV from '@/components/MV/allMV'
import asa from '@/components/detail/asa'

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
      component: MV,
      children: [
        {
          path: '',
          redirect: 'featuredMV'
        },
        {
          path: 'featuredMV',
          component: featuredMV
        },
        {
          path: 'allMV',
          component: allMV
        }
      ]
    },
    {
      path: '/findMusic',
      name: 'findMusic',
      component: findMusic,
      children: [
        {
          path: '',
          redirect: 'recommend'
        },
        { path: '/findMusic/he',
          component: Hello
        },
        {
          path: 'recommend',
          name: 'recommend',
          component: recommend
        },
        {
          path: 'songList',
          name: 'songList',
          component: songList
        },
        {
          path: 'transceiver',
          name: 'transceiver',
          component: transceiver
        },
        {
          path: 'rank',
          name: 'rank',
          component: rank
        },
        {
          path: 'singer',
          name: 'singer',
          component: singer
        },
        {
          path: 'newMusic',
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
