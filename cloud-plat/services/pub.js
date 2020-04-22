import Base from './base'
export default class pub extends Base {
  // GET 获取列表
  async listdata(params) {
    const resp = await this.$curl('/doc/list/', {
      method: 'GET'
    })
    return resp.data
  }
  // GET 获取详情
  // async details(id, params) {
  //   const resp = await this.$curl('/operatelogs/' + id, {
  //     params
  //   })
  //   // console.log("日志列表" + resp);
  //   return resp.data
  // }
}
