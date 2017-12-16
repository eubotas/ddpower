<template>
  <div class="register">
    <x-header>用户体验</x-header>
    <group>
      <x-input placeholder="姓名" v-model="name">
        <img slot="label" style="padding-right:20px;display:block;" src="../../assets/img/others/name.png" width="24" height="24">
      </x-input>
      <x-input placeholder="公司名称" v-model="company">
        <img slot="label" style="padding-right:20px;display:block;" src="../../assets/img/others/company.png" width="24" height="24">
      </x-input>
      <x-input placeholder="邮箱" v-model="email" :is-type="email">
        <img slot="label" style="padding-right:20px;display:block;" src="../../assets/img/others/email.png" width="24" height="18">
      </x-input>
      <x-input placeholder="手机号码" v-model="phone" :is-type="phone">
        <img slot="label" style="padding-right:28px;display:block;" src="../../assets/img/others/phone.png" width="16" height="24">
        <!-- <x-button slot="right" type="primary" mini>发送验证码</x-button> -->
      </x-input>
      <!-- <x-input placeholder="验证码">
        <img slot="label" style="padding-right:28px;display:block;" src="../../assets/img/others/phone.png" width="16" height="24">
      </x-input> -->
    </group>
    <group style="padding: 15px">
      <x-button  @click.native="submit()" type="primary">开始体验吧</x-button>
    </group>
  </div>
</template>

<script>
import { XHeader, XButton, XInput, Group, Toast, ToastPlugin} from 'vux'
import Vue from 'vue';
import axios from 'axios'
import Config from '@/config.js'
import qs from 'qs';

import * as _ from '@/util/common'

Vue.use(ToastPlugin)
Vue.prototype.$http = axios
export default {
  name: 'register',
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
      name: '',
      company: '',
      email: '',
      phone: '',
    }
  },
  methods: {
    // 提交
    submit: function(){
      if(!this.name){
        this.$vux.toast.text('请输入名字', 'middle');
      }else if(!this.company){
        this.$vux.toast.text('请输入公司名称', 'middle');
      }else if(!this.email){
        this.$vux.toast.text('请输入邮箱', 'middle');
      }else if(!this.phone){
        this.$vux.toast.text('请输入手机号码', 'middle');
      }else{
        var params = {
          cmd: 'userinfo',
          name: this.name,
          company: this.company,
          email: this.email,
          phone: this.phone,
        }
        axios.post(Config.URL.Test, qs.stringify(params))
          .then((response)=> {
            console.log(response);
            if(response.data.errMsg == 'OK'){
              this.$vux.toast.text('注册成功！', 'middle');
              console.log(response)
              // 保存用户信息
              _.setlocalStorage('userInfoToken', response)
              setTimeout(function(){
                window.location.href = '/#/'
              }, 400)
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

</style>
