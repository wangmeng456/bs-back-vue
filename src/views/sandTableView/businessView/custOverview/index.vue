<template lang="pug">
//- 客户总览
.customer-overview
  iframe(width="100%" height="100%" :src="getIpAddress('custInfo') + '/custInfo/marketingSupport/customerOverview'")
</template>

<script>
export default {
  name: "CustOverview"
};
</script>

<style lang="scss" scoped>
.customer-overview {
  height: calc(100vh - 84px);
}
</style>