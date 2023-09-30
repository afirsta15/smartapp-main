<template>
  <div class="layout d-flex flex-column h-100">
    <topbar :subtitle="'Buat Mutasi'" />
    <div class="top-divider" />
    <div class="row mt-5 mx-5 pb-5">
      <div class="col-12 px-0 mb-3">
        <div v-if="$store.getters['item/getSelected']" class="row">
          <div class="col">
            <h5 class="mb-0 text-primary">
              <strong>
                Ubah Dokumen {{ $store.getters['item/getSelected'].KodePindah }}
              </strong>
            </h5>
          </div>
        </div>
      </div>
      <div class="card col">
        <div class="row mb-2">
          <div class="col m-2">
            <h6 class="mb-0 text-primary">
              <strong>
                Gudang Asal
              </strong>
            </h6>
            <inputWarehouse
              ref="fromWarehouse"
              :title="'Gudang Asal'"
              class="mt-2"
              :initial="from"
              @submit="onSelectWarehouse"
            />
          </div>
          <div class="col m-2">
            <h6 class="mb-0 text-primary">
              <strong>
                Gudang Tujuan
              </strong>
            </h6>
            <inputWarehouse
              ref="WarehouseDestination"
              :title="'Gudang Tujuan'"
              :except="from"
              :initial="to"
              class="mt-2"
              @submit="(dt) => {to = dt.KodeLokasi}"
            />
          </div>
        </div>
      </div>
      <div class="card col-3 ml-3 pl-0">
        <div class="m-2 pl-3">
          <h6 class="mb-0 text-primary">
            <strong>
              Tanggal
            </strong>
          </h6>
          <inputDate
            ref="inputDate"
            class="mt-2"
            :initial="date"
            :disabled-state="$store.getters['item/getSelected'] ? true : false"
            @submit="(dt) => {date = dt}"
          />
        </div>
      </div>
      <div class="col-12 mt-4 px-0">
        <h6 class="mb-0 text-primary mb-2">
          <strong>
            Keterangan
          </strong>
        </h6>
        <b-form-textarea
          v-model="description"
          rows="3"
          max-rows="6"
        />
      </div>
      <div class="col-12 mt-4 px-0 card ">
        <div class="row m-2 bb-1 pb-2">
          <div class="col">
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
                Kuantitas
              </strong>
            </h6>
          </div>
          <div class="col-1" />
        </div>
        <div v-for="(item, index) in lines" :key="index" class="row m-2">
          <div class="col">
            <input v-model="item.NamaItem" class="form-control input-modal" readonly type="text">
          </div>
          <div class="col-2">
            <input v-model="item.KodeSatuan" class="form-control input-modal" readonly type="text">
            <!-- <inputUnit
              ref="inputUnit"
              :title="'Satuan'"
              :value="item.Satuan"
              @submit="(dt) => {item.Satuan = dt}"
            /> -->
          </div>
          <div class="col-2">
            <inputNumber
              ref="inputNumber"
              :value="item.Qty"
              :max="item.Stok"
              @submit="(dt) => {item.Qty = dt}"
            />
          </div>
          <div class="col-1">
            <b-icon class="mt-1 text-danger" icon="x" font-scale="1.7" @click="onRemove(index)" />
          </div>
        </div>
        <div class="row m-2">
          <div v-show="lines.length === 0" class="col-12 text-center my-5">
            Item belum ditambahkan
          </div>
          <div class="col-12">
            <button class="btn btn-primary btn-block mb-4 mt-3" @click="onAddItem">
              Tambah Item
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white comp-bottom text-right p-3 bt-1">
      <b-button variant="primary" class="button-bottom" @click="submit">
        {{ $store.getters['item/getSelected'] ? 'Ubah' : 'Simpan' }}
      </b-button>
    </div>
    <inputProduct
      ref="inputProduct"
      :value="lines"
      :warehouse="from"
      @submit="onItemAdded"
    />
  </div>
</template>

<script>
import moment from 'moment'
import topbar from '~/components/general/topbar.vue'
import inputProduct from '~/components/modal/product.vue'
import inputWarehouse from '~/components/modal/warehouse.vue'
// import inputUnit from '~/components/modal/unit.vue'
import inputNumber from '~/components/modal/number.vue'
import inputDate from '~/components/modal/date.vue'
export default {
  name: 'OutboundCreate',
  components: {
    topbar,
    inputProduct,
    inputWarehouse,
    // inputUnit,
    inputNumber,
    inputDate
  },
  asyncData ({ isDev, route, store, env, params, query, req, res, redirect, error }) {
    store.commit('uac/init')
    store.commit('app/init')
    store.commit('item/init')
  },
  data () {
    return {
      code: null,
      from: null,
      to: null,
      date: null,
      description: null,
      store_endpoint: 'item/outbound',
      update_endpoint: 'item/outboundUpdate',
      lines: []
    }
  },
  created () {
    if (this.$store.getters['item/getSelected']) {
      this.setData()
    }
  },
  mounted () {
  },
  methods: {
    setData () {
      const temp = JSON.parse(JSON.stringify(this.$store.getters['item/getSelected']))
      this.from = temp.DariLokasi
      this.to = temp.KeLokasi
      this.description = temp.Keterangan
      this.lines = temp.Items
      this.code = temp.KodePindah
      this.date = moment(temp.Tanggal).format('DD-MM-YYYY')
      console.log(temp);
    },
    navigateTo (url, keepHistory) {
      if (keepHistory) {
        this.$router.push(url)
      } else {
        this.$router.replace(url)
      }
    },
    onSelectWarehouse (dt) {
      this.from = dt.KodeLokasi
      this.to = null
      this.lines = []
      this.$refs.WarehouseDestination.reset()
    },
    submit () {
      const params = {
        code: this.code ? this.code : null,
        from: this.from ? this.from : '',
        to: this.to ? this.to : '',
        date: this.date,
        description: this.description,
        lines: this.lines.map((dt) => {
          return {
            code: dt.KodeItem,
            unit: dt.KodeSatuan,
            qty: dt.Qty
          }
        })
      }
     c
        .then((rslt) => {
          this.$store.commit('alert/setAlert', {
            type: 'success',
            msg: 'Data Berhasil Disimpan'
          })
          this.navigateTo('/dashboard/outbound')
        }).catch((err) => {
          console.log(err)
          this.$store.commit('alert/setAlert', {
            type: 'fail',
            msg: 'Terjadi Kesalahan'
          })
        })
    },
    onAddItem () {
      // console.log('thisref: ', this.$refs)
      if (!this.from) {
        this.$store.commit('alert/setAlert', {
          type: 'fail',
          msg: 'Gudang Asal Belum dipilih'
        })
        return
      }
      this.$refs.inputProduct.show()
    },
    onRemove (index) {
      this.lines.splice(index, 1)
    },
    onItemAdded (dt) {
      const error = []
      dt.forEach((element) => {
        const e = this.lines.findIndex(e => e.id === element.id)
        if (e < 0) {
          this.lines.push(element)
        } else {
          const temp = this.lines[e]
          temp.Qty += element.Qty
          if (temp.Qty > element.Stok) {
            temp.Qty = element.Stok
            error.push(element.NamaItem)
          }
          this.lines.splice(e, 1)
          this.lines.splice(e, 0, temp)
        }
      })
      if (error.length > 0) {
        this.$store.commit('alert/setAlert', {
          type: 'fail',
          msg: 'Qty ' + error + ' melebihi Stok'
        })
      }
    }
  }
}
</script>

<style>
</style>
