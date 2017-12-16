<template>
  <div class="my">
    <Headbar headName="在线监测"></Headbar>
    <tab>
      <tab-item selected @on-item-click="onItemClick">用电参数</tab-item>
      <tab-item @on-item-click="onItemClick">开关状态</tab-item>
    </tab>
    <div v-show="activeIndex === 0">
      <group>
        <x-switch :title="'选择开关'" v-model="show2"></x-switch>
      </group>

      <actionsheet v-model="show2" :menus="menus2" @on-click-menu="click" show-cancel></actionsheet>

      <group>
        <ul class="voit">
          <li v-for="i in data.data.tags">
            <div class="voit-head">
              <i><img class="max" src="../assets/img/params/IA.png"></i>
              <span>{{ i.name }}</span>
            </div>
            <div class="voit-info">
              {{ i.value }} kVar
            </div>
          </li>
        </ul>
      </group>
    </div>
    <div v-show="activeIndex === 1">
      <ul class="state">
        <li v-for="i in 9">
          <div class="state-main">
            <span class="state-name">32开关</span>
            <span class="state-value">开</span>
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>
<script>
import Headbar from '@/components/Headbar.vue'
import { Group, Cell, Tab, TabItem, Actionsheet, XSwitch, Toast, ToastPlugin } from 'vux'

import Vue from 'vue';
import axios from 'axios'
import Config from '@/config.js'
import qs from 'qs';

import * as _ from '@/util/common'

Vue.use(ToastPlugin)
export default {
  name: 'my',
  components: {
    Headbar,
    Tab,
    TabItem,
    Actionsheet,
    XSwitch,
    Group,
    Toast, ToastPlugin
  },
  data(){
    return {
      activeIndex: 0,
      show2: false,
      data: this.data,
      thisItem: '221',
      menus2: {
        menu1: '221',
        menu2: '211',
        menu3: '401',
        menu4: '402',
      },
    }
  },
  created() {
    var userInfo = _.getlocalStorage('userInfo');
    var siteInfo = _.getlocalStorage('getSiteInfo');

    // console.log(siteInfo.data.sites[0].siteId)
    // 获取站点编号和token
    var tfParams = {
          cmd: 'getTFList',
          token: userInfo.data.token,
          tfid: siteInfo.data.sites[0].siteId,
    }
    axios.post(Config.URL.Test, qs.stringify(tfParams))
      .then((res)=> {
        console.log(res);
        console.log('8888888888')
        // if(res.data.errMsg == 'OK'){
        //   console.log(res)
        //   console.log('9999999999999')
        // }
      })
      .catch((error) =>{
        console.log(error);
        console.log('33333333')
      });



    var params = {
          cmd: 'getTFData',
          token: userInfo.data.token,
          tfid: "Beijing/ChaoYang/LJY/遥测/"+this.thisItem,
    }
    axios.post(Config.URL.Test, qs.stringify(params))
      .then((res)=> {
        console.log(res);
        if(res.data.errMsg == 'OK'){
          this.data = res
        }else{
          this.$vux.toast.text(res.data.errMsg);
        }
      })
      .catch((error) =>{
        console.log(error);
      });
  },
  methods: {
    onItemClick (index) {
      console.log('on item click:', index);
      this.activeIndex = index;
    },
    console (msg) {
      console.log(msg)
    },
    click (key, item) {
      console.log(item)
      var userInfo = _.getlocalStorage('userInfo');

      var params = {
            cmd: 'getTFData',
            token: userInfo.data.token,
            tfid: "Beijing/ChaoYang/LJY/遥测/"+item,
      }
      axios.post(Config.URL.Test, qs.stringify(params))
        .then((res)=> {
          console.log(res);
          if(res.data.errMsg == 'OK'){
            this.data = res
          }else{
            this.$vux.toast.text(res.data.errMsg);
          }
        })
        .catch((error) =>{
          console.log(error);
        });
    }
  },

}
</script>


<style lang="scss" scoped>
  .vux-tab .vux-tab-item.vux-tab-selected{
    color: #0572c4;
    border-bottom: 3px solid #0572c4;
  }
  .vux-tab-ink-bar{
    background-color: #0572c4;
  }
  .voit{
    padding: 6%;
    overflow: hidden;
    li{
      float: left;
      width: 46%;
      margin-left: 6%;
      border:1px solid  #0572c4;
      margin-bottom: 14px;
      border-radius: 5px;
      .voit-head{
        background-color: #0572c4;
        text-align: left;
        padding: 6px 10px;
        i{
          width: 18px;
          height: 18px;
          margin-right: 6px;
          display: inline-block;
          img{
            vertical-align: top;
          }
        }
        span{
          color: #fff;
          font-weight: 600;
          font-size: 1.2rem;
        }
      }
      .voit-info{
        padding: 10px 0;
        color: #0572c4;
        font-size: 1.4rem;
      }
    }
    li:nth-child(odd){
      margin-left: 0;
    }
  }

  .state{
    overflow: hidden;
    margin-top: 10px;
    background-color: #fff;
    li{
      width: 31.3333%;
      margin: 1%;
      background-color: #ddd;
      float: left;
      .state-main{
        padding: 10px;
        overflow: hidden;
        .state-name{
          float: left;
        }
        .state-value{
          float: right;
        }
      }
    }
  }
</style>
