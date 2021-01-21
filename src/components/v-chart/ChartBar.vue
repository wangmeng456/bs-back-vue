<template lang="pug">
	v-charts-bar(:data="chartJson.chartData" :mark-point="chartJson.markPoint" :settings="chartJson.chartSetting" :width="chartJson.width" :height="chartJson.height" :extend="chartJson.extend" :events="chartJson.chartEvents" :tooltip-visible="chartJson.tooltipVisibleShow" :legend-visible="chartJson.legendVisibleShow" :colors="chartJson.colors" :mark-line="chartJson.markLine")
</template>

<script>
import VChartsBar from "v-charts/lib/bar.common";
export default {
  name: "chartBar",
  components: {
    VChartsBar
  },
  props: ["chartJson"]
};
</script>