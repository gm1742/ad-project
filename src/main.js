import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { firebase } from '@firebase/app'
import vuetify from './plugins/vuetify'
import Buy from './components/ads/Buy'

Vue.config.productionTip = false
Vue.component('app-by-modal', Buy)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyAa28zVMT65wEuBp4TWd4OwNr0ZWlcfq6U',
      authDomain: 'login-91da1.firebaseapp.com',
      databaseURL: 'https://login-91da1-default-rtdb.firebaseio.com/',
      projectId: 'login-91da1',
      storageBucket: 'login-91da1.appspot.com',
      messagingSenderId: '792941361274',
      appId: '1:792941361274:web:67dcaa9e97ff4c63c123c3'
    })
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })
    this.$store.dispatch('fetchEds')
  }
}).$mount('#app')
