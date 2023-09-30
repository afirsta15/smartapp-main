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
          <div class="pt-4">
            <h5 class="text-primary">
              <strong>
                {{ title }}
              </strong>
            </h5>
          </div>
          <input v-model="search" :placeholder="'Cari'" class="form-control input-modal mt-2 mb-3" type="text" @input="onSearch">
          <div v-if="isLoading" class="row">
            <div class="col v-center">
              <b-spinner class="mt-4" variant="primary" type="grow" label="Spinning" />
            </div>
          </div>
          <div v-for="(dt,i) in options" v-else :key="'o-' + i">
            <div
              class="row mx-0 card clickable mb-2 py-3"
              @click="onSelected(dt)"
            >
              {{ dt.Kontak }} <br> {{ dt.NamaPelanggan }}
            </div>
          </div>
          <div v-if="options.length === 0 && !isError" class="mt-3">
            Data Tidak Ditemukan <br>
            <b-button class="mt-3" variant="primary">
              Customer Baru
            </b-button>
          </div>
        </b-container>
        <div>
          <div class="justify-content-center">
            <b-pagination
              v-model="page"
              :total-rows="total"
              :per-page="5"
              :disabled="isLoading"
              align="center"
              @input="fetchData"
            />
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
    except: {
      default: '',
      type: String
    },
    initial: {
      default: '',
      type: String
    }
  },
  data () {
    return {
      input: null,
      state: false,
      search: null,
      options: [],
      selected: null,
      endpoint: 'app/fetchCustomer',
      page: 1,
      total: 0,
      isError: false,
      isLoading: false,
      debounce: null
    }
  },
  mounted () {
    if (this.initial) {
      this.input = this.initial
    }
  },
  methods: {
    onSearch () {
      if (this.debounce) {
        clearTimeout(this.debounce)
      }
      this.debounce = setTimeout(() => {
        this.fetchData()
      }, 1000)
    },
    fetchData () {
      const vm = this
      this.isError = false
      this.isLoading = true
      const params = {
        page: vm.page,
        search: vm.search
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
    show () {
      this.state = true
      this.search = null
      this.fetchData()
    },
    reset () {
      this.input = null
      this.selected = null
    },
    onSelected (dt) {
      this.input = dt.NamaPelanggan
      this.selected = dt
      this.$emit('submit', this.selected)
      this.state = false
    }
  }
}
</script>

<style>

</style>
