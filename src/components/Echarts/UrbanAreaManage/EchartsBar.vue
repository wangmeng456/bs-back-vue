<template>
  <div>
    <span class="tab-card-all">12月总到达量</span>
    <span class="tab-card-num">{{allData}}</span>
    <ve-histogram
      :data="chartData"
      :settings="vchartsConfig.setting"
      :extend="vchartsConfig.extend"
      height="350px"
    ></ve-histogram>
  </div>
</template>

<script>
export default {
  name: "EchartsBar",
  data() {
    return {
      // 总量
      allData: 100,
      // v-charts配置参数
      vchartsConfig: {
        setting: {
          // 别称
          labelMap: {
            type: "",
            count: "到达量"
          }
        },
        extend: {
          title: {
            show: false,
          },
          // 图标顶部的标题及按钮
          legend: {
            show: false
          },
          //X轴线
          xAxis: {
            type: "category",
            show: true,
            // 坐标轴轴线
            axisLine: {
              show: false
            },
            // 坐标轴刻度
            axisTick: {
              show: false
            },
            // 坐标轴每项的文字
            axisLabel: {
              showMaxLabel: true,
              showMinLabel: true,
              color: "#939EAB",
              rotate: 0, //刻度文字旋转，防止文字过多不显示
              margin: 8, //文字离x轴的距离
              boundaryGap: true,
              formatter: v => {
                // console.log('x--v',v)
                if (v.length > 2) {
                  return v.substring(0, 2) + "...";
                }
                return v;
              }
            },
            // X轴下面的刻度小竖线
            axisTick: {
              show: false,
              alignWithLabel: true, //axisLabel.boundaryGap=true时有效
              interval: 0,
              length: 4 //长度
            },
          },
          yAxis: {
            show: true,
            offset: 0,
            // 坐标轴轴线
            axisLine: {
              show: false
            },
            // y轴对应的竖线
            splitLine: {
              show: true
            },
            // 坐标轴刻度
            axisTick: {
              show: false
            },
            boundaryGap: false,
            axisLabel: {
              color: "#7B7B7B"
            }
          },

          // 柱形区域
          grid: {
            show: true,
            backgroundColor:"#fff",
          },

          // 每个柱子
          series(v) {
            // console.log("v", v);
            // 设置柱子的样式
            v.forEach(i => {
              i.barWidth = 16;
              i.itemStyle = {
                color: {
                    type: 'linear',
                    x: 0,//X轴起始坐标
                    y: 0,//Y轴起始坐标
                    x2: 1,//X轴终点坐标
                    y2: 1,//Y轴终点坐标
                    colorStops: [{
                        offset: 0, color: '#2B7BFF' // 0% 处的颜色
                        }, {
                        offset: 1, color: '#1ED0FF' // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                },
                barBorderRadius:[10,10,0,0],
                borderWidth: 0
              };
            });
            return v;
          }
        }
      },
      // v-chats列表数据
      chartData: {
        columns: ["type", "count"],
        rows: [
          { type: "移动", count: 10 },
          { type: "宽带", count: 20 },
          { type: "固话", count: 13 },
          { type: "天翼高清", count: 18 },
          { type: "专线", count: 54 },
          { type: "智家", count: 60 },
        ]
      },
    }
  },
  created() {
    const me = this;
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
</style>