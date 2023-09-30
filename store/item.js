import axios from 'axios'
// import moment from 'moment'
import apiJson from '../json/API.json'
import localStorage from '../modules/localstorage'

const StorageKey = 'smartfrozen-item'

const item = {
  namespaced: true,
  state () {
    return {
      selected: null
    }
  },
  getters: {
    getSelected: (state) => {
      return state.selected
    }
  },
  mutations: {
    init (state) {
      const ls = localStorage.get(StorageKey)
      if (!ls.status || ls.data === null) { return } // no data or error

      state.selected = ls.data.selected
    },
    setSelected: (state, payload) => {
      state.selected = payload

      localStorage.store(StorageKey, JSON.stringify(state))
    }
  },
  actions: {
    create (context, payload) {
      const params = new FormData()
      params.append('rack', payload.rack)
      params.append('category', payload.category)
      params.append('name', payload.name)
      params.append('type', payload.type)
      params.append('description', payload.description)
      params.append('hpp', payload.hpp)
      params.append('sale', payload.sale)
      params.append('unit', payload.unit)
      return new Promise((resolve, reject) => {
        axios.post(apiJson.API + 'item/create',
          params, {
            headers: {
              Authorization: context.rootGetters['uac/getToken'],
              'X-Requested-With': 'XMLHttpRequest',
              'Content-Type': 'x-www-form-urlencoded'
            }
          }).then((resp) => {
          // validate data
          if (resp.data.status) {
            return resolve(resp)
          }
          reject(resp.data)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    checker (context, payload) {
      const params = new FormData()
      params.append('code', payload.code)
      params.append('NamaItem', payload.NamaItem)
      params.append('Qty', payload.Qty)
      params.append('Harga', payload.Harga)
      params.append('KodeSatuan', payload.KodeSatuan)
      params.append('KodePelanggan', payload.KodePelanggan)
      payload.lines.forEach((element, index) => {
        params.append('lines[' + index + '][code]', element.code)
        params.append('lines[' + index + '][NamaItem]', element.NamaItem)
        params.append('lines[' + index + '][Qty]', element.Qty)
        params.append('lines[' + index + '][Harga]', element.Harga)
        params.append('lines[' + index + '][KodeSatuan]', element.KodeSatuan)
      })
      return new Promise((resolve, reject) => {
        axios.get(apiJson.API + 'cashier/checker',
          params, {
            headers: {
              Authorization: context.rootGetters['uac/getToken'],
              'X-Requested-With': 'XMLHttpRequest',
              'Content-Type': 'x-www-form-urlencoded'
            }
          }).then((resp) => {
          // validate data
          if (resp.data.status) {
            return resolve(resp)
          }
          reject(resp.data)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    penjualan(context, payload) {
      const params = new FormData();
      params.append('Subtotal', payload.Subtotal);
    
      return new Promise((resolve, reject) => {
        axios.get(apiJson.API + 'cashier/penjualan', params, {
          headers: {
            Authorization: context.rootGetters['uac/getToken'],
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then((resp) => {
          // Validasi respons dari server
          if (resp.data.status) {
            resolve(resp.data); // Anda mungkin ingin mengembalikan data yang lebih bermanfaat
          } else {
            reject(resp.data); // Server mengembalikan status false, Anda dapat menolak permintaan
          }
        }).catch((err) => {
          reject(err);
        });
      });
    },
    update (context, payload) {
      const params = new FormData()
      params.append('code', payload.code)
      params.append('rack', payload.rack)
      params.append('category', payload.category)
      params.append('name', payload.name)
      params.append('type', payload.type)
      params.append('description', payload.description)
      params.append('hpp', payload.hpp)
      params.append('sale', payload.sale)
      params.append('unit', payload.unit)
      return new Promise((resolve, reject) => {
        axios.post(apiJson.API + 'item/update',
          params, {
            headers: {
              Authorization: context.rootGetters['uac/getToken'],
              'X-Requested-With': 'XMLHttpRequest',
              'Content-Type': 'x-www-form-urlencoded'
            }
          }).then((resp) => {
          // validate data
          if (resp.data.status) {
            return resolve(resp)
          }
          reject(resp.data)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    fetch (context, payload) {
      const params = {}

      if (payload) {
        params.page = payload.page
        params.search = payload.search
        params.warehouse = payload.warehouse
        params.per_page = payload.per_page || 12
        params.category = JSON.stringify(payload.category)
      }
      // if (payload.category) {
      //   payload.category.forEach((element, index) => {
      //     params['category[' + index + ']'] = element
      //   })
      // }
      return new Promise((resolve, reject) => {
        axios.get(apiJson.API + 'item/list', {
          params,
          headers: {
            Authorization: context.rootGetters['uac/getToken'],
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json'
          }
        }).then((resp) => {
          if (resp.data.status) {
            return resolve(resp)
          }
          reject(resp.data)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    category (context, payload) {
      const params = {}
      return new Promise((resolve, reject) => {
        axios.get(apiJson.API + 'item/category', {
          params,
          headers: {
            Authorization: context.rootGetters['uac/getToken'],
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json'
          }
        }).then((resp) => {
          if (resp.data.status) {
            return resolve(resp)
          }
          reject(resp.data)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    transaction: ({ commit, state, rootGetters }, payload) => {
      const params = new FormData()
      params.append('warehouse', payload.warehouse)
      params.append('customer', payload.customer)
      params.append('tax', payload.tax)
      params.append('choice',payload.choice)
      params.append('payment', payload.payment)
      params.append('discount', payload.discount)
      payload.lines.forEach((element, index) => {
        params.append('lines[' + index + '][code]', element.code)
        params.append('lines[' + index + '][qty]', element.qty)
      })
      return new Promise((resolve, reject) => {
        axios.post(apiJson.API + 'cashier/transaction/create',
          params, {
            headers: {
              Authorization: rootGetters['uac/getToken'],
              'X-Requested-With': 'XMLHttpRequest',
              'Content-Type': 'x-www-form-urlencoded'
            }
          }).then((resp) => {
          // validate data
          if (resp.data.status) {
            return resolve(resp)
          }
          reject(resp.data)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    cancelTransaction: ({ commit, state, rootGetters }, payload) => {
      const params = new FormData()

      params.append('code', payload.code)
      return new Promise((resolve, reject) => {
        axios.post(apiJson.API + 'cashier/transaction/cancel',
          params, {
            headers: {
              Authorization: rootGetters['uac/getToken'],
              'X-Requested-With': 'XMLHttpRequest',
              'Content-Type': 'x-www-form-urlencoded'
            }
          }).then((resp) => {
          // validate data
          if (resp.data.status) {
            return resolve(resp)
          }
          reject(resp.data)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    fetchTransaction (context, payload) {
      const params = {}

      if (payload) {
        params.page = payload.page
        params.search = payload.search
        params.per_page = 5
        // params.start_date = payload.start_date ? moment(payload.start_date).format('YYYY-MM-DD HH:mm') : null
        // params.end_date = payload.end_date ? moment(payload.end_date).format('YYYY-MM-DD HH:mm') : null
        params.start_date = payload.start_date
        params.end_date = payload.end_date
      }
      return new Promise((resolve, reject) => {
        axios.get(apiJson.API + 'cashier/transaction', {
          params,
          headers: {
            Authorization: context.rootGetters['uac/getToken'],
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json'
          }
        }).then((resp) => {
          if (resp.data.status) {
            return resolve(resp)
          }
          reject(resp.data)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    returnTransaction: ({ commit, state, rootGetters }, payload) => {
      const params = new FormData()
      params.append('code', payload.code)
      params.append('warehouse', payload.warehouse)
      payload.lines.forEach((element, index) => {
        params.append('lines[' + index + '][code]', element.code)
        params.append('lines[' + index + '][qty]', element.qty)
      })
      return new Promise((resolve, reject) => {
        axios.post(apiJson.API + 'cashier/return/create',
          params, {
            headers: {
              Authorization: rootGetters['uac/getToken'],
              'X-Requested-With': 'XMLHttpRequest',
              'Content-Type': 'x-www-form-urlencoded'
            }
          }).then((resp) => {
          // validate data
          if (resp.data.status) {
            return resolve(resp)
          }
          reject(resp.data)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    cancelReturnTransaction: ({ commit, state, rootGetters }, payload) => {
      const params = new FormData()

      params.append('code', payload.code)
      return new Promise((resolve, reject) => {
        axios.post(apiJson.API + 'cashier/return/cancel',
          params, {
            headers: {
              Authorization: rootGetters['uac/getToken'],
              'X-Requested-With': 'XMLHttpRequest',
              'Content-Type': 'x-www-form-urlencoded'
            }
          }).then((resp) => {
          // validate data
          if (resp.data.status) {
            return resolve(resp)
          }
          reject(resp.data)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    fetchReturnTransaction (context, payload) {
      const params = {}

      if (payload) {
        params.page = payload.page
        params.search = payload.search
        params.per_page = 5
        params.start_date = payload.start_date
        params.end_date = payload.end_date
      }
      return new Promise((resolve, reject) => {
        axios.get(apiJson.API + 'cashier/return', {
          params,
          headers: {
            Authorization: context.rootGetters['uac/getToken'],
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json'
          }
        }).then((resp) => {
          if (resp.data.status) {
            return resolve(resp)
          }
          reject(resp.data)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    fetchOutbound (context, payload) {
      const params = {}

      if (payload) {
        params.page = payload.page
        params.search = payload.search
        params.per_page = 5
        params.start_date = payload.start_date
        params.end_date = payload.end_date
      }
      return new Promise((resolve, reject) => {
        axios.get(apiJson.API + 'outbound', {
          params,
          headers: {
            Authorization: context.rootGetters['uac/getToken'],
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json'
          }
        }).then((resp) => {
          if (resp.data.status) {
            return resolve(resp)
          }
          reject(resp.data)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    outbound: ({ commit, state, rootGetters }, payload) => {
      const params = new FormData()

      params.append('from', payload.from)
      params.append('to', payload.to)
      params.append('date', payload.date)
      params.append('description', payload.description)
      payload.lines.forEach((element, index) => {
        params.append('lines[' + index + '][code]', element.code)
        params.append('lines[' + index + '][unit]', element.unit)
        params.append('lines[' + index + '][qty]', element.qty)
      })
      return new Promise((resolve, reject) => {
        axios.post(apiJson.API + 'outbound/create',
          params, {
            headers: {
              Authorization: rootGetters['uac/getToken'],
              'X-Requested-With': 'XMLHttpRequest',
              'Content-Type': 'x-www-form-urlencoded'
            }
          }).then((resp) => {
          // validate data
          if (resp.data.status) {
            return resolve(resp)
          }
          reject(resp.data)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    outboundConfirm: ({ commit, state, rootGetters }, payload) => {
      const params = new FormData()

      params.append('code', payload.code)
      return new Promise((resolve, reject) => {
        axios.post(apiJson.API + 'outbound/confirm',
          params, {
            headers: {
              Authorization: rootGetters['uac/getToken'],
              'X-Requested-With': 'XMLHttpRequest',
              'Content-Type': 'x-www-form-urlencoded'
            }
          }).then((resp) => {
          // validate data
          if (resp.data.status) {
            return resolve(resp)
          }
          reject(resp.data)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    checkerUpdate: ({ commit, state, rootGetters }, payload) => {
      const params = new FormData()
      params.append('KodeKasir', payload.KodeKasir)
      params.append('warehouse', payload.warehouse)
      params.append('customer', payload.customer)
      params.append('tax', payload.tax)
      params.append('payment', payload.tax)
      params.append('discount', payload.tax)
      payload.lines.forEach((element, index) => {
        params.append('lines[' + index + '][code]', element.code)
        params.append('lines[' + index + '][qty]', element.qty)
      })
      return new Promise((resolve, reject) => {
        axios.post(apiJson.API + 'cashier/checker/update',
          params, {
            headers: {
              Authorization: rootGetters['uac/getToken'],
              'X-Requested-With': 'XMLHttpRequest',
              'Content-Type': 'x-www-form-urlencoded'
            }
          }).then((resp) => {
          // validate data
          if (resp.data.status) {
            return resolve(resp)
          }
          reject(resp.data)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    outboundUpdate: ({ commit, state, rootGetters }, payload) => {
      const params = new FormData()

      params.append('code', payload.code)
      params.append('from', payload.from)
      params.append('to', payload.to)
      params.append('description', payload.description)
      payload.lines.forEach((element, index) => {
        params.append('lines[' + index + '][code]', element.code)
        params.append('lines[' + index + '][unit]', element.unit)
        params.append('lines[' + index + '][qty]', element.qty)
      })
      return new Promise((resolve, reject) => {
        axios.post(apiJson.API + 'outbound/update',
          params, {
            headers: {
              Authorization: rootGetters['uac/getToken'],
              'X-Requested-With': 'XMLHttpRequest',
              'Content-Type': 'x-www-form-urlencoded'
            }
          }).then((resp) => {
          // validate data
          if (resp.data.status) {
            return resolve(resp)
          }
          reject(resp.data)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    
    outboundCancel: ({ commit, state, rootGetters }, payload) => {
      const params = new FormData()

      params.append('code', payload.code)
      return new Promise((resolve, reject) => {
        axios.post(apiJson.API + 'outbound/cancel',
          params, {
            headers: {
              Authorization: rootGetters['uac/getToken'],
              'X-Requested-With': 'XMLHttpRequest',
              'Content-Type': 'x-www-form-urlencoded'
            }
          }).then((resp) => {
          // validate data
          if (resp.data.status) {
            return resolve(resp)
          }
          reject(resp.data)
        }).catch((err) => {
          reject(err)
        })
      })
    }
  }
}

export default item
