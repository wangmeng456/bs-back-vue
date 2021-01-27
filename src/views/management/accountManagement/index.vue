<!-- 用户管理 -->
<!--
 * @Author: wangmeng
 * @Date: 2021-01-26 18:03:06
 * @LastEditTime: 2021-01-27 11:15:28
 * @LastEditors: wangmeng
 * @Description: 用户管理页面
 * @FilePath: https://github.com/wangmeng456/bs-back-vue/tree/master/src/views/management/accountManagement.vue
-->
<template>
  <div class="account">
    <div class="account-header">
      <el-form :model="form">
        <el-form-item label="用户ID" label-width="60px">
          <el-input v-model="form.id" placeholder="请输入用户ID"></el-input>
        </el-form-item>
        <el-form-item label="用户名称" label-width="70px">
          <el-input v-model="form.name" placeholder="请输入用户名称"></el-input>
        </el-form-item>
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
        <el-form-item>
          <el-button type="primary"
            ><i class="el-icon-search"></i> 查询</el-button
          >
          <el-button><i class="el-icon-refresh"> 重置</i></el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="account-container">
      <el-button type="danger" plain :disabled="multiple"
        ><i class="el-icon-delete"></i> 批量删除</el-button
      >
      <el-table
        :data="tableData"
        max-height="500"
        style="max-height: 500px; min-height: 200px; width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="用户ID" prop="id" show-overflow-tooltip></el-table-column>
        <el-table-column label="用户名称" prop="name" show-overflow-tooltip></el-table-column>
        <el-table-column label="用户昵称" prop="nick" show-overflow-tooltip></el-table-column>
        <el-table-column label="邮箱" prop="email" show-overflow-tooltip></el-table-column>
        <el-table-column label="用户状态" prop="status"></el-table-column>
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
        <el-form-item label="用户名称" label-width="70px">
          <el-input
            v-model="editAccount.name"
            placeholder="请输入用户名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" label-width="70px">
          <el-input
            v-model="editAccount.nick"
            placeholder="请输入用户昵称"
          ></el-input>
        </el-form-item>
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
export default {
  name: "accountManagement",
  components: { Pagination },
  data() {
    return {
      form: {
        id: "",
        name: "",
        region: "",
        option: [
          { label: "用户", data: "customer" },
          { label: "管理员", data: "admin" },
        ],
      },
      tableData: [
        {
          id: "xxxxx",
          name: "XXX",
          nick: "xxxx",
          email: "xxxxx",
          status: "用户",
        },
      ],
      activeData: [], // 盛放选中的用户
      multiple: true, // 删除按钮状态
      total: 10,
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
  created() {},
  methods: {
    handleSelectionChange(val) {
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