<template>
  <div class="police">
    <Headbar headName="报警"></Headbar>
    <div class="content">
      <div class="not-data" v-show="show">
          暂无数据
      </div>
      <ul>
        <li v-for="i in data.data.alarms">
          <div class="pic">
            <img src="../assets/img/icon/switch_gate.png" alt="">
          </div>
          <div class="info">
            <div class="title">
              {{i.alarmName}}
            </div>
            <div class="date">
              {{i.time}}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Headbar from '@/components/Headbar.vue'
import { Group, Cell,Confirm, TransferDomDirective as TransferDom, ConfirmPlugin  } from 'vux'
import axios from 'axios'
import Config from '@/config.js'
import qs from 'qs';

Vue.use(ConfirmPlugin)
import * as _ from '@/util/common'
import VModal from 'vue-js-modal'
import vueRouter from 'vue-router';
Vue.use(vueRouter)
Vue.use(VModal)
export default {
  directives: {
    TransferDom
  },
  name: 'police',
  components: {
    Headbar,
    Group,
    Cell,
    Confirm,
    ConfirmPlugin
  },
  data(){
    return {
    show: false,
    data: this.data,
    }
  },
  created(){
    var userInfo = _.getlocalStorage('userInfo');
    var siteInfo = _.getlocalStorage('getSiteInfo');
    var tfids = null;
    siteInfo == null?tfids = 'BJ-CY-LJY': tfids = siteInfo.data.sites[0].siteId;

    var params = {
          cmd: 'getAlarms',
          token: userInfo.data.token,
          siteId: tfids,
    }
    axios.post(Config.URL.Test, qs.stringify(params))
      .then((res)=> {
        console.log(res);
        if(res.data.errMsg == 'OK'){
          this.data = res;
          if(res.data.alarms.length == 0){
            this.show = true;
          }
        }else{
          this.$vux.toast.text(res.data.errMsg);
        }
      })
      .catch((error) =>{
        console.log(error);
      });

  },
  methods: {

  }
}
</script>


<style lang="scss" scoped>
.not-data{
  text-align: center;
  line-height: 40px;
  margin-top: 40px;
  color: #777;
}
.content{
  li{
    width: 90%;
    border-bottom: 1px solid #ddd;
    overflow: hidden;
    padding: 10px 5%;
    background-color: #fff;
    .pic{
      float: left;
      width: 30%;
      img{
        max-width: 100%;
        vertical-align: middle;
      }
    }
    .info{
      float: left;
      width: 70%;
      text-align: left;
      .date{
        font-size: 14px;
        color: #777;
      }
    }
  }
}
</style>
