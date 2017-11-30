<template>
  <div class="narbar">
    <ul class="navs">
      <li><router-link to="/">首页</router-link></li>
      <li><router-link to="/testing">在线检测</router-link></li>
      <li><router-link to="/charts">数据曲线</router-link></li>
      <li><router-link to="/warning">报警</router-link></li>
      <li><router-link to="/my">我的</router-link></li>
    </ul>

  </div>
</template>

<script>
export default {
  name: 'narbar',
  data () {
    return {
    }
  },
  methods: {
  // 事件响应方法

}
}
</script>
<style scoped>

</style>
