<template>
  <el-form ref="form" :model="user" :rules="rules" label-width="100px">
    <el-row :gutter="20">
      <el-col :span="12" :xs="24">
        <el-form-item label="用户昵称" prop="nickName">
          <el-input v-model="user.nickName" />
        </el-form-item>
      </el-col>
      <el-col :span="12" :xs="24">
        <el-form-item label="姓名" prop="test1">
          <el-input v-model="user.test1" disabled />
        </el-form-item>
      </el-col>
      <el-col :span="12" :xs="24">
        <el-form-item label="性别">
          <el-radio-group v-model="user.sex">
            <el-radio label="0">男</el-radio>
            <el-radio label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="12" :xs="24">
        <el-form-item label="证件号码" prop="test2">
          <el-input v-model="user.test2" maxlength="18" disabled />
        </el-form-item>
      </el-col>
      <el-col :span="12" :xs="24">
        <el-form-item label="账号名称" prop="test3">
          <el-input v-model="user.test3" disabled />
        </el-form-item>
      </el-col>
      <el-col :span="12" :xs="24">
        <el-form-item label="账号状态" prop="test4">
          <el-input v-model="user.test4" disabled />
        </el-form-item>
      </el-col>
      <el-col :span="12" :xs="24">
        <el-form-item label="账号类型" prop="test5">
          <el-input v-model="user.test5" disabled />
        </el-form-item>
      </el-col>
      <el-col :span="12" :xs="24">
        <el-form-item label="账号权限" prop="test6">
          <el-input v-model="user.test6" disabled />
        </el-form-item>
      </el-col>
      <el-col :span="12" :xs="24">
        <el-form-item label="账号密码" prop="test7">
          <el-input v-model="user.test7" disabled />
        </el-form-item>
      </el-col>
      <el-col :span="12" :xs="24">
        <el-form-item label="办公邮箱" prop="email">
          <el-input v-model="user.email" maxlength="50" disabled />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item>
      <el-button type="primary" size="mini" @click="submit">保存</el-button>
      <!-- <el-button type="danger" size="mini" @click="close">关闭</el-button> -->
    </el-form-item>
  </el-form>
</template>

<script>
import { updateUserProfile } from "@/api/system/user";

export default {
  props: {
    user: {
      type: Object
    }
  },
  data() {
    return {
      // 表单校验
      rules: {
        nickName: [
          { required: true, message: "用户昵称不能为空", trigger: "blur" }
        ],
        email: [
          { required: true, message: "邮箱地址不能为空", trigger: "blur" },
          {
            type: "email",
            message: "'请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        phonenumber: [
          { required: true, message: "手机号码不能为空", trigger: "blur" },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.msgSuccess("修改成功");
          // updateUserProfile(this.user).then(response => {
          //   if (response.code === 200) {
          //     this.msgSuccess("修改成功");
          //   } else {
          //     this.msgError(response.msg);
          //   }
          // });
        }
      });
    },
    close() {
      this.$store.dispatch("tagsView/delView", this.$route);
      this.$router.push({ path: "/index" });
    }
  }
};
</script>
