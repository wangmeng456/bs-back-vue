<template lang="pug">
//- 沙盘地图
.sand-table-map
  iframe(width="100%" height="100%" src="http://136.96.134.48:8007/gisSandbox/module/thematic_ge_ln/thematic.html")
</template>

<script>
export default {
  name: "SandTableMap"
};
</script>

<style lang="scss" scoped>
.sand-table-map {
  height: calc(100vh - 84px);
  overflow-y: auto;
  .demo-img {
    display: block;
    margin: 0 auto;
  }
}
</style>