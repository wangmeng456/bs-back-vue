<template lang="pug">
//- 区域任务派单
.area-task-send
  iframe(width="100%" height="100%" :src="getIpAddress('custInfo') + '/custInfo/workbench/areaTaskSend'")
</template>

<script>
export default {
  name: "AreaTaskSend"
};
</script>

<style lang="scss" scoped>
.area-task-send {
  height: calc(100vh - 84px);
}
</style>