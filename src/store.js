import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: null
  },
  getters: {
    getToken (state) {
      return state.token
    }
  },
  mutations: {
    mutToken (state, payload) {
      state.token = payload
    }
  }
})

export default store;