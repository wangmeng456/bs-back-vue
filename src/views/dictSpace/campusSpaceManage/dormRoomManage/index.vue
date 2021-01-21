<template lang="pug">
//- 宿舍房间管理
.dorm-room-manage
  //- iframe(width="100%" height="100%" :src="getIpAddress('custInfo') + '/custInfo/marketingSupport/tenderView'")
  iframe(width="100%" height="100%" src="http://136.127.50.92:8001/ODSMSPortlet/dormManager!initRoomOnePoint.action?manaId=2100000001")
</template>

<script>
export default {
  name: "DormRoomManage"
};
</script>

<style lang="scss" scoped>
.dorm-room-manage {
  height: calc(100vh - 84px);
}
</style>