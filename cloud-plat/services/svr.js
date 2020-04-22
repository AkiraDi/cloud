import Base from './base'
import { getUserInfo } from '@/utils/authority'
export default class svr extends Base {
  // GET 获取列表
  async listdata(params) {
    const userinfo = getUserInfo()
    const token = JSON.parse(userinfo).token
    params.token = token
    console.log(params);
    const resp = await this.$curl('/svr/list/', {
      method: 'GET',
      params
    })
    return resp.data
  }
  async register(data) {
    console.log("新增" ,data);
    const resp = await this.$curl('/svr/register/', {
      method: 'POST',
      data
    })
    console.log("新增" ,resp);
    return resp.data
  }
  async update(data) {
    const resp = await this.$curl('/svr/update/', {
      method: 'POST',
      data
    })
    console.log("新增" ,resp);
    return resp.data
  }
  // GET 获取剧集详情
  async details(params) {
    const userinfo = getUserInfo()
    const token = JSON.parse(userinfo).token
    const par = {"token":token}
    console.log(par);
    const resp = await this.$curl('/svr/info/' + params, {
      method: 'GET',
      params:{"token":token}
    })
    console.log("剧集列表" + resp);
    return resp.data
  }
  async del(data) {
    const userinfo = getUserInfo()
    const token = JSON.parse(userinfo).token
    const resp = await this.$curl('/svr/delete/' + data, {
      method: 'POST',
      params:{"token":token}
    })
    console.log("剧集列表" + resp);
    return resp.data
  }
}
