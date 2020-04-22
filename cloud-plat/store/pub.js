export const state = () => ({
  listdata: {},
  loading: { fetch: false }
})

export const mutations = {
  setLoading(state, payload) {
    state.loading = {
      ...state.loading,
      ...payload
    }
  },
  setListdata(state, listdata) {
    state.listdata = listdata
    console.log( state.listdata)
  },
  updateListdata(state, listdata) {
    state.listdata = listdata
  }
}

export const actions = {
  // 获取文档列表
  async listdata({ commit }, payload) {
    commit('setLoading', { fetch: true })
    const resp = await this.$service.pub.listdata(payload)
    console.log('listdata query', resp)
    if (resp.code === 0) {
      commit('setListdata', resp.info.data)
    }
    commit('setLoading', { fetch: false })
  }


}
