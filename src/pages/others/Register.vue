<template>
  <div class="register">
    <x-header>用户体验</x-header>
    <group>
      <x-input placeholder="姓名">
        <img slot="label" style="padding-right:20px;display:block;" src="../../assets/img/others/name.png" width="24" height="24">
      </x-input>
      <x-input placeholder="公司名称">
        <img slot="label" style="padding-right:20px;display:block;" src="../../assets/img/others/company.png" width="24" height="24">
      </x-input>
      <x-input placeholder="邮箱">
        <img slot="label" style="padding-right:20px;display:block;" src="../../assets/img/others/email.png" width="24" height="18">
      </x-input>
      <x-input placeholder="手机号码">
        <img slot="label" style="padding-right:28px;display:block;" src="../../assets/img/others/phone.png" width="16" height="24">
        <x-button slot="right" type="primary" mini>发送验证码</x-button>
      </x-input>
      <x-input placeholder="验证码">
        <img slot="label" style="padding-right:28px;display:block;" src="../../assets/img/others/phone.png" width="16" height="24">
      </x-input>
    </group>
    <group style="padding: 15px">
      <x-button @click.native="iconType = ''" type="primary">开始体验吧</x-button>
    </group>
  </div>
</template>

<script>
import { XInput, Group, XButton, XHeader } from 'vux'

export default {
  name: 'register',
  components: {
    XInput,
    Group,
    XButton,
    XHeader
  }
}
</script>


<style lang="scss" scoped>

</style>
