// @ts-check
import Vue from 'vue'
import Vuex from 'vuex'
import { siteTitleInFull } from './strings'
import axios from 'axios'
import * as ReportAPI from './APIs/report'

Vue.use(Vuex)

export default new Vuex.Store({//存储用户的状态
  state: {
    title: siteTitleInFull,
    jwkToken: 'null',
    username: 'null',
    avatarUrl: null,
    navImg: '',
    snackbar: {
      display: false,
      content: '',
      color: 'info',
    },
    isAdmin: false,
  },
  mutations: {
    updateNavTitle(state, title) {
      state.title = title
    },

    updateJwkToken(state, token) {
      state.jwkToken = token
    },

    updateUsername(state, username) {
      state.username = username
    },

    updateAdmin(state, newVal) {
      state.isAdmin = newVal
    },

    updateAvatarUrl(state, url) {
      state.avatarUrl = url
    },

    /**
     * When the option is not specified, then the function defaultedly assumes that a snackbar is to be
     * displayed, and hence you must provide a `content` and a `color` option. Otherwise the function
     * will throw an exception. When no option is provided, then the function will hide the current
     * snackbar.
     */
    updateSnackbar(state, option) {
      state.snackbar.display = false
      if (option != null) {
        if (option.content == undefined || option.color == undefined)
          throw new Error('Incorrect parameters in the option provided.')
        setTimeout(() => {
          state.snackbar.display = true
          state.snackbar.content = option.content
          state.snackbar.color = option.color
        }, 100)
      }
    },

    updateNavImg(state, img) {
      state.navImg = img
    },
  },
  actions: {
    updateNotifications() {},

    updateNavTitle(context, value) {
      context.commit('updateNavTitle', value)
    },

    updateAdmin(context, newVal) {
      context.commit('updateAdmin', newVal)
    },

    async setJwkTokenAndUsername(context, payload) {
      const updateToken = token => {
        context.commit('updateJwkToken', token)
        localStorage.setItem('jwk', token)
      }
      const updateUsername = username => {
        context.commit('updateUsername', username)
        localStorage.setItem('username', username)
      }
      const updateAdmin = newVal => {
        context.commit('updateAdmin', newVal)
        localStorage.setItem('isAdmin', newVal)
      }
      const logout = () => {
        updateToken('none')
        updateUsername('none')
        updateAdmin('none')
        axios.defaults.headers.common = {}
      }
      const loadAdmin = async function() {
        const adminResponse = await ReportAPI.isCurrentUserAdmin()
        const isAdmin = adminResponse.data
        context.commit('updateAdmin', isAdmin)
      }

      if (payload === undefined) {
        // Load stored token and username
        const localToken = localStorage.getItem('jwk')
        if (!localToken || !localToken.length || localToken === 'null') {
          logout()
          return
        }
        const localUsername = localStorage.getItem('username')
        updateToken(localToken)
        updateUsername(localUsername)
        axios.defaults.headers.common = { Authorization: localToken }
        await loadAdmin()
      } else if (payload === null) {
        // Seen as logging out
        logout()
      } else {
        const { token, username } = payload
        updateToken(token)
        updateUsername(username)
        axios.defaults.headers.common = { Authorization: token }
        await loadAdmin()
      }
    },

    setNavImg(context, img) {
      context.commit('updateNavImg', img)
    },

    setAvatarUrl(context, url) {
      context.commit('updateAvatarUrl', url)
    },
  },
  getters: {
    loggedIn: state => state.jwkToken && state.jwkToken !== 'none',
  },
})
