<template lang="pug">
//- 楼长信息管理
.housemaster-info-manage
  //- iframe(width="100%" height="100%" :src="getIpAddress('custInfo') + '/custInfo/marketingSupport/tenderView'")
  iframe(width="100%" height="100%" src="http://136.127.50.92:8001/ODSMSPortlet/dormManager!initXzlzOnePoint.action?manaId=2100000001")
</template>

<script>
export default {
  name: "HousemasterInfoManage"
};
</script>

<style lang="scss" scoped>
.housemaster-info-manage {
  height: calc(100vh - 84px);
}
</style>