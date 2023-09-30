<template>
  <div>
    <input v-model="parsed" class="form-control input-modal" readonly type="text" @click="show">
    <b-modal
      id="modalNumber"
      ref="modalNumber"
      v-model="state"
      centered
      no-fade
      hide-header
      hide-footer
      modal-class="fade scale"
      content-class="text-center rounded"
      title="BootstrapVue"
    >
      <b-container>
        <div class="pt-4 text-right">
          <h5>
            <strong>
              {{ input ? input : 0 }}
            </strong>
          </h5>
        </div>
      </b-container>
      <hr class="m-3">
      <b-container v-if="max">
        <div class="text-right">
          <h6 class="text-danger">
            <strong>
              ( Max {{ max }} )
            </strong>
          </h6>
        </div>
      </b-container>
      <div>
        <div class="row m-3 mb-5">
          <div v-for="i in 9" :key="i" class="col-4 p-4 b-1 clickable" @click="onAdd(i.toString())">
            {{ i }}
          </div>
          <div class="col-4 p-4 b-1" @click="onAdd('.')">
            .
          </div>
          <div class="col-4 p-4 b-1" @click="input.length > 0 ? onAdd('0') : null">
            0
          </div>
          <div class="col-4 p-4 b-1" @click="onDelete">
            x
          </div>
        </div>
      </div>

      <b-button class="mt-3 text-white" variant="primary" block @click="onSubmit">
        Simpan
      </b-button>
      <b-button class="mt-3" variant="outline-danger" block @click="() => { state = false }">
        Batal
      </b-button>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      default: 0,
      type: Number
    },
    max: {
      default: null,
      type: Number
    }
  },
  data () {
    return {
      input: this.value ? this.value : 0,
      state: false,
      parsed: null
    }
  },
  watch: {
    value (nv) {
      this.parsed = nv
    }
  },
  mounted () {
    this.parsed = this.value
  },
  methods: {
    show () {
      this.state = true
      this.input = this.parsed.toString()
    },
    onAdd (dt) {
      if (this.max && parseFloat(this.input + dt) > this.max) {
        this.input = this.max.toString()
      } else if (parseInt(this.input) === 0) {
        this.input = dt
      } else {
        this.input += dt
      }
    },
    onDelete () {
      this.input = this.input.slice(0, -1)
    },
    onSubmit () {
      this.parsed = parseFloat(this.input ? this.input : 0)
      this.$emit('submit', this.parsed)
      this.state = false
    }
  }
}
</script>

<style>

</style>
