import firebase from '@firebase/app'
require('firebase/auth')
require('firebase/database')
require('firebase/storage')

class Order {
  constructor (name, phone, adId, id = null) {
    this.name = name
    this.phone = phone
    this.adId = adId
    this.id = id
  }
}
export default {
  state: {
    orders: []
  },
  mutations: {
    createOrder (state, payload) {
      state.orders.push(payload)
    },
    loadOrders (state, payload) {
      state.orders = payload
    }
  },
  actions: {
    async createOrder ({ commit, getters }, { name, phone, adId, ownId }) {
      commit('setLoading', true)
      commit('clearError')
      const order = new Order(name, phone, adId)
      console.log(order)

      try {
        await firebase.database().ref(`/users/${ownId}/orders`).push(order)
        commit('createOrder', order)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async fetchOrders ({ commit, getters }) {
      const resultOrders = []
      commit('setLoading', true)
      commit('clearError')
      try {
        const fbVal = await firebase.database().ref('/users/' + getters.user.id + '/orders').once('value')
        const orders = fbVal.val()
        Object.keys(orders).forEach(key => {
          const o = orders[key]
          resultOrders.push(
            new Order(o.name, o.phone, o.adId, key)
          )
        })
        commit('loadOrders', resultOrders)
        commit('setLoading', false)
      } catch (error) {
        console.log(error)
        commit('setLoading', false)
        commit('setError', error.message)
      }
    }
  },
  getters: {
    orders (state) {
      return state.orders
    }
  }
}
