<template>
  <div class="layout d-flex flex-column justify-content-center">
    <div class="row p-3 bb-1 bg-primary" style="position:fixed; top: 0; width: 100%; z-index: 9">
      <div class="col text-left">
        <h4 class="text-white">
          <strong>{{ title }}</strong>
        </h4>
        <h6 class="text-white">
          {{ subtitle }}
        </h6>
      </div>
      <div class="col text-right">
        <button v-if="$route.name === 'dashboard'" class="btn btn-danger btn-sm" @click="onLogout">
          Logout
        </button>
        <button v-else class="btn btn-light btn-sm mr-2" @click="$router.back()">
          Kembali
        </button>
        <button v-if="refresh" class="btn btn-info btn-sm mr-2" @click="$emit('refreshed')">
          Refresh
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: 'Slimplan',
      type: String
    },
    subtitle: {
      default: 'Home',
      type: String
    },
    refresh: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
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
    onLogout () {
      this.$store.commit('uac/logout')
      this.navigateTo('/')
    }
  }
}
</script>

<style>

</style>
