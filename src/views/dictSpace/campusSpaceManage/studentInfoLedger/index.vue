<template lang="pug">
//- 学生信息台账
.student-info-ledger
  //- iframe(width="100%" height="100%" :src="getIpAddress('custInfo') + '/custInfo/marketingSupport/tenderView'")
  iframe(width="100%" height="100%" src="http://136.127.50.92:8001/eosgi-report/report_view!viewReport.action?1=1&staffCode=css_admin&org4Name=--&org4Id=-1&jobId=1000&userCode=css_admin&sysOrgTypeId=1&sysOrgId=8&userOrgnTypeId=1&reportId=100003542&userOrgnId=8&org3Name=--&latnId=8&org5Name=--&userRoleId=1000&org5Id=-1&userLatnId=8&positionId=2100000001&paramSupport=1&userManaId=2100000001&org3Id=-1&sysMenuId=2251")
</template>

<script>
export default {
  name: "StudentInfoLedger"
};
</script>

<style lang="scss" scoped>
.student-info-ledger {
  height: calc(100vh - 84px);
}
</style>