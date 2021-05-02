<template>
  <div class="home">
    <!-- <el-row :gutter="10">
      <el-col :span="12">
        <div class="box">
          <div class="box-title">学生分布</div>
          <div class="map-container" id="mapId"></div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="box">
          <div class="box-title">学生年龄</div>
          <div class="box-container" id="lineId"></div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <div class="box">
          <div class="box-title">课程类型</div>
          <div class="map-container" id="barId"></div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="box">
          <div class="box-title">题目分布</div>
          <div class="box-container" id="cloudId"></div>
        </div>
      </el-col>
    </el-row> -->
    少儿编程教育后台管理系统
  </div>
</template>

<script>
import echarts from "echarts";
import "echarts-wordcloud/dist/echarts-wordcloud";
import "echarts-wordcloud/dist/echarts-wordcloud.min";
import "../../node_modules/echarts/map/js/china.js";
export default {
  name: "index",
  data() {
    return {};
  },
  created() {},
  mounted() {
    // this.chartMap();
    // this.chartLine();
    // this.chartBar();
    // this.chartCloud();
  },
  methods: {
    // 地图
    chartMap() {
      const Echart = echarts.init(document.getElementById("mapId"));
      var mapName = "china";
      var data = [
        { name: "北京", value: 199 },
        { name: "天津", value: 42 },
        { name: "河北", value: 102 },
        { name: "山西", value: 81 },
        { name: "内蒙古", value: 47 },
        { name: "辽宁", value: 67 },
        { name: "吉林", value: 82 },
        { name: "黑龙江", value: 123 },
        { name: "上海", value: 24 },
        { name: "江苏", value: 92 },
        { name: "浙江", value: 114 },
        { name: "安徽", value: 109 },
        { name: "福建", value: 116 },
        { name: "江西", value: 91 },
        { name: "山东", value: 119 },
        { name: "河南", value: 137 },
        { name: "湖北", value: 116 },
        { name: "湖南", value: 114 },
        { name: "重庆", value: 91 },
        { name: "四川", value: 125 },
        { name: "贵州", value: 62 },
        { name: "云南", value: 83 },
        { name: "西藏", value: 9 },
        { name: "陕西", value: 80 },
        { name: "甘肃", value: 56 },
        { name: "青海", value: 10 },
        { name: "宁夏", value: 18 },
        { name: "新疆", value: 180 },
        { name: "广东", value: 123 },
        { name: "广西", value: 59 },
        { name: "海南", value: 14 },
      ];
      var geoCoordMap = {};
      /*获取地图数据*/
      var mapFeatures = echarts.getMap(mapName).geoJson.features;
      mapFeatures.forEach(function (v) {
        // 地区名称
        var name = v.properties.name;
        // 地区经纬度
        geoCoordMap[name] = v.properties.cp;
      });
      var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value),
            });
          }
        }
        return res;
      };
      var option = {
        tooltip: {
          padding: 0,
          enterable: true,
          transitionDuration: 1,
          textStyle: {
            color: "#000",
            decoration: "none",
          },
          formatter: function (params) {
            if (params.value.constructor == Array) {
              var value = params.value[2];
            } else {
              var value = params.value;
            }
            var tipHtml = "";
            tipHtml =
              '<div style="width:280px;height:100px;background:rgba(22,80,158,0.8);border:1px solid rgba(7,166,255,0.7)">' +
              '<div style="width:100%;height:40px;line-height:40px;border-bottom:2px solid rgba(7,166,255,0.7);padding:0 20px">' +
              '<i style="display:inline-block;width:8px;height:8px;background:#16d6ff;border-radius:40px;">' +
              "</i>" +
              '<span style="margin-left:10px;color:#fff;font-size:16px;">' +
              params.name +
              "</span>" +
              "</div>" +
              '<div style="padding:20px">' +
              '<p style="color:#fff;font-size:12px;">' +
              '<i style="display:inline-block;width:10px;height:10px;background:#16d6ff;border-radius:40px;margin:0 8px">' +
              "</i>" +
              "人数：" +
              '<span style="color:#11ee7d;margin:0 6px;">' +
              value +
              "</span>" +
              "个" +
              "</p>" +
              "</div>" +
              "</div>";
            return tipHtml;
          },
        },
        visualMap: {
          show: true,
          min: 0,
          max: 200,
          left: "10%",
          top: "bottom",
          calculable: true,
          seriesIndex: [1],
          inRange: {
            color: ["#04387b", "#467bc0"], // 蓝绿
          },
        },
        geo: {
          show: true,
          map: mapName,
          label: {
            normal: {
              show: false,
            },
            emphasis: {
              show: false,
            },
          },
          roam: false,
          itemStyle: {
            normal: {
              areaColor: "#023677",
              borderColor: "#1180c7",
            },
            emphasis: {
              areaColor: "#4499d0",
            },
          },
        },
        series: [
          {
            name: "散点",
            type: "effectScatter",
            coordinateSystem: "geo",
            data: convertData(data),
            symbolSize: function (val) {
              return val[2] / 10;
            },
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                show: true,
              },
              emphasis: {
                show: true,
              },
            },
            itemStyle: {
              normal: {
                color: "yellow",
                shadowBlur: 10,
                shadowColor: "yellow",
              },
            },
          },
          {
            type: "map",
            map: mapName,
            geoIndex: 0,
            aspectScale: 0.75, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
              normal: {
                show: true,
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: "#fff",
                },
              },
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: "#031525",
                borderColor: "#3B5077",
              },
              emphasis: {
                areaColor: "#2B91B7",
              },
            },
            animation: false,
            data: data,
          },
        ],
      };
      Echart.setOption(option);
    },
    // 折线图
    chartLine() {
      const Echart = echarts.init(document.getElementById("lineId"));
      const colorList = ["#9E87FF", "#73DDFF", "#fe9a8b", "#F56948", "#9E87FF"];
      var chartData = [
        { name: "6岁及以下", value: 10 },
        { name: "7-10岁", value: 20 },
        { name: "11-14岁", value: 14 },
        { name: "15岁及以上", value: 6 },
      ];
      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            label: {
              show: true,
              backgroundColor: "#fff",
              color: "#556677",
              borderColor: "rgba(0,0,0,0)",
              shadowColor: "rgba(0,0,0,0)",
              shadowOffsetY: 0,
            },
            lineStyle: {
              width: 0,
            },
          },
          backgroundColor: "#fff",
          textStyle: {
            color: "#5c6c7c",
          },
          padding: [10, 10],
          extraCssText: "box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)",
        },
        grid: {
          top: "15%",
        },
        xAxis: [
          {
            type: "category",
            data: (function (data) {
              var arr = [];
              data.forEach(function (items) {
                arr.push(items.name); //name
              });
              return arr;
            })(chartData), //载入横坐标数据
            axisLine: {
              lineStyle: {
                color: "#DCE2E8",
              },
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              interval: 0,
              textStyle: {
                color: "#556677",
              },
              fontSize: 12, // 默认x轴字体大小
              margin: 15, // margin:文字到x轴的距离
            },
            axisPointer: {
              label: {
                padding: [0, 0, 10, 0],
                margin: 15,
                fontSize: 12, // 移入时的字体大小
                backgroundColor: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#fff", // 0% 处的颜色
                    },
                    {
                      offset: 0.86,
                      color: "#fff",
                    },
                    {
                      offset: 0.86,
                      color: "#33c0cd",
                    },
                    {
                      offset: 1,
                      color: "#33c0cd", // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
              },
            },
            boundaryGap: false,
          },
        ],
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#DCE2E8",
              },
            },
            axisLabel: {
              textStyle: {
                color: "#556677",
              },
            },
            splitLine: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "",
            type: "line",
            data: (function (data) {
              var arr = [];
              data.forEach(function (items) {
                arr.push(items.value); //name
              });
              return arr;
            })(chartData),
            symbolSize: 1,
            symbol: "circle",
            smooth: true,
            yAxisIndex: 0,
            showSymbol: false,
            lineStyle: {
              width: 5,
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: "#9effff",
                },
                {
                  offset: 1,
                  color: "#9E87FF",
                },
              ]),
              shadowColor: "rgba(158,135,255, 0.3)",
              shadowBlur: 10,
              shadowOffsetY: 20,
            },
            itemStyle: {
              normal: {
                color: colorList[0],
                borderColor: colorList[0],
              },
            },
          },
        ],
      };
      Echart.setOption(option);
    },
    // 柱状图
    chartBar() {
      const Echart = echarts.init(document.getElementById("barId"));
      var chartData = [
        { name: "Python", value: 100 },
        { name: "C/C++", value: 200 },
        { name: "JS", value: 150 },
      ];
      var option = {
        tooltip: {
          show: true,
          axisPointer: {
            label: {
              show: true,
              backgroundColor: "#fff",
              color: "#556677",
              borderColor: "rgba(0,0,0,0)",
              shadowColor: "rgba(0,0,0,0)",
              shadowOffsetY: 0,
            },
            lineStyle: {
              width: 0,
            },
          },
          backgroundColor: "#fff",
          textStyle: {
            color: "#5c6c7c",
          },
          padding: [10, 10],
          extraCssText: "box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)",
        },
        xAxis: [
          {
            type: "category",
            data: (function (data) {
              var arr = [];
              data.forEach(function (items) {
                arr.push(items.name);
              });
              return arr;
            })(chartData),
            axisLabel: {
              interval: 0,
              textStyle: {
                color: "#556677",
              },
              fontSize: 12, // 默认x轴字体大小
              margin: 15, // margin:文字到x轴的距离
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#DCE2E8",
              },
            },
            axisTick: {
              show: false,
            },
          },
        ],
        yAxis: [
          {
            axisLabel: {
              textStyle: {
                color: "#556677",
              },
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#DCE2E8",
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
          },
        ],
        series: [
          {
            type: "bar",
            data: (function (data) {
              var arr = [];
              data.forEach(function (items) {
                arr.push(items.value); //name
              });
              return arr;
            })(chartData),
            barWidth: "20px",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(102,159,239,1)",
                    },
                    {
                      offset: 1,
                      color: "rgba(170,202,246,1)",
                    },
                  ],
                  false
                ),
              },
            },
          },
        ],
      };
      Echart.setOption(option);
    },
    // 词云图
    chartCloud() {
      const Echart = echarts.init(document.getElementById("cloudId"));
      var jsonlist = [
        {
          name: "花鸟市场",
          value: 1446,
        },
        {
          name: "汽车",
          value: 928,
        },
        {
          name: "视频",
          value: 906,
        },
        {
          name: "电视",
          value: 825,
        },
        {
          name: "Lover Boy 88",
          value: 514,
        },
        {
          name: "动漫",
          value: 486,
        },
        {
          name: "音乐",
          value: 5999,
        },
        {
          name: "直播",
          value: 163,
        },
        {
          name: "广播电台",
          value: 86,
        },
        {
          name: "戏曲曲艺",
          value: 17,
        },
        {
          name: "演出票务",
          value: 6,
        },
        {
          name: "给陌生的你听",
          value: 1,
        },
        {
          name: "资讯",
          value: 1437,
        },
        {
          name: "商业财经",
          value: 422,
        },
        {
          name: "娱乐八卦",
          value: 353,
        },
        {
          name: "军事",
          value: 331,
        },
        {
          name: "科技资讯",
          value: 313,
        },
        {
          name: "社会时政",
          value: 307,
        },
        {
          name: "时尚",
          value: 43,
        },
        {
          name: "网络奇闻",
          value: 15,
        },
        {
          name: "旅游出行",
          value: 438,
        },
        {
          name: "景点类型",
          value: 957,
        },
        {
          name: "国内游",
          value: 927,
        },
        {
          name: "远途出行方式",
          value: 908,
        },
        {
          name: "酒店",
          value: 693,
        },
        {
          name: "关注景点",
          value: 611,
        },
        {
          name: "旅游网站偏好",
          value: 512,
        },
        {
          name: "出国游",
          value: 382,
        },
        {
          name: "交通票务",
          value: 312,
        },
        {
          name: "旅游方式",
          value: 187,
        },
        {
          name: "旅游主题",
          value: 163,
        },
        {
          name: "港澳台",
          value: 104,
        },
        {
          name: "本地周边游",
          value: 3,
        },
        {
          name: "小卖家",
          value: 1331,
        },
        {
          name: "全日制学校",
          value: 941,
        },
        {
          name: "基础教育科目",
          value: 585,
        },
        {
          name: "考试培训",
          value: 473,
        },
        {
          name: "语言学习",
          value: 358,
        },
        {
          name: "留学",
          value: 246,
        },
        {
          name: "K12课程培训",
          value: 207,
        },
        {
          name: "艺术培训",
          value: 194,
        },
        {
          name: "技能培训",
          value: 104,
        },
        {
          name: "IT培训",
          value: 87,
        },
        {
          name: "高等教育专业",
          value: 63,
        },
        {
          name: "家教",
          value: 48,
        },
        {
          name: "体育培训",
          value: 23,
        },
        {
          name: "职场培训",
          value: 5,
        },
        {
          name: "金融财经",
          value: 1328,
        },
        {
          name: "银行",
          value: 765,
        },
        {
          name: "股票",
          value: 452,
        },
        {
          name: "保险",
          value: 415,
        },
        {
          name: "贷款",
          value: 253,
        },
        {
          name: "基金",
          value: 211,
        },
        {
          name: "信用卡",
          value: 180,
        },
        {
          name: "外汇",
          value: 138,
        },
        {
          name: "P2P",
          value: 116,
        },
        {
          name: "贵金属",
          value: 98,
        },
        {
          name: "债券",
          value: 93,
        },
        {
          name: "网络理财",
          value: 92,
        },
        {
          name: "信托",
          value: 90,
        },
        {
          name: "征信",
          value: 76,
        },
        {
          name: "期货",
          value: 76,
        },
        {
          name: "公积金",
          value: 40,
        },
        {
          name: "银行理财",
          value: 36,
        },
        {
          name: "银行业务",
          value: 30,
        },
        {
          name: "典当",
          value: 7,
        },
        {
          name: "海外置业",
          value: 1,
        },
        {
          name: "汽车",
          value: 1309,
        },
        {
          name: "汽车档次",
          value: 965,
        },
        {
          name: "汽车品牌",
          value: 900,
        },
        {
          name: "汽车车型",
          value: 727,
        },
        {
          name: "购车阶段",
          value: 461,
        },
        {
          name: "二手车",
          value: 309,
        },
        {
          name: "汽车美容",
          value: 260,
        },
        {
          name: "新能源汽车",
          value: 173,
        },
        {
          name: "汽车维修",
          value: 155,
        },
        {
          name: "租车服务",
          value: 136,
        },
        {
          name: "车展",
          value: 121,
        },
        {
          name: "违章查询",
          value: 76,
        },
        {
          name: "汽车改装",
          value: 62,
        },
        {
          name: "汽车用品",
          value: 37,
        },
        {
          name: "路况查询",
          value: 32,
        },
        {
          name: "汽车保险",
          value: 28,
        },
        {
          name: "陪驾代驾",
          value: 4,
        },
        {
          name: "网络购物",
          value: 1275,
        },
        {
          name: "做我的猫",
          value: 1088,
        },
        {
          name: "只想要你知道",
          value: 907,
        },
        {
          name: "团购",
          value: 837,
        },
        {
          name: "比价",
          value: 201,
        },
        {
          name: "海淘",
          value: 195,
        },
        {
          name: "移动APP购物",
          value: 179,
        },
        {
          name: "支付方式",
          value: 119,
        },
        {
          name: "代购",
          value: 43,
        },
        {
          name: "体育健身",
          value: 1234,
        },
        {
          name: "体育赛事项目",
          value: 802,
        },
        {
          name: "运动项目",
          value: 405,
        },
        {
          name: "体育类赛事",
          value: 337,
        },
        {
          name: "健身项目",
          value: 199,
        },
        {
          name: "健身房健身",
          value: 78,
        },
        {
          name: "运动健身",
          value: 77,
        },
        {
          name: "家庭健身",
          value: 36,
        },
        {
          name: "健身器械",
          value: 29,
        },
        {
          name: "办公室健身",
          value: 3,
        },
        {
          name: "商务服务",
          value: 1201,
        },
        {
          name: "法律咨询",
          value: 508,
        },
        {
          name: "化工材料",
          value: 147,
        },
        {
          name: "广告服务",
          value: 125,
        },
        {
          name: "会计审计",
          value: 115,
        },
        {
          name: "人员招聘",
          value: 101,
        },
        {
          name: "印刷打印",
          value: 66,
        },
        {
          name: "知识产权",
          value: 32,
        },
        {
          name: "翻译",
          value: 22,
        },
        {
          name: "安全安保",
          value: 9,
        },
        {
          name: "公关服务",
          value: 8,
        },
        {
          name: "商旅服务",
          value: 2,
        },
        {
          name: "展会服务",
          value: 2,
        },
        {
          name: "特许经营",
          value: 1,
        },
        {
          name: "休闲爱好",
          value: 1169,
        },
        {
          name: "收藏",
          value: 412,
        },
        {
          name: "摄影",
          value: 393,
        },
        {
          name: "温泉",
          value: 230,
        },
        {
          name: "博彩彩票",
          value: 211,
        },
        {
          name: "美术",
          value: 207,
        },
        {
          name: "书法",
          value: 139,
        },
        {
          name: "DIY手工",
          value: 75,
        },
        {
          name: "舞蹈",
          value: 23,
        },
        {
          name: "钓鱼",
          value: 21,
        },
        {
          name: "棋牌桌游",
          value: 17,
        },
        {
          name: "KTV",
          value: 6,
        },
        {
          name: "密室",
          value: 5,
        },
        {
          name: "采摘",
          value: 4,
        },
        {
          name: "电玩",
          value: 1,
        },
        {
          name: "真人CS",
          value: 1,
        },
        {
          name: "轰趴",
          value: 1,
        },
        {
          name: "家电数码",
          value: 1111,
        },
        {
          name: "手机",
          value: 885,
        },
        {
          name: "电脑",
          value: 543,
        },
        {
          name: "大家电",
          value: 321,
        },
        {
          name: "家电关注品牌",
          value: 253,
        },
        {
          name: "网络设备",
          value: 162,
        },
        {
          name: "摄影器材",
          value: 149,
        },
        {
          name: "影音设备",
          value: 133,
        },
        {
          name: "办公数码设备",
          value: 113,
        },
        {
          name: "生活电器",
          value: 67,
        },
        {
          name: "厨房电器",
          value: 54,
        },
        {
          name: "智能设备",
          value: 45,
        },
        {
          name: "个人护理电器",
          value: 22,
        },
        {
          name: "服饰鞋包",
          value: 1047,
        },
        {
          name: "服装",
          value: 566,
        },
        {
          name: "饰品",
          value: 289,
        },
        {
          name: "鞋",
          value: 184,
        },
        {
          name: "箱包",
          value: 168,
        },
        {
          name: "奢侈品",
          value: 137,
        },
        {
          name: "母婴亲子",
          value: 1041,
        },
        {
          name: "孕婴保健",
          value: 505,
        },
        {
          name: "母婴社区",
          value: 299,
        },
        {
          name: "早教",
          value: 103,
        },
        {
          name: "奶粉辅食",
          value: 66,
        },
        {
          name: "童车童床",
          value: 41,
        },
        {
          name: "关注品牌",
          value: 271,
        },
        {
          name: "宝宝玩乐",
          value: 30,
        },
        {
          name: "母婴护理服务",
          value: 25,
        },
        {
          name: "纸尿裤湿巾",
          value: 16,
        },
        {
          name: "妈妈用品",
          value: 15,
        },
        {
          name: "宝宝起名",
          value: 12,
        },
        {
          name: "童装童鞋",
          value: 9,
        },
        {
          name: "胎教",
          value: 8,
        },
        {
          name: "宝宝安全",
          value: 1,
        },
        {
          name: "宝宝洗护用品",
          value: 1,
        },
        {
          name: "软件应用",
          value: 1018,
        },
        {
          name: "系统工具",
          value: 896,
        },
        {
          name: "理财购物",
          value: 440,
        },
        {
          name: "生活实用",
          value: 365,
        },
        {
          name: "影音图像",
          value: 256,
        },
        {
          name: "社交通讯",
          value: 214,
        },
        {
          name: "手机美化",
          value: 39,
        },
        {
          name: "办公学习",
          value: 28,
        },
        {
          name: "应用市场",
          value: 23,
        },
        {
          name: "母婴育儿",
          value: 14,
        },
        {
          name: "游戏",
          value: 946,
        },
        {
          name: "手机游戏",
          value: 565,
        },
        {
          name: "PC游戏",
          value: 353,
        },
        {
          name: "网页游戏",
          value: 254,
        },
        {
          name: "游戏机",
          value: 188,
        },
        {
          name: "模拟辅助",
          value: 166,
        },
        {
          name: "个护美容",
          value: 942,
        },
        {
          name: "护肤品",
          value: 177,
        },
        {
          name: "彩妆",
          value: 133,
        },
        {
          name: "美发",
          value: 80,
        },
        {
          name: "香水",
          value: 50,
        },
        {
          name: "个人护理",
          value: 46,
        },
        {
          name: "美甲",
          value: 26,
        },
        {
          name: "SPA美体",
          value: 21,
        },
        {
          name: "花鸟萌宠",
          value: 914,
        },
        {
          name: "绿植花卉",
          value: 311,
        },
        {
          name: "狗",
          value: 257,
        },
        {
          name: "其他宠物",
          value: 131,
        },
        {
          name: "水族",
          value: 125,
        },
        {
          name: "猫",
          value: 122,
        },
        {
          name: "动物",
          value: 81,
        },
        {
          name: "鸟",
          value: 67,
        },
        {
          name: "宠物用品",
          value: 41,
        },
        {
          name: "宠物服务",
          value: 26,
        },
        {
          name: "书籍阅读",
          value: 913,
        },
        {
          name: "网络小说",
          value: 483,
        },
        {
          name: "关注书籍",
          value: 128,
        },
        {
          name: "文学",
          value: 105,
        },
        {
          name: "报刊杂志",
          value: 77,
        },
        {
          name: "人文社科",
          value: 22,
        },
        {
          name: "建材家居",
          value: 907,
        },
        {
          name: "装修建材",
          value: 644,
        },
        {
          name: "家具",
          value: 273,
        },
        {
          name: "家居风格",
          value: 187,
        },
        {
          name: "家居家装关注品牌",
          value: 140,
        },
        {
          name: "家纺",
          value: 107,
        },
        {
          name: "厨具",
          value: 47,
        },
        {
          name: "灯具",
          value: 43,
        },
        {
          name: "家居饰品",
          value: 29,
        },
        {
          name: "家居日常用品",
          value: 10,
        },
        {
          name: "生活服务",
          value: 883,
        },
        {
          name: "物流配送",
          value: 536,
        },
        {
          name: "家政服务",
          value: 108,
        },
        {
          name: "摄影服务",
          value: 49,
        },
        {
          name: "搬家服务",
          value: 38,
        },
        {
          name: "物业维修",
          value: 37,
        },
        {
          name: "婚庆服务",
          value: 24,
        },
        {
          name: "二手回收",
          value: 24,
        },
        {
          name: "鲜花配送",
          value: 3,
        },
        {
          name: "维修服务",
          value: 3,
        },
        {
          name: "殡葬服务",
          value: 1,
        },
        {
          name: "求职创业",
          value: 874,
        },
        {
          name: "创业",
          value: 363,
        },
        {
          name: "目标职位",
          value: 162,
        },
        {
          name: "目标行业",
          value: 50,
        },
        {
          name: "兼职",
          value: 21,
        },
        {
          name: "期望年薪",
          value: 20,
        },
        {
          name: "实习",
          value: 16,
        },
        {
          name: "雇主类型",
          value: 10,
        },
        {
          name: "星座运势",
          value: 789,
        },
        {
          name: "星座",
          value: 316,
        },
        {
          name: "算命",
          value: 303,
        },
        {
          name: "解梦",
          value: 196,
        },
        {
          name: "风水",
          value: 93,
        },
        {
          name: "面相分析",
          value: 47,
        },
        {
          name: "手相",
          value: 32,
        },
        {
          name: "公益",
          value: 90,
        },
      ];
      var image1 =
        "data:image/png;base64,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";
      var maskResource = new Image();
      maskResource.src = image1;
      var option = {
        tooltip: {
          show: true,
          backgroundColor: "#fff",
          textStyle: {
            color: "#5c6c7c",
          },
          padding: [10, 10],
          extraCssText: "box-shadow: 1px 0 2px 0 rgba(163,163,163,0.5)",
        },
        series: [
          {
            maskImage: maskResource,
            type: "wordCloud", // 词云类型
            sizeRange: [6, 78], // 设置字符大小范围
            rotationRange: [-45, 90],
            textStyle: {
              normal: {
                //生成随机的字体颜色
                color: function () {
                  return (
                    "rgb(" +
                    [
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160),
                      Math.round(Math.random() * 160),
                    ].join(",") +
                    ")"
                  );
                },
              },
            },
            data: jsonlist,
          },
        ],
      };
      Echart.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  font-size: 40px;
  text-align: center;

  padding: 200px 10px 0 10px;
  .el-row {
    margin-bottom: 10px;
  }
  .box {
    background: #fff;
    width: 100%;
    height: 500px;
    &-title {
      width: 100%;
      height: 50px;
      line-height: 50px;
      padding: 0 10px;
      border-bottom: #97a8be 1px solid;
      font-size: 16px;
    }
    .map-container {
      width: 100%;
      height: 450px;
    }
    &-container {
      width: 100%;
      height: 450px;
    }
  }
}
</style>