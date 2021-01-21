<template>
  <div class="app-container">
    <el-tabs type="border-card">
      <el-tab-pane label="系统常用参数设置">
        <el-form label-width="120px">
          <el-form-item label="系统界面标题">
            <el-input v-model="queryParams.test1" placeholder="系统界面标题" clearable size="small" />
          </el-form-item>
          <el-form-item label="水印">
            <el-input v-model="queryParams.test2" placeholder="水印" clearable size="small" />
          </el-form-item>
          <el-form-item label="提示语">
            <el-input v-model="queryParams.test3" placeholder="提示语" clearable size="small" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini">提交</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="系统日志参数设置">
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="addFormOpen">新增</el-button>

        <el-table :data="dataList">
          <el-table-column label="序号" type="index" width="50" />
          <el-table-column label="日志类型" align="center" prop="type">xxxx</el-table-column>
          <el-table-column label="保留时间" align="center" prop="time" />
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button size="mini" type="text" icon="el-icon-edit" @click="addFormOpen">编辑</el-button>
              <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <!-- 添加对话框 -->
    <el-dialog title :visible.sync="open" width="780px">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="日志类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择" style="width: 100%;">
            <el-option
              v-for="dict in typeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="保留时间">
          <el-input v-model="form.time" placeholder="请输入保留时间"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="padding-top:20px">
        <el-button type="primary" @click="open = false">确 定</el-button>
        <el-button @click="open = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "parameterSetting",
  data() {
    return {
      queryParams: {},
      open: false,
      form: {},
      typeOptions: [
        {
          dictValue: 0,
          dictLabel: "测试0"
        },
        {
          dictValue: 1,
          dictLabel: "测试1"
        },
        {
          dictValue: 2,
          dictLabel: "测试2"
        }
      ],
      dateRang: [],
      dataList: [
        {
          type: "xxx",
          time: "30天"
        },
        {
          type: "xxx",
          time: "50天"
        }
      ]
    };
  },
  methods: {
    /**
     * 打开新增表单
     */
    addFormOpen() {
      this.open = true;
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      this.$confirm("是否确认删除?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(function() {
          this.open = false;
        })
        .catch(function() {});
    }
  }
};
</script>

<style lang="stylus" scoped>
.el-tab-pane
  padding 20px
.el-table
  margin 20px 0 0
</style>
