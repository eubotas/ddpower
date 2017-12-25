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
 },

 created() {
   //判断本地是否保存有微信用户信息
   if(_.isWinxin()){
     var wxUserInfo = _.getlocalStorage('wxUserInfo');
     if(!wxUserInfo){
       var code = _.getUrlParams('code');
       if(code){
         
       }else{
         //没有微信用户信息，没有授权-->> 需要授权，跳转授权页面
         window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ wechatShare.options.wxappid +'&redirect_uri='+ window.location.href +'&response_type=code&scope=snsapi_userinfo#wechat_redirect';
       }
     }
   }



 },

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
