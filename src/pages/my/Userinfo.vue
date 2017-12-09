<template>
  <div class="userinfo">
    <x-header>个人信息</x-header>
    <div class="info">
      <ul>
        <li><span class="title">姓名</span><span class="value">丽晶婉</span></li>
        <li><span class="title">公司</span><span class="value">北京丽晶婉</span></li>
        <li><span class="title">部门</span><span class="value">技术部</span></li>
        <li><span class="title">职位</span><span class="value">电力工程师</span></li>
        <li><span class="title">电子邮箱</span><span class="value">info@test.com</span></li>
        <li><span class="title">电话</span><span class="value">10086</span></li>
      </ul>
    </div>

  </div>
</template>

<script>
import { Cell, Group, XHeader } from 'vux'

export default {
  name: 'userinfo',
  components: {
    Cell,
    Group,
    XHeader
  }
}
</script>


<style lang="scss" scoped>
  .info{
    text-align: left;

    li{
      border-bottom: 1px solid #ddd;
      padding: 12px;
      span{
        display: inline-block;
        width: 50%;
        color: #777;
      }
    }
  }
</style>
