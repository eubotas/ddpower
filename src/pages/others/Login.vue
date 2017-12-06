<template>
  <div class="login">
    <div class="logo">
      <img class="max" src="../../assets/img/others/launcher.png">
    </div>
    <group>
      <x-input title="账号"></x-input>
      <x-input title="密码"></x-input>
    </group>
    <div class="agreepwd">
      <label for="weuiAgree" class="weui-agree">
          <input id="weuiAgree" type="checkbox" class="weui-agree__checkbox">
          <span class="weui-agree__text">
              记住密码
          </span>
      </label>
    </div>
    <div style="padding:15px">
      <x-button link="/" type="primary">登录</x-button>
      <x-button link="/register">用户体验</x-button>
    </div>
    <div class="copyright">
      <p>北京中联腾达电力科技有限公司</p>
      <p>版权所有©2017</p>
    </div>
  </div>
</template>

<script>
import { XInput, Group, XButton } from 'vux'

export default {
  name: 'login',
  components: {
    XInput,
    Group,
    XButton
  }
}
</script>


<style lang="scss" scoped>
  .logo{
    padding: 3rem 0;
    width: 40%;
    margin: 0 auto;
  }
  .agreepwd{
    text-align: right;
    padding-right: 15px;
    margin-top: 15px;
  }
  .copyright{
    margin-top: 5rem;
  }
</style>
