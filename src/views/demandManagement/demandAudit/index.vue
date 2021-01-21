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
		el-button(type="warning" icon="el-icon-plus") 批量审核
		div(class="tab")
			span(v-for="(item, index) in tab.data" :class="{'tab-active' : tab.activeIndex === item.val}" @click="chooseTabHandle(item)") {{item.name}}
		el-table(:data="data" style="width: 100%" v-if="tab.activeIndex === 0")
			el-table-column(type="selection" width="55")
			el-table-column(prop="a" label="需求编码")
			el-table-column(prop="b" label="需求名称" width="180")
				template(slot-scope="scope")
					el-button(type="text" @click="open('审核',scope.row,tab.activeIndex)") {{scope.row.b}}
			el-table-column(prop="c" label="客户名称" width="180")
			el-table-column(prop="d" label="合同编号" width="120")
			el-table-column(prop="e" label="合同名称" width="180")
			el-table-column(prop="f" label="区域范围")
			el-table-column(prop="g" label="时间范围" width="180")
			el-table-column(prop="h" label="时间粒度")
			el-table-column(prop="i" label="产品类型")
			el-table-column(prop="j" label="产品模块" width="120")
			el-table-column(prop="k" label="需求状态")
			el-table-column(prop="l" label="创建人")
			el-table-column(prop="m" label="创建时间" width="140")
		el-table(:data="data" style="width: 100%" v-if="tab.activeIndex === 1")
			el-table-column(type="selection" width="55")
			el-table-column(prop="a" label="需求编码")
			el-table-column(prop="b" label="需求名称" width="180")
				template(slot-scope="scope")
					el-button(type="text" @click="open('审核',scope.row,tab.activeIndex)") {{scope.row.b}}
			el-table-column(prop="c" label="客户名称" width="180")
			el-table-column(prop="d" label="合同编号" width="120")
			el-table-column(prop="e" label="合同名称" width="180")
			el-table-column(prop="f" label="区域范围")
			el-table-column(prop="g" label="时间范围" width="180")
			el-table-column(prop="h" label="时间粒度")
			el-table-column(prop="i" label="产品类型")
			el-table-column(prop="j" label="产品模块" width="120")
			el-table-column(prop="k" label="需求状态")
			el-table-column(prop="l" label="创建人")
			el-table-column(prop="m" label="创建时间" width="140")
	el-dialog(:title="title" :visible.sync="dialogVisible" width="50%" :before-close="handleClose")
		el-form(ref="form" :model="form" label-width="80px")
			el-row(:gutter="20")
				el-col(:span="12")
					el-form-item(label="需求名称" prop="name1")
						el-input(v-model="form.name1")
				el-col(:span="12")
					el-form-item(label="客户名称"  prop="name2")
						el-input(v-model="form.name2")
				el-col(:span="12")
					el-form-item(label="合同编号")
						el-input(v-model="form.name3")
				el-col(:span="12")
					el-form-item(label="合同名称")
						el-input(v-model="form.name4")
				el-col(:span="24")
					el-form-item(label="区域范围")
						el-radio-group(v-model="form.name5")
							el-radio(label="城市圈" value="1")
							el-radio(label="地域选择" value="1")
				el-col(:span="24")
					el-form-item(label="时间范围")
						el-date-picker(value-format="yyyy-MM-dd" type="datetimerange" placeholder="选择时间" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" v-model="form.name6" style="width: 60%;")
				el-col(:span="24")
					el-form-item(label="时间粒度")
						el-select(v-model="form.name7" placeholder="请选择时间粒度")
							el-option(label="天" value="1")
							el-option(label="小时" value="2")
				el-col(:span="12")
					el-form-item(label="产品类型")
						el-select(v-model="form.name8" placeholder="产品类型")
							el-option(label="人群结构" value="1")
							el-option(label="人群分布" value="2")
							el-option(label="人群出行" value="3")
							el-option(label="城市通勤" value="4")
				el-col(:span="12")
					el-form-item(label="产品模块")
						el-select(v-model="form.name9" placeholder="产品模块")
							el-option(label="人群结构属性" value="1")
							el-option(label="职住分布" value="2")
							el-option(label="人群网格" value="3")
							el-option(label="职住OD" value="4")
							el-option(label="出行OD" value="5")
							el-option(label="通勤统计" value="6")
							el-option(label="通勤OD" value="7")
				el-col(:span="24")
					el-form-item(label="备注信息")
						el-input(v-model="form.name10" type="textarea")
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
			dialogVisible: false,
			disabled: false,
			formInline:{
				user: '',
				region: ''
			},
			form:{
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
			data:[
				{
					a:'1',
					b:'人群结构属性优化需求',
					c:'华泰中科有限技术公司',
					d:'DH103854FJ005',
					e:'人群结构属性优化需求',
					f:'北京',
					g:'20190804～20200719',
					h:'天',
					i:'人群结构',
					j:'人群结构属性',
					k:'待提交',
					l:'姚国斌',
					m:'2019-09-22 12:50:20',
					n:'狄卫华',
					o:'2019-05-22 16:50:21'
				},
				{
					a:'2',
					b:'职住分布地图页面优化需求',
					c:'聚星网络股份有限公司',
					d:'WF130818UU017',
					e:'职住分布地图页面优化需求',
					f:'北京',
					g:'20190812～20200723',
					h:'小时',
					i:'人群分布',
					j:'职住分布',
					k:'待审核',
					l:'刘明方',
					m:'2019-05-22 10:20:20',
					n:'吴腾飞',
					o:'2019-05-22 13:20:21'
				},
				{
					a:'3',
					b:'出行OD优化需求v3',
					c:'科有道信息技术有限公司',
					d:'OD001053BX105',
					e:'出行OD优化需求v3',
					f:'北京',
					g:'20190822～20200731',
					h:'天',
					i:'人群出行',
					j:'出行OD',
					k:'审核通过',
					l:'李红亮',
					m:'2019-05-22 08:30:20',
					n:'李小竹',
					o:'2019-05-22 09:40:00'
				},
			],
			tabNo: false,
			tabDone: false,
			tab: {
				activeIndex: 0,
				data: [
					{name: '待审核', val: 0},
					{name: '已审核', val: 1},
				]
			}
		}
	},
	methods:{
		handleClose(){
			this.dialogVisible = false;
		},
		noDemand() {
			this.tabNo = true;
			this.tabDone = false;
		},
		doneDemand() {
			this.tabNo = false;
			this.tabDone = true;
		},
		chooseTabHandle(data){
			this.tab.activeIndex = data.val;
		},
		open (val,data,tab) {
			this.title = val;
			this.dialogVisible = true;
			if(tab === 0){
				this.disabled = false;
			}else{
				this.disabled = true;
			}
			this.form.name1 = data.b;
			this.form.name2 = data.c;
			this.form.name3 = data.d;
			this.form.name4 = data.e;
			this.form.name6 = [new Date('2019-08-1'), new Date('2020-07-19')];
			this.form.name7 = data.h;
			this.form.name8 = data.i;
			this.form.name9 = data.j;
			this.form.name10 = '无';
			this.form.name12 = '无';
		},
	}
}
</script>
<style lang="scss" scoped>
.item {
	margin-top: 10px;
	margin-right: 40px;
}
.tab {
	margin: 10px 0;
	span {
		margin: 10px 10px 10px 0;
		cursor: pointer;
	}
}
.tab-active {
	color: #1890ff;
	border-bottom: 1px solid #1890ff;
}
</style>