<template lang="pug">
  .role-permissions
    .role-permissions-main
      .role-permissions-right
        el-table(:data="table.data" border)
            el-table-column(type="index" label="序号")
            el-table-column(prop="name" label="角色名称")
            el-table-column(label="菜单权限")
                span(class="btn" @click="pushMenu") 操作
            el-table-column(label="数据权限")
                span(class="btn" @click="pushData") 操作
</template>

<script>
  export default {
    name: "roleAuthorityManagement",
    data() {
      return {
          table: {
              data: [
                  { name: '超级管理员' },
                  { name: '管理员' },
                  { name: '测试一部' },
                  { name: '开发一部' }
              ]
          }
      }
    },
    methods: {
        pushMenu() {
            this.$router.push({ path: '/management/jurisdictionManagement/menuPermissions' })
        },
        pushData() {
            this.$router.push({ path: '/management/jurisdictionManagement/systemInfoManage' })
        }
    }
  };
</script>

<style lang="stylus" scoped>
    @import '~@/assets/styles/mixin.styl'
    layout-block()
        box-shadow 0 0 0 1px rgba(218, 226, 237, 1) inset
    .role-permissions
        width $min-width
        margin 15px auto
        layout-block()
        &-main
            display flex
            justify-content space-between
            min-height 400px
            .role-permissions-right
                width 100%
                padding 30px 10px
                .btn
                    border-bottom 1px solid #1890ff
                    color #1890ff
                    cursor pointer 
</style>