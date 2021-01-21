<template lang="pug">
//- 客户树
.cust-tree
  iframe(width="100%" height="100%" :src="getIpAddress('custTree') + '/custTree/enterprise-client'")
</template>

<script>
export default {
  name: "CustTree"
};
</script>

<style lang="scss" scoped>
.cust-tree {
  height: calc(100vh - 84px);
}
</style>