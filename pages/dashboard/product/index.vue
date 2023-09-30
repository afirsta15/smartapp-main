<template>
  <div class="layout d-flex flex-column h-100">
    <topbar :refresh="true" :subtitle="'Daftar Produk'" @refreshed="onRefresh" />
    <div class="top-divider" />
    <div class="row mt-3 mx-2 pb-2" style="height: 85% !important">
      <div class="col-3">
        <div class="row">
          <div class="col">
            <input v-model="search" :placeholder="'Cari'" class="form-control input-modal mt-2 mb-3" type="text" @input="onSearch">
          </div>
          <div class="col-2 pl-1">
            <b-icon class="mt-3" :variant="filter.length > 0 ? 'primary' : ''" font-scale="1.2" icon="ui-radios" @click="onFilter" />
          </div>
        </div>
        <div v-if="isLoading" class="row">
          <div class="col v-center">
            <b-spinner class="mt-4" variant="primary" type="grow" label="Spinning" />
          </div>
        </div>
        <div v-else class="row" style="max-height: 80% !important; overflow-y: scroll;">
          <div v-for="(dt, index) in pageData" :key="index" class="col-12">
            <div class="card px-2 py-1" :class="{'bg-soft': dt === selected}" @click="onClick(dt)">
              <div class="row">
                <div class="col pr-0">
                  <h5 class="text-primary">
                    <small>
                      {{ dt.KodeItem }}
                    </small>
                  </h5>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <h6>
                    {{ dt.NamaItem }}
                  </h6>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <h6>
                    <!-- {{ dt.created_at | toDate }} -->
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
              :per-page="6"
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
                  {{ selected && selected.KodeItem }}
                </strong>
              </h4>
              <h6>
                {{ selected && selected.NamaItem }}
              </h6>
              <h6>
                <small>
                  Oleh {{ selected && selected.KodeUser }}
                </small>
              </h6>
              <b-badge variant="primary">
                {{ selected && selected.jenisitem }}
              </b-badge>
              <h6 class="mt-2 mb-0">
                Deskripsi : {{ selected && selected.Keterangan }}
              </h6>
              <h6 class="mt-2 mb-0">
                Jumlah Stok : {{ selected && selected.Stok }}
              </h6>
            </div>
            <div class="col text-right">
              <h6>
                {{ selected && selected.created_at | toDate }}
              </h6>
            </div>
          </div>
          <hr>
          <div class="row">
            <div class="col">
              Rincian Stok
            </div>
          </div>
          <div class="row mt-3">
            <div v-for="(dt, i) in selected.Stats" :key="i" class="col-12 mt-2">
              <b-card>
                <div class="row">
                  <div class="col-6">
                    <h5 class="mb-0">
                      {{ dt.NamaLokasi }} ({{ dt.KodeLokasi }})
                    </h5>
                  </div>
                  <div class="col-6 text-right">
                    <h4 class="mb-0 text-primary">
                      Stok {{ dt.Stok || 0 }}
                    </h4>
                  </div>
                </div>
              </b-card>
            </div>
          </div>

          <div class="row" style="position: absolute; bottom: 0; width: 100%">
            <div class="col-12 text-right">
              <button class="btn btn-info btn-sm mb-3 mx-1" @click="onEdit">
                Ubah
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
    <inputFilter
      ref="inputFilter"
      @submit="onFilterAdded"
    />
  </div>
</template>

<script>
import topbar from '~/components/general/topbar.vue'
import inputFilter from '~/components/modal/filter.vue'
export default {
  name: 'Transaction',
  components: {
    topbar,
    inputFilter
  },
  asyncData ({ isDev, route, store, env, params, query, req, res, redirect, error }) {
    store.commit('uac/init')
  },
  data () {
    return {
      endpoint: 'item/fetch',
      cancel_endpoint: 'item/cancelTransaction',
      search: null,
      dateStart: null,
      dateEnd: null,
      page: 1,
      pageData: [],
      filter: [],
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
    onSearch () {
      if (this.debounce) {
        clearTimeout(this.debounce)
      }
      this.debounce = setTimeout(() => {
        this.onRefresh()
      }, 1000)
    },
    onFilter () {
      this.$refs.inputFilter.show()
    },
    onFilterAdded (dt) {
      this.filter = dt
      this.fetchData()
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
        per_page: 6,
        page: vm.page,
        search: vm.search,
        category: vm.filter
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
    onCancel () {
      this.$refs.modalConfirm.show()
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
      this.navigateTo('/dashboard/product/create')
    }
  }
}
</script>

<style>

</style>
