import firebase from '@firebase/app'
require('firebase/auth')
require('firebase/database')
require('firebase/storage')

class Ad {
  constructor (title, subtitle, descriptions, show = false, img = '', id= '', ownId = '') {
    this.title = title
    this.subtitle = subtitle
    this.descriptions = descriptions
    this.show = show
    this.ownId = ownId
    this.img = img
    this.id = id
  }
}

export default {
  state: {
    ads: []
  },
  mutations: {
    createAd (state, payload) {
      state.ads.push(payload)
    },
    stateAds (state, payload) {
      state.ads = payload
    },
    updateAd (state, payload) {
      const ad = state.ads.find(a => {
        return a.id === payload.id
      })
      ad.title = payload.title
      ad.subtitle = payload.subtitle
      ad.descriptions = payload.descriptions
    }
  },
  actions: {
    async createAd ({ commit, getters }, payload) {
      commit('clearError')
      commit('setLoading', true)
      const img = payload.img
      try {
        const newAd = new Ad(
          payload.title,
          payload.subtitle,
          payload.descriptions,
          payload.show,
          payload.img,
          'sad',
          getters.user.id
        )
        const ad = await firebase.database().ref('ads').push(newAd)
        console.log(newAd)
        const imageName = img.name
        const fileData = await firebase.storage().ref('ads/' + ad.key + '/' + imageName).put(img)
        const imageSrc = await fileData.ref.getDownloadURL()
        await firebase.database().ref('ads').child(ad.key).update({
          img: imageSrc
        })
        commit('createAd', {
          ...newAd,
          ownId: getters.user.id,
          img: imageSrc,
          id: ad.key
        })

        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async fetchEds ({ commit }) {
      commit('clearError')
      commit('setLoading', true)
      const resultAds = []
      try {
        const fbVal = await firebase.database().ref('ads').once('value')
        const ads = fbVal.val()
        Object.keys(ads).forEach(key => {
          const ad = ads[key]
          resultAds.push(
            new Ad(
              ad.title,
              ad.subtitle,
              ad.descriptions,
              ad.show,
              ad.img,
              key,
              ad.ownId
            )
          )
        })
        commit('stateAds', resultAds)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async updateAd ({ commit }, payload) {
      commit('clearError')
      commit('setLoading', true)
      try {
        await firebase.database().ref('ads').child(payload.id).update({
          title: payload.title,
          subtitle: payload.subtitle,
          descriptions: payload.descriptions
        })
        commit('updateAd', payload)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    }
  },
  getters: {
    ads (state) {
      return state.ads
    },
    myAds (state, getters) {
      return state.ads.filter(ad => {
        return ad.ownId === getters.user.id
      })
    },
    adById (state) {
      return adId => {
        return state.ads.find(ad => ad.id === adId)
      }
    }
  }
}
