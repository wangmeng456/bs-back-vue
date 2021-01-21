<template lang="pug">
//- 蓝海视图
.blue-ocean-view
  iframe(width="100%" height="100%" :src="getIpAddress('custInfo') + '/custInfo/marketingSupport/blueOceanCustomers'")
</template>

<script>
export default {
  name: "BlueOceanView"
};
</script>

<style lang="scss" scoped>
.blue-ocean-view {
  height: calc(100vh - 84px);
}
</style>