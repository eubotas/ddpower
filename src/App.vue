<template>
  <div id="app">
    <router-view />
    <Narbar :menu-display="menuDisplay" />
  </div>
</template>

<script>
import Narbar from '@/components/Narbar.vue'

export default {
  name: 'app',
  components: {
    Narbar
  },
  computed: {
    menuDisplay () {
      if (this.$route.path.split('/')[1] == 'login' || this.$route.path.split('/')[1] == 'register') {
        return false
      }
      return this.$route.path.split('/').length > 2 ? false : true
    },
  }
}
</script>

<style lang="scss" scope>
//全局样式
@import './assets/css/common';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
