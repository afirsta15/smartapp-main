<template>
  <div class="layout d-flex flex-column h-100">
    <topbar :subtitle="'Buat Pesanan'" />
    <div class="top-divider" />
    <div class="row mt-3 mx-2">
      <div class="col-6">
        <div v-if="$store.getters['item/getSelected']" class="row">
          <div class="col">
            <h6 class="mb-0 text-primary">
              <strong>
                Cek Penjualan {{ KodeKasir }}
              </strong>
            </h6>
            <inputWarehouse
            v-if="warehouse"
            ref="warehouse"
              :title="'Gudang'"
              :info="'Mengubah Gudang akan Menghapus Data yang ada di Cart'"
              class="mt-2"
              :initial="KodeLokasi"
              @submit="onSelectWarehouse"
            />
          </div>
        </div>
      </div>
      <div class="col-6">
        <h6 class="mb-0 text-primary">
          <strong>
            Customer
          </strong>
        </h6>
        <inputCustomer
          ref="customer"
          :title="'Customer'"
          class="mt-2"
          :initial="customer.NamaPelanggan"
          @submit="onSelectCustomer"
        />
      </div>
    </div>
    <div class="row mt-4 mx-3">
      <div class="col-5">
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
          <div class="col-5 pl-1">
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
                Harga
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
    <div class="row mx-3 mt-3 pb-5 pb-5 product-content">
      <div class="col-5 text-center product-content" style="overflow-y: scroll">
        <div v-if="isLoading" class="row">
          <div class="col v-center">
            <b-spinner class="mt-4" variant="primary" type="grow" label="Spinning" />
            <p>Tunggu</p>
          </div>
        </div>
        <div v-else class="row mt-2">
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
              <p class="mb-0 mt-1 text-primary" style="overflow: hidden; height: 3rem">
                {{ dt.HargaJual | formatPrice }} <br>
                Stok: {{ dt.Stok }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-7 bl-1 product-content" style="overflow-y: scroll">
        <div v-for="(dt, i) in lines" :key="'i-' + i" class="row mt-2">
          <div class="col-5 px-1">
            <input v-model="dt.NamaItem" class="form-control input-modal" readonly type="text">
          </div>
          <div class="col-2 px-1">
            <input v-model="dt.KodeSatuan" class="form-control input-modal" readonly type="text">
          </div>
          <div class="col-2 px-1">
            <input v-model="dt.Harga" class="form-control input-modal" readonly type="text">
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
            <b-icon class="mt-1 text-danger" icon="x" font-scale="1.7" @click="onRemove(index)" />
          </div>
        </div>
        <div class="row m-2">
          <div v-show="lines.length === 0" class="col-12 text-center my-5">
            Item belum ditambahkan
          </div>
        </div>
      </div>
    </div>
    <div class="row" style="position: absolute; bottom: 0; width: 100%">
      <div class="col-5 justify-content-center">
        <b-pagination
          v-model="page"
          :total-rows="total"
          :per-page="12"
          :disabled="isLoading"
          align="center"
          @input="fetchData"
        />
      </div>
      <div class="col-7">
        <div class="row pl-2">
          <div class="col">
            <div v-if="ppn && !ppn.isIncludePPN">
              Dengan PPN {{ ppn.ppnValue }} %
            </div>
            <div v-else>
              Total Harga Sudah Termasuk PPN
            </div>
            Total : {{ totalAfterTax | formatPrice }} ({{ totalTax | formatPrice }})
          </div>
          <div class="col text-right">
            <b-button variant="primary" class="button-bottom" @click="onShowPayment">
                  Bayar
                </b-button>
            <b-button variant="primary" class="button-bottom" @click="submit">
              Simpan ya
            </b-button>
          </div>
        </div>
      </div>
    </div>
    <inputFilter
      ref="inputFilter"
      @submit="onFilterAdded"
    />
    <inputPembayaran
      ref="inputPembayaran"
    />
  </div>
</template>

<script>
import topbar from '~/components/general/topbar.vue'
import inputCustomer from '~/components/modal/customer.vue'
import inputWarehouse from '~/components/modal/warehouse.vue'
import inputNumber from '~/components/modal/number.vue'
import inputFilter from '~/components/modal/filter.vue'
import inputPembayaran from '~/components/modal/pembayaran.vue'
export default {
  components: {
    // inputUnit,
    topbar,
    inputCustomer,
    inputWarehouse,
    inputNumber,
    inputFilter,
    inputPembayaran
  },
  props: {
    title: {
      default: 'Pilih Produk',
      type: String
    }
  },
  asyncData ({ isDev, route, store, env, params, query, req, res, redirect, error }) {
    store.commit('uac/init')
    store.commit('app/init')
    store.commit('item/init')
  },
  data () {
    return {
      endpoint: 'item/fetch',
      end_point: 'item/checkerUpdate',
      warehouse: null,
      customer: null,
      filter: [],
      options: [],
      search: null,
      lines: [],
      KodeKasir: null,
      KodeLokasi: null,
      custumer: null,
      page: 1,
      total: 0,
      isError: false,
      isLoading: false,
      ppn: null
    }
  },
  computed: {
    totalTax () {
      const tax = this.ppn && !this.ppn.isIncludePPN ? this.ppn.ppnValue : 0
      const sum = this.lines.length > 0
        ? this.lines.reduce((acum, dt) => {
          const harga = parseInt(dt.HargaJual)
          const quantity = dt.Qty
          if (isNaN(harga)) {
            return acum + (dt.Harga * quantity)
          } else {
            return acum + (harga * quantity)
          }
        }, 0)
        : 0
      return sum * (tax / 100)
    },
    totalAfterTax () {
      const tax = this.ppn && !this.ppn.isIncludePPN ? this.ppn.ppnValue : 0
      const sum = this.lines.length > 0
        ? this.lines.reduce((acum, dt) => {
          const harga = parseInt(dt.HargaJual)
          const quantity = dt.Qty
          if (isNaN(harga)) {
            return acum + (dt.Harga * quantity)
          } else {
            return acum + (harga * quantity)
          }
        }, 0)
        : 0
      return sum + (sum * (tax / 100))
    }
  },
  mounted () {
    this.warehouse = JSON.parse(JSON.stringify(this.$store.getters['app/getWarehouse'][0].KodeLokasi))
    if (this.$store.getters['app/getPPN']) {
      this.ppn = JSON.parse(JSON.stringify(this.$store.getters['app/getPPN']))
    }
    this.$nextTick(() => {
      this.init()
      this.setData()
    })
  },
  created () {
    if (this.$store.getters['item/getSelected']) {
      this.setData()
    }
  },
  methods: {
    setData () {
      const temp = JSON.parse(JSON.stringify(this.$store.getters['item/getSelected']))
      // this.lines = temp.Items
      this.KodeKasir = temp.KodeKasir
      this.KodeLokasi = temp.KodeLokasi
      this.customer = temp.Customer
      this.code = temp.KodeKasir
      console.log(temp)
    },
    init () {
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
    navigateTo (url, keepHistory) {
      if (keepHistory) {
        this.$router.push(url)
      } else {
        this.$router.replace(url)
      }
    },
    onSelected (dt) {
      const d = this.lines.find(e => e.id === dt.id)
      console.log('d', d)
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
      console.log('e', e)
      if (e < 0) {
        if (dt.Stok === 0 || (d && d.Qty >= dt.Stok)) {
          this.$store.commit('alert/setAlert', {
            type: 'fail',
            msg: 'Stok tidak mencukupi'
          })
        } else {
          const temp = JSON.parse(JSON.stringify(dt))
          temp.Qty = 1
          temp.Harga = temp.HargaJual
          this.lines.push(temp)
          console.log('temp', temp)
        }
      } else if (this.lines[e] && this.lines[e].Qty) {
        const temp = this.lines[e]
        temp.Qty += 1
        this.lines.splice(e, 1)
        this.lines.splice(e, 0, temp)
      }
    },
    onRemove (index) {
      this.lines.splice(index, 1)
      console.log('index to be removed', index)
    },
    onSelectWarehouse (dt) {
      if (this.warehouse === dt.KodeLokasi) {
        return
      }
      this.warehouse = dt.KodeLokasi
      this.init()
    },
    onSelectCustomer (dt) {
      this.customer = dt
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
        const params = {
          KodeKasir: this.KodeKasir,
          warehouse: this.warehouse,
          customer: this.customer ? this.customer.KodePelanggan : '',
          tax: this.ppn && !this.ppn.isIncludePPN ? this.ppn.ppnValue : 0,
        total: this.totalAfterTax,
        taxValue: this.totalTax,
          lines: this.lines.map((dt) => {
          return {
            code: dt.KodeItem,
            Box: dt.Box,
            qty: dt.Qty
          }
        }),
        }
        this.$store.dispatch(this.end_point, params)
          .then((rslt) => {
            this.$store.commit('alert/setAlert', {
              type: 'success',
              msg: 'Data Berhasil Disimpan'
            })
            this.navigateTo('/dashboard/cashier')
          }).catch((err) => {
            console.log(err)
            this.$store.commit('alert/setAlert', {
              type: 'fail',
              msg: 'Terjadi Kesalahan'
            })
          })
      },
    onShowPayment () {
      const params = {
        KodeKasir: this.KodeKasir,
        warehouse: this.warehouse,
        customer: this.customer,
        tax: this.ppn && !this.ppn.isIncludePPN ? this.ppn.ppnValue : 0,
        total: this.totalAfterTax,
        taxValue: this.totalTax,
        lines: this.lines.map((dt) => {
          return {
            code: dt.KodeItem,
            qty: dt.Qty
          }
        }),
        product: this.lines
      }
      this.$refs.inputPembayaran.show(params)
    }
  }
}
</script>

<style>

</style>
