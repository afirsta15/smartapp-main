<template>
  <div style="height:100vh !important; margin-bottom: 0 !important" :class="{'bg-primary mb-0': $route.name === 'index'}">
    <alert />
    <nuxt />
  </div>
</template>

<script>
import alert from '../components/general/alert'
export default {
  components: {
    alert
  },
  data () {
    return {
    }
  },
  mounted () {
  }
}
</script>

<style>
</style>
