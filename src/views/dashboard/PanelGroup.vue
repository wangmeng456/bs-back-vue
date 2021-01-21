<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="16" :sm="16" :lg="8" class="card-panel-col" style="padding-left: 20px; padding-right: 3px;">
      <div class="card-panel">
        <div class="card-panel-description">
          <div class="card-panel-text">
            <p style="margin-top:-10px">公告消息</p><br><br>
            <p style="font-size:14px;"><span style="color:rgb(22, 155, 213);">【重大消息】系统上线通知</span><span style="float:right">2020-07-19 12:45:12</span></p><br>
            <p style="font-size:14px;"><span style="color:rgb(22, 155, 213);">【重大消息】系统上线通知</span><span style="float:right">2020-07-18 15:29:32</span></p>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="16" :sm="16" :lg="8" class="card-panel-col" style="padding-left: 20px; padding-right: 2px;" >
      <div class="card-panel">
        <div class="card-panel-description">
          <div class="card-panel-text">
            <p style="margin-top:-8px">待办及通知</p><br>
          </div>
          <div class="card-panel-num">
            <br>
            <i class="el-icon-time" style="margin-right:10px"></i>待处理<span style="color:red;margin-left:5px">(5)</span>
            <i class="el-icon-s-comment" style="margin-left:30px;margin-right:10px"></i>待阅知<span style="color:red;margin-left:5px">(3)</span>
            <i class="el-icon-bell" style="margin-left:30px;margin-right:10px;"></i>任务预警 <span style="color:red;margin-left:5px">(3)</span>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="16" :sm="16" :lg="8" class="card-panel-col" style="padding-left: 23px; padding-right: 20px;" >
      <div class="card-panel">
        <div class="card-panel-description">
          <div class="card-panel-text" style="margin-top:-20px">
            <input placeholder="请输入搜索关键字" size="45">
          </div>
          <div>
            <span style="font-size:20px;color: #169BD5;font-weight: 400;float:left;margin-right:20px">网格分布</span>
            <p style="font-size:16px;color: #169BD5;font-weight: 400;text-align:center">产品类型</p>
            <span style="font-size:10px;color: #169BD5;font-weight: 400;margin-left:10px">京津冀</span>
            <span style="font-size:10px;color: #169BD5;font-weight: 400;margin-left:40px">职住分布</span>
            <span style="font-size:10px;color: #169BD5;font-weight: 400;margin-left:40px">出行OD</span>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      // font-weight: bold;
      margin: 26px;
      margin-left: 10px;

      .card-panel-text {
        line-height: 14px;
        color: #303133;
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 12px;
        color: #7F7F7F;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
