<template lang="pug">
//- 楼宇管理
.building-manage
  //- iframe(width="100%" height="100%" :src="getIpAddress('custInfo') + '/custInfo/marketingSupport/tenderView'")
</template>

<script>
export default {
  name: "BuildingManage"
};
</script>

<style lang="scss" scoped>
.building-manage {
  height: calc(100vh - 84px);
}
</style>