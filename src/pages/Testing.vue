<template>
  <div class="my">
    <Headbar headName="在线监测"></Headbar>
    <tab>
      <tab-item selected @on-item-click="onItemClick">用电参数</tab-item>
      <tab-item @on-item-click="onItemClick">开关状态</tab-item>
    </tab>
    <div v-show="activeIndex === 0">

      <group>
        <popup-radio title="选择变压器" :options="options1" @on-change="onChange" v-model="thisItem"></popup-radio>
      </group>


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
        <li v-for="a in switches">
          <div class="state-main">
            <span class="state-name">{{a.name}}</span>
            <span class="state-value"><span :class="[a.value ? 'open':'close']"></span></span>
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>
<script>
import Headbar from '@/components/Headbar.vue'
import { Group, Cell, Tab, TabItem, PopupRadio, Toast, ToastPlugin } from 'vux'

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
    PopupRadio,
    Group,
    Toast, ToastPlugin
  },
  data(){
    return {
      activeIndex: 0,
      show2: false,
      data: this.data,
      switches: this.switches,
      thisItem: '221',
      SiteActive: 0,
      options1: [],
      TFList: null,
      tfids: null,
    }
  },
  created() {
    var userInfo = _.getlocalStorage('userInfo');
    var siteInfo = _.getlocalStorage('getSiteInfo');
    var SiteSwitch = _.getlocalStorage('SiteSwitch');
    var getTfids = _.getlocalStorage('getTfids');
    SiteSwitch?this.SiteActive = SiteSwitch:this.SiteActive = 0;

    var siteId = siteInfo.data.sites[this.SiteActive].siteId;

    var opt = [];
    for (var i = 0; i < getTfids.data.TFList.length; i++) {
      opt.push(getTfids.data.TFList[i].name)
    }
    this.TFList = getTfids.data.TFList;
    this.options1 = opt;


    for (var i = 0; i < this.TFList.length; i++) {
      var item = this.TFList[i];
      if(item.name == this.thisItem){
        this.tfids = item.tfid
      }
    }
    var params = {
          cmd: 'getTFData',
          token: userInfo.data.token,
          tfid: this.tfids,
    }
    axios.post(Config.URL.Test, qs.stringify(params))
      .then((res)=> {
        if(res.data.errMsg == 'OK'){
          this.data = res
        }
      })

      //获取开关
      var params = {
            cmd: 'getSwitches',
            token: userInfo.data.token,
            siteId: siteId,
      }

      axios.post(Config.URL.Test, qs.stringify(params))
        .then((resa)=> {
          if(resa.data.errMsg == 'OK'){
            this.switches = resa.data.switches.sort(_.sortBy('name', false, parseInt));
          }else{
            this.$vux.toast.text(resa.data.errMsg);
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
    onChange (key, item) {

      var userInfo = _.getlocalStorage('userInfo');
      this.thisItem = key;

      for (var i = 0; i < this.TFList.length; i++) {
        var item = this.TFList[i];
        if(item.name == key){
          this.tfids = item.tfid
        }
      }
      var params = {
            cmd: 'getTFData',
            token: userInfo.data.token,
            tfid: this.tfids,
      }
      console.log(params)
      axios.post(Config.URL.Test, qs.stringify(params))
        .then((res)=> {

          if(res.data.errMsg == 'OK'){
            this.data = res;
            console.log(res)
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
          font-size: 1rem;
        }
      }
      .voit-info{
        padding: 10px 0;
        color: #0572c4;
        text-align: center;
        font-size: 1.2rem;
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
      background-color: #f2f2f2;
      line-height: 32px;
      overflow: hidden;
      float: left;
      .state-main{
        padding: 10px;
        overflow: hidden;
        .state-name{
          float: left;
          font-size: .9rem;
        }
        .state-value{
          float: right;
          margin-top: -2px;
          span{
            display: inline-block;
            width: 30px;
            height: 30px;
            vertical-align: middle;
          }
          .open{
            background: url('../assets/img/params/switchoff.png') no-repeat;
            background-size: 100%;
          }
          .close{
            background: url('../assets/img/params/switchon.png') no-repeat;
            background-size: 100%;
          }
        }
      }
    }
  }
  .itemGroup{
    position: relative;
  }
  .showThisItem{
    position: absolute;
    left: 50%;
    top: 0;
    line-height: 45px;
  }
  @media screen and (max-width: 340px){
    .state li .state-main .state-value span{
      width: 24px;
      height: 24px;
    }
  }
</style>
