import { clearUserInfo, getUserInfo } from '@/utils/authority'
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
  updateListdata(state, data) {
    state.listdata = data
    console.log(state)
    this.$router.push('/order/editorder')
  }
}

export const actions = {
  // 获取服务列表
  // eslint-disable-next-line require-await
  async listdata({ commit }, payload) {
    commit('setLoading', { fetch: true })
    const resp = await this.$service.svr.listdata(payload)
    console.log(resp)
    if (resp.code === 200) {
      const arr = resp.data.info
      for (let i = 0; i < arr.length; i++) {
        if(arr[i].status ===  1){
          resp.data.info[i].statusName = '已上线'
        }else if(arr[i].status ===  2){
          resp.data.info[i].statusName = '待上线'
        }else if(arr[i].status ===  3){
          resp.data.info[i].statusName = '已下线'
        }else if(arr[i].status ===  4){
          resp.data.info[i].statusName = '已关闭'
        }
      }
      for (let j = 0; j < arr.length; j++) {
        if(arr[j].state === 1){
          resp.data.info[j].stateName = '审核通过'
        }else if(arr[j].state === 2){
          resp.data.info[j].stateName = '审核中'
        }else if(arr[j].state === 3){
          resp.data.info[j].stateName = '审核未通过'
        }else if(arr[j].state === 4){
          resp.data.info[j].stateName = '已关闭'
        }
      }
      commit('setListdata', resp.data)
    }else if(resp.code === 0){
      clearUserInfo()
      this.$router.push('/user/login')
    }
    commit('setLoading', { fetch: false })
  },

  async register({ commit }, { payload, callback }) {
    const username = JSON.parse(getUserInfo())
    // const content =[]
    const param = []
    param.iconUrl = payload.iconUrl
    param.sdkUrl = payload.sdkUrl
    param.docfileUrl = payload.docfileUrl
    param.qualityUrl = payload.qualityUrl
    param.enName = payload.enName
    param.cnName = payload.cnName
    param.remark = payload.remark
    param.svrType = payload.svrType
    param.token = username.token
    param.type = payload.type
    param.content =JSON.stringify({
      "数量":payload.COUNT,
      "CPU":payload.CPU,
      "内存":payload.RAM,
      "申请时长":payload.TIME
    })
    
    console.log(param);
    // console.log('register=' + JSON.stringify({...param}))
    const resp = await this.$service.svr.register({...param})
    if (callback) callback(resp)
  },

  async update({ commit }, { payload, callback }) {
    const username = JSON.parse(getUserInfo())
    // const content =[]
    const param = []
    param.id = payload.id
    param.iconUrl = payload.iconUrl
    param.sdkUrl = payload.sdkUrl
    param.docfileUrl = payload.docfileUrl
    param.qualityUrl = payload.qualityUrl
    param.enName = payload.enName
    param.cnName = payload.cnName
    param.remark = payload.remark
    param.svrType = payload.svrType
    param.token = username.token
    param.type = payload.type
    param.content =JSON.stringify({
      "数量":payload.COUNT,
      "CPU":payload.CPU,
      "内存":payload.RAM,
      "申请时长":payload.TIME
    })
    
    console.log({...param});
    // console.log('register=' + JSON.stringify({...param}))
    const resp = await this.$service.svr.update({...param})
    if (callback) callback(resp)
  },

  async details({ commit }, { payload, callback }) {
    console.log("Details="+JSON.stringify(payload))
    const resp = await this.$service.svr.details(payload)
    const content = JSON.parse(JSON.parse(resp.data[0].content))
    for(const k in content) {
      if(k === '数量'){
        resp.data[0].COUNT = content[k]
      }else if(k === 'CPU'){
        resp.data[0].CPU = content[k]
      }else if(k === '内存'){
        resp.data[0].RAM = content[k]
      }else if(k === '申请时长'){
        resp.data[0].TIME = content[k]
      }
      
    }
    console.log(resp)
    if (callback) callback(resp)
  },

  async del({ commit }, { payload, callback }){
    const resp = await this.$service.svr.del(payload)
    if (callback) callback(resp)
  }

}
