<template>
  <div class="my">
    <Headbar headName="我的"></Headbar>
    <div class="user-info">
      <div class="user-avatar">
        <img class="max" src="../assets/img/my/avator.png">
      </div>
      <div class="user-name">
        LJY
      </div>
    </div>
    <group label-width="5.5em" label-margin-right="2em" label-align="justify">
      <cell title="个人信息" value="" is-link></cell>
      <cell title="意见反馈" value="" is-link></cell>
      <cell title="客服电话" value="" is-link></cell>
      <cell title="点我注销" value="" link="/login"></cell>
    </group>
    <Narbar />
  </div>
</template>

<script>
import Headbar from '@/components/Headbar.vue'
import Narbar from '@/components/Narbar.vue'
import { Group, Cell } from 'vux'

export default {
  name: 'my',
  components: {
    Headbar,
    Group,
    Cell,
    Narbar,
  }
}
</script>


<style lang="scss" scoped>
  .user-info{
    background-color: #64bdde;
    text-align: center;
    height: 10rem;
    .user-avatar{
      width: 3.5rem;
      height: 3.5rem;
      display: inline-block;
      border-radius: 6rem;
      overflow: hidden;
      margin-top: 2.5rem;
    }
    .user-name{
      margin-top: .5rem;
    }
  }
</style>
