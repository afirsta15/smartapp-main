<template>
  <div class="layout d-flex flex-column h-100">
    <topbar :refresh="true" :subtitle="'Daftar Transaksi'" @refreshed="onRefresh" />
    <div class="top-divider" />
    <div class="row mt-3 mx-2 pb-2" style="height: 80% !important">
      <div class="col-3">
        <div class="row">
          <div class="col">
            <input v-model="search" :placeholder="'Cari'" class="form-control input-modal mt-2 mb-3" type="text" @input="onSearch">
          </div>
          <div class="col-2 pl-1">
            <b-icon class="mt-3" :variant="dateState ? 'primary' : ''" font-scale="1" icon="calendar" @click="showCalendar" />
          </div>
        </div>
        <div v-if="isLoading" class="row">
          <div class="col v-center">
            <b-spinner class="mt-4" variant="primary" type="grow" label="Spinning" />
          </div>
        </div>
        <div v-else class="row" style="max-height: 85% !important; overflow-y: scroll;">
          <div v-for="(dt, index) in pageData" :key="index" class="col-12">
            <div class="card px-2 py-1" :class="{'bg-soft': dt === selected}" @click="onClick(dt)">
              <div class="row">
                <div class="col pr-0">
                  <h5 class="text-primary">
                    <small>
                      {{ dt.KodeKasir }}
                    </small>
                  </h5>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <h6>
                    {{ dt.Customer ? dt.Customer.NamaPelanggan : '-' }}
                  </h6>
                </div>
                <div class="col text-right">
                  <h6><strong>{{ dt.DariLokasi }}</strong></h6>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <h6>
                    {{ dt.created_at | toDate }}
                  </h6>
                </div>
                <div class="col">
                  <h6 class="text-right">
                    <strong>{{ dt.KodeLokasi }}</strong>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="total === 0" class="row mt-3">
          <div class="col text-center">
            Tidak ada Data
          </div>
        </div>
        <div class="row" style="position: absolute; bottom: 0; width: 100%">
          <div class="col-12 justify-content-center">
            <b-pagination
              v-model="page"
              :total-rows="total"
              :limit="3"
              :per-page="5"
              :disabled="isLoading"
              align="center"
              @input="onRefresh"
            />
          </div>
        </div>
      </div>
      <div class="col-9 card">
        <template v-if="selected">
          <div class="row mt-3">
            <div class="col">
              <h4 class="text-primary">
                <strong>
                  {{ selected && selected.KodeKasir }}
                </strong>
              </h4>
              <h6>
                <small>
                  Oleh {{ selected && selected.KodeUser }}
                </small>
              </h6>
            </div>
            <div class="col text-right">
              <h6>
                {{ selected && selected.created_at | toDate }}
              </h6>
              <h6>
                {{ selected && selected.KodeLokasi }}
              </h6>
              <h6>
                <small>
                  Pelanggan {{ selected && selected.Customer ? selected.Customer.NamaPelanggan : '' }}
                </small>
              </h6>
            </div>
          </div>
          <hr>
          <h5 class="text-primary">
            <strong>
              Barang
            </strong>
          </h5>
          <div class="row">
            <div class="col">
              <h6 class="text-primary">
                <strong>
                  Nama
                </strong>
              </h6>
            </div>
            <div class="col text-right">
              <h6 class="text-primary">
                <strong>
                  Kuantitas
                </strong>
              </h6>
            </div>
            <div class="col text-right">
              <h6 class="text-primary">
                <strong>
                  Harga Jual
                </strong>
              </h6>
            </div>
          </div>
          <div class="row pb-5" style="max-height: 45vh !important; overflow-y: scroll;">
            <div class="col">
              <div v-for="(dt, index) in selected && selected.Items" :key="index" class="row">
                <div class="col">
                  {{ dt.NamaItem }}
                </div>
                <div class="col text-right">
                  {{ dt.Qty }} {{ dt.KodeSatuan }}
                  <div v-if="dt.Return">
                    <span class="text-danger">{{ dt.Return.Qty }} {{ dt.Return.KodeSatuan }} (Diretur)</span>
                  </div>
                </div>
                <div class="col text-right">
                  (@{{ dt.Harga | formatPrice }}) {{ dt.Harga * dt.Qty | formatPrice }}
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-3 bg-white" style="position: absolute; bottom: 0; width: 100%;">
            <div class="col-4">
              PPN
            </div>
            <div class="col-8 text-right">
              {{ selected && selected.NilaiPPN === 0 ? 'Harga Sudah Termasuk Pajak (11%)' : '(11%) ' + selected.NilaiPPN }}
            </div>
            <div class="col-4">
              Total
            </div>
            <div class="col-8 text-right">
              {{ selected && selected.Total | formatPrice }}
            </div>
            <div class="col-4">
              Diskon
            </div>
            <div class="col-8 text-right">
              {{ selected && selected.NilaiDiskon | formatPrice }}
            </div>
            <div class="col-4">
              Subtotal
            </div>
            <div class="col-8 text-right">
              {{ selected && selected.Subtotal | formatPrice }}
            </div>
            <div v-show="returnState" v-if="selected && selected.Status === 'CFM'" class="col-12 text-right mt-3">
              <button class="btn btn-danger btn-block btn-sm mb-3 mx-1" @click="onReturn">
                Retur
              </button>
            </div>
            <div v-if="selected && selected.Status === 'OPN'" class="col-12 text-right mt-3">
              <button class="btn btn-success btn-block btn-sm mb-3 mx-1"  @click="onEdit">
                Cek
              </button>
            </div>
            <div v-if="selected && selected.Status === 'CFM'" class="col-12 text-right mt-3">
              <button class="btn btn-primary btn-block btn-sm mb-3 mx-1" @click="onReturn">
                Print
              </button>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="v-center">
            Silahkan memilih transaksi untuk melihat detail
          </div>
        </template>
      </div>
    </div>
    <confirmModal
      ref="modalConfirm"
      @submit="onCanceled"
    />
    <returnModal
      ref="modalReturn"
      :invoice="selected"
      @submit="onRefresh"
    />
    <filterDateModal ref="modalDateRange" :default-start-date="dateStart" :default-end-date="dateEnd" @changed="handleCalendar" />
  </div>
</template>

<script>
import topbar from '~/components/general/topbar.vue'
import confirmModal from '~/components/modal/confirm.vue'
import returnModal from '~/components/modal/return.vue'
import filterDateModal from '~/components/modal/dateRange.vue'
export default {
  name: 'Transaction',
  components: {
    topbar,
    confirmModal,
    returnModal,
    filterDateModal
  },
  asyncData ({ isDev, route, store, env, params, query, req, res, redirect, error }) {
    store.commit('uac/init')
  },
  data () {
    return {
      endpoint: 'item/fetchTransaction',
      cancel_endpoint: 'item/cancelTransaction',
      search: '',
      dateStart: null,
      dateEnd: null,
      page: 1,
      pageData: [],
      selected: null,
      total: 0,
      isError: false,
      isLoading: false,
      isLoading_mutation: false,
      debounce: null,
      returnState: true,
      dateState: false
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    navigateTo (url, keepHistory) {
      if (keepHistory) {
        this.$router.push(url)
      } else {
        this.$router.replace(url)
      }
    },
    handleCalendar (dt) {
      if (dt && dt.date_gte) {
        this.dateState = true
      }
      if (dt && dt.date_lte) {
        this.dateState = true
      } else {
        this.dateState = false
      }
      this.dateStart = dt.date_gte
      this.dateEnd = dt.date_lte
      this.onRefresh()
    },
    showCalendar () {
      this.$refs.modalDateRange.show()
    },
    onSearch () {
      if (this.debounce) {
        clearTimeout(this.debounce)
      }
      this.debounce = setTimeout(() => {
        this.onRefresh()
      }, 1000)
    },
    onClick (dt) {
      this.selected = dt
      let notReturn = 0
      this.selected.Items.forEach((element) => {
        if (element.Return) {
          if (element.Return.Qty < element.Qty) {
            notReturn += 0
          }
        } else {
          notReturn += 1
        }
      })
      this.returnState = (notReturn > 0)
    },
    onRefresh () {
      this.selected = null
      this.fetchData()
    },
    fetchData () {
      const vm = this
      this.isError = false
      this.isLoading = true
      const params = {
        page: vm.page,
        search: vm.search,
        start_date: vm.dateStart,
        end_date: vm.dateEnd
      }
      this.$store.dispatch(this.endpoint, params)
        .then((rslt) => {
          this.pageData = rslt.data.data.data
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
    onConfirm () {
      this.isLoading_mutation = true
      const params = {
        code: this.selected.KodePindah
      }
      this.$store.dispatch(this.outbound_endpoint, params)
        .then((rslt) => {
          this.isLoading_mutation = false
          this.$store.commit('alert/setAlert', {
            type: 'success',
            msg: 'Data Berhasil Disimpan'
          })
          this.onRefresh()
        }).catch((err) => {
          this.isLoading_mutation = false
          console.log(err)
          this.$store.commit('alert/setAlert', {
            type: 'fail',
            msg: err.message
          })
        })
    },
    onCancel () {
      this.$refs.modalConfirm.show()
    },
    onReturn () {
      this.$refs.modalReturn.show()
    },
    onCanceled () {
      this.isLoading_mutation = true
      const params = {
        code: this.selected.KodeKasir
      }
      this.$store.dispatch(this.cancel_endpoint, params)
        .then((rslt) => {
          this.isLoading_mutation = false
          this.$store.commit('alert/setAlert', {
            type: 'success',
            msg: 'Data Berhasil Dibatalkan'
          })
          this.onRefresh()
        }).catch((err) => {
          this.isLoading_mutation = false
          console.log(err)
          this.$store.commit('alert/setAlert', {
            type: 'fail',
            msg: err.message
          })
        })
    },
    onEdit () {
      this.$store.commit('item/setSelected', this.selected)
      this.navigateTo('/dashboard/checker/create', true)
    }
  }
}
</script>

<style>

</style>
