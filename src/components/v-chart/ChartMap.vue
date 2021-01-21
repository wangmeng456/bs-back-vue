<template lang="pug">
	v-charts-map(:data="chartJson.chartData" :mark-point="chartJson.markPoint" :settings="chartJson.chartSetting" :width="chartJson.width" :height="chartJson.height" :extend="chartJson.extend" :events="chartJson.chartEvents" :tooltip-visible="chartJson.tooltipVisibleShow" :legend-visible="chartJson.legendVisibleShow" :legend-position="chartJson.legendPosition" :colors="chartJson.colors" :mark-line="chartJson.markLine")
</template>

<script>
import VChartsMap from "v-charts/lib/map.common";
export default {
  name: "chartMap",
  components: {
    VChartsMap
  },
  props: ["chartJson"]
};
</script>
