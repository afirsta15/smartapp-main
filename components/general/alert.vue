<template>
  <div>
    <b-alert
      class="p-3 m-3"
      style="position:fixed; width: 100%; z-index: 9999"
      :show="dismissCountDown"
      :variant="$store.state.alert.type === 'fail' ? 'danger' : 'success'"
      @dismissed="onDismissed"
      @dismiss-count-down="countDownChanged"
    >
      {{ $store.state.alert.msg }}
    </b-alert>

    <!-- <b-button variant="info" class="m-1" @click="showAlert">
      Show alert with count-down timer
    </b-button> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      dismissSecs: 3,
      dismissCountDown: 0,
      showDismissibleAlert: false,
      title: {
        success: {
          id: 'Berhasil',
          eng: 'Succeeded'
        },
        fail: {
          id: 'Gagal',
          eng: 'Failed'
        }
      }
    }
  },
  watch: {
    '$store.state.alert.type' (nv) {
      if (nv) {
        this.showAlert()
      }
    }
  },
  methods: {
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert () {
      this.dismissCountDown = this.dismissSecs
    },
    onDismissed () {
      this.dismissCountDown = 0
      this.$store.commit('alert/resetAlert')
    }
  }
}
</script>
