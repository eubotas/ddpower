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
        <div v-show="activeIndex === 0">
          <line-chart :chart-data="datacollection"></line-chart>
          <!-- <button @click="fillData()">Randomize</button> -->
        </div>
        <div v-show="activeIndex === 1">
          <line-chart :chart-data="datacollection"></line-chart>
        </div>
        <div v-show="activeIndex === 2">
          <line-chart :chart-data="datacollection"></line-chart>
        </div>
        <div v-show="activeIndex === 3">
          <line-chart :chart-data="datacollection"></line-chart>
        </div>
      </div>

    </div>

    <Narbar />
  </div>
</template>

<script>
import Headbar from '@/components/Headbar.vue'
import Narbar from '@/components/Narbar.vue'
import LineChart from './charts/LineChart.js'

import { Group, Cell, Tab, TabItem } from 'vux'
import { ButtonTab, ButtonTabItem } from 'vux'



export default {
  name: 'charts',
  data(){
    return {
      activeIndex: 0,
      datacollection: null
    }
  },
  methods: {
    onItemClick (index) {
      console.log('on item click:', index);
      this.activeIndex = index;
      this.fillData();
    },
    fillData () {
      this.datacollection = {
        labels: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
          }, {
            label: 'Data One',
            backgroundColor: '#FC2525',
            data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
          }
        ]
      }
    },
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    }
  },
  mounted () {
    this.fillData()
  },
  components: {
    Headbar,
    Narbar,
    Tab,
    TabItem,
    ButtonTab,
    ButtonTabItem,
    LineChart
  }
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
