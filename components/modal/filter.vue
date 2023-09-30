<template>
  <div>
    <!-- <input v-model="input" class="form-control input-modal" readonly type="text" @click="show"> -->
    <b-modal
      id="modalFilter"
      ref="modalFilter"
      v-model="state"
      centered
      no-fade
      hide-header
      hide-footer
      size="l"
      modal-class="fade scale"
      content-class="rounded"
    >
      <div>
        <div class="pb-5">
          <div class="row">
            <div class="col">
              <strong class="text-primary">
                Filter
              </strong>
            </div>
          </div>
          <div v-if="isLoading" class="row">
            <div class="col v-center">
              <b-spinner class="mt-4" variant="primary" type="grow" label="Spinning" />
            </div>
          </div>
          <div v-else class="row" style="overflow-y: scroll; height: 50vh">
            <div v-for="(dt, index) in options" :key="index" class="col-3 mt-2 px-0">
              <div :class="{'bg-soft': selected.includes(dt.KodeKategori)}" class="card m-1 text-center text-primary v-center" style="height: 3rem" @click="onSelected(dt.KodeKategori)">
                {{ dt.NamaKategori }}
              </div>
            </div>
          </div>
        </div>
        <div class="row" style="position: absolute; bottom: 0; width: 100%">
          <div class="col">
            {{ selected.length }} Filter Terpilih
          </div>
          <div class="col text-right">
            <b-button variant="outline-danger" class="button-bottom mb-2" @click="selected = []">
              Reset
            </b-button>
            <b-button variant="primary" class="button-bottom mb-2" @click="submit">
              Terapkan
            </b-button>
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
      default: 'Pilih Produk',
      type: String
    },
    warehouse: {
      default: () => { return {} },
      type: Object
    }
  },
  data () {
    return {
      endpoint: 'item/category',
      state: false,
      options: [],
      selected: [],
      search: null,
      isError: false,
      isLoading: false
    }
  },
  methods: {
    show () {
      this.state = true
      this.fetchData()
    },
    onFilter () {

    },
    onSelected (dt) {
      const temp = this.selected.findIndex(e => e === dt)
      if (temp >= 0) {
        this.selected.splice(temp, 1)
      } else {
        this.selected.push(dt)
      }
    },
    onRemove (index) {
    },
    fetchData () {
      const vm = this
      this.isError = false
      this.isLoading = true
      const params = {
        search: vm.search
      }
      this.$store.dispatch(this.endpoint, params)
        .then((rslt) => {
          this.options = rslt.data.data
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
      this.state = false
      this.$emit('submit', this.selected)
    }
  }
}
</script>

<style>
  .modal-xl {
    max-width: 90vw !important;
  }
</style>
