<template>
  <div>
    <input
      v-model="input"
      class="form-control input-modal"
      readonly
      type="text"
      :disabled="disabledState"
      @click="show"
    >
    <b-modal
      id="modalDate"
      ref="modalDate"
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
          <div class="pt-4">
            <h5 class="text-primary">
              <strong>
                Tanggal
              </strong>
            </h5>
          </div>
        </b-container>
        <div class="row m-3">
          <Datepicker
            wrapper-class="calWrap"
            calendar-class="w-100"
            :language="id"
            :inline="true"
            placeholder="DD/MM/YYYY"
            :disabled-dates="disabled"
            @selected="onSelected"
          />
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import moment from 'moment'
import { id } from 'vuejs-datepicker/dist/locale'
export default {
  components: {
    Datepicker
  },
  props: {
    initial: {
      default: '',
      type: String
    },
    disabledState: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      input: null,
      state: false,
      disabled: {
        from: new Date()
      },
      id
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
    },
    onSelected (dt) {
      this.input = moment(dt).format('DD-MM-YYYY')
      this.$emit('submit', moment(dt).format('YYYY-MM-DD'))
      this.state = false
    }
  }
}
</script>

<style>

</style>
