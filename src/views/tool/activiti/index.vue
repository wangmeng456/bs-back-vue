<template>
  <div>
    <!--   表单区域   -->
    <!-- <div class="chunk">
      <el-link icon="el-icon-arrow-left" @click="Create()">返回</el-link>
      <el-form ref="params" :model="params" :rules="rules" :inline="true">
        <el-form-item label="流程名称：" prop="modelName">
          <el-input v-model="params.modelName" placeholder="请输入" clearable/>
        </el-form-item>
        <el-form-item label="版本：" prop="modelKey">
          <el-input v-model="params.modelKey" placeholder="请输入" clearable/>
        </el-form-item>
      </el-form>
    </div> -->
    <div ref="content" class="containers">
      <div ref="canvas" class="canvas">
        <panel v-if="bpmnModeler" :modeler="bpmnModeler" />
        <div style="margin-bottom: 10px">
          <!-- 保存 -->
          <el-button icon="el-icon-folder-checked" @click="saveBpmn('params')">保存</el-button>
          <!-- 导入 -->
          <input id="btn_file" type="file" style="display:none" @change="showBPMN">
          <el-button icon="el-icon-folder-opened" @click="Import()">导入</el-button>
          <!-- 导出 -->
          <el-button icon="el-icon-download" @click="Export()">导出BPMN</el-button>
          <!-- 导出 -->
          <el-button icon="el-icon-picture-outline" @click="ExportImg()">导出图片</el-button>
          <!-- 前进 -->
          <el-button icon="el-icon-folder-checked" @click="advance()">前进</el-button>
          <!-- 后退 -->
          <el-button icon="el-icon-folder-checked" @click="retreat()">后退</el-button>
        </div>
      </div>
      <div id="js-properties-panel" class="panel"/>
    </div>
    <!--选择考勤人员-->
    <el-dialog width="600px" title="选择参与考勤人员" :visible.sync="innerVisible" append-to-body>
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple">
            <el-input v-model="filterText" placeholder="输入关键字进行过滤"/>
            <el-divider/>
            <el-scrollbar style="border: 1px solid #DCDFE6;">
              <el-tree
                ref="tree"
                :data="treeData"
                accordion
                node-key="id"
                :default-expanded-keys="attendancePersonnel"
                :default-checked-keys="attendancePersonnel "
                highlight-current
                :props="{children: 'children',label: 'name'}"
                :filter-node-method="filterNode"
                style="height: 277px;"
              >
                <span slot-scope="{ data }" class="custom-tree-node">
                  <el-radio v-if="data.role" v-model="UserObj" :label="data.userEmployeeId">{{ data.name }}</el-radio>
                  <span v-else>{{ data.name }}</span>
                </span>
              </el-tree>
            </el-scrollbar>
          </div>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false">取消</el-button>
        <el-button type="primary" @click="getCheckedNodes">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  // import { getCorpStructure } from '@/api/system-setup'
  // 引入相关的依赖
  // import BpmnViewer from 'bpmn-js'
  import BpmnModeler from 'bpmn-js/lib/Modeler'
  import propertiesPanelModule from 'bpmn-js-properties-panel'
  import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda'
  import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda'
  import panel from "./PropertyPanel"; // 属性面板
  import customTranslate from './customTranslate';
  import BpmData from "./BpmData";
  // 图片转换
  import canvg from 'canvg'
  // api接口
  // import { saveModel, modelsShows, modifyModels } from '@/api/Approval-manage/approvalManage'

  var Vue = {
    name: 'Bpmn',
    props: ['modelId'],
    components: {
      panel
    },
    data() {
      return {
        bpmData: new BpmData(),
        // 流程对象
        params: {
          modelId: '', //     模型编号
          modelName: '', //   模型名称
          modelKey: '', //    模型key(版本)
          modelImage: '', //  模型图片
          modelXml: '' //     模型文件
        },
        rules: {
          modelName: [{ required: true, message: '请输入流程名称', trigger: 'blur' }],
          modelKey: [{ required: true, message: '请输入版本号', trigger: 'blur' }]
        },
        // bpmn建模器
        bpmnModeler: null,
        container: null,
        canvas: null,
        filterText: '',
        treeData: [], // 树控件数据集合（员工信息）,
        attendancePersonnel: [], //   参与人员
        UserObj: '', // 选中的人
        e: null,
        innerVisible: false // 选择员工弹出层
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val)
      }
    },
    mounted() {
      var than = this
      // 流程设计模块的点击事件
      window.showUserInfo = function(e) {
        than.innerVisible = true
        than.e = e
      }
      // 获取到属性ref为“content”的dom节点
      this.container = this.$refs.content
      // 获取到属性ref为“canvas”的dom节点
      const canvas = this.$refs.canvas
      // 建模，官方文档这里讲的很详细
      var customTranslateModule = {
        translate: [ 'value', customTranslate ]
      };
      this.bpmnModeler = new BpmnModeler({
        container: canvas,
        // 添加控制板
        propertiesPanel: {
          parent: '#js-properties-panel'
        },
        additionalModules: [
          // customTranslate,
          propertiesProviderModule, // 左边工具栏以及节点
          // propertiesPanelModule, // 右边的工具栏
          customTranslateModule,
        ],
        // 如果您想在属性面板中维护camunda:XXX属性，则需要该属性
        moddleExtensions: {
          camunda: camundaModdleDescriptor
        }
      })
      // this.getCorpStructure()
      if (this.modelId) {
        this.params.modelId = this.modelId
        modelsShows(this.params.modelId).then(res => {
          this.params = res.data
          this.createNewDiagram(res.data.modelXml)
        })
      } else {
        this.createNewDiagram('')
      }
    },
    methods: {
      
      // 返回
      Create() {
        this.$emit('transfer', '') // 将值绑定到transfer上传递过去
        // this.$router.push({ path: 'bpmn', query: { approvalSetId: 1, publishedList: 1, create: true }})
      },
      // 流程设计模板创建
      createNewDiagram(bpmnXML) {
        const me = this;
        if (bpmnXML === '' || bpmnXML === null) {
          bpmnXML = '<?xml version="1.0" encoding="UTF-8"?>\n' +
            '<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:camunda="http://camunda.org/schema/1.0/bpmn" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:activiti="http://activiti.org/bpmn" xmlns:tns="http://www.activiti.org/testm1568796216967" xmlns:xsd="http://www.w3.org/2001/XMLSchema" id="m1568796216967" name="" targetNamespace="http://www.activiti.org/testm1568796216967">\n' +
            '  <process id="myProcess_1" processType="None" isClosed="false" isExecutable="true" />\n' +
            '  <bpmndi:BPMNDiagram id="Diagram-_1" name="New Diagram" documentation="background=#FFFFFF;count=1;horizontalcount=1;orientation=0;width=842.4;height=1195.2;imageableWidth=832.4;imageableHeight=1185.2;imageableX=5.0;imageableY=5.0">\n' +
            '    <bpmndi:BPMNPlane bpmnElement="myProcess_1" />\n' +
            '  </bpmndi:BPMNDiagram>\n' +
            '</definitions>'
        }
        // 将字符串转换成图显示出来
        this.bpmnModeler.importXML(bpmnXML, function(err) {
          if (err) {
            return console.error('could not import BPMN 2.0 diagram', err)
          } else {
            me.adjustPalette();
          }
        })
      },
      // 调整左侧工具栏排版
      adjustPalette() {
        try {
          // 获取 bpmn 设计器实例
          const canvas = this.$refs.canvas;
          // console.log(canvas)
          const djsPalette = canvas.children[0].children[1].children[4];
          console.log(djsPalette)
          // const djsPalStyle = {
          //   width: "130px",
          //   padding: "5px",
          //   background: "white",
          //   left: "20px",
          //   borderRadius: 0
          // };
          // for (var key in djsPalStyle) {
          //   djsPalette.style[key] = djsPalStyle[key];
          // }
          // const palette = djsPalette.children[0];
          // const allGroups = palette.children;
          // allGroups[0].style["display"] = "none";
          // // 修改控件样式
          // for (var gKey in allGroups) {
          //   const group = allGroups[gKey];
          //   for (var cKey in group.children) {
          //     const control = group.children[cKey];
          //     const controlStyle = {
          //       display: "flex",
          //       justifyContent: "flex-start",
          //       alignItems: "center",
          //       width: "100%",
          //       padding: "5px"
          //     };
          //     if (
          //       control.className &&
          //       control.dataset &&
          //       control.className.indexOf("entry") !== -1
          //     ) {
          //       const controlProps = this.bpmData.getControl(
          //         control.dataset.action
          //       );
          //       control.innerHTML = `<div style='font-size: 14px;font-weight:500;margin-left:15px;'>${
          //         controlProps["title"]
          //       }</div>`;
          //       for (var csKey in controlStyle) {
          //         control.style[csKey] = controlStyle[csKey];
          //       }
          //     }
          //   }
          // }
        } catch (e) {
          console.log(e);
      }
      },
      // 保存
      saveBpmn(formName) {
        var than = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 获取XML数据
            than.bpmnModeler.saveXML({ format: true }, function(err, xml) {
              if (!err) {
                than.params.modelXml = xml
                // 获取SVG数据（图片）
                than.bpmnModeler.saveSVG({ format: true }, (err, data) => {
                  if (!err) {
                    var svgXml = data
                    var canvas = document.createElement('canvas') // 准备空画布
                    canvas.width = '1000px'
                    canvas.height = screen.availHeight
                    canvg(canvas, svgXml)
                    var imagedata = canvas.toDataURL('image/png')
                    than.params.modelImage = imagedata
                    if (than.modelId) {
                      // modifyModels(than.params).then(res => {
                      //   if (delop.message(than, res)) {
                      //     than.Create()
                      //   }
                      // })
                    } else {
                      // saveModel(than.params).then(res => {
                      //   if (delop.message(than, res)) {
                      //     than.Create()
                      //   }
                      // })
                    }
                  }
                })
              }
            })
          } else {
            return false
          }
        })
      },
      // 导入
      Import() {
        document.getElementById('btn_file').click()
      },
      showBPMN() {
        var than = this
        var file = document.getElementById('btn_file').files[0]
        var URL = window.URL || window.webkitURL
        var imgURL = URL.createObjectURL(file)
        $.ajax({
          type: 'get',
          url: imgURL,
          dataType: 'text', // 返回格式
          success: function(data) {
            than.createNewDiagram(data)
          }
        })
      },
      // 导出bpmn文件
      Export() {
        this.bpmnModeler.saveXML({ format: true }, function(err, xml) {
          if (err) {
            return console.error('无法保存BPMN 2.0关系图', err)
          }
          // 如果浏览器支持msSaveOrOpenBlob方法（也就是使用IE浏览器的时候）
          if (window.navigator.msSaveOrOpenBlob) {
            var blob = new Blob([xml], { type: 'text/plain' })
            window.navigator.msSaveOrOpenBlob(blob, '工作流程图BPMN20.bpmn')
          } else {
            var eleLink = document.createElement('a')
            eleLink.download = '工作流程图BPMN20.bpmn'
            eleLink.style.display = 'none'
            const blob = new Blob([xml]) // 字符内容转变成blob地址
            eleLink.href = URL.createObjectURL(blob)
            document.body.appendChild(eleLink) // 触发点击
            eleLink.click()
            document.body.removeChild(eleLink) // 然后移除
          }
        })
      },
      // 导出图片
      ExportImg() {
        if (window.navigator.msSaveOrOpenBlob) {
          console.log('IE浏览器无法下载，建议使用谷歌浏览器')
          return
        }
        // 获取SVG数据（图片）
        this.bpmnModeler.saveSVG({ format: true }, (err, data) => {
          if (err) {
            console.log('保存失败')
          }
          var svgXml = data
          var canvas = document.createElement('canvas') // 准备空画布
          canvas.width = '1000px'
          canvas.height = screen.availHeight
          canvg(canvas, svgXml)
          var imagedata = canvas.toDataURL('image/png')
          // console.log(imagedata)
          // 如果浏览器支持msSaveOrOpenBlob方法（也就是使用IE浏览器的时候）
          if (window.navigator.msSaveOrOpenBlob) {
            var bstr = atob(imagedata.split(',')[1])
            var n = bstr.length
            var u8arr = new Uint8Array(n)
            while (n--) {
              u8arr[n] = bstr.charCodeAt(n)
            }
            var blob = new Blob([u8arr])
            window.navigator.msSaveOrOpenBlob(blob, '工作流程图.png')
          } else {
            var a = document.createElement('a')
            a.href = imagedata // 将画布内的信息导出为png图片数据
            a.download = '工作流程图' // 设定下载名称
            a.click() // 点击触发下载
          }
        })
      },
      // 前进
      advance() {
        this.bpmnModeler.get('commandStack').redo()
      },
      // 后退
      retreat() {
        this.bpmnModeler.get('commandStack').undo()
      },
      // 选择代理人关键字搜索
      filterNode(value, data) {
        if (!value) return true
        return data.name.indexOf(value) !== -1
      },
      // 查询公司组织树信息
      // getCorpStructure() {
      //   getCorpStructure().then(res => {
      //     this.treeData = [res.data]
      //     this.option(this.treeData)
      //   })
      // },
      // 查询公司组织用户数据
      option(options) {
        const than = this
        if (options != null && options.length > 0) {
          options.forEach(function(obj1, i) {
            if (obj1.userInfo && JSON.parse(obj1.userInfo).length > 0) {
              var user = JSON.parse(obj1.userInfo)
              user.forEach(function(obj, index) {
                obj.role = 'user'
              })
              obj1.children = user
            }
            than.option(obj1.children)
          })
        }
      }, // 选中的考勤人员
      getCheckedNodes() {
        var input = this.e.previousElementSibling
        $(input).val(this.UserObj)
        // 以下代码必须添加，不然文本框内容填充无效。
        var changeEvent = document.createEvent('HTMLEvents') // 创建输入框修改事件
        changeEvent.initEvent('change', true, true)
        $(input)[0].dispatchEvent(changeEvent) // 触发修改事件
        this.innerVisible = false
      }
    }
  }
  export default Vue
</script>

<style scoped>
  /*左边工具栏以及编辑节点的样式*/
  @import '~bpmn-js/dist/assets/diagram-js.css';
  @import '~bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
  @import '~bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css';
  @import '~bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';
  /*!*右边工具栏样式*!*/
  @import '~bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css';

  .containers {
    position: absolute;
    background-color: #ffffff;
    width: 98%;
    height: calc(100vh - 105px);
  }

  .canvas {
    float: left;
    border: 1px solid #eee;
    width: 80%;
    height: 100%;
  }
  .panel {
    float: right;
    width: 20%;
  }
</style>
<style lang="scss">
.containers {
  .panel{
    .bpp-properties-tab{
      height: calc(100vh - 185px);;
      overflow-y: auto !important;
    }
    .bpp-properties-group.group-closed{
      max-height: 27px;
    }
  }
}
</style>