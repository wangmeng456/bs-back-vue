<template lang="pug">
//- 学子公司管理
.student-company-manage
  //- iframe(width="100%" height="100%" :src="getIpAddress('custInfo') + '/custInfo/marketingSupport/tenderView'")
  iframe(width="100%" height="100%" src="http://136.127.50.92:8001/ODSMSPortlet/dormManager!initXzgsOnePoint.action?manaId=2100000001")
</template>

<script>
export default {
  name: "StudentCompanyManage"
};
</script>

<style lang="scss" scoped>
.student-company-manage {
  height: calc(100vh - 84px);
}
</style>