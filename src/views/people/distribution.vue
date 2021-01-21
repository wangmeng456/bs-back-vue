<!-- 人群分布分析 -->
<template>
  <div class="distribution">
    <div class="formBox">
      <label style="margin: 0px 10px">时间维度：</label>
      <el-date-picker
        type="datetimerange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['12:00:00']"
      >
      </el-date-picker>
      <label style="margin: 0px 10px">地域维度：</label>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button type="success" style="float: right; margin: 10px 10px 0px 10px"
        >重置</el-button
      >
      <el-button type="primary" style="float: right; margin: 10px 10px 0px 10px"
        >查询</el-button
      >
    </div>
    <el-row :gutter="15">
      <el-col :span="12">
        <div class="col-box">
          <div class="col-title">人口迁徙图</div>
          <div class="echartMap">
            <echarts-map />
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="col-box">
          <div class="col-title">省份人口情况（TOP10）</div>
          <div class="table">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column type="index" label="序号" width="50">
              </el-table-column>
              <el-table-column prop="name" label="省份名称" width="180">
              </el-table-column>
              <el-table-column prop="num" label="人口数量"> </el-table-column>
            </el-table>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :span="12">
        <div class="col-box">
          <div class="col-title">人口检测趋势</div>
          <chart-line :chartJson="chartJson.lineData" />
        </div>
      </el-col>
      <el-col :span="12">
        <div class="col-box">
          <div class="col-title">流入流出情况</div>
          <div class="echartsBar">
            <echarts-bar />
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :span="24">
        <div class="col-box">
          <div class="col-title">归属地TOP15</div>
          <chart-histogram :chartJson="chartJson.histogramData" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import EchartsBar from "./components/EchartsBar.vue";
import EchartsMap from "./components/EchartsMap.vue";
import ChartLine from "@/components/v-chart/ChartLine.vue";
import ChartHistogram from "@/components/v-chart/ChartHistogram.vue";
export default {
  name: "",
  components: { ChartLine, ChartHistogram, EchartsBar, EchartsMap },
  data() {
    return {
      options: [
        {
          value: "1",
          label: "天津市",
        },
        {
          value: "2",
          label: "北京市",
        },
        {
          value: "3",
          label: "上海市",
        },
        {
          value: "4",
          label: "河北省",
        },
        {
          value: "5",
          label: "江苏省",
        },
      ],
      value: "",
      chartJson: {
        lineData: {
          chartData: {
            columns: ["日期", "趋势"],
            rows: [
              { 日期: "2018", 趋势: 12.6 },
              { 日期: "2019", 趋势: 12.9 },
              { 日期: "2020", 趋势: 13.4 },
            ],
          },
          colors: ["orange"],
          chartSetting: {
            stack: { 用户: ["趋势"] },
            area: true,
          },
          extend: {
            legend: {
              show: false,
            },
            grid: {
              left: "3%",
              right: "4%",
              bottom: "3%",
              top: "5%",
              containLabel: true,
            },
          },
          height: "300px",
        },

        histogramData: {
          chartData: {
            columns: ["地区", "人口"],
            rows: [
              { 地区: "河北", 人口: 1393 },
              { 地区: "河南", 人口: 3530 },
              { 地区: "山东", 人口: 2923 },
              { 地区: "黑龙江", 人口: 1723 },
              { 地区: "北京", 人口: 3792 },
              { 地区: "上海", 人口: 1393 },
              { 地区: "天津", 人口: 3530 },
              { 地区: "重庆", 人口: 2923 },
              { 地区: "河南", 人口: 1723 },
              { 地区: "云南", 人口: 3792 },
              { 地区: "湖南", 人口: 1393 },
              { 地区: "安徽", 人口: 3530 },
              { 地区: "新疆", 人口: 2923 },
              { 地区: "湖北", 人口: 1723 },
              { 地区: "江西", 人口: 3792 },
              { 地区: "江苏", 人口: 1393 },
              { 地区: "浙江", 人口: 3530 },
              { 地区: "辽宁", 人口: 2923 },
              { 地区: "云南", 人口: 1723 },
            ],
          },
          extend: {
            legend: {
              show: false,
            },
            grid: {
              left: "3%",
              right: "4%",
              bottom: "5%",
              top: "5%",
              containLabel: true,
            },
            barWidth: 15,
          },
          height: "300px",
        },
      },
      tableData: [
        {
          name: "广东",
          num: "11169万",
        },
        {
          name: "山东",
          num: "10005.83万",
        },
        {
          name: "河南",
          num: "9559.5万",
        },
        {
          name: "四川",
          num: "8302万",
        },
        {
          name: "江苏",
          num: "8029.3万",
        },
        {
          name: "河北",
          num: "7915.52万",
        },
        {
          name: "湖南",
          num: "6880.2万",
        },
        {
          name: "安徽",
          num: "6254.8万",
        },
        {
          name: "湖北",
          num: "5602万",
        },
        {
          name: "浙江",
          num: "5657万",
        },
      ],
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.distribution {
  padding: 15px;
  .formBox {
    height: 60px;
    padding: 5px;
    line-height: 50px;
    border-radius: 5px;
    margin-bottom: 15px;
    background-color: #fff;
  }
  .el-row {
    margin-bottom: 15px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .col-box {
    // height: 200px;
    border-radius: 5px;
    background-color: #fff;
    .col-title {
      height: 30px;
      font-size: 16px;
      padding-left: 15px;
      line-height: 30px;
      border-bottom: 1px solid #eaeaea;
    }
    .table {
      padding: 20px;
    }
    .echartMap {
      height: 481px;
    }
    .echartsBar {
      height: 300px;
    }
  }
}
</style>
