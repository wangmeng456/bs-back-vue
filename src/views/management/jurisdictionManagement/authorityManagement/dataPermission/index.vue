<template lang="pug">
  .menu-permissions
    .menu-permissions-main
      .menu-permissions-left
        .menu-permissions-header 菜单
        .menu-permissions-tree
          el-tree(:props="check.props" :load="loadNode" lazy show-checkbox @check-change="handleCheckChange")
      .menu-permissions-right
        .menu-permissions-header
          span(v-for="(item, index) in tab.data" :class="{'menu-permissions-header-active' : tab.activeIndex === item.val}" @click="chooseTabHandle(item)") {{item.name}}
        .menu-permissions-right-checkbox(v-if="tab.activeIndex === 0")
          div(v-for="(item, index) in checkbox.data")
            el-checkbox(v-model="checkbox.data[index].tick") {{item.name}}
        .menu-permissions-right-data(v-if="tab.activeIndex === 1")
          .menu-permissions-right-main
            .menu-permissions-right-main-form
              el-form(ref="form" :model="form" label-width="80px")
                el-form-item(label="组织架构")
                  el-input(v-model="form.name")
            .menu-permissions-right-main-tree
              el-tree(:props="main.props" :load="loadMain" lazy show-checkbox @check-change="handleMainChange")
        .menu-permissions-right-btn
          el-button(size="small" type="info") 取消
          el-button(size="small" type="primary") 确定
</template>

<script>
  const targetOptions = ['产品'];
  const dimensionOptions = ['成本中心', '利润中心', '科目'];
  export default {
    name: "dataPermission",
    data() {
      return {
        // 左侧树
        check: {
          props: {
            label: 'menuName',
            children: 'zones',
            isLeaf: 'leaf'
          }
        },
        checkbox: {
          checkedOne: false,
          data: [
            {name: '修改'},
            {name: '删除'},
            {name: '导出'},
            {name: '添加'},
            {name: '全选'},
            {name: '审核'},
            {name: '申请'},
            {name: '导入'},
          ]
        },
        // 标签页
        tab: {
          data: [
            {name: '按钮权限', val: 0},
            {name: '数据权限', val: 1}
          ],
          activeIndex: 0
        },
        radio: {
          tabPosition: 'left'
        },
        form: {
          name: ''
        },
        // 组织架构
        main: {
          props: {
            label: 'mainName',
            children: 'zones',
            isLeaf: 'leaf'
          },
          checkAllTarget: false,
          checkedTarget: [],
          targets: targetOptions,
          isIndeterminate: true,
          checkAllDimension: false,
          checkedDimension: [],
          dimensions: dimensionOptions,
          isDimension: true
        }
      };
    },
    methods: {
      // 左侧树
      handleCheckChange(data, checked, indeterminate) {
        console.log(data, checked, indeterminate);
      },
      handleNodeClick(data) {
        console.log(data);
      },
      loadNode(node, resolve) {
        if (node.level === 0) {
          return resolve([{ menuName: '需求管理' }, { menuName: '任务管理' }]);
        }
        var hasChild;
        if(node.data.menuName === '需求管理') {
          hasChild = 1;
        } else if(menuName === '任务管理') {
          hasChild = 2;
        }
        if (node.level > 1) return resolve([]);
        setTimeout(() => {
          var data;
          if (hasChild === 1) {
            data = [
              { menuName: '需求录入', leaf: true },
              { menuName: '需求审核', leaf: true }
            ];
          }
          if (hasChild === 2) {
            data = [
              { menuName: '任务配置', leaf: true },
              { menuName: '任务下发', leaf: true },
              { menuName: '任务监控', leaf: true }
            ];
          }
          resolve(data);
        }, 500);
      },
      // 标签页
      chooseTabHandle(data){
        const me = this;
        me.tab.activeIndex = data.val;
      },
      // 组织架构树
      handleMainChange(data, checked, indeterminate) {
        console.log(data, checked, indeterminate);
      },
      loadMain(node, resolve) {
        if (node.level === 0) {
          return resolve([{ mainName: '中国电信集团' }]);
        }
        if (node.level > 1) return resolve([]);
        setTimeout(() => {
          var data;
          data = [
            { mainName: '中国电信北京分公司', leaf: true },
            { mainName: '中国电信上海分公司', leaf: true }
          ];
          resolve(data);
        }, 500);
      },
      // 多选框
      handleCheckAllTargetChange(val) {
        this.main.checkedTarget = val ? targetOptions : [];
        this.main.isIndeterminate = false;
      },
      handleCheckedTargetChange(value) {
        console.log(value)
        let checkedCount = value.length;
        this.main.checkAllTarget = checkedCount === this.main.targets.length;
        this.main.isIndeterminate = checkedCount > 0 && checkedCount < this.main.targets.length;
      },
      handleCheckAllDimensiondimensionChange(val) {
        this.main.checkedDimension = val ? dimensionOptions : [];
        this.main.isDimension = false;
      },
      handleCheckedDimensionChange(value) {
        let checkedCount = value.length;
        this.main.checkAllDimension = checkedCount === this.main.dimensions.length;
        this.main.isDimension = checkedCount > 0 && checkedCount < this.main.dimensions.length;
      }
    }
  };
</script>

<style lang="stylus" scoped>
  @import '~@/assets/styles/mixin.styl'
  layout-block()
    box-shadow 0 0 0 1px rgba(218, 226, 237, 1) inset
  .menu-permissions
    width $min-width
    margin 15px auto
    &-main
      display flex
      justify-content space-between
      min-height 400px
      .menu-permissions-left
        width (308 / 1162 * 100)%
        layout-block()
        margin 0 10px 0 0
        background-color #fff
        .menu-permissions-header
          height 50px
          padding 0 10px
          font-size 16px
          font-weight 600
          line-height 50px
          background rgba(218, 226, 237, 1)
          layout-block()
        .menu-permissions-tree
          padding 25px 20px
      .menu-permissions-right
        layout-block()
        background-color #fff
        width 100%
        &-main
          padding-top 60px
        &-checkbox
          display flex
          justify-content center
          padding 100px 0 0 0
          .el-checkbox
            .el-checkbox__label
              font-size 16px
              font-weight 600
        &-btn
          padding 60px 0 0 0
          display flex
          justify-content center
        .menu-permissions-header
          height 50px
          padding 0 10px
          font-size 16px
          line-height 50px
          background rgba(218, 226, 237, 1)
          layout-block()
          span
            margin-right 40px
            cursor pointer
            &:hover
              color #1890ff
              border-bottom solid #1890ff 1px
          &-active
            color #1890ff
            border-bottom solid #1890ff 1px
        &-radio
          display flex
          justify-content center
          padding 20px 0 30px 0
        &-main
          &-form
            display flex
            justify-content center
            .el-input
              width 400px
          &-tree
            display flex
            justify-content center
            width 400px
            padding 30px 0
            margin 0 0 0 33%
            layout-block()
          &-aside
            margin-left 35%
            margin-top 20px
</style>