import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    email: '847590417@qq.com',
    frontIP: 'http://211.159.161.35',
    userId: 'null',
    expertId: 'null',
    messageNum: 0,
    messages:[],
    identity: 'user',
  }
})
