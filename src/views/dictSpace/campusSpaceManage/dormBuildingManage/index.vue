<template lang="pug">
//- 宿舍楼宇管理
.dorm-building-manage
  //- iframe(width="100%" height="100%" :src="getIpAddress('custInfo') + '/custInfo/marketingSupport/tenderView'")
  iframe(width="100%" height="100%" src="http://136.127.50.92:8001/ODSMSPortlet/dormManager!initBuildOnePoint.action?manaId=2100000001")
</template>

<script>
export default {
  name: "DormBuildingManage"
};
</script>

<style lang="scss" scoped>
.dorm-building-manage {
  height: calc(100vh - 84px);
}
</style>