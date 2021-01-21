<template>
  <div id="allmap" :style="mapStyle"></div>
</template>

<script>
import { MP } from "./map";
export default {
  name: "chartMap",
  data: function () {
    return {
      ak: "sh1GF7tVfNCfNKyVqofuwnPXZQ7lH7aT",
      mapStyle: {
        width: "100%",
        height: 100 + "vh",
      },
    };
  },
  props: ["longitude", "latitude"],
  mounted() {
    // 解决 BMap is not defined 错误
    this.$nextTick(function () {
      var _this = this;
      MP(_this.ak).then((BMap) => {
        //调用api
        _this.go();
      });
    });
  },
  watch: {
    longitude(vId) {
      this.longitude = vId;
      this.go();
    },
    latitude(vId) {
      this.latitude = vId;
      this.go();
    },
  },
  methods: {
    go() {
      // var startLong = this.longitude;
      // var startLat = this.latitude;
      // var endLong = this.longitude;
      // var endLat = this.latitude;
      // var timer = null;
      // 百度地图API功能
      var map = new BMap.Map("allmap"); // 创建Map实例
      map.centerAndZoom(new BMap.Point(this.longitude, this.latitude), 14); // 初始化地图,设置中心点坐标和地图级别
      map.addControl(new BMap.MapTypeControl()); //添加地图类型控件
      map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
      // if (timer) {
      //   clearInterval(timer);
      // }
      // timer = setInterval(goWay, 150);
      var peopleMk;
      var myIcon = new BMap.Icon(
        "http://developer.baidu.com/map/jsdemo/img/fox.gif",
        new BMap.Size(170,130),
        { imageOffset: new BMap.Size(-40, -40) }
      ); //运动图片
      // var polyline = new BMapGL.Polyline(
      //   [
      //     new BMapGL.Point(116.38, 39.915), //起始点的经纬度
      //     new BMapGL.Point(116.44, 39.915), //终止点的经纬度
      //     new BMapGL.Point(116.44, 39.952),
      //   ],
      //   {
      //     strokeColor: "#ffa500", //设置颜色
      //     strokeWeight: 2, //宽度
      //     strokeOpacity: 1, //透明度
      //   }
      // ); // 运动轨迹
      // map.addOverlay(polyline);
      var driving2 = new BMap.WalkingRoute(map, {
        renderOptions: { map: map, autoViewport: true },
        onPolylinesSet: function (routes) {
              let searchRoute = routes[0].getPolyline();//导航路线
              map.removeOverlay(searchRoute);//移除查询出来 的路线
            },
        onMarkersSet: function (routes) {
          map.removeOverlay(routes[0].marker); //删除起点
          map.removeOverlay(routes[routes.length - 1].marker); //删除终点
        },
      });
      driving2.search(
        new BMap.Point(116.38, 39.915),
        new BMap.Point(116.44, 39.952)
      );
      function run() {
        var driving = new BMap.WalkingRoute(map); //驾车实例
        driving.search(
          new BMap.Point(116.38, 39.915),
          new BMap.Point(116.44, 39.952)
        );
        driving.setSearchCompleteCallback(function () {
          // 获得一系列点的数组
          // var pts = driving.getResults().getPlan(0).getRoute(0).getPath();
            var plan = driving.getResults().getPlan(0);
            for (let j = 0; j < plan.getNumRoutes(); j++) {
              var pts = plan.getRoute(j).getPath();
              var polyline = new BMap.Polyline(pts, { strokeColor: "#ffa500", strokeWeight: 4, strokeOpacity: 1 });//重新划路线
              map.addOverlay(polyline);
            }
          // 获得有几个点
          var paths = pts.length;
          // 设置起点
          var carMk = new BMap.Marker(pts[0], { icon: myIcon });
          map.addOverlay(carMk);
          var i = 1;
          function resetMkPoint(i) {
            carMk.setPosition(pts[i-1]);
            if (i < paths) {
              setTimeout(function () {
                i++;
                resetMkPoint(i);
              }, 200);
            } else if (i == paths) {
              i = 0;
              setTimeout(function () {
                i++;
                resetMkPoint(i);
              }, 200);
            }
          }
          setTimeout(function () {
            resetMkPoint(5);
          }, 100);
        });
      }
      setTimeout(function () {
        run();
      }, 1500);
      // function goWay() {
      //   var endLongs = getRound(endLong, endLat);
      //   endLong = endLongs[0];
      //   endLat = endLongs[1];
      //   drawIcon(startLong, startLat, endLong, endLat);
      // }
      // var i = 0;
      // function getRound(temp, temps) {
      //   // 坐标变化
      //   if (temp < 116.44 && temp >= 116.38 && temps == 39.915) {
      //     i += 0.01;
      //     return [temp + i * 0.0001, 39.915];
      //   } else if (temp >= 116.44 && temps >= 39.915 && temps < 39.952) {
      //     i += 0.01;
      //     return [116.44, temps + i * 0.0001];
      //   } else {
      //     return [116.38, 39.915];
      //   }
      // }
      // // 运动图片轨迹
      // function drawIcon(startLong, startLat, endLong, endLat) {
      //   if (peopleMk) {
      //     map.removeOverlay(peopleMk);
      //   }
      //   peopleMk = new BMapGL.Marker(
      //     new BMapGL.Point(endLong, endLat), //起始点的经纬度
      //     { icon: myIcon }
      //   );
      //   map.addOverlay(peopleMk);
      //   // if (endLong <= 116.44 && endLat <=39.952) {

      //   // } else {
      //   //   map.removeOverlay(peopleMk);
      //   // }
      // }
    },
  },
};
</script>

<style lang="stylus">
#allmap {
  .BMap_cpyCtrl {
    display: none;
  }

  .anchorBL {
    display: none;
  }
}
</style>