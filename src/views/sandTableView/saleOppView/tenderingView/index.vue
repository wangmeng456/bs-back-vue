<template lang="pug">
//- 招投标信息
.tendering-view
  iframe(width="100%" height="100%" :src="getIpAddress('custInfo') + '/custInfo/marketingSupport/tenderView'")
</template>

<script>
export default {
  name: "TenderingView"
};
</script>

<style lang="scss" scoped>
.tendering-view {
  height: calc(100vh - 84px);
}
</style>