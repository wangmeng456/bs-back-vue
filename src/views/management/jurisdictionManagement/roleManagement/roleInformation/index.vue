<template lang="pug">
  .role-permissions
    .role-permissions-header
        el-button(size="small" type="primary" icon="el-icon-plus" @click="addRole") 添加
        el-button(size="small" icon="el-icon-edit" class="btn" @click="editRole") 编辑
        el-button(size="small" icon="el-icon-delete" class="btn" @click="deleteRole") 删除
        el-button(size="small" icon="el-icon-sort" class="btn" @click="roleManage") 角色赋权
    .role-permissions-main
      .role-permissions-left
        el-tree(:data="data" :props="defaultProps" @node-click="handleNodeClick" :expand-on-click-node="false")
      .role-permissions-right
        .role-dialog(v-if="role.dialogRole")
            .role-dialog-title
                .close-button(@click="cancelRole")
                    i.el-icon-close
            el-form(:model="role.form" label-width="80px")
                el-form-item(label="角色大类")
                    el-select(v-model="role.form.region" placeholder="请选择角色" @change="handleRole")
                        el-option(v-for="(item, index) in role.form.options" :label="item.label" :value="item.value")
                    span(@click="newRole" class="dialog-btn") 新建
            span(slot="footer" class="dialog-footer")
                el-button(@click="role.dialogRole = false" type="info") 取 消
                el-button(type="primary" @click="nextDialog") 确 定
        .new-dialog(v-if="role.dialogNew")
            el-form(:model="role.new.data" :label-position="role.new.labelPosition" :rules="role.new.rules" ref="ruleForm" label-width="80px")
                el-form-item(label="角色名称" prop="name")
                    el-input(v-model="role.new.data.name")
                el-form-item(label="角色编码" prop="number")
                    el-input(v-model="role.new.data.number")
                el-form-item(label="角色描述")
                    el-input(v-model="role.new.data.describe" type="textarea")
            span(slot="footer" class="dialog-footer")
                el-button(@click="role.dialogNew = false" type="info") 取 消
                el-button(type="primary" @click="role.dialogNew = false") 确 定
        .new-dialog(v-if="role.dialogEdit")
            el-form(:model="role.edit.data" :label-position="role.edit.labelPosition" :rules="role.edit.rules" ref="ruleForm" label-width="80px")
                el-form-item(label="角色名称" prop="name")
                    el-input(v-model="role.edit.data.name")
                el-form-item(label="角色编码" prop="number")
                    el-input(v-model="role.edit.data.number")
                //-无
                el-form-item(label="角色状态" prop="type")
                    el-select(v-model="role.edit.data.type" placeholder="请选择角色状态" @change="handleTypeRole")
                        el-option(v-for="(item, index) in role.edit.data.options" :label="item.label" :value="item.value")
                el-form-item(label="角色描述")
                    el-input(v-model="role.edit.data.describe" type="textarea")
            span(slot="footer" class="dialog-footer")
                el-button(@click="role.dialogEdit = false" type="info") 取 消
                el-button(type="primary" @click="role.dialogEdit = false") 确 定
        .role-dialog(v-if="role.dialogDelete")
            .role-dialog-title
                .close-button(@click="cancelDelete")
                    i.el-icon-close
            .dialog-main 所选删除角色：{{role.delete.name}}，是否确定删除 ？
            span(slot="footer" class="dialog-footer")
                el-button(@click="role.dialogDelete = false" type="info") 取 消
                el-button(type="primary" @click="role.dialogDelete = false") 确 定               
</template>

<script>
  export default {
    name: "roleInformation",
    data() {
      return {
        data: [{
            label: '超级管理员',
            children: [{
                label: '管理员'
            }, {
                label: '管理员4'
            }]
        }, {
            label: '测试组',
            children: [{
                label: '测试一部'
            }, {
                label: '测试二部'
            }, {
                label: '测试三部'
            }]
        }, {
          label: '开发组',
          children: [{
            label: '开发一部',
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        clickRole: '超级管理员',
        role: {
            // 添加角色
            dialogRole: false,
            form: {
                region: '超级管理员',
                options: [
                    { label: '超级管理员', value: '100' },
                    { label: '测试组', value: '101' },
                    { label: '开发组', value: '102' }
                ]
            },
            // 点击新建按钮
            dialogNew: false,
            new: {
                labelPosition: 'right',
                data: {
                    name: '',
                    number: '',
                    describe: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入角色名称', trigger: 'blur' }
                    ],
                    number: [
                        { required: true, message: '请输入角色编码', trigger: 'blur' }
                    ],
                }
            },
            // 编辑角色
            dialogEdit: false,
            edit: {
                labelPosition: 'right',
                data: {
                    name: '',
                    number: '',
                    describe: '',
                    type: '',
                    options: [
                        { label: '', value: '200' },
                        { label: '', value: '201' }
                    ]
                },
                rules: {
                    name: [
                        { required: true, message: '请输入角色名称', trigger: 'blur' }
                    ],
                    type: [
                        { required: true, message: '请输入角色名称', trigger: 'blur' }
                    ],
                    number: [
                        { required: true, message: '请输入角色编码', trigger: 'blur' }
                    ],
                }
            },
            // 删除角色
            dialogDelete: false,
            delete: {
                name: ''
            }
        },
      };
    },
    methods: {
        handleNodeClick(data) {
            const me = this;
            me.clickRole = data.label;
            me.role.edit.data.name = me.clickRole;
            me.role.delete.name = me.clickRole;
        },
        addRole() {
            const me = this;
            me.role.dialogRole = true;
        },
        cancelRole() {
            const me = this;
            me.role.dialogRole = false;
        },
        handleRole(vId) {
            const me = this;
            me.role.form.region = me.role.form.options[vId.substr(vId.length-1,1)].label
        },
        // 新建角色
        newRole() {
            const me = this;
            me.role.dialogRole = false;
            me.role.dialogEdit = false;
            me.role.dialogDelete = false;
            me.role.dialogNew = true;
        },
        nextDialog() {
            console.log(1)
            const me = this;
            me.role.dialogRole = false;
            me.role.dialogNew = false;
            me.role.dialogDelete = false;
            me.role.dialogEdit = true;
            me.role.edit.data.name = me.clickRole;
        },
        // 编辑角色
        editRole() {
            const me = this;
            me.role.dialogRole = false;
            me.role.dialogNew = false;
            me.role.dialogDelete = false;
            me.role.dialogEdit = true;
            me.role.edit.data.name = me.clickRole;
        },
        handleTypeRole(vId) {
            const me = this;
            me.role.edit.data.type = me.role.edit.data.options[vId.substr(vId.length-1,1)].label
        },
        // 删除角色
        deleteRole() {
            const me = this;
            me.role.dialogRole = false;
            me.role.dialogEdit = false;
            me.role.dialogNew = false;
            me.role.dialogDelete = true;
            me.role.delete.name = me.clickRole;
        },
        cancelDelete() {
            const me = this;
            me.role.dialogDelete = false;
        },
        // 角色赋权
        roleManage() {
            this.$router.push({ path: '/management/roleManagement/roleAuthorityManagement' })
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
        &-header
            height 50px
            padding 0 10px
            font-size 16px
            font-weight 600
            line-height 50px
            layout-block()
            .btn
                border 1px solid #1890ff
                color #1890ff
                .el-icon-sort:before
                    display inline-block
                    transform rotate(90deg)
        &-main
            display flex
            justify-content space-between
            min-height 400px
            .role-permissions-left
                width (308 / 1162 * 100)%
                layout-block()
                background-color #fff
                margin 0 10px 0 0
                padding 25px 20px
            .role-permissions-right
                layout-block()
                background-color #fff
                width 100%
                display flex
                justify-content center
                align-items center
                .role-dialog
                    layout-block()
                    width 50%
                    height 260px
                    &-title
                        background #1890ff
                        height 40px
                        display flex
                        justify-content flex-end
                        align-items center
                        padding 10px
                    .el-form
                        padding 40px
                    .dialog-btn
                        margin-left 40px
                        color #1890ff
                        border-bottom 1px solid #1890ff
                        cursor pointer
                    .dialog-footer
                        display flex
                        justify-content center
                        margin-top 30px
                    .dialog-main
                        text-align center
                        padding 40px
                .new-dialog
                    .el-form-item
                        width 400px
                    .el-select
                        width 320px
                    .dialog-footer
                        display flex
                        justify-content center
                        margin-top 30px
</style>