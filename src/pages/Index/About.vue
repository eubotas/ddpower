<template>
  <div class="about">
    <h3>站点概况</h3>
    <p>配电室代维开始时间：{{data.data.sites[activeIndex].buildYear}}</p>
    <p>站点名称：{{data.data.sites[activeIndex].name}}</p>
    <p>
    <span class="p-grid">
      <span class="p-griditem">
        高压柜数量：{{data.data.sites[activeIndex].highVoltCab}}
      </span>
      <span class="p-griditem">
        低压柜数量：{{data.data.sites[activeIndex].lowVoltCab}}
      </span>
    </span>
    </p>
    <p>
    <span class="p-grid">
      <span class="p-griditem">
        变压器数量：{{data.data.sites[activeIndex].transformers}}
      </span>
      <span class="p-griditem">
        总容量：{{data.data.sites[activeIndex].totalVolume}}kVA
      </span>
    </span>
    </p>
    <p>备注：{{data.data.sites[activeIndex].memo}}</p>
  </div>
</template>

<script>
"use strict";
import { Grid, GridItem } from 'vux'
import Vue from 'vue'
import axios from 'axios'
import Config from '@/config.js'
import qs from 'qs';

import * as _ from '@/util/common'

Vue.prototype.$http = axios

export default {
  name: 'about',
  components: {
    Grid,
    GridItem
  },
  data(){
    // console.log(this.data)
    return {
      data: this.data,
      activeIndex: 0,
    }
  },
  created() {
    var userInfo = _.getlocalStorage('userInfo');
    var SiteSwitch = _.getlocalStorage('SiteSwitch');
    SiteSwitch?this.activeIndex = SiteSwitch:this.activeIndex = 0;



      var params = {
            cmd: 'getSiteInfo',
            token: userInfo.data.token,
      }
      axios.post(Config.URL.Test, qs.stringify(params))
        .then((res) => {
          console.log(res);
          if(res.data.errCode == 3){
            localStorage.removeItem('userInfo');
          }
          this.data = res;
          _.setlocalStorage('getSiteInfo', res);

          //获取getTFList
          var tfids = res.data.sites[this.activeIndex].siteId;
          var tfParams = {
                cmd: 'getTFList',
                token: userInfo.data.token,
                siteId: tfids,
          }
          axios.post(Config.URL.Test, qs.stringify(tfParams))
            .then((restf)=> {
              if(restf.data.errMsg == 'OK'){
                _.setlocalStorage('getTfids', restf);
              }
            })
            // end

        })
        .catch((error) => {
          console.log(error);
        });
  }
}
</script>


<style lang="scss" scoped>
  .about{
    text-align: left;
    padding: 6px 10px;
    h3{
      line-height: 40px;
      font-weight: 500;
      border-bottom: 1px solid #f2f2f2;
      color: #000;
    }
    p{
      padding-left: 10px;
      line-height: 40px;
      color: #777;
      font-size: 14px;
      overflow: hidden;
      border-bottom: 1px solid #f2f2f2;
    }
    .p-grid{

    overflow: hidden;
      .p-griditem{
        width: 50%;
        float: left;
      }
    }
  }
</style>
