<!--
 * @Author: wangmeng
 * @Date: 2021-01-26 18:03:06
 * @LastEditTime: 2021-01-27 11:15:28
 * @LastEditors: wangmeng
 * @Description: 角色管理页面
 * @FilePath: https://github.com/wangmeng456/bs-back-vue/tree/master/src/views/management/roleManagement.vue
-->
<template>
  <div class="role">
     <el-table
        :data="tableData"
        max-height="500"
        style="width: 100%"
      >
        <el-table-column label="角色编号" type="index" width="100"></el-table-column>
        <el-table-column label="角色名称" prop="name" show-overflow-tooltip></el-table-column>
        <el-table-column label="权限字符" prop="id" show-overflow-tooltip></el-table-column>
        <el-table-column label="创建时间" prop="time" width="160"></el-table-column>
      </el-table>
  </div>
</template>

<script>
export default {
  name: "roleManagement",
  data() {
    return {
        tableData: [
            { name: '管理员', id: 'admin', time: '2020-11-20 19:29:43' },
            { name: '用户', id: 'customer', time: '2020-11-20 19:29:43' },
        ]
    };
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.role {
  background: #fff;
  margin: 10px;
  padding: 20px;
  .el-table {
      margin: 20px 0 0 0;
  }
}
</style>