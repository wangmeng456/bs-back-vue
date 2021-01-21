<!--
 * @Descripttion:
 * @version:
 * @Author: Miliky
 * @Date: 2020-07-28 20:02:24
 * @LastEditors: Miliky
 * @LastEditTime: 2020-07-29 10:48:59
-->
<template lang="pug">
.app-container
	el-form(:inline="true" :model="formInline" class="demo-form-inline")
		el-form-item(label="产品模块名称:")
			el-input(v-model="formInline.user" placeholder="产品模块名称")
		el-form-item(label="产品模块状态:")
			el-select(v-model="formInline.region" placeholder="产品模块状态")
				el-option(label="有效" value="1")
				el-option(label="无效" value="2")
		el-form-item()
			el-button(type="primary") 查询
			el-button() 重置
	.table-list
		el-button(type="warning" icon="el-icon-plus"  @click="dialogVisible = true") 新增模块
		el-table(:data="data" style="width: 100%")
			el-table-column(type="index" label="序号")
			el-table-column(prop="a" label="产品模块名称")
			el-table-column(prop="b" label="产品模块状态")
			el-table-column(prop="c" label="前置模块名称")
			el-table-column(prop="e" label="创建人")
			el-table-column(prop="f" label="创建时间" width="140")
			el-table-column(prop="g" label="修改人")
			el-table-column(prop="h" label="修改时间" width="140")
			el-table-column(label="操作" width="140")
				template(slot-scope="scope")
					el-button(type="text") 编辑
					el-button(type="text") 删除
	el-dialog(title="新增模块" :visible.sync="dialogVisible" width="30%" :before-close="handleClose")
		el-form(ref="form"  :rules="rules" :model="form" label-width="120px")
			el-form-item(label="产品模块名称" prop="user")
				el-input(v-model="form.user" placeholder="产品模块名称")
			el-form-item(label="产品模块状态" prop="user1")
				el-radio-group(v-model="form.user1")
					el-radio(label="有效")
					el-radio(label="无效")
			el-form-item(label="前置模块名称" prop="user2")
				el-select(v-model="form.user2" placeholder="前置模块名称")
					el-option(label="人群结构属性" value="1")
					el-option(label="职住分布" value="2")
					el-option(label="出行OD" value="3")
			el-form-item(label="备注信息" prop="user3")
				el-input(type="textarea" v-model="form.user3" placeholder="备注信息")
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
			form: {
				user: '',
				user1: '有效',
				user2: '',
				user3: '',
			},
			data:[
				{
					a:'人群结构属性',
					b:'有效',
					c:'',
					d:'已下线',
					e:'admin',
					f:'2019-05-22 19:50:20',
					g:'admin',
					h:'2019-05-22 19:50:21',
				},
				{
					a:'职住分布',
					b:'有效',
					c:'',
					d:'已下线',
					e:'admin',
					f:'2019-05-22 20:40:25',
					g:'admin',
					h:'2019-05-22 20:40:30',
				},
				{
					a:'出行OD',
					b:'有效',
					c:'职住分布',
					d:'已上线',
					e:'admin',
					f:'2019-05-22 23:46:00',
					g:'admin',
					h:'2019-05-22 23:46:11',
				},
			],
			rules:{
				user: [
					{required: true, message: '请输入产品模块名称', trigger: 'blur'}
				],
				user1: [
					{required: true, message: '产品模块状态', trigger: 'blur'}
				],
				user2: [
					{required: true, message: '请选择前置模块名称', trigger: 'change'}
				],
				user3: [
					{required: true, message: '备注信息', trigger: 'blur'}
				],
			},
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