export default {
  store (_key, _val) {
    try {
      window.localStorage.setItem(_key, _val)
    } catch (error) {
      console.error(error)
      return {
        status: false,
        data: null,
        error
      }
    }

    return {
      status: true,
      data: null,
      error: null
    }
  },
  get (_key) {
    let dt
    try {
      dt = window.localStorage.getItem(_key)
        ? JSON.parse(window.localStorage.getItem(_key))
        : window.localStorage.getItem(_key)
    } catch (error) {
      console.error(error)
      return {
        status: false,
        data: null,
        error
      }
    }

    return {
      status: true,
      data: dt,
      error: null
    }
  },
  remove (_key) {
    try {
      window.localStorage.removeItem(_key)
    } catch (error) {
      return {
        status: false,
        data: null,
        error
      }
    }

    return {
      status: true,
      data: null,
      error: null
    }
  }
}
