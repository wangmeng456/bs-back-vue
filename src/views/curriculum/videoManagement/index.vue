<!--
 * @Author: wangmeng
 * @Date: 2021-01-27 14:57:52
 * @LastEditTime: 2021-01-27 11:15:28
 * @LastEditors: wangmeng
 * @Description: 视频管理页面
 * @FilePath: https://github.com/wangmeng456/bs-back-vue/tree/master/src/views/curriculum/videoManagement.vue
-->
<template>
  <div class="video">
    <div class="video-header">
      <el-form :model="form">
        <el-form-item label="课程名称" label-width="70px">
          <el-input v-model="form.name" placeholder="请输入课程名称"></el-input>
        </el-form-item>
        <el-form-item label="课程类型" label-width="70px">
          <el-select v-model="form.type" placeholder="请选择课程类型">
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
    <div class="video-container">
      <el-button type="primary" plain @click="addVideos"
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
            <el-button type="text" @click="formVideos(scope.row)">{{
              scope.row.name
            }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="课程类型"
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
            <el-button type="text" @click="editVideos(scope.row)"
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
    <!-- 新增课程 弹框 -->
    <el-dialog title="新增课程" :visible.sync="addDialogVisible">
      <el-form :model="addVideo">
        <el-form-item label="课程名称" label-width="70px">
          <el-input
            v-model="addVideo.name"
            placeholder="请输入课程名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="课程类型" label-width="70px">
          <el-select v-model="addVideo.type" placeholder="请选择课程类型">
            <el-option
              v-for="(item, index) in addVideo.option"
              :key="index"
              :label="item.label"
              :value="item.data"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上传视频" label-width="70px">
          <el-upload
            class="avatar-uploader el-upload--text"
            :action="addVideo.uploadUrl"
            :show-file-list="false"
            accept=".mp4"
            :on-success="handleVideoSuccess"
            :before-upload="beforeUploadVideo"
            :on-progress="uploadVideoProcess"
          >
            <video
              v-if="addVideo.showVideoPath != '' && !addVideo.videoFlag"
              :src="addVideo.showVideoPath"
              class="avatar video-avatar"
              controls="controls"
            >
              您的浏览器不支持视频播放
            </video>
            <i
              v-else-if="addVideo.showVideoPath == '' && !addVideo.videoFlag"
              class="el-icon-plus avatar-uploader-icon"
            ></i>
            <el-progress
              v-if="addVideo.videoFlag == true"
              type="circle"
              :percentage="addVideo.videoUploadPercent"
              style="margin-top: 30px"
            ></el-progress>
            <el-button
              class="video-btn"
              slot="trigger"
              size="small"
              v-if="addVideo.isShowUploadVideo"
              type="primary"
              >选取文件</el-button
            >
          </el-upload>
          <p
            v-if="
              (addVideo.showVideoPath == '' && !addVideo.videoFlag) ||
              addVideo.isShowUploadVideo
            "
            class="text"
          >
            请保证视频格式正确，且不超过1GB
          </p>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDialogVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 查看课程详情 弹框 -->
    <el-dialog :visible.sync="formDialogVisible">
      <el-form :model="formVideo">
        <el-form-item label="课程名称" label-width="70px">
          <el-input v-model="formVideo.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="课程类型" label-width="70px">
          <el-input v-model="formVideo.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="上传时间" label-width="70px">
          <el-date-picker v-model="formVideo.time" type="datetime" disabled>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="视频课程" label-width="70px">
          <Video :img="formVideo.img" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="formDialogVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 编辑课程 弹框 -->
    <el-dialog :visible.sync="editDialogVisible">
      <el-form :model="editVideo">
        <el-form-item label="课程名称" label-width="70px">
          <el-input v-model="editVideo.name"></el-input>
        </el-form-item>
        <el-form-item label="课程类型" label-width="70px">
          <el-input v-model="editVideo.name"></el-input>
        </el-form-item>
        <el-form-item label="视频课程" label-width="70px">
          <el-upload
            class="avatar-uploader el-upload--text"
            :action="editVideo.uploadUrl"
            :show-file-list="false"
            accept=".mp4"
            :on-success="editHandleVideoSuccess"
            :before-upload="editBeforeUploadVideo"
            :on-progress="editUploadVideoProcess"
          >
            <video
              v-if="editVideo.showVideoPath != '' && !editVideo.videoFlag"
              :src="editVideo.showVideoPath"
              class="avatar video-avatar"
              controls="controls"
            >
              您的浏览器不支持视频播放
            </video>
            <el-progress
              v-if="editVideo.videoFlag == true"
              type="circle"
              :percentage="editVideo.videoUploadPercent"
              style="margin-top: 30px"
            ></el-progress>
            <el-button
              v-if="!editVideo.videoFlag"
              class="video-btn"
              slot="trigger"
              size="small"
              type="primary"
              plain
              >选取文件</el-button
            >
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editDialogVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination/index.vue";
import Video from "@/components/Video/index.vue";
export default {
  name: "videoManagement",
  components: { Pagination, Video },
  data() {
    return {
      form: {
        name: "",
        type: "",
        option: [
          { label: "Python", data: "python" },
          { label: "C/C++", data: "c" },
          { label: "JS", data: "js" },
        ],
      },
      tableData: [
        {
          name: "XXX",
          type: "xxxx",
          time: "2021-1-27 15:17:33",
          img: require("@/assets/mp4/shipin.mp4"),
        },
      ],
      activeData: [], // 盛放选中的用户
      multiple: true, // 删除按钮状态
      total: 10,
      page: 1,
      limit: 10,
      pageSizes: [10, 20, 30, 50],
      addDialogVisible: false, // 新增
      addVideo: {
        name: "",
        type: "",
        option: [
          { label: "Python", data: "python" },
          { label: "C/C++", data: "c" },
          { label: "JS", data: "js" },
        ],
        uploadUrl: "", // 要上传视频到后台的地址
        videoFlag: false, // 是否显示进度条
        videoUploadPercent: "", // 进度条的进度
        isShowUploadVideo: false, // 显示上传按钮
        showVideoPath: "", // video 路径
      },
      formDialogVisible: false, // 查看
      formVideo: {
        name: "",
        type: "",
        time: "",
        img: "",
      },
      editDialogVisible: false, // 编辑
      editVideo: {
        name: "",
        type: "",
        uploadUrl: "", // 要上传视频到后台的地址
        videoFlag: false, // 是否显示进度条
        videoUploadPercent: "", // 进度条的进度
        isShowUploadVideo: false, // 显示上传按钮
        showVideoPath: "", // video 路径
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
    // 新增课程
    addVideos() {
      this.addDialogVisible = true;
    },
    //上传前回调
    beforeUploadVideo(file) {
      const isLt200M = file.size / 1024 / 1024 < 1024;
      if (["video/mp4"].indexOf(file.type) == -1) {
        //'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb'
        this.$message.error("请上传正确的视频格式");
        return false;
      }
      if (!isLt200M) {
        this.$message.error("上传视频大小不能超过200MB哦!");
        return false;
      }
      this.addVideo.isShowUploadVideo = false;
    },
    //进度条
    uploadVideoProcess(event, file, fileList) {
      this.addVideo.videoFlag = true;
      this.addVideo.videoUploadPercent = file.percentage.toFixed(0) * 1;
    },
    //上传成功回调
    handleVideoSuccess(res, file) {
      this.addVideo.isShowUploadVideo = true;
      this.addVideo.videoFlag = false;
      this.addVideo.videoUploadPercent = 0;
      //   if (res.errorCode == "00") {
      //     this.global.company.showVideoPath = res.sprbody.urlAddress;
      //     // this.videoForm.showVideoPath = res.data.uploadUrl;
      //   } else {
      //     this.$message.error("视频上传失败，请重新上传！");
      //   }
    },
    // 课程详情
    formVideos(data) {
      this.formDialogVisible = true;
      this.formVideo.name = data.name;
      this.formVideo.type = data.type;
      this.formVideo.time = data.time;
      this.formVideo.img = data.img;
    },
    // 编辑课程
    editVideos(data) {
      this.editDialogVisible = true;
      this.editVideo.name = data.name;
      this.editVideo.type = data.type;
      this.editVideo.showVideoPath = data.img;
    },
    //编辑-上传前回调
    editBeforeUploadVideo(file) {
      const isLt200M = file.size / 1024 / 1024 < 1024;
      if (["video/mp4"].indexOf(file.type) == -1) {
        this.$message.error("请上传正确的视频格式");
        return false;
      }
      if (!isLt200M) {
        this.$message.error("上传视频大小不能超过200MB哦!");
        return false;
      }
      this.editVideo.isShowUploadVideo = false;
    },
    //编辑-进度条
    editUploadVideoProcess(event, file, fileList) {
      this.editVideo.videoFlag = true;
      this.editVideo.videoUploadPercent = file.percentage.toFixed(0) * 1;
    },
    //编辑-上传成功回调
    editHandleVideoSuccess(res, file) {
      this.editVideo.isShowUploadVideo = true;
      this.editVideo.videoFlag = false;
      this.editVideo.videoUploadPercent = 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.video {
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
    .video-avatar {
      width: 400px;
      height: 200px;
    }
    .video-btn {
      margin-bottom: 10px;
    }
  }
}
</style>