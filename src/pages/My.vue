<template>
  <div class="my">
    <Headbar headName="我的"></Headbar>
    <div class="user-info">
      <div class="user-avatar">
        <img class="max" src="../assets/img/my/avator.png">
      </div>
      <div class="user-name">
        {{data.userName}}
      </div>
    </div>
    <group label-width="5.5em" label-margin-right="2em" label-align="justify">
      <cell title="个人信息" value="" link="/userinfo">
        <img slot="icon" width="20" style="display:block;margin-right:8px;" src="../assets/img/icon/1.png"/>
      </cell>
      <cell title="意见反馈" link="/feedback">
        <img slot="icon" width="20" style="display:block;margin-right:8px;" src="../assets/img/icon/2.png"/>
      </cell>
      <a class="callus" href="tel:4008001234"><cell title="客服电话" is-link>
        <img slot="icon" width="20" style="display:block;margin-right:8px;" src="../assets/img/icon/3.png"/>
      </cell></a>
      <div  v-show="showSiteNum">
        <cell title="站点切换" link="/siteswitch">
          <img slot="icon" width="20" style="display:block;margin-right:8px;" src="../assets/img/icon/siteswitch.png"/>
        </cell>
      </div>

      <cell title="点我注销" @click.native="showPlugin">
        <img slot="icon" width="20" style="display:block;margin-right:8px;" src="../assets/img/icon/4.png"/>
      </cell>
    </group>
  </div>
</template>

<script>
import Vue from 'vue';
import Headbar from '@/components/Headbar.vue'
import { Group, Cell,Confirm, TransferDomDirective as TransferDom, ConfirmPlugin  } from 'vux'

Vue.use(ConfirmPlugin)
import * as _ from '@/util/common'
import VModal from 'vue-js-modal'
import vueRouter from 'vue-router';
Vue.use(vueRouter)
Vue.use(VModal)
export default {
  directives: {
    TransferDom
  },
  name: 'my',
  components: {
    Headbar,
    Group,
    Cell,
    Confirm,
    ConfirmPlugin
  },
  data(){
    return {
    show: false,
    data: this.data,
    showSiteNum: false
    }
  },
  mounted() {
    var getSiteInfo = _.getlocalStorage('getSiteInfo');
    this.data = _.getlocalStorage('userInfo');
    this.data.userName = _.getlocalStorage('userName');
    console.log(this.data)
    if(getSiteInfo.data.sites.length > 1){
      this.showSiteNum = true;
    }
  },

  methods: {
    // 是否要注销
    // goLogin: function(){
    //
    //   window.location.href = '/#/login'
    // },
    onCancel () {
      console.log('取消')
    },
    onConfirm (msg) {
      console.log('确定')
    },
    showPlugin () {
    var that = this;
    this.$vux.confirm.show({
      title: '提示',
      content: '确定注销吗？',
      onCancel () {
        console.log('plugin cancel')
      },
      onConfirm () {
        console.log('plugin confirm');
        setTimeout(()=>{
          that.$router.push('/login');
          localStorage.removeItem('SiteSwitch');
        }, 400)
      }
    })
},
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
