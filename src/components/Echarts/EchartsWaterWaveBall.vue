<template lang="pug">
  .container(:id='elId')
</template>
<script>
import uuidv1 from 'uuid/v1'
import echarts from 'echarts'
import 'echarts-liquidfill/src/liquidFill.js'
export default {
  name:'echarts-water-wave-ball',
  data (){
    return{
      elId : '' ,//存储ID
      legendValue: 0,
      seriesValue: {}
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
    //this.dataItems.forEach(el => {
        //console.log(el);
    //});
    this.drawChart(this.dataItems);
  },
  watch:{
    dataItems:{
      handler(newVal, oldVal){
        console.log(newVal);
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
      const Echart = echarts.init(document.getElementById(this.elId));
      Echart.clear();
      var option = {
    backgroundColor: '#fff',
    graphic: [{
        type: 'group',
        right: '10',
        bottom: 'center',
        children: [{
            type: 'text',
            z: 100,
            right:0,
            bottom:100,
            style: {
                fill: '#000',
                text: '光端口容量：'+$data[0].FTTH_PORT_ALL,
                font: '16px Microsoft YaHei'
            }
        },{
            type: 'text',
            z: 100,
            right:0,
            bottom:60,
            style: {
                fill: '#000',
                text: '光端口实占：'+$data[0].FTTH_PORT_OCC,
                font: '16px Microsoft YaHei'
            }
        },{
            type: 'text',
            z: 100,
            right:0,
            bottom:20,
            style: {
                fill: '#000',
                text: '光端口实占率：'+$data[0].FTTH_PORT_RATE+'%',
                font: '16px Microsoft YaHei'
            }
        }]
    }],
    series: [{
        type: 'liquidFill',
        center: ['30%', '50%'],
        data: [$data[0].FTTH_PORT_RATE/100],
        radius:'65%',
        backgroundStyle: {
            borderWidth: 5,
            borderColor: '#1daaeb',
            color: '#fff'
        },
        label: {
            normal: {
                formatter: $data[0].FTTH_PORT_RATE + '%',
                textStyle: {
                    fontSize: 20
                }
            }
        }
    }]
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


