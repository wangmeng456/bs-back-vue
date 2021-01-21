<template lang="pug">
//- 客户树
.cust-tree
  iframe(width="100%" height="100%" :src="pageUrl")
</template>

<script>
import Cookies from "js-cookie";

export default {
  name: "CustTree",
  computed: {
    // 页面 url
    pageUrl() {
      let url = this.getIpAddress("custTree") + "/custTree/enterprise-client";
      const latnId = this.$store.getters.latnId;
      const phoneNumber = this.$store.getters.phoneNumber;
      const token = Cookies.get("Admin-Token");
      return `${url}?latnId=${latnId}&phone=${phoneNumber}&token=${token}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.cust-tree {
  height: calc(100vh - 84px);
}
</style>