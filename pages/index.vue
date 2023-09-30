<template>
  <div class="layout d-flex flex-column justify-content-center h-100">
    <div v-if="isCheck">
      <b-spinner class="mt-4" variant="primary" type="grow" label="Spinning" />
    </div>
    <div v-else class="card card-login">
      <div class="container mt-4">
        <h4 @click="navigateTo('/dashboard/setting')" class="text-primary">
          <strong>
            <!-- @click="navigateTo('/dashboard/setting')" -->
            Login
          </strong>
        </h4>
        <p class="text-primary mb-0 mt-3">
          <strong>
            Username
          </strong>
        </p>
        <input v-model="username" class="form-control" type="text">
        <p class="mb-0 mt-3 text-primary">
          Password
        </p>
        <input v-model="password" class="form-control" type="password">
        <button class="btn btn-primary btn-block btn-login mb-4" @click="onLogin">
          Login
        </button>
      </div>
    </div>
    <dev />
  </div>
</template>

<script>
import dev from '../components/general/dev.vue'
export default {
  name: 'Login',
  components: {
    dev
  },
  asyncData ({ isDev, route, store, env, params, query, req, res, redirect, error }) {
    store.commit('uac/init')
  },
  data () {
    return {
      username: '',
      password: '',
      isLoading: false,
      isCheck: false
    }
  },
  created () {
    if (this.$store.state.uac.token) {
      this.onFetchConfig()
    }
  },
  methods: {
    navigateTo (url, keepHistory) {
      if (keepHistory) {
        this.$router.push(url)
      } else {
        this.$router.replace(url)
      }
    },
    onLogin () {
      this.isLoading = true
      this.$store.dispatch('uac/login', {
        username: this.username,
        password: this.password
      }).then((res) => {
        this.isLoading = false
        this.$store.commit('alert/setAlert', {
          type: 'succeed',
          msg: 'Login Berhasil'
        })
        this.onFetchConfig()
      }).catch((err) => {
        console.error(err)
        this.isLoading = false
        this.password = null
        this.$store.commit('alert/setAlert', {
          type: 'fail',
          msg: 'Login Gagal'
        })
      })
    },
    onFetchConfig () {
      this.isCheck = true
      const vm = this
      this.$store.dispatch('app/fetch', {
        params: {}
      }).then((rslt) => {
        this.isCheck = true
        this.navigateTo('/dashboard')
      }).catch((err) => {
        if (err.response && err.response.status === 401) {
          vm.$store.commit('alert/setAlert', {
            type: 'fail',
            msg: err.response && err.response.statusText ? err.response.statusText : 'Failed'
          })
          vm.password = null
          vm.isCheck = false
        } else {
          vm.$store.commit('alert/setAlert', {
            type: 'fail',
            msg: err.response && err.response.statusText ? err.response.statusText : 'Failed'
          })
          vm.isCheck = false
        }
      })
    }
  }
}
</script>

<style scoped>
  .card-login {
    z-index: 5;
    min-width: 30vw;
    height: auto;
    padding-bottom: 100px;
  }
  .btn-login {
    position: absolute;
    bottom: 0;
    width: calc(100% - 30px);
  }
</style>
