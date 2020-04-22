// import { login } from '@/services/login'
import { setUserInfo, getUserInfo,clearUserInfo } from '@/utils/authority'
// 从缓存中初始化用户信息
const userinfo = getUserInfo()

export const state = () => ({
  userinfo: userinfo // 从缓存中初始化用户信息
})
export const mutations = {
  setUserinfo(state, userinfo) {
    state.userinfo = userinfo
  }
}

export const actions = {
  setUserinfo({ commit }, userinfo) {
    setUserInfo(userinfo)
    commit('setUserinfo', userinfo)
  },
  async login({ commit }, { payload, callback }) {
    const { name, password } = payload
    const resp = await this.$service.uc.login({
      name,
      password
    })
    console.log(resp)
    
    if (resp.code === 200) {
      setUserInfo(
        '{"token":"' + resp.data.token + '","name":"' + name + '"}')
      commit('setUserinfo', resp.data)
    }
    if (callback) {
      callback(resp)
    }
  },

  // eslint-disable-next-line require-await
  async logout({ commit }, payload) {
    const _this = this
    console.log('执行了注销')
    // 调用一下注销接口
    // const resp = await this.$service.uc.logout()//无注销接口
    // console.log(resp)
    clearUserInfo()
    // commit('setUserinfo', null)
    _this.$router.push('/user/login')
  },
  // 注册账号
  async register({ commit }, { payload, callback }) {
    console.log('register=' + JSON.stringify(payload))
    const resp = await this.$service.uc.register(payload)
    // console.log("返回="+resp)
    if (callback) callback(resp)
  }
}
