import Vue from 'vue'
import Vuex from 'vuex'
import { appStore } from './modules'

Vue.use(Vuex)

const storeOptions: lp.StoreOptions = {
  state: {
    userInfo: {},
    topAnimation: 'fade',
    routeInfo: {}
  },
  getters: {
    userInfo: (state: any) => state.userInfo,
    topAnimation: (state: any) => state.topAnimation,
    routeInfo: (state: any) => state.routeInfo
  },
  mutations: {
    update_userInfo: (state: any, params: object) => state.userInfo = params,
    update_topAnimation: (state: any, params: String) => state.topAnimation = params,
    update_routeInfo: (state: any, params: object) => state.routeInfo = params
  },
  actions: {
    update_userInfo: (context: any, params: object) => context.commit('update_userInfo', params),
    update_topAnimation: (context: any, params: String) => context.commit('update_topAnimation', params),
    update_routeInfo: (context: any, params: object) => context.commit('update_routeInfo', params)
  },
  modules: {
    appStore
  }
}

const store = new Vuex.Store(storeOptions)

export default store
