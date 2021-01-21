<template lang="pug">
//- 收入视图
.income-view
  iframe(width="100%" height="100%" :src="getIpAddress('custInfo') + '/custInfo/marketingSupport/incomeArea'")
</template>

<script>
export default {
  name: "IncomeView"
};
</script>

<style lang="scss" scoped>
.income-view {
  height: calc(100vh - 84px);
}
</style>