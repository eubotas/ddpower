<template>
  <div class="userinfo">
    <x-header>个人信息</x-header>
    <div class="info">
      <ul>
        <li><span class="title">姓名</span><span class="value">{{data.data.name}}</span></li>
        <li><span class="title">公司</span><span class="value">{{data.data.company}}</span></li>
        <li><span class="title">部门</span><span class="value">{{data.data.department}}</span></li>
        <li><span class="title">职位</span><span class="value">{{data.data.title}}</span></li>
        <li><span class="title">电子邮箱</span><span class="value">{{data.data.email}}</span></li>
        <li><span class="title">电话</span><span class="value">{{data.data.cs}}</span></li>
      </ul>
    </div>

  </div>
</template>

<script>
import { Cell, Group, XHeader } from 'vux'

import * as _ from '@/util/common'
export default {
  name: 'userinfo',
  components: {
    Cell,
    Group,
    XHeader
  },
  data(){
    return {
      data: _.getlocalStorage('userInfo')
    }
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
