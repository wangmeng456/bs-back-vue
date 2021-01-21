<template lang="pug">
.sand-table-map
  iframe(width="100%" height="100%" :src="iframeUrl")
</template>

<script>
import { businessCustomerSpaceManage } from "@/api/dictSpace/businessCustomerSpaceManage";
export default {
  name: "ReportCenterManage",
  data() {
    return {
      iframeUrl: ""
    };
  },
  created() {
    const me = this;
    let managerId = me.$store.getters.managerId;
    let paramObj = {"manaId" : managerId};
    businessCustomerSpaceManage.queryUserInfo(paramObj).then(res => {
      if(res.status === 200){
        console.log(res.data.data[0]);
        let obj = res.data.data[0];
        let userInfo = "";
        for(let val in obj){
          userInfo += "&" + val + "=" + obj[val];
        }
        console.log(userInfo);
        /**/
        let path = this.$route.path;
        let param = path.substring(path.lastIndexOf("/") + 1,path.length);
        if(isNaN(param.split("=")[1])){//老报表
          me.iframeUrl = "http://136.127.50.92:8080/jsp/util/complexSample.do?method=init&" + param + userInfo;
        }else{//经分报表
          me.iframeUrl = "http://136.127.50.92:8001/ODSMSPortlet/reportJump!queryData.action?paramSupport=1&" + param + userInfo;
        }
        
      }
    }).finally(() => {
      
    });
  }
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