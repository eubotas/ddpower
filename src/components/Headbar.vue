<template>
  <div class="headbar">
    <x-header :left-options="{showBack: false}">{{ headName }}<a slot="right">警报</a></x-header>
  </div>
</template>

<script>
import { XHeader } from 'vux'

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

</style>
