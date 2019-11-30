import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
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
      name: 'Home',
      component: () =>
        import('./components/Home.vue'),
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: () =>
        import('./components/HelloWorld.vue'),
    },
    {
      path: '/Navigator',
      name: 'Navigator',
      component: () =>
        import('./components/Navigator.vue'),
    },
  ],
})


export default router
