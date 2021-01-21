<template lang="pug">
	.container(:id='elId')
</template>
<script>
import uuidv1 from 'uuid/v1'
import echarts from 'echarts'
import "../../../../node_modules/echarts/map/js/china.js";
// const mapFeatures =require('./china.json')
export default {
	name:'echarts-line',
	data (){
		return{
			elId : '' ,//存储ID
		}
	},
	props: {                //接受父组件传递来的数据
		dataItems: {
			// type: Array,
			default () {}        //默认数据，没有数剧的情况下启用
		},
	},
	created (){
		this.elId = uuidv1() //获取随机id
	},
	mounted (){
		this.drawChart(this.dataItems);
	},
	watch:{
		dataItems:{
			handler(newVal, oldVal){
			this.drawChart(newVal, this.count);
			},
			deep: true,
		}
	},
	methods:{
		drawChart($data){
			const Echart = echarts.init(document.getElementById(this.elId));
			Echart.clear();
			var geoCoordMap = {};
			var chinaDatas = [
			[{
        name: '北京',
        value: 0.83
    }],
    [{
        name: '黑龙江',
        value: 0.88
    }],
    [{
        name: '内蒙古',
        value: 0.12
    }],
    [{
        name: '吉林',
        value: 0.89
    }],
    [{
        name: '辽宁',
        value: 0.86
    }],
    [{
        name: '河北',
        value: 0.88
    }],
    [{
        name: '天津',
        value: 0.71
    }],
    [{
        name: '山西',
        value: 0.63
    }],
    [{
        name: '陕西',
        value: 0.56
    }],
    [{
        name: '宁夏',
        value: 0.17
    }],
    [{
        name: '云南',
        value: 0.11
    }],
    [{
        name: '四川',
        value: 1
    }],
    [{
        name: '重庆',
        value: 0.80
    }],
    [{
        name: '山东',
        value: 0.77
    }],
    [{
        name: '河南',
        value: 0.75
    }],
    [{
        name: '江苏',
        value: 0.88
    }],
    [{
        name: '安徽',
        value: 0.73
    }],
    [{
        name: '湖北',
        value: 0.75
    }],
    [{
        name: '浙江',
        value: 0.82
    }],
    [{
        name: '福建',
        value: 0.67
    }],
    [{
        name: '江西',
        value: 0.71
    }],
    [{
        name: '湖南',
        value: 0.75
    }],
    [{
        name: '广东',
        value: 0.78
    }],
    [{
        name: '海南',
        value: 0.1
    }],
    [{
        name: '新疆',
        value: 0
    }],
    [{
        name: '上海',
        value: 0.91
    }]
];
			var mapFeatures = echarts.getMap('china').geoJson.features;
        mapFeatures.forEach(function (v) {
          // 地区名称
          var name = v.properties.name;
          // 地区经纬度
          geoCoordMap[name] = v.properties.cp;
        });
			var convertData = function(data) {
			    var res = [];
			    for (var i = 0; i < data.length; i++) {
			        var dataItem = data[i];
			        var fromCoord = geoCoordMap[dataItem[0].name];
			        var toCoord = [116.4551, 40.2539];
			        if (fromCoord && toCoord) {
			            res.push([{
			                coord: fromCoord,
			                value: dataItem[0].value
			            }, {
			                coord: toCoord,
			            }]);
			        }
			    }
			    return res;
			};
      var series = [];
				[
				    ['北京', chinaDatas]
				].forEach(function(item, i) {
				    // console.log(item)
				    series.push({
				            type: 'lines',
				            zlevel: 2,
				            effect: {
				                show: true,
				                period: 4, //箭头指向速度，值越小速度越快
				                trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
				                symbol: 'arrow', //箭头图标
				                symbolSize: 5, //图标大小
				            },
				            lineStyle: {
				                normal: {
				                    width: 1, //尾迹线条宽度
				                    opacity: 1, //尾迹线条透明度
				                    curveness: .3 //尾迹线条曲直度
				                }
				            },
				            data: convertData(item[1])
				        }, {
				            type: 'effectScatter',
				            coordinateSystem: 'geo',
				            zlevel: 2,
				            rippleEffect: { //涟漪特效
				                period: 4, //动画时间，值越小速度越快
				                brushType: 'stroke', //波纹绘制方式 stroke, fill
				                scale: 4 //波纹圆环最大限制，值越大波纹越大
				            },
				            label: {
				                normal: {
				                    show: true,
				                    position: 'right', //显示位置
				                    offset: [5, 0], //偏移设置
				                    formatter: function(params) { //圆环显示文字
				                        return params.data.name;
				                    },
				                    fontSize: 13
				                },
				                emphasis: {
				                    show: true
				                }
				            },
				            symbol: 'circle',
				            symbolSize: function(val) {
				                return 5 + val[2] * 5; //圆环大小
				            },
				            itemStyle: {
				                normal: {
				                    show: false,
				                    color: '#f00'
				                }
				            },
				            data: item[1].map(function(dataItem) {
			                return {
		                    name: dataItem[0].name,
		                    value: geoCoordMap[dataItem[0].name].concat(dataItem[0].value)
			                };
				            }),
				        },
				        //被攻击点
				        {
				            type: 'scatter',
				            coordinateSystem: 'geo',
				            zlevel: 2,
				            rippleEffect: {
				                period: 4,
				                brushType: 'stroke',
				                scale: 4
				            },
				            label: {
				                normal: {
				                    show: true,
				                    position: 'right',
				                    //offset:[5, 0],
				                    color: '#0f0',
				                    formatter: '{b}',
				                    textStyle: {
				                        color: "#0f0"
				                    }
				                },
				                emphasis: {
				                    show: true,
				                    color: "#f60"
				                }
				            },
				            symbol: 'pin',
				            symbolSize: 50,
				            data: [{
				                name: item[0],
				                value: geoCoordMap[item[0]].concat([10]),
				            }],
				        }
				    );
				});
      var option = {
         tooltip: {
		        trigger: 'item',
		        borderColor: '#FFFFCC',
		        showDelay: 0,
		        hideDelay: 0,
		        enterable: true,
		        transitionDuration: 0,
		        extraCssText: 'z-index:100',
		    },
		    visualMap: { //图例值控制
		        min: 0,
		        max: 1,
		        calculable: true,
		        show: true,
		        color: ['#f44336', '#fc9700', '#ffde00', '#ffde00', '#00eaff'],
		        textStyle: {
		            color: '#fff'
		        }
		    },
		    geo: {
		        map: 'china',
		        zoom: 1.2,
		        label: {
		            emphasis: {
		                show: false
		            }
		        },
		        roam: true, //是否允许缩放
		        itemStyle: {
		            normal: {
		                color: 'rgba(51, 69, 89, .5)', //地图背景色
		                borderColor: '#516a89', //省市边界线00fcff 516a89
		                borderWidth: 1
		            },
		            emphasis: {
		                color: 'rgba(37, 43, 61, .5)' //悬浮背景
		            }
		        }
		    },
		    series: series
      }
			Echart.setOption(option);
		}
	}
}
</script>
<style lang="stylus" scoped>
.container
	width: 100%;
	height: 100%;
</style>


