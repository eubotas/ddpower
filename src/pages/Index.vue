<template>
  <div class="index">
    <Headbar headName="首页"></Headbar>
    <Banner></Banner>
    <About></About>
  </div>
</template>

<script>
import Headbar from '@/components/Headbar.vue'
import Banner from '@/pages/Index/Banner.vue'
import About from '@/pages/Index/About.vue'

export default {
  name: 'Index',
  data () {

  },
  components: {
    Headbar,
    Banner,
    About
  }
}
</script>


<style scoped>

</style>
