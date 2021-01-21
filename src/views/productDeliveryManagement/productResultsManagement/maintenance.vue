<!--
 * @Descripttion: 
 * @version: 
 * @Author: Miliky
 * @Date: 2020-07-28 21:38:17
 * @LastEditors: Miliky
 * @LastEditTime: 2020-07-29 10:28:11
--> 
<template lang="pug">
.app-container
	el-form(:inline="true" :model="formInline" class="demo-form-inline")
		el-form-item(label="产品名称:")
			el-input(v-model="formInline.user" placeholder="产品名称")
		el-form-item(label="文件名称:")
			el-input(v-model="formInline.region" placeholder="文件名称")
		el-form-item()
			el-button(type="primary") 查询
			el-button() 重置
	.table-list
		el-button(type="warning" @click="dialogVisible=true") 新 增
		el-table(:data="data" style="width: 100%")
			el-table-column(type="index" label="序号")
			el-table-column(prop="a" label="任务编码" width="140")
			el-table-column(prop="b" label="任务名称")
			el-table-column(prop="c" label="需求编码" width="140")
			el-table-column(prop="d" label="需求名称")
			el-table-column(prop="e" label="客户名称" width="140")
			el-table-column(prop="h" label="文件名称" width="120")
			el-table-column(prop="j" label="文件大小")
			el-table-column(prop="i" label="文件描述")
			el-table-column(prop="f" label="上传时间" width="140")
			el-table-column(prop="m" label="账户编码" width="140")
			el-table-column(prop="n" label="账户名称")
			el-table-column(label="操作" width="140")
				template(slot-scope="scope")
					el-button(type="text") 查询
					el-button(type="text") 删除
					el-button(type="text") 编辑
	el-dialog(title="新增" :visible.sync="dialogVisible" width="40%" :before-close="handleClose")
		el-form(ref="form" :model="form" label-width="80px")
			el-row
				el-col(:span="12")
					el-form-item(label="任务编码")
						el-input(v-model="form.user1" placeholder="任务编码")
				el-col(:span="12")
					el-form-item(label="任务名称")
						el-input(v-model="form.user2" placeholder="任务名称")
				el-col(:span="12")
					el-form-item(label="需求编码")
						el-input(v-model="form.user3" placeholder="需求编码")
				el-col(:span="12")
					el-form-item(label="需求名称")
						el-input(v-model="form.user4" placeholder="需求名称")
				el-col(:span="12")
					el-form-item(label="客户名称")
						el-input(v-model="form.user5" placeholder="客户名称")
				el-col(:span="12")
					el-form-item(label="文件名称")
						el-input(v-model="form.user6" placeholder="文件名称")
				el-col(:span="12")
					el-form-item(label="文件大小")
						el-input(v-model="form.user7" placeholder="文件大小")
				el-col(:span="12")
					el-form-item(label="上传时间")
						el-input(v-model="form.user8" placeholder="上传时间")
				el-col(:span="24")
					el-form-item(label="文件描述")
						el-input(type="textarea" v-model="form.user9" placeholder="文件描述")
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
			form:{
				user1: '',
				user2: '',
				user3: '',
				user4: '',
				user5: '',
				user6: '',
				user7: '',
				user8: '',
				user9: ''
			},
			data:[
				{
					a:'UYUD8984839',
					b:'人群结构属性优化任务',
					c:'7843HFHF784',
					d:'人群结构属性优化需求',
					e:'诚鑫网络有限公司',
					f:'2019-05-02 19:50:20',
					g:'admin',
					h:'d839duj8.cxin',
					j: '12.4M',
					i: '无',
					m: 'hd73y388u9',
					n: 'admin'
				},
				{
					a:'EDJF9989809',
					b:'职住分布地图页面优化任务',
					c:'46H6UR900',
					d:'职住分布地图页面优化需求',
					e:'方圆科技有限公司',
					f:'2019-05-23 10:24:54',
					g:'admin',
					h:'u8u984duj8.fangy',
					j: '46.4M',
					i: '无',
					m: 'hd73y388u9',
					n: 'admin'
				},
				{
					a:'GGFY8948394',
					b:'出行OD优化任务v3',
					c:'783HF7R748',
					d:'出行OD优化需求v3',
					e:'聚德股份有限公司',
					f:'2019-05-23 16:36:20',
					g:'admin',
					h:'d8hfuf898.jude',
					j: '14.6M',
					i: '无',
					m: 'hd73y388u9',
					n: 'admin'
				},
			]
		}
	},
	methods:{
		handleClose(){
			this.dialogVisible = false;
		}
	}
}
</script>
<style lang="scss" scoped>

</style>