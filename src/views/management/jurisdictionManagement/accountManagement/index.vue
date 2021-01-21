<template lang="pug">
  .role-permissions
    .role-permissions-header
        el-form(:model="search.data" label-width="80px")
            el-form-item(label="姓名")
                el-input(v-model="search.data.name" placeholder="请输入关键字")
            el-form-item(label="账号状态")
                el-select(v-model="search.data.status" @change="handleAccountStatus")
                    el-option(v-for="(item, index) in search.data.statusOptions" :label="item.label" :value="item.value")
            el-form-item(label="账号类别")
                el-select(v-model="search.data.type" @change="handleAccountType")
                    el-option(v-for="(item, index) in search.data.typeOptions" :label="item.label" :value="item.value")
            el-form-item
                el-button(size="small" type="primary") 查询
                el-button(size="small" type="success") 重置
    .role-permissions-main
        .role-permissions-right
            .role-permissions-right-btn
                el-button(size="small" icon="el-icon-edit" type="warning" @click="addAccount") 新增
            el-table(:data="table.data" border)
                el-table-column(type="index" label="序号")
                el-table-column(prop="accountNumber" label="账号编码")
                el-table-column(prop="accountName" label="账号名称")
                el-table-column(prop="name" label="姓名")
                el-table-column(prop="idCard" label="证件号码" width="140")
                el-table-column(prop="accountType" label="账号类别")
                el-table-column(prop="acountExplain" label="账户说明")
                el-table-column(prop="accountStatus" label="账号状态")
                el-table-column(prop="role" label="用户角色")
                el-table-column(label="操作")
                    el-button(type="text") 编辑 
                    el-button(type="text") 删除
    el-dialog(:visible.sync="account.dialogAccount" width="60%")
        .account-dialog-main
            .account-dialog-main-tab
                span(v-for="(item, index) in account.tab.data" :class="{'account-dialog-main-tab-active' : account.tab.activeIndex === item.val}" @click="chooseTabHandle(item)") {{item.name}}
            .account-dialog-main-title 账号编码：0001
            .account-dialog-main-input(v-if="account.tab.activeIndex === 0")
                el-form(:model="account.form.data" :rules="account.form.rules" ref="ruleForm" label-width="80px" label-position="left")
                    el-row(:gutter="20")
                        el-col(:span="12")
                            el-form-item(label="账号名称")
                                el-input(v-model="account.form.data.accountName")
                        el-col(:span="12")
                            el-form-item(label="姓名")
                                el-input(v-model="account.form.data.name")
                    el-row(:gutter="20")
                        el-col(:span="12")
                            el-form-item(label="证件号码")
                                el-input(v-model="account.form.data.idCard")
                        el-col(:span="12")
                            el-form-item(label="账号类别")
                                el-select(v-model="account.form.data.accountType" @change="handleAccountType")
                                    el-option(v-for="(item, index) in account.form.data.accountTypeOptions" :label="item.label" :value="item.value")
                    el-row(:gutter="20")
                        el-col(:span="12")
                            el-form-item(label="账户状态")
                                el-select(v-model="account.form.data.accountStatus" @change="handleAccountDialogStatus")
                                    el-option(v-for="(item, index) in account.form.data.accountStatusOptions" :label="item.label" :value="item.value")
                        el-col(:span="12")
                            el-form-item(label="用户角色")
                                el-select(v-model="account.form.data.role" @change="handleRole")
                                    el-option(:label="account.form.data.label" :value="account.form.data.value")
                                        el-tree(:props="account.form.data.props" :load="loadNode" lazy show-checkbox @check-change="handleCheckChange")
                    el-row(:gutter="20")
                        el-col(:span="12")
                            el-form-item(label="密码" prop="pwdOne")
                                el-input(v-model="account.form.data.pwdOne")
                        el-col(:span="12")
                            el-form-item(label="确认密码" prop="pwdTwo")
                                el-input(v-model="account.form.data.pwdTwo")
                    el-row(:gutter="20")
                        el-col(:span="12")
                            el-form-item(label="创建时间")
                                el-input(v-model="account.form.data.time")
                        el-col(:span="12")
                            el-form-item(label="创建人")
                                el-input(v-model="account.form.data.people")
                    el-row(:gutter="20")
                        el-col(:span="12")
                            el-form-item(label="修改时间")
                                el-input(v-model="account.form.data.editTime")
                        el-col(:span="12")
                            el-form-item(label="修改人")
                                el-input(v-model="account.form.data.editPeople")
            .account-dialog-main-input(v-if="account.tab.activeIndex === 1")
                el-form(:model="account.form.visit" label-width="80px" label-position="left")
                    el-row(:gutter="20")
                        el-col(:span="12")
                            el-form-item(label="访问标签")
                                el-select(v-model="account.form.visit.card" @change="handleCard")
                                    el-option(v-for="(item, index) in account.form.visit.cardOptions" :label="item.label" :value="item.value")
                    el-row(:gutter="20")
                        el-col(:span="12")
                            el-form-item(label="有效期")
                                el-select(v-model="account.form.visit.lastTime" @change="handleLastTime")
                                    el-option(v-for="(item, index) in account.form.visit.lastTimeOptions" :label="item.label" :value="item.value")
                        el-col(:span="12")
                            el-form-item(label="可访问IP")
                                el-select(v-model="account.form.visit.ip" @change="handleIp")
                                    el-option(v-for="(item, index) in account.form.visit.ipOptions" :label="item.label" :value="item.value")
                    el-row(:gutter="20")
                        el-col(:span="12")
                            el-form-item(label="创建时间")
                                el-input(v-model="account.form.visit.time")
                        el-col(:span="12")
                            el-form-item(label="创建人")
                                el-input(v-model="account.form.visit.people")
                    el-row(:gutter="20")
                        el-col(:span="12")
                            el-form-item(label="修改时间")
                                el-input(v-model="account.form.visit.editTime")
                        el-col(:span="12")
                            el-form-item(label="修改人")
                                el-input(v-model="account.form.visit.editPeople")
        span(slot="footer" class="dialog-footer")
            el-button(@click="account.dialogAccount = false" type="info") 取 消
            el-button(type="primary" @click="account.dialogAccount = false") 确 定
</template>

<script>
  export default {
    name: "accountManagement",
    data() {
        var validatePass = (rule, value, callback) => {
            const pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
            if (value === '') {
                callback(new Error('请输入密码'));
            }if(!pass.test(value)){
                callback(new Error('密码需包含大小写字母及数字'));
            }else{
                if (this.account.form.data.pwdTwo !== '') {
                    this.$refs.ruleForm.validateField('pwdTwo');
                }
                callback();
            }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.account.form.data.pwdOne) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        search: {
            data: {
                name: '',
                status: '',
                type: '',
                statusOptions: [
                    { label: '请选择', value: '100' }
                ],
                typeOptions: [
                    { label: '请选择', value: '200' }
                ]
            }
        },
        table: {
            data: [
                { accountNumber: '0000', accountName: 'ue880000', name: '张腾飞', idCard: '12348199009121111', accountType: '客户', acountExplain: '无', accountStatus: '正常', role: '普通客户'},
                { accountNumber: '0001', accountName: 'k0do0001', name: '姚国斌', idCard: '12348199409121132', accountType: '客户', acountExplain: '无', accountStatus: '正常', role: '普通客户'},
            ]
        },
        // 新增账号
        account: {
            dialogAccount: false,
            tab: {
                activeIndex: 0,
                data: [
                    { name: '基础信息', val: 0 },
                    { name: '访问策略', val: 1 }
                ]
            },
            form: {
                data: {
                    accountName: '',
                    name: '',
                    idCard: '',
                    accountType: '',
                    accountStatus: '',
                    role: '',
                    pwdOne: '',
                    pwdTwo: '',
                    time: '',
                    people: '',
                    editTime: '',
                    editPeople: '',
                    accountTypeOptions: [
                        { label: '请选择', value: '100' }
                    ],
                    accountStatusOptions: [
                        { label: '请选择', value: '200' }
                    ],
                    label: '',
                    value: '',
                    props: {
                        label: 'menuName',
                        children: 'zones',
                        isLeaf: 'leaf'
                    },
                },
                rules: {
                    pwdOne: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    pwdTwo: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                },
                visit: {
                    card: '',
                    cardOptions: [
                        { label: '请选择', value: '100' }
                    ],
                    lastTime: '',
                    lastTimeOptions: [
                        { label: '请选择', value: '200' }
                    ],
                    ip: '',
                    ipOptions: [
                        { label: '请选择', value: '300' }
                    ],
                    time: '',
                    people: '',
                    editTime: '',
                    editPeople: '',
                }
            }
        }
      }
    },
    methods: {
        handleAccountStatus(vId) {
            const me = this;
            me.search.data.name = me.search.data.statusOptions[vId.substr(vId.length-1,1)].label
        },
        handleAccountType(vId) {
            const me = this;
            me.search.data.type = me.search.data.typeOptions[vId.substr(vId.length-1,1)].label
        },
        // 新增账号
        addAccount() {
            const me = this;
            me.account.dialogAccount = true;
        },
        cancelAccount() {
            const me = this;
            me.account.dialogAccount = false;
        },
        chooseTabHandle(data) {
            const me = this;
            me.account.tab.activeIndex = data.val;
        },
        handleAccountType(vId) {
            const me = this;
            me.account.form.data.accountType = me.account.form.data.accountTypeOptions[vId.substr(vId.length-1,1)].label
        },
        handleAccountDialogStatus(vId) {
            const me = this;
            me.account.form.data.accountStatus = me.account.form.data.accountStatusOptions[vId.substr(vId.length-1,1)].label
        },
        // 用户角色
        handleCheckChange(data, checked, indeterminate) {
            const me = this;
            me.account.form.data.label = data.menuName;
            me.account.form.data.value = data.value;
            me.handleRole()
        },
        handleNodeClick(data) {
            console.log(data);
        },
        loadNode(node, resolve) {
            if (node.level === 0) {
                return resolve([{ menuName: '超级管理员', value: '3000' }, { menuName: '测试组', value: '3001' }, { menuName: '开发组', value: '3002' }, { menuName: '市场经营分析', value: '3003' }]);
            }
            var hasChild;
            if(node.data.menuName === '超级管理员') {
                hasChild = true;
            } else {
                hasChild = false;
            }
            if (node.level > 1) return resolve([]);
            setTimeout(() => {
                var data;
                if (hasChild) {
                    data = [
                        { menuName: '管理员', value: '3100', leaf: true },
                        { menuName: '管理员4', value: '3101', leaf: true }
                    ];
                } else {
                    data = [];
                }
                resolve(data);
            }, 500);
        },
        handleRole(vId) {
            const me = this;
            me.account.form.data.role = me.account.form.data.label;
        },
        handleCard(vId) {
            const me = this;
            me.account.form.visit.card = me.account.form.visit.cardOptions[vId.substr(vId.length-1,1)].label
        },
        handleLastTime(vId) {
            const me = this;
            me.account.form.visit.lastTime = me.account.form.visit.LastTimeOptions[vId.substr(vId.length-1,1)].label
        },
        handleIp(vId) {
            const me = this;
            me.account.form.visit.ip = me.account.form.visit.IpOptions[vId.substr(vId.length-1,1)].label
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
            height 100px
            padding 0 10px
            background rgba(255,255,255,1)
            layout-block()
            .el-form
                display flex
                justify-content space-between
                align-items center
                padding 34px 40px 34px 20px
        &-main
            display flex
            justify-content space-between
            background rgba(255,255,255,1)
            margin-top 20px
            min-height 400px
            layout-block()
            .role-permissions-right
                width 100%
                padding 30px 40px
                .el-table
                    margin-top 20px
        .account-dialog
            background rgba(255,255,255,1)
            &-title
                background #1890ff
                height 40px
                display flex
                justify-content flex-end
                align-items center
                padding 10px
            &-main
                padding 0 10px
                &-tab
                    text-align center
                    padding 10px
                    span
                        margin 10px
                        cursor pointer
                    &-active
                        color: #FFBA00
                        border-bottom 1px solid #FFBA00
                        cursor pointer
                    span:hover
                        color: #FFBA00
                        border-bottom 1px solid #FFBA00
                &-title
                    color #909399
                    padding 10px 0
            .dialog-footer
                display flex
                justify-content center
                margin-top 20px
                padding 10px
</style>