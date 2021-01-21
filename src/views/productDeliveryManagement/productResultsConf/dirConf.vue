<!--
 * @Descripttion: 
 * @version: 
 * @Author: Miliky
 * @Date: 2020-07-29 09:49:09
 * @LastEditors: Miliky
 * @LastEditTime: 2020-07-29 10:15:03
--> 
<template lang="pug">
.app-container
	el-form(:inline="true" :model="formInline" class="demo-form-inline")
		el-form-item(label="产品名称:")
			el-input(v-model="formInline.user" placeholder="产品名称")
		el-form-item(label="客户名称:")
			el-input(v-model="formInline.region" placeholder="客户名称")
		el-form-item()
			el-button(type="primary") 查询
			el-button() 重置
	.table-list
		el-button(type="warning" icon="el-icon-plus" @click="open('新增目录配置')") 新增目录
		el-table(:data="data" style="width: 100%")
			el-table-column(type="index" label="序号")
			el-table-column(prop="a" label="产品名称")
			el-table-column(prop="b" label="客户名称")
			el-table-column(prop="c" label="主机地址")
			el-table-column(label="数据模板")
				template(slot-scope="scope")
					el-button(type="text" @click="open('新增数据模板')") 添加
			el-table-column(prop="e" label="创建人")
			el-table-column(prop="f" label="创建时间" width="140")
			el-table-column(label="操作" width="140")
				template(slot-scope="scope")
					el-button(type="text") 编辑
					el-button(type="text") 删除
	el-dialog(:title="title" :visible.sync="dialogVisible" width="30%" :before-close="handleClose")
		el-form(v-if="title==='新增目录配置'" ref="form" :model="form" label-width="80px")
			el-form-item(label="产品名称")
				el-input(v-model="form.user" placeholder="产品名称")
			el-form-item(label="客户名称")
				el-input(v-model="form.user1" placeholder="客户名称")
			el-form-item(label="主机地址")
				el-input(v-model="form.user2" placeholder="主机地址")
		el-form(v-else ref="form" :model="form" label-width="40px")
			el-form-item(label="标题")
				el-input(v-model="form.user" placeholder="标题")
			el-form-item(label="呼文")
				el-input(v-model="form.user1" placeholder="呼文")
			el-form-item(label="正文")
				el-input( type="textarea" v-model="form.user2" placeholder="正文")
		span(slot="footer" class="dialog-footer")
			el-button(@click="dialogVisible = false") 取 消
			el-button(type="primary" @click="dialogVisible = false") 确 定
</template>
<script>
export default {
	data () {
		return {
			dialogVisible: false,
			title: '',
			formInline:{
				user: '',
				region: ''
			},
			form:{
				user: '',
				user1: '',
				user2: '',	
			},
			data:[
				{
					a:'人群结构分析',
					b:'众泰信息科技有限公司',
					c:'10.1.236.128',
					d:'已下线',
					e:'admin',
					f:'2019-07-20 14:50:20',
					g:'admin',
					h:'2019-07-20 19:50:21',
				},
				{
					a:'人群分布分析',
					b:'简图股份有限公司',
					c:'163.1.236.14',
					d:'已下线',
					e:'admin',
					f:'2019-07-30 20:26:06',
					g:'admin',
					h:'2019-07-30 20:26:11',
				},
				{
					a:'人群出行分析',
					b:'中清信息有限公司',
					c:'10.12.204.1',
					d:'已上线',
					e:'admin',
					f:'2019-10-26 04:40:20',
					g:'admin',
					h:'2019-10-26 06:50:21',
				},
				{
					a:'城市通勤分析',
					b:'红洞网络有限公司',
					c:'216.18.236.5',
					d:'已下线',
					e:'admin',
					f:'2019-10-27 18:20:20',
					g:'admin',
					h:'2019-10-27 18:20:21',
				},
				{
					a:'城市规划定制',
					b:'向鑫科技有限公司',
					c:'192.10.6.0',
					d:'已上线',
					e:'admin',
					f:'2019-11-01 13:50:40',
					g:'admin',
					h:'2019-11-01 13:50:41',
				},
			]
		}
	},
	methods:{
		open (val) {
			this.title = val;
			this.dialogVisible = true;
		},
		handleClose () {
			this.dialogVisible = false;
		}
	}
}
</script>
<style lang="scss" scoped>

</style>