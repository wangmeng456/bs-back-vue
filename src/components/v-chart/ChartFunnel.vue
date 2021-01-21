<template lang="pug">
	v-charts-funnel(:data="chartJson.chartData" :mark-point="chartJson.markPoint" :settings="chartJson.chartSetting" :width="chartJson.width" :height="chartJson.height" :extend="chartJson.extend" :events="chartJson.chartEvents" :tooltip-visible="chartJson.tooltipVisibleShow" :legend-visible="chartJson.legendVisibleShow" :colors="chartJson.colors" :mark-line="chartJson.markLine")
</template>

<script>
import VChartsFunnel from "v-charts/lib/funnel.common";
export default {
  name: "chartfunnel",
  components: {
    VChartsFunnel
  },
  props: ["chartJson"]
};
</script>
