<!--
 * @Author: wangmeng
 * @Description: 练习题管理页面
-->
<template>
  <div class="subject">
    <div class="subject-header">
      <el-form :model="form">
        <el-form-item label="题目名称" label-width="70px">
          <el-input v-model="form.name" placeholder="请输入题目名称"></el-input>
        </el-form-item>
        <el-form-item label="题目类型" label-width="70px">
          <el-select v-model="form.type" placeholder="请选择题目类型">
            <el-option
              v-for="(item, index) in form.option"
              :key="index"
              :label="item.label"
              :value="item.data"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="从属课程" label-width="70px">
          <el-input v-model="form.video" placeholder="请输入从属课程"></el-input>
          <!-- <el-cascader
            v-model="form.video"
            :options="form.options"
            placeholder="请选择从属课程"
            @change="handleChange"
          ></el-cascader> -->
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
            ><i class="el-icon-search"></i> 查询</el-button
          >
          <el-button><i class="el-icon-refresh"> 重置</i></el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="subject-container">
      <el-button type="primary" plain @click="addSubjects"
        ><i class="el-icon-plus"></i> 新建题目</el-button
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
        <el-table-column type="index" width="80" label="题目顺序"></el-table-column>
        <el-table-column label="题目名称" prop="name" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="text" @click="formSubjects(scope.row)">{{
              scope.row.name
            }}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="题目类型" prop="type" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="从属课程" prop="video" show-overflow-tooltip
          ><template slot-scope="scope"
            >{{ scope.row.video }}</template
          ></el-table-column
        >
        <el-table-column
          label="上传时间"
          prop="time"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="text" @click="editSubjects(scope.row)"
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
    <!-- 新增题目 弹框 -->
    <el-dialog title="新增题目" :visible.sync="addDialogVisible">
      <el-form :model="addSubject">
        <el-form-item label="题目名称" label-width="70px">
          <el-input
            v-model="addSubject.name"
            placeholder="请输入题目名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="题目类型" label-width="70px">
          <el-select v-model="addSubject.type" placeholder="请选择题目类型">
            <el-option
              v-for="(item, index) in addSubject.option"
              :key="index"
              :label="item.label"
              :value="item.data"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题目答案" label-width="70px">
          <el-input
            type="textarea"
            :rows="4"
            v-model="addSubject.name"
            placeholder="请输入题目答案"
          ></el-input>
        </el-form-item>
        <el-form-item label="从属课程" label-width="70px">
          <el-cascader
            v-model="addSubject.video"
            :options="addSubject.options"
            placeholder="请选择从属课程"
            @change="addChange"
          ></el-cascader>
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
      <el-form :model="formSubject">
        <el-form-item label="题目顺序" label-width="70px">
          <el-input v-model="formSubject.index" disabled></el-input>
        </el-form-item>
        <el-form-item label="题目名称" label-width="70px">
          <el-input v-model="formSubject.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="题目类型" label-width="70px">
          <el-input v-model="formSubject.type" disabled></el-input>
        </el-form-item>
        <el-form-item label="题目答案" label-width="70px">
          <el-input
            type="textarea"
            :rows="4"
            v-model="formSubject.answer"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="从属课程" label-width="70px">
          <el-input v-model="formSubject.video" disabled></el-input>
        </el-form-item>
        <el-form-item label="上传时间" label-width="70px">
          <el-date-picker v-model="formSubject.time" type="datetime" disabled>
          </el-date-picker>
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
      <el-form :model="editSubject">
        <el-form-item label="题目名称" label-width="70px">
          <el-input v-model="editSubject.name"></el-input>
        </el-form-item>
        <el-form-item label="题目类型" label-width="70px">
          <el-select v-model="editSubject.type" placeholder="请选择题目类型">
            <el-option
              v-for="(item, index) in editSubject.option"
              :key="index"
              :label="item.label"
              :value="item.data"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题目答案" style="height: 260px" label-width="70px">
          <!-- <el-input
            type="textarea"
            :rows="4"
            v-model="editSubject.answer"
          ></el-input> -->
          <Editor />
        </el-form-item>
        <el-form-item label="从属课程" label-width="70px">
          <el-cascader
            v-model="editSubject.video"
            :options="editSubject.options"
            placeholder="请选择从属课程"
            @change="editChange"
          ></el-cascader>
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
import Editor from "@/components/Editor/index.vue";
export default {
  name: "subjectManagement",
  components: { Pagination, Editor },
  data() {
    return {
      form: {
        name: "",
        type: "",
        option: [
          { label: "Python", data: "Python" },
          { label: "C/C++", data: "C/C++" },
          { label: "JS", data: "JS" },
        ],
        video: "",
        options: [
          {
            label: "Python",
            value: "Python",
            children: [
              {
                label: "xxx",
                value: "xxx",
              },
              {
                label: "xxx",
                value: "xxx",
              },
            ],
          },
          {
            label: "C/C++",
            value: "C/C++",
            children: [
              {
                label: "xxx",
                value: "xxx",
              },
              {
                label: "xxx",
                value: "xxx",
              },
            ],
          },
          {
            label: "JS",
            value: "JS",
            children: [
              {
                label: "xxx",
                value: "xxx",
              },
              {
                label: "xxx",
                value: "xxx",
              },
            ],
          },
        ],
      },
      tableData: [
        {
          name: "看完本节课程，你理解的编程是什么呢？",
          type: "练习",
          video: "初识编程",
          // videos: "xxx",
          time: "2021-1-27 15:17:33",
          answer: "言之有理即可",
        },
      ],
      activeData: [], // 盛放选中的题目
      multiple: true, // 删除按钮状态
      total: 1,
      page: 1,
      limit: 10,
      pageSizes: [10, 20, 30, 50],
      addDialogVisible: false, // 新增
      addSubject: {
        name: "",
        type: "",
        option: [
          { label: "Python", data: "Python" },
          { label: "C/C++", data: "C/C++" },
          { label: "JS", data: "JS" },
        ],
        video: "",
        options: [
          {
            label: "Python",
            value: "Python",
            children: [
              {
                label: "xxx",
                value: "xxx",
              },
              {
                label: "xxx",
                value: "xxx",
              },
            ],
          },
          {
            label: "C/C++",
            value: "C/C++",
            children: [
              {
                label: "xxx",
                value: "xxx",
              },
              {
                label: "xxx",
                value: "xxx",
              },
            ],
          },
          {
            label: "JS",
            value: "JS",
            children: [
              {
                label: "xxx",
                value: "xxx",
              },
              {
                label: "xxx",
                value: "xxx",
              },
            ],
          },
        ],
        answer: "",
      },
      formDialogVisible: false, // 查看
      formSubject: {
        index: "1",
        name: "",
        type: "",
        time: "",
        answer: "",
        video: "",
      },
      editDialogVisible: false, // 编辑
      editSubject: {
        name: "",
        type: "",
        option: [
          { label: "Python", data: "Python" },
          { label: "C/C++", data: "C/C++" },
          { label: "JS", data: "JS" },
        ],
        answer: "",
        video: [],
        options: [
          {
            label: "Python",
            value: "Python",
            children: [
              {
                label: "xxx",
                value: "xxx",
              },
              {
                label: "xxx",
                value: "xxx",
              },
            ],
          },
          {
            label: "C/C++",
            value: "C/C++",
            children: [
              {
                label: "xxx",
                value: "xxx",
              },
              {
                label: "xxx",
                value: "xxx",
              },
            ],
          },
          {
            label: "JS",
            value: "JS",
            children: [
              {
                label: "xxx",
                value: "xxx",
              },
              {
                label: "xxx",
                value: "xxx",
              },
            ],
          },
        ],
      },
    };
  },
  created() {},
  methods: {
    // 级联选择器
    handleChange(value) {
      console.log(value);
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
    addSubjects() {
      this.addDialogVisible = true;
    },
    addChange(value) {
      console.log(value);
    },
    // 课程详情
    formSubjects(data) {
      this.formDialogVisible = true;
      this.formSubject.name = data.name;
      this.formSubject.type = data.type;
      this.formSubject.time = data.time;
      this.formSubject.video = data.video;
      this.formSubject.answer = data.answer;
    },
    // 编辑课程
    editSubjects(data) {
      this.editDialogVisible = true;
      this.editSubject.name = data.name;
      this.editSubject.type = data.type;
      this.editSubject.video.push(data.video);
      this.editSubject.video.push(data.videos);
      console.log(this.editSubject.video);
      this.editSubject.answer = data.answer;
    },
    editChange(value) {
      console.log(value);
    },
  },
};
</script>

<style lang="scss" scoped>
.subject {
  background: #fff;
  margin: 10px;
  padding: 20px;
  .subject-header {
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
    .el-cascader {
      width: 100%;
    }
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: 100%;
    }
  }
}
</style>