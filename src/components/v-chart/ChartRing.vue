<template lang="pug">
	v-charts-ring(:data="chartJson.chartData" :mark-point="chartJson.markPoint" :settings="chartJson.chartSetting" :width="chartJson.width" :height="chartJson.height" :extend="chartJson.extend" :events="chartJson.chartEvents" :legend-position="chartJson.legendPosition" :tooltip-visible="chartJson.tooltipVisibleShow" :legend-visible="chartJson.legendVisibleShow" :colors="chartJson.colors" :mark-line="chartJson.markLine")
</template>

<script>
import VChartsRing from "v-charts/lib/ring.common";
export default {
  name: "chartring",
  components: {
    VChartsRing
  },
  props: ["chartJson"]
};
</script>
