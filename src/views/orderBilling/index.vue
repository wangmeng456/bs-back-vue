<template lang="pug">
.app-container
	el-form(:inline="true" :model="formInline" class="demo-form-inline")
		el-form-item(label="订单名称:")
			el-input(v-model="formInline.user" placeholder="订单名称")
		el-form-item(label="订购名称:")
			el-input(v-model="formInline.region" placeholder="订购名称")
		el-form-item()
			el-button(type="primary") 查询
			el-button() 重置
	.table-list
		el-table(:data="data" style="width: 100%")
			el-table-column(type="index" label="序号")
			el-table-column(prop="a" label="订单编号" width="140")
			el-table-column(prop="b" label="订单名称")
			el-table-column(prop="c" label="订单日期范围" width="170")
			el-table-column(prop="d" label="订购产品")
			el-table-column(prop="e" label="订购人账号")
			el-table-column(prop="f" label="订购数量")
			el-table-column(prop="g" label="订单金额")
			el-table-column(prop="h" label="订单周期")
			el-table-column(label="操作" width="120")
				template(slot-scope="scope")
					el-button(type="text") 开通
					el-button(type="text") 续订
					el-button(type="text") 关闭
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
					a:'KC106202005220005',
					b:'人群结构分析中科订单05220005',
					c:'2019-05-22 至 2020-05-22',
					d:'人群结构分析',
					e:'zhongke0308',
					f:'1',
					g:'67万元',
					h:'1年',
				},
			]
		}
	}
}
</script>
<style lang="scss" scoped>

</style>