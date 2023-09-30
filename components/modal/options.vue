<template>
  <div>
    <input v-model="input" class="form-control input-modal mt-2" readonly type="text" @click="show">
    <b-modal
      id="modalSelect"
      ref="modalSelect"
      v-model="state"
      centered
      no-fade
      hide-header
      hide-footer
      modal-class="fade scale"
      content-class="text-center rounded"
      title="BootstrapVue"
    >
      <div>
        <b-container class="mb-4">
          <b-badge v-if="info" variant="warning">
            {{ info }}
          </b-badge>
          <div class="pt-4">
            <h5 class="text-primary">
              <strong>
                {{ title }}
              </strong>
            </h5>
          </div>
        </b-container>
        <div v-for="(dt,i) in options" :key="'o-' + i">
          <div
            class="row mx-0 card clickable mb-2 py-3"
            @click="onSelected(dt)"
          >
            {{ value ? dt[value] : dt }}
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  components: {
  },
  props: {
    title: {
      default: 'Pilih',
      type: String
    },
    initial: {
      default: '',
      type: String
    },
    info: {
      default: '',
      type: String
    },
    defaultOptions: {
      default: () => { return [] },
      type: Array
    },
    value: {
      default: '',
      type: String
    }
  },
  data () {
    return {
      input: null,
      state: false,
      options: [],
      selected: null
    }
  },
  mounted () {
    if (this.initial) {
      this.input = this.initial
    }
  },
  methods: {
    show () {
      this.state = true
      this.options = this.defaultOptions
    },
    reset () {
      this.input = null
      this.selected = null
    },
    onSelected (dt) {
      this.input = this.value ? dt[this.value] : dt
      this.selected = dt
      this.$emit('submit', this.selected)
      this.state = false
    }
  }
}
</script>

<style>

</style>
