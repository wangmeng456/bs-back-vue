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
      const Echart = echarts.init(document.getElementById(this.elId));
      Echart.clear();
      var  colorList=['#afa3f5', '#00d488', '#3feed4', '#3bafff', '#f1bb4c', "rgba(250,250,250,0.5)","#0099ff"];
      var data = ['北京市', '上海市', '广东省', '天津市', '江苏省', '河南省', '海南省'];
       var option = {
        baseOption: {
            timeline: {
                show: false,
                top: 0,
                data: [100, 100, 100, 100, 100, 100, 100]
            },
            grid: [{
                show: false,
                left: '5%',
                top: '10%',
                bottom: '8%',
                containLabel: true,
                width: '37%'
            },  {
                show: false,
                left: '55%',
                top: '10%',
                bottom: '11%',
                width: '0%'
            }, {
                show: false,
                right: '5%',
                top: '10%',
                bottom: '8%',
                // left: '53%',
                containLabel: true,
                width: '37%'
            }],
            xAxis: [{
                type: 'value',
                inverse: true,
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                position: 'top',

                splitLine: {
                    // show: false
                }
            }, {
                gridIndex: 1,
                show: false,
            }, {
                gridIndex: 2,
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                position: 'top',
                splitLine: {
                    // show: false
                }
            }],
            yAxis: [{
                type: 'category',
                inverse: true,
                position: 'right',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                data
            }, {
                gridIndex: 1,
                type: 'category',
                inverse: true,
                position: 'left',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: true,
                },
                data
            }, {
                gridIndex: 2,
                type: 'category',
                inverse: true,
                position: 'left',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false

                },
                data
            }],
            series: []

        },
        options: [{
        series: [
      {
            name: '2017',
            type: 'bar',
            xAxisIndex: 0,
            yAxisIndex: 0,

            barWidth: 10,
            itemStyle: {
                normal: {
                    barBorderRadius: 5,
                    color: '#039372'
                }
            },

            data:  [3, 20, 62, 34, 55, 65, 33],

        },{
            name: '2018',
            type: 'bar',
            xAxisIndex: 2,
            yAxisIndex: 2,
            barWidth: 10,
            itemStyle: {
                normal: {
                    barBorderRadius: 5,
                    color: '#36d7b6'
                }
            },
            data: [11, 38, 23, 39, 66, 66, 79],

        }
        ]
    }]
    }
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


