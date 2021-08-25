import sync from './lib/load/sync-component'

export default {
  homepage: sync('Homepage', require('./homepage'))
}
