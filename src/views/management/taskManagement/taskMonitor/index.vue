<template lang="pug">
.role-permissions
	.role-permissions-header
		el-form(:model="search.data" label-width="80px")
			el-form-item(label="任务名称")
				el-input(v-model="search.data.name" placeholder="任务名称")
			el-form-item(label="任务状态")
				el-select(v-model="search.data.status")
						el-option(v-for="(item, index) in search.data.statusOptions" :label="item.label" :value="item.value")
			el-form-item(label="优先级")
				el-select(v-model="search.data.type")
					el-option(v-for="(item, index) in search.data.typeOptions" :label="item.label" :value="item.value")
			el-form-item
				el-button(size="small" type="primary") 查询
				el-button(size="small" type="success") 重置
	.role-permissions-main
		.role-permissions-right
			.role-permissions-right-btn
					el-button(size="small" icon="el-icon-edit" type="warning" @click="open('监控配置')") 监控设置
			el-table(:data="table.data" border)
				el-table-column(type="index" label="序号")
				el-table-column(prop="taskId" label="任务编码")
				el-table-column(prop="taskName" label="任务名称")
				el-table-column(prop="demandId" label="需求编码")
				el-table-column(prop="demandName" label="需求名称")
				el-table-column(prop="custName" label="客户名称")
				el-table-column(prop="taskLevel" label="任务优先级")
				el-table-column(prop="updateStaff" label="修改人")
				el-table-column(prop="updateDate" label="修改时间")
				el-table-column(prop="taskStatus" label="任务状态")
				el-table-column(prop="lastTaskEndDate" label="上一次任务结束时间")
				el-table-column(prop="prepareDate" label="预警时间")
				el-table-column(prop="prepareContent" label="预警内容")
				el-table-column(label="错误日志")
					template(slot-scope="scope")
							el-button(type="text" @click="handleClick(scope.$index)") 查看
	el-dialog(:title="title" :visible.sync="dialogVisible" width="30%" :before-close="handleClose")
		el-form(v-if="title==='监控配置'" ref="form" :model="form" label-width="80px")
			el-form-item(label="返回信息")
				el-input(v-model="form.user" placeholder="返回信息")
			el-form-item(label="预警内容")
				el-input(v-model="form.user1" type="textarea")
		span(slot="footer" class="dialog-footer")
			el-button(@click="dialogVisible = false") 取 消
			el-button(type="primary" @click="dialogVisible = false") 确 定
	div(v-if="index == 0")
		el-dialog(title="监控日志" :visible.sync="dialogVisible1" width="50%" )
			el-table(:data="table.data1" border)
				el-table-column(type="index" label="序号")
				el-table-column(prop="setDate" label="设置时间")
				el-table-column(prop="setStaff" label="设置人")
				el-table-column(prop="returnMsg" label="返回信息值")
				el-table-column(prop="prepareContent" label="告警内容")
			span(slot="footer" class="dialog-footer")
				el-button(@click="dialogVisible1 = false") 取 消
	div(v-if="index == 1")
		el-dialog(title="监控日志" :visible.sync="dialogVisible1" width="50%" )
			el-table(:data="table.data2" border)
				el-table-column(type="index" label="序号")
				el-table-column(prop="setDate" label="设置时间")
				el-table-column(prop="setStaff" label="设置人")
				el-table-column(prop="returnMsg" label="返回信息值")
				el-table-column(prop="prepareContent" label="告警内容")
			span(slot="footer" class="dialog-footer")
				el-button(@click="dialogVisible1 = false") 取 消
</template>

<script>
	export default {
		name: "taskConfigure",
		data() {
			return {
				dialogVisible: false,
				dialogVisible1: false,
				title: '',
				form:{
					user: '',
					user1: '',
				},
				index: 0,
				search: {
						data: {
								name: '',
								status: '',
								type: '',
								statusOptions: [
										{ label: '所有', value: '' },
										{ label: '待提交', value: '1' },
										{label: '待审核', value: '2'},
										{label: '审核通过', value: '3'},
										{label: '审核不通过', value: '4'}
								],
								typeOptions: [
										{ label: '高', value: '1' },
										{ label: '中', value: '2' },
										{ label: '低', value: '3' }
								]
						}
				},
				table: {
						data: [
								{ taskId: 'AD02890H', taskName: '人群结构属性优化任务', demandId: 'QW05008P', demandName: '人群结构属性优化需求', custName: '华泰中科有限技术公司', taskLevel: '中', updateStaff: '刘明方', updateDate: '2019-10-12 14:20:20', taskStatus: '执行失败',lastTaskEndDate:'2019-10-12 19:30:20',prepareDate:'2019-10-12 15:50:20',prepareContent:'任务重复执行，请修改参数后重新执行'},
								{ taskId: 'SKO1301O', taskName: '职住分布地图页面优化任务', demandId: 'PR00610U', demandName: '需求2', custName: '职住分布地图页面优化需求', taskLevel: '中', updateStaff: '吴腾飞', updateDate: '2019-10-22 15:45:00',taskStatus: '执行失败',lastTaskEndDate:'2019-10-22 18:50:00',prepareDate:'2019-10-22 17:30:12',prepareContent:'服务器资源不足'},
						],
						data1: [
								{setDate: '2019-08-22 09:35:00',setStaff: '刘明方',returnMsg: 'TYODFRJIFRJI894839893',prepareContent: '任务重复执行，请修改参数后重新执行'},
						],
						data2: [
								{setDate: '2019-08-23 10:24:56',setStaff: '吴腾飞',returnMsg: 'JFIFNVCMKID8930847480',prepareContent: '服务器资源不足'}
						]
				},
			}
		},
		methods: {
			open (val) {
				this.title = val;
				this.dialogVisible = true;
			},
			handleClose () {
				this.dialogVisible = false;
			},
			handleClick(data) {
				this.dialogVisible1 = true;
				this.index = data;
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
            position absolute
            top 10%
            left 20%
            z-index 100
            layout-block()
            width 50%
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