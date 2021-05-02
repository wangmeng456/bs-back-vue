<!--
 * @Author: wangmeng
 * @Description: 评论管理页面
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
        <el-form-item label="  " label-width="20px">
          <el-select v-model="form.paper" @change="currStationChangePaper">
            <el-option
              v-for="(item, index) in paperOption"
              :key="index"
              :label="item.name || item.title"
              :value="item.paperid"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="comment-container">
      <el-button type="primary" plain @click="addPapers"
        ><i class="el-icon-plus"></i> 新建试题</el-button
      >
      <!-- <el-button type="danger" plain :disabled="multiple"
        ><i class="el-icon-delete"></i> 批量删除</el-button
      > -->
      <el-table
        :data="tableData"
        max-height="500"
        style="max-height: 500px; min-height: 200px; width: 100%"
      >
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <el-table-column
          label="题号"
          prop="practiceindex"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="习题类型"
          prop="practicetype"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span v-if="scope.row.practicetype == 1">单选</span>
            <span v-if="scope.row.practicetype == 2">多选</span>
            <span v-if="scope.row.practicetype == 3">简答</span>
          </template>
        </el-table-column>
        <el-table-column
          label="习题问题"
          prop="practicequestion"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="习题回答"
          prop="practiceanother"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="习题答案"
          prop="practiceanswer"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="text" @click="editVideos(scope.row)"
              >编辑</el-button
            >
            <el-button type="text" @click="deletePratice(scope.row)"
              >删除</el-button
            >
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
    <!-- 新增试卷 弹框 -->
    <el-dialog :visible.sync="addDialogVisible">
      <el-form :model="addSubject">
        <el-form-item label="题号" label-width="70px">
          <el-input v-model="addSubject.practiceindex"></el-input>
        </el-form-item>
        <el-form-item label="习题类型" label-width="70px">
          <el-select
            v-model="addSubject.practicetype"
            @change="currStationChangePaperAdd"
          >
            <el-option
              v-for="(item, index) in options"
              :key="index"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="习题问题" label-width="70px">
          <el-input v-model="addSubject.practicequestion"></el-input>
        </el-form-item>
        <el-form-item label="习题答案" label-width="70px">
          <el-input v-model="addSubject.practiceanswer"></el-input>
          <span>例如：单选A；多选A,B</span>
        </el-form-item>
        <el-form-item label="习题回答" label-width="70px">
          <el-input v-model="addSubject.practiceanother"></el-input>
          <span>例如：A:选项a;B:选项b;C:选项c;</span>
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
        <el-form-item label="题号" label-width="70px">
          <el-input v-model="editSubject.practiceindex"></el-input>
        </el-form-item>
        <el-form-item label="习题类型" label-width="70px">
          <el-select
            v-model="editSubject.practicetype"
            @change="currStationChangePaperEdit"
          >
            <el-option
              v-for="(item, index) in options"
              :key="index"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="习题问题" label-width="70px">
          <el-input v-model="editSubject.practicequestion"></el-input>
        </el-form-item>
        <el-form-item label="习题答案" label-width="70px">
          <el-input v-model="editSubject.practiceanswer"></el-input>
          <span>例如：单选A；多选A,B</span>
        </el-form-item>
        <el-form-item label="习题回答" label-width="70px">
          <el-input v-model="editSubject.practiceanother"></el-input>
          <span>例如：A:选项a;B:选项b;C:选项c;</span>
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
        paperid: undefined,
        practicequestion: "",
        practiceanswer: "",
        practicetype: "",
        practiceanother: "",
        practiceindex: undefined,
      },
      selects: undefined,
      options: [
        { name: "单选", value: 1 },
        { name: "多选", value: 2 },
        { name: "简答", value: 3 },
      ],
      editDialogVisible: false,
      editSubject: {
        paperid: undefined,
        practicequestion: "",
        practiceanswer: "",
        practicetype: "",
        practiceanother: "",
        practiceindex: undefined,
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
        this.tableData = [];
        this.courseage();
      } else {
        this.flag = 1;
        this.tableData = [];
        this.allCourse();
      }
    },
    currStationChangeVideo(val) {
      this.form.video = val;
      this.tableData = [];
      this.videoCourse(val);
    },
    currStationChangeAll(val) {
      this.form.all = val;
      this.tableData = [];
      this.allDirectory(val);
    },
    currStationChangePaper(val) {
      this.form.paper = val;
      this.tableData = [];
      this.getPaperOne(val);
    },
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
          for (let i = 0; i < this.paperOption.length; i++) {
            this.$set(
              this.paperOption[i],
              "name",
              `第${this.paperOption[i].videochapter}节 ${this.paperOption[i].videotitle}`
            );
            this.$set(
              this.paperOption[i],
              "value",
              `${this.paperOption[i].videoid};第${this.paperOption[i].videochapter}节 ${this.paperOption[i].videotitle}`
            );
          }
          this.form.paper = this.paperOption[0].paperid;
          this.getPaperOne(this.form.paper);
        }
      });
    },
    // 获取分类
    allCourse() {
      curriculum.sort().then((res) => {
        if (res.data.status === "0") {
          this.form.all = res.data.data[0].papersort;
          this.allOption = res.data.data;
          this.allDirectory(res.data.data[0].papersort);
        }
      });
    },
    // 获取类别下的目录
    allDirectory(data) {
      curriculum.directory(data).then((res) => {
        if (res.data.status === "0") {
          this.paperOption = res.data.data;
          this.form.paper = res.data.data[0].paperid;
          this.getPaperOne(this.form.paper);
        }
      });
    },
    // 获取习题
    getPaperOne(data) {
      curriculum.paperOne(data).then((res) => {
        if (res.data.status === "0") {
          this.tableData = res.data.data;
        }
      });
    },
    // 创建试题
    addPapers() {
      this.addDialogVisible = true;
      this.addSubject.paperid = this.form.paper;
      this.addSubject.practicequestion = "";
      this.addSubject.practiceanswer = "";
      this.addSubject.practicetype = "";
      this.addSubject.practiceanother = "";
      this.addSubject.practiceindex = undefined;
    },
    currStationChangePaperAdd(val) {},
    currStationChangePaperEdit(val) {},
    // 取消新增
    cancalAdd() {
      this.addDialogVisible = false;
      this.addSubject.paperid = this.form.paper;
      this.addSubject.practicequestion = "";
      this.addSubject.practiceanswer = "";
      this.addSubject.practicetype = "";
      this.addSubject.practiceanother = "";
      this.addSubject.practiceindex = undefined;
    },
    // 新增成功
    submitAdd() {
      this.addDialogVisible = false;
      this.addSubject.paperid = this.form.paper;
      curriculum.createPractice(this.addSubject).then((res) => {
        if (res.data.status == "0") {
          this.$message("新增习题成功");
          this.getPaperOne(this.form.paper);
        }
      });
    },
    // 删除习题
    deletePratice(data) {
      curriculum.deletePratice(data.practiceid).then((res) => {
        if (res.data.status == "0") {
          this.$message("删除习题成功");
          this.getPaperOne(this.form.paper);
        }
      });
    },
    // 编辑
    editVideos(data) {
      this.editDialogVisible = true;
      this.editSubject.practicequestion = data.practicequestion;
      this.editSubject.practiceanswer = data.practiceanswer;
      this.editSubject.paperid = data.paperid;
      this.editSubject.practicetype = data.practicetype;
      this.editSubject.practiceanother = data.practiceanother;
      this.editSubject.practiceindex = data.practiceindex;
      this.editSubject.practiceid = data.practiceid;
    },
    // 取消
    cancalEdit() {
      this.editDialogVisible = false;
      this.editSubject.practicequestion = "";
      this.editSubject.practiceanswer = "";
      this.editSubject.paperid = "";
      this.editSubject.practicetype = "";
      this.editSubject.practiceanother = "";
      this.editSubject.practiceindex = "";
      this.editSubject.practiceid = "";
    },
    // 编辑成功
    submitEdit() {
      this.editDialogVisible = false;
      curriculum.updatePratice(this.editSubject).then((res) => {
        console.log(res);
        if (res.data.status == "0") {
          this.$message("编辑习题成功");
          this.getPaperOne(this.form.paper);
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