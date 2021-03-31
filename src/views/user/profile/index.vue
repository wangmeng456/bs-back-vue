<!--
 * @Author: wangmeng
 * @Description: 个人中心页面
-->
<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6" :xs="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>个人信息</span>
          </div>
          <div>
            <div class="text-center">
              <userAvatar :user="user" />
            </div>
            <ul class="list-group list-group-striped">
              <li class="list-group-item">
                <svg-icon icon-class="user" /> 用户名称
                <div class="pull-right">{{ user.userName }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="email" /> 用户邮箱
                <div class="pull-right">{{ user.email }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="peoples" /> 所属角色
                <div class="pull-right">{{ user.roleGroup }}</div>
              </li>
              <li class="list-group-item">
                <svg-icon icon-class="date" /> 创建日期
                <div class="pull-right">{{ user.time }}</div>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
      <el-col :span="18" :xs="24">
        <el-card>
          <div slot="header" class="clearfix">
            <span>基本资料</span>
          </div>
          <el-tabs v-model="activeTab">
            <el-tab-pane label="基本资料" name="userinfo">
              <userInfo :user="user" />
            </el-tab-pane>
            <el-tab-pane label="修改密码" name="resetPwd">
              <resetPwd :user="user" />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import userAvatar from "./userAvatar";
import userInfo from "./userInfo";
import resetPwd from "./resetPwd";

export default {
  name: "Profile",
  components: { userAvatar, userInfo, resetPwd },
  data() {
    return {
      user: {
        userName: '王梦',
        email: '3197985967@qq.com',
        roleGroup: '管理员',
        time: '2021-1-26 15:02:42',
        nickName: '王梦',
        sex: 1
      },
      roleGroup: {},
      postGroup: {},
      activeTab: "userinfo",
    };
  },
  created() {
  },
  methods: {
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
.avatar-uploader-icon {
  font-size: 28px;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
</style>
