<template lang="pug">
    .page-box-two
        .page-top
            .house-details
                .base-info
                    .base-info-left(v-loading="baseLoading") {{houseMainLeft.data.zoneName}}
                    .base-info-right(@click="getcompanyhistory")
                        img(src="~@/assets/image/dictSpace/buildingInfoManage/icon-history.png")
                        a(class="base-info-right-span") 更新历史
                .base-foot(v-loading="cntLoading")
                    .base-foot-item(v-if="baseFoot.zoneTypeId === 1200 || baseFoot.zoneTypeId === 1000 || baseFoot.zoneTypeId === 1100")
                        .base-foot-top
                            img(src="~@/assets/image/dictSpace/UrbanAreaManage/icon-grid.png")
                            .base-foot-details
                                span(class="base-foot-num") {{baseFoot.data.gridCnt}}
                                br
                                span(class="base-foot-font") 网格数量
                    .base-foot-item(v-if="baseFoot.zoneTypeId === 1200 || baseFoot.zoneTypeId === 1000 || baseFoot.zoneTypeId === 2000  || baseFoot.zoneTypeId === 2100")
                        .base-foot-top
                            img(src="~@/assets/image/dictSpace/UrbanAreaManage/icon-residentialQuarters.png")
                            .base-foot-details
                                span(class="base-foot-num") {{baseFoot.data.communityCnt}}
                                br
                                span(class="base-foot-font") 小区数量
                    .base-foot-item
                        .base-foot-top
                            img(src="~@/assets/image/dictSpace/UrbanAreaManage/icon-building.png")
                            .base-foot-details
                                span(class="base-foot-num") {{baseFoot.data.buildingCnt}}
                                br
                                span(class="base-foot-font") 楼宇数量

            .house-main
                .house-main-left(v-loading="baseLoading")
                    span(class="house-main-left-header") 基本信息
                    el-button(round @click="areaEdit") 编辑
                    .house-main-left-details
                        .house-main-left-list
                            .introduce
                                nobr 网格类型:
                            span {{houseMainLeft.data.zoneTypeName}}
                        .house-main-left-list
                            .introduce
                                nobr 网格地址:
                            span {{houseMainLeft.data.address}}
                        .house-main-left-list
                            .introduce
                                nobr 上级经营单元:
                            span {{houseMainLeft.data.upUnit}}
                .house-main-center(v-loading="baseLoading")
                    span(class="house-main-left-header") 市场空间信息
                    span(v-if="houseMainCenter.data.status === '1'" class="house-main-left-status") 审批中
                    el-button(round @click="areaDeclare") 申报
                    .house-main-left-details
                        .house-main-left-list
                            .introduce 房屋套数:
                            span {{houseMainCenter.data.roomCnt}}
                        .house-main-left-list(v-if="zoneTypeId === 1200 || zoneTypeId === 1000 || zoneTypeId === 2000 || zoneTypeId === 2100 || zoneTypeId === 3000 || zoneTypeId === 3100 || zoneTypeId === 4000")
                            .introduce 户口数:
                            span {{houseMainCenter.data.famCnt}}
                        .house-main-left-list(v-if="zoneTypeId === 1200 || zoneTypeId === 1000 || zoneTypeId === 2000 || zoneTypeId === 2100 || zoneTypeId === 3000 || zoneTypeId === 3100 || zoneTypeId === 4000")
                            .introduce 人口数:
                            span {{houseMainCenter.data.peoCnt}}
                        .house-main-left-list(v-if="zoneTypeId === 1100 || isFlag === 1")
                            .introduce 商户数:
                            span {{houseMainCenter.data.busiCnt}}
                .house-main-right(v-loading="baseLoading")
                    span(class="house-main-left-header") 本网业务信息
                    .house-main-left-details
                        .house-main-left-list
                            .introduce 本网客户数:
                            span {{houseMainRight.data.netCustCnt}}
                        .house-main-left-list
                            .introduce 本网房间数:
                            span {{houseMainRight.data.netRoomCnt}}
                        .house-main-left-list(v-if="zoneTypeId === 1200 || zoneTypeId === 1100")
                            .introduce 本网商户数:
                            span {{houseMainRight.data.netBusiCnt}}
                        .house-main-left-list
                            .introduce 总渗透率:
                            span {{houseMainRight.data.rate}}%
        .page-table
            //- tab 顶部菜单
            .tab-menu
                .menu-item(v-for="(item,index) in tabData.tabMenuListData" :key="index" :class="{ 'menu-item-active': tabData.activeIndex === item.data }" @click="tabSwitchhandle(item.data)") {{ item.name }}
            .tab-details
                //- 小区列表
                .tab-content(v-if="tabData.activeIndex === 0")
                    .tab-top
                        .tab-add
                            el-button(type="primary" icon="el-icon-plus" @click="addGrid") 添加小区
                    .tab-bottom
                        .tab-table
                            el-table(v-loading="tableLoading" :data="tableData.data.rows" max-height="390px")
                                el-table-column(prop="zoneName" label="小区名称")
                                el-table-column(prop="zoneTypeName" label="小区类型")
                                el-table-column(prop="roomCnt" label="房屋套数")
                                el-table-column(prop="famCnt" label="住户数" v-if="zoneTypeId === 1200 || zoneTypeId === 1000 || zoneTypeId === 2000 || zoneTypeId === 2100 || zoneTypeId === 3000 || zoneTypeId === 3100 || zoneTypeId === 4000")
                                el-table-column(prop="peoCnt" label="人口数" v-if="zoneTypeId === 1200 || zoneTypeId === 1000 || zoneTypeId === 2000 || zoneTypeId === 2100 || zoneTypeId === 3000 || zoneTypeId === 3100 || zoneTypeId === 4000")
                                el-table-column(prop="busiCnt" label="商户数" v-if="zoneTypeId === 1100 || isFlag === 1")
                                el-table-column(prop="address" label="地址")
                        .tab-pagination(v-if="tableData.data.total > 0")
                            el-pagination(:total="tableData.data.total" layout="prev, pager, next, total, jumper" :page.sync="tableData.postData.pageNum" :limit.sync="tableData.postData.pageSize" @pagination="getChildList")
                //- 统计分析
                .tab-content(v-else-if="tabData.activeIndex === 1")
                    .tab-bottom
                        el-row(:gutter="20")
                            el-col(:span="12")
                                el-card(shadow="always")
                                    span(class="tab-card-header") 各业务计费到达情况
                                    el-date-picker(v-model="topleftTimeValue" type="month" placeholder="选择月" value-format="yyyy-MM" format="yyyy-MM" @change="selectTimeOne(topleftTimeValue)")
                                    .tab-card-main
                                    EchartsBar(:zoneId="zoneId" :zoneTypeId="zoneTypeId" :monthId="topleftLastTimeValue")
                            el-col(:span="12")
                                el-card(shadow="always")
                                    span(class="tab-card-header") 各业务发展情况
                                    EchartsPile(:zoneId="zoneId" :zoneTypeId="zoneTypeId")
                        el-row(:gutter="20")
                            el-col(:span="12")
                                el-card(shadow="always")
                                    span(class="tab-card-header") 各业务收入占比
                                    el-date-picker(v-model="bottomleftTimeValue" type="month" placeholder="选择月" value-format="yyyy-MM" format="yyyy-MM" @change="selectTimeTwo(bottomleftTimeValue)")
                                    EchartsPie(:zoneId="zoneId" :zoneTypeId="zoneTypeId" :monthId="bottomleftLastTimeValue")
                            el-col(:span="12")
                                el-card(shadow="always")
                                    span(class="tab-card-header") 光端口使用情况
                                    el-date-picker(v-model="bottomrightTimeValue" type="month" placeholder="选择月" value-format="yyyy-MM" format="yyyy-MM" @change="selectTimeThree(bottomrightTimeValue)")
                                    EchartsWaterWaveBall(:zoneId="zoneId" :zoneTypeId="zoneTypeId" :monthId="bottomrightLastTimeValue")
        //- 编辑基本信息
        el-dialog(title="编辑基本信息" :visible.sync="dialogData.dialogAreaEdit" @close='closeAreaDialog')
            .dialog-header
                span 提交人：{{houseMainLeft.data.deptName}}-{{houseMainLeft.data.staffName}}（{{houseMainLeft.data.staffId}}）
                span(v-if="houseMainLeft.data.status === '1'" class="status") 审批中
            .dialog-main
                el-form(label-position="labelPosition" label-width="100px" :model="dialogData.houseMainLeft" :rules="rules.edit" ref="postData")
                    el-form-item(label="网格名称" prop="zoneName")
                        el-input(v-model="dialogData.houseMainLeft.data.zoneName" placeholder="请输入内容")
                    el-form-item(label="网格类型:")
                        span {{houseMainLeft.data.zoneTypeName}}
                    el-form-item(label="网格地址:")
                        span {{houseMainLeft.data.address}}
                    el-form-item(label="上级经营单元:")
                        span {{houseMainLeft.data.upUnit}}
            .dialog-footer(slot="footer" v-if="houseMainLeft.data.status === '0'")
                el-button(class="dialog-footer-btnone" :disabled="true") 拿 回
                el-button(class="dialog-footer-btntwo" @click="updateBaseInfo") 保 存
            .dialog-footer(slot="footer" v-else-if="houseMainLeft.data.status === '1'")
                el-button(class="dialog-footer-btntwo" @click="updateBaseInfoReset") 拿 回
                el-button(class="dialog-footer-btnone" :disabled="true") 保 存
        //- 市场空间申报
        el-dialog(title="市场空间申报" :visible.sync="dialogData.dialogAreaDeclare" @close="closeDeclareDialog")
            .dialog-header
                span(v-if="houseMainCenter.data.status === '1'") 提交人：{{houseMainCenter.data.deptName}}-{{houseMainCenter.data.staffName}}（{{houseMainCenter.data.staffId}}）
                span(v-if="houseMainCenter.data.status === '1'" class="status") 审批中
            .dialog-main
                el-form(label-position="labelPosition" label-width="100px" :model="dialogData.houseMainCenter.data" :rules="rules.declare" ref="postData")
                    el-form-item(label="房屋套数" prop="roomCnt")
                        el-input(v-model="dialogData.houseMainCenter.data.roomCnt" placeholder="请输入房屋套数")
                    el-form-item(label="住户数" prop="famCnt" v-if="zoneTypeId === 1200 || zoneTypeId === 1000 || zoneTypeId === 2000 || zoneTypeId === 2100 || zoneTypeId === 3000 || zoneTypeId === 3100 || zoneTypeId === 4000")
                        el-input(v-model="dialogData.houseMainCenter.data.famCnt" placeholder="请输入住户数")
                    el-form-item(label="人口数" prop="peoCnt" v-if="zoneTypeId === 1200 || zoneTypeId === 1000 || zoneTypeId === 2000 || zoneTypeId === 2100 || zoneTypeId === 3000 || zoneTypeId === 3100 || zoneTypeId === 4000")
                        el-input(v-model="dialogData.houseMainCenter.data.peoCnt" placeholder="请输入人口数")
                    el-form-item(label="商户数" prop="busiCnt" v-if="zoneTypeId === 1100 || isFlag === 1")
                        el-input(v-model="dialogData.houseMainCenter.data.busiCnt" placeholder="请输入商户数")
            .dialog-footer(slot="footer" v-if="houseMainCenter.data.status === '1'")
                el-button(class="dialog-footer-btntwo" @click="updateMarketInfoReset") 拿 回
                el-button(class="dialog-footer-btnone" :disabled="true") 保 存
            .dialog-footer(slot="footer" v-if="houseMainCenter.data.status === '0'")
                el-button(class="dialog-footer-btnone" :disabled="true") 拿 回
                el-button(class="dialog-footer-btntwo" @click="updateMarketInfo") 保 存
        //- 更新历史列表
        .update-history(v-if="dialogData.updateHistory.switch")
            .history-title
                h3 更新历史 #[span.color-red ({{ dialogData.updateHistory.data.length }})]
                .close-button(@click="cancelUpdateHistory")
                    i.el-icon-close
            .history-content
                .house-title {{ houseMainLeft.data.zoneName }}
                ul.history-list
                    li.list-item(v-for="(item,index) in dialogData.updateHistory.data" :key="index")
                        .item-title #[span.item-user {{ item.operateStaff }}] {{ item.operateDate }}
                        .item-details(v-html="item.operateDesc")
                .list-data-none(v-if="dialogData.updateHistory.data.length === 0") 暂无数据
        //- 添加小区
        el-dialog(title="添加小区" :visible.sync="dialogData.addGrid.dialogAreaGrid" @close="closeGridDialog")
            .dialog-main
                el-form(label-position="labelPosition" label-width="100px" :model="dialogData.addGrid" :rules="rules.grid" ref="postData")
                    el-form-item(label="小区名称:" prop="gridName")
                        el-input(v-model="dialogData.addGrid.gridName" placeholder="请输入内容")
                    el-form-item(label="小区类型:")
                        el-select(v-model="dialogData.addGrid.gridType" placeholder="请选择网格类型" @change="zoneTypeHandle")
                            el-option(v-for="(item,index) in dialogData.addGrid.data" :key="index" :label="item.zoneTypeName" :value="item.zoneTypeId")
                    el-form-item(label="小区地址:" prop="gridHouse")
                        el-input(v-model="dialogData.addGrid.gridHouse" placeholder="请输入内容")
                    el-form-item(label="上级经营单元:")
                        span {{houseMainLeft.data.zoneName}}
            .dialog-footer(slot="footer")
                el-button(class="dialog-footer-btntwo" @click="preservationAddGrid") 保 存
</template>

<script>
    // api
    import { UrbanAreaManage } from "@/api/dictSpace/UrbanAreaManage";

    import EchartsBar from '@/components/Echarts/UrbanAreaManage/EchartsBar'
    import EchartsPie from '@/components/Echarts/UrbanAreaManage/EchartsPie'
    import EchartsPile from '@/components/Echarts/UrbanAreaManage/EchartsPile'
    import EchartsWaterWaveBall from '@/components/Echarts/UrbanAreaManage/EchartsWaterWaveBall'
    export default {
        name: "PackageAreaManagement",
        components: { EchartsBar, EchartsPie, EchartsPile, EchartsWaterWaveBall },
        props: [
            'zoneId',
            'zoneTypeId',
            'isFlag'
        ],
        data() {
            return {
                // 包区或网格下所有子节点数量
                cntLoading: false,
                baseFoot: {
                    zoneId: null,
                    zoneTypeId: null,
                    data: {}
                },
                // 基本信息
                baseLoading: false,
                houseMainLeft: {
                    zoneId: null,
                    zoneTypeId: null,
                    data: {}
                },
                // 市场空间信息
                houseMainCenter: {
                    zoneId: null,
                    zoneTypeId: null,
                    data: {}
                },
                // 本网业务信息
                houseMainRight: {
                    zoneId: null,
                    zoneTypeId: null,
                    data: {}
                },
                // 标签页切换
                tabData: {
                    // 标题切换索引
                    activeIndex: 0,
                    tabMenuListData: [
                        {name: "小区列表", data: 0},
                        {name: "统计分析", data: 1}
                    ],
                },
                // 下级列表
                tableLoading: false,
                tableData: {
                    postData:{
                        zoneId: null,
                        zoneTypeId: null,
                        pageNum: 1,
                        pageSize: 10,
                    },
                    data: {}
                },
                // 统计分析
                topleftTimeValue: null,
                topleftLastTimeValue: null,
                bottomleftTimeValue: null,
                bottomleftLastTimeValue: null,
                bottomrightTimeValue: null,
                bottomrightLastTimeValue: null,
                // 弹框部分
                dialogData: {
                    // 编辑
                    dialogAreaEdit: false,
                    updateBaseInfo: {
                        zoneName: null,
                        zoneId: null,
                        zoneTypeId: null
                    },
                    updateBaseInfoReset: {
                        zoneId: null,
                        zoneTypeId: null
                    },
                    houseMainLeft: {
                        data: {
                            zoneName: null
                        }
                    },
                    // 申报
                    dialogAreaDeclare: false,
                    updateMarketInfo: {
                        zoneId: null,
                        zoneTypeId: null,
                        roomCnt: undefined,
                        famCnt: undefined,
                        peoCnt: undefined,
                        busiCnt: undefined
                    },
                    updateMarketInfoReset: {
                        zoneId: null,
                        zoneTypeId: null,
                    },
                    houseMainCenter: {
                        data: {
                            roomCnt: undefined,
                            famCnt: undefined,
                            peoCnt: undefined,
                            busiCnt: undefined
                        }
                    },
                    // 更新历史列表
                    updateHistory: {
                        switch: false,
                        data: []
                    },
                    // 添加小区
                    addGrid: {
                        dialogAreaGrid: false,
                        gridName: '',
                        gridHouse: '',
                        gridType: '',
                        data: [],
                        postData: {
                            zoneName: '',
                            zoneTypeId: undefined,
                            zoneAddress: '',
                            parentZoneId: undefined,
                            upUnit: ''
                        }
                    },
                },
                // 表单规则验证
                rules: {
                    edit: {
                        zoneName: [
                            { required: true, message: '请输入网格名称', trigger: 'blur' }
                        ],
                    },
                    declare: {
                        roomCnt: [
                            { required: true, message: '请输入房屋套数', trigger: 'blur' }
                        ],
                        famCnt: [
                            { required: true, message: '请输入住户数', trigger: 'blur' }
                        ],
                        peoCnt: [
                            { required: true, message: '请输入人口数', trigger: 'blur' }
                        ],
                        busiCnt: [
                            { required: true, message: '请输入商户数', trigger: 'blur' }
                        ],
                    },
                    grid: {
                        gridName: [
                            { required: true, message: '请输入小区名称', trigger: 'blur' }
                        ],
                        gridHouse: [
                            { required: true, message: '请输入小区地址', trigger: 'blur' }
                        ],
                    }
                }
            }
        },
        watch: {
            zoneId(val) {
                const me = this;
                me.baseFoot.zoneId = val;
                me.houseMainLeft.zoneId = val;
                me.houseMainCenter.zoneId = val;
                me.houseMainRight.zoneId = val;
                me.tableData.postData.zoneId = val;
                me.getPageData();
            },
            zoneTypeId(val) {
                const me = this;
                me.baseFoot.zoneTypeId = val;
                me.houseMainLeft.zoneTypeId = val;
                me.houseMainCenter.zoneTypeId = val;
                me.houseMainRight.zoneTypeId = val;
                me.tableData.postData.zoneTypeId = val;
                me.getPageData();
            },
            isFlag(val) {
                const me = this;
                me.isFlag = val;
            }
        },
        created(){
            const me = this;
            me.getPageData();
        },
        methods: {
            // 获取页面基本数据
            getPageData() {
                const me = this;
                me.getChildCnt();
                me.getZoneBaseInfo();
                me.getZoneMarketInfo();
                me.getZoneNetInfo();
                me.getChildList();
                me.getDatatime();
            },
            // 包区或网格下所有子节点数量
            getChildCnt(){
                const me = this;
                const zoneId = me.zoneId;
                const zoneTypeId = me.zoneTypeId;
                me.baseFoot.zoneId = zoneId;
                me.baseFoot.zoneTypeId = zoneTypeId;
                me.cntLoading = true;
                UrbanAreaManage.getChildCnt(me.baseFoot)
                    .then(res => {
                        me.baseFoot.data = res.data;
                    })
                    .finally(() => {
                        me.cntLoading = false;
                    });
            },
            // 基本信息
            getZoneBaseInfo(){
                const me = this;
                const zoneId = me.zoneId;
                const zoneTypeId = me.zoneTypeId;
                me.houseMainLeft.zoneId = zoneId;
                me.houseMainLeft.zoneTypeId = zoneTypeId;
                me.baseLoading = true;
                UrbanAreaManage.getZoneBaseInfo(me.houseMainLeft)
                    .then(res => {
                        me.houseMainLeft.data = res.data;
                    })
                    .finally(() => {
                        me.baseLoading = false;
                    });
            },
            // 市场空间信息
            getZoneMarketInfo(){
                const me = this;
                const zoneId = me.zoneId;
                const zoneTypeId = me.zoneTypeId;
                me.houseMainCenter.zoneId = zoneId;
                me.houseMainCenter.zoneTypeId = zoneTypeId;
                me.baseLoading = true;
                UrbanAreaManage.getZoneMarketInfo(me.houseMainCenter)
                    .then(res => {
                        me.houseMainCenter.data = res.data;
                    })
                    .finally(() => {
                        me.baseLoading = false;
                    });
            },
            // 本网业务信息
            getZoneNetInfo(){
                const me = this;
                const zoneId = me.zoneId;
                const zoneTypeId = me.zoneTypeId;
                me.houseMainRight.zoneId = zoneId;
                me.houseMainRight.zoneTypeId = zoneTypeId;
                me.baseLoading = true;
                UrbanAreaManage.getZoneNetInfo(me.houseMainRight)
                    .then(res => {
                        me.houseMainRight.data = res.data;
                    })
                    .finally(() => {
                        me.baseLoading = false;
                    });
            },
            // tab 菜单点击切换
            tabSwitchhandle(data) {
                this.tabData.activeIndex = data;
            },
            // 下级列表
            getChildList() {
                const me = this;
                const zoneId = me.zoneId;
                const zoneTypeId = me.zoneTypeId;
                me.tableData.postData.zoneId = zoneId; 
                me.tableData.postData.zoneTypeId = zoneTypeId;
                me.tableLoading = true;
                UrbanAreaManage.getChildList(me.tableData.postData)
                    .then(res => {
                        me.tableData.data = res;
                    })
                    .finally(() => {
                        me.tableLoading = false;
                    });
            },
            // 统计分析-各业务计费到达情况
            getDatatime(){
                let date = new Date();
                let month = parseInt(date.getMonth());
                let month1 = month < 10 ? '0'+month : month;
                this.topleftTimeValue = this.bottomleftTimeValue = this.bottomrightTimeValue = date.getFullYear() + '-' + month1;
                this.topleftLastTimeValue = this.bottomleftLastTimeValue = this.bottomrightLastTimeValue = this.topleftTimeValue.substr(0,4) + this.topleftTimeValue.substr(5,2);
            },
            selectTimeOne(time){
                this.topleftLastTimeValue = time.substr(0,4) + time.substr(5,2);
            },
            selectTimeTwo(time){
                this.bottomleftLastTimeValue = time.substr(0,4) + time.substr(5,2);
            },
            selectTimeThree(time){
                this.bottomrightLastTimeValue = time.substr(0,4) + time.substr(5,2);
            },
            // 查询空间类型下拉列表
            getZoneType(flag) {
                const me = this;
                UrbanAreaManage.getZoneType({zoneTypeFlag:flag})
                    .then(res => {
                        me.dialogData.addGrid.data = res.data;
                        me.dialogData.addGrid.gridType = me.dialogData.addGrid.data[0].zoneTypeName;
                        me.dialogData.addGrid.postData.zoneTypeId = me.dialogData.addGrid.data[0].zoneTypeId;
                    })
            },
            zoneTypeHandle(vId) {
                console.log(vId)
                this.dialogData.addGrid.postData.zoneTypeId = vId;
            },
            // 添加小区
            addGrid() {
                const me = this;
                me.dialogData.addGrid.dialogAreaGrid = true;
                me.getZoneType(2);
            },
            closeGridDialog(){
                const me = this;
                me.getZoneType(2);
                me.dialogData.addGrid.gridName = '';
                me.dialogData.addGrid.gridHouse = '';
            },
            preservationAddGrid() {
                const me = this;
                me.dialogData.addGrid.postData.zoneName = me.dialogData.addGrid.gridName;
                me.dialogData.addGrid.postData.zoneAddress = me.dialogData.addGrid.gridHouse;
                me.dialogData.addGrid.postData.parentZoneId = me.houseMainLeft.data.zoneId;
                me.dialogData.addGrid.postData.upUnit = me.houseMainLeft.data.zoneName;
                me.$refs["postData"].validate((valid) => {
                    if (valid) {
                        this.$confirm('是否确定创建名为'+me.dialogData.addGrid.postData.zoneName+'的小区?','提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            UrbanAreaManage.addZone(me.dialogData.addGrid.postData)
                                .then(res => {
                                    me.$message({
                                        type: 'success',
                                        message: res.msg,
                                    });
                                    me.getPageData();
                                    me.$parent.getPageData();
                                    me.dialogData.addGrid.dialogAreaGrid = false;
                                })
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消创建'
                            });
                            me.getZoneType(2);
                            me.dialogData.addGrid.gridName = '';
                            me.dialogData.addGrid.gridHouse = '';
                            this.dialogData.addGrid.dialogAreaGrid = true;
                        });
                    }else{
                        return false
                    }
                })
            },
            // 更新历史
            getcompanyhistory() {
                const me = this;
                me.dialogData.updateHistory.switch = true;
                const zoneId = me.houseMainLeft.data.zoneId
                UrbanAreaManage.getUpdateHistory({zoneId: zoneId})
                    .then((res)=>{
                        me.dialogData.updateHistory.data = res.data;
                    })
            },
            cancelUpdateHistory() {
                this.dialogData.updateHistory.switch = false;
            },
            // 编辑 基本信息
            areaEdit(){
                const me = this;
                me.dialogData.dialogAreaEdit = true;
                me.dialogData.houseMainLeft.data.zoneName = me.houseMainLeft.data.zoneName;
            },
            closeAreaDialog() {
                const me = this;
                me.dialogData.houseMainLeft.data.zoneName = me.houseMainLeft.data.zoneName;
            },
            // 编辑基本信息 保存
            updateBaseInfo(){
                const me = this;
                me.dialogData.updateBaseInfo.zoneName = me.dialogData.houseMainLeft.data.zoneName;
                me.dialogData.updateBaseInfo.zoneId = me.houseMainLeft.data.zoneId;
                me.dialogData.updateBaseInfo.zoneTypeId = me.houseMainLeft.data.zoneTypeId;
                me.$refs["postData"].validate((valid) => {
                    if (valid) {
                        UrbanAreaManage.updateBaseInfo(me.dialogData.updateBaseInfo)
                            .then(res => {
                                me.$message({
                                    type: 'success',
                                    message: res.msg,
                                });
                                this.dialogData.dialogAreaEdit = false;
                            })
                        me.getPageData();
                    }else{
                        return false;
                    }
                })
            },
            // 编辑基本信息 拿回
            updateBaseInfoReset(){
                const me = this;
                me.dialogData.updateBaseInfoReset.zoneId = me.houseMainLeft.data.zoneId;
                me.dialogData.updateBaseInfoReset.zoneTypeId = me.houseMainLeft.data.zoneTypeI
                me.$refs["postData"].validate((valid) => {
                    if (valid) {
                        UrbanAreaManage.updateBaseInfoReset(me.dialogData.updateBaseInfoReset)
                            .then(res => {
                                me.$message({
                                    type: 'success',
                                    message: res.msg,
                                });
                                this.dialogData.dialogAreaEdit = false;
                            })
                        me.getPageData();
                    }else{
                        return false
                    }
                })
            },
            // 市场空间申报
            areaDeclare(){
                const me = this;
                me.dialogData.dialogAreaDeclare = true;
                me.dialogData.houseMainCenter.data.roomCnt = me.houseMainCenter.data.roomCnt;
                me.dialogData.houseMainCenter.data.famCnt = me.houseMainCenter.data.famCnt;
                me.dialogData.houseMainCenter.data.peoCnt = me.houseMainCenter.data.peoCnt;
                me.dialogData.houseMainCenter.data.busiCnt = me.houseMainCenter.data.busiCnt;
            },
            closeDeclareDialog(){
                const me = this;
                me.dialogData.houseMainCenter.data.roomCnt = me.houseMainCenter.data.roomCnt;
                me.dialogData.houseMainCenter.data.famCnt = me.houseMainCenter.data.famCnt;
                me.dialogData.houseMainCenter.data.peoCnt = me.houseMainCenter.data.peoCnt;
                me.dialogData.houseMainCenter.data.busiCnt = me.houseMainCenter.data.busiCnt;
            },
            // 市场空间申报 保存
            updateMarketInfo(){
                const me = this;
                me.dialogData.updateMarketInfo.zoneId = me.houseMainLeft.data.zoneId;
                me.dialogData.updateMarketInfo.zoneTypeId = me.houseMainLeft.data.zoneTypeId;
                me.dialogData.updateMarketInfo.roomCnt = me.dialogData.houseMainCenter.data.roomCnt;
                me.dialogData.updateMarketInfo.famCnt = me.dialogData.houseMainCenter.data.famCnt;
                me.dialogData.updateMarketInfo.peoCnt = me.dialogData.houseMainCenter.data.peoCnt;
                me.dialogData.updateMarketInfo.busiCnt = me.dialogData.houseMainCenter.data.busiCnt;
                me.$refs["postData"].validate((valid) => {
                    if (valid) {
                        UrbanAreaManage.updateMarketInfo(me.dialogData.updateMarketInfo)
                            .then(res => {
                                me.$message({
                                    type: 'success',
                                    message: res.msg,
                                });
                                this.dialogData.dialogAreaDeclare = false;
                            })
                        me.getPageData();
                    }else{
                        return false;
                    }
                })
            },
            // 市场空间申报 拿回
            updateMarketInfoReset(){
                const me = this;
                me.dialogData.updateMarketInfoReset.zoneId = me.houseMainLeft.data.zoneId;
                me.dialogData.updateMarketInfoReset.zoneTypeId = me.houseMainLeft.data.zoneTypeId;
                me.$refs["postData"].validate((valid) => {
                    if (valid) {
                        UrbanAreaManage.updateMarketInfoReset(me.dialogData.updateMarketInfoReset)
                            .then(res => {
                                me.$message({
                                    type: 'success',
                                    message: res.msg,
                                });
                                this.dialogData.dialogAreaDeclare = false;
                            })
                        me.getPageData();
                    }else{
                        return false;
                    }
                })
            }
        }
    }
</script>

<style lang="stylus">
    @import '~@/assets/styles/mixin.styl'
    .page-box-two
        .page-top
            border-bottom 1px solid rgba(218,226,237,1)
            .house-details
                box-shadow 0px 9px 12px 0px rgba(0, 0, 0, 0.11)
                .base-info
                    display flex
                    justify-content space-between
                    align-items center
                    padding 6px 0 0 0
                    position relative
                    .base-info-left
                        width 50%
                        background url("~@/assets/image/dictSpace/UrbanAreaManage/icon-garden.png") no-repeat
                        font-size 16px
                        font-weight 600
                        color rgba(255,255,255,1)
                        padding 6px 188px 6px 23px
                    .base-info-right
                        font-size 14px
                        color rgba(147,158,171,1)
                        img
                            vertical-align middle
                        .base-info-right-span
                            vertical-align middle
                            margin 0 12px 0 6px
                .base-foot
                    display flex
                    align-items center
                    padding 10px 0
                    justify-content space-around
                    .base-foot-item
                        .base-foot-top
                            display flex
                            justify-content space-between
                            align-items center
                        .base-foot-details
                            text-align center
                            margin 0 10px
                        .base-foot-num
                            font-size 18px
                            font-weight 600
                            color rgba(55,57,76,1)
                            line-height 28px
                        .base-foot-font
                            font-size 14px
                            color rgba(147,158,171,1)
                            line-height 20px
            .house-main
                display flex
                house-main-left()
                    padding 18px
                    .house-main-left-header
                        font-size 16px
                        font-weight 600
                        color rgba(55,57,76,1)
                        line-height 36px
                    .el-button
                        width 50px
                        height 20px
                        font-size 12px
                        color #3E82FE
                        padding 0
                        float right
                        margin-top 6px
                    .house-main-left-details
                        .house-main-left-list
                            display flex
                            margin 6px 0
                            .introduce
                                color rgba(147,158,171,1)
                                padding-right 6px
                .house-main-left
                    house-main-left()
                    border-right 1px solid #E5EDF3
                    width 44%
                .house-main-center
                    house-main-left()
                    border-right 1px solid #E5EDF3
                    width 32%
                    .house-main-left-status
                        width 40px 
                        height 15px 
                        background rgba(255,142,59,0.2) 
                        border-radius 3px 
                        border 1px solid rgba(255,142,59,1) 
                        font-size 10px 
                        color rgba(255,142,59,1) 
                        line-height 15px 
                        margin 0 20px 0 10px
                .house-main-right
                    house-main-left()
        
        .page-table
            flex 1
            border-top 10px solid #F4F6F8
            padding 0 20px
            .tab-menu
                display flex
                box-shadow 0 1px 0 0 #E5EDF3
                .menu-item
                    width 25%
                    line-height 36px
                    padding 10px 0
                    color $font-default-color
                    font-size 16px
                    display flex
                    justify-content center
                    align-items center
                    cursor pointer
                    transition all 0.3s
                    &:before
                        content ''
                        width 22px
                        height 22px
                        margin 0 10px 0 0
                    &-active
                        color $main-blue-color
                        box-shadow 0 -2px 0 0 $main-blue-color inset
                    for index in 1 2
                        &:nth-child({index})
                        &:active
                            background url('~@/assets/image/dictSpace/UrbanAreaManage/icon-tabtwo-' + index + '.png') 40px center no-repeat
            .tab-details
                .tab-content
                    .tab-top
                        display flex
                        justify-content space-between
                        padding 20px 0 15px
                        .tab-add
                            .el-button.el-button--primary.el-button--small
                                background linear-gradient(45deg,rgba(30,208,255,1) 0%,rgba(43,123,255,1) 100%)
                    .tab-bottom
                        .tab-pagination
                            .el-pagination
                                float right
                                padding 10px 0
                                button,ul,.el-pagination__total
                                    margin-top 2px
                                .el-pagination__total,.el-pagination__jump
                                 margin-left 4px

                        .el-row
                            margin 10px
                            .tab-card-header
                                font-size 16px
                                font-weight 600
                                color rgba(55,57,76,1)
                            .el-date-editor.el-input.el-input--small.el-input--prefix.el-input--suffix.el-date-editor--month
                                width 100px
                                float right
                                .el-input__inner
                                    font-size 12px
                                    padding 0 10px
                                .el-input__icon.el-icon-date
                                    width 14px
                                    padding 0 70px
                            .tab-card-main
                                margin-top 15px
                            .tab-card-all
                                font-size 14px
                                font-weight 400
                                color rgba(55,57,76,1)
                            .tab-card-num
                                font-size 18px
                                font-weight bold
                                color rgba(62,130,254,1)
        .el-dialog__header
            border-bottom 1px solid #E4E7EC
        .el-dialog__body
            padding 10px 20px
            .el-select
                width 100%
        .dialog-header
            font-size 14px
            padding 20px 0
            color rgba(147,158,171,1)
            .status
                width 40px
                height 15px
                background rgba(255,142,59,0.2)
                border-radius 3px
                border 1px solid rgba(255,142,59,1)
                font-size 10px
                color rgba(255,142,59,1)
                line-height 15px
                margin 0 20px 0 10px
        .el-form-item__label
            font-size 14px
            font-weight 400
            color rgba(123,123,123,1)
        .el-form-item__content
            span
                font-size 14px
                font-weight 400
                color rgba(55,57,76,1)
        .el-input__inner
            font-size 14px
            font-weight 400
            color rgba(55,57,76,1)
        .dialog-footer
            .dialog-footer-btnone
                background rgba(165,173,186,1)
                color rgba(255,255,255,1)
            .dialog-footer-btntwo
                background linear-gradient(45deg,rgba(30,208,255,1) 0%,rgba(43,123,255,1) 100%)
                color rgba(255,255,255,1)
        .update-history
            position absolute
            width 487px
            top 0
            bottom 0
            right 0
            padding 20px 30px
            box-shadow 1px 7px 25px -1px rgba(0, 0, 0, 0.3)
            border-radius 3px
            box-shadow 0 0 0 1px rgba(218, 226, 237, 1) inset, 1px 7px 25px -1px rgba(0, 0, 0, 0.3)
            background-color #fff
            z-index 88
            .history-title
                line-height 42px
                padding 0 0 5px 0
                box-shadow 0 -1px 0 0 #E4E7EC inset
                display flex
                justify-content space-between
                h3
                    color $font-default-color
                    font-size 24px
                    .color-red
                        color $main-red-color
                        font-size 18px
                .close-button
                    padding 0 0 10px
                    font-size 18px
                    color $main-blue-color
                    cursor pointer
            .history-content
                padding 15px 0
                .house-title
                    height 53px
                    line-height 53px
                    color #393C41
                    font-size 18px
                    border-radius 3px
                    box-shadow 0 0 0 1px rgba(62, 130, 254, 1) inset
                    padding 0 0 0 48px
                    background url('~@/assets/image/dictSpace/buildingInfoManage/icon-history-house.png') left center no-repeat rgba(62, 130, 254, 0.1)
                .history-list
                    max-height 600px
                    overflow-y auto
                    padding 10px 0 0
                    .list-item
                        padding 10px 8px 10px (15 + 32)px
                        box-shadow 0 -1px 0 0 #E5EDF3 inset
                        background url('~@/assets/image/dictSpace/buildingInfoManage/icon-history-info.png') left center no-repeat
                        .item-title
                            color #939EAB
                            display flex
                            .item-user
                                color $main-blue-color
                                min-width 50px
                                margin 0 10px 0 0      
</style>