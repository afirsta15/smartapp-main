<template>
    <div>
      <b-modal
        id="modalSelect"
        ref="modalSelect"
        v-model="state"
        centered
        no-fade
        hide-header
        hide-footer
        no-close-on-backdrop
        modal-class="fade scale"
        content-class="rounded"
        title="BootstrapVue"
      >
        <div>
          <b-container class="mb-4">
            <div class="pt-4">
              <h5 class="text-primary text-center">
                <strong>
                  {{ title }}
                </strong>
              </h5>
            </div>
            <div class="mt-3 text-left">
              <div v-if="initial" class="row">
                <div class="col-6">
                 Kode Kasir
                </div>
                <div class="col-6 text-right">
                  {{ initial.KodeKasir}}
                </div>
                <div class="col-6">
                  Atas Nama
                </div>
                <div class="col-6 text-right">
                  {{ initial.customer ? initial.customer.NamaPelanggan : '-' }}
                </div>
                <div class="col-6">
                  Total Tagihan
                </div>
                <div class="col-6 text-right">
                  {{ initial.total | formatPrice }}
                </div>
                <div class="col-6">
                  Pajak
                </div>
                <div v-if="initial.tax !== 0" class="col-6 text-right">
                  ({{ initial.tax }}%) {{ initial.taxValue | formatPrice }}
                </div>
                <div v-else class="col-6 text-right">
                  Sudah Termasuk Pajak
                </div>
              </div>
              <div class="row mt-2">
                <div class="col">
                  <h6>
                    Diskon
                  </h6>
                </div>
                <div class="col text-right">
                  <b-form-checkbox v-model="discountType" name="check-button" switch @input="discount = 0">
                    {{ discountType ? '%' : 'Nominal' }}
                  </b-form-checkbox>
                </div>
              </div>
              <inputNumber
                ref="inputNumber"
                :value="discount"
                @submit="(lt) => {discount = lt}"
              />
              <div class="row mt-2">
                <div class="col">
                  <h6 class="mb-0">
                    <strong>
                      Tagihan Akhir
                    </strong>
                  </h6>
                </div>
                <div v-if="initial" class="col text-right">
                  <h6 class="mb-0">
                    <strong>
                      {{ discountType ? initial.total - (initial.total * (discount /100)) : initial.total - discount | formatPrice }}
                    </strong>
                  </h6>
                </div>
              </div>
              <hr>
              <h6 class="mt-3">
                Nominal Pembayaran
              </h6>
              <inputNumber
                ref="inputNumber"
                :value="payment"
                @submit="(lt) => {payment = lt}"
              />
              <div v-if="initial" class="row mt-2">
                <div class="col-6">
                  <h6 class="mb-0">
                    <strong>
                      Kembalian
                    </strong>
                  </h6>
                </div>
                <div class="col-6 text-right">
                  <h6 class="mb-0">
                    <strong>
                      {{ payment - (discountType ? (initial.total - (initial.total * (discount /100))) : (initial.total - discount)) > 0 ? discountType ? payment - (initial.total - (initial.total * (discount /100))) : payment - (initial.total - discount) : 0 | formatPrice }}
                    </strong>
                  </h6>
                </div>
              </div>
            </div>
            <div class="mt-3">
              <div class="row">
                <div class="col-3">
                  <b-button block variant="outline-danger" @click="state = false">
                    Batal
                  </b-button>
                </div>
                <div class="col-9 pl-0">
                  <b-button block variant="primary" :disabled="initial && initial.total ? payment < (discountType ? initial.total - (initial.total * (discount /100)) : initial.total - discount) : true" @click="submit">
                    Bayar
                  </b-button>
                </div>
              </div>
            </div>
          </b-container>
        </div>
      </b-modal>
    </div>
  </template>
  
  <script>
  import moment from 'moment'
  import inputNumber from '~/components/modal/number.vue'
  export default {
    components: {
      inputNumber
    },
    props: {
      title: {
        default: 'Pembayaran Nih',
        type: String
      }
    },
    data () {
      return {
        update_endpoint: 'item/checkerUpdate',
        payment: 0,
        discount: 0,
        discountType: false,
        initial: null,
        state: false,
        isError: false,
        isLoading: false
      }
    },
    mounted () {
      if (this.initial) {
        this.input = this.initial
        console.log('test: ', this.input)
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
      show (dt) {
        this.state = true
        this.initial = dt
        this.payment = 0
        this.discount = 0
        this.discountType = false
        const item = this.initial.product
        console.log(this.initial)
        console.log(this.item)
      },
      submit () {
        const params = {
          KodeKasir: this.initial.KodeKasir,
          warehouse: this.initial.warehouse,
          customer: this.initial.customer ? this.initial.customer.KodePelanggan : '',
          tax: this.initial.ppn && !this.initial.ppn.isIncludePPN ? this.initial.ppn.ppnValue : 0,
          payment: this.payment,
          discount: this.discountType ? this.initial.total * (this.discount / 100) : this.discount,
          lines: this.initial.lines
        }
        this.$store.dispatch(this.update_endpoint, params)
          .then((rslt) => {
            this.$store.commit('alert/setAlert', {
              type: 'success',
              msg: 'Data Berhasil Disimpan'
            })
            this.state = false
            this.navigateTo('/dashboard/cashier')
            this.printTwice()
          }).catch((err) => {
            console.log(err)
            this.$store.commit('alert/setAlert', {
              type: 'fail',
              msg: 'Terjadi Kesalahan'
            })
          })
      },
      checkData () {
        console.log('initial: ', this.initial)
      },
      formatPrice (value) {
        if (!value) { return 0 }
        const val = (value / 1).toFixed(0).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      },
      printTwice() {
        this.print();
        setTimeout(() => {
          this.print();
        }, 2000); // Sesuaikan jeda antara pencetakan pertama dan kedua jika diperlukan
      },
      print () {
        const printer = this.$store.getters['app/getPrint']
        const length = this.$store.getters['app/getPrinterLength']
        const header = this.$store.getters['app/getPrinterHeader']
        const address = this.$store.getters['app/getPrinterAddress']
        const contact = this.$store.getters['app/getPrinterContact']
        const footer = this.$store.getters['app/getPrinterFooter']
        const kodekasir = this.initial.KodeKasir
        const customer = this.initial.customer.NamaPelanggan
        const cashier = this.$store.getters['uac/getUser']
        const product = this.initial.product
        console.log(product)
        const total = this.formatPrice(this.initial.total)
        const change = this.formatPrice(this.payment - (this.discountType ? (this.initial.total - (this.initial.total * (this.discount / 100))) : (this.initial.total - this.discount)) > 0 ? this.discountType ? this.payment - (this.initial.total - (this.initial.total * (this.discount / 100))) : this.payment - (this.initial.total - this.discount) : 0)
        const payment = this.formatPrice(this.payment)
        const discount = this.discount ? this.formatPrice(this.discount) : '0'
        const tax = this.initial.tax !== 0 ? this.formatPrice(this.initial.taxValue) : this.formatPrice(this.initial.total * (this.$store.getters['app/getPPN'].ppnValue / 100))
        let line = ''
        for (let index = 0; index < length; index++) {
          line += '-'
        }
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
        }, function (err) {
          console.log(err)
        }, header, '1', '1')
  
        // eslint-disable-next-line no-undef
        BTPrinter.printTextSizeAlign(function (data) {
        }, function (err) {
          console.log(err)
        }, address, '1', '1')
  
        // eslint-disable-next-line no-undef
        BTPrinter.printTextSizeAlign(function (data) {
        }, function (err) {
          console.log(err)
        }, contact, '1', '1')
  
        // eslint-disable-next-line no-undef
        BTPrinter.printTextSizeAlign(function (data) {
        }, function (err) {
          console.log(err)
        }, moment().format('DD-MM-YYYY HH:mm'), '1', '1')
  
        // eslint-disable-next-line no-undef
        BTPrinter.printTextSizeAlign(function (data) {
        }, function (err) {
          console.log(err)
        }, line, '1', '0')
        
         // eslint-disable-next-line no-undef
         BTPrinter.printTextSizeAlign(function (data) {
        }, function (err) {
          console.log(err)
        }, 'KodeKasir : ' + kodekasir.substring(0, 14), '1', '0')

        // eslint-disable-next-line no-undef
        BTPrinter.printTextSizeAlign(function (data) {
        }, function (err) {
          console.log(err)
        }, 'Pelanggan : ' + customer.substring(0, 14), '1', '0')
  
        // eslint-disable-next-line no-undef
        BTPrinter.printTextSizeAlign(function (data) {
        }, function (err) {
          console.log(err)
        }, 'Kasira : ' + cashier.substring(0, 14), '1', '0')
  
        // eslint-disable-next-line no-undef
        BTPrinter.printTextSizeAlign(function (data) {
        }, function (err) {
          console.log(err)
        }, line, '1', '0')
  
        product.forEach((element) => {
          const tempTotal = this.formatPrice(element.Qty * element.Harga)
          const tempName = element.NamaItem
          const tempQty = (element.Qty).toString()
          const tempPrice = this.formatPrice(element.Harga)
          console.log(product)
          // eslint-disable-next-line no-undef
          BTPrinter.printTextSizeAlign(function (data) {
          }, function (err) {
            console.log(err)
          }, tempName.substring(0, (length - 23)) + '  ' + tempQty.padStart(3) + '  ' + tempPrice.padStart(7) + '  ' + tempTotal.padStart(7), '1', '0')
        })
  
        // eslint-disable-next-line no-undef
        BTPrinter.printTextSizeAlign(function (data) {
        }, function (err) {
          console.log(err)
        }, line, '1', '0')
  
        // eslint-disable-next-line no-undef
        BTPrinter.printTextSizeAlign(function (data) {
        }, function (err) {
          console.log(err)
        }, 'Subtotal' + total.padStart(length - 8), '1', '0')
  
        const textDiscount = discount + '%'
  
        // eslint-disable-next-line no-undef
        BTPrinter.printTextSizeAlign(function (data) {
        }, function (err) {
          console.log(err)
        }, 'Diskon' + (this.discountType ? textDiscount.padStart(length - 6) : discount.padStart(length - 6)), '1', '0')
  
        // eslint-disable-next-line no-undef
        BTPrinter.printTextSizeAlign(function (data) {
        }, function (err) {
          console.log(err)
        }, 'PPN(' + this.$store.getters['app/getPPN'].ppnValue + '%)' + tax.padStart(length - 8), '1', '0')
  
        // eslint-disable-next-line no-undef
        BTPrinter.printTextSizeAlign(function (data) {
        }, function (err) {
          console.log(err)
        }, 'Total' + total.padStart(length - 5), '1', '0')
  
        // eslint-disable-next-line no-undef
        BTPrinter.printTextSizeAlign(function (data) {
        }, function (err) {
          console.log(err)
        }, 'Bayar' + payment.padStart(length - 5), '1', '0')
  
        // eslint-disable-next-line no-undef
        BTPrinter.printTextSizeAlign(function (data) {
        }, function (err) {
          console.log(err)
        }, 'Kembalian' + change.padStart(length - 9), '1', '0')
  
        // eslint-disable-next-line no-undef
        BTPrinter.printTextSizeAlign(function (data) {
        }, function (err) {
          console.log(err)
        }, line, '1', '0')
  
        // eslint-disable-next-line no-undef
        BTPrinter.printTextSizeAlign(function (data) {
        }, function (err) {
          console.log(err)
        }, footer, '1', '1')
  
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
      }
    }
  }
  </script>
  
  <style>
  
  </style>
  