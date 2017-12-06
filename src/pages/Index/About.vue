<template>
  <div class="about">
    <h3>站点概况</h3>
    <p>配电室代维开始时间：2016</p>
    <p>站点名称：丽晶婉</p>
    <p>
    <span class="p-grid">
      <span class="p-griditem">
        高压柜数量：8
      </span>
      <span class="p-griditem">
        低压柜数量：3
      </span>
    </span>
    </p>
    <p>
    <span class="p-grid">
      <span class="p-griditem">
        变压器数量：2
      </span>
      <span class="p-griditem">
        总容量：2500kVA
      </span>
    </span>
    </p>
    <p>备注：未改造</p>
  </div>
</template>

<script>
import { Grid, GridItem } from 'vux'
export default {
  name: 'about',
  components: {
    Grid,
    GridItem
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
