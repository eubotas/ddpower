<template>
  <div class="charts">
    <Headbar headName="数据曲线"></Headbar>
    <tab>
      <tab-item selected @on-item-click="onItemClick">负荷曲线</tab-item>
      <tab-item @on-item-click="onItemClick">电流曲线</tab-item>
      <tab-item @on-item-click="onItemClick">电压曲线</tab-item>
      <tab-item @on-item-click="onItemClick">功率因数</tab-item>
    </tab>
    <div v-show="activeIndex === 0">
      1
    </div>
    <div v-show="activeIndex === 1">
      2
    </div>
    <div v-show="activeIndex === 2">
      3
    </div>
    <div v-show="activeIndex === 3">
      4
    </div>
    <Narbar />
  </div>
</template>

<script>
import Headbar from '@/components/Headbar.vue'
import Narbar from '@/components/Narbar.vue'
import { Group, Cell, Tab, TabItem } from 'vux'

export default {
  name: 'charts',
  data(){
    return {
      activeIndex: 0
    }
  },
  methods: {
    onItemClick (index) {
      console.log('on item click:', index);
      this.activeIndex = index;
    },
  },
  components: {
    Headbar,
    Narbar,
    Tab,
    TabItem,
  }
}
</script>


<style lang="scss" scoped>

</style>
