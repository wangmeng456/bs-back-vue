<template lang="pug">
//- CPCP营销派单
.cpcp-send
  //- iframe(width="100%" height="100%" :src="getIpAddress('custInfo') + '/custInfo/marketingSupport/tenderView'")
  iframe(width="100%" height="100%" src="http://136.127.50.92:8001/ODSMSPortlet/ln/taskGridAct!taskIndexQueryOnePoint.action?manaId=2100000001&tdsourcetag=s_pctim_aiomsg")
</template>

<script>
export default {
  name: "CpcpSend"
};
</script>

<style lang="scss" scoped>
.cpcp-send {
  height: calc(100vh - 84px);
}
</style>