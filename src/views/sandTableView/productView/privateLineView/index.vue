<template lang="pug">
//- 专线视图
.private-line-view
  iframe(width="100%" height="100%" :src="getIpAddress('custInfo') + '/custInfo/marketingSupport/dedicatedLine'")
</template>

<script>
export default {
  name: "PrivateLineView"
};
</script>

<style lang="scss" scoped>
.private-line-view {
  height: calc(100vh - 84px);
}
</style>