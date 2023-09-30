import axios from 'axios'
import apiJson from '../json/API.json'
import localStorage from '../modules/localstorage'

const StorageKey = 'smartfrozen-uac'

const uac = {
  namespaced: true,
  state () {
    return {
      token: null,
      user: null
    }
  },
  getters: {
    isLoggedIn: (state) => {
      return !!state.token
    },
    getToken: (state) => {
      return 'Bearer ' + state.token
    },
    getUser: (state) => {
      return state.user
    }
  },
  mutations: {
    init (state) {
      const ls = localStorage.get(StorageKey)
      if (!ls.status || ls.data === null) { return } // no data or error

      state.token = ls.data.token
      state.user = ls.data.user
    },
    login: (state, payload) => {
      // save payload
      state.token = payload.token
      state.user = payload.user

      localStorage.store(StorageKey, JSON.stringify(state))
    },
    logout (state) {
      state.token = null
      state.user = null

      localStorage.remove(StorageKey)
    }
  },
  actions: {
    login: ({ commit }, payload) => {
      return new Promise((resolve, reject) => {
        axios.post(apiJson.APIToken, {
          email: payload.username, // payload.username
          password: payload.password // payload.password
        }).then((resp) => {
          // validate data
          console.log(resp)
          if (resp.data.token) {
            commit('login', {
              token: resp.data.token,
              user: resp.data.user // resp.data.data.user
            })
            return resolve(resp)
          }
          reject(resp.data)
        }).catch((err) => {
          // alert(apiJson.API + apiJson.endpoint.login)
          reject(err)
        })
      })
    }
  }
}

export default uac
