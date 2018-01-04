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
        <div class="charts">
            <div :id="id" :option="option"></div>
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
import HighCharts from 'highcharts'

import VueHighcharts from 'vue-highcharts';

Vue.use(VueHighcharts)
import HighchartsNoData from 'highcharts-no-data-to-display';
HighchartsNoData(HighCharts)

import XChart from './charts/comp.vue'

var myDate = new Date()
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
      id: 'test',
      option: null,
      xValue: ['0:00','0:20','0:40','1:00','1:20','1:40','2:00','2:20','2:40','3:00','3:20','3:40','4:00','4:20','4:40','5:00','5:20','5:40',
              '6:00','6:20','6:40','7:00','7:20','7:40','8:00','8:20','8:40','9:00','9:20','9:40','10:00','10:20','10:40','11:00','11:20','11:40',
              '12:00','12:20','12:40','13:00','13:20','13:40','14:00','14:20','14:40','15:00','15:20','15:40','16:00','16:20','16:40','17:00','17:20','17:40',
              '18:00','18:20','18:40','19:00','19:20','19:40','20:00','20:20','20:40','21:00','21:20','21:40','22:00','22:20','22:40','23:00','23:20','23:40'],

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
    XChart
  },
  created() {
    this.fetchData('P');

    var that = this;
    setTimeout(function(){
      var chart = new HighCharts.chart(that.id, that.option);
      // chart.addSeries(that.option, true);
      // chart.update();
      // chart.redraw(true);
    }, 500)
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

                if(type == 'P'){
                  that.getHightChartData('P', res.data);
                }else if(type == 'I'){
                  that.getHightChartData('I', res.data);
                }else if(type == 'U'){
                  that.getHightChartData('U', res.data);
                }else{
                  that.getHightChartData('PE', res.data);
                }

            }else{
              this.$vux.toast.text(res.data.errMsg);
            }
          })
          .catch((error) =>{
            console.log(error);
          });
    },

    getHightChartData (type, data){
      var that = this;
      var chart;
      setTimeout(function(){
        chart = new HighCharts.chart(that.id, that.option);
        chart.redraw(true);
      }, 500)
      var servers1 = [];


      if(type == 'P'){
        servers1.push({ //两条数据
            name: '今天负荷',
            lineWidth: 2,
            color: '#9ee460',
            data: data.dataLast,
        })
        servers1.push({
            lineWidth: 2,
            name: '昨天负荷',
            color: '#e35d89',
            data: data.dataThis
        })

      }else if(type == 'I'){
        console.log('I')
        servers1.push({ //两条数据
            name: 'IB',
            plotBorderWidth: 0,
            lineWidth: 2,
            color: '#F3EB2B',
            data: data.IB,
        })
        servers1.push({
            lineWidth: 2,
            name: 'IA',
            color: '#9CE35F',
            data: data.IA
        })
        servers1.push({
            lineWidth: 2,
            name: 'IC',
            color: '#E95986',
            data: data.IC
        })
      }else if(type == 'U'){
        servers1.push({
            name: 'UAC',
            color: '#f4ea2a',
            lineWidth: 2,
            data: data.UAB
          })
          servers1.push({
            name: 'UAB',
            color: '#9ee460',
            lineWidth: 2,
            data: data.UAC
          })
          servers1.push({
            name: 'UBC',
            color: '#e35d89',
            lineWidth: 2,
            data: data.UBC
          })
      }else{
        if(data.PE){
          servers1.push({
            name: 'PE',
            color: '#f4ea2a',
            lineWidth: 2,
            data: data.PE
          })
        }else{
          console.log('没有数据');
          // chart.setLang.noData("Nichts zu anzeigen")

        }

      }

      this.option = {
          chart: {
              type: 'spline'
          },
          title: {
              text: '' //表头文字
          },
          subtitle: {
              text: '' //表头下文字
          },
          xAxis: { //x轴显示的内容
            tickInterval: 6,
            categories: this.xValue,
          },
          yAxis: { //y轴显示的内容
              title: {
                  text: ''
              }
          },
          tooltip: {
            valueDecimals: '2',
            valueSuffix: 'kw',
            shared: true,
            crosshairs: true,
         },
         plotOptions: {
            series: {
                marker: {
                    radius: 0,
                    symbol: 'circle',
                }
            }
        },
        lang: {
            noData: "暂无数据" //真正显示的文本
        },
        credits: {
          	text: '',
          	href: ''
      	},
         series: servers1
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
