<!-- 人群结构分析 -->
<template>
  <div class="errPage-container">
    <div class="header">
      <el-form ref="form" :model="form" label-width="100px">
        <el-row>
          <el-col :span="10">
            <el-form-item label="时间维度：">
              <el-col :span="11">
                <el-date-picker
                  type="datetime"
                  placeholder="选择日期时间"
                  v-model="form.date1"
                  style="width: 100%"
                ></el-date-picker>
              </el-col>
              <el-col class="line" :span="1">—</el-col>
              <el-col :span="11">
                <el-date-picker
                  placeholder="选择日期时间"
                  type="datetime"
                  v-model="form.date2"
                  style="width: 100%"
                ></el-date-picker>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="地域维度">
              <el-select v-model="form.region" placeholder="请选择区域">
                <el-option
                  v-for="(item, index) in form.option"
                  :key="index"
                  :label="item.name"
                  :value="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button type="primary">查询</el-button>
              <el-button type="success">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="main">
      <div class="box-header">
        <div>人群位置统计</div>
        <div>
          <el-button type="text">详情></el-button>
        </div>
      </div>
      <div class="box-container">
        <el-row>
          <el-col :span="10">
            <div class="box-map" ref="chartMap"></div>
          </el-col>
          <el-col :span="14">
            <div class="box-pie">
              <div>
                <div class="pie" ref="pieOne"></div>
                <div class="pie" ref="pieThree"></div>
              </div>
              <div>
                <div class="pie" ref="pieTwo"></div>
                <div class="pie" ref="pieFour"></div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="main">
      <div class="box-header">
        <div>指标数据</div>
        <div>
          <el-button type="text">详情></el-button>
        </div>
      </div>
      <div class="box-table">
        <el-table :data="tableData" border>
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column label="人群名称" prop="name"></el-table-column>
          <el-table-column label="人群数量" prop="num"></el-table-column>
          <el-table-column label="人群定义" prop="definition"></el-table-column>
          <el-table-column label="漫游国家" prop="country"></el-table-column>
          <el-table-column label="漫游省市" prop="city"></el-table-column>
          <el-table-column label="归属地" prop="ascription"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import "../../../node_modules/echarts/map/js/china.js";
export default {
  name: "",
  data() {
    return {
      form: {
        date1: "",
        date2: "",
        region: "全国",
        option: [
          { name: "全国" },
          { name: "北京" },
          { name: "天津" },
          { name: "上海" },
          { name: "重庆" },
          { name: "河北" },
          { name: "河南" },
          { name: "云南" },
          { name: "辽宁" },
          { name: "黑龙江" },
          { name: "湖南" },
          { name: "安徽" },
          { name: "山东" },
          { name: "新疆" },
          { name: "江苏" },
          { name: "浙江" },
          { name: "江西" },
          { name: "湖北" },
          { name: "广西" },
          { name: "甘肃" },
          { name: "山西" },
          { name: "内蒙古" },
          { name: "陕西" },
          { name: "吉林" },
          { name: "福建" },
          { name: "贵州" },
          { name: "广东" },
          { name: "青海" },
          { name: "西藏" },
          { name: "四川" },
          { name: "宁夏" },
          { name: "海南" },
          { name: "台湾" },
          { name: "香港" },
          { name: "澳门" },
        ],
      },
      tableData: [
        {
          name: "人群1",
          num: 13,
          definition: "季节性人口",
          country: "中国、英国、美国等17个",
          city: "北京、上海、河北等24个",
          ascription: "北京、上海、河北等24个",
        },
        {
          name: "人群2",
          num: 154,
          definition: "游客",
          country: "中国",
          city: "北京、上海、河北等24个",
          ascription: "北京、上海、河北等24个",
        },
        {
          name: "人群3",
          num: 32,
          definition: "办事人群",
          country: "中国",
          city: "北京、上海、河北等24个",
          ascription: "北京、上海、河北等24个",
        },
        {
          name: "人群4",
          num: 59,
          definition: "异常人群",
          country: "中国",
          city: "北京、上海、河北等24个",
          ascription: "北京、上海、河北等24个",
        },
        {
          name: "人群5",
          num: 64,
          definition: "流动人口",
          country: "中国",
          city: "北京、上海、河北等24个",
          ascription: "北京、上海、河北等24个",
        },
        {
          name: "人群6",
          num: 11,
          definition: "过境人口",
          country: "中国、英国、美国等17个",
          city: "北京、上海、河北等24个",
          ascription: "北京、上海、河北等24个",
        },
        {
          name: "人群7",
          num: 13,
          definition: "短停留人口",
          country: "中国",
          city: "北京、上海、河北等24个",
          ascription: "北京、上海、河北等24个",
        },
        {
          name: "人群8",
          num: 13,
          definition: "居住人口",
          country: "中国",
          city: "北京",
          ascription: "北京",
        },
        {
          name: "人群9",
          num: 13,
          definition: "工作人口",
          country: "中国",
          city: "北京、上海",
          ascription: "北京、上海",
        },
      ],
    };
  },
  mounted() {
    this.chartMap();
    this.chartPieOne();
    this.chartPieTwo();
    this.chartPieThree();
    this.chartPieFour();
  },
  methods: {
    chartMap() {
      var province = [
        "北京",
        "广东",
        "浙江",
        "湖南",
        "河南",
        "安徽",
        "重庆",
        "山东",
        "江西",
        "四川",
        "江苏",
        "湖北",
        "福建",
        "上海",
        "广西",
        "河北",
        "陕西",
        "云南",
        "海南",
        "黑龙江",
        "辽宁",
        "山西",
        "天津",
        "甘肃",
        "内蒙古",
        "新疆",
        "宁夏",
        "吉林",
        "贵州",
        "青海",
        "西藏",
        "澳门",
        "香港",
        "台湾",
      ];
      var data = [
        3554,
        241,
        296,
        221,
        206,
        152,
        147,
        121,
        109,
        108,
        99,
        91,
        80,
        80,
        58,
        48,
        56,
        51,
        43,
        37,
        34,
        27,
        24,
        24,
        16,
        13,
        12,
        9,
        9,
        6,
        0,
        7,
        8,
        8,
      ];
      var res = [];
      for (var j = 0; j < data.length; j++) {
        res.push({
          name: province[j],
          value: data[j],
        });
      }
      res.sort(function (a, b) {
        return a.value - b.value;
      });
      this.$echarts.init(this.$refs.chartMap).setOption({
        tooltip: {
          show: true,
          formatter: function (params) {
            return params.name + "：" + params.value;
          },
        },
        visualMap: {
          type: "piecewise",
          text: ["头", ""],
          pieces: [
            {
              min: 1002,
              color: "#73240D",
            },
            {
              min: 501,
              max: 1001,
              color: "#BB0000",
            },
            {
              min: 251,
              max: 500,
              color: "#BD430A",
            },
            {
              min: 101,
              max: 250,
              color: "#E08150",
            },
            {
              min: 11,
              max: 100,
              color: "#E9B090",
            },
            {
              min: 1,
              max: 10,
              color: "#F2DDD2",
            },
            {
              value: 0,
              color: "white",
            },
          ],
          orient: "vertical",
          itemSymbol: "circle",
          itemWidth: 15,
          itemHeight: 15,
          showLabel: true,
          seriesIndex: [0],
          textStyle: {
            color: "#7B93A7",
          },
          bottom: "0%",
          left: "4%",
        },
        grid: {
          left: "40%",
          top: "0%",
          bottom: '0%'
        },
        xAxis: {
          min: 0,
          max: 4000,
          show: false,
        },
        yAxis: {
          show: false,
        },
        geo: {
          map: "china",
          label: {
            emphasis: {
              show: false,
            },
          },
          itemStyle: {
            emphasis: {
              areaColor: "#99FF99",
            },
          },
        },
        series: [
          {
            type: "map",
            map: "china",
            roam: false,
            geoIndex: 0,
            label: {
              show: false,
            },
            data: res,
          },
        ],
      });
    },
    chartPieOne() {
      let title = "总量";
      let color = [
        "#0E7CE2",
        "#FF8352",
        "#E271DE",
        "#F8456B",
        "#00FFFF",
        "#4AEAB0",
      ];
      let echartData = [
        {
          name: "0-12岁",
          value: "3720",
        },
        {
          name: "13-26岁",
          value: "2920",
        },
        {
          name: "27-60岁",
          value: "2200",
        },
        {
          name: "大于60岁",
          value: "1420",
        },
      ];

      let formatNumber = function (num) {
        let reg = /(?=(\B)(\d{3})+$)/g;
        return num.toString().replace(reg, ",");
      };
      let total = echartData.reduce((a, b) => {
        return a + b.value * 1;
      }, 0);
      this.$echarts.init(this.$refs.pieOne).setOption({
        color: color,
        tooltip: {
          trigger: "item",
        },
        title: {
          text: "{name|" + title + "}\n{val|" + formatNumber(total) + "}",
          top: "center",
          left: "center",
          textStyle: {
            rich: {
              name: {
                fontSize: 12,
                fontWeight: "normal",
                color: "#666666",
                padding: [4, 0],
              },
              val: {
                fontSize: 14,
                fontWeight: "bold",
                color: "#333333",
              },
            },
          },
        },
        series: [
          {
            type: "pie",
            radius: ["30%", "40%"],
            center: ["50%", "50%"],
            data: echartData,
            hoverAnimation: false,
            itemStyle: {
              normal: {
                borderColor: "#fff",
                borderWidth: 1,
              },
            },
            labelLine: {
              normal: {
                length: 20,
                length2: 80,
                lineStyle: {
                  color: "#e6e6e6",
                },
              },
            },
            label: {
              normal: {
                formatter: (params) => {
                  return (
                    "{icon|●}{name|" +
                    params.name +
                    "}{value|" +
                    formatNumber(params.value) +
                    "}"
                  );
                },
                padding: [0, -100, 20, -100],
                rich: {
                  icon: {
                    fontSize: 12,
                  },
                  name: {
                    fontSize: 12,
                    padding: [0, 4, 0, 4],
                    color: "#666666",
                  },
                  value: {
                    fontSize: 12,
                    fontWeight: "bold",
                    color: "#333333",
                  },
                },
              },
            },
          },
        ],
      });
    },
    chartPieTwo() {
      let title = "总量";
      let echartData = [
        {
          name: "公交出行",
          value: "10994",
        },
        {
          name: "地铁出行",
          value: "5392",
        },
        {
          name: "骑行",
          value: "22055",
        },
        {
          name: "步行",
          value: "10995",
        },
        {
          name: "自驾出行",
          value: "9964",
        },
        {
          name: "其他",
          value: "10565",
        },
      ];

      let formatNumber = function (num) {
        let reg = /(?=(\B)(\d{3})+$)/g;
        return num.toString().replace(reg, ",");
      };
      let total = echartData.reduce((a, b) => {
        return a + b.value * 1;
      }, 0);
      this.$echarts.init(this.$refs.pieTwo).setOption({
        tooltip: {
          trigger: "item",
        },
        title: {
          text: "{name|" + title + "}\n{val|" + formatNumber(total) + "}",
          top: "center",
          left: "center",
          textStyle: {
            rich: {
              name: {
                fontSize: 12,
                fontWeight: "normal",
                color: "#666666",
                padding: [4, 0],
              },
              val: {
                fontSize: 14,
                fontWeight: "bold",
                color: "#333333",
              },
            },
          },
        },
        series: [
          {
            type: "pie",
            radius: ["30%", "40%"],
            center: ["50%", "50%"],
            data: echartData,
            hoverAnimation: false,
            itemStyle: {
              normal: {
                borderColor: "#fff",
                borderWidth: 1,
              },
            },
            labelLine: {
              normal: {
                length: 20,
                length2: 80,
                lineStyle: {
                  color: "#e6e6e6",
                },
              },
            },
            label: {
              normal: {
                formatter: (params) => {
                  return (
                    "{icon|●}{name|" +
                    params.name +
                    "}{value|" +
                    formatNumber(params.value) +
                    "}"
                  );
                },
                padding: [0, -100, 20, -100],
                rich: {
                  icon: {
                    fontSize: 12,
                  },
                  name: {
                    fontSize: 12,
                    padding: [0, 4, 0, 4],
                    color: "#666666",
                  },
                  value: {
                    fontSize: 12,
                    fontWeight: "bold",
                    color: "#333333",
                  },
                },
              },
            },
          },
        ],
      });
    },
    chartPieThree() {
      let title = "总量";
      let echartData = [
        {
          name: "党政机关工作人员",
          value: "5502",
        },
        {
          name: "自由职业",
          value: "1305",
        },
        {
          name: "企事业单位",
          value: "7743",
        },
        {
          name: "名誉企业",
          value: "11243",
        },
        {
          name: "其他",
          value: "5592",
        },
      ];

      let formatNumber = function (num) {
        let reg = /(?=(\B)(\d{3})+$)/g;
        return num.toString().replace(reg, ",");
      };
      let total = echartData.reduce((a, b) => {
        return a + b.value * 1;
      }, 0);
      this.$echarts.init(this.$refs.pieThree).setOption({
        tooltip: {
          trigger: "item",
        },
        title: {
          text: "{name|" + title + "}\n{val|" + formatNumber(total) + "}",
          top: "center",
          left: "center",
          textStyle: {
            rich: {
              name: {
                fontSize: 12,
                fontWeight: "normal",
                color: "#666666",
                padding: [4, 0],
              },
              val: {
                fontSize: 14,
                fontWeight: "bold",
                color: "#333333",
              },
            },
          },
        },
        series: [
          {
            type: "pie",
            radius: ["30%", "40%"],
            center: ["50%", "50%"],
            data: echartData,
            hoverAnimation: false,
            itemStyle: {
              normal: {
                borderColor: "#fff",
                borderWidth: 1,
              },
            },
            labelLine: {
              normal: {
                length: 20,
                length2: 80,
                lineStyle: {
                  color: "#e6e6e6",
                },
              },
            },
            label: {
              normal: {
                formatter: (params) => {
                  return (
                    "{icon|●}{name|" +
                    params.name +
                    "}{value|" +
                    formatNumber(params.value) +
                    "}"
                  );
                },
                padding: [0, -100, 20, -100],
                rich: {
                  icon: {
                    fontSize: 12,
                  },
                  name: {
                    fontSize: 12,
                    padding: [0, 4, 0, 4],
                    color: "#666666",
                  },
                  value: {
                    fontSize: 12,
                    fontWeight: "bold",
                    color: "#333333",
                  },
                },
              },
            },
          },
        ],
      });
    },
    chartPieFour() {
      let title = "总量";
      let color = [
        "#0E7CE2",
        "#FF8352",
        "#E271DE",
        "#F8456B",
        "#00FFFF",
        "#4AEAB0",
      ];
      let echartData = [
        {
          name: "男",
          value: "32883",
        },
        {
          name: "女",
          value: "31085",
        },
      ];

      let formatNumber = function (num) {
        let reg = /(?=(\B)(\d{3})+$)/g;
        return num.toString().replace(reg, ",");
      };
      let total = echartData.reduce((a, b) => {
        return a + b.value * 1;
      }, 0);
      this.$echarts.init(this.$refs.pieFour).setOption({
        color: color,
        tooltip: {
          trigger: "item",
        },
        title: {
          text: "{name|" + title + "}\n{val|" + formatNumber(total) + "}",
          top: "center",
          left: "center",
          textStyle: {
            rich: {
              name: {
                fontSize: 12,
                fontWeight: "normal",
                color: "#666666",
                padding: [4, 0],
              },
              val: {
                fontSize: 14,
                fontWeight: "bold",
                color: "#333333",
              },
            },
          },
        },
        series: [
          {
            type: "pie",
            radius: ["30%", "40%"],
            center: ["50%", "50%"],
            data: echartData,
            hoverAnimation: false,
            itemStyle: {
              normal: {
                borderColor: "#fff",
                borderWidth: 1,
              },
            },
            labelLine: {
              normal: {
                length: 20,
                length2: 80,
                lineStyle: {
                  color: "#e6e6e6",
                },
              },
            },
            label: {
              normal: {
                formatter: (params) => {
                  return (
                    "{icon|●}{name|" +
                    params.name +
                    "}{value|" +
                    formatNumber(params.value) +
                    "}"
                  );
                },
                padding: [0, -100, 20, -100],
                rich: {
                  icon: {
                    fontSize: 12,
                  },
                  name: {
                    fontSize: 12,
                    padding: [0, 4, 0, 4],
                    color: "#666666",
                  },
                  value: {
                    fontSize: 12,
                    fontWeight: "bold",
                    color: "#333333",
                  },
                },
              },
            },
          },
        ],
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.errPage-container {
  padding: 10px;
  .header {
    border: 1px solid #d8dce5;
    padding-top: 20px;
    background: #ffffff;
    .line {
      margin-left: 8px;
    }
  }
  .main {
    border: 1px solid #d8dce5;
    margin-top: 10px;
    background: #ffffff;
    .box-header {
      background: #d8dce5;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 16px;
      padding: 0 15px;
    }
    .box-container {
      .box-map {
        width: 100%;
        height: 450px;
        margin: 10px;
      }
      .box-pie {
        width: 100%;
        height: 450px;
        margin: 10px;
        display: flex;
        .pie {
          width: 370px;
          height: 225px;
        }
      }
    }
    .box-table {
      padding: 10px;
    }
  }
}
</style>
