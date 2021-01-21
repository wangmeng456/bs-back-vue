<template lang="pug">
    //- 城市区域
    .urban-area-manage
        .page-main
            //- 左侧内容
            .page-list
                .area-per(v-loading="leftData.perLoading")
                    .area-text 
                        span 信息完整率
                        span.text-value(class="area-text-span") {{ leftData.postData.data.rate }}% 
                    .area-img
                        .img-mask(:style="{ left: leftData.infoPer + '%' }")
                .house-data
                    .search-input
                        el-input(placeholder="按名称搜索" prefix-icon="el-icon-search" v-model="leftData.listPostData.zoneName"  @keyup.enter.native="geturbanbyname")
                    .area-radio
                        el-radio-group(v-model="leftData.listPostData.perfectType" v-loading="leftData.perLoading")
                            el-radio-button(label="" @click.native="allHandle") 全部 {{ leftData.postData.data.totalCnt }}
                            el-radio-button(label="1" @click.native="doneHandle") 已完善
                                span(class="area-radio-done") {{ leftData.postData.data.perfectCnt }}
                            el-radio-button(label="2" @click.native="noneHandle") 待完善
                                span(class="area-radio-none") {{ leftData.postData.data.imperfectCnt }}
                    .area-tree
                        el-tree(v-loading="leftData.listLoading" :data="leftData.listData" :expand-on-click-node="false" ref="tree" lazy :load="loadNode")
                            span(slot-scope="{ node,data }")
                                span(@click="handleLabel(data)" :class="{ 'tree-active': leftData.isactive === data.zoneId }")
                                    span {{ data.zoneName }}
                                    span ({{ data.zoneTypeName }})
                                    span(v-if="data.perfectFlag==0" class="status1")
                                    span(v-if="data.perfectFlag==1" class="status2")
            //- 右侧内容
            .page-details
                component(:is="currentTabComponent" :zoneId="leftData.isactive" :zoneTypeId="leftData.istype" :isFlag="leftData.isFlag")
</template>

<script>
    // api
    import { UrbanAreaManage } from "@/api/dictSpace/UrbanAreaManage";
    // components
    import Tree from '@/components/Tree'
    import PackageAreaManagement from './profile/packageAreaManagement'
    import GridManagement from './profile/gridManagement'
    import CommunityManagement from './profile/communityManagement'
    import BuildingManagement from './profile/buildingManagement'
    
    export default {
        name: "UrbanAreaManage",
        components: {Tree, PackageAreaManagement, GridManagement, CommunityManagement, BuildingManagement },
        data() {
            return {
                level: undefined,
                // 左侧
                leftData: {
                    // 完善数量和信息完整率
                    postData: {
                        areaId: undefined,
                        data: {}
                    },
                    perLoading: false,
                    // 空间树
                    listPostData: {
                        zoneName: '', // 检索值
                        areaId: undefined, 
                        perfectType: '', // 已完善:1;待完善:2;全部传空;
                    },
                    listLoading: false,
                    listData: [],
                    isactive: null,
                    istype: null,
                    isFlag: undefined,
                    // 空间树子节点
                    childPostData: {
                        zoneName: '', // 检索值
                        areaId: undefined, 
                        perfectType: '', // 已完善:1;待完善:2;全部传空;
                        parentZoneId: '', // 上级空间编码
                        parentZoneTypeId: '' // 上级空间类型编码
                    },
                    childData: []
                },
                currentTabComponent: '',
                // 右侧
                rightData: {
                    arr: [
                        'PackageAreaManagement',
                        'GridManagement',
                        'CommunityManagement',
                        'BuildingManagement'
                    ]
                }
            };
        },
        created() {
            const me = this;
            me.getPageData();
        },
        methods: {
            /**
            * 获取页面基本数据
            */
            getPageData() {
                const me = this;
                me.geturbanbyname();
                me.getUrbanAreaManageIntegrityRate();
            },
            /**
            * 查询完善数量和信息完整率
            */
            getUrbanAreaManageIntegrityRate() {
                const me = this;
                me.leftData.perLoading = true;
                me.leftData.postData.areaId = me.$store.getters.areaId;
                UrbanAreaManage.getUrbanAreaManageIntegrityRate(me.leftData.postData)
                    .then(res => {
                        me.leftData.postData.data = res.data;
                    })
                    .finally(() => {
                        me.leftData.perLoading = false;
                    });
            },
            /**
             * 标签页
             */
            allHandle() {
                const me = this;
                me.leftData.listPostData.perfectType = '';
                me.geturbanbyname();
            },
            doneHandle() {
                const me = this;
                me.leftData.listPostData.perfectType = 1;
                me.geturbanbyname();
            },
            noneHandle() {
                const me = this;
                me.leftData.listPostData.perfectType = 2;
                me.geturbanbyname();
            },
            /**
             * 空间树信息
             */
            geturbanbyname() {
                const me = this;
                me.leftData.listLoading = true;
                me.leftData.listPostData.areaId = me.$store.getters.areaId;
                UrbanAreaManage.geturbanbyname(me.leftData.listPostData)
                    .then(res => {
                        // 初始化操作
                        me.leftData.listData = res.data;
                        // 默认选中第一个
                        me.leftData.isactive = me.leftData.listData[0].zoneId;
                        me.leftData.istype = me.leftData.listData[0].zoneTypeId;
                        me.currentTabComponents();
                        console.log(me.leftData.listData[0].perfectFlag)
                    })
                    .finally(() => {
                        me.leftData.listLoading = false;
                    });
            },
            /**
             * 空间树子节点
             */
            loadNode(node, resolve){
                const me = this;
                if (node.level == 0) {
                    return resolve(me.leftData.listData)
                }
                setTimeout(() => {
                    me.leftData.childPostData.parentZoneId = node.data.zoneId;
                    me.leftData.childPostData.parentZoneTypeId = node.data.zoneTypeId;
                    me.leftData.childPostData.areaId = me.$store.getters.areaId;
                    UrbanAreaManage.getChildZones(me.leftData.childPostData)
                        .then(res => {
                            me.leftData.childData = res.data;
                            const data = me.leftData.childData;
                            if(node.data.zoneTypeId === 1100 || node.parent.data.zoneTypeId === 1100){
                                for(let i=0; i<data.length; i++){
                                    me.$set(data[i],'flag',1)
                                }
                                if(node.data.childZoneCnt != undefined){
                                    return resolve(data)
                                }else{
                                    return resolve([])
                                }
                            }else{
                                if(node.data.childZoneCnt != undefined){
                                    return resolve(data)
                                }else {
                                    return resolve([])
                                }
                            }
                        })
                    },500)
            },
            /**
             * 点击加载右侧
             */
            handleLabel(data) {
                const me = this;
                me.leftData.isactive = data.zoneId;
                me.leftData.istype = data.zoneTypeId;
                me.leftData.isFlag = data.flag;
                me.currentTabComponents()
            },
            currentTabComponents(){
                const me = this;
                    if(String(me.leftData.istype).substring(0,1) === '1'){
                        me.currentTabComponent = me.rightData.arr[0]
                    } else if(String(me.leftData.istype).substring(0,1) === '2' && me.leftData.isFlag !== 1){
                        me.currentTabComponent = me.rightData.arr[1]
                    } else if(String(me.leftData.istype).substring(0,1) === '3' || (String(me.leftData.istype).substring(0,1) === '2' && me.leftData.isFlag === 1)){
                        me.currentTabComponent = me.rightData.arr[2]
                    } else if(String(me.leftData.istype).substring(0,1) === '4'){
                        me.currentTabComponent = me.rightData.arr[3]
                    }
            }
        }
    };
</script>

<style lang="stylus">
    @import '~@/assets/styles/mixin.styl'
    layout-block()
        box-shadow 0 0 0 1px rgba(218, 226, 237, 1) inset
        border-radius 3px
        background-color #fff
    .urban-area-manage
        .page-main
            width $min-width
            margin 15px auto
            display flex
            justify-content space-between
            min-height 400px
            // 左侧
            .page-list
                width (308 / 1162 * 100)%
                .area-per
                    layout-block()
                    margin 0 0 12px 0
                    padding 25px 20px
                    .area-text
                        display flex
                        justify-content space-between
                        line-height 30px
                        font-size 18px
                        font-weight 600
                        .area-text-span
                            color #3E82FE
                    .area-img
                        height 23px
                        margin 10px 0
                        background url('~@/assets/image/dictSpace/buildingInfoManage/info-img.png') left center
                        background-size cover
                        position relative
                        overflow hidden
                        .img-mask
                            position absolute
                            width 100%
                            height 100%
                            background-color rgba(255, 255, 255, 0.5)
            .house-data
                layout-block()
                padding 10px
                min-height 400px
                .search-input
                    padding 10px 8px

                .area-radio
                    padding 0 8px
                    margin 10px 0
                    radio()
                        padding 0 4px
                        margin 0 4px
                        border-radius 10px
                        color #ffffff
                    .area-radio-done
                        background #2EBD41
                        radio()
                    .area-radio-none
                        background #BF0152
                        radio()

                .area-tree
                    padding 8px
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
                        padding 2px 10px 2px 0
                    .el-tree-node__content:hover
                        background #ffffff
                    .el-tree-node:focus>.el-tree-node__content
                        background #ffffff
                    .el-tree .el-tree-node__expand-icon.expanded
                        -webkit-transform: rotate(0deg)
                        transform: rotate(0deg);
                    .el-tree .el-tree-node__expand-icon .el-icon-caret-right:before
                        background url("~@/assets/image/dictSpace/UrbanAreaManage/icon-marshalling.png") no-repeat 0 2px
                        icon()
                    .el-tree .el-tree-node__expand-icon .el-icon-caret-right:before
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
            // 右侧
            .page-details-data-none
                flex 1
                layout-block()
                    margin 0 0 0 12px
                    text-align center
                    line-height 300px
                    font-size 18px
            .page-details
                flex 1
                layout-block()
                margin 0 0 0 12px
                position relative
</style>