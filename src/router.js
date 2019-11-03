// @ts-check
import Vue from 'vue'
import Router from 'vue-router'
// import Snackbar from './APIs/snackbar'
// import { siteTitle } from './strings'
// import store from './store'
import HelloWorld from "@/components/HelloWorld";

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '/group/:id',
    //   name: 'GroupDiscussion',
    //   component: () =>
    //     import(
    //       /* webpackChunkName: "Group" */ './components/GroupDisccussion.vue'
    //     ),
    // },
    {
      path: '/',
      name: 'HelloWorld',
      component: () => import( HelloWorld ),
    },
  ],
})
//
// router.beforeEach((to, from, next) => {
//   const loggedIn = !!store.getters.loggedIn
//   if (!loggedIn && !to.matched.some(record => record.meta.noAuthRequired)) {
//     Snackbar.emitsInfo(`欢迎来到${siteTitle}。要继续访问此内容，请先登录。`)
//     next({ name: 'Login', query: { redirect: to.path } })
//   } else {
//     next()
//   }
// })

export default router
