<template lang="pug">
.technica-maintain
	el-dialog(title="客户经理查询" :visible.sync="manageDialog" width="800px")
		el-row(:gutter="20")
			el-col(:span="8")
				el-form(ref="technicaMaintainForm" :model="form" label-width="20px")
					el-form-item(label="" prop="searchKey")
						el-input(style="width:90%" v-model="form.searchKey" placeholder="请输入搜索关键字" @input="searchKeyChange" clearable)
							i(slot="prefix" class="el-input__icon el-icon-search")
					el-form-item(label="")
						el-select(style="width:90%" v-model="form.searchType" @change="searchTypeChange")
							el-option(v-for="searchType in searchTypeOptions" :key="searchType.value" :label="searchType.label" :value="searchType.value")
			el-col(:span="16")
				el-table(:data="data" width="100%" v-loading="manageLoading")
					el-table-column(width="30")
						template(slot-scope="scope")
							el-radio(v-model="form.manageInfo" :label="scope.row") {{ '-' }}
					el-table-column( prop="managerCode" label="员工标识")
					el-table-column( prop="managerId" label="员工工号")
					el-table-column( prop="managerName" label="经理名称")
					el-table-column( prop="managerAreaName" label="所属区域")
				pagination(
					v-show="form.total > 0"
					:total="form.total" 
					:pagerCounts="form.pagerCount"
					:page.sync="form.pageNum" 
					:layout="'total, prev, pager, next'"
					:limit.sync="form.pageSize" 
					@pagination="getManagePagination")
		div(slot="footer" class="dialog-footer")
			el-button(type="primary" @click="submitTechnicaForm") 保存
			el-button(@click="manageDialog = false") 取消
</template>
<script>
// api
import { customerSpaceManage } from "@/api/dictSpace/customerSpaceManage";
export default {
	data () {
		return {
			manageLoading: false,
			manageDialog: false,
			form:{
				searchKey: '',
				searchType: '1',
				manageInfo: '',
				total: 0,
				pageNum: 1,
				pageSize: 5,
				pagerCount: 5,
			},
			data:[],
			searchTypeOptions: [
				{
          value: '1',
          label: '员工工号'
        }, {
          value: '2',
          label: '员工姓名'
        }
			]
		}
	},
	created(){},
	methods:{
		// 打开弹出框
		openManageDialog () {
			// 初始化数据
			this.form = {
				searchKey: '',
				searchType: '1',
				manageInfo: '',
				total: 0,
				pageNum: 1,
				pageSize: 5,
				pagerCount: 5,
			},
			this.data = [];
			this.manageDialog = true;
		},
		// 提交数据
		submitTechnicaForm () {
			if(this.form.manageInfo == ""){
				this.$message.warning("请选择客户经理！");
				return;
			}
			this.manageDialog = false;
			this.$emit("manageData", this.form.manageInfo);
		},
		// 分页
		getManagePagination ({page: pageNum, limit: pageSize}) {
			// 调用接口
			this.getManager({
				pageNum,
				pageSize,
				searchType: this.form.searchType,
				searchKey: this.form.searchKey,
			});
		},
		// 关键字
		searchKeyChange(val){
			this.form.pageNum = 1;
			this.form.manageInfo = "";
			this.getManager({
				pageNum: this.form.pageNum,
				pageSize: this.form.pageSize,
				searchType: this.form.searchType,
				searchKey: val,
			});
		},
		// 类型
		searchTypeChange(val){
			this.form.pageNum = 1;
			this.form.manageInfo = "";
			this.getManager({
				pageNum: this.form.pageNum,
				pageSize: this.form.pageSize,
				searchType: val,
				searchKey: this.form.searchKey,
			});
		},
		getManager (params) {
			this.manageLoading = true;
			customerSpaceManage.getManager(params)
			.then(res =>{
				if (res.code == 200) {
					this.form.total = res.total;
					this.data = res.rows;
				}
			})
			.finally(()=> this.manageLoading = false)
		}
	}
}
</script>
<style lang="scss" scoped>

</style>