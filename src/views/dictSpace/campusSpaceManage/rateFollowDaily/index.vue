<template lang="pug">
//- 进度跟踪日报
.rate-follow-daily
  //- iframe(width="100%" height="100%" :src="getIpAddress('custInfo') + '/custInfo/marketingSupport/tenderView'")
  iframe(width="100%" height="100%" src="http://136.127.50.92:8080/jsp/util/complexSample.do?method=init&reportId=TD_XYM_BLDG_SCAN_D&sysMenuId=2247&mobileNum=&userRoleId=1000&userLatnId=8&userCode=css_admin&userManaId=2100000001&userOrgnId=8&userOrgnTypeId=1&jobId=1000&latnId=8&staffCode=css_admin&positionId=2100000001&sysOrgId=8&sysOrgTypeId=1&org3Id=-1&org3Name=--&org4Id=-1&org4Name=--&org5Id=-1&org5Name=--")
</template>

<script>
export default {
  name: "RateFollowDaily"
};
</script>

<style lang="scss" scoped>
.rate-follow-daily {
  height: calc(100vh - 84px);
}
</style>