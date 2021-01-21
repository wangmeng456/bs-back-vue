<template>
  <div class="urban-commuting">
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
    <div class="table-box">
      <div class="box">
        <div class="title">早高峰高压线路top5：</div>
        <el-table :data="tableOne" border>
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column
            label="线路"
            prop="name"
            width="300"
          ></el-table-column>
          <el-table-column label="压力指数" prop="num"></el-table-column>
        </el-table>
      </div>
      <div class="box">
        <div class="title">晚高峰高压线路top5：</div>
        <el-table :data="tableTwo" border>
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column
            label="线路"
            prop="name"
            width="300"
          ></el-table-column>
          <el-table-column label="压力指数" prop="num"></el-table-column>
        </el-table>
      </div>
    </div>
    <div class="map-box" ref="chartMap"></div>
    </div>
  </div>
</template>

<script>
const geoJson = require("../../assets/map/data-1491386042704-Hkma0Efae.json");
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
      tableOne: [
        { name: "万科四季花城 - 三水横涌小学", num: 5.7 },
        { name: "明珠广场 - 三水港", num: 5.4 },
        { name: "尚苑 - 禅城机关幼儿园", num: 5.0 },
        { name: "万科四季花城 - 佛山高明明城工业区", num: 4.2 },
        { name: "东逸湾 - 南海中部泌冲市场商圈", num: 4.1 },
      ],
      tableTwo: [
        { name: "白坭富景小区 - 天湖村", num: 6.2 },
        { name: "佛山顺德容桂高黎工业区 - 三水港", num: 5.7 },
        { name: "地质队社区 - 大沥黄岐教表村", num: 5.4 },
        { name: "三水港 - 银海花园", num: 5.1 },
        { name: "顺德大良五沙三村商圈 - 恒大绿洲", num: 5.1 },
      ],
    };
  },
  mounted() {
    this.chartMap();
  },
  created() {},
  methods: {
    handleChange() {},
    chartMap() {
      this.$echarts.registerMap("北京市", geoJson);
      var allData = {
        citys: [
          {
            name: "顺德骏景豪庭",
            value: [113.236176, 22.919394, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "万科四季花城",
            value: [113.177772, 23.153551, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "尚苑",
            value: [113.142224, 22.721752, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "明珠广场",
            value: [113.1867, 23.113249, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "中南花园",
            value: [113.185643, 23.112743, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "岐江广场",
            value: [113.186111, 23.11404, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "丽景花园",
            value: [113.132947, 23.05089, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "白坭东岸小区",
            value: [112.8315, 23.0691, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "东逸湾",
            value: [113.330212, 22.792532, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "保利西子湾",
            value: [113.201623, 23.144643, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "碧翠苑",
            value: [113.200595, 23.094307, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "南海桂城奥园1号",
            value: [113.159177, 23.054125, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "万科金域中央",
            value: [113.138838, 23.053317, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "银海花园",
            value: [113.196568, 23.117982, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "海边村",
            value: [112.890602, 23.080612, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "碧桂园钻石湾",
            value: [113.258961, 22.849472, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "白坭富景小区",
            value: [112.8315, 23.0691, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "地质队社区",
            value: [112.874433, 23.176433, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "童梦天下",
            value: [113.053744, 23.015997, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "中海金沙湾",
            value: [113.198868, 23.142318, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "恒大绿洲",
            value: [113.201623, 23.144643, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "中海金沙馨园",
            value: [113.201623, 23.144643, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "中海金沙里",
            value: [113.200258, 23.19425, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "滨江一号",
            value: [113.164106, 23.069926, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "圣堂大街",
            value: [113.0989, 23.0325, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "中南海晖园",
            value: [113.184806, 23.111063, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "瑞安花园",
            value: [113.194535, 23.113525, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "东江国际",
            value: [113.115894, 22.993351, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "恒翠华庭",
            value: [113.275128, 22.771464, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "三水横涌小学",
            value: [112.8832, 23.182, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "顺德均安尚苑",
            value: [113.142224, 22.721752, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "三水港",
            value: [112.80517, 23.10261, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "禅城机关幼儿园",
            value: [113.1195, 23.0334, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "普君新城",
            value: [113.121512, 23.028384, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "佛山高明明城工业区",
            value: [112.68624, 22.86305, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "顺德星座尚筑",
            value: [113.138749, 22.720182, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "天湖村",
            value: [112.93096, 23.058213, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "禅城福宁幼儿园",
            value: [113.11098, 23.02907, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "南海中部泌冲市场商圈",
            value: [113.18952, 23.14759, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "佛山顺德容桂容边工业区",
            value: [113.30051, 22.74846, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "佛山顺德容桂高黎工业区",
            value: [113.3217, 22.7741, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "均安尚苑",
            value: [113.110422, 22.780161, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "双城尚都",
            value: [113.132212, 23.026091, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "平洲公园",
            value: [113.2081, 23.0388, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "和丰明苑",
            value: [112.935948, 23.036155, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "佛山顺德龙江苏溪工业区",
            value: [113.029, 22.8642, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "佛山顺德均安凌西工业区",
            value: [113.1009, 22.7069, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "顺德线现代名邸",
            value: [113.145507, 22.718105, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "大沥黄岐教表村",
            value: [113.2, 23.1107, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "金融高新区地铁站",
            value: [113.1538, 23.0691, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "佛山顺德龙江榔头工业区",
            value: [113.25036, 22.95023, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "顺德大良五沙三村商圈",
            value: [113.3449, 22.818, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "公安小区",
            value: [113.115128, 23.025863, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "高明千禧小学",
            value: [112.46607, 22.75148, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "御江南",
            value: [112.883757, 23.125835, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "广东省交通运输高级技工学校",
            value: [113.1334, 23.0392, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "柏悦湾",
            value: [113.309537, 22.748808, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "三水城南白坭商业中心商圈",
            value: [112.8361, 23.0669, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "云东海",
            value: [112.84791, 23.23578, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "佛山顺德均安畅兴工业园东区",
            value: [113.17237, 22.68473, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "东江花苑",
            value: [113.12478, 23.007051, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "御翠豪苑",
            value: [113.134102, 22.72146, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
          {
            name: "风度国际名苑",
            value: [113.182976, 23.112355, 4],
            symbolSize: 2,
            itemStyle: { normal: { color: "#F58158" } },
          },
        ],

        moveLines: [
          {
            fromName: "顺德骏景豪庭",
            toName: "恒翠华庭",
            coords: [
              [113.167352, 23.094106],
              [113.2751, 22.7715],
            ],
          },
          {
            fromName: "万科四季花城",
            toName: "三水横涌小学",
            coords: [
              [113.177772, 23.153551],
              [112.8832, 23.182],
            ],
          },
          {
            fromName: "尚苑",
            toName: "尚苑",
            coords: [
              [113.142224, 22.721752],
              [113.1195, 23.0334],
            ],
          },
          {
            fromName: "尚苑",
            toName: "尚苑",
            coords: [
              [113.142224, 22.721752],
              [113.11924, 23.03333],
            ],
          },
          {
            fromName: "尚苑",
            toName: "尚苑",
            coords: [
              [113.142224, 22.721752],
              [113.11944, 23.03331],
            ],
          },
          {
            fromName: "尚苑",
            toName: "顺德均安尚苑",
            coords: [
              [113.119289, 23.031254],
              [113.14184, 22.72247],
            ],
          },
          {
            fromName: "明珠广场",
            toName: "三水港",
            coords: [
              [113.1867, 23.113249],
              [112.80517, 23.10261],
            ],
          },
          {
            fromName: "中南花园",
            toName: "三水港",
            coords: [
              [113.185643, 23.112743],
              [112.80517, 23.10261],
            ],
          },
          {
            fromName: "岐江广场",
            toName: "三水港",
            coords: [
              [113.186111, 23.11404],
              [112.80517, 23.10261],
            ],
          },
          {
            fromName: "尚苑",
            toName: "顺德均安尚苑",
            coords: [
              [113.119289, 23.031254],
              [113.14295, 22.72161],
            ],
          },
          {
            fromName: "尚苑",
            toName: "顺德均安尚苑",
            coords: [
              [113.119289, 23.031254],
              [113.14184, 22.72243],
            ],
          },
          {
            fromName: "尚苑",
            toName: "尚苑",
            coords: [
              [113.142224, 22.721752],
              [113.11982, 23.03011],
            ],
          },
          {
            fromName: "尚苑",
            toName: "禅城机关幼儿园",
            coords: [
              [113.142224, 22.721752],
              [113.1195, 23.0334],
            ],
          },
          {
            fromName: "尚苑",
            toName: "禅城机关幼儿园",
            coords: [
              [113.142224, 22.721752],
              [113.11231, 23.028955],
            ],
          },
          {
            fromName: "丽景花园",
            toName: "丽景花园",
            coords: [
              [113.132947, 23.05089],
              [113.2658, 22.7414],
            ],
          },
          {
            fromName: "丽景花园",
            toName: "丽景花园",
            coords: [
              [113.122755, 22.992649],
              [113.2658, 22.7414],
            ],
          },
          {
            fromName: "尚苑",
            toName: "普君新城",
            coords: [
              [113.142224, 22.721752],
              [113.11851, 23.02872],
            ],
          },
          {
            fromName: "万科四季花城",
            toName: "佛山高明明城工业区",
            coords: [
              [113.177772, 23.153551],
              [112.68624, 22.86305],
            ],
          },
          {
            fromName: "尚苑",
            toName: "顺德星座尚筑",
            coords: [
              [113.119289, 23.031254],
              [113.140657, 22.721939],
            ],
          },
          {
            fromName: "白坭东岸小区",
            toName: "天湖村",
            coords: [
              [112.833471, 23.068157],
              [113.14686, 23.01465],
            ],
          },
          {
            fromName: "尚苑",
            toName: "禅城福宁幼儿园",
            coords: [
              [113.142224, 22.721752],
              [113.11098, 23.02907],
            ],
          },
          {
            fromName: "尚苑",
            toName: "禅城福宁幼儿园",
            coords: [
              [113.142224, 22.721752],
              [113.113625, 23.029335],
            ],
          },
          {
            fromName: "尚苑",
            toName: "禅城机关幼儿园",
            coords: [
              [113.142224, 22.721752],
              [113.11947, 23.03335],
            ],
          },
          {
            fromName: "东逸湾",
            toName: "南海中部泌冲市场商圈",
            coords: [
              [113.330212, 22.792532],
              [113.19071, 23.14488],
            ],
          },
          {
            fromName: "尚苑",
            toName: "普君新城",
            coords: [
              [113.142224, 22.721752],
              [113.12215, 23.02806],
            ],
          },
          {
            fromName: "万科四季花城",
            toName: "佛山高明明城工业区",
            coords: [
              [113.177772, 23.153551],
              [112.6862, 22.8632],
            ],
          },
          {
            fromName: "万科四季花城",
            toName: "佛山高明明城工业区",
            coords: [
              [113.177772, 23.153551],
              [112.69842, 22.88509],
            ],
          },
          {
            fromName: "东逸湾",
            toName: "南海中部泌冲市场商圈",
            coords: [
              [113.330212, 22.792532],
              [113.18755, 23.14482],
            ],
          },
          {
            fromName: "东逸湾",
            toName: "南海中部泌冲市场商圈",
            coords: [
              [113.330212, 22.792532],
              [113.18952, 23.14759],
            ],
          },
          {
            fromName: "保利西子湾",
            toName: "佛山顺德容桂容边工业区",
            coords: [
              [113.201623, 23.144643],
              [113.30051, 22.74846],
            ],
          },
          {
            fromName: "碧翠苑",
            toName: "三水横涌小学",
            coords: [
              [113.200595, 23.094307],
              [112.8832, 23.182],
            ],
          },
          {
            fromName: "南海桂城奥园1号",
            toName: "佛山顺德容桂高黎工业区",
            coords: [
              [113.159177, 23.054125],
              [113.3217, 22.7741],
            ],
          },
          {
            fromName: "万科金域中央",
            toName: "佛山顺德容桂高黎工业区",
            coords: [
              [113.138838, 23.053317],
              [113.3217, 22.7741],
            ],
          },
          {
            fromName: "尚苑",
            toName: "尚苑",
            coords: [
              [113.142224, 22.721752],
              [113.11949, 23.03334],
            ],
          },
          {
            fromName: "尚苑",
            toName: "均安尚苑",
            coords: [
              [113.119289, 23.031254],
              [113.1394, 22.7177],
            ],
          },
          {
            fromName: "尚苑",
            toName: "双城尚都",
            coords: [
              [113.142224, 22.721752],
              [113.1278, 23.032],
            ],
          },
          {
            fromName: "银海花园",
            toName: "三水港",
            coords: [
              [113.196568, 23.117982],
              [112.8052, 23.1026],
            ],
          },
          {
            fromName: "海边村",
            toName: "平洲公园",
            coords: [
              [112.890602, 23.080612],
              [113.20814, 23.03883],
            ],
          },
          {
            fromName: "碧桂园钻石湾",
            toName: "和丰明苑",
            coords: [
              [113.258961, 22.849472],
              [112.9068, 23.0384],
            ],
          },
          {
            fromName: "保利西子湾",
            toName: "佛山顺德龙江苏溪工业区",
            coords: [
              [113.201623, 23.144643],
              [113.02895, 22.86421],
            ],
          },
          {
            fromName: "尚苑",
            toName: "佛山顺德均安凌西工业区",
            coords: [
              [113.119289, 23.031254],
              [113.10097, 22.70701],
            ],
          },
          {
            fromName: "尚苑",
            toName: "顺德线现代名邸",
            coords: [
              [113.119289, 23.031254],
              [113.1455, 22.7181],
            ],
          },
          {
            fromName: "白坭富景小区",
            toName: "天湖村",
            coords: [
              [112.8315, 23.0691],
              [113.14686, 23.01465],
            ],
          },
          {
            fromName: "南海桂城奥园1号",
            toName: "佛山顺德容桂高黎工业区",
            coords: [
              [113.159177, 23.054125],
              [113.32216, 22.77427],
            ],
          },
          {
            fromName: "万科金域中央",
            toName: "佛山顺德容桂高黎工业区",
            coords: [
              [113.138838, 23.053317],
              [113.32216, 22.77427],
            ],
          },
          {
            fromName: "地质队社区",
            toName: "大沥黄岐教表村",
            coords: [
              [112.8709, 23.1755],
              [113.1927, 23.1091],
            ],
          },
          {
            fromName: "尚苑",
            toName: "顺德均安尚苑",
            coords: [
              [113.119289, 23.031254],
              [113.14184, 22.72246],
            ],
          },
          {
            fromName: "银海花园",
            toName: "三水港",
            coords: [
              [113.196568, 23.117982],
              [112.80517, 23.10261],
            ],
          },
          {
            fromName: "童梦天下",
            toName: "佛山顺德容桂高黎工业区",
            coords: [
              [113.053744, 23.015997],
              [113.3217, 22.7741],
            ],
          },
          {
            fromName: "尚苑",
            toName: "金融高新区地铁站",
            coords: [
              [113.142224, 22.721752],
              [113.1538, 23.0691],
            ],
          },
          {
            fromName: "中海金沙湾",
            toName: "三水港",
            coords: [
              [113.198868, 23.142318],
              [112.80517, 23.10261],
            ],
          },
          {
            fromName: "保利西子湾",
            toName: "佛山顺德龙江榔头工业区",
            coords: [
              [113.201623, 23.144643],
              [113.03008, 22.87732],
            ],
          },
          {
            fromName: "保利西子湾",
            toName: "顺德大良五沙三村商圈",
            coords: [
              [113.201623, 23.144643],
              [113.34843, 22.81297],
            ],
          },
          {
            fromName: "恒大绿洲",
            toName: "顺德大良五沙三村商圈",
            coords: [
              [113.201623, 23.144643],
              [113.34843, 22.81297],
            ],
          },
          {
            fromName: "中海金沙湾",
            toName: "三水港",
            coords: [
              [113.198868, 23.142318],
              [112.8052, 23.1026],
            ],
          },
          {
            fromName: "保利西子湾",
            toName: "顺德大良五沙三村商圈",
            coords: [
              [113.201623, 23.144643],
              [113.35292, 22.81114],
            ],
          },
          {
            fromName: "恒大绿洲",
            toName: "顺德大良五沙三村商圈",
            coords: [
              [113.201623, 23.144643],
              [113.35292, 22.81114],
            ],
          },
          {
            fromName: "尚苑",
            toName: "公安小区",
            coords: [
              [113.142224, 22.721752],
              [113.1155, 23.0264],
            ],
          },
          {
            fromName: "尚苑",
            toName: "双城尚都",
            coords: [
              [113.142224, 22.721752],
              [113.12823, 23.02831],
            ],
          },
          {
            fromName: "明珠广场",
            toName: "佛山顺德容桂高黎工业区",
            coords: [
              [113.1867, 23.113249],
              [113.3217, 22.7741],
            ],
          },
          {
            fromName: "尚苑",
            toName: "双城尚都",
            coords: [
              [113.142224, 22.721752],
              [113.14686, 23.01465],
            ],
          },
          {
            fromName: "尚苑",
            toName: "顺德均安尚苑",
            coords: [
              [113.119289, 23.031254],
              [113.14184, 22.72244],
            ],
          },
          {
            fromName: "保利西子湾",
            toName: "三水港",
            coords: [
              [113.201623, 23.144643],
              [112.80517, 23.10261],
            ],
          },
          {
            fromName: "恒大绿洲",
            toName: "三水港",
            coords: [
              [113.201623, 23.144643],
              [112.80517, 23.10261],
            ],
          },
          {
            fromName: "中海金沙馨园",
            toName: "三水港",
            coords: [
              [113.201623, 23.144643],
              [112.80517, 23.10261],
            ],
          },
          {
            fromName: "中海金沙里",
            toName: "高明千禧小学",
            coords: [
              [113.200258, 23.19425],
              [112.46607, 22.75148],
            ],
          },
          {
            fromName: "滨江一号",
            toName: "三水港",
            coords: [
              [113.164106, 23.069926],
              [112.80517, 23.10261],
            ],
          },
          {
            fromName: "碧翠苑",
            toName: "佛山顺德容桂高黎工业区",
            coords: [
              [113.200595, 23.094307],
              [113.3217, 22.7741],
            ],
          },
          {
            fromName: "碧桂园钻石湾",
            toName: "和丰明苑",
            coords: [
              [113.258961, 22.849472],
              [112.90681, 23.03841],
            ],
          },
          {
            fromName: "圣堂大街",
            toName: "佛山顺德容桂高黎工业区",
            coords: [
              [113.0989, 23.0325],
              [113.3217, 22.7741],
            ],
          },
          {
            fromName: "恒大绿洲",
            toName: "佛山顺德容桂高黎工业区",
            coords: [
              [113.201623, 23.144643],
              [113.32166, 22.77406],
            ],
          },
          {
            fromName: "明珠广场",
            toName: "三水港",
            coords: [
              [113.1867, 23.113249],
              [112.8052, 23.1026],
            ],
          },
          {
            fromName: "中南花园",
            toName: "三水港",
            coords: [
              [113.185643, 23.112743],
              [112.8052, 23.1026],
            ],
          },
          {
            fromName: "岐江广场",
            toName: "三水港",
            coords: [
              [113.186111, 23.11404],
              [112.8052, 23.1026],
            ],
          },
          {
            fromName: "保利西子湾",
            toName: "三水横涌小学",
            coords: [
              [113.201623, 23.144643],
              [112.8832, 23.182],
            ],
          },
          {
            fromName: "恒大绿洲",
            toName: "三水横涌小学",
            coords: [
              [113.201623, 23.144643],
              [112.8832, 23.182],
            ],
          },
          {
            fromName: "中海金沙馨园",
            toName: "三水横涌小学",
            coords: [
              [113.201623, 23.144643],
              [112.8832, 23.182],
            ],
          },
          {
            fromName: "中海金沙里",
            toName: "三水港",
            coords: [
              [113.200258, 23.19425],
              [112.80517, 23.10261],
            ],
          },
          {
            fromName: "中南海晖园",
            toName: "佛山顺德容桂高黎工业区",
            coords: [
              [113.184806, 23.111063],
              [113.3217, 22.7741],
            ],
          },
          {
            fromName: "银海花园",
            toName: "高明千禧小学",
            coords: [
              [113.196568, 23.117982],
              [112.46607, 22.75148],
            ],
          },
          {
            fromName: "万科四季花城",
            toName: "御江南",
            coords: [
              [113.177772, 23.153551],
              [112.86981, 23.13118],
            ],
          },
          {
            fromName: "尚苑",
            toName: "禅城机关幼儿园",
            coords: [
              [113.142224, 22.721752],
              [113.119245, 23.03332],
            ],
          },
          {
            fromName: "尚苑",
            toName: "普君新城",
            coords: [
              [113.142224, 22.721752],
              [113.12363, 23.03077],
            ],
          },
          {
            fromName: "保利西子湾",
            toName: "三水港",
            coords: [
              [113.201623, 23.144643],
              [112.8052, 23.1026],
            ],
          },
          {
            fromName: "恒大绿洲",
            toName: "三水港",
            coords: [
              [113.201623, 23.144643],
              [112.8052, 23.1026],
            ],
          },
          {
            fromName: "中海金沙馨园",
            toName: "三水港",
            coords: [
              [113.201623, 23.144643],
              [112.8052, 23.1026],
            ],
          },
          {
            fromName: "尚苑",
            toName: "广东省交通运输高级技工学校",
            coords: [
              [113.142224, 22.721752],
              [113.1334, 23.0392],
            ],
          },
          {
            fromName: "明珠广场",
            toName: "佛山顺德容桂高黎工业区",
            coords: [
              [113.1867, 23.113249],
              [113.323335, 22.771727],
            ],
          },
          {
            fromName: "明珠广场",
            toName: "三水横涌小学",
            coords: [
              [113.1867, 23.113249],
              [112.8832, 23.182],
            ],
          },
          {
            fromName: "保利西子湾",
            toName: "柏悦湾",
            coords: [
              [113.201623, 23.144643],
              [113.309955, 22.748503],
            ],
          },
          {
            fromName: "恒大绿洲",
            toName: "柏悦湾",
            coords: [
              [113.201623, 23.144643],
              [113.309955, 22.748503],
            ],
          },
          {
            fromName: "中海金沙里",
            toName: "佛山顺德容桂高黎工业区",
            coords: [
              [113.200258, 23.19425],
              [113.3217, 22.7741],
            ],
          },
          {
            fromName: "万科四季花城",
            toName: "三水横涌小学",
            coords: [
              [113.177772, 23.153551],
              [112.88325, 23.18208],
            ],
          },
          {
            fromName: "中海金沙湾",
            toName: "海边村",
            coords: [
              [113.198868, 23.142318],
              [112.80517, 23.10261],
            ],
          },
          {
            fromName: "白坭东岸小区",
            toName: "三水城南白坭商业中心商圈",
            coords: [
              [112.833471, 23.068157],
              [113.14686, 23.01465],
            ],
          },
          {
            fromName: "海边村",
            toName: "平洲公园",
            coords: [
              [112.890602, 23.080612],
              [113.2081, 23.0388],
            ],
          },
          {
            fromName: "中海金沙馨园",
            toName: "云东海",
            coords: [
              [113.201623, 23.144643],
              [112.84154, 23.21927],
            ],
          },
          {
            fromName: "尚苑",
            toName: "禅城机关幼儿园",
            coords: [
              [113.142224, 22.721752],
              [113.131235, 23.026125],
            ],
          },
          {
            fromName: "尚苑",
            toName: "普君新城",
            coords: [
              [113.142224, 22.721752],
              [113.11991, 23.02883],
            ],
          },
          {
            fromName: "万科四季花城",
            toName: "佛山高明明城工业区",
            coords: [
              [113.177772, 23.153551],
              [112.6862, 22.86309],
            ],
          },
          {
            fromName: "中海金沙里",
            toName: "佛山高明明城工业区",
            coords: [
              [113.200258, 23.19425],
              [112.68624, 22.86305],
            ],
          },
          {
            fromName: "保利西子湾",
            toName: "佛山顺德龙江苏溪工业区",
            coords: [
              [113.201623, 23.144643],
              [113.029, 22.8642],
            ],
          },
          {
            fromName: "瑞安花园",
            toName: "三水横涌小学",
            coords: [
              [113.194535, 23.113525],
              [112.8832, 23.182],
            ],
          },
          {
            fromName: "中海金沙馨园",
            toName: "云东海",
            coords: [
              [113.201623, 23.144643],
              [112.8415, 23.2193],
            ],
          },
          {
            fromName: "恒大绿洲",
            toName: "佛山顺德容桂高黎工业区",
            coords: [
              [113.201623, 23.144643],
              [113.3217, 22.7741],
            ],
          },
          {
            fromName: "滨江一号",
            toName: "三水港",
            coords: [
              [113.164106, 23.069926],
              [112.8052, 23.1026],
            ],
          },
          {
            fromName: "中海金沙里",
            toName: "三水港",
            coords: [
              [113.200258, 23.19425],
              [112.8052, 23.1026],
            ],
          },
          {
            fromName: "万科四季花城",
            toName: "佛山高明明城工业区",
            coords: [
              [113.177772, 23.153551],
              [112.69169, 22.87364],
            ],
          },
          {
            fromName: "万科四季花城",
            toName: "佛山高明明城工业区",
            coords: [
              [113.177772, 23.153551],
              [112.6729, 22.8632],
            ],
          },
          {
            fromName: "中海金沙里",
            toName: "佛山顺德均安畅兴工业园东区",
            coords: [
              [113.200258, 23.19425],
              [113.17237, 22.68473],
            ],
          },
          {
            fromName: "丽景花园",
            toName: "东江花苑",
            coords: [
              [113.259325, 22.842176],
              [113.16921, 23.20021],
            ],
          },
          {
            fromName: "尚苑",
            toName: "禅城福宁幼儿园",
            coords: [
              [113.142224, 22.721752],
              [113.113632, 23.029453],
            ],
          },
          {
            fromName: "保利西子湾",
            toName: "海边村",
            coords: [
              [113.201623, 23.144643],
              [112.80517, 23.10261],
            ],
          },
          {
            fromName: "恒大绿洲",
            toName: "海边村",
            coords: [
              [113.201623, 23.144643],
              [112.80517, 23.10261],
            ],
          },
          {
            fromName: "中海金沙馨园",
            toName: "海边村",
            coords: [
              [113.201623, 23.144643],
              [112.80517, 23.10261],
            ],
          },
          {
            fromName: "保利西子湾",
            toName: "顺德大良五沙三村商圈",
            coords: [
              [113.201623, 23.144643],
              [113.34481, 22.81796],
            ],
          },
          {
            fromName: "恒大绿洲",
            toName: "顺德大良五沙三村商圈",
            coords: [
              [113.201623, 23.144643],
              [113.34481, 22.81796],
            ],
          },
          {
            fromName: "碧桂园钻石湾",
            toName: "和丰明苑",
            coords: [
              [113.258961, 22.849472],
              [112.90684, 23.03844],
            ],
          },
          {
            fromName: "保利西子湾",
            toName: "佛山顺德龙江榔头工业区",
            coords: [
              [113.201623, 23.144643],
              [113.03472, 22.87531],
            ],
          },
          {
            fromName: "尚苑",
            toName: "顺德线现代名邸",
            coords: [
              [113.119289, 23.031254],
              [113.14551, 22.71813],
            ],
          },
          {
            fromName: "万科四季花城",
            toName: "佛山高明明城工业区",
            coords: [
              [113.177772, 23.153551],
              [112.69843, 22.88507],
            ],
          },
          {
            fromName: "保利西子湾",
            toName: "顺德大良五沙三村商圈",
            coords: [
              [113.201623, 23.144643],
              [113.3449, 22.818],
            ],
          },
          {
            fromName: "恒大绿洲",
            toName: "顺德大良五沙三村商圈",
            coords: [
              [113.201623, 23.144643],
              [113.3449, 22.818],
            ],
          },
          {
            fromName: "东江国际",
            toName: "御翠豪苑",
            coords: [
              [113.115894, 22.993351],
              [113.137801, 22.722801],
            ],
          },
          {
            fromName: "尚苑",
            toName: "公安小区",
            coords: [
              [113.142224, 22.721752],
              [113.1158, 23.0244],
            ],
          },
          {
            fromName: "中海金沙里",
            toName: "三水港",
            coords: [
              [113.200258, 23.19425],
              [112.80518, 23.10259],
            ],
          },
          {
            fromName: "尚苑",
            toName: "佛山顺德均安凌西工业区",
            coords: [
              [113.119289, 23.031254],
              [113.10612, 22.70844],
            ],
          },
          {
            fromName: "中海金沙馨园",
            toName: "云东海",
            coords: [
              [113.201623, 23.144643],
              [112.84791, 23.23578],
            ],
          },
          {
            fromName: "保利西子湾",
            toName: "佛山顺德龙江榔头工业区",
            coords: [
              [113.201623, 23.144643],
              [113.03, 22.8773],
            ],
          },
          {
            fromName: "中海金沙里",
            toName: "佛山顺德容桂高黎工业区",
            coords: [
              [113.200258, 23.19425],
              [113.32166, 22.77406],
            ],
          },
          {
            fromName: "保利西子湾",
            toName: "佛山顺德容桂容边工业区",
            coords: [
              [113.201623, 23.144643],
              [113.30543, 22.74705],
            ],
          },
          {
            fromName: "地质队社区",
            toName: "风度国际名苑",
            coords: [
              [112.8709, 23.1755],
              [113.1804, 23.11],
            ],
          },
          {
            fromName: "尚苑",
            toName: "佛山顺德均安凌西工业区",
            coords: [
              [113.119289, 23.031254],
              [113.1009, 22.7069],
            ],
          },
          {
            fromName: "中海金沙里",
            toName: "高明千禧小学",
            coords: [
              [113.200258, 23.19425],
              [112.46006, 22.74489],
            ],
          },
          {
            fromName: "万科四季花城",
            toName: "佛山高明明城工业区",
            coords: [
              [113.177772, 23.153551],
              [112.7154, 22.8857],
            ],
          },
          {
            fromName: "万科四季花城",
            toName: "佛山高明明城工业区",
            coords: [
              [113.177772, 23.153551],
              [112.6917, 22.8736],
            ],
          },
          {
            fromName: "保利西子湾",
            toName: "佛山顺德龙江苏溪工业区",
            coords: [
              [113.201623, 23.144643],
              [113.02737, 22.85929],
            ],
          },
          {
            fromName: "保利西子湾",
            toName: "佛山顺德容桂容边工业区",
            coords: [
              [113.201623, 23.144643],
              [113.29905, 22.74578],
            ],
          },
          {
            fromName: "恒大绿洲",
            toName: "佛山顺德容桂高黎工业区",
            coords: [
              [113.201623, 23.144643],
              [113.3309, 22.7742],
            ],
          },
          {
            fromName: "保利西子湾",
            toName: "佛山顺德龙江苏溪工业区",
            coords: [
              [113.201623, 23.144643],
              [113.034, 22.863],
            ],
          },
          {
            fromName: "尚苑",
            toName: "顺德均安尚苑",
            coords: [
              [113.119289, 23.031254],
              [113.14184, 22.72242],
            ],
          },
        ],
      };
      this.$echarts.init(this.$refs.chartMap).setOption({
        legend: {
          show: true,
          orient: "vertical",
          top: "bottom",
          left: "right",
          data: ["地点", "线路"],
          textStyle: {
            color: "#fff",
          },
        },
        geo: {
          map: "北京市",
          label: {
            emphasis: {
              show: false,
            },
          },
          left: '18%',
          zoom: 1.2,
          roam: true,
          itemStyle: {
            normal: {
              areaColor: "#323c48",
              borderColor: "#404a59",
            },
            emphasis: {
              areaColor: "#2a333d",
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
.urban-commuting {
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
      height: 600px;
    }
    .table-box {
      padding: 10px 10px 10px 20px;
      .box {
        margin-top: 10px;
      }
    }
  }
}
</style>