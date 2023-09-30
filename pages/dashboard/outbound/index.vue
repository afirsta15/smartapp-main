<template>
  <div class="layout d-flex flex-column h-100">
    <topbar :refresh="true" :subtitle="'Daftar Mutasi'" @refreshed="onRefresh" />
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
                <div class="col-8 pr-0">
                  <h5 class="text-primary">
                    <small>
                      {{ dt.KodePindah }}
                    </small>
                  </h5>
                </div>
                <div class="col-4 text-right">
                  <b-badge pill :variant="dt.Status === 'CFM' ? 'primary' : dt.Status === 'DEL' ? 'danger' : 'secondary'">
                    {{ dt.Status }}
                  </b-badge>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <h6>
                    {{ dt.created_at | toDate }}
                  </h6>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <h6>
                    Dari
                  </h6>
                </div>
                <div class="col text-right">
                  <h6><strong>{{ dt.DariLokasi }}</strong></h6>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <h6>
                    Tujuan
                  </h6>
                </div>
                <div class="col text-right">
                  <h6><strong>{{ dt.KeLokasi }}</strong></h6>
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
            <div class="col text-right">
              <h4 class="text-primary">
                <strong>
                  {{ selected && selected.KodePindah }}
                </strong>
              </h4>
              <h6>
                {{ selected && selected.created_at | toDate }}
              </h6>
              <h6>
                {{ selected && selected.DariLokasi }} ke {{ selected && selected.KeLokasi }}
              </h6>
              <h6>
                <small>
                  Oleh {{ selected && selected.KodeUser }}
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
          </div>
          <div v-for="(dt, index) in selected && selected.Items" :key="index" class="row">
            <div class="col">
              {{ dt.NamaItem }}
            </div>
            <div class="col text-right">
              {{ dt.Qty }} {{ dt.KodeSatuan }}
            </div>
          </div>
          <div v-show="selected && selected.Status === 'OPN'" class="row" style="position: absolute; bottom: 0; width: 100%">
            <div class="col-12 text-right">
              <button class="btn btn-danger btn-sm mb-3 mx-1" @click="onCancel">
                Batal
              </button>
              <button class="btn btn-info btn-sm mb-3 mx-1" @click="onEdit">
                Ubah
              </button>
              <button class="btn btn-primary btn-sm mb-3 mx-1" @click="onConfirm">
                Confirm
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
    <filterDateModal ref="modalDateRange" :default-start-date="dateStart" :default-end-date="dateEnd" @changed="handleCalendar" />
  </div>
</template>

<script>
import topbar from '~/components/general/topbar.vue'
import confirmModal from '~/components/modal/confirm.vue'
import filterDateModal from '~/components/modal/dateRange.vue'
export default {
  name: 'Outbound',
  components: {
    topbar,
    confirmModal,
    filterDateModal
  },
  asyncData ({ isDev, route, store, env, params, query, req, res, redirect, error }) {
    store.commit('uac/init')
  },
  data () {
    return {
      endpoint: 'item/fetchOutbound',
      outbound_endpoint: 'item/outboundConfirm',
      cancel_endpoint: 'item/outboundCancel',
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
    onCanceled () {
      this.isLoading_mutation = true
      const params = {
        code: this.selected.KodePindah
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
      this.navigateTo('/dashboard/outbound/create')
    }
  }
}
</script>

<style>

</style>
