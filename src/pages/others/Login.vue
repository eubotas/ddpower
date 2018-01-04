<template>
  <div class="login">
    <div class="logo">
      <img class="max" src="../../assets/img/others/launcher.png">
    </div>
    <group>
      <x-input title="账号" v-model="user"></x-input>
      <x-input title="密码" type="password" v-model="password"></x-input>
    </group>
    <div class="agreepwd">
      <label for="weuiAgree" class="weui-agree">
          <input id="weuiAgree" type="checkbox" class="weui-agree__checkbox">
          <span class="weui-agree__text">
              记住密码
          </span>
      </label>
    </div>
    <div style="padding:15px">
      <x-button type="primary"  @click.native="submit()">登录</x-button>
      <x-button link="/register">用户体验</x-button>
    </div>
    <div class="copyright">
      <p>北京中联腾达电力科技有限公司</p>
      <p>版权所有©2017</p>
    </div>
  </div>
</template>

<script>

import { XHeader, XButton, XInput, Group, Toast, ToastPlugin} from 'vux'
import Vue from 'vue';
import vueRouter from 'vue-router';
import axios from 'axios'
import Config from '@/config.js'
import qs from 'qs';

import * as _ from '@/util/common'

Vue.use(ToastPlugin)
Vue.use(vueRouter)
Vue.prototype.$http = axios

export default {
  name: 'login',
  components: {
    XHeader,
    XButton,
    XInput,
    Group,
    Toast,
    ToastPlugin,
  },
  data(){
    return {
      user: '',
      password: '',
    }
  },
  mounted:function(){
    var getSiteInfo = _.getlocalStorage('getSiteInfo');
    console.log(getSiteInfo)
  },
  methods: {
    // 提交
    submit: function(){
      if(!this.user){
        this.$vux.toast.text('请输入账号', 'middle');
      }else if(!this.password){
        this.$vux.toast.text('请输入密码', 'middle');
      }else{
        var params = {
          cmd: 'login',
          user: this.user,
          password: this.password
        }
        axios.post(Config.URL.Test, qs.stringify(params))
          .then((response)=> {
            console.log(response);
            if(response.data.errMsg == 'OK'){
              this.$vux.toast.text('登录成功！', 'middle');
              //保存用户信息
              _.setlocalStorage('userInfo', response);
              _.setlocalStorage('userName', this.user);
              var wxOpenId = _.getlocalStorage('wxOpenId');

              console.log(response)
              if(!_.isWinxin()){
                setTimeout(()=>{
                  this.$router.push('/')
                }, 400)
              }else{
                // 绑定openid和用户名称
                var params2 = {
                  username: this.user,
                  password: this.password,
                  openId: wxOpenId
                }
                axios.post('/main/system/webdev/DDPOWER/user/bind', qs.stringify(params2))
                  .then((res) => {
                    console.log(res);

                    setTimeout(()=>{
                      this.$router.push('/')
                    }, 400)
                  })
              }



            }else{
              this.$vux.toast.text(response.data.errMsg);
            }
          })
          .catch((error) =>{
            console.log(error);
          });
      }
    }
  }

}
</script>


<style lang="scss" scoped>
  body .narbar{
    display: none;
  }
  .logo{
    padding: 3rem 0;
    width: 40%;
    margin: 0 auto;
  }
  .agreepwd{
    text-align: right;
    padding-right: 15px;
    margin-top: 15px;
  }
  .copyright{
    text-align: center;
    margin-top: 5rem;
  }
</style>
