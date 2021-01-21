<!--
 * @Descripttion: 
 * @version: 
 * @Author: Miliky
 * @Date: 2020-07-28 20:02:24
 * @LastEditors: Miliky
 * @LastEditTime: 2020-07-29 10:48:59
--> 
<template lang="pug">
.app-container.s
  el-form.demo-form-inline(:inline="true", :model="formInline")
    el-form-item(label="产品业务名称:")
      el-input(v-model="formInline.user", placeholder="产品业务名称")
    el-form-item
      el-button(type="primary") 查询
      el-button 重置
  .table-list
    el-button(
      type="warning",
      icon="el-icon-plus",
      @click="dialogVisible = true"
    ) 新增
    el-table(:data="data", style="width: 100%")
      el-table-column(type="index", label="序号")
      el-table-column(prop="a", label="产品业务名称")
      el-table-column(prop="e", label="创建人")
      el-table-column(prop="f", label="创建时间", width="140")
      el-table-column(prop="g", label="修改人")
      el-table-column(prop="h", label="修改时间", width="140")
      el-table-column(label="操作", width="140")
        template(slot-scope="scope")
          el-button(type="text") 编辑
          el-button(type="text") 删除
  el-dialog(
    title="新增",
    :visible.sync="dialogVisible",
    width="50%",
    :before-close="handleClose"
  )
    el-row(:gutter="20")
      el-col(:span="12")
        el-form(ref="form", :rules="rules", :model="form", label-width="120px")
          el-form-item(label="产品业务名称", prop="user")
            el-input(v-model="form.user", placeholder="产品业务名称")
      el-col(:span="24")
        el-button 新建步骤
        el-button(type="primary") 新建模块
      el-col(:span="24")
        table(width="100%")
          tr
            th 步骤
            th 产品模块选择
            th 操作
          tr(style="text-align: center")
            td 第一步
            td
              el-cascader(
                placeholder="产品参数类型",
                v-model="values",
                :options="options"
              )
            td
              el-button(type="text") 删除
          tr(style="text-align: center")
            td 第二步
            td
              el-cascader(
                placeholder="产品参数类型",
                v-model="value",
                :options="options"
              )
            td
              el-button(type="text") 删除
    span.dialog-footer(slot="footer")
      el-button(@click="dialogVisible = false") 取 消
      el-button(type="primary", @click="dialogVisible = false") 确 定
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      formInline: {
        user: "",
        region: "",
      },
      form: {
        user: "",
        user1: "有效",
        user2: "",
        user3: "",
      },
      data: [
        {
          a: "出行服务模板001",
          b: "模块1",
          c: "1",
          d: "已下线",
          e: "admin",
          f: "2019-12-28 13:50:20",
          g: "admin",
          h: "2019-05-22 19:50:21",
        },
      ],
	  value: "",
	  values: "",
	  option: [
        {
          value: "a",
          label: "人群结构分析",
          children: [
            {
              value: "aa",
              label: "分类指标数据",
			},
			{
              value: "ab",
              label: "行为模型",
			},
			{
              value: "ac",
              label: "任务采集",
            },
          ],
		},
		{
          value: "b",
          label: "人群分布分析",
          children: [
            {
              value: "ba",
              label: "人群建模",
			},
			{
              value: "bb",
              label: "人群特征识别",
			},
			{
              value: "bc",
              label: "职住模型",
            },
          ],
        },
      ],
      options: [
        {
          value: "a",
          label: "人群结构分析",
          children: [
            {
              value: "aa",
              label: "分类指标数据",
			},
			{
              value: "ab",
              label: "行为模型",
			},
			{
              value: "ac",
              label: "任务采集",
            },
          ],
		},
		{
          value: "b",
          label: "人群分布分析",
          children: [
            {
              value: "ba",
              label: "人群建模",
			},
			{
              value: "bb",
              label: "人群特征识别",
			},
			{
              value: "bc",
              label: "职住模型",
            },
          ],
        },
      ],
      rules: {
        // user: [
        // 	{required: true, message: '请输入产品模块名称', trigger: 'blur'}
        // ],
        // user1: [
        // 	{required: true, message: '产品模块状态', trigger: 'blur'}
        // ],
        // user2: [
        // 	{required: true, message: '请选择前置模块名称', trigger: 'change'}
        // ],
        // user3: [
        // 	{required: true, message: '备注信息', trigger: 'blur'}
        // ],
      },
    };
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.s {
  table > tr {
    border: 1px solid #eaeaea !important;
  }
}
</style>