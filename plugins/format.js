import Vue from 'vue'
import moment from 'moment'
import { formatPrice } from '../modules/formatPrice'

Vue.filter('formatPrice', function (value) {
  if (!value) { return 'Rp. 0' }
  return formatPrice(value)
})

Vue.filter('toDate', function (value) {
  if (value) {
    return moment(String(value)).format('DD-MM-YYYY')
  }
})
