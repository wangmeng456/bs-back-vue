<template>
  <div class="wscn-http404-container">
  </div>
</template>

<script>

import Cookies from "js-cookie";
import { getStore } from "@/utils/localStore";
import { setToken } from "@/utils/auth";
export default {
  name: 'rsa',
  create(){
      getCookie();
  },
  created() {
    this.getCookie();
  },
  methods: {
    getCookie() {
      const token=Cookies.get("token");
    //   console.log(token);
      this.tokenInfo = token;
      this.saveTokenInfo();
            this.$router.push({
              name: "ChooseAuth",
              query: this.$route.query
            });
    },
    /**
     * 保存 token 信息
     */
    saveTokenInfo() {
      setToken(this.tokenInfo);
      this.$store.commit("SET_TOKEN", this.tokenInfo);
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
