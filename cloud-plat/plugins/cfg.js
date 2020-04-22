import Cfg from '@/config/index'
export default ({ app }, inject) => {
  inject('cfg', Cfg)
}