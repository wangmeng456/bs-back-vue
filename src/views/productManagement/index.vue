<template lang="pug">
.app-container
	el-form(:inline="true" :model="formInline" class="demo-form-inline")
		el-form-item(label="产品模块名称:")
			el-input(v-model="formInline.user" placeholder="产品模块名称")
		el-form-item(label="产品模块状态:")
			el-select(v-model="formInline.region" placeholder="产品模块状态")
				el-option(label="上线" value="1")
				el-option(label="下线" value="2")
				el-option(label="升级" value="3")
		el-form-item()
			el-button(type="primary") 查询
			el-button() 重置
	.table-list
		el-table(:data="data" style="width: 100%" height= '450')
			el-table-column(type="index" label="序号")
			el-table-column(prop="a" label="产品名称")
			el-table-column(prop="b" label="产品模块")
			el-table-column(prop="c" label="产品版本")
			el-table-column(prop="d" label="产品状态")
			el-table-column(prop="e" label="创建人")
			el-table-column(prop="f" label="创建时间" width="140")
			el-table-column(prop="g" label="修改人")
			el-table-column(prop="h" label="修改时间" width="140")
			el-table-column(label="操作" width="140")
				template(slot-scope="scope")
					el-button(type="text") 上线 
					el-button(type="text") 下线
					//- el-button(type="text") 升级
					el-button(type="text") 查看
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
					b:'分类指标数据',
					c:'1',
					d:'已下线',
					e:'admin',
					f:'2019-01-04 15:50:20',
					g:'admin',
					h:'2019-01-06 15:50:21',
				},
				{
					a:'人群结构分析',
					b:'行为模型',
					c:'1',
					d:'已下线',
					e:'admin',
					f:'2019-01-21 15:06:00',
					g:'admin',
					h:'2019-01-21 16:10:00',
				},
				{
					a:'人群分布分析',
					b:'任务采集',
					c:'5',
					d:'已上线',
					e:'admin',
					f:'2019-01-31 18:46:20',
					g:'admin',
					h:'2019-01-31 18:46:21',
				},
				{
					a:'人群分布分析',
					b:'人群建模',
					c:'1',
					d:'已下线',
					e:'admin',
					f:'2019-02-22 19:50:20',
					g:'admin',
					h:'2019-02-22 19:50:21',
				},
				{
					a:'人群分布分析',
					b:'人群特征识别',
					c:'1',
					d:'已下线',
					e:'admin',
					f:'2019-03-11 10:00:20',
					g:'admin',
					h:'2019-03-11 11:20:00',
				},
				{
					a:'人群分布分析',
					b:'职住模型',
					c:'5',
					d:'已上线',
					e:'admin',
					f:'2019-03-20 17:30:00',
					g:'admin',
					h:'2019-03-20 17:40:00',
				},
				{
					a:'人群出行分析',
					b:'OD模型',
					c:'1',
					d:'已下线',
					e:'admin',
					f:'2019-07-01 19:50:20',
					g:'admin',
					h:'2019-07-01 19:50:21',
				},
				{
					a:'人群出行分析',
					b:'分类指标数据',
					c:'5',
					d:'已上线',
					e:'admin',
					f:'2019-07-14 20:00:00',
					g:'admin',
					h:'2019-07-15 11:00:07',
				},
				{
					a:'城市通勤分析',
					b:'用户特征',
					c:'5',
					d:'已上线',
					e:'admin',
					f:'2019-07-23 08:20:20',
					g:'admin',
					h:'2019-07-23 17:40:21',
				},
				{
					a:'城市通勤分析',
					b:'时间与空间',
					c:'1',
					d:'已下线',
					e:'admin',
					f:'2019-07-30 14:00:00',
					g:'admin',
					h:'2019-07-30 15:00:01',
				},
				{
					a:'城市通勤分析',
					b:'分类指标数据',
					c:'5',
					d:'已上线',
					e:'admin',
					f:'2019-08-04 10:10:20',
					g:'admin',
					h:'2019-08-04 11:00:21',
				},
				{
					a:'地理信息分析',
					b:'地理信息采集',
					c:'5',
					d:'已上线',
					e:'admin',
					f:'2019-08-18 18:50:20',
					g:'admin',
					h:'2019-08-18 18:50:21',
				},
				{
					a:'城市规划定制',
					b:'空间分布',
					c:'1',
					d:'已下线',
					e:'admin',
					f:'2019-08-22 19:40:10',
					g:'admin',
					h:'2019-08-22 19:40:11',
				},
				{
					a:'城市规划定制',
					b:'出行分布',
					c:'5',
					d:'已上线',
					e:'admin',
					f:'2019-08-30 11:34:00',
					g:'admin',
					h:'2019-08-30 12:35:00',
				},
				{
					a:'城市规划定制',
					b:'行迹分布',
					c:'5',
					d:'已上线',
					e:'admin',
					f:'2019-09-20 19:00:20',
					g:'admin',
					h:'2019-09-20 19:00:21',
				},
			]
		}
	}
}
</script>
<style lang="scss" scoped>

</style>