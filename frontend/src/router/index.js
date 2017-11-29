import Vue from 'vue'
import Router from 'vue-router'
import user from '@/store/user'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/chat',
      name: 'chat',
      component: require('@/components/TheMainPanel.vue').default
    },
    {
      path: '/home',
      name: 'home',
      component: require('@/components/TheHome.vue').default
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    if (user.name === '') {
      next('/home')
    } else {
      next('/chat')
    }
  } else {
    next()
  }
})

export default router
