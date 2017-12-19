<template>
  <div class="siteswitch">
    <x-header>站点切换</x-header>
    <group label-margin-right="2em" label-align="justify">
      <div class="cellclick" v-for="(i, index) in data" @click="onItemClick(index)" >
        <cell :title="i.name" value="" is-link @click="activeIndex = index" :class="{'show':activeIndex == index}">
          <img class="uncheck" slot="icon" width="20" style="margin-right:8px;" src="../../assets/img/icon/btn_uncheck.png"/>
          <img class="check" slot="icon" width="20" style="margin-right:8px;" src="../../assets/img/icon/btn_check.png"/>
        </cell>
      </div>
    </group>
  </div>
</template>

<script>
import { XHeader, Group, Cell} from 'vux'
import Vue from 'vue';
import axios from 'axios'
import Config from '@/config.js'
import qs from 'qs';

import * as _ from '@/util/common'
import vueRouter from 'vue-router';
Vue.use(vueRouter)

export default {
  name: 'siteswitch',
  components: {
    XHeader,
    Group,
    Cell,
  },
  data(){
    return {
      data: this.data,
      activeIndex: 0,
    }
  },
  mounted() {
    var getSiteInfo = _.getlocalStorage('getSiteInfo');
    this.data = getSiteInfo.data.sites;
    console.log(getSiteInfo);
    var SiteSwitch = _.getlocalStorage('SiteSwitch');
    this.activeIndex = SiteSwitch;
  },

  methods: {
    onItemClick (item) {
      this.activeIndex = item;
      _.setlocalStorage('SiteSwitch', this.activeIndex);
      setTimeout(()=>{
        this.$router.push('/')
      }, 1000)
    },
  },

}
</script>


<style lang="scss" scoped>
.cellclick{
  width: 100%;
}
.weui-cell{
  .check{
    display: none;
  }
  .uncheck{
    display: block;
  }
}
.weui-cell.show{
  .check{
    display: block;
  }
  .uncheck{
    display: none;
  }
}
</style>
