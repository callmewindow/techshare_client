import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: 'Home'
    },
    {
      path: '/Home',
      name: 'Home',
      component: () =>
        import('./components/Home.vue'),
    },
    {
      path: '/Search',
      name: 'Search',
      component: () =>
        import('./components/Search.vue'),
    },
    {
      path: '/Login',
      name: 'Login',
      component: () =>
        import('./components/LoginTemp.vue'),
    },
    {
      path: '/User',
      name: 'User',
      component: () =>
        import('./components/User.vue'),
    },
    {
      path: '/Expert/:id',
      name: 'Expert',
      component: () =>
        import('./components/Expert.vue'),
    },
    {
      path: '/paperdetail/:id',
      name: 'paperdetail',
      component: () =>
        import('./components/PaperDetail.vue'),
    },
    {
      path: '/patentdetail/:id',
      name: 'patentdetail',
      component: () =>
        import('./components/PatentDetail.vue'),
    },
    {
      path: '/AddInfo',
      name: 'AddInfo',
      component: () =>
        import('./components/AddInfo.vue'),
    },
    {
      path: '/ExpertApp',
      name: 'ExpertApp',
      component: () =>
        import('./components/ExpertApp.vue'),
    },
    {
      path: '/Approve',
      name: 'Approve',
      component: () =>
        import('./components/Approve.vue'),
    }
  ],
})

export default router
