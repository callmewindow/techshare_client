import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Home',
    //   component: () =>
    //     import(/* webpackChunkName: "Home" */ './views/Home.vue'),
    //   meta: { noAuthRequired: true },
    // },
    // {
    //   path: '/entry/:id',
    //   name: 'Entry',
    //   component: () =>
    //     import('./views/Entry.vue'),
    // },
    {
      path: '/',
      redirect: 'home'
    },
    {
      path: '/Home',
      name: 'Home',
      component: () =>
        import('./components/Home.vue'),
    },
    {
      path: '/User',
      name: 'User',
      component: () =>
        import('./components/User.vue'),
    },
    {
      path: '/Expert',
      name: 'Expert',
      component: () =>
        import('./components/Expert.vue'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/ExpertApp',
      name: 'ExpertApp',
      component: () =>
        import('./components/ExpertApp.vue'),
    },
    {
      path: '/Login',
      name: 'Login',
      component: () =>
        import('./components/LoginTemp.vue'),
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
      path: '/Search',
      name: 'Search',
      component: () =>
        import('./components/Search.vue'),
    },
    {
      path: '/Navigator',
      name: 'Navigator',
      component: () =>
        import('./components/Navigator.vue'),
    },

    {
      path: '/wyx',
      name: 'wyx',
      component: () =>
        import('./temp/wyx.vue'),
    },
    {
      path: '/zlx',
      name: 'zlx',
      component: () =>
        import('./temp/zlx.vue'),
    },
    {
      path: '/jcy',
      name: 'jcy',
      component: () =>
        import('./temp/jcy.vue'),
    },
    {
      path: '/zcx',
      name: 'zcx',
      component: () =>
        import('./temp/zcx.vue'),
    },
  ],
})

export default router
