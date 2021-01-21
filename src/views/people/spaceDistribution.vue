<template>
  <div class="space-distribution">
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
                @change="handleChange">
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
    <div id="chart"></div>
    <div class="box">
      <div class="title">人群密集区域top5：</div>
      <el-table :data="tableData" border>
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="区域名称" prop="name" width="100"></el-table-column>
        <el-table-column label="密集指数" prop="num"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { MP } from "@/components/baiduMap/map";
const uploadedDataURL = require("../../assets/map/data-1464248983149-HJ1jcQNX.json");
export default {
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
      tableData: [
        { name: "沙孟海旧居", num: 6.2 },
        { name: "湖滨银泰", num: 5.7 },
        { name: "孤山公园", num: 5.4 },
        { name: "花巷观鱼", num: 5.4 },
        { name: "万松书院", num: 5.1 },
      ],
    };
  },
  mounted() {
    this.$nextTick(function () {
      MP("sh1GF7tVfNCfNKyVqofuwnPXZQ7lH7aT").then((BMap) => {
        //调用api
        this.chartMap();
      });
    });
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    chartMap() {
      let myChart = this.$echarts.init(document.getElementById("chart"));
      var points = [].concat.apply(
        [],
        uploadedDataURL.map(function (track) {
          return track.map(function (seg) {
            return seg.coord.concat([1]);
          });
        })
      );
      myChart.setOption({
        animation: false,
        bmap: {
          center: [120.13066322374, 30.240018034923],
          zoom: 14,
          roam: true,
        },
        visualMap: {
          show: false,
          top: "top",
          min: 0,
          max: 5,
          seriesIndex: 0,
          calculable: true,
          inRange: {
            color: ["blue", "blue", "green", "yellow", "red"],
          },
        },
        series: [
          {
            type: "heatmap",
            coordinateSystem: "bmap",
            data: points,
            pointSize: 5,
            blurSize: 6,
          },
        ],
      });
      var bmap = myChart.getModel().getComponent("bmap").getBMap();
      bmap.addControl(new BMap.MapTypeControl());
    },
  },
};
</script>

<style lang="stylus">
.space-distribution {
  position: relative;

  .header {
    width: 100%;
    border: 1px solid #d8dce5;
    padding-top: 20px;
    background: #ffffff;

    .line {
      margin-left: 8px;
    }
  }

  #chart {
    width: 100%;
    height: 100vh;

    .BMap_cpyCtrl {
      display: none;
    }

    .anchorBL {
      display: none;
    }
  }

  .box {
    position: absolute;
    top: 88px;
    right: 10px;
    background: rgba(255, 255, 255, 0.8);
  }
}
</style>
