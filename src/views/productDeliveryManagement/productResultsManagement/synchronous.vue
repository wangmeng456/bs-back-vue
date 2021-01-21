<template lang="pug">
.app-container
	el-form(:inline="true" :model="formInline" class="demo-form-inline")
		el-form-item(label="文件名称:")
			el-input(v-model="formInline.user" placeholder="文件名称")
		el-form-item(label="上传时间:")
			el-input(v-model="formInline.region" placeholder="上传时间")
		el-form-item()
			el-button(type="primary") 查询
			el-button() 重置
	.table-list
		el-table(:data="data" style="width: 100%")
			//- el-table-column(type="selection" width="55")
			el-table-column(type="index" label="序号")
			el-table-column(prop="a" label="任务编码")
			el-table-column(prop="b" label="任务名称")
			el-table-column(prop="c" label="需求编码")
			el-table-column(prop="d" label="需求名称")
			el-table-column(prop="e" label="客户名称" width="140")
			el-table-column(prop="h" label="文件名称" width="120")
			el-table-column(prop="i" label="同步类型")
			el-table-column(prop="g" label="同步状态")
			el-table-column(prop="f" label="上传时间" width="140")
			el-table-column(label="操作" width="80")
				template(slot-scope="scope")
					el-button(type="text") 同步数据
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
					a:'UYUD8984839',
					b:'人群结构属性优化任务',
					c:'7843HFHF784',
					d:'人群结构属性优化需求',
					e:'诚鑫网络有限公司',
					f:'2019-08-10 12:00:01',
					g:'未完成',
					h:'d839duj8.cxin',
					i: '手动'
				},
				{
					a:'EDJF9989809',
					b:'职住分布地图页面优化任务',
					c:'46H6UR900',
					d:'职住分布地图页面优化需求',
					e:'方圆科技有限公司',
					f:'2019-08-14 14:30:00',
					g:'已完成',
					h:'u8u984duj8.fangy',
					i: '手动'
				},
				{
					a:'GGFY8948394',
					b:'出行OD优化任务v3',
					c:'783HF7R748',
					d:'出行OD优化需求v3',
					e:'聚德股份有限公司',
					f:'2019-08-15 16:55:55',
					g:'已完成',
					h:'d8hfuf898.jude',
					i: '自动'
				},
			]
		}
	}
}
</script>
<style lang="scss" scoped>

</style>