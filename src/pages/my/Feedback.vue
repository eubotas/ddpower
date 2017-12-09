<template>
  <div class="feedback">
    <x-header>意见反馈</x-header>
    <textarea name="name" rows="8" placeholder="请留下您的宝贵意见！"></textarea>
    <div style="padding:15px">
      <x-button link="/" type="primary">确定提交</x-button>
    </div>
  </div>
</template>

<script>
import { XHeader, XButton } from 'vux'

export default {
  name: 'feedback',
  components: {
    XHeader,
    XButton,
  }
}
</script>


<style lang="scss" scoped>
textarea{
  width: 90%;
  margin: 0 auto;
  border: none;
  padding: 2%;
  border: 1px solid #64bdde;
  margin-top: 10px;
}
</style>
