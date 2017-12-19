<template>
  <div class="headbar">
    <x-header :left-options="{showBack: false}">{{ headName }}

      <router-link  slot="right" to="/police"><img width="24" src="../assets/img/icon/bell.png" alt=""></router-link></x-header>
  </div>
</template>

<script>
import { XHeader } from 'vux'
import Vue from 'vue';
import vueRouter from 'vue-router';
Vue.use(vueRouter)
export default {
  props: [
      'headName'
  ],
  methods: {
  // 事件响应方法

},
components: {
  XHeader
}
}
</script>
<style scoped>
  a{
    margin-top: -5px;
  }
</style>
