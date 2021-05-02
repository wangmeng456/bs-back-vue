<!--
 * @Author: wangmeng
 * @Description: 试卷管理页面
-->
<template>
  <div class="comment">
    <div class="comment-header">
      <el-form :model="form">
        <el-form-item label="  ">
        <el-select v-model="form.type" @change="currStationChange">
          <el-option
            v-for="(item, index) in option"
            :key="index"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
        </el-form-item>
        <!-- 课程 -->
        <el-form-item label="  " label-width="20px">
        <el-select
          v-show="flag == 0"
          v-model="form.video"
          @change="currStationChangeVideo"
        >
          <el-option
            v-for="(item, index) in videoOption"
            :key="index"
            :label="item.coursetitle"
            :value="item.courseid"
          ></el-option>
        </el-select>
        </el-form-item>
        <!-- 分类 -->
        <el-form-item label="  " label-width="20px">
        <el-select
          v-show="flag == 1"
          v-model="form.all"
          @change="currStationChangeAll"
        >
          <el-option
            v-for="(item, index) in allOption"
            :key="index"
            :label="item.papersort"
            :value="item.papersort"
          ></el-option>
        </el-select>
        </el-form-item>
        <!-- 课程下的章节 -->
        <!-- <el-form-item label="  " label-width="20px">
        <el-select
          v-model="form.paper"
          @change="currStationChangePaper"
        >
          <el-option
            v-for="(item, index) in paperOption"
            :key="index"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
        </el-form-item> -->
      </el-form>
    </div>
    <div class="comment-container">
      <el-button type="primary" v-if="flag == 1" plain @click="addPapers"
        ><i class="el-icon-plus"></i> 新建试卷</el-button
      >
      <!-- <el-button type="danger" plain :disabled="multiple"
        ><i class="el-icon-delete"></i> 批量删除</el-button
      > -->
      <el-table
        :data="tableDatas"
        max-height="500"
        style="max-height: 500px; min-height: 200px; width: 100%"
        v-show="flag == 1"
      >
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <el-table-column label="综合练习分类名称" prop="title" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="text" @click="editVideos(scope.row)"
              >编辑</el-button
            >
            <el-button type="text" @click="deletePapers(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table
        :data="tableData"
        max-height="500"
        style="max-height: 500px; min-height: 200px; width: 100%"
        v-show="flag == 0"
      >
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <el-table-column label="课程章节名称" show-overflow-tooltip>
          <template slot-scope="scope">
            第{{
              scope.row.videochapter
            }}节 {{scope.row.videotitle}}
          </template>
        </el-table-column>
        <el-table-column
          label="课程章节简介"
          prop="videocontext"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="上传时间"
          prop="videodate"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button v-if="scope.row.paperid === null" type="text" @click="addPaper(scope.row)">创建试卷</el-button>
            <el-button v-if="scope.row.paperid !== null" type="text" disabled>创建试卷</el-button>
            <el-button type="text" @click="deletePaper(scope.row)">删除</el-button>
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
    <el-dialog :visible.sync="addDialogVisible">
      <el-form :model="paper">
        <el-form-item label="试卷名称" label-width="70px">
          <el-input v-model="paper.title"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancalAdd">取 消</el-button>
        <el-button type="primary" @click="submitAdd">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑试卷 弹框 -->
    <el-dialog :visible.sync="editDialogVisible">
      <el-form :model="editSubject">
        <el-form-item label="试卷标题" label-width="70px">
          <el-input v-model="editSubject.papertitle"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancalEdits">取 消</el-button>
        <el-button type="primary" @click="submitEdits">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination/index.vue";
import { curriculum } from "@/api/curriculum";

export default {
  name: "paperManagement",
  components: { Pagination },
  data() {
    return {
      form: {
        type: "课程章节试卷",
        video: "",
        all: "",
        paper: "",
      },
      option: [
        { name: "课程章节试卷", value: "a" },
        { name: "综合练习分类试卷", value: "b" },
      ],
      flag: 0, // 区分是视频练习还是分类练习
      allOption: [], // 综合分类
      videoOption: [], // 课程分类
      paperOption: [], // 试卷父级分类
      paper: {
        title: ''
      }, // 试卷的标题
      tableData: [],
      tableDatas: [],
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
        coursecover: "",
      },
      editDialogVisible: false,
      editSubject: {
        papertitle: '',
        papertype:undefined,
        videoid:null,
        papersort:null,
        paperid: undefined
      },
    };
  },
  created() {
    this.courseage();
  },
  methods: {
    // 监听下拉框值的改变
    currStationChange(val) {
      if (val == "a") {
        // 视频练习
        this.flag = 0;
        this.courseage();
      } else {
        this.flag = 1;
        this.allCourse();
      }
    },
    currStationChangeVideo(val) {
      this.form.video = val;
      this.videoCourse(val);
    },
    currStationChangeAll(val) {
      this.form.all = val;
      this.allDirectory(val);
    },
    // currStationChangePaper(val) {
    //   console.log(val);
    // },
    // 获取课程
    courseage() {
      curriculum.courseage().then((res) => {
        if (res.data.status === "0") {
          this.videoOption = res.data.data;
          this.form.video = res.data.data[0].courseid;
          this.videoCourse(this.form.video);
        }
      });
    },
    // 获取课程章节
    videoCourse(data) {
      curriculum.videoCourse(data).then((res) => {
        if (res.data.status === "0") {
          this.paperOption = res.data.data;
          this.tableData = res.data.data;
          for(let i = 0; i < this.paperOption.length; i++) {
            this.$set(this.paperOption[i], 'name', `第${this.paperOption[i].videochapter}节 ${this.paperOption[i].videotitle}`);
            this.$set(this.paperOption[i], 'value', `${this.paperOption[i].videoid};第${this.paperOption[i].videochapter}节 ${this.paperOption[i].videotitle}`);
          }
          this.form.paper = this.paperOption[0].name;
        }
      })
    },
    // 获取分类
    allCourse() {
      curriculum.sort().then((res)=>{
        if(res.data.status === "0") {
          this.form.all = res.data.data[0].papersort;
          this.allOption = res.data.data;
          this.allDirectory(res.data.data[0].papersort);
        }
      })
    },
    // 获取类别下的目录
    allDirectory(data) {
      curriculum.directory(data).then((res)=>{
        if(res.data.status === '0') {
          this.tableDatas = res.data.data;
        }
      })
    },
    // 创建试卷
    addPaper(data) {
      curriculum.createPaper(data.name, 2, data.videoid , null).then((res) => {
        if(res.data.status === '0') {
          this.$message('试卷创建成功!');
          this.videoCourse(data.courseid);
        }
      })
    },
    // 新建试卷
    addPapers() {
      this.addDialogVisible = true;
    },
    // 取消新增
    cancalAdd() {
      this.addDialogVisible = false;
      this.title = "";
    },
    // 新增成功
    submitAdd() {
      this.addDialogVisible = false;
      curriculum.createPaper(this.paper.title, 1, null , this.form.all).then((res) => {
        if(res.data.status === '0') {
          this.$message('试卷创建成功!');
          this.allDirectory(this.form.all);
        }
      })
    },
    
    // 删除课程
    deletePaper(data) {
      curriculum.deletePaper(data.paperid).then((res) => {
        if(res.data.data == 'success') {
          this.$message('删除成功');
          this.videoCourse(data.courseid);
        }
      })
    },
    deletePapers(data) {
      curriculum.deletePaper(data.paperid).then((res) => {
        if(res.data.data == 'success') {
          this.$message('删除成功');
          this.allDirectory(this.form.all);
        }
      })
    },
    // 编辑试卷
    editVideos(data) {
      this.editDialogVisible = true;
      this.editSubject.papertitle = data.title;
      this.editSubject.papertype = 1;
      this.editSubject.videoid = null;
      this.editSubject.papersort = this.form.all;
      this.editSubject.paperid = data.paperid;
    },
    // 取消编辑
    cancalEdits() {
      this.editDialogVisible = false;
      this.editSubject.papertitle = "";
      this.editSubject.papertype = undefined;
      this.editSubject.videoid = null;
      this.editSubject.papersort = null;
      this.editSubject.paperid = undefined;
    },
    // 编辑成功
    submitEdits() {
      this.editDialogVisible = false;
      curriculum.updatePaper(this.editSubject).then((res) => {
        if (res.data.status == "0") {
          this.$message("编辑试卷成功");
          this.allDirectory(this.form.all);
        }
      });
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
    img {
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