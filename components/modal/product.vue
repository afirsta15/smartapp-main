<template>
  <div>
    <!-- <input v-model="input" class="form-control input-modal" readonly type="text" @click="show"> -->
    <b-modal
      id="modalProduct"
      ref="modalProduct"
      v-model="state"
      centered
      no-fade
      hide-header
      hide-footer
      size="xl"
      modal-class="fade scale"
      content-class="product rounded"
    >
      <div>
        <div class="mb-4">
          <div class="pt-4">
            <div class="row">
              <div class="col-5 pl-1">
                <div class="row">
                  <div class="col">
                    <h6 class="mb-0 text-primary">
                      <strong>
                        {{ title }}
                      </strong>
                    </h6>
                  </div>
                  <div class="col-4 text-center">
                    <div class="b-primary" :class="{'bg-soft': filter.length > 0}" @click="onFilter">
                      <h6 class="mb-0 text-primary">
                        <strong>
                          {{ filter.length > 0 ? filter.length : '' }} Filter
                        </strong>
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-7">
                <div class="row">
                  <div class="col-7 pl-1">
                    <h6 class="mb-0 text-primary">
                      <strong>
                        Barang
                      </strong>
                    </h6>
                  </div>
                  <div class="col-2 pl-1">
                    <h6 class="mb-0 text-primary">
                      <strong>
                        Satuan
                      </strong>
                    </h6>
                  </div>
                  <div class="col-2 pl-1">
                    <h6 class="mb-0 text-primary">
                      <strong>
                        Qty
                      </strong>
                    </h6>
                  </div>
                  <div class="col-1 pl-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row pb-5 product-content">
          <div class="col-5 text-center product-content" style="overflow-y: scroll">
            <div v-if="isLoading" class="row">
              <div class="col v-center">
                <b-spinner class="mt-4" variant="primary" type="grow" label="Spinning" />
              </div>
            </div>
            <div v-else class="row">
              <div v-for="(dt,i) in options" :key="'i-' + i" class="col-3 pl-0 pr-0" @click="onSelected(dt)">
                <div class="card m-1" :class="{'out-of-stock': dt.Stok === 0, 'clickable': dt.Stok > 0}">
                  <img
                    style="height: 5rem"
                    src="https://placekitten.com/640/360"
                    alt=""
                  >
                  <p class="mb-0 mt-1 text-primary" style="overflow: hidden; height: 4rem">
                    {{ dt.NamaItem }}
                  </p>
                  <hr class="my-0 py-0">
                  <p class="mb-0 mt-1 text-primary" style="overflow: hidden; height: 2rem">
                    Stok: {{ dt.Stok }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-7 bl-1 product-content" style="overflow-y: scroll">
            <div v-for="(dt, i) in lines" :key="'i-' + i" class="row mt-2">
              <div class="col-7 px-1">
                <input v-model="dt.NamaItem" class="form-control input-modal" readonly type="text">
              </div>
              <div class="col-2 px-1">
                <input v-model="dt.KodeSatuan" class="form-control input-modal" readonly type="text">
              </div>
              <div class="col-2 px-1">
                <inputNumber
                  ref="inputNumber"
                  :value="dt.Qty"
                  :max="dt.Stok"
                  @submit="(lt) => {dt.Qty = lt}"
                />
              </div>
              <div class="col-1 px-1">
                <b-icon class="mt-1 text-danger" icon="x" font-scale="1.7" @click="onRemove(i)" />
              </div>
            </div>
          </div>
        </div>
        <div class="row" style="position: absolute; bottom: 0; width: 100%">
          <div class="col-6 justify-content-center">
            <b-pagination
              v-model="page"
              :total-rows="total"
              :per-page="12"
              :disabled="isLoading"
              align="center"
              @input="fetchData"
            />
          </div>
          <div class="col-6 text-right">
            <b-button variant="primary" class="button-bottom" @click="submit">
              Tambah
            </b-button>
          </div>
        </div>
      </div>
    </b-modal>
    <inputFilter
      ref="inputFilter"
      @submit="onFilterAdded"
    />
  </div>
</template>

<script>
// import inputUnit from '~/components/modal/unit.vue'
import inputNumber from '~/components/modal/number.vue'
import inputFilter from '~/components/modal/filter.vue'
export default {
  components: {
    // inputUnit,
    inputNumber,
    inputFilter
  },
  props: {
    title: {
      default: 'Pilih Produk',
      type: String
    },
    warehouse: {
      default: '',
      type: String
    }
  },
  data () {
    return {
      input: null,
      endpoint: 'item/fetch',
      state: false,
      filter: [],
      options: [],
      selected: null,
      search: null,
      lines: [],
      page: 1,
      total: 0,
      isError: false,
      isLoading: false
    }
  },
  methods: {
    show () {
      this.state = true
      this.lines = []
      this.fetchData()
    },
    onFilter () {
      this.$refs.inputFilter.show()
    },
    onFilterAdded (dt) {
      this.filter = dt
      this.fetchData()
    },
    onSelected (dt) {
      const d = this.lines.find(e => e.id === dt.id)
      if (d) {
        if (dt.Stok === 0 || d.Qty >= dt.Stok) {
          this.$store.commit('alert/setAlert', {
            type: 'fail',
            msg: 'Stok tidak mencukupi'
          })
          return
        }
      }
      const e = this.lines.findIndex(e => e.id === dt.id)
      if (e < 0) {
        if (dt.Stok === 0) {
          this.$store.commit('alert/setAlert', {
            type: 'fail',
            msg: 'Stok tidak mencukupi'
          })
        } else {
          const temp = JSON.parse(JSON.stringify(dt))
          temp.Qty = 1
          this.lines.push(temp)
        }
      } else if (this.lines[e] && this.lines[e].Qty) {
        const temp = this.lines[e]
        temp.Qty += 1
        this.lines.splice(e, 1)
        this.lines.splice(e, 0, temp)
      }
      // this.input = dt.name
      // this.selected = dt
      // this.$emit('submit', this.selected)
      // this.state = false
    },
    onRemove (index) {
      this.lines.splice(index, 1)
    },
    fetchData () {
      const vm = this
      this.isError = false
      this.isLoading = true
      const params = {
        category: vm.filter,
        page: vm.page,
        search: vm.search,
        warehouse: vm.warehouse ? vm.warehouse : null
      }
      this.$store.dispatch(this.endpoint, params)
        .then((rslt) => {
          this.options = rslt.data.data.data
          this.total = rslt.data.data.total
          vm.isError = false
          vm.isLoading = false
        }).catch((err) => {
          console.log('err', err)
          vm.$store.commit('alert/setAlert', {
            type: 'fail',
            msg: 'Gagal Mengambil Data'
          })
          vm.isError = true
          vm.isLoading = false
        })
    },
    submit () {
      this.$emit('submit', this.lines)
      this.state = false
    }
  }
}
</script>

<style>
  .modal-xl {
    max-width: 90vw !important;
  }
</style>
