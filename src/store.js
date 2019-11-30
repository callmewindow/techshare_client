// @ts-check
import Vue from 'vue'
import Vuex from 'vuex'
import { siteTitleInFull } from './strings'
import axios from 'axios'
import * as ReportAPI from './APIs/report'

Vue.use(Vuex)

export default new Vuex.Store({
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
