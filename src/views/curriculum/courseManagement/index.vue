<!--
 * @Author: wangmeng
 * @Description: 课程管理页面
-->
<template>
  <div class="comment">
    <div class="comment-header">
      <el-form :model="form">
        <el-form-item label="课程" label-width="70px">
          <el-input
            v-model="form.name"
            placeholder="请输入关键字查询"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch"
            ><i class="el-icon-search"></i> 查询</el-button
          >
          <el-button @click="handleReset"
            ><i class="el-icon-refresh"> 重置</i></el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="comment-container">
      <el-button type="primary" plain @click="addSubjects"
        ><i class="el-icon-plus"></i> 新建课程</el-button
      >
      <!-- <el-button type="danger" plain :disabled="multiple"
        ><i class="el-icon-delete"></i> 批量删除</el-button
      > -->
      <el-table
        :data="tableData"
        max-height="500"
        style="max-height: 500px; min-height: 200px; width: 100%"
        @selection-change="handleSelectionChange"
      >
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <el-table-column
          label="课程名称"
          prop="coursetitle"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="课程封面"
          prop="coursecover"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <img
              class="course-img"
              :src="
                'http://www.melonseeds.top:8081/images/' + scope.row.coursecover
              "
            />
          </template>
        </el-table-column>
        <el-table-column
          label="课程简介"
          prop="courseabout"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="适合年龄"
          prop="courseage"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="上传时间"
          prop="coursedate"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="text" @click="editcomments(scope.row)"
              >编辑</el-button
            >
            <el-button type="text" @click="deleteCourse(scope.row.courseid)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <Pagination
        v-show="tableData.length > 0"
        :total="total"
        :page="page"
        :limit="limit"
        :pageSizes="pageSizes"
      /> -->
    </div>
    <!-- 新增课程 弹框 -->
    <el-dialog :visible.sync="addDialogVisible">
      <el-form :model="addSubject">
        <el-form-item label="课程名称" label-width="70px">
          <el-input v-model="addSubject.coursetitle"></el-input>
        </el-form-item>
        <el-form-item label="课程封面" label-width="70px">
          <div class="upload-img">
            <el-upload
              class="avatar-uploader"
              action="#"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="addSubject.coursecover"
                :src="
                  'http://www.melonseeds.top:8081/images/' +
                  addSubject.coursecover
                "
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <br />
            <span>(头像文件格式：png、jpg 最佳像素：100x100；最大：2MB)</span>
          </div>
        </el-form-item>
        <el-form-item label="课程简介" label-width="70px">
          <el-input
            type="textarea"
            :rows="4"
            v-model="addSubject.courseabout"
          ></el-input>
        </el-form-item>
        <el-form-item label="适合年龄" label-width="70px">
          <el-select
            v-model="addSubject.courseage"
            placeholder="请选择课程适合年龄"
          >
            <el-option
              v-for="(item, index) in option"
              :key="index"
              :label="item.label"
              :value="item.data"
            ></el-option>
          </el-select>
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
        <el-form-item label="课程名称" label-width="70px">
          <el-input v-model="editSubject.coursetitle"></el-input>
        </el-form-item>
        <el-form-item label="课程封面" label-width="70px">
          <div class="upload-img">
            <el-upload
              class="avatar-uploader"
              action="#"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="editSubject.coursecover"
                :src="
                  'http://www.melonseeds.top:8081/images/' +
                  editSubject.coursecover
                "
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <br />
            <span>(头像文件格式：png、jpg 最佳像素：100x100；最大：2MB)</span>
          </div>
        </el-form-item>
        <el-form-item label="课程简介" label-width="70px">
          <el-input
            type="textarea"
            :rows="4"
            v-model="editSubject.courseabout"
          ></el-input>
        </el-form-item>
        <el-form-item label="适合年龄" label-width="70px">
          <el-select
            v-model="editSubject.courseage"
            placeholder="请选择课程适合年龄"
          >
            <el-option
              v-for="(item, index) in option"
              :key="index"
              :label="item.label"
              :value="item.data"
            ></el-option>
          </el-select>
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
  name: "courseManagement",
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
        coursetitle: "",
        courseabout: "",
        courseage: "",
        coursecover: ""
      },
      editDialogVisible: false,
      editSubject: {
        coursetitle: "",
        coursecover: "",
        courseabout: "",
        courseage: "",
        courseid: undefined,
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
    this.courseage();
  },
  methods: {
    // 获取课程
    courseage() {
      curriculum.courseage().then((res) => {
        if (res.data.status === "0") {
          this.tableData = res.data.data;
        }
      });
    },
    // 查询课程
    handleSearch() {
      curriculum.searchCourse(this.form.name).then((res) => {
        console.log(this.tableData);
        if (res.data.status === "0") {
          this.tableData = res.data.data;
        }
      });
    },
    // 删除课程
    deleteCourse(data) {
      curriculum.deleteCourse(data).then((res) => {
        if(res.data.data == 'success') {
          this.$message('删除成功');
          this.courseage();
        }
      })
    },
    // 重置课程
    handleReset() {
      this.form.name = "";
      this.courseage();
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
    // 编辑课程
    editcomments(data) {
      this.editDialogVisible = true;
      this.editSubject.courseid = data.courseid;
      this.editSubject.coursetitle = data.coursetitle;
      this.editSubject.coursecover = data.coursecover;
      this.editSubject.courseabout = data.courseabout;
      this.editSubject.courseage = data.courseage;
    },
    // 编辑课程 上传封面
    handleAvatarSuccess(res, file) {
      if (this.editDialogVisible && !this.addDialogVisible) {
        this.editSubject.coursecover = URL.createObjectURL(file.raw);
      } else if (!this.editDialogVisible && this.addDialogVisible) {
        this.addSubject.coursecover = URL.createObjectURL(file.raw);
      }
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 3;
      if (!isLt2M) {
        this.$message.error("上传封面图片大小不能超过 3MB!");
        return false;
      }
      const formData = new FormData();
      formData.append("image", file);
      curriculum.uploadCourse(formData).then((res) => {
        if (res.data.status === "0") {
          if (this.editDialogVisible && !this.addDialogVisible) {
            this.editSubject.coursecover = res.data.data;
          } else if (!this.editDialogVisible && this.addDialogVisible) {
            this.addSubject.coursecover = res.data.data;
          }
        }
      });
      return false;
    },
    // 取消编辑
    cancalEdit() {
      this.editDialogVisible = false;
      this.editSubject.courseid = "";
      this.editSubject.coursetitle = "";
      this.editSubject.coursecover = "";
      this.editSubject.courseabout = "";
      this.editSubject.courseage = "";
    },
    // 编辑成功
    submitEdit() {
      this.editDialogVisible = false;
      console.log(this.editSubject);
      curriculum.updateCourse(this.editSubject)
      .then((res) => {
        console.log(res);
        if(res.data.status == '0') {
          this.$message('编辑课程成功')
          this.courseage();
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
      this.addSubject.coursetitle = "";
      this.addSubject.coursecover = "";
      this.addSubject.courseabout = "";
      this.addSubject.courseage = "";
    },
    // 新增成功
    submitAdd() {
      this.addDialogVisible = false;
      curriculum.createCourse(this.addSubject)
      .then((res) => {
        if(res.data.status == '0') {
          this.$message('新增课程成功')
          this.courseage();
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