<template>
  <div class="charts">
    <Headbar headName="数据曲线"></Headbar>
    <div class="tabs">
      <button-tab>
        <button-tab-item selected @on-item-click="onItemClick">负荷曲线</button-tab-item>
        <button-tab-item @on-item-click="onItemClick">电流曲线</button-tab-item>
        <button-tab-item @on-item-click="onItemClick">电压曲线</button-tab-item>
        <button-tab-item @on-item-click="onItemClick">功率因数</button-tab-item>
      </button-tab>
      <div class="tab-main">
        <div>
          <line-chart :chart-data="datacollection"></line-chart>
          <div class="showDate">
            {{showDate}}
          </div>
        </div>

      </div>

      <div class="select">
        <group>
          <popup-radio title="选择变压器" @on-change="onChange2" :options="options1" v-model="option1"></popup-radio>
          <calendar v-model="demo2" :title="'选择日期'" @on-change="onChange" disable-future></calendar>
        </group>
      </div>
    </div>

  </div>
</template>

<script>
import Headbar from '@/components/Headbar.vue'
import lineChart from './charts/LineChart.js'

import { Group, Cell, Tab, TabItem } from 'vux'
import { ButtonTab, ButtonTabItem, Calendar,PopupRadio  } from 'vux'

import Vue from 'vue';
import axios from 'axios'
import Config from '@/config.js'
import qs from 'qs';

import * as _ from '@/util/common'

var myDate = new Date();

export default {
  name: 'charts',
  data(){
    return {
      activeIndex: 0,
      datacollection: null,
      data: this.data,
      demo2: 'TODAY',
      option1: '211',
      options1: null,
      optionValue: 'P',
      optionYear: myDate.getFullYear(),
      optionMonth: myDate.getMonth() + 1,
      optionDay: myDate.getDate(),
      showDate: this.showDate,
      SiteActive: 0,
      tfids: null,
    }
  },
  components: {
    Headbar,
    Tab,
    TabItem,
    ButtonTab,
    ButtonTabItem,
    lineChart,
    Group,
    Calendar,
    PopupRadio,
  },
  created() {
    this.fetchData('P');
  },
  methods: {
    onItemClick (index) {
      console.log('on item click:', index);
      this.activeIndex = index;
      if(index == 0){
        this.fetchData('P');
        this.optionValue = 'P';
      }else if(index == 1){
        this.fetchData('I');
        this.optionValue = 'I';
      }else if(index == 2){
        this.fetchData('U');
        this.optionValue = 'U';
      }else{
        this.fetchData('PE');
        this.optionValue = 'PE';
      }
    },
    onChange2 (value) {
      this.option1 = value;
      this.fetchData(this.optionValue);
    },
    onChange (value) {
      console.log('change', value);
      var dateStr = value.split('-');
      this.optionYear = dateStr[0];
      this.optionMonth = dateStr[1];
      this.optionDay = dateStr[2];
      this.fetchData(this.optionValue);
    },
    //请求数据
    fetchData(type) {
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
      this.options1 = opt;

      for (var i = 0; i < getTfids.data.TFList.length; i++) {
        var item = getTfids.data.TFList[i];
        if(item.name == this.option1){
          this.tfids = item.tfid;
        }
      }
        //获取开关
        var params = {
              cmd: 'getTFHistory',
              token: userInfo.data.token,
              siteId: siteId,
              tfid: this.tfids,
              year: this.optionYear,
              month: this.optionMonth,
              day: this.optionDay,
              type: type
        }

        axios.post(Config.URL.Test, qs.stringify(params))
          .then((res)=> {
            console.log(res);
            if(res.data.errMsg == 'OK'){
              this.data = res;
              var that = this;
              setTimeout(function(){
                if(type == 'P'){
                  that.fillData('P', res.data);
                }else if(type == 'I'){
                  that.fillData('I', res.data);
                }else if(type == 'U'){
                  that.fillData('U', res.data);
                }else{
                  that.fillData('PE'+ res.data);
                }
              }, 500)
            }else{
              this.$vux.toast.text(res.data.errMsg);
            }
          })
          .catch((error) =>{
            console.log(error);
          });
    },
    fillData (type, data) {
      var nowDate = new Date();
      var date1 = ['00:00','','','','','','','','','',
                  '03:40','','','','','','','','','',
                  '07:20','','','','','','','','','',
                  '11:00','','','','','','','','','',
                  '14:40','','','','','','','','','',
                  '18:20','','','','','','','','','',
                  '22:00','','','','','','','','']
      if(type == 'P'){
        this.datacollection = {
          labels: date1,
          datasets: [
            {
              label: '今天负荷',
              borderColor: '#DE5E8A',
              fillColor : "rgba(255,255,255,0.01)",
              borderWidth: 1,
              pointRadius: 0,
              data: data.dataLast
            }, {
              label: '昨天负荷',
              borderColor: '#98E55F',
              fillColor : "rgba(255,255,255,0.01)",
              borderWidth: 1,
              pointRadius: 0,
              data: data.dataThis
            }
          ]
        }
      }else if(type == 'I'){
        var date2 = ['00:00','','','','','','','','','',
                    '03:40','','','','','','','','','',
                    '07:20','','','','','','','','','',
                    '11:00','','','','','','','','','',
                    '14:40','','','','','','','','','',
                    '18:20','','','','','','','','','',
                    '22:00','','','','','','','','']
        this.datacollection = {
          labels: date2,
          datasets: [
            {
              label: 'IA',
              borderColor: '#F3EB2B',
              fillColor : "rgba(255,255,255,0.01)",
              borderWidth: 1,
              pointRadius: 0,
              data: data.IA
            }, {
              label: 'IB',
              borderColor: '#9CE35F',
              fillColor : "rgba(255,255,255,0.01)",
              borderWidth: 1,
              pointRadius: 0,
              data: data.IB
            }, {
              label: 'IC',
              borderColor: '#E95986',
              fillColor : "rgba(255,255,255,0.01)",
              borderWidth: 1,
              pointRadius: 0,
              data: data.IC
            }
          ]
        }
      }else if(type == 'U'){
        var date3 = ['00:00','','','','','','','','','',
                    '03:40','','','','','','','','','',
                    '07:20','','','','','','','','','',
                    '11:00','','','','','','','','','',
                    '14:40','','','','','','','','','',
                    '18:20','','','','','','','','','',
                    '22:00','','','','','','','','']
        this.datacollection = {
          labels: date3,
          datasets: [
            {
              label: 'UAC',
              borderColor: '#ff0000',
              fillColor : "rgba(255,255,255,0.01)",
              borderWidth: 1,
              pointRadius: 0,
              data: data.UAB
            }, {
              label: 'UAB',
              borderColor: '#0572c4',
              fillColor : "rgba(255,255,255,0.01)",
              borderWidth: 1,
              pointRadius: 0,
              data: data.UAC
            }, {
              label: 'UBC',
              borderColor: '#0572c4',
              fillColor : "rgba(255,255,255,0.01)",
              borderWidth: 1,
              pointRadius: 0,
              data: data.UBC
            }
          ]
        }
      }else{
        var date4 = ['00:00','','','','','','','','','',
                    '03:40','','','','','','','','','',
                    '07:20','','','','','','','','','',
                    '11:00','','','','','','','','','',
                    '14:40','','','','','','','','','',
                    '18:20','','','','','','','','','',
                    '22:00','','','','','','','','']
        if(data && data.length > 0){
          this.datacollection = {
            labels:date4,
            datasets: [
              {
                label: 'PE',
                borderColor: '#ff0000',
                fillColor : "rgba(255,255,255,0.01)",
                borderWidth: 1,
                pointRadius: 0,
                data: data.PE
              }
            ]
          }
        }else{
          console.log('暂无数据');

        }

      }
    }
  },
  mounted () {

  },

}
</script>


<style lang="scss" scoped>
.tabs{
  padding: 10px;
}
.tab-main{
  margin-top: 20px;
}
</style>
