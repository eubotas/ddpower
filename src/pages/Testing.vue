<template>
  <div class="my">
    <Headbar headName="在线监测"></Headbar>
    <tab>
      <tab-item selected @on-item-click="onItemClick">用电参数</tab-item>
      <tab-item @on-item-click="onItemClick">开关状态</tab-item>
    </tab>
    <div v-show="activeIndex === 0">
      1
    </div>
    <div v-show="activeIndex === 1">
      2
    </div>

    <Narbar />
  </div>
</template>

<script>
import Headbar from '@/components/Headbar.vue'
import Narbar from '@/components/Narbar.vue'
import { Group, Cell, Tab, TabItem } from 'vux'

export default {
  name: 'my',
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
