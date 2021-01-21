<template lang="pug">
//- 行业总监视图
.industry-director-view
  iframe(width="100%" height="100%" :src="getIpAddress('custInfo') + '/custInfo/marketingSupport/industryView'")
</template>

<script>
export default {
  name: "IndustryDirectorView"
};
</script>

<style lang="scss" scoped>
.industry-director-view {
  height: calc(100vh - 84px);
}
</style>