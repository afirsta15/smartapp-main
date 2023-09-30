<template>
  <div>
    <b-modal
      v-model="isModalShow"
      content-class="rounded"
      :title="'Filter Tanggal'"
      size="sm"
      centered
      @show="reset"
    >
      <template #default>
        <div class="row body-content rounded">
          <div class="col-12">
            <b-tabs content-class="mt-3" fill>
              <b-tab
                :title="inputDateStart ? uiDate(inputDateStart) : 'Dari'"
                :active="index === 1"
              >
                <datepicker
                  wrapper-class="calWrap"
                  calendar-class="w-100"
                  :language="id"
                  :inline="true"
                  :value="helperDate(inputDateStart)"
                  :disabled-dates="disabledDate"
                  @selected="handleSelectStartDate"
                />
              </b-tab>
              <b-tab title="s.d." disabled />
              <b-tab
                :title="inputDateEnd ? uiDate(inputDateEnd) : 'Sampai'"
                :active="index === 2"
              >
                <datepicker
                  wrapper-class="calWrap"
                  calendar-class="w-100"
                  :language="id"
                  :inline="true"
                  :value="helperDate(inputDateEnd)"
                  :disabled-dates="disabledDate"
                  @selected="handleSelectEndDate"
                />
              </b-tab>
            </b-tabs>
          </div>
        </div>
      </template>

      <template #modal-footer>
        <b-button
          variant="primary"
          class="w-100"
          :disabled="!inputDateEnd || !inputDateStart"
          @click="apply()"
        >
          Simpan
        </b-button>
        <b-button
          variant="default"
          class="w-100"
          @click="clear()"
        >
          Reset
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import { id } from 'vuejs-datepicker/dist/locale'
import moment from 'moment'
export default {
  components: {
    Datepicker
  },
  props: {
    hidePlaceholder: {
      default: false,
      type: Boolean
    },
    placeholder: {
      default: 'Filter Tanggal',
      type: String
    },
    defaultStartDate: {
      default: null,
      type: Date
    },
    defaultEndDate: {
      default: null,
      type: Date
    }
  },
  data () {
    return {
      inputDateStart: null,
      inputDateEnd: null,
      disabledDate: {
        from: new Date()
      },
      isModalShow: false,
      id,
      index: 1
    }
  },
  mounted () {
    this.inputDateStart = this.defaultStartDate
    this.inputDateEnd = this.defaultEndDate
  },
  methods: {
    show () {
      this.isModalShow = true
    },
    apply () {
      const difference = moment(this.inputDateStart).diff(moment(this.inputDateEnd), 'days')
      if (Math.abs(difference) > 31) {
        this.$bvModal.msgBoxOk(this.labelGeneral.alert.date[this.$store.getters['modules/app/getLanguage']], {
          centered: true,
          modalClass: 'ok-modal'
        })
          .then((value) => {
          })
          .catch((err) => {
            console.log('err: ', err)
          })
      } else {
        this.isModalShow = false
        this.index = 1
        this.$emit('changed', {
          date_gte: this.inputDateStart,
          date_lte: this.inputDateEnd
        })
      }
    },
    handleSelectStartDate (dt) {
      this.inputDateStart = dt
      this.index = 2
    },
    handleSelectEndDate (dt) {
      this.inputDateEnd = dt
    },
    uiDate (dt) {
      return moment(dt).format('DD/MM/YYYY')
    },
    helperDate (dt) {
      return dt ? moment(dt).toDate() : null
    },
    clear () {
      this.isModalShow = false
      this.inputDateStart = null
      this.inputDateEnd = null
      this.index = 1
      this.$emit('changed', {
        date_gte: this.inputDateStart,
        date_lte: this.inputDateEnd
      })
    },
    reset () {
      this.index = !this.inputDateStart ? 1 : 2
    },
    default () {
      this.inputDateStart = null
      this.inputDateEnd = null
      this.index = 1
    }
  }
}
</script>

<style scoped>
    .truncate {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .body-content {
        min-height: 350px;
    }
    .calWrap {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
