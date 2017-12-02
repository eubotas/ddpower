<template>
  <div class="narbar">
    <tabbar>
    <tabbar-item>
      <img slot="icon" src="../assets/img/navbar/tab_1_uncheck.png">
      <span slot="label">首页</span>
    </tabbar-item>
    <tabbar-item show-dot>
      <img slot="icon" src="../assets/img/navbar/tab_2_uncheck.png">
      <span slot="label">在线检测</span>
    </tabbar-item>
    <tabbar-item show-dot>
      <img slot="icon" src="../assets/img/navbar/tab_3_uncheck.png">
      <span slot="label">数据曲线</span>
    </tabbar-item>
    <tabbar-item selected link="/component/demo">
      <img slot="icon" src="../assets/img/navbar/tab_4_uncheck.png">
      <span slot="label">报警</span>
    </tabbar-item>
    <tabbar-item badge="2">
      <img slot="icon" src="../assets/img/navbar/tab_5_uncheck.png">
      <span slot="label">我的</span>
    </tabbar-item>
  </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'

export default {
  name: 'narbar',
  data () {
    return {
    }
  },
  methods: {
  // 事件响应方法

},
components: {
  Tabbar,
  TabbarItem
}
}
</script>
<style scoped>

</style>
