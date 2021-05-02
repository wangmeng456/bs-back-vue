<!--
 * @Author: wangmeng
 * @Description: 登录页
-->
<template>
  <div class="login">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
    >
      <h3 class="title">少儿编程教育平台</h3>
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          type="text"
          auto-complete="off"
          placeholder="账号"
        >
          <svg-icon
            slot="prefix"
            icon-class="user"
            class="el-input__icon input-icon"
          />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          auto-complete="off"
          placeholder="密码"
        >
          <svg-icon
            slot="prefix"
            icon-class="password"
            class="el-input__icon input-icon"
          />
        </el-input>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button
          :loading="loading"
          size="medium"
          type="primary"
          style="width: 100%"
          @click.native.prevent="handleLogin"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div class="el-login-footer">
      <!-- <span>Copyright © 2020-2021 bishe All Rights Reserved.</span> -->
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { getStore, setStore } from "@/utils/localStore";
import hex_md5 from "@/utils/md5.js";

// api
import { login } from "@/api/login";

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
        id: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "用户名不能为空" },
        ],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空" },
        ],
      },
      loading: false,
      redirect: undefined,
      tokenInfo: "",
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    /** 登录 */
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          login
            .login(this.loginForm.username, this.loginForm.password)
            .then((res) => {
              if (res.data.status == 0) {
                this.loginForm.id = res.data.data.aid;
                this.$message("登录成功")
                this.$router.push({ path: "/index/index" });
                setStore("user", JSON.stringify(this.loginForm)); // 信息存储到本地
                this.$store.commit("SET_NAME", this.loginForm.username);
                this.$store.commit("SET_PASS", this.loginForm.password);
                this.$store.commit("SET_ID", this.loginForm.id);
              } else {
                this.$message(res.data.data);
              }
            })
            .finally(() => {
              this.loading = false;
              this.resetForm("loginForm");
            });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-size: cover;
  background-image: url("../assets/image/login.png");
  .title {
    margin: 0px auto 30px auto;
    text-align: center;
    color: #707070;
  }

  .login-form {
    border-radius: 6px;
    background: #ffffff;
    width: 400px;
    padding: 25px 25px 5px 25px;
    .el-input {
      height: 38px;
      input {
        height: 38px;
      }
    }
    .input-icon {
      height: 39px;
      width: 14px;
      margin-left: 2px;
    }
  }
  .login-tip {
    font-size: 13px;
    text-align: center;
    color: #bfbfbf;
  }
  .login-code {
    width: 33%;
    height: 38px;
    float: right;
    img {
      cursor: pointer;
      vertical-align: middle;
    }
  }
  .register {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 18px;
    cursor: pointer;
    span {
      color: #1890ff;
    }
  }
  .el-login-footer {
    height: 40px;
    line-height: 40px;
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    color: #fff;
    font-family: Arial;
    font-size: 12px;
    letter-spacing: 1px;
  }
}
</style>