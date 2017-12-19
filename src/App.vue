<template>
  <div id="app">
    <router-view />
    <Narbar :menu-display="menuDisplay" />
  </div>
</template>

<script>
import Narbar from '@/components/Narbar.vue'
import * as _ from '@/util/common'
import Vue from 'vue';
import vueRouter from 'vue-router';
Vue.use(vueRouter)
export default {
  name: 'app',
  components: {
    Narbar
  },
  computed: {
    menuDisplay () {
      if (this.$route.path.split('/')[1] == 'login' || this.$route.path.split('/')[1] == 'register') {
        return false
      }else if(this.$route.path.split('/')[1] == ''){
        var userInfo = _.getlocalStorage('userInfo');
        if(!userInfo){
          setTimeout(()=>{
            this.$router.push('/login')
          }, 50)
        }
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
}
</style>
