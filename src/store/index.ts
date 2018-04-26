import Vue from 'vue'
import Vuex from 'vuex'
import { appStore } from './modules'

Vue.use(Vuex)

const storeOptions: lp.StoreOptions = {
  modules: {
    appStore
  }
}

const store = new Vuex.Store(storeOptions)

export default store
