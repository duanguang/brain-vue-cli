import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/app1/components/Hello';

Vue.use(Router)

export default new Router({
  history: true,
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
  ]
})
