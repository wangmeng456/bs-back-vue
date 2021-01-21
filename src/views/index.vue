<template>
  <div class="dashboard-editor-container">

    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row :gutter="32" style="padding:16px 16px 0;">
      <el-col :xs="24" :sm="24" :lg="8" style="padding-left: 16px; padding-right: 0px;">
        <el-card class="box-card" style="margin-left:-15px;margin-right:10px;">
          <div slot="header" class="clearfix">
            <span>需求概览</span>
            <el-button style="float: right; padding: 3px 0" type="text">详情></el-button>
          </div>
          <div style="text-align:center;margin-top:50px;margin-bottom:110px">
            <p style="color: #F59A23;font-size:28px">300</p>
            <p style="color: #F59A23;font-size:14px">需求总数</p>
          </div>
          <div>
            <el-steps :active="4" align-center>
              <el-step title="需审核" description="88" icon="el-icon-setting"></el-step>
              <el-step title="需执行" description="66" icon="el-icon-s-operation"></el-step>
              <el-step title="已执行" description="99" icon="el-icon-folder-checked"></el-step>
              <el-step title="完成" description="100" icon="el-icon-success"></el-step>
            </el-steps>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8"  style="padding-left: 16px; padding-right: 0px;">
        <el-card class="box-card" style="margin-left:-3px;margin-right:-5px">
          <div slot="header" class="clearfix">
            <span>任务概览</span>
            <el-button style="float: right; padding: 3px 0" type="text">详情></el-button>
          </div>
          <div>
            <el-row>
              <el-col :span="12" style="text-align:center">
                <span>运行任务数</span>
                <Gauge :chartData="lineChartData.gauge1"/>
              </el-col>
              <el-col :span="12" style="text-align:center">
                <span>今日运行成功数</span>
                <Gauge :chartData="lineChartData.gauge2"/>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" style="text-align:center">
                <span>今日运行失败数</span>
                <Gauge :chartData="lineChartData.gauge3"/>
              </el-col>
              <el-col :span="12" style="text-align:center">
                <span>暂停中任务数</span>
                <Gauge :chartData="lineChartData.gauge4"/>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <el-card class="box-card" style="margin-left:14px;margin-right:-15px">
          <div slot="header" class="clearfix">
            <span>最近访问</span>
            <el-button style="float: right; padding: 3px 0" type="text">详情></el-button>
          </div>
          <div class="text item" style="line-height:58px;text-align:center;">
            <p><span style="color: #169BD5;margin-right:30px;">需求管理</span>访问时间：2020-07-19 12:45:12</p>
            <p><span style="color: #169BD5;margin-right:30px;">需求审核</span>访问时间：2020-07-18 15:29:32</p>
            <p><span style="color: #169BD5;margin-right:30px;">产品管理</span>访问时间：2020-07-09 17:26:19</p>
            <p><span style="color: #169BD5;margin-right:30px;">权限管理</span>访问时间：2020-07-01 10:05:32</p>
            <p><span style="color: #169BD5;margin-right:30px;">任务管理</span>访问时间：2020-06-19 08:45:12</p>
          </div>
        </el-card>
      </el-col>
    </el-row>

  <el-row :gutter="32" style="padding:16px 16px 0;margin-bottom:15px;">
    <el-col :span="12">
      <el-card class="box-card" style="margin-left:-15px;">
          <div slot="header" class="clearfix">
            <span>产品订购</span>
            <el-select style="float:right" v-model="monthId1">
              <el-option value="6" label="6月">6月</el-option>
              <el-option value="5" label="5月">5月</el-option>
            </el-select>
            <bar-chart />
          </div>
      </el-card>
    </el-col>
    <el-col :span="12" style="padding-left:8px">
      <el-card class="box-card" style="margin-right:-15px;">
          <div slot="header" class="clearfix">
            <span>产品执行</span>
            <el-select style="float:right" v-model="monthId2">
              <el-option value="6" label="6月">6月</el-option>
              <el-option value="5" label="5月">5月</el-option>
            </el-select>
          </div>
          <div>
            <img src="../assets/image/a.png" width="250px" height="140px">
            <img src="../assets/image/a.png" width="250px" height="140px">
            <img src="../assets/image/a.png" width="250px" height="140px">
            <img src="../assets/image/a.png" width="250px" height="140px">
          </div>
      </el-card>
    </el-col>
  </el-row>

  <el-row>
    <el-card>
      <div slot="header" class="clearfix">
        <span>系统资源概览</span>
      </div>
      <div>
        <el-col :span="12"><line-chart :chartData="lineChartData.newVisitis"/></el-col>
        <el-col :span="12"><line-chart :chartData="lineChartData.messages" /></el-col>
        <el-col :span="12"><line-chart :chartData="lineChartData.purchases" /></el-col>
        <el-col :span="12"><line-chart :chartData="lineChartData.shoppings" /></el-col>
      </div>
    </el-card>
  </el-row>

    <!-- <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
import PanelGroup from './dashboard/PanelGroup'
import LineChart from './dashboard/LineChart'
import RaddarChart from './dashboard/RaddarChart'
import PieChart from './dashboard/PieChart'
import BarChart from './dashboard/BarChart'
import Gauge from './dashboard/Gauge'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    // actualData: [120, 82, 91, 154, 162, 140, 145],
    legendData: ['内存使用率']
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130],
    legendData: ['磁盘总存储','磁盘已用存储']
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    // actualData: [120, 90, 100, 138, 142, 130, 130],
    legendData: ['CPU使用率']
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130],
    legendData: ['网络输出流量','网络输入流量']
  },
  gauge1: {
    chartName: '运行任务数',
    chartValue: '40'
  },
  gauge2: {
    chartName: '今日运行成功数',
    chartValue: '15'
  },
  gauge3: {
    chartName: '今日运行失败数',
    chartValue: '20'
  },
  gauge4: {
    chartName: '暂停中任务数',
    chartValue: '5'
  }
}


export default {
  name: 'Index',
  components: {
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    Gauge
  },
  data() {
    return {
      monthId1: '6',
      monthId2: '6',
      lineChartData: lineChartData
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    format(percentage) {
      return percentage;
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 20px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}


</style>
