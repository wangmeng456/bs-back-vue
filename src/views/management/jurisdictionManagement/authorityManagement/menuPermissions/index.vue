<template lang="pug">
  .menu-permissions
    .menu-permissions-header(v-if="!dialogPermissions") 菜单
    .menu-permissions-main(v-if="!dialogPermissions")
      .menu-permissions-left
        el-tree(:props="props" :load="loadNode" lazy show-checkbox @check-change="handleCheckChange")
      .menu-permissions-right
        el-button(type="warning" icon="el-icon-plus" @click="addPermissions") 新增菜单
    .menu-permissions-header(v-if="dialogPermissions") 新增菜单
    .menu-permissions-dialog-main(v-if="dialogPermissions")
      el-form(:model="data" :rules="data.rules" ref="ruleForm" label-width="80px" label-position="left")
        el-form-item(label="菜单名称" prop="name")
          el-input(v-model="data.name")
            span (10字以内)
        el-form-item(label="菜单级别" prop="grade")
          el-input(v-model="data.grade" disabled="true")
        el-form-item(label="上级菜单" prop="top")
          el-input(v-model="data.top" disabled="true")
        el-form-item(label="菜单URL" prop="url")
          el-input(v-model="data.url")
        el-form-item(label="排序号" prop="number")
          el-input(v-model="data.number")
        .number 是否顺序后移重复及后续菜单排序号
          el-radio(v-model="data.radio" label="1") 是
          el-radio(v-model="data.radio" label="2") 否
        el-form-item(label="图标")
          el-upload(class="avatar-uploader" drag action="https://jsonplaceholder.typicode.com/posts/" multiple :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload")
            img(v-if="imageUrl" :src="imageUrl" class="avatar")
          i(class="el-icon-plus")
          span(class="select") 选择照片
          span 单击添加照片或拖动照片到上传框中
        el-form-item(label="是否隐藏")
          el-radio(v-model="data.radioTwo" label="1") 是
          el-radio(v-model="data.radioTwo" label="2") 否
        el-form-item(label="授权角色" prop="role")
          el-select(v-model="data.role" @change="handleRole")
            el-option(v-for="(item, index) in data.roleOptions" :label="item.label" :value="item.value")
        span(class="footer")
          el-button(@click="canclePermissions" type="info") 取 消
          el-button(type="primary" @click="canclePermissions") 确 定
</template>

<script>
  export default {
    name: "menuPermissions",
    data() {
      return {
        imageUrl: '',
        props: {
          label: 'menuName',
          children: 'zones',
          isLeaf: 'leaf'
        },
        checkbox: {
          checkedOne: false,
          checkedTwo: false,
          checkedTwo: false,
        },
        dialogPermissions: false,
        data: {
          name: '',
          grade: '二级菜单',
          top: '日志中心',
          url: '',
          number: '',
          radio: '1',
          radioTwo: '1',
          role: '',
          roleOptions: [
            { label: '请选择', value: '100' }
          ]
        }
      };
    },
    methods: {
      handleCheckChange(data, checked, indeterminate) {
        console.log(data, checked, indeterminate);
      },
      handleNodeClick(data) {
        console.log(data);
      },
      loadNode(node, resolve) {
        if (node.level === 0) {
          return resolve([{ menuName: '拓扑展示' }, { menuName: '监控中心' }, { menuName: '告警中心' }, { menuName: '日志中心' }]);
        }
        var hasChild;
        if(node.data.menuName === '日志中心') {
          hasChild = true;
        } else {
          hasChild = false;
        }
        if (node.level > 1) return resolve([]);
        setTimeout(() => {
          var data;
          if (hasChild) {
            data = [
              { menuName: '图表分析', leaf: true },
              { menuName: '日志查看' },
              { menuName: '日志配置' },
              { menuName: 'ES监控', leaf: true },
              { menuName: '日志采集' },
              { menuName: '日志查询', leaf: true }
            ];
          } else {
            data = [];
          }
          resolve(data);
        }, 500);
      },
      addPermissions() {
        const me = this;
        me.dialogPermissions = true;
      },
      canclePermissions() {
        const me = this;
        me.dialogPermissions = false;
      },
      handleRole(vId) {
        const me = this;
        me.data.role = me.data.roleOptions[vId.substr(vId.length-1,1)].label
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
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
    &-header
      height 50px
      padding 0 10px
      font-size 16px
      font-weight 600
      line-height 50px
      layout-block()
    &-main
      display flex
      justify-content space-between
      min-height 400px
      .menu-permissions-left
        width (308 / 1162 * 100)%
        layout-block()
        background-color #fff
        margin 0 10px 0 0
        padding 25px 20px
      .menu-permissions-right
        layout-block()
        background-color #fff
        width 100%
        display flex
        justify-content center
        align-items center
        .el-button
          width 140px
          height 50px
    .menu-permissions-dialog-main
      padding 80px 140px
      layout-block()
      .avatar-uploader,.el-upload
        border 1px dashed rgba(218, 226, 237, 1)
        cursor pointer
        position relative
        overflow hidden
        width 60px
        height 30px
      .el-icon-plus
        font-size 28px
        color rgba(218, 226, 237, 1)
        position absolute
        top 2px
        left 15px
        z-index 999
      .avatar-uploader,.el-upload:hover
        border-color rgba(218, 226, 237, 1)
        width 60px
        height 30px
        float left
      span
        display block
        height 30px
        color gray
        float left
      .select
        display block
        height 30px
        color gray
        float left
        border 1px dashed rgba(218, 226, 237, 1)
        background #fff
        padding 0 4px
        margin-right 20px
      .avatar
        width 20px
        height 20px
        display block
      .el-upload-dragger
        width 20px
        height 20px
      .footer
        display flex
        justify-content center
        align-items center
        margin 20px 0 0 400px
      .number
        margin 20px 0
        .el-radio
          margin-left 20px
      .el-select
        width 840px
</style>