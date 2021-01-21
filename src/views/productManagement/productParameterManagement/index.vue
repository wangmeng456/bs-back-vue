<template lang="pug">
.app-container
	el-form(:inline="true" :model="formInline" class="demo-form-inline")
		el-form-item(label="产品参数名称:")
			el-input(v-model="formInline.user" placeholder="产品模块名称")
		el-form-item(label="产品参数类型:")
			el-select(v-model="formInline.region" placeholder="产品参数类型")
				el-option(label="上线" value="1")
				el-option(label="下线" value="2")
				el-option(label="升级" value="3")
		el-form-item()
			el-button(type="primary") 查询
			el-button() 重置
	.table-list
		el-button(type="warning" icon="el-icon-plus" @click="dialogVisible = true") 新增参数
		el-table(:data="data" style="width: 100%")
			el-table-column(type="index" label="序号")
			el-table-column(prop="a" label="产品参数名称")
			el-table-column(prop="b" label="产品参数类型")
			el-table-column(prop="c" label="参数数据")
				template(slot-scope="scope")
					el-button(type="text") {{scope.row.btn}} 
			el-table-column(prop="d" label="是否必填")
			el-table-column(prop="e" label="创建人")
			el-table-column(prop="f" label="创建时间" width="140")
			el-table-column(prop="g" label="修改人")
			el-table-column(prop="h" label="修改时间" width="140")
			el-table-column(label="操作" width="140")
				template(slot-scope="scope")
					el-button(type="text") 编辑
					el-button(type="text") 删除
	el-dialog(title="新增" :visible.sync="dialogVisible" width="50%" :before-close="handleClose")
		el-table(:data="datas" style="width: 100%")
			el-table-column(type="index" label="序号")
			el-table-column(prop="a" label="产品参数名称")
				template(slot-scope="scope")
					el-input(v-model="form[scope.row.num].name1" placeholder="产品模块名称")
			el-table-column(prop="b" label="产品参数类型")
				template(slot-scope="scope")
					el-select(v-model="form[scope.row.num].name2" placeholder="产品参数类型")
						el-option(label="输入框" value="1")
						el-option(label="下拉框" value="2")
						el-option(label="单时间组件" value="3")
						el-option(label="时间范围选择" value="4")
						el-option(label="单选按钮" value="5")
						el-option(label="复选按钮" value="6")
			el-table-column(prop="c" label="数据设置")
				template(slot-scope="scope")
					el-button(type="text") 设置
			el-table-column(prop="c" label="是否必填")
				template(slot-scope="scope")
					el-select(v-model="form[scope.row.num].name3" placeholder="是否必填")
						el-option(label="是" value="1")
						el-option(label="否" value="2")
			el-table-column(label="操作")
				template(slot-scope="scope")
					el-button(type="text") 删除
		span(slot="footer" class="dialog-footer")
			el-button(@click="dialogVisible = false") 取 消
			el-button(type="primary" @click="dialogVisible = false") 确 定
</template>
<script>
export default {
	data () {
		return {
			dialogVisible: false,
			formInline:{
				user: '',
				region: ''
			},
			form: [
				{
					name1: '',
					name2: '',
					name3: '',
				},
				{
					name1: '',
					name2: '',
					name3: '',
				}
			],
			datas:[{num:0},{num:1}],
			data:[
				{
					a:'产品类型',
					b:'单项选择',
					c:'1',
					d:'是',
					e:'admin',
					f:'2019-02-22 19:50:20',
					g:'admin',
					h:'2019-02-22 19:50:21',
					btn: '查看'
				},
				{
					a:'产品模块名称',
					b:'文本输入',
					c:'1',
					d:'是',
					e:'admin',
					f:'2019-03-02 10:00:20',
					g:'admin',
					h:'2019-03-03 10:00:21',
					btn: '-'
				},
				{
					a:'产品ID',
					b:'文本输入',
					c:'5',
					d:'是',
					e:'admin',
					f:'2019-03-26 20:10:43',
					g:'admin',
					h:'2019-03-26 20:10:53',
					btn: '-'
				},
				{
					a:'时间范围',
					b:'时间选择',
					c:'1',
					d:'否',
					e:'admin',
					f:'2019-03-31 12:00:00',
					g:'admin',
					h:'2019-03-31 23:00:00',
					btn: '-'
				},
				{
					a:'区域范围',
					b:'单项选择',
					c:'5',
					d:'否',
					e:'admin',
					f:'2019-04-16 19:50:20',
					g:'admin',
					h:'2019-04-16 19:50:21',
					btn: '查看'
				},
				{
					a:'OD类型',
					b:'时间选择',
					c:'1',
					d:'是',
					e:'admin',
					f:'2019-05-20 00:00:20',
					g:'admin',
					h:'2019-05-20 06:34:00',
					btn: '查看'
				},
				{
					a:'OD方向',
					b:'单项选择',
					c:'5',
					d:'是',
					e:'admin',
					f:'2019-06-01 22:30:20',
					g:'admin',
					h:'2019-06-01 22:50:00',
					btn: '查看'
				},
			]
		}
	},
	methods:{
		handleClose () {
			this.dialogVisible = false;
		}
	}
}
</script>
<style lang="scss" scoped>

</style>