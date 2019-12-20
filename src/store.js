import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    email: '847590417@qq.com',
    frontIP: 'http://211.159.161.35',
    userId: '5dfb6f6fa227d8d43693ca43',
    expertId: '5dfb710af91085db2d0bfbe4',
    messageNum: 0,
    messages:[],
    identity: 'admin',
  }
})
