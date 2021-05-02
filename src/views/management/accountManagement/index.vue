<!--
 * @Author: wangmeng
 * @Description: 用户管理页面
-->
<template>
  <div class="account">
    <div class="account-header">
      <el-form :model="form">
        <!-- <el-form-item label="用户ID" label-width="60px">
          <el-input v-model="form.id" placeholder="请输入用户ID"></el-input>
        </el-form-item>
        <el-form-item label="用户名称" label-width="70px">
          <el-input v-model="form.name" placeholder="请输入用户名称"></el-input>
        </el-form-item> -->
        <el-form-item label="用户状态" label-width="70px">
          <el-select v-model="form.region" placeholder="请选择用户状态">
            <el-option
              v-for="(item, index) in form.option"
              :key="index"
              :label="item.label"
              :value="item.data"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item>
          <el-button type="primary" @click="handleSearch"
            ><i class="el-icon-search"></i> 查询</el-button
          >
          <el-button @click="handleReset"><i class="el-icon-refresh"> 重置</i></el-button>
        </el-form-item> -->
      </el-form>
    </div>
    <div class="account-container">
      <!-- <el-button type="danger" plain :disabled="multiple"
        ><i class="el-icon-delete"></i> 批量删除</el-button
      > -->
      <el-table
        :data="tableDatas"
        max-height="500"
        style="max-height: 500px; min-height: 200px; width: 100%"
        @selection-change="handleSelectionChanges"
        v-loading = "loading"
        v-if="form.region == '用户' || form.region == 'customer'"
      >
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <el-table-column
          label="用户ID"
          prop="stuid"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="用户昵称"
          prop="stuname"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="用户头像"
          prop="stuimage"
          show-overflow-tooltip
        >
          <template slot-scope = 'scope'>
            <img :src="'http://www.melonseeds.top:8081/images/' + scope.stuimage" alt="暂无图片" />
          </template>
        </el-table-column>
        <el-table-column
          label="邮箱"
          prop="stuemail"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="性别"
          prop="stusex"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="年龄"
          prop="stuage"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="简介"
          prop="stuabout"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="用户状态">用户</el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <!-- <el-button type="text" @click="editData(scope.row)">编辑</el-button> -->
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table
        :data="tableData"
        max-height="500"
        style="max-height: 500px; min-height: 200px; width: 100%"
        @selection-change="handleSelectionChange"
        v-loading = "loading"
        v-if="form.region === '管理员' || form.region == 'admin'"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          label="用户ID"
          prop="aid"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="用户昵称"
          prop="aname"
          show-overflow-tooltip
        ></el-table-column>
        <!-- <el-table-column label="用户昵称" prop="nick" show-overflow-tooltip></el-table-column> -->
        <el-table-column
          label="用户密码"
          prop="apwd"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="用户状态">管理员</el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="text" @click="editData(scope.row)">编辑</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <Pagination
        v-show="tableData.length > 0"
        :total="total"
        :page="page"
        :limit="limit"
        :pageSizes="pageSizes"
      />
    </div>
    <!-- 用户信息编辑 弹框 -->
    <el-dialog title="编辑用户信息" :visible.sync="dialogFormVisible">
      <el-form :model="editAccount">
        <el-form-item label="用户ID" label-width="70px">
          <el-input
            v-model="editAccount.id"
            placeholder="请输入用户ID"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" label-width="70px">
          <el-input
            v-model="editAccount.name"
            placeholder="请输入用户昵称"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item label="用户昵称" label-width="70px">
          <el-input
            v-model="editAccount.nick"
            placeholder="请输入用户昵称"
          ></el-input>
        </el-form-item> -->
        <el-form-item label="邮箱" label-width="70px">
          <el-input
            v-model="editAccount.email"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户状态" label-width="70px">
          <el-select v-model="editAccount.status" placeholder="请选择用户状态">
            <el-option
              v-for="(item, index) in editAccount.option"
              :key="index"
              :label="item.label"
              :value="item.data"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination/index.vue";

import { user } from "@/api/user";

export default {
  name: "accountManagement",
  components: { Pagination },
  data() {
    return {
      status: 0,
      form: {
        id: "",
        name: "",
        region: "用户",
        option: [
          { label: "用户", data: "customer" },
          { label: "管理员", data: "admin" },
        ],
      },
      tableData: [],
      tableDatas: [],
      loading: false,
      activeData: [], // 盛放选中的用户
      multiple: true, // 删除按钮状态
      total: 1,
      page: 1,
      limit: 10,
      pageSizes: [10, 20, 30, 50],
      dialogFormVisible: false,
      editAccount: {
        id: "",
        name: "",
        nick: "",
        email: "",
        status: "",
        option: [
          { label: "用户", data: "customer" },
          { label: "管理员", data: "admin" },
        ],
      },
    };
  },
  created() {
    this.handleUser();
    this.handleAdmin();
  },
  methods: {
    // 查询用户信息
    handleUser() {
      this.loading = true;
      user
        .users()
        .then((res) => {
          if(res.data.status === '0') {
            this.tableDatas = res.data.data;
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // 查询用户信息
    handleAdmin() {
      this.loading = true;
      user
        .admin()
        .then((res) => {
          if(res.data.status === '0') {
            this.tableData = res.data.data;
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // 查询
    handleSearch() {
      
    },

    handleReset() {
      this.form.id = '';
      this.form.name = ''
    },
    handleSelectionChange(val) {
      this.activeData = val;
      // 判断多选框是否选中，不选中删除按钮禁用
      if (this.activeData.length !== 0) {
        this.multiple = false;
      } else {
        this.multiple = true;
      }
    },
    handleSelectionChanges(val) {
      this.activeData = val;
      // 判断多选框是否选中，不选中删除按钮禁用
      if (this.activeData.length !== 0) {
        this.multiple = false;
      } else {
        this.multiple = true;
      }
    },
    // 编辑用户信息
    editData(data) {
      this.dialogFormVisible = true;
      this.editAccount.id = data.id;
      this.editAccount.name = data.name;
      this.editAccount.nick = data.nick;
      this.editAccount.email = data.email;
      this.editAccount.status = data.status;
    },
  },
};
</script>

<style lang="scss" scoped>
.account {
  background: #fff;
  margin: 10px;
  padding: 20px;
  .account-header {
    margin: 20px 0 10px 0;
    .el-form {
      display: flex;
      justify-content: space-between;
    }
  }
  .el-table {
    margin-top: 10px;
  }
  .el-dialog {
    .el-select {
      width: 100%;
    }
  }
}
</style>