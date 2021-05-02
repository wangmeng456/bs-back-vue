<!--
 * @Author: wangmeng
 * @Description: 课程管理页面
-->
<template>
  <div class="videos">
    <div class="video-header">
      <el-form :model="form">
        <el-form-item label="课程目录" label-width="70px">
          <el-select v-model="form.type" placeholder="请选择课程目录" @change="currStationChange">
            <el-option
              v-for="(item, index) in courseData"
              :key="index"
              :label="item.coursetitle"
              :value="item.courseid"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="video-container">
      <el-button type="primary" plain @click="addVideos"
        ><i class="el-icon-plus"></i> 新建课程章节</el-button
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
        <el-table-column label="课程章节名称" show-overflow-tooltip>
          <template slot-scope="scope">
            第{{
              scope.row.videochapter
            }}节 {{scope.row.videotitle}}
          </template>
        </el-table-column>
        <el-table-column label="课程章节视频" show-overflow-tooltip>
          <template slot-scope="scope">
            <Video :img="scope.row.videoaddress" />
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
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="text" @click="editVideos(scope.row)"
              >编辑</el-button
            >
            <el-button type="text" @click="deleteVideo(scope.row.videoid)">删除</el-button>
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
        <el-form-item label="课程章节" label-width="100px">
          <el-input v-model="addSubject.videochapter"></el-input>
        </el-form-item>
        <el-form-item label="课程章节标题" label-width="100px">
          <el-input v-model="addSubject.videotitle"></el-input>
        </el-form-item>
        <el-form-item label="课程章节视频" label-width="100px">
          <div>
            <el-upload
              class="avatar-uploader"
              action="#"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <Video
                v-if="addSubject.videoaddress"
                :img="
                  addSubject.videoaddress
                "
              />
              <br/>
              <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="课程章节简介" label-width="100px">
          <el-input
            type="textarea"
            :rows="4"
            v-model="addSubject.videocontext"
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
        <el-form-item label="课程章节" label-width="100px">
          <el-input v-model="editSubject.videochapter"></el-input>
        </el-form-item>
        <el-form-item label="课程章节标题" label-width="100px">
          <el-input v-model="editSubject.videotitle"></el-input>
        </el-form-item>
        <el-form-item label="课程章节视频" label-width="100px">
          <div>
            <el-upload
              class="avatar-uploader"
              action="#"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <Video
                v-if="editSubject.videoaddress"
                :img="
                  editSubject.videoaddress
                "
              />
              <br/>
              <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="课程章节简介" label-width="100px">
          <el-input
            type="textarea"
            :rows="4"
            v-model="editSubject.videocontext"
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
import Video from "@/components/Video/index.vue";
import { curriculum } from "@/api/curriculum";
export default {
  name: "videoManagement",
  components: { Pagination, Video },
  data() {
    return {
      courseid: undefined,
      form: {
        name: "",
        type: "",
      },
      courseData: [],
      tableData: [],
      activeData: [], // 盛放选中的视频
      multiple: true, // 删除按钮状态
      total: 1,
      page: 1,
      limit: 10,
      pageSizes: [10, 20, 30, 50],
      addDialogVisible: false, // 新增
      addSubject: {
        videotitle: "",
        videocontext: "",
        videoaddress: "",
        courseid: "",
        videochapter: ""
      },
      editSubject: {
        videotitle: "",
        videocontext: "",
        videoaddress: "",
        courseid: "",
        videochapter: "",
        videoid: ""
      },
      editDialogVisible: false, // 编辑
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
          this.courseData = res.data.data;
          this.form.type = res.data.data[0].coursetitle;
          this.courseid = res.data.data[0].courseid;
          this.getVideo(this.courseid);
        }
      });
    },
    // 获取课程章节
    getVideo(data) {
      curriculum.videoCourse(data)
      .then((res) => {
        if(res.data.status === '0') {
          this.tableData = res.data.data;
        }
      })
    },
    // 监听下拉框值的改变
    currStationChange(val) {
      this.courseid = val;
      this.getVideo(val);
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
    // 新增课程
    addVideos() {
      this.addDialogVisible = true;
    },
    // 上传视频
    handleAvatarSuccess(res, file) {
      if (this.editDialogVisible && !this.addDialogVisible) {
        this.editSubject.videoaddress = URL.createObjectURL(file.raw);
      } else if (!this.editDialogVisible && this.addDialogVisible) {
        this.addSubject.videoaddress = URL.createObjectURL(file.raw);
      }
      console.log(this.editSubject.videoaddress)
    },
    beforeAvatarUpload(file) {
      const formData = new FormData();
      formData.append("image", file);
      curriculum.uploadVideo(formData).then((res) => {
        if (res.data.status === "0") {
          if (this.editDialogVisible && !this.addDialogVisible) {
            this.editSubject.videoaddress = res.data.data;
          } else if (!this.editDialogVisible && this.addDialogVisible) {
            this.addSubject.videoaddress = res.data.data;
          }
          console.log(this.editSubject.videoaddress)
        }
      });
      return false;
    },
    // 取消新增
    cancalAdd() {
      this.addDialogVisible = false;
      this.addSubject.videotitle = "";
      this.addSubject.videocontext = "";
      this.addSubject.videoaddress = "";
      this.addSubject.courseid = this.courseid;
      this.addSubject.videochapter = "";
    },
    // 新增成功
    submitAdd() {
      this.addDialogVisible = false;
      this.addSubject.courseid = this.courseid;
      curriculum.createVideo(this.addSubject)
      .then((res) => {
        if(res.data.status == '0') {
          this.$message('新增课程章节成功')
          this.getVideo(this.courseid);
        }
      })
    },
    // 删除视频
    deleteVideo(data) {
      curriculum.deleteVideo(data).then((res) => {
        if(res.data.data == 'success') {
          this.$message('删除成功');
          this.getVideo(this.courseid);
        }
      })
    },
    // 编辑视频
    editVideos(data) {
      this.editDialogVisible = true;
      this.editSubject.videotitle = data.videotitle;
      this.editSubject.videocontext = data.videocontext;
      this.editSubject.videoaddress = data.videoaddress;
      this.editSubject.courseid = this.courseid;
      this.editSubject.videochapter = data.videochapter;
      this.editSubject.videoid = data.videoid;
    },
    // 取消编辑
    cancalEdit() {
      this.editDialogVisible = false;
      this.editSubject.videotitle = "";
      this.editSubject.videocontext = "";
      this.editSubject.videoaddress = "";
      this.editSubject.courseid = this.courseid;
      this.editSubject.videochapter = "";
      this.editSubject.videoid = "";
    },
    // 编辑成功
    submitEdit() {
      this.editDialogVisible = false;
      console.log(this.editSubject)
      curriculum.createVideo(this.editSubject)
      .then((res) => {
        if(res.data.status == '0') {
          this.$message('编辑课程章节成功')
          this.getVideo(this.courseid);
        }
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.videos {
  background: #fff;
  margin: 10px;
  padding: 20px;
  .video-header {
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
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
    }
    .video {
      width: 400px;
      height: 200px;
    }
    .vjs-big-play-button {
      display: none;
    }
  }
}
</style>