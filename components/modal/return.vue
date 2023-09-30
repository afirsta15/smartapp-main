<template>
  <div>
    <b-modal
      id="modalReturn"
      ref="modalReturn"
      v-model="state"
      centered
      no-fade
      hide-header
      hide-footer
      modal-class="fade scale"
      content-class="rounded"
      title="BootstrapVue"
    >
      <div>
        <b-container class="mb-4">
          <div class="text-center pt-4">
            <h5 class="text-primary">
              <strong>
                Form Retur
              </strong>
            </h5>
          </div>
          <div class="row">
            <div class="text-center col">
              <h5>
                {{ invoice && invoice.KodeKasir }}
              </h5>
            </div>
            <div class="col-12 mt-3">
              <h6>Daftar Item</h6>
            </div>
            <div class="col-12 row">
              <div class="col-8">
                <h6 class="mb-0 text-primary">
                  <strong>
                    Barang
                  </strong>
                </h6>
              </div>
              <div class="col-2">
                <h6 class="mb-0 text-primary">
                  <strong>
                    Satuan
                  </strong>
                </h6>
              </div>
              <div class="col-2">
                <h6 class="mb-0 text-primary">
                  <strong>
                    Qty
                  </strong>
                </h6>
              </div>
            </div>
            <div v-for="(dt, i) in options" v-show="dt.Max > 0" :key="'i-' + i" class="col-12 row mt-2">
              <div class="col-8 mx-0 pr-0">
                <input v-model="dt.NamaItem" class="form-control input-modal" readonly type="text">
              </div>
              <div class="col-2 mx-0 pr-0">
                <input v-model="dt.KodeSatuan" class="form-control input-modal" readonly type="text">
              </div>
              <div class="col-2 mx-0 pr-0">
                <inputNumber
                  ref="inputNumber"
                  :value="dt.Qty"
                  :max="dt.Max"
                  @submit="(lt) => {dt.Qty = lt}"
                />
              </div>
            </div>
            <div class="col-12 pt-2">
              <hr>
            </div>
            <div class="col-12 pt-2">
              <button :disabled="isLoading" class="btn btn-block btn-primary btn-sm mb-3" @click="onSubmit">
                Retur
              </button>
            </div>
          </div>
        </b-container>
      </div>
    </b-modal>
  </div>
</template>

<script>
import inputNumber from '~/components/modal/number.vue'
export default {
  components: {
    inputNumber
  },
  props: {
    value: {
      default: () => { return {} },
      type: Object
    },
    invoice: {
      default: () => { return {} },
      type: Object
    }
  },
  data () {
    return {
      state: false,
      options: [],
      selected: null,
      store_endpoint: 'item/returnTransaction',
      isLoading: false
    }
  },
  methods: {
    show () {
      this.state = true
      const temp = JSON.parse(JSON.stringify(this.invoice.Items))
      this.options = temp.map((dt) => {
        return {
          NamaItem: dt.NamaItem,
          KodeItem: dt.KodeItem,
          KodeSatuan: dt.KodeSatuan,
          Qty: 0,
          Max: dt.Return ? dt.Qty - dt.Return.Qty : dt.Qty
        }
      })
    },
    reset () {
      this.input = null
      this.selected = null
    },
    onSubmit () {
      this.isLoading = true
      console.log('options: ', this.options)
      const params = {
        code: this.invoice.KodeKasir,
        warehouse: this.invoice.KodeLokasi,
        lines: this.options.map((dt) => {
          return {
            code: dt.KodeItem,
            qty: dt.Qty
          }
        })
      }
      this.$store.dispatch(this.store_endpoint, params)
        .then((rslt) => {
          this.$store.commit('alert/setAlert', {
            type: 'success',
            msg: 'Data Berhasil Disimpan'
          })
          this.isLoading = false
          this.state = false
          this.$emit('submit')
        }).catch((err) => {
          console.log(err)
          this.$store.commit('alert/setAlert', {
            type: 'fail',
            msg: 'Terjadi Kesalahan'
          })
          this.isLoading = false
        })
    }
  }
}
</script>

<style>

</style>
