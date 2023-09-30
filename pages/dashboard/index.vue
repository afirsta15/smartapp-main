<template>
  <div class="layout d-flex flex-column justify-content-center h-100">
    <topbar :subtitle="'Homee'" />
    <div class="row mt-4 w-100">
      <div class="col-3 mt-3">
        <div class="b-primary pb-3 text-center clickable" @click="onCreateOrder">
          <div class="container mt-4 text-primary">
            <h1>
              <b-icon icon="file-earmark-plus-fill" />
            </h1>
            <h6 class="mt-3">
              <strong>
                Buat Transaksi
              </strong>
            </h6>
          </div>
        </div>
      </div>
      <div class="col-3 mt-3">
        <div class="b-primary pb-3 text-center clickable" @click="navigateTo('dashboard/cashier', true)">
          <div class="container mt-4 text-primary">
            <h1>
              <b-icon icon="file-earmark-text-fill" />
            </h1>
            <h6 class="mt-3">
              <strong>
                Daftar Transaksi
              </strong>
            </h6>
          </div>
        </div>
      </div>
      
      <div class="col-3 mt-3">
        <div class="b-primary pb-3 text-center clickable" @click="navigateTo('dashboard/return', true)">
          <div class="container mt-4 text-primary">
            <h1>
              <b-icon icon="file-earmark-text-fill" />
            </h1>
            <h6 class="mt-3">
              <strong>
                Daftar Retur
              </strong>
            </h6>
          </div>
        </div>
      </div>
      <div class="col-3 mt-3">
        <div class="b-primary pb-3 text-center clickable" @click="onCreateOutbound">
          <div class="container mt-4 text-primary">
            <h1>
              <b-icon icon="file-earmark-plus-fill" />
            </h1>
            <h6 class="mt-3">
              <strong>
                Buat Mutasi
              </strong>
            </h6>
          </div>
        </div>
      </div>
      <div class="col-3 mt-3">
        <div class="b-primary pb-3 text-center clickable" @click="navigateTo('dashboard/outbound', true)">
          <div class="container mt-4 text-primary">
            <h1>
              <b-icon icon="file-earmark-text-fill" />
            </h1>
            <h6 class="mt-3">
              <strong>
                Daftar Mutasi
              </strong>
            </h6>
          </div>
        </div>
      </div> 
      <div class="col-3 mt-3">
        <div class="b-primary pb-3 text-center clickable" @click="onCreateProduct">
          <div class="container mt-4 text-primary">
            <h1>
              <b-icon icon="file-earmark-plus-fill" />
            </h1>
            <h6 class="mt-3">
              <strong>
                Tambah Produk
              </strong>
            </h6>
          </div>
        </div>
      </div> 
       
      <div class="col-3 mt-3">
        <div class="b-primary pb-3 text-center clickable" @click="navigateTo('dashboard/product', true)">
          <div class="container mt-4 text-primary">
            <h1>
              <b-icon icon="file-earmark-text-fill" />
            </h1>
            <h6 class="mt-3">
              <strong>
                Daftar Produk
              </strong>
            </h6>
          </div>
        </div>
      </div> 
      
      <div class="col-3 mt-3">
        <div class="b-primary pb-3 text-center clickable" @click="navigateTo('dashboard/setting', true)">
          <div class="container mt-4 text-primary">
            <h1>
              <b-icon icon="gear-fill" />
            </h1>
            <h6 class="mt-3">
              <strong>
                Pengaturan
              </strong>
            </h6>
          </div>
        </div>
      </div>
    </div>
    <dev />
  </div>
</template>

<script>
import dev from '../../components/general/dev.vue'
import topbar from '~/components/general/topbar.vue'
export default {
  name: 'Dashboard',
  components: {
    topbar,
    dev
  },
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
    navigateTo (url, keepHistory) {
      if (keepHistory) {
        this.$router.push(url)
      } else {
        this.$router.replace(url)
      }
    },
    onCreateOutbound () {
      this.$store.commit('item/setSelected', null)
      this.navigateTo('dashboard/outbound/create', true)
    },
    onCreateOrder () {
      this.$store.commit('item/setSelected', null)
      this.navigateTo('dashboard/cashier/create', true)
    },
    onCreateProduct () {
      this.$store.commit('item/setSelected', null)
      this.navigateTo('dashboard/product/create', true)
    }
  }
}
</script>

<style>
.card-menu {
    height: 20vh;
}
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

button {
  margin-bottom: 20px;
}
</style>
