import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import { firestorePlugin } from 'vuefire'
import VueAnalytics from 'vue-analytics'
import * as GmapVue from 'vuegm'
import './db.js'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon

Vue.use(ElementUI, { locale })

Vue.use(firestorePlugin)

Vue.use(VueAnalytics, {
  id: 'UA-98797058-7',
  router
})

Vue.use(GmapVue, {
  load: {
    key: 'AIzaSyDWHURbFp74zNUYjw6ahdEXXkJE_QWSAV4',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    region: 'US',
    language: 'en'
  },
  installComponents: true
})

Vue.config.productionTip = false

firebase.auth().onAuthStateChanged(function(user) {
  store.dispatch('user/fetchUser', user)
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
