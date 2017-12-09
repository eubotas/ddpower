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
      <cell title="个人信息" value="" link="/userinfo">
        <img slot="icon" width="20" style="display:block;margin-right:8px;" src="../assets/img/icon/1.png"/>
      </cell>
      <cell title="意见反馈" value="" link="/feedback">
        <img slot="icon" width="20" style="display:block;margin-right:8px;" src="../assets/img/icon/2.png"/>
      </cell>
      <a class="callus" href="tel:4008001234"><cell title="客服电话" value="" is-link>
        <img slot="icon" width="20" style="display:block;margin-right:8px;" src="../assets/img/icon/3.png"/>
      </cell></a>
      <cell title="点我注销" value="" link="/login">
        <img slot="icon" width="20" style="display:block;margin-right:8px;" src="../assets/img/icon/4.png"/>
      </cell>
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
  .callus{
      color: #000;
      position: relative;
      display: block;
      &:before{
        content: " ";
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        height: 1px;
        border-top: 1px solid #D9D9D9;
        color: #D9D9D9;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
        left: 15px;
      }
    }
</style>
