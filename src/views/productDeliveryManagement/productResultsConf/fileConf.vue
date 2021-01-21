<template lang="pug">
.app-container
	el-row(:gutter="20")
		el-col(:span="6")
			.title 目录结构
			el-input(placeholder="输入关键字进行过滤" v-model="filterText" clearable)
			el-tree(class="filter-tree" :data="data"
				:props="defaultProps"
				default-expand-all
				:filter-node-method="filterNode"
				ref="tree")
		el-col(:span="17" :offset="1")
			.title 数据文件
			.file-box
				.item(v-for="item in 32")
					.icon
						img(src="./file.svg")
					span fr{{item}}0iy9.com
					.down
						el-button(type="text") 下载
</template>
<script>
export default {
	data () {
		return {
			filterText:'',
			data: [{
					id: 1,
					label: '人群结构分析',
					children: [{
						id: 4,
						label: '众泰信息科技有限公司',
						children: [{
							id: 9,
							label: '10.1.236.128',
						}]
					}]
				}, {
					id: 2,
					label: '人群分布分析',
					children: [{
						id: 5,
						label: '简图股份有限公司',
						children: [{
							id: 12,
							label: '163.1.236.14',
						}]
					}]
				}, {
					id: 3,
					label: '人群出行分析',
					children: [{
						id: 7,
						label: '中清信息有限公司',
						children: [{
							id: 13,
							label: '10.12.204.1',
						}]
					}]
				}, {
					id: 6,
					label: '城市通勤分析',
					children: [{
						id: 8,
						label: '红洞网络有限公司',
						children: [{
							id: 14,
							label: '216.18.236.5',
						}]
					}]
				}, {
					id: 10,
					label: '城市规划定制',
					children: [{
						id: 11,
						label: '向鑫科技有限公司',
						children: [{
							id: 15,
							label: '192.10.6.0',
						}]
					}]
				}],
				defaultProps: {
					children: 'children',
					label: 'label'
				}
		}
	},
	watch: {
		filterText(val) {
			this.$refs.tree.filter(val);
		}
	},

	methods: {
		filterNode(value, data) {
			if (!value) return true;
			return data.label.indexOf(value) !== -1;
		}
	},
}
</script>
<style lang="scss" scoped>
.app-container{
	.el-col{
		min-height: 500px;
		border: 1px solid #eaeaea;
		padding-bottom: 20px;
		.title{
			line-height: 30px;
			margin: 0px -10px;
			margin-bottom: 10px;
			padding-left: 20px;
			background-color: rgba(215, 215, 215, 1);
		}
		.file-box{
			display: flex;
			// align-items: center;
			justify-content: center;
			flex-wrap: wrap;
			user-select: none;
			.item{
				width: 10%;
				height: 80px;
				border-radius: 4px;
				text-align: center;
				cursor: pointer;
				margin: 5px;
				position: relative;
				&:hover .down{
					display: inherit;
				}
				.down{
					display: none;
					top: 0;
					border-radius: 4px;
					line-height: 80px;
					width: 100%;
					position: absolute;
					background-color: #b4bbc5;
				}
			}
		}
	}
}

</style>