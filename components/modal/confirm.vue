<template>
  <div>
    <b-modal
      id="modalaction"
      ref="modalaction"
      v-model="state"
      centered
      no-fade
      hide-header
      hide-footer
      modal-class="fade scale"
      content-class="text-center rounded"
    >
      <div>
        <p class="mt-4">
          Apakah anda yakin ?
        </p>
      </div>

      <b-row>
        <b-col cols="6">
          <b-button class="mt-3 text-white" variant="secondary" block @click="state = false">
            Batal
          </b-button>
        </b-col>
        <b-col cols="6">
          <b-button class="mt-3 text-white" variant="primary" block @click="onSubmit">
            Ya
          </b-button>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: {
  },
  data () {
    return {
      state: false
    }
  },
  mounted () {
  },
  methods: {
    show () {
      this.state = true
    },
    onSubmit () {
      this.$emit('submit')
      this.state = false
    }
  }
}
</script>

<style>

</style>
