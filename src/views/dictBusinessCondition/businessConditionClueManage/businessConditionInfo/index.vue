<template lang="pug">
//- 商情信息
.business-condition-info
  iframe(width="100%" height="100%" :src="getIpAddress('custBusiness') + '/custBusiness/userCenter/businessInformation/Index'")
</template>

<script>
export default {
  name: "BusinessConditionInfo"
};
</script>

<style lang="scss" scoped>
.business-condition-info {
  height: calc(100vh - 84px);
}
</style>