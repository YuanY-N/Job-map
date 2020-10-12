import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  signedIn: false,
  user: null
}

const mutations = {
  SET_LOGGED_IN(state, value) {
    state.signedIn = value
  },
  SET_USER(state, user) {
    console.log(user)
    state.user = user
  }
}

const actions = {
  fetchUser({ commit }, user) {
    commit('SET_LOGGED_IN', user !== null)
    if (user) {
      commit('SET_USER', {
        ...user
      })
    } else {
      commit('SET_USER', null)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
