import Base from './base'
export default class User extends Base {
  async login({ name, password }) {
    console.log({ name })
    const resp = await this.$curl('/user/login/', {
      method: 'POST',
      data: { name, password }
    })
    return resp.data
  }
  async logout() {
    const resp = await this.$curl('/user/logout')
    return resp.data
  }
  async register(data) {
    console.log(JSON.stringify(data))
    const resp = await this.$curl('/user/register/', {
      method: 'POST',
      data
    })
    console.log("新增" ,resp);
    return resp.data
  }
}
