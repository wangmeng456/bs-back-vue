<template lang="pug">
//- 承包单元视图
.contracting-unit-view
  iframe(width="100%" height="100%" :src="getIpAddress('custInfo') + '/custInfo/home'")
</template>

<script>
export default {
  name: "ContractingUnitView"
};
</script>

<style lang="scss" scoped>
.contracting-unit-view {
  height: calc(100vh - 84px);
}
</style>