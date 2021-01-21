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
    var option = {
        tooltip: {
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '14%'];
            }
        },

        legend: {
            data: ['宽带', '移动', '高清'],
            x: 'left'
        },

        xAxis: {
            type: 'category',
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            boundaryGap: true,
            data: $data.DAY_ID
        },
        yAxis: [{
            type: 'value',
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                lineStyle: {
                    type: 'dotted',
                }
            },
            splitArea: {//背景条纹
                show: true,
                areaStyle: {
                    color: [
                        'rgba(255,255,255,0)',
                        'rgba(242,243,248,1)'
                    ]
                }

            },
            min: 0,
            splitNumber: 5,
        }],
        dataZoom: [{
            type: "slider", /*类型*/
            xAxisIndex: 0, /*对应的轴*/
            bottom: "10", /*位置，定位*/
            start: 20, /*开始*/
            end: 100, /*结束*/
            handleIcon: "M0,0 v9.7h5 v-9.7h-5 Z",
            handleStyle: { /*手柄的样式*/
                color: "#40bcf9",
                borderColor: "#1fb2fb"
            },
            backgroundColor: "#e2f3ff", /*背景 */
            dataBackground: { /*数据背景*/
                lineStyle: {
                    color: "#000000"
                },
                areaStyle: {
                    color: "#d4d9dd"
                }
            },
            fillerColor: "rgba(31,178,251,0.2)", /*被start和end遮住的背景*/
            labelFormatter: function (value, params) { /*拖动时两端的文字提示*/
                var str = "";
                if (params.length > 4) {
                    str = params.substring(0, 4) + "…";
                } else {
                    str = params;
                }
                return str;
            }
        }],
        grid: {
            left: '1rem',
            right: '4%',
            bottom: '20%',
            top: '14%',
            containLabel: true,
            borderWidth: '0'
        },
        series: [
            {
                name: "宽带",
                type: "line",
                smooth: true,
                symbol: 'circle',
                symbolSize: 10,
                data: $data.CDMA_DEVP_M,
                itemStyle: {
                    normal: {
                        color: '#5fbdff',
                        lineStyle: {
                            width: 3
                        }
                    }
                }

            },
            {
                name: "移动",
                type: "line",
                smooth: true,
                symbol: 'circle',
                symbolSize: 10,
                data: $data.YXKD_DEVP_M,
                itemStyle: {
                    normal: {
                        color: '#ff975f',
                        lineStyle: {
                            width: 3,
                            type: 'dotted',
                        }
                    }
                }

            },
            {
                name: "高清",
                type: "line",
                smooth: true,
                symbol: 'circle',
                symbolSize: 10,
                data: $data.IPTV_DEVP_M,
                itemStyle: {
                    normal: {
                        color: '#86ce80',
                        lineStyle: {
                            width: 3,
                            type: 'dotted',
                        }
                    }
                }

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


