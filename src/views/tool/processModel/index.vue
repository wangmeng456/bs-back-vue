<template lang="pug">
.app-container
	.formBox
		el-form(:inline="true" :model="formInline")
			el-form-item(label="流程标识")
				el-input(v-model="formInline.key" placeholder="流程标识" clearable)
			el-form-item(label="流程名称")
				el-input(v-model="formInline.name" placeholder="流程名称" clearable)
			el-form-item
				el-button(type="primary") 查询
			el-form-item
				el-button(type="warning") 重置
	.bodyBox
		.btnBox
			el-button(type="primary" icon="el-icon-plus" @click="createModel") 创建新模型
		.tableBox(v-loading="modelListLoading")
			el-table( :data="tableData" style="width: 100%" )
				el-table-column(prop="key" label="流程标识")
				el-table-column(prop="name" label="流程名称")
				el-table-column(prop="version" label="版本" width="100")
				el-table-column(prop="createTime" label="创建时间")
					template(slot-scope="scope") {{ transformDateFormat(scope.row.createTime) }}
				//- el-table-column(prop="lastUpdateTime" label="最后更新时间" width="135")
				//- 	template(slot-scope="scope") {{ transformDateFormat(scope.row.lastUpdateTime) }}
				el-table-column(label="操作" width="280")
					template(slot-scope="scope")
						el-button(size="mini" type="primary" @click="handleEdit(scope.row)") 设计
						el-button(size="mini" type="info") 查看
						el-button(size="mini" type="success") 部属
						el-button(size="mini" type="danger" @click="delProcessModel(scope.row.id)") 删除
	el-dialog(title="新增模型" :visible.sync="modelVisible" width="30%" :before-close="handleModelClose")
		el-form(:model="modelForm" :rules="rules" ref="ruleForm" label-width="80px")
			el-row
				el-col(:span="24")
					el-form-item(label="标识" prop="key")
						el-input(v-model="modelForm.key" clearable)
					el-form-item(label="名称" prop="name")
						el-input(v-model="modelForm.name" clearable)
					el-form-item(label="类别" prop="category")
						el-select(v-model="modelForm.category")
							el-option(label="类别1" value="1")
							el-option(label="类别2" value="2")
							el-option(label="类别3" value="3")
							el-option(label="类别4" value="4")
					el-form-item(label="描述" prop="descp")
						el-input(type="textarea" placeholder="请输入描述内容" 
							v-model="modelForm.descp" 
							maxlength="30" resize="none"
							show-word-limit)
		.dialog-footer(slot="footer")
			el-button(@click="handleModelClose") 取消
			el-button(type="primary" @click="confirmAddData") 确认
</template>
<script>
import { processModel } from '@/api/system/config'
export default {
	data () {
		return {
			// 新增模型弹框
			modelVisible: false,
			// 模型列表加载
			modelListLoading: false,
			
			formInline: {
				name: '',
				key: '',
				total: 0,
			},
			modelForm:{
				key: '',
				name: '',
				category: '',
				descp: '',
			},
			tableData: [],
			rules: {
				key: [
					{ required: true, message: '请输入标识', trigger: 'blur' },
					{ min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
				],
				name: [
					{ required: true, message: '请输入名称', trigger: 'blur' },
					{ min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
				],
				category: [
					{ required: true, message: '请选择类别', trigger: 'blur,change' },
				],
			}
		}
	},
	mounted () {},
	created () {
		this.getProcessModelList();
	},
	methods: {
		createModel () {
			this.modelVisible= true;
		},
		handleModelClose () {
			this.modelVisible= false;
			this.resetModelData();
		},

		// 添加流程模型
		confirmAddData () {
			this.$refs['ruleForm'].validate((valid) => {
				if (valid) {
					// 保存流程模型
					this.addProcessModel();
				}
			});
		},
		delProcessModel ( id ) {
			const $this = this;
			this.$confirm('确认删除该流程模型?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
			.then(() => {$this.deleteProcessModel( id )})
			.catch(() => {})
		},

		/**
		 * 编辑流程
		 */
		handleEdit ( row ) {
			const $this = this;
			let params = {};
			processModel.getXml( row.id )
			.then( res => {
				if( res.code == 200 ){
					params = { ...res.data };
					$this.$router.push({
						name: 'bpmn',
						params
					})
				}
			})
			.catch( err => {console.log(err)})
			.finally( () => {})
		},

		// 新增模型弹框数据重置
		resetModelData () {
			// 重置表单数据
			this.$refs['ruleForm'].resetFields();
			// 重新加载列表数据
			this.getProcessModelList();
		},

		// 查询数据列表
		getProcessModelList () {
			this.modelListLoading = true;
			processModel.getProcessModelList()
			.then( res =>{
				if ( res.code == 200) {
					this.tableData = res.rows;
					this.formInline.total = res.total;
					this.modelListLoading = false;
				}
			})
			.finally( () => this.modelListLoading = false)
		},

		// 新增数据模型
		addProcessModel () {
			processModel.addProcessModel(this.modelForm)
			.then( res => {
				if ( res.code == 200) {
					// 关闭弹框
					this.modelVisible= false;
					this.$message.success(res.msg);
					// 模型弹框数据重置
					this.resetModelData();
				}else this.$message.error("流程模型新增失败！");
			})
		},

		/**
		 * 删除流程模型
		 * @param { String } modelId 模型ID
		 */
		deleteProcessModel ( modelId ) {
			processModel.deleteProcessModel( modelId )
			.then( res => {
				if ( res.code == 200 ) {
					// 提示删除信息
					// 重新加载列表数据
					this.$message.success(res.msg);
					this.getProcessModelList();
				}else this.$message.error("流程模型删除失败！");
				console.log(res);
			})
		},
	}
}
</script>
<style lang="scss" scoped>
.app-container{
	.formBox{

	}
	.bodyBox{
		.btnBox{
			padding-bottom: 10px;
		}
	}
}
</style>