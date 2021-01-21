<template lang="pug">
//- 区域视图
.area-view
  iframe(width="100%" height="100%" :src="getIpAddress('custInfo') + '/custInfo/marketingSupport/areaView'")
</template>

<script>
export default {
  name: "AreaView"
};
</script>

<style lang="scss" scoped>
.area-view {
  height: calc(100vh - 84px);
}
</style>