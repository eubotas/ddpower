<template>
  <div id="app">
    <router-view />
    <Narbar />
  </div>
</template>

<script>
import Narbar from './components/Narbar.vue'

export default {
  name: 'app',
  components: {
    Narbar,
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
