<template>
    <div class="x-bar">
        <div :id="id" :option="option"></div>
    </div>
</template>
<script>
    import HighCharts from 'highcharts'
    export default {
        // 验证类型
        props: {
            id: {
                type: String
            },
            option: {
                type: Object
            }
        },
        mounted() {
          var that = this;
          setTimeout(function(){
            var chart = new HighCharts.chart(that.id, that.option);
            chart.addSeries(that.option);
            chart.redraw();
          }, 500)
        }

    }
</script>
