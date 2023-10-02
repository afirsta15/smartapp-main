<template>
  <div class="layout d-flex flex-column h-100">
    <topbar :subtitle="'Setting'" />
    <div class="top-divider" />
    <div class="row mt-3 mx-2 pb-2" style="height: 80% !important">
      <!-- Kolom kiri -->
      <div class="col-3">
        <div class="row" style="max-height: 85% !important; overflow-y: scroll;">
          <!-- Opsi PPN -->
          <div class="col-12">
            <div
              class="card px-2 py-1"
              :class="{'bg-soft': selected === 'PPN'}"
              @click="selected = 'PPN'"
            >
              <div class="row py-3 ml-1">
                <div class="col-12 pr-0">
                  <h5 class="text-primary">
                    PPN
                  </h5>
                </div>
              </div>
            </div>
          </div>
          <!-- Opsi Printer -->
          <div class="col-12 mt-3">
            <div
              class="card px-2 py-1"
              :class="{'bg-soft': selected === 'PRINT'}"
              @click="selected = 'PRINT'"
            >
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

      <!-- Kolom kanan -->
      <div class="col-9 card">
        <!-- Opsi PPN -->
        <template v-if="selected === 'PPN'">
          <!-- Konten PPN -->
          <div class="row mt-3">
            <!-- Tipe Penjualan -->
            <div class="col-12 mb-2">
              <h6>
                <strong>
                  Tipe Penjualan
                </strong>
              </h6>
            </div>
            <div class="col-6">
              <div
                class="row mx-2 card"
                :class="{'bg-soft': ppn.isIncludePPN === 1}"
                @click="ppn.isIncludePPN = 1"
              >
                <div class="col-12 py-3 text-center">
                  Harga Termasuk Pajak
                </div>
              </div>
            </div>
            <div class="col-6">
              <div
                class="row mx-2 card"
                :class="{'bg-soft': ppn.isIncludePPN === 0}"
                @click="ppn.isIncludePPN = 0"
              >
                <div class="col-12 py-3 text-center">
                  Harga Tidak Termasuk Pajak
                </div>
              </div>
            </div>
            <template v-if="ppn.isIncludePPN === 0">
              <!-- Nilai Pajak -->
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

        <!-- Opsi Printer -->
        <template v-else-if="selected === 'PRINT'">
          <!-- Konten Printer -->
          <div class="row mt-3">
            <!-- Lebar Printer -->
            <div class="col-12">
              <div class="mt-2">
                <h6>
                  <strong>
                    Lebar Printer
                  </strong>
                </h6>
                <input v-model="printerLength" class="form-control" type="number">
              </div>
            </div>
            <!-- Printer Header -->
            <div class="col-12 mt-2">
              <div class="mt-2">
                <h6>
                  <strong>
                    Printer Header
                  </strong>
                </h6>
                <input v-model="printerHeader" class="form-control" type="text">
              </div>
            </div>
            <!-- Printer Address -->
            <div class="col-12 mt-2">
              <div class="mt-2">
                <h6>
                  <strong>
                    Printer Address
                  </strong>
                </h6>
                <input v-model="printerAddress" class="form-control" type="text">
              </div>
            </div>
            <!-- Printer Contact -->
            <div class="col-12 mt-2">
              <div class="mt-2">
                <h6>
                  <strong>
                    Printer Contact
                  </strong>
                </h6>
                <input v-model="printerContact" class="form-control" type="text">
              </div>
            </div>
            <!-- Printer Footer -->
            <div class="col-12 mt-2">
              <div class="mt-2">
                <h6>
                  <strong>
                    Printer Footer
                  </strong>
                </h6>
                <input v-model="printerFooter" class="form-control" type="text">
              </div>
            </div>
            <!-- Tombol Aksi -->
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
            <!-- Default Printer -->
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

        <!-- Tampilan default jika tidak ada yang dipilih -->
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
    // Panggil method yang dibutuhkan saat komponen dibuat
    // Misalnya, this.loadPrinter()
  },
  methods: {
    // Definisikan metode-metode Anda di sini
  }
}
</script>

<style>
.input-group-append {
  height: 2.3rem !important
}
</style>
