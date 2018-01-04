<template>
  <div id="app">
    <router-view />
    <Narbar :menu-display="menuDisplay" />
  </div>
</template>

<script>
import Narbar from '@/components/Narbar.vue'
import * as _ from '@/util/common'
import Config from '@/config.js'
import Vue from 'vue';
import {Toast, ToastPlugin} from 'vux'
import vueRouter from 'vue-router';
Vue.use(vueRouter)
Vue.use(ToastPlugin)
import axios from 'axios'
import qs from 'qs';
Vue.prototype.$http = axios

export default {
  name: 'app',
  components: {
    Narbar,
    Toast,
    ToastPlugin,
  },
  computed: {
    menuDisplay () {
      if (this.$route.path.split('/')[1] == 'login' || this.$route.path.split('/')[1] == 'register') {
        return false
      }else if(this.$route.path.split('/')[1] == ''){
        var userInfo = _.getlocalStorage('userInfo');
        if(!_.isWinxin()){
          if(!userInfo){
            setTimeout(()=>{
              this.$router.push('/login')
            }, 50)
          }
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
         var params = {
           code: code
         }
         axios.post('/getOpenid', qs.stringify(params))
           .then((res) => {
             console.log(res);
             //保存openid
             _.setlocalStorage('wxOpenId', res.data);

             //检测是否有openid
             var openIdParams = {
               openId: res.data
             }
             axios.post('/main/system/webdev/DDPOWER/user/login', qs.stringify(openIdParams))
               .then((data) => {
                 console.log(data);
                 if(data.data.errCode == '-1'){
                   this.$vux.toast.text(data.data.errMsg, 'middle');
                   setTimeout(()=>{
                     this.$router.push('/login')
                   }, 1000)
                 }else{
                   _.setlocalStorage('userInfo', data);
                 }
               })
           })
           .catch((error) => {
             console.log(error);
           });
       }else{
         //没有微信用户信息，没有授权-->> 需要授权，跳转授权页面
         window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ Config.WX.appId +'&redirect_uri=http://wx.coderise.cn&response_type=code&state=123&scope=snsapi_base#wechat_redirect';
       }
     }
   }else{
     console.log('非微信端，不走授权！');
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
