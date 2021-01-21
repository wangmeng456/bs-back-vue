<template lang="pug">
.task-permissions
    .task-permissions-header(v-if="!add.task && !issue.issueDialogs")
        el-form(:model="search.data" label-width="80px")
            el-form-item(label="任务名称")
                el-input(v-model="search.data.name" placeholder="请输入关键字")
            el-form-item(label="任务状态")
                el-select(v-model="search.data.status" @change="handleAccountStatus")
                    el-option(v-for="(item, index) in search.data.statusOptions" :label="item.label" :value="item.value")
            el-form-item(label="优先级")
                el-select(v-model="search.data.type" @change="handleAccountType")
                    el-option(v-for="(item, index) in search.data.typeOptions" :label="item.label" :value="item.value")
            el-form-item
                el-button(size="small" type="primary") 查询
                el-button(size="small" type="success") 重置
    .task-permissions-main(v-if="!add.task && !issue.issueDialogs")
        .role-permissions-right
            .role-permissions-right-btn
                el-button(size="small" icon="el-icon-edit" type="warning" @click="addTask") 新增
            .role-permissions-right-tab
                .role-permissions-right-tab-left
                    span(v-for="(item, index) in table.tab.data" :class="{'role-permissions-right-tab-active' : table.tab.activeIndex === item.val}" @click="chooseTabHandle(item)") {{item.name}}
                .role-permissions-right-tab-right(v-if="table.tab.activeIndex === 1")
                    span 批量启动 | 
                    span 批量删除 | 
                    span 批量暂停
            .role-permissions-right-table(v-if="table.tab.activeIndex === 0")
                el-table(:data="table.data" border)
                    el-table-column(type="index" label="序号")
                    el-table-column(prop="accountNumber" label="任务编码")
                    el-table-column(prop="accountName" label="任务名称")
                    el-table-column(prop="name" label="需求编码")
                    el-table-column(prop="idCard" label="需求名称")
                    el-table-column(prop="accountType" label="客户名称")
                    el-table-column(prop="acountExplain" label="任务优先级")
                    el-table-column(prop="accountStatus" label="修改人")
                    el-table-column(prop="role" label="修改时间")
                    el-table-column(label="操作")
                        span(class="btn") 编辑 | 
                        span(class="btn") 删除 | 
                        span(class="btn" @click="taskIssue") 任务下发
                el-pagination(@size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="table.currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400")
            .role-permissions-right-table(v-if="table.tab.activeIndex === 1")
                el-table(:data="table.data1" border)
                    el-table-column(type="type" label="序号" prop="index")
                        el-checkbox(v-model="checked") 1
                    el-table-column(prop="accountNumber" label="任务编码")
                    el-table-column(prop="accountName" label="任务名称")
                    el-table-column(prop="name" label="需求编码")
                    el-table-column(prop="idCard" label="需求名称")
                    el-table-column(prop="accountType" label="客户名称")
                    el-table-column(prop="acountExplain" label="任务优先级")
                    el-table-column(prop="accountStatus" label="修改人")
                    el-table-column(prop="role" label="修改时间")
                    el-table-column(prop="status" label="任务状态")
                    el-table-column(prop="lastTime" label="上一次任务结束时间")
                    el-table-column(label="操作")
                        span(class="btn") 启动 | 
                        span(class="btn") 删除 | 
                        span(class="btn") 暂停 |
                        span(class="btn") 查看
                el-pagination(:current-page="table.currentPage1" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400")
    .task-permissions-headers(v-if="add.task") 任务配置
    .task-permissions-mains(v-if="add.task")
        el-form(:model="add.form.task" :rules="add.form.rules" ref="ruleForm" label-width="80px" label-position="right")
            h3 任务参数
            el-row(:gutter="20")
                el-col(:span="12")
                    el-form-item(label="任务名称" prop="name")
                        el-input(v-model="add.form.task.name")
                el-col(:span="12")
                    el-form-item(label="任务编码" prop="number")
                        el-input(v-model="add.form.task.number")
            el-row(:gutter="20")
                el-col(:span="12")
                    el-form-item(label="任务等级" prop="grade")
                        el-select(v-model="add.form.task.grade" @change="handleTaskGrade")
                            el-option(v-for="(item, index) in add.form.task.gradeOptions" :label="item.label" :value="item.value")
                el-col(:span="12")
                    el-form-item(label="压缩密码" prop="pass")
                        el-input(v-model="add.form.task.pass")
            el-row(:gutter="20")
                el-col(:span="24")
                    el-form-item(label="输出指标" prop="index")
                        el-input(type="textarea" v-model="add.form.task.index")
            h3 产品参数
            el-row(:gutter="20")
                el-col(:span="12")
                    el-form-item(label="需求名称")
                        el-input(v-model="add.form.task.demand")
                        .grade(@click="demandClick") 选择
                el-col(:span="12")
                    el-form-item(label="客户名称")
                        el-input(v-model="add.form.task.customer")
            el-row(:gutter="20")
                el-col(:span="12")
                    el-form-item(label="合同编号")
                        el-input(v-model="add.form.task.contractId")
                el-col(:span="12")
                    el-form-item(label="合同名称")
                        el-input(v-model="add.form.task.contractName")
            el-row(:gutter="20")
                el-col(:span="12")
                    el-form-item(label="区域范围")
                        el-input(v-model="add.form.task.area")
                el-col(:span="12")
                    el-form-item(label="时间粒度")
                        el-select(v-model="add.form.task.time" @change="handleTime")
                            el-option(v-for="(item, index) in add.form.task.timeOptions" :label="item.label" :value="item.value")
            el-row(:gutter="20")
                el-col(:span="12")
                    el-form-item(label="时间范围")
                        el-input(v-model="add.form.task.timeFrame")
                el-col(:span="12")
                    el-form-item(label="产品类型")
                        el-select(v-model="add.form.task.productType" @change="handleProductType")
                            el-option(v-for="(item, index) in add.form.task.productTypeOptions" :label="item.label" :value="item.value")
            el-row(:gutter="20")
                el-col(:span="12")
                    el-form-item(label="产品模块")
                        el-select(v-model="add.form.task.productModular" @change="handleProductModular")
                            el-option(v-for="(item, index) in add.form.task.productModularOptions" :label="item.label" :value="item.value")
                el-col(:span="12")
                    el-form-item(label="OD类型")
                        el-select(v-model="add.form.task.odType" @change="handleOdType")
                            el-option(v-for="(item, index) in add.form.task.odTypeOptions" :label="item.label" :value="item.value")
            el-row(:gutter="20")
                el-col(:span="12")
                    el-form-item(label="OD方向")
                        el-select(v-model="add.form.task.odDirection" @change="handleodDirection")
                            el-option(v-for="(item, index) in add.form.task.odDirectionOptions" :label="item.label" :value="item.value")
            span(class="footer")
                el-button(@click="cancelTask" type="info") 取 消
                el-button(type="primary" @click="cancelTask") 确 定
    el-dialog(title="需求列表" :visible.sync="demand.demandDialogs")
        .el-dialog-header
            el-form(:model="demand.data" label-width="80px")
                el-form-item(label="需求名称")
                    el-input(v-model="demand.data.name")
                el-form-item(label="产品类型")
                    el-select(v-model="demand.data.type" @change="handleDemandType")
                        el-option(v-for="(item, index) in demand.data.typeOptions" :label="item.label" :value="item.value")
                el-form-item
                    el-button(size="small" type="info") 查询
        .el-dialog-main
            el-table(:data="demand.table" border)
                el-table-column(label="")
                    el-radio(v-model="demand.radio" label="")
                el-table-column(type="index" label="需求编号")
                el-table-column(prop="name" label="需求名称")
                el-table-column(prop="time" label="时间粒度")
                el-table-column(prop="type" label="产品类型")
                el-table-column(prop="modular" label="产品模块")
        span(class="footer")
            el-button(@click="cancelTask" type="info") 取 消
            el-button(type="primary" @click="cancelTask") 确 定
    .task-permissions-headers(v-if="issue.issueDialogs") 任务下发
    .task-permissions-titles(v-if="issue.issueDialogs")
        h3 任务执行类型
            el-radio(v-model="issue.radio" label="1") 单次任务
            .task-permissions-one(v-if="issue.radio === '1'")
                el-form(:model="issue" label-width="80px")
                    el-form-item(label="启动时间")
                        el-select(v-model="issue.time" @change="handleIssueTime")
                            el-option(v-for="(item, index) in issue.timeOptions" :label="item.label" :value="item.value")
            .task-permissions-one(v-if="issue.radio === '2'")
                el-form(:model="issue" label-width="80px")
                    el-form-item(label="启动时间")
                        el-select(v-model="issue.time" @change="handleIssueTime" disabled="true")
                            el-option(v-for="(item, index) in issue.timeOptions" :label="item.label" :value="item.value")
            el-radio(v-model="issue.radio" label="2") 周期任务
            .task-permissions-two(v-if="issue.radio === '2'")
                el-form(:model="issue" label-width="80px")
                    el-form-item(label="启动频率")
                        el-radio(v-model="issue.radioOne" label="1") 每日
                        el-radio(v-model="issue.radioOne" label="2") 每周
                        el-radio(v-model="issue.radioOne" label="3") 每小时
                    el-form-item(label="启动日期")
                        el-input(v-model="demand.data.date")
                    el-form-item(label="启动时间")
                        el-input(v-model="demand.data.time")
            .task-permissions-two(v-if="issue.radio === '1'")
                el-form(:model="issue" label-width="80px")
                    el-form-item(label="启动频率")
                        el-radio(v-model="issue.radioOne" label="1" disabled="true") 每日
                        el-radio(v-model="issue.radioOne" label="2" disabled="true") 每周
                        el-radio(v-model="issue.radioOne" label="3" disabled="true") 每小时
                    el-form-item(label="启动日期")
                        el-input(v-model="demand.data.date" disabled="true")
                    el-form-item(label="启动时间")
                        el-input(v-model="demand.data.time" disabled="true")
        h3 任务执行策略
        el-radio(v-model="issue.radioStrategyOne" label="1") 继续执行新一轮任务调度
        br
        el-radio(v-model="issue.radioStrategyOne" label="2") 不进行新一轮任务调度
        br
        el-radio(v-model="issue.radioStrategyOne" label="3") 排队进行新一轮任务调度
        span(class="footer")
            el-button(@click="cancelIssue" type="info") 取 消
            el-button(type="primary" @click="cancelIssue") 确 定
</template>

<script>
  export default {
    name: "taskConfigure",
    data() {
      return {
        checked: 1 ,
        search: {
            data: {
                name: '',
                status: '',
                type: '',
                statusOptions: [
                    { label: '所有', value: '100' },
                    { label: '待提交', value: '101' },
                    { label: '待审核', value: '102' },
                    { label: '审核通过', value: '103' },
                    { label: '审核不通过', value: '104' },
                ],
                typeOptions: [
                    { label: '高', value: '200' },
                    { label: '中', value: '201' },
                    { label: '低', value: '202' },
                ]
            }
        },
        table: {
            data: [
                { accountNumber: 'AD02890H', accountName: '人群结构属性优化任务', name: 'QW05008P', idCard: '人群结构属性优化需求', accountType: '华泰中科有限技术公司', acountExplain: '中', accountStatus: '刘明方', role: '2020-07-01'},
                { accountNumber: 'SKO1301O', accountName: '职住分布地图页面优化任务', name: 'PR00610U', idCard: '职住分布地图页面优化需求', accountType: '聚星网络股份有限公司', acountExplain: '低', accountStatus: '姚国斌', role: '2020-07-23'},
                { accountNumber: 'STO4780Y', accountName: '出行OD优化任务v3', name: 'VT08624D', idCard: '出行OD优化需求v3', accountType: '科有道信息技术有限公司', acountExplain: '低', accountStatus: '吴腾飞', role: '2020-07-29'},
            ],
            tab: {
                activeIndex: 0,
                data: [
                    { name: '待下发', val: 0 },
                    { name: '已下发', val: 1 }
                ]
            },
            currentPage: 4,
            data1: [
                { accountNumber: 'AD02890H', accountName: '人群结构属性优化需求', name: 'QW05008P', idCard: '人群结构属性优化需求', accountType: '华泰中科有限技术公司', acountExplain: '中', accountStatus: '刘明方', role: '2020-07-29', status: '未启动', lastTime: '2020-07-29'}
            ],
        },
        add: {
            task: false,
            form: {
                task: {
                    name: '',
                    number: '',
                    grade: '请选择',
                    pass: '',
                    index: '',
                    demand: '',
                    customer: '',
                    contractId: '',
                    contractName: '',
                    area: '',
                    time: '请选择',
                    timeFrame: '',
                    productType: '请选择',
                    productModular: '请选择',
                    odType: '请选择',
                    odDirection: '请选择',
                    gradeOptions: [
                        { label: '请选择', value: '200' },
                        { label: '高', value: '201' },
                        { label: '中', value: '202' },
                        { label: '低', value: '203' }
                    ],
                    timeOptions: [
                        { label: '请选择', value: '300' }
                    ],
                    productTypeOptions: [
                        { label: '请选择', value: '400' }
                    ],
                    productModularOptions: [
                        { label: '请选择', value: '500' }
                    ],
                    odTypeOptions: [
                        { label: '请选择', value: '600' }
                    ],
                    odDirectionOptions: [
                        { label: '请选择', value: '700' }
                    ]
                }
            }
        },
        demand: {
            demandDialogs: false,
            data: {
                name: '',
                type: '所有',
                typeOptions: [
                    { label: '所有', value: '800' },
                    { label: '人群结构', value: '801' },
                    { label: '人群分布', value: '802' },
                    { label: '人群出行', value: '803' },
                    { label: '城市通行', value: '804' }
                ]
            },
            table: [
                { name: '人群结构属性优化需求', time: '天', type: '人群结构', modular: '人群结构属性' },
                { name: '职住分布地图页面优化需求', time: '小时', type: '人群分布', modular: '职住分布' }
            ],
            radio: '1'
        },
        issue: {
            issueDialogs: false,
            radio: '1',
            radioOne: '0',
            date: '',
            time: '',
            radioStrategyOne: '1',
            timeOptions: [
                { label: '请选择', value: '900' }
            ]
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
        // 分页
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        chooseTabHandle(data) {
            const me = this;
            me.table.tab.activeIndex = data.val;
        },
        addTask() {
            const me = this;
            me.add.task = true;
        },
        cancelTask() {
            const me = this;
            me.add.task = false;
            me.demand.demandDialogs = false;
        },
        handleTaskGrade(vId) {
            const me = this;
            me.add.form.task.grade = me.add.form.task.gradeOptions[vId.substr(vId.length-1,1)].label
        },
        handleTime(vId) {
            const me = this;
            me.add.form.task.time = me.add.form.task.timeOptions[vId.substr(vId.length-1,1)].label
        },
        handleProductType(vId) {
            const me = this;
            me.add.form.task.productType = me.add.form.task.productTypeOptions[vId.substr(vId.length-1,1)].label
        },
        handleProductModular(vId) {
            const me = this;
            me.add.form.task.productModular = me.add.form.task.productModularOptions[vId.substr(vId.length-1,1)].label
        },
        handleOdType(vId) {
            const me = this;
            me.add.form.task.odType = me.add.form.task.odTypeOptions[vId.substr(vId.length-1,1)].label
        },
        handleodDirection(vId) {
            const me = this;
            me.add.form.task.odDirection = me.add.form.task.odDirectionOptions[vId.substr(vId.length-1,1)].label
        },
        // 选择需求
        demandClick() {
            const me = this;
            me.demand.demandDialogs = true; 
        },
        handleDemandType(vId) {
            const me = this;
            me.demand.data.type = me.demand.data.typeOptions[vId.substr(vId.length-1,1)].label;
        },
        // 任务下发
        taskIssue() {
            const me = this;
            me.issue.issueDialogs = true;
        },
        handleIssueTime(vId) {
            const me = this;
            me.issue.time = me.issue.timeOptions[vId.substr(vId.length-1,1)].label;
        },
        cancelIssue() {
            const me = this;
            me.issue.issueDialogs = false;
        }
    }
  };
</script>

<style lang="stylus">
    @import '~@/assets/styles/mixin.styl'
    layout-block()
        box-shadow 0 0 0 1px rgba(218, 226, 237, 1) inset
    .task-permissions
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
                padding 30px
                &-tab
                    margin 20px 0
                    display flex
                    justify-content space-between
                    &-left
                        span
                            margin-right 15px
                            cursor pointer
                        .role-permissions-right-tab-active
                            color #1890ff
                            border-bottom 1px solid #1890ff
                            cursor pointer
                        span:hover
                            color #1890ff
                            border-bottom 1px solid #1890ff
                            cursor pointer
                    &-right
                        color #1890ff
                .el-table
                    margin-top 20px
                    .cell
                        padding-left 0px
                        padding-right 0px
                    .btn
                        color #1890ff
                        cursor pointer
                .el-pagination
                    margin 20px 0 0 0
                    float right
        &-headers
            height 50px
            padding 0 10px
            layout-block()
            line-height 50px
        &-mains
            background rgba(255,255,255,1)
            margin-top 10px
            min-height 400px
            layout-block()
            padding 20px
            .el-form-item
                width 500px
            .el-select
                width 420px
            .footer
                display flex
                justify-content center
            .grade
                position absolute
                top 0px
                left 369px
                z-index 100
                width 50px
                height 31px
                text-align center
                line-height 31px
                background rgba(218, 226, 237, 1)
                cursor pointer
        .el-dialog
            &-header
                .el-form
                    padding 0 20px
                    display flex
                    justify-content space-between
            .footer
                display flex
                justify-content center
                margin 20px 0 0 0
        &-titles
            background rgba(255,255,255,1)
            margin-top 10px
            min-height 400px
            layout-block()
            padding 40px
            .el-form-item
                width 500px
            .el-radio
                margin 10px 10px
            .footer
                display flex
                justify-content center
</style>