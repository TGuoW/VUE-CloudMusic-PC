import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import mainBody from '@/components/mainBody'
import asa from '@/components/retail/asa'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'link-active',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/mainBody',
      name: 'mainBody',
      component: mainBody
    },
    {
      path: '/asa',
      name: 'asa',
      component: asa
    }
  ]
})
