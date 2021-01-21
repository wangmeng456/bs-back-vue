<template lang="pug">
    el-tree(:data="data" node-key="id" :props="defaultProps")
        span(@click="handleLabel(data)" slot-scope="{ node,data }" :class="{ 'tree-active': isactive === data.id }")
            span {{ node.label }}
            span {{ data.type }}
            span(v-if="data.status==1" class="status1")
            span(v-if="data.status==0" class="status2")
</template>

<script>
export default {
    data() {
        return {
            // 树 数据
            treeList: [],
            isactive: 1,
            data: [
                {
                    flag: 1,
                    id: 1,
                    label: "世纪花园包区",
                    type: "(混合包区)",
                    status: 1,
                    children: [
                        {
                            flag: 2,
                            id: 2,
                            label: "世纪花园网格",
                            type: "(城市网格)",
                            status: 0,
                            children: [
                            {
                                flag: 3,
                                id: 3,
                                label: "世纪花园小区",
                                type: "(成型小区)",
                                status: 0,
                                children: [
                                {
                                    flag: 4,
                                    id: 4,
                                    status: 1,
                                    label: "1号楼",
                                    type: "",
                                },
                                {
                                    flag: 4,
                                    id: 5,
                                    status: 0,
                                    label: "2号楼",
                                    type: "",
                                }
                                ]
                            },
                            {
                                flag: 3,
                                id: 6,
                                label: "世纪果园小区",
                                type: "(非成型小区)",
                                status: 0,
                                children: [
                                {
                                    flag: 4,
                                    id: 4,
                                    status: 1,
                                    label: "东庄住宅楼",
                                    type: "",
                                },
                                {
                                    flag: 4,
                                    id: 7,
                                    status: 0,
                                    label: "西青住宅楼",
                                    type: "",
                                }
                                ]
                            }
                            ]
                        }
                    ]
                },
                {
                    flag: 1,
                    id: 8,
                    label: "世纪果园包区",
                    type: "(公众包区)",
                    status: 1,
                    children: [
                        {
                            flag: 2,
                            id: 9,
                            label: "园洲网格",
                            type: "(城市网格)",
                            status: 0,
                            children: [
                            {
                                flag: 3,
                                id: 10,
                                label: "世纪花园小区",
                                type: "(成型小区)",
                                status: 0,
                                children: [
                                {
                                    flag: 4,
                                    id: 11,
                                    status: 1,
                                    label: "1号楼",
                                    type: "",
                                },
                                {
                                    flag: 4,
                                    id: 12,
                                    status: 0,
                                    label: "2号楼",
                                    type: "",
                                }
                                ]
                            }
                            ]
                        }
                    ]
                },
                {
                    flag: 1,
                    id: 13,
                    label: "奥体万达包区包区",
                    type: "(商客包区)",
                    status: 1,
                    children: [
                        {
                            flag: 2,
                            id: 14,
                            label: "大红门网格",
                            type: "(沿街商铺)",
                            status: 0,
                        }
                    ]
                },
            ],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    },
    created() {
        const me = this;
        // me.treeList();
    },
    methods: {
        handleLabel(data) {
            this.isactive = data.id;
            this.$emit('children-tree', data);
            event.stopPropagation()
        },
        // treeList() {
        //     console.log(this.treeData);
        // }
    }
}
</script>

<style lang="stylus">
    icon()
        content ''
        display block
        width 18px 
        height 18px  
        font-size 16px 
        background-size 16px
    status()
        width 8px
        height 8px
        border-radius 8px
        display block
        float right
        margin 7px
    .tree-active
        color #4687FE
        background-color #EBF2FE !important
    .el-tree-node__content:hover
        background #ffffff
    .el-tree-node:focus>.el-tree-node__content
        background #ffffff
    .el-tree .el-tree-node__expand-icon.expanded
        -webkit-transform: rotate(0deg)
        transform: rotate(0deg);
    .el-tree .el-icon-caret-right:before
        background url("~@/assets/image/dictSpace/UrbanAreaManage/icon-marshalling.png") no-repeat 0 2px
        icon()
    .el-tree .el-tree-node__expand-icon.expanded.el-icon-caret-right:before
        background url("~@/assets/image/dictSpace/UrbanAreaManage/icon-marshalling1.png") no-repeat 0 2px
        icon()
    .el-tree-node__expand-icon.is-leaf::before 
        display none
    .status1
        background red
        status()
    .status2
        background greenyellow
        status()
</style>