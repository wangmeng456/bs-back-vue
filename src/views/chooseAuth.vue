<template>
  <!-- 选择用户身份弹窗页面，因为用户信息是登录之后再在路由中获取的，所以需要新增一个页面以便 localStore 中有用户信息的字段 __userInfo__ -->
  <div class="login">
    <!-- 新增一个选择身份的弹窗 -->
    <el-dialog title="请选择身份" :visible.sync="dialogSwitch" width="500px" center>
      <!-- 单选列表 -->
      <el-radio-group v-model="dialogValue">
        <el-radio
          v-for="(item,index) in dialogSwitchList"
          :label="item.managerId"
          :key="item.managerId"
        >{{ `${item.managerDesc} - ${item.areaName}` }}</el-radio>
      </el-radio-group>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitDialogData('')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getStore, setStore } from "@/utils/localStore";

export default {
  name: "ChooseAuth",
  data() {
    return {
      // 新增一个选择身份的弹窗
      dialogSwitch: true,
      dialogValue: ""
    };
  },
  computed: {
    dialogSwitchList() {
      const userInfo = JSON.parse(getStore("__userInfo__"));
      return userInfo && userInfo.managerList;
    }
  },
  created() {
    const me = this;
    // 默认选中第一个选项
    const userInfo = JSON.parse(getStore("__userInfo__"));
    me.dialogValue = userInfo ? userInfo.managerList[0].managerId : "";
    me.dialogValue && me.submitDialogData(me.dialogValue);
  },
  methods: {
    /**
     * 提交 选择身份的弹窗 数据
     */
    submitDialogData(dialogValue) {
      if (this.dialogValue === "") {
        this.msgInfo("请选择身份");
      } else {
        // 更新用户信息
        let userInfo = JSON.parse(getStore("__userInfo__"));
        this.$store.commit("SET_PHONENUMBER", userInfo.phonenumber);
        for (let index = 0; index < userInfo.managerList.length; index++) {
          const element = userInfo.managerList[index];
          if (element.managerId === this.dialogValue) {
            userInfo.currentManagerTm = element;
            userInfo.currentManagerTm.latnId = element.mlatnId;
            setStore("__userInfo__", JSON.stringify(userInfo));
            break;
          }
        }
        // 储存到 store 里面
        const currentManagerTm = userInfo.currentManagerTm;
        if (currentManagerTm) {
          const { managerId, latnId, areaId } = currentManagerTm;
          this.$store.commit("SET_MANAGERID", managerId);
          this.$store.commit("SET_LATNID", latnId);
          this.$store.commit("SET_AREAID", areaId);
        }

        !dialogValue &&
          this.$router.push({ path: this.$route.query.redirect || "/" });
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../assets/image/login-background.jpg");
  background-size: cover;
}
.el-radio {
  display: block;
  padding: 10px 0;
}
</style>
