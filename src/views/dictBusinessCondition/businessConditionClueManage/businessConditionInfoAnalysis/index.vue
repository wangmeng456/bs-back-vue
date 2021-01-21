<template lang="pug">
//- 商情分析
.business-condition-info-analysis
  iframe(width="100%" height="100%" :src="getIpAddress('custBusiness') + '/custBusiness/userCenter/businessAnalysis/Index'")
</template>

<script>
export default {
  name: "BusinessConditionInfoAnalysis"
};
</script>

<style lang="scss" scoped>
.business-condition-info-analysis {
  height: calc(100vh - 84px);
}
</style>