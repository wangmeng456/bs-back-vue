<template>
  <div class="property-panel" ref="propertyPanel">
    <el-form :inline="true" :model="form" label-width="190px" size="small">
      <el-form-item label="节点ID">
        <el-input v-model="form.id" disabled></el-input>
      </el-form-item>
      <el-form-item label="节点名称">
        <el-input v-model="form.name" @input="nameChange"></el-input>
      </el-form-item>
      <el-form-item label="节点颜色">
        <el-color-picker v-model="form.color" @active-change="colorChange"></el-color-picker>
      </el-form-item>
      <!-- 任务节点允许选择人员 -->
      <el-form-item label="节点人员" v-if="userTask">
        <el-select v-model="form.dataType" placeholder="请选择" @change="typeChange">
          <el-option value="assignee" label="指定人员"></el-option>
          <el-option value="candidateUser" label="候选人员"></el-option>
          <el-option value="rolePosition" label="角色/岗位"></el-option>
        </el-select>
      </el-form-item>
      <!-- 指定人员 -->
      <el-form-item label="指定人员" v-if="userTask && form.dataType === 'assignee'">
        <el-select
          v-model="form.assignee"
          placeholder="请选择"
          key="1"
          @change="(value) => addUser({assignee: value})"
        >
          <el-option
            v-for="item in users"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 候选人员 -->
      <el-form-item label="候选人员" v-else-if="userTask && form.dataType === 'candidateUser'">
        <el-input v-model="form.candidateUser" @input="(value) => addUser({candidateUser: '${'+value+'}'})"></el-input>
        <!-- <el-select
          v-model="form.candidateUsers"
          placeholder="请选择"
          key="2"
          multiple
          @change="(value) => addUser({candidateUsers: value.join(',') || value})"
        >
          <el-option
            v-for="item in users"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select> -->
      </el-form-item>
      <!-- 角色/岗位 -->
      <el-form-item label="角色/岗位" v-else-if="userTask && form.dataType === 'rolePosition'">
        <el-select
          v-model="form.rolePosition"
          placeholder="请选择"
          @change="(value) => addUser({rolePosition: value})"
        >
          <el-option
            v-for="item in roles"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 分支允许添加条件 -->
      <el-form-item label="分支条件" v-if="sequenceFlow">
        <el-input v-model="form.branchCondition" readonly @focus="openDialog"></el-input>
        
        <!-- <el-select v-model="form.user" placeholder="请选择">
          <el-option
            v-for="item in users"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select> -->
      </el-form-item>
    </el-form>
    <BrabchCondition ref="brabchCondition"/>
  </div>
</template>

<script>
// import BrabchCondition from './component/branchConditionConfig'
export default {
  name: "PropertyPanel",
  components: { BrabchCondition: () => import('./component/branchConditionConfig') },
  props: {
    modeler: {
      type: Object,
      required: true
    }
  },
  computed: {
    userTask() {
      if (!this.element) {
        return;
      }
      return this.element.type === "bpmn:UserTask";
    },
    sequenceFlow() {
      if (!this.element) {
        return;
      }
      return this.element.type === "bpmn:SequenceFlow";
    }
  },
  data() {
    return {
      form: {
        id: "",
        name: "",
        color: null,
        dataType:'',
      },
      element: {},
      users: [
        {
          value: "zhangsan",
          label: "张三"
        },
        {
          value: "lisi",
          label: "李四"
        },
        {
          value: "wangwu",
          label: "王五"
        }
      ],
      roles: [
        {
          value: "manager",
          label: "经理"
        },
        {
          value: "personnel",
          label: "人事"
        },
        {
          value: "charge",
          label: "主管"
        }
      ]
    };
  },
  mounted() {
    this.handleModeler();
  },
  methods: {
    handleModeler() {
      // 监听节点选择变化
      this.modeler.on("selection.changed", e => {
        const element = e.newSelection[0];
        this.element = element;
        if (!element) return;
        this.form = {
          ...element.businessObject,
          ...element.businessObject.$attrs
        };
        console.log(element.businessObject)
        console.log(element.businessObject.$attrs)
        if (this.form["activiti:candidateGroups"] != undefined)
          this.form["candidateGroups"] = this.form["activiti:candidateGroups"];
        // if (this.form["activiti:candidateUsers"] != undefined)
        //   this.form["candidateUsers"] = this.form["activiti:candidateUsers"];
        this.form["branchCondition"] = this.form["branchCondition"] === undefined ? '' : this.form["branchCondition"].substring(2, this.form["branchCondition"].length-1);
        if (this.form.dataType === "candidateUser")
          this.form["candidateUser"] = this.form["candidateUser"] == undefined ? '' : this.form["candidateUser"].substring(2, this.form["candidateUser"].length-1);
      });

      //  监听节点属性变化
      this.modeler.on("element.changed", e => {
        const { element } = e;
        if (!element) return;
        //  新增节点需要更新回属性面板
        if (element.id === this.form.id) {
          // console.log(element.businessObject)
          this.form.name = element.businessObject.name;
          this.form = { ...this.form };
        }
      });
    },
    // 属性面板名称，更新回流程节点
    nameChange(name) {
      const modeling = this.modeler.get("modeling");
      modeling.updateLabel(this.element, name);
    },
    // 属性面板颜色，更新回流程节点
    colorChange(color) {
      const modeling = this.modeler.get("modeling");
      modeling.setColor(this.element, {
        fill: null,
        stroke: color
      });
      modeling.updateProperties(this.element, { color: color });
    },
    // 任务节点配置人员
    addUser(properties) {
      this.updateProperties(
        Object.assign(properties, {
          dataType: Object.keys(properties)[0]
        })
      );
    },
    // 切换人员类型
    typeChange(val) {
      const types = ["assignee", "candidateUser", "rolePosition"];
      types.forEach(type => {
        delete this.element.businessObject.$attrs[type];
        // delete this.element.businessObject.$attrs['activiti:' + type];
        delete this.form[type];
        // delete this.form['activiti:' + type];
      });
    },
    // 在这里我们封装一个通用的更新节点属性的方法
    updateProperties(properties) {
      
      const modeling = this.modeler.get("modeling");
      modeling.updateProperties(this.element, properties);
    },

    openDialog () {
      this.$refs.brabchCondition.openBranchCondition();
    }
  }
};
</script>

<style lang="scss" scoped>
.property-panel {
  position: absolute;
  right: 0px;
  top: 0px;
  border-left: 1px solid #cccccc;
  padding: 10px 5px;
  width: 190px;
  height: 100%;
}
</style>
<style lang="scss" >
.property-panel {
  .el-form{
    .el-form-item{
      margin-bottom: 10px;
      .el-form-item__label{
        padding: 0px;
        text-align: center;
      }
      .el-form-item__content{
        .el-color-picker__trigger{
          width: 179px;
        }
        .el-select{
          width: 179px;
        }
      }
    }
  }
}
</style>
