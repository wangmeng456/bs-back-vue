<template lang="pug">
//- 学校信息管理
.school-info-manage
  //- iframe(width="100%" height="100%" :src="getIpAddress('custInfo') + '/custInfo/marketingSupport/tenderView'")
  iframe(width="100%" height="100%" src="http://136.127.50.92:8001/ODSMSPortlet/dormManager!initSchoolOnePoint.action?manaId=2100000001")
</template>

<script>
export default {
  name: "SchoolInfoManage"
};
</script>

<style lang="scss" scoped>
.school-info-manage {
  height: calc(100vh - 84px);
}
</style>