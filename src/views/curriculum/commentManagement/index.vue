<!--
 * @Author: wangmeng
 * @Description: 评论管理页面
-->
<template>
  <div class="comment">
    <div class="comment-header">
      <el-form :model="form">
        <el-form-item label="课程名称" label-width="70px">
          <el-input v-model="form.name" placeholder="请输入课程名称"></el-input>
        </el-form-item>
        <!-- <el-form-item label="课程目录" label-width="70px">
          <el-select v-model="form.type" placeholder="请选择课程目录">
            <el-option
              v-for="(item, index) in form.option"
              :key="index"
              :label="item.label"
              :value="item.data"
            ></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary"
            ><i class="el-icon-search"></i> 查询</el-button
          >
          <el-button><i class="el-icon-refresh"> 重置</i></el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="comment-container">
      <el-button type="primary" plain @click="addcomments"
        ><i class="el-icon-plus"></i> 新建课程</el-button
      >
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
        <el-table-column label="课程名称" prop="name" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="text" @click="formcomments(scope.row)">{{
              scope.row.name
            }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="课程目录"
          prop="type"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="上传时间"
          prop="time"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="text" @click="editcomments(scope.row)"
              >编辑</el-button
            >
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
  </div>
</template>

<script>
import Pagination from "@/components/Pagination/index.vue";
export default {
  name: "videoManagement",
  components: { Pagination },
  data() {
    return {
      form: {
        name: "",
        type: "",
      },
      tableData: [
        {
          name: "喜欢编程！",
          type: "初识编程",
          time: "2021-1-27 15:17:33",
          img: require("@/assets/mp4/shipin.mp4"),
        },
      ],
      total: 1,
      page: 1,
      limit: 10,
      pageSizes: [10, 20, 30, 50],
    };
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.comment {
  background: #fff;
  margin: 10px;
  padding: 20px;
  .comment-header {
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
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: 100%;
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
    .comment-avatar {
      width: 400px;
      height: 200px;
    }
    .comment-btn {
      margin-bottom: 10px;
    }
  }
}
</style>