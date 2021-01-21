<template lang="pug">
	v-charts-gauge(:data="chartJson.chartData" :mark-point="chartJson.markPoint" :settings="chartJson.chartSetting" :width="chartJson.width" :height="chartJson.height" :extend="chartJson.extend" :events="chartJson.chartEvents" :tooltip-visible="chartJson.tooltipVisibleShow" :legend-visible="chartJson.legendVisibleShow" :colors="chartJson.colors" :mark-line="chartJson.markLine")
</template>

<script>
// 柱状图图表 https://v-charts.js.org/#/start?id=%E6%8C%89%E9%9C%80%E5%BC%95%E5%85%A5
import VChartsGauge from "v-charts/lib/gauge.common";
export default {
  name: "chartgauge",
  components: {
    VChartsGauge
  },
  props: ["chartJson"]
};
</script>
