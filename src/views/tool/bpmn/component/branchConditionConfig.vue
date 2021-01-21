<template lang="pug">
.branchCondition
	el-dialog(title="分支条件配置" :visible.sync="dialogVisible" width="40%" :before-close="handleClose")
		div
			
		span(slot="footer" class="dialog-footer")
			el-button(@click="dialogVisible = false") 取 消
			el-button(type="primary" @click="dialogVisible = false") 确 定
</template>
<script>
export default {
	data () {
		return {
			dialogVisible: false,
		}
	},
	created () {},
	mounted () {},
	methods: {
		openBranchCondition () {
			this.dialogVisible = true;
		},
		handleClose () {
			this.dialogVisible = false;
		}
	}
}
</script>
<style lang="scss">
.branchCondition{
	.el-dialog{
		.el-dialog__header{
			padding: 10px;
		}
		.el-dialog__body{
			padding: 5px 10px;
		}
	}
}
</style>