<template lang="pug">
	v-charts-pie(:data="chartJson.chartData" :mark-point="chartJson.markPoint" :settings="chartJson.chartSetting" :width="chartJson.width" :height="chartJson.height" :extend="chartJson.extend" :legend-position="chartJson.legendPosition" :events="chartJson.chartEvents" :tooltip-visible="chartJson.tooltipVisibleShow" :legend-visible="chartJson.legendVisibleShow" :colors="chartJson.colors" :mark-line="chartJson.markLine")
</template>

<script>
import VChartsPie from "v-charts/lib/pie.common";
export default {
  name: "chartpie",
  components: {
    VChartsPie
  },
  props: ["chartJson"]
};
</script>