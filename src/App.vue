<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>


export default {
  name: 'app',
  components: {
    
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
