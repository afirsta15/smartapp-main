<template>
  <div class="layout d-flex flex-column h-100">
    <topbar :subtitle="'Setting'" />
    <div class="top-divider" />
    <div class="row mt-3 mx-2 pb-2" style="height: 80% !important">
      <div class="col-3">
        <div class="row" style="max-height: 85% !important; overflow-y: scroll;">
          <div class="col-12">
            <div class="card px-2 py-1" :class="{'bg-soft': selected === 'PPN'}" @click="selected = 'PPN'">
              <div class="row py-3 ml-1">
                <div class="col-12 pr-0">
                  <h5 class="text-primary">
                    PPN
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 mt-3">
            <div class="card px-2 py-1" :class="{'bg-soft': selected === 'PRINT'}" @click="selected = 'PRINT'">
              <div class="row py-3 ml-1">
                <div class="col-12 pr-0">
                  <h5 class="text-primary">
                    Printer
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-9 card">
        <template v-if="selected === 'PPN'">
          <div class="row mt-3">
            <div class="col-12 mb-2">
              <h6>
                <strong>
                  Tipe Penjualan
                </strong>
              </h6>
            </div>
            <div class="col-6">
              <div class="row mx-2 card" :class="{'bg-soft': ppn.isIncludePPN === 1}" @click="ppn.isIncludePPN = 1">
                <div class="col-12 py-3 text-center">
                  Harga Termasuk Pajak
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="row mx-2 card" :class="{'bg-soft': ppn.isIncludePPN === 0}" @click="ppn.isIncludePPN = 0">
                <div class="col-12 py-3 text-center">
                  Harga Tidak Termasuk Pajak
                </div>
              </div>
            </div>
            <template v-if="ppn.isIncludePPN === 0">
              <div class="col-12 mt-3">
                <h6>
                  <strong>
                    Nilai Pajak
                  </strong>
                </h6>
              </div>
              <div class="col-4">
                <div class="mx-2">
                  <b-input-group append="%">
                    <input v-model="ppn.ppnValue" class="form-control" type="text">
                    <!-- <b-form-input /> -->
                  </b-input-group>
                </div>
              </div>
            </template>
            <div class="row" style="position: absolute; bottom: 0; width: 100%">
              <div class="col-12 text-right">
                <button class="btn btn-primary btn-sm mb-3 mx-1" @click="onSave('PPN')">
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </template>
        <template v-else-if="selected === 'PRINT'">
          <div class="row mt-3">
            <div class="col-12">
              <div class="mt-2">
                <h6>
                  <strong>
                    Lebar Printer
                  </strong>
                </h6>
                <input v-model="printerLength" class="form-control" type="number">
              </div>
              <div class="mt-2">
                <h6>
                  <strong>
                    Printer Header
                  </strong>
                </h6>
                <input v-model="printerHeader" class="form-control" type="text">
              </div>
              <div class="mt-2">
                <h6>
                  <strong>
                    Printer Address
                  </strong>
                </h6>
                <input v-model="printerAddress" class="form-control" type="text">
              </div>
              <div class="mt-2">
                <h6>
                  <strong>
                    Printer Contact
                  </strong>
                </h6>
                <input v-model="printerContact" class="form-control" type="text">
              </div>
              <div class="mt-2">
                <h6>
                  <strong>
                    Printer Footer
                  </strong>
                </h6>
                <input v-model="printerFooter" class="form-control" type="text">
              </div>
            </div>
            <div class="col-12 mt-3">
              <button class="btn btn-primary btn-sm mb-3 mx-1" @click="onSave('Printer')">
                Save Template
              </button>
              <button class="btn btn-primary btn-sm mb-3 mx-1" @click="loadPrinter">
                Cari Printer
              </button>
              <button class="btn btn-primary btn-sm mb-3 mx-1" @click="print">
                Test Print
              </button>
            </div>
            <div class="col-12">
              Pilih Default Printer
            </div>
            <div v-for="(dt, i) in printer" :key="i" class="col-12 mt-2">
              <div class="card px-2 py-1" :class="{'bg-soft': dt === selectedPrinter}" @click="onSelectedPrinter(dt)">
                <div v-for="(dt2, i2) in dt" :key="i2">
                  {{ i2 !== 2 ? dt2 : '' }}
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="v-center">
            Silahkan memilih Pengaturan
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import topbar from '~/components/general/topbar.vue'
export default {
  name: 'Setting',
  components: {
    topbar
  },
  asyncData ({ isDev, route, store, env, params, query, req, res, redirect, error }) {
    store.commit('uac/init')
    store.commit('app/init')
  },
  data () {
    return {
      selected: null,
      ppn: {
        ppnValue: 0,
        isIncludePPN: 0
      },
      selectedPrinter: null,
      printer: null,
      printerLength: 42,
      printerHeader: 'Dniz Techno',
      printerAddress: 'dniztecho@example.com',
      printerContact: '081123456789',
      printerFooter: 'Kritik & Saran: 0812345789',
      printer_loading: false
    }
  },
  created () {
  //this.loadPrinter()
  },
  mounted () {
    if (this.$store.getters['app/getPPN']) {
      this.ppn = JSON.parse(JSON.stringify(this.$store.getters['app/getPPN']))
    }
    if (this.$store.getters['app/getPrint']) {
      this.selectedPrinter = JSON.parse(JSON.stringify(this.$store.getters['app/getPrint']))
    }
    if (this.$store.getters['app/getPrinterLength']) {
      this.printerLength = JSON.parse(JSON.stringify(this.$store.getters['app/getPrinterLength']))
    }
    if (this.$store.getters['app/getPrinterHeader']) {
      this.printerHeader = JSON.parse(JSON.stringify(this.$store.getters['app/getPrinterHeader']))
    }
    if (this.$store.getters['app/getPrinterAddress']) {
      this.printerAddress = JSON.parse(JSON.stringify(this.$store.getters['app/getPrinterAddress']))
    }
    if (this.$store.getters['app/getPrinterContact']) {
      this.printerContact = JSON.parse(JSON.stringify(this.$store.getters['app/getPrinterContact']))
    }
    if (this.$store.getters['app/getPrinterFooter']) {
      this.printerFooter = JSON.parse(JSON.stringify(this.$store.getters['app/getPrinterFooter']))
    }
  },
  methods: {
    navigateTo (url, keepHistory) {
      if (keepHistory) {
        this.$router.push(url)
      } else {
        this.$router.replace(url)
      }
    },
    loadPrinter () {
      const vm = this
      vm.printer = null
      // eslint-disable-next-line no-undef
      BTPrinter.list(function (data) {
        const groupByN = (n, data) => {
          const result = []
          for (let i = 0; i < data.length; i += n) { result.push(data.slice(i, i + n)) }
          return result
        }
        vm.printer = groupByN(3, data)
        console.log('PRINTER', vm.printer)
        vm.printer_loading = false
      }, function (err) {
        console.log('err: ', err)
        self.printer_loading = false
      })
    },
    onSelectedPrinter (dt) {
      this.selectedPrinter = dt
      this.$store.commit('app/setPrint', JSON.parse(JSON.stringify(dt)))
    },
    print () {
      const printer = this.$store.getters['app/getPrint']
      // PRINTER CONNECT
      // eslint-disable-next-line no-undef
      BTPrinter.connect(function (data) {
        console.log('Connected')
        console.log(data)
      }, function (err) {
        console.log('Error connect')
        console.log(err)
      }, printer[0])

      // PRINTING
      // eslint-disable-next-line no-undef
      BTPrinter.printTextSizeAlign(function (data) {
        console.log('Success')
        console.log(data)
      }, function (err) {
        console.log('Error')
        console.log(err)
      }, '123456789.123456789.123456789.123456789.123456789.123456789.123456789.123456789.123456789.123456789.', '1', '0')// string, size, align

      // PRINTER DISCONNECT
      setTimeout(function () {
      // eslint-disable-next-line no-undef
        BTPrinter.disconnect(function (data) {
          console.log('Success')
          console.log(data)
        }, function (err) {
          console.log('Error')
          console.log(err)
        }, 'PrinterName')
      }, 1500)
    },
    onSave (dt) {
      switch (dt) {
        case 'PPN':
          this.$store.commit('app/setPPN', JSON.parse(JSON.stringify(this.ppn)))
          break
        case 'Printer':
          // eslint-disable-next-line no-case-declarations
          const tempTemplate = {
            length: this.printerLength,
            header: this.printerHeader,
            address: this.printerAddress,
            contact: this.printerContact
          }
          this.$store.commit('app/setPrinterTemplate', JSON.parse(JSON.stringify(tempTemplate)))
          break
        default:
          break
      }
      this.$store.commit('alert/setAlert', {
        type: 'success',
        msg: 'Data Berhasil Disimpan'
      })
    }
  }
}
</script>

<style>
.input-group-append {
  height: 2.3rem !important
}
</style>
