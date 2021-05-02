<!--
 * @Author: wangmeng
 * @Description: 图形化练习页面
-->
<template>
  <div class="comment">
    <div class="comment-container">
      <el-button type="primary" plain @click="addSubjects"
        ><i class="el-icon-plus"></i> 新建练习</el-button
      >
      <el-table
        :data="tableData"
        max-height="500"
        style="max-height: 500px; min-height: 200px; width: 100%"
      >
        <el-table-column
          label="问题"
          prop="programtitle"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="答案"
          prop="programanswer"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="text" @click="editcomments(scope.row)"
              >编辑</el-button
            >
            <el-button type="text" @click="deleteCourse(scope.row.programid)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增课程 弹框 -->
    <el-dialog :visible.sync="addDialogVisible">
      <el-form :model="addSubject">
        <el-form-item label="问题" label-width="70px">
          <el-input v-model="addSubject.programtitle"></el-input>
        </el-form-item>
        <el-form-item label="答案" label-width="70px">
          <el-input
            type="textarea"
            :rows="4"
            v-model="addSubject.programanswer"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancalAdd">取 消</el-button>
        <el-button type="primary" @click="submitAdd">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑课程 弹框 -->
    <el-dialog :visible.sync="editDialogVisible">
      <el-form :model="editSubject">
        <el-form-item label="问题" label-width="70px">
          <el-input v-model="editSubject.programtitle"></el-input>
        </el-form-item>
        <el-form-item label="答案" label-width="70px">
          <el-input
            type="textarea"
            :rows="4"
            v-model="editSubject.programanswer"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancalEdit">取 消</el-button>
        <el-button type="primary" @click="submitEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination/index.vue";
import { curriculum } from "@/api/curriculum";

export default {
  name: "codeManagement",
  components: { Pagination },
  data() {
    return {
      form: {
        name: "",
      },
      tableData: [],
      multiple: true,
      total: 1,
      page: 1,
      limit: 10,
      pageSizes: [10, 20, 30, 50],
      activeData: [], // 盛放选中的题目
      addDialogVisible: false,
      addSubject: {
        programtitle: "",
        programanswer: "",
      },
      editDialogVisible: false,
      editSubject: {
        programid: undefined,
        programtitle: "",
        programanswer: "",
      },
      option: [
        { label: "6岁以下", data: "6岁以下" },
        { label: "6-9岁", data: "6-9岁" },
        { label: "9-12岁", data: "9-12岁" },
        { label: "12岁以上", data: "12岁以上" },
      ],
    };
  },
  created() {
    this.getProgram();
  },
  methods: {
    // 获取课程
    getProgram() {
      curriculum.getProgram().then((res) => {
        if (res.data.status === "0") {
          this.tableData = res.data.data;
        }
      });
    },
    // 删除课程
    deleteCourse(data) {
      curriculum.delProgram(data).then((res) => {
        if(res.data.data == 'success') {
          this.$message('删除成功');
          this.getProgram();
        }
      })
    },
    // 编辑课程
    editcomments(data) {
      this.editDialogVisible = true;
      this.editSubject.programid = data.programid;
      this.editSubject.programtitle = data.programtitle;
      this.editSubject.programanswer = data.programanswer;
    },
    // 取消编辑
    cancalEdit() {
      this.editDialogVisible = false;
      this.editSubject.programid = "";
      this.editSubject.programtitle = "";
      this.editSubject.programanswer = "";
    },
    // 编辑成功
    submitEdit() {
      this.editDialogVisible = false;
      curriculum.updateProgram(this.editSubject)
      .then((res) => {
        if(res.data.status == '0') {
          this.$message('编辑成功')
          this.getProgram();
        }
      })
    },
    // 新建课程
    addSubjects() {
      this.addDialogVisible = true;
    },
    // 取消新增
    cancalAdd() {
      this.addDialogVisible = false;
      this.addSubject.programtitle = "";
      this.addSubject.programanswer = "";
    },
    // 新增成功
    submitAdd() {
      this.addDialogVisible = false;
      curriculum.addProgram(this.addSubject)
      .then((res) => {
        if(res.data.status == '0') {
          this.$message('新增课程成功')
          this.getProgram();
        }
      })
    },
  },
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
  .course-img {
    width: 60px;
    height: 40px;
  }
  .el-table {
    margin-top: 10px;
  }
  .upload-img {
    img{
      width: 100px;
    }
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