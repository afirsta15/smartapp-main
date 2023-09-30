import axios from 'axios'
import apiJson from '../json/API.json'
import localStorage from '../modules/localstorage'

const StorageKey = 'smartfrozen-app'

const app = {
  namespaced: true,
  state () {
    return {
      language: null,
      warehouse: null,
      item: null,
      unit: null,
      ppn: null,
      print: null,
      printerLength: 42,
      printerHeader: 'Dniz Techno0000',
      printerAddress: 'dniztecho@example.com',
      printerContact: '081123456789',
      printerFooter: 'Kritik & Saran: 0812345789'
    }
  },
  getters: {
    getLanguage: (state) => {
      return state.language ? state.language : 'id'
    },
    getWarehouse: (state) => {
      return state.warehouse ? state.warehouse : []
    },
    getCategory: (state) => {
      return state.item ? state.item.category : []
    },
    getRack: (state) => {
      return state.item ? state.item.rack : []
    },
    getUnit: (state) => {
      return state.unit ? state.unit : []
    },
    getPPN: (state) => {
      return state.ppn ? state.ppn : { isIncludePPN: 1, ppnValue: 11 }
    },
    getPrint: (state) => {
      return state.print
    },
    getPrinterLength: (state) => {
      return state.printerLength
    },
    getPrinterHeader: (state) => {
      return state.printerHeader
    },
    getPrinterAddress: (state) => {
      return state.printerAddress
    },
    getPrinterContact: (state) => {
      return state.printerContact
    },
    getPrinterFooter: (state) => {
      return state.printerFooter
    }
  },
  mutations: {
    init (state) {
      const ls = localStorage.get(StorageKey)
      if (!ls.status || ls.data === null) { return } // no data or error

      state.warehouse = ls.data.warehouse
      state.unit = ls.data.unit
      state.item = ls.data.item
      state.ppn = ls.data.ppn
      state.print = ls.data.print
      state.printerLength = ls.data.printerLength
    },
    config: (state, payload) => {
      // save payload
      state.warehouse = payload.warehouse
      state.unit = payload.unit
      state.item = payload.item
      //   state.username = payload.user.username

      localStorage.store(StorageKey, JSON.stringify(state))
    },
    setPPN: (state, payload) => {
      state.ppn = payload
      localStorage.store(StorageKey, JSON.stringify(state))
    },
    setPrint: (state, payload) => {
      state.print = payload
      localStorage.store(StorageKey, JSON.stringify(state))
    },
    setPrinterTemplate: (state, payload) => {
      state.printerLength = payload.length
      state.printerHeader = payload.header
      state.printerAddress = payload.address
      state.printerContact = payload.contact
      state.printerFooter = payload.footer
      localStorage.store(StorageKey, JSON.stringify(state))
    }
  },
  actions: {
    fetch (context, payload) {
      const params = {}

      if (payload) {
        params.page = payload.page
        params['filter[search]'] = payload.search
      }
      return new Promise((resolve, reject) => {
        axios.get(apiJson.API + 'config', {
          params,
          headers: {
            Authorization: context.rootGetters['uac/getToken'],
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json'
          }
        }).then((resp) => {
          if (resp.data.status) {
            context.commit('config', {
              warehouse: resp.data.data.warehouse,
              unit: resp.data.data.unit,
              item: resp.data.data.item // resp.data.data.user
            })
            return resolve(resp)
          }
          reject(resp.data)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    fetchCustomer (context, payload) {
      const params = {}

      if (payload) {
        params.page = payload.page
        params.search = payload.search
      }
      return new Promise((resolve, reject) => {
        axios.get(apiJson.API + 'cashier/customer', {
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
    }
  }
}

export default app
