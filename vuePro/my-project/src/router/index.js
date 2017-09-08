import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import HelloWorld from '@/components/HelloWorld'
import index from '@/components/index'
import login from '@/components/login'
Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/',
      component: login,
    },
    {
      path: '/login',
      component: login,
    },
    {
      path: '/index',
      component: index,
      children: [
        {
          path: '/index/HelloWorld',
          component: HelloWorld,
        },
        {
          path: '/index/Hello',
          component: Hello,
        }
      ]
    }
  ]
})
