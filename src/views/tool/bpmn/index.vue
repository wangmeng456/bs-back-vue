<template>
  <div class="containers">
    <div class="canvas" ref="canvas" />
    <panel v-if="bpmnModeler" :modeler="bpmnModeler" />
    <div class="toolbar">
      <el-button size="medium" type="text" @click="retreat">撤销</el-button>
      <el-button size="medium" type="text" @click="advance">恢复撤销</el-button>
      <!-- <a ref="saveDiagram" href="javascript:" title="download BPMN diagram">下载BPMN</a> -->
      <!-- <a ref="saveSvg" href="javascript:" title="download as SVG image">下载SVG</a> -->
      <el-button size="medium" type="text" @click="exportBpmn">下载BPMN</el-button>
      <el-button size="medium" type="text" @click="exportSvg">下载SVG</el-button>
      <el-button size="medium" type="text" @click="saveData">保存</el-button>
      <!-- <a title="download">下载</a>
      <a ref="saveDiagram" href="javascript:" title="download BPMN diagram">BPMN</a>
      <a ref="saveSvg" href="javascript:" title="download as SVG image">SVG</a>
      <el-button @click="a">hah</el-button> -->
    </div>
    <div class="zoombar">
      <el-button size="mini" icon="el-icon-zoom-out" :disabled="percentage==0.1" @click="handleZoom('less')"></el-button>
      <span @dblclick="resetView">{{parseInt(percentage * 100)}}%</span>
      <el-button size="mini" icon="el-icon-zoom-in" :disabled="percentage==2" @click="handleZoom('plus')"></el-button>
    </div>
  </div>
</template>

<script>
import BpmnModeler from "bpmn-js/lib/Modeler"; // bpmn-js 设计器
import panel from "./PropertyPanel.vue"; // 属性面板
import customTranslate from './customTranslate';
import BpmData from "./BpmData.js";
import { dpmnApi } from '@/api/system/config.js'
export default {
  data() {
    return {
      bpmnModeler: null,
      element: null,
      bpmData: new BpmData(),
      params: null,

      //
      step: 0.1,
      percentage: 1.0

    };
  },
  components: {
    panel
  },
  created (){
    this.params = this.$route.params;
  },
  methods: {
    createNewDiagram() {
      const bpmnXmlStr = `
      <?xml version="1.0" encoding="UTF-8"?>
        <bpmn2:definitions xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="sample-diagram" targetNamespace="http://bpmn.io/schema/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">
          <bpmn2:process id="process1567044459787" name="流程1567044459787">
            <bpmn2:documentation>描述</bpmn2:documentation>
            <bpmn2:startEvent id="StartEvent_01ydzqe" name="开始">
              <bpmn2:outgoing>SequenceFlow_1qw929z</bpmn2:outgoing>
            </bpmn2:startEvent>
            <bpmn2:sequenceFlow id="SequenceFlow_1qw929z" sourceRef="StartEvent_01ydzqe" targetRef="Task_1piqdk6" />
            <bpmn2:userTask id="Task_1piqdk6" name="请假申请">
              <bpmn2:incoming>SequenceFlow_1qw929z</bpmn2:incoming>
              <bpmn2:outgoing>SequenceFlow_11h4o22</bpmn2:outgoing>
            </bpmn2:userTask>
            <bpmn2:exclusiveGateway id="ExclusiveGateway_0k39v3u">
              <bpmn2:incoming>SequenceFlow_11h4o22</bpmn2:incoming>
              <bpmn2:outgoing>SequenceFlow_1iu7pfe</bpmn2:outgoing>
              <bpmn2:outgoing>SequenceFlow_04uqww2</bpmn2:outgoing>
            </bpmn2:exclusiveGateway>
            <bpmn2:sequenceFlow id="SequenceFlow_11h4o22" sourceRef="Task_1piqdk6" targetRef="ExclusiveGateway_0k39v3u" />
            <bpmn2:sequenceFlow id="SequenceFlow_1iu7pfe" sourceRef="ExclusiveGateway_0k39v3u" targetRef="Task_10fqcwp" />
            <bpmn2:userTask id="Task_10fqcwp" name="经理审批">
              <bpmn2:incoming>SequenceFlow_1iu7pfe</bpmn2:incoming>
              <bpmn2:outgoing>SequenceFlow_1xod8nh</bpmn2:outgoing>
            </bpmn2:userTask>
            <bpmn2:sequenceFlow id="SequenceFlow_04uqww2" sourceRef="ExclusiveGateway_0k39v3u" targetRef="Task_15n23yh" />
            <bpmn2:userTask id="Task_15n23yh" name="总部审批">
              <bpmn2:incoming>SequenceFlow_04uqww2</bpmn2:incoming>
              <bpmn2:outgoing>SequenceFlow_0c8wrs4</bpmn2:outgoing>
            </bpmn2:userTask>
            <bpmn2:exclusiveGateway id="ExclusiveGateway_1sq33g6">
              <bpmn2:incoming>SequenceFlow_0c8wrs4</bpmn2:incoming>
              <bpmn2:incoming>SequenceFlow_1xod8nh</bpmn2:incoming>
              <bpmn2:outgoing>SequenceFlow_0h8za82</bpmn2:outgoing>
            </bpmn2:exclusiveGateway>
            <bpmn2:sequenceFlow id="SequenceFlow_0c8wrs4" sourceRef="Task_15n23yh" targetRef="ExclusiveGateway_1sq33g6" />
            <bpmn2:sequenceFlow id="SequenceFlow_1xod8nh" sourceRef="Task_10fqcwp" targetRef="ExclusiveGateway_1sq33g6" />
            <bpmn2:endEvent id="EndEvent_0pnmjd3">
              <bpmn2:incoming>SequenceFlow_0h8za82</bpmn2:incoming>
            </bpmn2:endEvent>
            <bpmn2:sequenceFlow id="SequenceFlow_0h8za82" sourceRef="ExclusiveGateway_1sq33g6" targetRef="EndEvent_0pnmjd3" />
          </bpmn2:process>
          <bpmndi:BPMNDiagram id="BPMNDiagram_1">
            <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="process1567044459787">
              <bpmndi:BPMNShape id="StartEvent_01ydzqe_di" bpmnElement="StartEvent_01ydzqe">
                <dc:Bounds x="532" y="72" width="36" height="36" />
                <bpmndi:BPMNLabel>
                  <dc:Bounds x="539" y="53" width="22" height="14" />
                </bpmndi:BPMNLabel>
              </bpmndi:BPMNShape>
              <bpmndi:BPMNEdge id="SequenceFlow_1qw929z_di" bpmnElement="SequenceFlow_1qw929z">
                <di:waypoint x="550" y="108" />
                <di:waypoint x="550" y="150" />
              </bpmndi:BPMNEdge>
              <bpmndi:BPMNShape id="UserTask_1qxjy46_di" bpmnElement="Task_1piqdk6">
                <dc:Bounds x="500" y="150" width="100" height="80" />
              </bpmndi:BPMNShape>
              <bpmndi:BPMNShape id="ExclusiveGateway_0k39v3u_di" bpmnElement="ExclusiveGateway_0k39v3u" isMarkerVisible="true">
                <dc:Bounds x="525" y="275" width="50" height="50" />
              </bpmndi:BPMNShape>
              <bpmndi:BPMNEdge id="SequenceFlow_11h4o22_di" bpmnElement="SequenceFlow_11h4o22">
                <di:waypoint x="550" y="230" />
                <di:waypoint x="550" y="275" />
              </bpmndi:BPMNEdge>
              <bpmndi:BPMNEdge id="SequenceFlow_1iu7pfe_di" bpmnElement="SequenceFlow_1iu7pfe">
                <di:waypoint x="575" y="300" />
                <di:waypoint x="680" y="300" />
                <di:waypoint x="680" y="380" />
              </bpmndi:BPMNEdge>
              <bpmndi:BPMNShape id="UserTask_18pwui1_di" bpmnElement="Task_10fqcwp">
                <dc:Bounds x="630" y="380" width="100" height="80" />
              </bpmndi:BPMNShape>
              <bpmndi:BPMNEdge id="SequenceFlow_04uqww2_di" bpmnElement="SequenceFlow_04uqww2">
                <di:waypoint x="525" y="300" />
                <di:waypoint x="430" y="300" />
                <di:waypoint x="430" y="380" />
              </bpmndi:BPMNEdge>
              <bpmndi:BPMNShape id="UserTask_1j0us24_di" bpmnElement="Task_15n23yh">
                <dc:Bounds x="380" y="380" width="100" height="80" />
              </bpmndi:BPMNShape>
              <bpmndi:BPMNShape id="ExclusiveGateway_1sq33g6_di" bpmnElement="ExclusiveGateway_1sq33g6" isMarkerVisible="true">
                <dc:Bounds x="525" y="515" width="50" height="50" />
              </bpmndi:BPMNShape>
              <bpmndi:BPMNEdge id="SequenceFlow_0c8wrs4_di" bpmnElement="SequenceFlow_0c8wrs4">
                <di:waypoint x="430" y="460" />
                <di:waypoint x="430" y="540" />
                <di:waypoint x="525" y="540" />
              </bpmndi:BPMNEdge>
              <bpmndi:BPMNEdge id="SequenceFlow_1xod8nh_di" bpmnElement="SequenceFlow_1xod8nh">
                <di:waypoint x="680" y="460" />
                <di:waypoint x="680" y="540" />
                <di:waypoint x="575" y="540" />
              </bpmndi:BPMNEdge>
              <bpmndi:BPMNShape id="EndEvent_0pnmjd3_di" bpmnElement="EndEvent_0pnmjd3">
                <dc:Bounds x="532" y="602" width="36" height="36" />
              </bpmndi:BPMNShape>
              <bpmndi:BPMNEdge id="SequenceFlow_0h8za82_di" bpmnElement="SequenceFlow_0h8za82">
                <di:waypoint x="550" y="565" />
                <di:waypoint x="550" y="602" />
              </bpmndi:BPMNEdge>
            </bpmndi:BPMNPlane>
          </bpmndi:BPMNDiagram>
        </bpmn2:definitions>
      `;
      const { bpmnXml, modelId, name, description, revision } = this.params;
      let baseBpmnXml = '';
      const defaultBpmnXml = `
        <?xml version="1.0" encoding="UTF-8"?>
        <bpmn2:definitions xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" id="sample-diagram" targetNamespace="http://bpmn.io/schema/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">
          <bpmn2:process id="process${modelId}" name="${name}">
            <bpmn2:documentation>${description}</bpmn2:documentation>
          </bpmn2:process>
          <bpmndi:BPMNDiagram id="BPMNDiagram_1">
            <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="process${modelId}" />
          </bpmndi:BPMNDiagram>
        </bpmn2:definitions>`;
      bpmnXml == '' ? baseBpmnXml = defaultBpmnXml : baseBpmnXml = bpmnXml;
      // 将字符串转换成图显示出来
      this.bpmnModeler.importXML(baseBpmnXml, (err, a) => {
        if (err) {
          // console.error(err);
        } else {
          // this.adjustPalette();
        }
      });
    },
    // 调整左侧工具栏排版
    adjustPalette() {
      try {
        // 获取 bpmn 设计器实例
        const canvas = this.$refs.canvas;
        const djsPalette = canvas.children[0].children[1].children[4];
        // const djsPalStyle = {
        //   width: "130px",
        //   padding: "5px",
        //   background: "white",
        //   left: "20px",
        //   borderRadius: 0
        // };
        for (var key in djsPalStyle) {
          djsPalette.style[key] = djsPalStyle[key];
        }
        const palette = djsPalette.children[0];
        const allGroups = palette.children;
        // allGroups[0].style["display"] = "none";
        // 修改控件样式
        for (var gKey in allGroups) {
          const group = allGroups[gKey];
          for (var cKey in group.children) {
            const control = group.children[cKey];
            // const controlStyle = {
            //   display: "flex",
            //   justifyContent: "flex-start",
            //   alignItems: "center",
            //   width: "100%",
            //   padding: "5px"
            // };
            if (
              control.className &&
              control.dataset &&
              control.className.indexOf("entry") !== -1
            ) {
              const controlProps = this.bpmData.getControl(
                control.dataset.action
              );
              control.innerHTML = `<div style='font-size: 14px;font-weight:500;margin-left:15px;'>${
                controlProps["title"]
              }</div>`;
              for (var csKey in controlStyle) {
                control.style[csKey] = controlStyle[csKey];
              }
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
    },
    // 下载为SVG格式,done是个函数，调用的时候传入的
    saveSVG(done) {
      console.log(done)
      // 把传入的done再传给bpmn原型的saveSVG函数调用
      // this.bpmnModeler.saveSVG({ format: true }, (err, data) => {});
      //  _this.setEncoded(downloadSvgLink, "diagram.svg", err ? null : svg);
    },
    // 下载为SVG格式,done是个函数，调用的时候传入的
    saveDiagram(done) {
      // 把传入的done再传给bpmn原型的saveXML函数调用
      this.bpmnModeler.saveXML({ format: true }, function(err, xml) {
        done(err, xml);
        if(!err){
          console.log(xml)
        }
        
      });
    },
    // 导出bpmn文件
    exportBpmn() {
      this.bpmnModeler.saveXML({ format: true }, (err, xml) => {
        if (err) {
          return console.error('无法保存BPMN 2.0关系图', err)
        }
        console.log(xml)
        // this.download('bpmn', xml, '工作流程图.bpmn');
        // 如果浏览器支持msSaveOrOpenBlob方法（也就是使用IE浏览器的时候）
        // if (window.navigator.msSaveOrOpenBlob) {
        //   var blob = new Blob([xml], { type: 'text/plain' })
        //   window.navigator.msSaveOrOpenBlob(blob, '工作流程图BPMN20.bpmn')
        // } else {
        //   var eleLink = document.createElement('a')
        //   eleLink.download = '工作流程图BPMN20.bpmn'
        //   eleLink.style.display = 'none'
        //   const blob = new Blob([xml]) // 字符内容转变成blob地址
        //   eleLink.href = URL.createObjectURL(blob)
        //   document.body.appendChild(eleLink) // 触发点击
        //   eleLink.click()
        //   document.body.removeChild(eleLink) // 然后移除
        // }
      })
    },
    // 导出图片
    exportSvg() {
      this.bpmnModeler.saveSVG({ format: true }, (err, data) => {
        this.download('svg', data, '工作流程图.svg');
      });
      // if (window.navigator.msSaveOrOpenBlob) {
      //   console.log('IE浏览器无法下载，建议使用谷歌浏览器')
      //   return
      // }
      //  this.setEncoded(downloadSvgLink, "diagram.svg", err ? null : svg);
      // 获取SVG数据（图片）
      // this.bpmnModeler.saveSVG({ format: true }, (err, data) => {
      //   if (err) {
      //     console.log('保存失败')
      //   }
      //   var svgXml = data
      //   var canvas = document.createElement('canvas') // 准备空画布
      //   canvas.width = '1000px'
      //   canvas.height = screen.availHeight
      //   canvg(canvas, svgXml)
      //   var imagedata = canvas.toDataURL('image/png')
      //   // console.log(imagedata)
      //   // 如果浏览器支持msSaveOrOpenBlob方法（也就是使用IE浏览器的时候）
      //   if (window.navigator.msSaveOrOpenBlob) {
      //     var bstr = atob(imagedata.split(',')[1])
      //     var n = bstr.length
      //     var u8arr = new Uint8Array(n)
      //     while (n--) {
      //       u8arr[n] = bstr.charCodeAt(n)
      //     }
      //     var blob = new Blob([u8arr])
      //     window.navigator.msSaveOrOpenBlob(blob, '工作流程图.png')
      //   } else {
      //     var a = document.createElement('a')
      //     a.href = imagedata // 将画布内的信息导出为png图片数据
      //     a.download = '工作流程图' // 设定下载名称
      //     a.click() // 点击触发下载
      //   }
      // })
    },
    // 前进 下一步
    advance() {
      this.bpmnModeler.get('commandStack').redo()
    },
    // 后退 上一步
    retreat() {
      this.bpmnModeler.get('commandStack').undo()
    },
    // 缩放
    handleZoom(val) {
      if ( val === 'less' ) this.percentage = (parseFloat(this.percentage) - parseFloat(this.step)).toFixed(1);
      else this.percentage = (parseFloat(this.percentage) + parseFloat(this.step)).toFixed(1);
      this.bpmnModeler.get('canvas').zoom(this.percentage)
    },
    // 恢复缩放
    resetView(){
      //恢复到原位
      this.percentage = 1;
      this.bpmnModeler.get('canvas').zoom('fit-viewport')
    },
    // 保存数据
    saveData(){
      const me = this;
      this.bpmnModeler.saveXML({ format: true }, (err, xml) =>{
        if(err){
          me.$message.error("流程数据生成出错！！！");
          return;
        }
        console.log(xml);
        me.bpmnModeler.saveSVG({ format: true }, (err, data) => {
          if(err){
            me.$message.error("SVG数据生成出错！！！");
            return;
          }
          // 保存数据
          me.dpmnSave(xml, data);
        });
      });
    },
    dpmnSave(bpmn, svg){
      const modelId = this.params.modelId;
      dpmnApi.dpmnSave(modelId, bpmn, svg)
      .then(res => {
        if( res.code == 200) {
          this.$message.success(res.msg);
          this.$store.dispatch('tagsView/delView', this.$route).then(({ visitedViews }) => {
            this.$router.push('processModel');
          })
        }
      })
      .finally(()=>{})
    },
    // 下载xml/svg
    download(type, data, name) {
      // 下载xml/svg
      let dataTrack = ''
      const a = document.createElement('a')
      switch (type) {
        case 'bpmn':
          dataTrack = 'bpmn'
          break
        case 'svg':
          dataTrack = 'svg'
          break
        default:
          break
      }
      const reName = name || `diagram.${dataTrack}`
      a.setAttribute(
        'href',
        `data:application/bpmn20-xml;charset=UTF-8,${encodeURIComponent(data)}`
      )
      a.setAttribute('target', '_blank')
      a.setAttribute('dataTrack', `diagram:download-${dataTrack}`)
      a.setAttribute('download', reName)
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    },
    // 当图发生改变的时候会调用这个函数，这个data就是图的xml
    setEncoded(link, name, data) {
      // 把xml转换为URI，下载要用到的
      const encodedData = encodeURIComponent(data);
      // 获取到图的xml，保存就是把这个xml提交给后台
      this.xmlStr = data;
      // 下载图的具体操作,改变a的属性，className令a标签可点击，href令能下载，download是下载的文件的名字
      if (data) {
        link.className = "active";
        link.href = "data:application/bpmn20-xml;charset=UTF-8," + encodedData;
        link.download = name;
      }
    }
  },
  mounted() {
    const canvas = this.$refs.canvas;
    // 生成实例
    var customTranslateModule = {
      translate: [ 'value', customTranslate ]
    };
    this.bpmnModeler = new BpmnModeler({
      container: canvas,
      additionalModules:[
        customTranslateModule
      ]
    });

    // 获取a标签dom节点
    const downloadLink = this.$refs.saveDiagram;
    const downloadSvgLink = this.$refs.saveSvg;
    // 监听流程图改变事件
    const _this = this;
    // this.bpmnModeler.on("commandStack.changed", function() {
    //   _this.saveSVG(function(err, svg) {
    //     _this.setEncoded(downloadSvgLink, "diagram.svg", err ? null : svg);
    //   });
    //   _this.saveDiagram(function(err, xml) {
    //     _this.setEncoded(downloadLink, "diagram.bpmn", err ? null : xml);
    //   });
    // });

    // 新增流程定义
    this.createNewDiagram();
    window.addEventListener('beforeunload', (e) => {
      // Cancel the event as stated by the standard.
      e = e || window.event
      if ( window.location.pathname != '/system/tool/bpmn' ){
        e.preventDefault();
        return;
      }
      if (e) {
        e.returnValue = '关闭提示'
      }
      // Chrome requires returnValue to be set.
      return '关闭提示'
    });
  },
  destroyed () {
    window.removeEventListener('beforeunload',(e)=>{})
  },
};
</script>

<style lang="scss">
/*左边工具栏以及编辑节点的样式*/
@import "~bpmn-js/dist/assets/diagram-js.css";
@import "~bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
@import "~bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css";
@import "~bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
.containers {
  position: absolute;
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  .canvas {
    width: 100%;
    height: 100%;
  }
  .panel {
    position: absolute;
    right: 0;
    top: 50px;
    width: 300px;
  }
  .bjs-powered-by {
    display: none;
  }
  .toolbar {
    position: absolute;
    top: 20px;
    right: 197px;
    a {
      text-decoration: none;
      margin: 5px;
      color: #409eff;
    }
  }
  .zoombar{
    position: absolute;
    bottom: 20px;
    right: 220px;
    span{
      color: #606266;
      user-select: none;
      cursor: pointer;
      display: inline-block;
      padding: 0px 10px;
    }
  }
}
</style>
