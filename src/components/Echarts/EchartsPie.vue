<template lang="pug">
  .container(:id='elId')
</template>
<script>
import uuidv1 from 'uuid/v1'
import echarts from 'echarts'
export default {
  name:'echarts-pie',
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
    title: {
        text: $data[0].ZONE_INCM_Y,
        subtext: '总收入(万元)',
        x: 'center',
        y: 'center',
        left:'29%',
        textAlign:'center',
        textStyle: {
            fontSize:20,
            fontWeight:'normal',
            color: ['#333']
        },
        subtextStyle: {
            color: '#666',
            fontSize: 16
        },
    },
    legend: {
        show:true,
        orient: 'vertical',
        top: "middle",
        right: "10",
        itemGap:15,
        textStyle: {
            color: '#666666',
            fontSize: 16,
        }
    },
    series: [
        {
            radius: ['50%', '70%'],
            center: ['30%', '50%'],
            type: 'pie',
            itemStyle: {
                normal: {
                    color: function(params) {
                        return colorList[params.dataIndex]
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            label: {
                normal: {
                    show: false
                }
            },
            data: [
                {value:$data[0].CDMA_INCM_Y,name:'移动'},
                {value:$data[0].YXKD_INCM_Y, name:'宽带'},
                {value:$data[0].IPTV_INCM_Y, name:'天翼高清'},
                {value:$data[0].QITA_INCM_Y, name:'其他'},
            ],
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


