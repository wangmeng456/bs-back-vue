<template lang="pug">
//- 已派任务单
.send-task-list
  iframe(width="100%" height="100%" :src="getIpAddress('custInfo') + '/custInfo/workbench/sendTaskList'")
</template>

<script>
export default {
  name: "SendTaskList"
};
</script>

<style lang="scss" scoped>
.send-task-list {
  height: calc(100vh - 84px);
}
</style>