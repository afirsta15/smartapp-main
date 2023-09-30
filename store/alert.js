const alert = {
  namespaced: true,
  state () {
    return {
      msg: null,
      type: null
    }
  },
  getters: {
    getMsg: (state) => {
      return state.msg
    },
    getType: (state) => {
      return state.type
    }
  },
  mutations: {
    setAlert: (state, payload) => {
      if (state.msg) {
        state.msg = null
        state.type = null
        fillState()
      } else {
        fillState()
      }

      function fillState () {
        state.msg = payload.msg
        state.type = payload.type
      }
      console.log('state: ', state)
    },
    resetAlert: (state) => {
      state.msg = null
      state.type = null
    }
  },
  actions: {
  }
}

export default alert
