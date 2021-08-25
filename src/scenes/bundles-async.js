import async from './lib/load/async-component'

export default {
  homepage: async('Homepage', () => import(/* webpackChunkName: "homepage" */ './homepage'))
}
