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
		el-button(type="warning" icon="el-icon-download") 批量下载
		el-table(:data="data" style="width: 100%")
			el-table-column(type="selection" width="55")
			el-table-column(type="index" label="序号")
			el-table-column(prop="a" label="产品名称")
			el-table-column(prop="b" label="客户名称")
			el-table-column(prop="c" label="文件名称")
			el-table-column(prop="d" label="下载次数")
			el-table-column(prop="e" label="下载进度")
			el-table-column(prop="f" label="下载时间" width="140")
			el-table-column(label="操作" width="80")
				template(slot-scope="scope")
					el-button(type="text") 下载
</template>
<script>
export default {
	data () {
		return {
			formInline:{
				user: '',
				region: ''
			},
			data:[
				{
					a:'人群结构分析',
					b:'众泰信息科技有限公司',
					c:'fjurfhf94839.ztkj',
					d:'2',
					e:'已完成',
					f:'2019-10-24 16:04:08',
					g:'已完成',
					h:'2019-10-24 19:50:21',
				},
				{
					a:'人群分布分析',
					b:'简图股份有限公司',
					c:'ru489ru894ujf.jtgf',
					d:'4',
					e:'已完成',
					f:'2019-10-25 13:46:13',
					g:'已完成',
					h:'2019-10-25 13:47:21',
				},
				{
					a:'人群出行分析',
					b:'中清信息有限公司',
					c:'jf894u84ur9.zqxin',
					d:'1',
					e:'已完成',
					f:'2019-11-11 04:01:06',
					g:'已完成',
					h:'2019-11-11 18:35:21',
				},
				{
					a:'城市通勤分析',
					b:'红洞网络有限公司',
					c:'jurjf93349ri.hdwl',
					d:'5',
					e:'已完成',
					f:'2019-11-23 19:50:20',
					g:'已完成',
					h:'2019-05-22 19:50:21',
				},
				{
					a:'城市规划定制',
					b:'向鑫科技有限公司',
					c:'434r4frf44.xinkj',
					d:'1',
					e:'已完成',
					f:'2019-12-22 10:23:00',
					g:'已完成',
					h:'2019-12-22 12:23:01',
				},
			]
		}
	}
}
</script>
<style lang="scss" scoped>

</style>