import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import login from '@/components/login'
import part1 from '@/components/myAppContent/part1'
import part1Hello from '@/components/myAppContent/part1/Hello'
import part1HelloWorld from '@/components/myAppContent/part1/HelloWorld'
import part2 from '@/components/myAppContent/part2'
import moveStar from '@/components/myAppContent/part2/moveStar'
import canvasClock from '@/components/myAppContent/part2/canvasClock'
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
          path: '/index/part1',
          component: part1,
          children: [
            {
              path: '/index/part1/HelloWorld',
              component: part1HelloWorld,
            },
            {
              path: '/index/part1/Hello',
              component: part1Hello,
            }
          ]
        },
        {
          path: '/index/part2',
          component: part2,
          children: [
            {
              path: '/index/part2/canvasClock',
              component: canvasClock,
            },
            {
              path: '/index/part2/moveStar',
              component: moveStar,
            }
          ]
        }
      ]
    }
  ]
})
