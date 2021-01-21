<template lang="pug">
.app-container
  .table-list
    el-button(type="warning", icon="el-icon-plus", @click="a") 产品参数模板配置
  el-dialog(
    title="新增",
    :visible.sync="dialogVisible",
    width="60%",
    :before-close="handleClose"
  )
    el-row
      el-col(v-show="next", :span="13")
        el-table(
          :data="data1",
          border,
          ref="selection",
          height="400px",
          @selection-change="checkAll",
          style="width: 100%"
        )
          el-table-column(type="selection", width="30")
          el-table-column(prop="a", label="产品参数名称", width="100")
          el-table-column(prop="b", label="产品参数类型", width="100")
          el-table-column(prop="c", label="参数数据", width="100")
            template(slot-scope="scope")
              el-button(type="text") {{ scope.row.btn }}
          el-table-column(prop="d", label="是否必填")
      el-col(v-show="next", :span="2")
        .opSetting(style="height: 400px; text-align: center; padding-top: 130px")
          el-button(
            @click="handelSelect",
            icon="el-icon-d-arrow-right",
            :disabled="nowSelectData.length ? false : true",
            :size="buttonSize",
            type="primary"
          )
          el-button(
            @click="handleRemoveSelect",
            style="margin: 0px; margin-top: 20px",
            icon="el-icon-d-arrow-left",
            :disabled="nowSelectRightData.length ? false : true",
            :size="buttonSize",
            type="primary"
          )
      el-col(v-show="next", :span="9")
        el-table(
          :data="selectArr",
          border,
          ref="selection",
          height="400px",
          @selection-change="checkRightAll",
          style="width: 100%"
        )
          el-table-column(type="selection", width="30")
          el-table-column(prop="a", label="产品参数名称")
          //- el-table-column(prop="name" label="产品参数类型" width="100")
          //- el-table-column(prop="address" label="是否必填")
      el-col(v-show="!next", :span="24")
        el-form(ref="form", :model="form", :inline="true", label-width="100px")
          el-form-item(label="产品类型")
            el-select(v-model="form.region", placeholder="产品类型")
              el-option(label="类型一", value="1")
              el-option(label="类型二", value="2")
              el-option(label="类型三", value="3")
              el-option(label="类型四", value="4")
          el-form-item(label="产品模块名称")
            el-select(v-model="form.model", placeholder="产品模块名称")
              el-option(label="名称一", value="1")
              el-option(label="名称二", value="2")
              el-option(label="名称三", value="3")
              el-option(label="名称四", value="4")
          el-form-item(label="产品ID")
            el-input(v-model="form.name", style="width: 194px")
          el-form-item(label="时间范围")
            el-select(v-model="form.time", placeholder="时间范围")
              el-option(label="时间一", value="1")
              el-option(label="时间二", value="2")
              el-option(label="时间三", value="3")
              el-option(label="时间四", value="4")
      el-col(:span="24")
        .btn-box(style="text-align: center; padding: 10px")
          el-button(type="info", @click="dialogVisible = false") 取 消
          el-button(v-show="next", type="primary", @click="nexts()") 下一步
          el-button(
            v-show="!next",
            type="primary",
            @click="dialogVisible = false"
          ) 完 成
</template>
<script>
export default {
  data() {
    return {
      next: true,
      dialogVisible: false,
      selectArr: [], // 右边列表
      buttonSize: "large",
      options: [],
      value: "",
      data1: [
        {
          a: "产品类型",
          b: "单项选择",
          c: "1",
          d: "是",
          e: "admin",
          f: "2019-01-24 19:50:20",
          g: "admin",
          h: "2019-01-24 19:50:21",
          btn: "查看",
        },
        {
          a: "产品模块名称",
          b: "文本输入",
          c: "1",
          d: "是",
          e: "admin",
          f: "2019-01-26 10:00:20",
          g: "admin",
          h: "2019-01-26 10:00:51",
          btn: "-",
        },
        {
          a: "产品ID",
          b: "文本输入",
          c: "5",
          d: "是",
          e: "admin",
          f: "2019-02-20 23:50:20",
          g: "admin",
          h: "2019-02-20 23:50:21",
          btn: "-",
        },
        {
          a: "时间范围",
          b: "时间选择",
          c: "1",
          d: "否",
          e: "admin",
          f: "2019-03-22 15:00:00",
          g: "admin",
          h: "2019-03-22 15:00:02",
          btn: "-",
        },
        {
          a: "区域范围",
          b: "单项选择",
          c: "5",
          d: "否",
          e: "admin",
          f: "2019-03-31 20:30:00",
          g: "admin",
          h: "2019-03-31 20:30:10",
          btn: "查看",
        },
        {
          a: "OD类型",
          b: "时间选择",
          c: "1",
          d: "是",
          e: "admin",
          f: "2019-04-10 15:00:20",
          g: "admin",
          h: "2019-04-10 16:00:21",
          btn: "查看",
        },
        {
          a: "OD方向",
          b: "单项选择",
          c: "5",
          d: "是",
          e: "admin",
          f: "2019-05-22 19:50:00",
          g: "admin",
          h: "2019-05-22 19:50:34",
          btn: "查看",
        },
      ],
      nowSelectData: [], // 左边选中列表数据
      nowSelectRightData: [], // 右边选中列表数据
      form: {
        name: "",
      },
    };
  },
  methods: {
    a() {
      this.next = true;
      this.dialogVisible = true;
    },
    nexts() {
      this.next = false;
    },
    handleClose() {
      this.dialogVisible = false;
    },

    checkAll(val) {
      this.nowSelectData = val;
    },
    checkRightAll(val) {
      this.nowSelectRightData = val;
    },
    // 选中
    handelSelect() {
      this.selectArr = this.handleConcatArr(this.selectArr, this.nowSelectData);
      this.handleRemoveTabList(this.nowSelectData, this.data1);
      this.nowSelectData = [];
    },
    // 取消
    handleRemoveSelect() {
      this.data1 = this.handleConcatArr(this.data1, this.nowSelectRightData);
      this.handleRemoveTabList(this.nowSelectRightData, this.selectArr);
      this.nowSelectRightData = [];
    },
    handleConcatArr(selectArr, nowSelectData) {
      let arr = [];
      arr = arr.concat(selectArr, nowSelectData);
      return arr;
    },
    handleRemoveTabList(isNeedArr, originalArr) {
      if (isNeedArr.length && originalArr.length) {
        for (let i = 0; i < isNeedArr.length; i++) {
          for (let k = 0; k < originalArr.length; k++) {
            if (isNeedArr[i]["name"] === originalArr[k]["name"]) {
              originalArr.splice(k, 1);
            }
          }
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.table-list {
  height: calc(100vh - 125px);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>