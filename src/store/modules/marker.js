import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  markers: []
}

const mutations = {
  SET_MARKERS(state, markers) {
    state.markers = markers
  }
}

const actions = {
  fetchMarkers({ commit }, markers) {
    commit('SET_MARKERS', markers)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
