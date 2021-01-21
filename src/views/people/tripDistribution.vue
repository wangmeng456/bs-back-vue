<template>
  <div class="trip-distribution">
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
              <el-cascader
                v-model="form.region"
                :options="form.option"
                @change="handleChange"
              >
              </el-cascader>
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
    <div class="container">
      <div class="map-box" ref="chartMap"></div>
    </div>
  </div>
</template>

<script>
const geoJson = require("../../assets/map/data-1525844720391-Skugj-g0f.json");
export default {
  name: "",
  data() {
    return {
      form: {
        date1: "",
        date2: "",
        region: "",
        option: [
          {
            label: "北京",
            value: "beijing",
            children: [{ label: "北京市", value: "beijings" }],
          },
          {
            label: "天津",
            value: "tianjin",
            children: [{ label: "天津市", value: "tianjins" }],
          },
          {
            label: "上海",
            value: "shanghai",
            children: [{ label: "上海市", value: "shanghais" }],
          },
          {
            label: "重庆",
            value: "chongqing",
            children: [{ label: "重庆市", value: "chongqings" }],
          },
          {
            label: "河北省",
            value: "hebei",
            children: [
              { label: "石家庄市", value: "shijiazhuang" },
              { label: "唐山市", value: "tangshan" },
              { label: "秦皇岛市", value: "qinhuangdao" },
              { label: "邯郸市", value: "handan" },
              { label: "邢台市", value: "xingtai" },
              { label: "保定市", value: "baoding" },
              { label: "张家口市", value: "zhangjiakou" },
              { label: "承德市", value: "chengde" },
              { label: "沧州市", value: "cangzhou" },
            ],
          },
          {
            label: "河南省",
            value: "henan",
            children: [
              { label: "郑州市", value: "zhengzhou" },
              { label: "开封市", value: "kaifeng" },
              { label: "洛阳市", value: "luoyang" },
              { label: "平顶山市", value: "pingdingshan" },
              { label: "安阳市", value: "anyang" },
            ],
          },
          { label: "云南省", value: "yunnan" },
          { label: "辽宁省", value: "liaoning" },
          { label: "黑龙江市", value: "heilongjiang" },
          { label: "湖南省", value: "hunan" },
          { label: "安徽省", value: "anhui" },
          { label: "山东省", value: "shandong" },
          { label: "新疆省", value: "xinjiang" },
          { label: "江苏省", value: "jiangsu" },
          { label: "浙江省", value: "zhejiang" },
          { label: "江西省", value: "jiangxi" },
          { label: "湖北省", value: "hubei" },
        ],
      },
    };
  },
  mounted() {
    this.chartMap();
  },
  created() {},
  methods: {
    handleChange() {},
    chartMap() {
      this.$echarts.registerMap("tianjin", geoJson);
      var allData = {
        citys: [
          {
            name: "蓟县",
            value: [117.7831, 40.0204, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "宁河",
            value: [117.908, 39.4004, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "东丽",
            value: [117.3065, 39.0887, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "塘沽",
            value: [117.65, 39.02, 2],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "汉沽",
            value: [117.8, 39.25, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "大港",
            value: [117.45, 38.83, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
        ],
        moveLines: [
          {
            fromName: "大港",
            toName: "宁河",
            coords: [
              [117.45, 38.83],
              [117.908, 39.4004],
            ],
          },
          {
            fromName: "汉沽",
            toName: "东丽",
            coords: [
              [117.8, 39.25],
              [117.3065, 39.0887],
            ],
          },
          {
            fromName: "蓟县",
            toName: "大港",
            coords: [
              [117.7831, 40.0204],
              [117.45, 38.83],
            ],
          },
          {
            fromName: "大港",
            toName: "东丽",
            coords: [
              [117.45, 38.83],
              [117.3065, 39.0887],
            ],
          },
          {
            fromName: "汉沽",
            toName: "塘沽",
            coords: [
              [117.8, 39.25],
              [117.65, 39.02],
            ],
          },
          {
            fromName: "蓟县",
            toName: "宁河",
            coords: [
              [117.7831, 40.0204],
              [117.908, 39.4004],
            ],
          },
          {
            fromName: "蓟县",
            toName: "东丽",
            coords: [
              [117.7831, 40.0204],
              [117.3065, 39.0887],
            ],
          },
          {
            fromName: "东丽",
            toName: "宁河",
            coords: [
              [117.3065, 39.0887],
              [117.908, 39.4004],
            ],
          },
        ],
      };
      this.$echarts.init(this.$refs.chartMap).setOption({
        tooltip: {
          trigger: "item",
          formatter: "{b}",
        },
        //线颜色及飞行轨道颜色
        visualMap: {
          show: false,
          min: 0,
          max: 100,
          color: ["#0000ff", "#0000ff", "#0000ff"],
        },
        //地图相关设置
        geo: {
          map: "tianjin",
          //视角缩放比例
          zoom: 1.2,
          //显示文本样式
          label: {
            normal: {
              show: false,
              textStyle: {
                color: "#fff",
              },
            },
            emphasis: {
              textStyle: {
                color: "#fff",
              },
            },
          },
          //鼠标缩放和平移
          roam: true,
          itemStyle: {
            normal: {
              borderColor: "rgba(147, 235, 248, 1)",
              borderWidth: 1,
              color: "rgba(46, 63, 81, 127)",
              shadowColor: "rgba(128, 217, 248, 1)",
              // shadowColor: 'rgba(255, 255, 255, 1)',
              shadowOffsetX: -2,
              shadowOffsetY: 2,
              shadowBlur: 10,
            },
            emphasis: {
              areaColor: "#389BB7",
              borderWidth: 0,
            },
          },
        },
        series: [
          {
            name: "地点",
            type: "effectScatter",
            coordinateSystem: "geo",
            zlevel: 2,
            rippleEffect: {
              brushType: "stroke",
              period: 7,
              scale: 26,
            },
            label: {
              normal: {
                show: true,
                formatter: "{b}",
                position: "right",
                textStyle: {
                  color: "#1DE9B6",
                },
              },
              emphasis: {
                show: true,
                position: "right",
                formatter: "{b}",
              },
            },
            symbolSize: 2,
            showEffectOn: "render",
            itemStyle: {
              normal: {
                color: "#46bee9",
              },
            },
            data: allData.citys,
          },
          {
            name: "线路",
            type: "lines",
            coordinateSystem: "geo",
            zlevel: 2,
            large: true,
            effect: {
              show: true,
              constantSpeed: 30,
              symbol: "arrow", //ECharts 提供的标记类型包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
              symbolSize: 6,
              trailLength: 0,
            },
            lineStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "#58B3CC",
                    },
                    {
                      offset: 1,
                      color: "#F58158",
                    },
                  ],
                  false
                ),
                width: 1,
                opacity: 0.6,
                curveness: 0.2,
              },
            },
            data: allData.moveLines,
          },
        ],
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.trip-distribution {
  padding: 10px;
  .header {
    border: 1px solid #d8dce5;
    padding-top: 20px;
    background: #ffffff;
    .line {
      margin-left: 8px;
    }
  }
  .container {
    display: flex;
    background: #ffffff;
    margin-top: 10px;
    .map-box {
      width: 100%;
      height: 100vh;
    }
  }
}
</style>