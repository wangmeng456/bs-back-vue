<template lang="pug">
//- 企业信息查询
.enterprise-info-query
  iframe(width="100%" height="100%" :src="pageUrl")
</template>

<script>
import Cookies from "js-cookie";

export default {
  name: "EnterpriseInfoQuery",
  computed: {
    // 页面 url
    pageUrl() {
      var param = "";
      if(sessionStorage.getItem("enterprise-search-param")){
        param = JSON.parse(sessionStorage.getItem("enterprise-search-param"));
        sessionStorage.setItem("enterprise-search-param","");
      }
      let url = this.getIpAddress("custTree") + "/custTree/enterprise-search-index";
      const latnId = this.$store.getters.latnId;
      const phoneNumber = this.$store.getters.phoneNumber;
      const token = Cookies.get("Admin-Token");
      if(param){
        return `${url}?latnId=${latnId}&phone=${phoneNumber}&token=${token}&searchTxt=${param.searchTxt}&classIndex=${param.classIndex}`;
      }else{
        return `${url}?latnId=${latnId}&phone=${phoneNumber}&token=${token}`;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.enterprise-info-query {
  height: calc(100vh - 84px);
}
</style>