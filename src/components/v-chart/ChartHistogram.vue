<template lang="pug">
	v-charts-histogram(:data="chartJson.chartData" :legend-position="chartJson.legendPosition" :mark-point="chartJson.markPoint" :settings="chartJson.chartSetting" :width="chartJson.width" :height="chartJson.height" :extend="chartJson.extend" :events="chartJson.chartEvents" :tooltip-visible="chartJson.tooltipVisibleShow" :legend-visible="chartJson.legendVisibleShow" :colors="chartJson.colors" :mark-line="chartJson.markLine")
</template>

<script>
// 柱状图图表 https://v-charts.js.org/#/start?id=%E6%8C%89%E9%9C%80%E5%BC%95%E5%85%A5
import VChartsHistogram from "v-charts/lib/histogram.common";
export default {
  name: "chartsHistogram",
  components: {
    VChartsHistogram
  },
  props: ["chartJson"]
};
</script>
