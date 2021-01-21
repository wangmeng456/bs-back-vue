<template lang="pug">
//- 企业清单派单
.enterprise-list-send
  iframe(width="100%" height="100%" :src="getIpAddress('custInfo') + '/custInfo/workbench/blueOceanDistribute'")
</template>

<script>
export default {
  name: "EnterpriseListSend"
};
</script>

<style lang="scss" scoped>
.enterprise-list-send {
  height: calc(100vh - 84px);
}
</style>