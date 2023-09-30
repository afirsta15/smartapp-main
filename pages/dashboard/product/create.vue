<template>
  <div class="layout d-flex flex-column h-100">
    <topbar :subtitle="''" />
    <div class="top-divider" />
    <div class="row mt-2 mx-3">
      <div class="col-5">
        <h4>
          <strong>
            {{ $store.getters['item/getSelected'] ? 'Ubah Produk' : 'Buat Produk' }}
          </strong>
        </h4>
        <h5 v-if="$store.getters['item/getSelected']">
          {{ $store.getters['item/getSelected'].KodeItem }}
        </h5>
      </div>
      <div class="bl-1 col-7">
        <div class="row pl-3">
          <div class="col-12 pl-1">
            <h6 class="text-primary">
              <strong>
                Rak Item
              </strong>
            </h6>
            <inputOptions
              ref="inputOptionsRack"
              :default-options="rackOptions"
              :value="'nama_rak'"
              :initial="rack.nama_rak"
              @submit="(dt) => {rack = dt}"
            />
            <h6 class="mt-2 text-primary">
              <strong>
                Kategori
              </strong>
            </h6>
            <inputOptions
              ref="inputOptionsCategory"
              :default-options="categoryOptions"
              :value="'NamaKategori'"
              :initial="category.NamaKategori"
              @submit="(dt) => {category = dt}"
            />
            <h6 class="mt-2 text-primary">
              <strong>
                Nama Item
              </strong>
            </h6>
            <input v-model="name" class="form-control input-modal" type="text">
            <h6 class="mt-2 text-primary">
              <strong>
                Jenis Item
              </strong>
            </h6>
            <inputOptions
              ref="inputOptionsType"
              :default-options="typeOptions.map((dt) => { return dt.title})"
              :initial="type.title"
              @submit="(dt) => {type = typeOptions.find((lt) => {return lt.title === dt})}"
            />
            <h6 class="mt-2 text-primary">
              <strong>
                Keterangan
              </strong>
            </h6>
            <b-form-textarea
              v-model="description"
              rows="3"
              max-rows="6"
            />
            <h6 class="mt-2 text-primary">
              <strong>
                HPP
              </strong>
            </h6>
            <inputNumber
              ref="inputNumberHPP"
              :value="hpp"
              @submit="(dt) => {hpp = dt}"
            />
            <h6 class="mt-2 text-primary">
              <strong>
                Harga Jual
              </strong>
            </h6>
            <inputNumber
              ref="inputNumberSale"
              :value="sale"
              @submit="(dt) => {sale = dt}"
            />
            <h6 class="mt-2 text-primary">
              <strong>
                Satuan
              </strong>
            </h6>
            <inputUnit
              ref="inputUnit"
              :value="unit"
              @submit="(dt) => {unit = dt}"
            />
          </div>
        </div>
        <div class="row mt-3 pb-3">
          <div class="col text-right">
            <b-button variant="primary" class="button-bottom" @click="submit">
              Simpan
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import topbar from '~/components/general/topbar.vue'
import inputOptions from '~/components/modal/options.vue'
import inputNumber from '~/components/modal/number.vue'
import inputUnit from '~/components/modal/unit.vue'
export default {
  components: {
    topbar,
    inputOptions,
    inputNumber,
    inputUnit
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
      endpoint: 'item/create',
      edit_endpoint: 'item/update',
      code: null,
      rack: '',
      category: '',
      name: '',
      type: '',
      description: '',
      hpp: 0,
      sale: 0,
      unit: null,
      typeOptions: [
        {
          title: 'Bahan Baku',
          value: 'bahanbaku'
        },
        {
          title: 'Bahan Jadi',
          value: 'bahanjadi'
        },
        {
          title: 'Bahan Setengah Jadi',
          value: 'bahansetengahjadi'
        }
      ],
      rackOptions: [],
      categoryOptions: [],
      isError: false,
      isLoading: false
    }
  },
  computed: {
  },
  created () {
    if (this.$store.getters['item/getSelected']) {
      this.setData()
    }
  },
  mounted () {
    this.rackOptions = this.$store.getters['app/getRack']
    this.categoryOptions = this.$store.getters['app/getCategory']
    this.$nextTick(() => {
    })
  },
  methods: {
    setData () {
      this.rackOptions = this.$store.getters['app/getRack']
      this.categoryOptions = this.$store.getters['app/getCategory']
      const tempSatuan = this.$store.getters['app/getUnit']
      const temp = JSON.parse(JSON.stringify(this.$store.getters['item/getSelected']))
      console.log(temp);
      this.rack = this.rackOptions.find((lt) => { return lt.KodeRak === temp.KodeRak })
      this.category = this.categoryOptions.find((lt) => { return lt.KodeKategori === temp.KodeKategori })
      this.name = temp.NamaItem
      this.type = this.typeOptions.find((lt) => { return lt.value === temp.jenisitem })
      this.description = temp.Keterangan
      this.hpp = temp.HargaBeli
      this.sale = temp.HargaJual
      this.unit = tempSatuan.find((lt) => { return lt.KodeSatuan === temp.KodeSatuan })
      this.code = temp.KodeItem
    },
    navigateTo (url, keepHistory) {
      if (keepHistory) {
        this.$router.push(url)
      } else {
        this.$router.replace(url)
      }
    },
    submit () {
      const params = {
        code: this.code ? this.code : null,
        rack: this.rack ? this.rack.KodeRak : '',
        category: this.category ? this.category.KodeKategori : '',
        name: this.name,
        type: this.type ? this.type.value : '',
        description: this.description,
        hpp: this.hpp,
        sale: this.sale,
        unit: this.unit ? this.unit.KodeSatuan : ''
      }
      this.$store.dispatch(this.$store.getters['item/getSelected'] ? this.edit_endpoint : this.endpoint, params)
        .then((rslt) => {
          this.$store.commit('alert/setAlert', {
            type: 'success',
            msg: 'Data Berhasil Disimpan'
          })
          this.navigateTo('/dashboard/product')
        }).catch((err) => {
          console.log(err)
          this.$store.commit('alert/setAlert', {
            type: 'fail',
            msg: 'Terjadi Kesalahan'
          })
        })
    }
  }
}
</script>

<style>

</style>
