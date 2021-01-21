<template lang="pug">
//- 校区信息管理
.campus-info-manage
  //- iframe(width="100%" height="100%" :src="getIpAddress('custInfo') + '/custInfo/marketingSupport/tenderView'")
  iframe(width="100%" height="100%" src="http://136.127.50.92:8001/ODSMSPortlet/dormManager!initCmpsOnePoint.action?manaId=2100000001")
</template>

<script>
export default {
  name: "CampusInfoManage"
};
</script>

<style lang="scss" scoped>
.campus-info-manage {
  height: calc(100vh - 84px);
}
</style>