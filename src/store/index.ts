import Vue from 'vue'
import Vuex from 'vuex'
import { appStore } from './modules'

Vue.use(Vuex)

const storeOptions: lp.StoreOptions = {
  state: {
    userInfo: {}
  },
  getters: {
    userInfo: (state: any) => state.userInfo
  },
  mutations: {
    update_userInfo (state: any, params: object) {
      state.userInfo = params
    }
  },
  actions: {
    update_userInfo (context: any, params: object) {
      console.log(context)
      context.commit('update_userInfo', params)
    }
  },
  modules: {
    appStore
  }
}

const store = new Vuex.Store(storeOptions)

export default store
