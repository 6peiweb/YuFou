const appStore = {
  state: {
    count: 0,
    item: []
  },
  getters: {
    rest: (state: any) => state.item
  },
  mutations: {
    increment (state: any, str: string) {
      state.count ++
      state.item.push(state.count)
      state.item.push(str)
    }
  },
  actions: {
    increment (context: any, params: any) {
      console.log(context)
      context.commit('increment', params)
    }
  }
}

export default appStore
