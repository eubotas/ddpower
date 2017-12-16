<template>
  <div class="feedback">
    <x-header>意见反馈</x-header>
    <group>
      <x-textarea  v-model="value"  placeholder="请留下您的宝贵意见！"></x-textarea>
  </group>
    <div style="padding:15px">
      <x-button type="primary"  @click.native="submit()">确定提交</x-button>
    </div>
  </div>
</template>

<script>
import { XHeader, XButton, XTextarea, Group, Toast, ToastPlugin} from 'vux'
import Vue from 'vue';
import axios from 'axios'
import Config from '@/config.js'
import qs from 'qs';

import * as _ from '@/util/common'

Vue.use(ToastPlugin)

export default {
  name: 'feedback',
  components: {
    XHeader,
    XButton,
    XTextarea,
    Group,
    Toast,
    ToastPlugin,
  },
  data(){
    return {
      value: ''
    }
  },
  methods: {
    // 提交
    submit: function(){
      if(!this.value){
        this.$vux.toast.text('请输入您的意见', 'middle');
      }else{
        var userInfo = _.getlocalStorage('userInfo');
        var params = {
              cmd: 'saveFeedback',
              token: userInfo.data.token,
              content: this.value,
        }
        axios.post(Config.URL.Test, qs.stringify(params))
          .then((response)=> {
            console.log(response);
            if(response.data.errMsg == 'OK'){
              this.$vux.toast.text('谢谢您提交宝贵的意见，谢谢！', 'middle');
              setTimeout(()=>{
                 this.value = ''
              },2000)
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
textarea{
  width: 90%;
  margin: 0 auto;
  border: none;
  padding: 2%;
  border: 1px solid #64bdde;
  margin-top: 10px;
}
</style>
