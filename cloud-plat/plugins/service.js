import Uc from '@/services/uc'
import Pub from '@/services/Pub'
import Svr from '@/services/svr'

export default ({ app }, inject) => {
  const uc = new Uc(app)
  const pub = new Pub(app)
  const svr = new Svr(app)

  inject('service', {
    uc,
    pub,
    svr
  })
}
