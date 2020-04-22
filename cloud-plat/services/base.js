export default class Base {
  constructor(app) {
    this.app = app
    this.$curl = app.$curl
  }
}
