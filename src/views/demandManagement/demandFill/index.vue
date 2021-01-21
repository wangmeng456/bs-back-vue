<template lang="pug">
.app-container
	el-form(:inline="true" :model="formInline" class="demo-form-inline")
		el-form-item(label="需求名称:")
			el-input(v-model="formInline.user" placeholder="需求名称")
		el-form-item(label="需求状态:")
			el-select(v-model="formInline.status" placeholder="需求状态")
				el-option(label="所有" value="")
				el-option(label="待提交" value="1")
				el-option(label="待审核" value="2")
				el-option(label="审核通过" value="3")
				el-option(label="审核不通过" value="4")
		el-form-item(label="时间粒度:")
			el-select(v-model="formInline.time" placeholder="时间粒度")
				el-option(label="所有" value="")
				el-option(label="天" value="1")
				el-option(label="小时" value="2")
		el-form-item(label="产品类型:")
			el-select(v-model="formInline.type" placeholder="产品类型")
				el-option(label="所有" value="")
				el-option(label="人群结构" value="1")
				el-option(label="人群分布" value="2")
				el-option(label="人群出行" value="3")
				el-option(label="城市通勤" value="4")
		el-form-item(label="产品模块:")
			el-select(v-model="formInline.module" placeholder="产品模块")
				el-option(label="所有" value="")
				el-option(label="人群结构属性" value="1")
				el-option(label="职住分布" value="2")
				el-option(label="人群网格" value="3")
				el-option(label="职住OD" value="4")
				el-option(label="出行OD" value="5")
				el-option(label="通勤统计" value="6")
				el-option(label="通勤OD" value="7")
		el-form-item()
			el-button(type="primary") 查询
			el-button() 重置
	.table-list
		el-button(type="warning" icon="el-icon-plus" @click="open('新增需求',[])") 新增需求
		el-button(type="danger" icon="el-icon-delete") 批量删除
		el-table(:data="data" style="width: 100%")
			el-table-column(type="selection" width="55")
			el-table-column(prop="a" label="需求编码")
			el-table-column(prop="b" width="180" label="需求名称")
				template(slot-scope="scope")
					el-button(type="text" @click="open('审核',scope.row)") {{ scope.row.b }}
			el-table-column(prop="c" width="180" label="客户名称")
			el-table-column(prop="d" width="120" label="合同编号")
			el-table-column(prop="e" width="180" label="合同名称")
			el-table-column(prop="f" label="区域范围")
			el-table-column(prop="g" label="时间范围" width="140")
			el-table-column(prop="h" label="时间粒度")
			el-table-column(prop="i" label="产品类型")
			el-table-column(prop="j" width="140" label="产品模块")
			el-table-column(prop="k" label="需求状态")
			el-table-column(prop="l" label="创建人")
			el-table-column(prop="m" label="创建时间" width="140")
			el-table-column(prop="n" label="审核人")
			el-table-column(prop="o" label="审核时间" width="140")
			el-table-column(label="操作" width="140")
				template(slot-scope="scope")
					el-button(type="text") 编辑
					el-button(type="text") 删除
					el-button(type="text" v-if="scope.row.a==='1'") 提交
					el-button(type="text" v-if="scope.row.a!='1'&scope.row.a!='4'") 审核
	el-dialog(:title="title" :visible.sync="dialogVisible" width="50%" :before-close="handleClose")
		el-form(ref="form" :model="form" label-width="80px")
			el-row(:gutter="20")
				el-col(:span="12")
					el-form-item(label="需求名称" prop="name1")
						el-input(v-model="form.name1" :disabled="disabled")
				el-col(:span="12")
					el-form-item(label="客户名称"  prop="name2")
						el-input(v-model="form.name2" :disabled="disabled")
				el-col(:span="12")
					el-form-item(label="合同编号")
						el-input(v-model="form.name3" :disabled="disabled")
				el-col(:span="12")
					el-form-item(label="合同名称")
						el-input(v-model="form.name4" :disabled="disabled")
				el-col(:span="24")
					el-form-item(label="区域范围")
						el-radio-group(v-model="form.name5" :disabled="disabled")
							el-radio(label="城市圈" value="1")
							el-radio(label="地域选择" value="1")
				el-col(:span="24")
					el-form-item(label="时间范围")
						el-date-picker(:disabled="disabled" value-format="yyyy-MM-dd" type="datetimerange" placeholder="选择时间" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" v-model="form.name6" style="width: 60%;")
				el-col(:span="24")
					el-form-item(label="时间粒度")
						el-select(v-model="form.name7" placeholder="请选择时间粒度" :disabled="disabled")
							el-option(label="天" value="1")
							el-option(label="小时" value="2")
				el-col(:span="12")
					el-form-item(label="产品类型")
						el-select(v-model="form.name8" placeholder="产品类型" :disabled="disabled")
							el-option(label="人群结构" value="1")
							el-option(label="人群分布" value="2")
							el-option(label="人群出行" value="3")
							el-option(label="城市通勤" value="4")
				el-col(:span="12")
					el-form-item(label="产品模块")
						el-select(v-model="form.name9" placeholder="产品模块" :disabled="disabled")
							el-option(label="人群结构属性" value="1")
							el-option(label="职住分布" value="2")
							el-option(label="人群网格" value="3")
							el-option(label="职住OD" value="4")
							el-option(label="出行OD" value="5")
							el-option(label="通勤统计" value="6")
							el-option(label="通勤OD" value="7")
				el-col(:span="24")
					el-form-item(label="备注信息")
						el-input(v-model="form.name10" type="textarea" :disabled="disabled")
				el-col(:span="24" v-show="title=='审核'")
					el-form-item(label="是否同意")
						el-radio-group(v-model="form.name11" :disabled="disabled")
							el-radio(label="是" value="1")
							el-radio(label="否" value="1")
				el-col(:span="24" v-show="title=='审核'")
					el-form-item(label="审核意见")
						el-input(v-model="form.name12" type="textarea" :disabled="disabled")
		span(slot="footer" class="dialog-footer")
			el-button(@click="dialogVisible = false") 取 消
			el-button(type="primary" @click="dialogVisible = false") 确 定
</template>
<script>
export default {
	data () {
		return {
			title: '',
			dialogVisible: false,
			disabled: false,
			form:{
				name: '',
				name11: '是',
				name5: '城市圈',
				name1: '',
				name2: '',
				name3: '',
				name4: '',
				name6: '',
				name7: '',
				name8: '',
				name9: '',
				name10: '',
				name12: '',
			},
			formInline:{
				user: '',
				region: ''
			},
			data:[
				{
					a:'1',
					b:'人群结构属性优化需求',
					c:'华泰中科有限技术公司',
					d:'DH103854FJ005',
					e:'人群结构属性优化需求',
					f:'北京',
					g:'20190801～20200710',
					h:'天',
					i:'人群结构',
					j:'人群结构属性',
					k:'待提交',
					l:'姚国斌',
					m:'2019-05-26 20:20:20',
					n:'狄卫华',
					o:'2019-05-26 20:20:21'
				},
				{
					a:'2',
					b:'职住分布地图页面优化需求',
					c:'聚星网络股份有限公司',
					d:'WF130818UU017',
					e:'职住分布地图页面优化需求',
					f:'北京',
					g:'20190811～20200722',
					h:'小时',
					i:'人群分布',
					j:'职住分布',
					k:'待审核',
					l:'刘明方',
					m:'2019-07-10 09:26:00',
					n:'吴腾飞',
					o:'2019-08-10 09:14:01'
				},
				{
					a:'3',
					b:'出行OD优化需求v3',
					c:'科有道信息技术有限公司',
					d:'OD001053BX105',
					e:'出行OD优化需求v3',
					f:'北京',
					g:'20190823～20200730',
					h:'天',
					i:'人群出行',
					j:'出行OD',
					k:'审核通过',
					l:'李红亮',
					m:'2019-12-10 16:05:45',
					n:'李小竹',
					o:'2019-12-22 19:00:00'
				},
			]
		}
	},
	methods:{
		open (val,data) {
			this.title = val;
			this.dialogVisible = true;
			if(data.length === 0){
				this.disabled = false;
				this.form.name6 = '';
			}else{
				this.disabled = true;
				this.form.name6 = [new Date('2019-08-1'), new Date('2020-07-19')];
			}
			this.form.name1 = data.b;
			this.form.name2 = data.c;
			this.form.name3 = data.d;
			this.form.name4 = data.e;
			this.form.name7 = data.h;
			this.form.name8 = data.i;
			this.form.name9 = data.j;
			this.form.name10 = '无';
			this.form.name12 = '无';
		},
		handleClose(){
			this.dialogVisible = false;
		}
	}
}
</script>
<style lang="scss" scoped>

</style>