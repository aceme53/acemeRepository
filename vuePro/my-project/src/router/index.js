import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import HelloWorld from '@/components/HelloWorld'
import index from '@/components/index'
Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: index,
    },
    {
      path: '/Hello',
      name: 'Hello',
      component: Hello,
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/index',
      name: 'index',
      component: index,
    }
  ]
})
