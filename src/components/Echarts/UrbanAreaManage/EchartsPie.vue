<template>
  <div class="echarts-pie">
    <ve-ring
      :data="chartData"
      :settings="chartSettings"
      :extend="chartExtend"
      :graphic="graphic"
      height="240px"
    ></ve-ring>
    <div class="echarts-allcharge">{{ allCharge }}</div>
    <div class="echarts-box">
      <div v-for="(list, index) in Data" :key="index" class="echarts-font">
        <span class="echarts-num">{{ list.num }}万元</span>
        <span class="echarts-percentage">{{ list.percentage }}%</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 提示信息
      chartSettings: {
        radius: [56, 70],
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
      },
      chartExtend: {
        // 图例
        legend: {
          left: "40%",
          width: 10,
          y: "center",
          color: "rgba(147,158,171,1)",
        },
        series: {
          center: ["20%", "50%"],
        },
      },
      //  环内文字设置：
      graphic: [
        {
          type: "text",
          left: "10%",
          top: "44%",
          style: {
            text: null,
            textAlign: "center",
            fill: "rgba(55,57,76,1)",
            fontSize: 20,
            color: "rgba(55,57,76,1)",
          },
        },
        {
          type: "text",
          left: "10%",
          top: "54%",
          style: {
            text: "总收入 (万元）",
            textAlign: "center",
            fill: "rgba(55,57,76,1)",
            fontSize: 12,
          },
        },
      ],
      chartData: {
        columns: ["类型", "数量"],
        rows: [
          { 类型: "移动", 数量: 138 },
          { 类型: "宽带", 数量: 138 },
          { 类型: "固话", 数量: 138 },
          { 类型: "天翼高清", 数量: 138 },
          { 类型: "专线", 数量: 138 },
          { 类型: "智家", 数量: 138 },
        ],
      },
      Data: [
        { num: 138, percentage: 20 },
        { num: 138, percentage: 20 },
        { num: 138, percentage: 20 },
        { num: 138, percentage: 20 },
        { num: 138, percentage: 20 },
        { num: 138, percentage: 20 },
      ],
      allCharge: 4243,
    };
  },
  methods: {},
};
</script>

<style lang="stylus" scoped>
.echarts-pie {
  position: relative;

  .echarts-allcharge {
    position: absolute;
    top: 44%;
    left: 13%;
    font-size: 20px;
    font-weight: 600;
    color: rgba(55, 57, 76, 1);
  }

  .echarts-box {
    position: absolute;
    top: 23%;
    left: 62%;
    line-height: 25px;

    .echarts-font {
      display: flex;

      span {
        margin-left: 10px;
        display: block;
        text-align: right;
      }

      .echarts-percentage {
        color: rgba(61, 130, 254, 1);
        width: 70px;
      }

      .echarts-percentage {
        color: rgba(61, 130, 254, 1);
        width: 50px;
      }
    }
  }
}
</style>