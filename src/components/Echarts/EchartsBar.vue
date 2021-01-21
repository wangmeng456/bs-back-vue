<template lang="pug">
  .container(:id='elId')
</template>
<script>
import uuidv1 from 'uuid/v1'
import echarts from 'echarts'
export default {
  name:'echarts-line',
  data (){
    return{
      elId : '' ,//存储ID
    }
  },
  props: {                //接受父组件传递来的数据
    dataItems: {
      // type: Array,
      default () {}        //默认数据，没有数剧的情况下启用
    },
  },
  created (){
    this.elId = uuidv1() //获取随机id
  },
  mounted (){
    this.drawChart(this.dataItems);
  },
  watch:{
    dataItems:{
      handler(newVal, oldVal){
        // newVal.value.forEach(el => {
        //   //this.count += el.value;  
        // });
        this.drawChart(newVal, this.count); 
      },
      deep: true,
    }
  },
  methods:{
    drawChart($data){
      console.log("$data");
      console.log($data);
      const Echart = echarts.init(document.getElementById(this.elId));
      Echart.clear();
      var  colorList=['#afa3f5', '#00d488', '#3feed4', '#3bafff', '#f1bb4c', "rgba(250,250,250,0.5)","#0099ff"];
    var option = {
    color: ['#546ef3', '#a6cb09', '#f8bd00'],
    legend: {
        x: 'right',
        y: "center",
        orient:'vertical',
        padding:[0,10],
        align:'left',
        itemGap:40
    },
    tooltip: {
        show: true,
        trigger: 'item',
        formatter: "{a} : <br />{c}%",
    },
    polar: {
        center: ['30%', '60%'],
        radius: '400%' //图形大小
    },
    angleAxis: {
        show: false,
        startAngle: 90,
        min: 0,
        max: 100
    },
    radiusAxis: {
        type: 'category',
        show: false,
        data: ["宽带", "移动", "高清"]
    },
    series: [
        {
            type: "bar",
            name: "宽带",
            coordinateSystem: "polar",
            barWidth: 10, //宽度
            barCategoryGap: "40%",
            data: [$data.CDMA_BILL_A[0]],
        },
        {
            type: "bar",
            name: "移动",
            coordinateSystem: "polar",
            barWidth: 10,
            barCategoryGap: "40%",
            data: [$data.YXKD_BILL_A[0]]
        },
        {
            type: "bar",
            name: "高清",
            coordinateSystem: "polar",
            barWidth: 10,
            barCategoryGap: "40%",
            data: [$data.IPTV_BILL_A[0]]
        }
    ]
};
      Echart.setOption(option);
    }
  }

}
</script>
<style lang="stylus" scoped>
.container
  width: 100%;
  height: 100%;
  div
    width: 100%;
    height: 100%;
</style>


