<template>
  <ve-histogram :data="chartData" :settings="chartSettings" :extend="chartExtend" height="350px" class="echartspile"></ve-histogram>
</template>

<script>
export default {
  data() {
    this.chartSettings = {
      stack: { 类型: ["移动", "宽带", "固话", "天翼高清", "专线", "智家"] }
    };
    return {
      chartExtend: {
        //X轴线
        xAxis: {
          show: true,
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
              if (v.length > 4) {
                return v.substring(0, 4) + "...";
              }
              return v;
            }
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
        },

        // 柱形区域
        grid: {
          show: true,
          backgroundColor: "#fff"
        },

        // 每个柱子
        series(v) {
          // console.log("v", v);
          // 设置柱子的样式
          v.forEach(i => {
            i.barWidth = 20;
            i.itemStyle = {
              borderWidth: 0
            };
          });
          return v;
        }
      },
      chartData: {
        columns: ["日期", "移动", "宽带", "固话", "天翼高清", "专线", "智家"],
        rows: [
          { 日期: 202007, 移动: 10, 宽带: 7, 固话: 40, 天翼高清: 16, 专线: 9, 智家: 10 },
          { 日期: 202008, 移动: 9, 宽带: 4, 固话: 9, 天翼高清: 13, 专线: 11, 智家: 12 },
          { 日期: 202009, 移动: 10, 宽带: 2, 固话: 8, 天翼高清: 23, 专线: 11, 智家: 15 },
          { 日期: 202010, 移动: 8, 宽带: 10, 固话: 5, 天翼高清: 14, 专线: 10, 智家: 17 },
          { 日期: 202011, 移动: 20, 宽带: 30, 固话: 3, 天翼高清: 18, 专线: 9, 智家: 14 },
          { 日期: 202012, 移动: 10, 宽带: 8, 固话: 36, 天翼高清: 7, 专线: 20, 智家: 13 }
        ]
      },
    };
  },
  created() {
    const me = this;
  },
  methods: {
  }
};
</script>

<style scoped>
  .echartspile{
    margin-top: 40px
  }
</style>