<template lang="pug">
    .page-box-four
        .page-top
            .house-details
                .base-info
                    .base-info-left(v-loading="baseLoading") {{houseMainLeft.data.zoneName}}
                    .base-info-right(@click="getcompanyhistory")
                        img(src="~@/assets/image/dictSpace/buildingInfoManage/icon-history.png")
                        a(class="base-info-right-span") 更新历史
            .house-main
                .house-main-left(v-loading="baseLoading")
                    span(class="house-main-left-header") 基本信息
                    el-button(round @click="areaEdit") 编辑
                    .house-main-left-details
                        .house-main-left-list
                            .introduce
                                nobr 楼宇类型:
                            span {{houseMainLeft.data.zoneTypeName}}
                        .house-main-left-list
                            .introduce
                                nobr 楼宇地址:
                            span {{houseMainLeft.data.address}}
                        .house-main-left-list
                            .introduce
                                nobr 上级经营单元:
                            span {{houseMainLeft.data.upUnit}}
                .house-main-center(v-loading="baseLoading")
                    span(class="house-main-left-header") 市场空间信息
                    span(v-if="houseMainCenter.status" class="house-main-left-status") 审批中
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
                //- 客户清单
                .tab-content(v-if="tabData.activeIndex === 0")
                    .tab-top
                        .tab-add
                            el-button(type="primary" icon="el-icon-plus" @click="addGrid") 添加客户
                        .tab-search
                            el-input(placeholder="搜索客户" prefix-icon="el-icon-search" v-model="getCustomerList.postData.customerName")
                            el-button(type="primary" @click="getCustomerLists") 搜索
                    .tab-bottom
                        .tab-table
                            el-table(v-loading="getCustomerList.customerListLoading" :data="getCustomerList.data" max-height="390px")
                                el-table-column(prop="customerName" label="客户名称")
                                el-table-column(prop="customerAddr" label="客户地址")
                                el-table-column(prop="customerType" label="类型")
                                el-table-column(prop="rate" label="信息完整率")
                                el-table-column(label="操作")
                                    template(slot-scope="scope")
                                        span(@click="getCustomers(scope.row.customerId)") 更新历史
                //- 楼宇视图
                .tab-content(v-else-if="tabData.activeIndex === 1 && activeStatus")
                    .content-number
                        .content-number-item
                            span(class="content-number-item-num") {{getBuilingViewTopValue.data.netCustCnt}}
                            br
                            span(class="content-number-item-font") 本网客户数
                        .content-number-item
                            span(class="content-number-item-num") {{getBuilingViewTopValue.data.roomCnt}}
                            br
                            span(class="content-number-item-font") 总房间数
                        .content-number-item
                            span(class="content-number-item-num") {{getBuilingViewTopValue.data.rate}}%
                            br
                            span(class="content-number-item-font") 渗透率
                        .content-number-item
                            span(class="content-number-item-num") {{getBuilingViewTopValue.data.assetCnt}}
                            br
                            span(class="content-number-item-font") 总资产数
                    .content-menu
                        .content-btn
                            .content-btn-item(v-loading="getBuildingViewCells.buildingViewCellsLoading" v-for="(item,index) in getBuildingViewCells.data" :key="index")
                                el-button(:class="{ 'content-btn-item-active': getBuildingViewCells.activeList === item.cellId, 'content-btn-item-none': getBuildingViewCells.activeList !== item.cellId}" @click="btnListhandle(item)") {{item.cellName}}
                        .content-details
                            .content-all
                                .content-all-left
                                    .content-all-left-item(v-for="(item,index) in view.left" :key="index") {{item.value}}
                                .content-all-right
                                    .content-all-right-item(v-for="(item,index) in view.right" :key="index") {{item.value}}
                            .content-card
                                .content-card-card(v-if="getBuildingView.data.length !== 0" v-loading="getBuildingView.buildingViewLoading" v-for="(item,index) in getBuildingView.data" :key="index" @click="handleHomes(item)" :class="{ 'content-card-card-one-active' : item.custType === '1', 'content-card-card-two-active': item.custType === '2'}")
                                    span {{item.roomId}}室
                                    .content-card-card-box
                                        .content-card-card-box-item(:class="{ 'content-card-card-box-item-one-active': item.wbFlag === '1' }")
                                        .content-card-card-box-item(:class="{ 'content-card-card-box-item-two-active': item.mobileFlag === '1' }")
                                        .content-card-card-box-item(:class="{ 'content-card-card-box-item-three-active': item.fixedFlag === '1' }")
                                        .content-card-card-box-item(:class="{ 'content-card-card-box-item-four-active': item.iptvFlag === '1' }")
                                .content-nocard(v-if="getBuildingView.data.length === 0") 暂无数据
                //- 进入房间
                .tab-content(v-else-if="tabData.activeIndex === 1 && !activeStatus")
                    .tab-return
                        .tab-return-title
                            img(src="~@/assets/image/dictSpace/UrbanAreaManage/icon-home.png")
                            span {{handleHome.cellName}} {{handleHome.cells}}室
                        .tab-return-icon(@click="handleCancleHome")
                            i.el-icon-back
                            span 返回
                    .tab-home
                        .tab-table
                            el-table(v-loading="getRoomCustomerList.roomCustomerListLoading" :data="getRoomCustomerList.data" max-height="390px")
                                el-table-column(type="index" label="序号")
                                el-table-column(prop="customerName" label="客户名称")
                                el-table-column(prop="assetType" label="资产类型")
                                el-table-column(prop="assetNbr" label="资产号码")
        //- 编辑基本信息
        el-dialog(title="编辑基本信息" :visible.sync="dialogData.dialogAreaEdit" @close='closeAreaDialog')
            .dialog-header
                span 提交人：{{houseMainLeft.data.deptName}}-{{houseMainLeft.data.staffName}}（{{houseMainLeft.data.staffId}}）
                span(v-if="houseMainLeft.data.status === '1'" class="status") 审批中
            .dialog-main
                el-form(label-position="labelPosition" label-width="100px" :model="dialogData.houseMainLeft" :rules="rules.edit" ref="postData")
                    el-form-item(label="楼宇名称:" prop="zoneName")
                        el-input(v-model="dialogData.houseMainLeft.data.zoneName" placeholder="请输入楼宇名称")
                    el-form-item(label="楼宇类型:")
                        span {{houseMainLeft.data.zoneTypeName}}
                    el-form-item(label="楼宇地址:")
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
        //- 添加客户
        el-dialog(title="企业客户维护" :visible.sync="dialogData.addGrid.dialogAreaGrid" @close="closeGridDialog")
            .dialog-main
                el-form(label-position="labelPosition" label-width="140px" :model="dialogData.addGrid.postData" :rules="rules.grid" ref="postData")
                    el-form-item(label="企业客户名称:" prop="customerName")
                        el-input(v-model="dialogData.addGrid.postData.customerName" placeholder="请输入")
                    el-form-item(label="客户地址:" prop="customerAddr")
                        el-input(v-model="dialogData.addGrid.postData.customerAddr" placeholder="请输入")
                    .dialog-input
                        el-form-item(label="单元号:" prop="cellId")
                            el-input(v-model="dialogData.addGrid.postData.cellId" placeholder="请输入")
                        el-form-item(label="房间号:" prop="roomId")
                            el-input(v-model="dialogData.addGrid.postData.roomId" placeholder="请输入")
                    el-form-item(label="企业客户类型:" prop="customerTypeName")
                        el-select(v-model="dialogData.addGrid.postData.customerTypeName" placeholder="请选择企业客户类型" @change="customerType")
                            el-option(v-for="(item, index) in dialogData.addGrid.getCustomerType.data" :label="item.customerTypeName" :value="item.customerType")
                    el-form-item(label="营业额规模(万元):" prop="busiScale")
                        el-input(v-model="dialogData.addGrid.postData.busiScale" placeholder="请输入")
                    el-form-item(label="办公面积(平米):" prop="officeSpace")
                        el-input(v-model="dialogData.addGrid.postData.officeSpace" placeholder="请输入")
                    el-form-item(label="公司人数规模:" prop="staffCnt")
                        el-input(v-model="dialogData.addGrid.postData.staffCnt" placeholder="请输入")
                    el-form-item(label="公司电话:" prop="companyTel")
                        el-input(v-model="dialogData.addGrid.postData.companyTel" placeholder="请输入")
                    el-form-item(label="企业楼层:" prop="buildingFloor")
                        el-input(v-model="dialogData.addGrid.postData.buildingFloor" placeholder="请输入")
                    .business(v-if="!dialogData.addGrid.businessFlag" v-for="(item,index) in dialogData.addGrid.postData.business" :key="index")
                        el-form-item(label="业务类型:")
                            el-select(v-model="item.busiName" placeholder="请选择业务类型" @change="busiType($event,index)")
                                el-option(v-for="(item, index) in dialogData.addGrid.getBusinessType.data" :label="item.busiName" :value="item.busiId")
                        el-form-item(label="业务供应商：")
                            el-input(v-model="item.busiProvider" placeholder="请输入")
                        el-form-item(label="异网客户经理:")
                            el-input(v-model="item.otherManagerName" placeholder="请输入")
                        el-form-item(label="联系方式：")
                            el-input(v-model="item.otherManagerPhone" placeholder="请输入")
                        el-form-item(label="到期时间：")
                            el-date-picker(v-model="item.busiEndDate" type="date" placeholder="选择时间" value-format="yyyy-MM-dd" format="yyyy-MM-dd")
                    el-form-item
                        el-button(type="primary" plain icon="el-icon-plus" @click="addBusiness") 添加增量业务信息
            .dialog-footer(slot="footer")
                el-button(class="dialog-footer-btnone" @click="dialogData.addGrid.dialogAreaGrid=false") 取消返回
                el-button(class="dialog-footer-btntwo" @click="preservationAddGrid") 确认提交
        //- 客户更新历史
        el-dialog(title="客户更新历史" :visible.sync="dialogData.dialogCustomerHistory")
            .dialog-main
                .dialog-main-list(v-for="(item,index) in dialogData.customerHistory" :key="index")
                    .dialog-list
                        span(class="dialog-list-itemOne") {{item.operateStaff}}
                        span(class="dialog-list-itemTwo") {{item.operateDate}}
                    .dialog-list {{item.operateDesc}}
</template>

<script>
    import { UrbanAreaManage } from "@/api/dictSpace/UrbanAreaManage";
    export default {
        name: "buildingManagement",
        props: [
            'zoneId',
            'zoneTypeId',
            'isFlag'
        ],
        data() {
            let checkPhone = (rule, value, callback) => {
                const isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/; //手机号码
                const isMob= /^0?1[3|4|5|8][0-9]\d{8}$/; // 座机格式
                if(rule.required){
                    if (!value)
                        return callback(new Error('请输入联系方式'));
                    if(isMob.test(value)||isPhone.test(value))
                        return callback();
                    else
                        return callback(new Error('请输入正确的手机号或座机号！'));
                }
            };
            return {
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
                // 查询客户清单
                getCustomerList: {
                    customerListLoading: false,
                    postData: {
                        zoneId: null,
                        customerName: ''
                    },
                    data: []
                },
                // 楼宇视图-四个指标
                getBuilingViewTopValue: {
                    builingViewTopValueLoading: false,
                    postData: {
                        zoneId: null
                    },
                    data: {}
                },
                // 楼宇视图-单元列表
                getBuildingViewCells: {
                    buildingViewCellsLoading: false,
                    postData: {
                        zoneId: null
                    },
                    data: [],
                    activeList: null,
                    activeName: null
                },
                view: {
                    left: [
                        { id:1, value:'电信' },
                        { id:2, value:'他网' }
                    ],
                    right: [
                        { id:1, value:'宽带' },
                        { id:2, value:'移动' },
                        { id:3, value:'固话' },
                        { id:4, value:'天翼高清' }
                    ]
                },
                // 楼宇视图-房间列表
                getBuildingView: {
                    buildingViewLoading: false,
                    postData: {
                        zoneId: null
                    },
                    data: []
                },
                //进入房间
                activeStatus: true,
                handleHome: {
                    cells: '',
                    rooms: '',
                    cellId: '',
                    cellName: ''
                },
                getRoomCustomerList: {
                    roomCustomerListLoading: false,
                    postData: {
                        zoneId: null,
                        cellId: null,
                        roomId: null
                    },
                    data: []
                },
                // 标签页切换
                tabData: {
                    // 标题切换索引
                    activeIndex: 0,
                    tabMenuListData: [
                        {name: "客户清单", data: 0},
                        {name: "楼宇视图", data: 1}
                    ]
                },
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
                    // 添加客户
                    addGrid: {
                        dialogAreaGrid: false,
                        // 查询企业客户类型
                        getCustomerType: {
                            customerTypeName: '',
                            data: []
                        },
                        // 查询业务类型
                        getBusinessType: {
                            busiName: '',
                            data: []
                        },
                        businessFlag: true,
                        // 提交数据
                        postData: {
                            zoneId: "",
                            customerName: "",
                            customerAddr: "",
                            customerType: "",
                            busiScale: "",
                            officeSpace: "",
                            staffCnt: "",
                            companyTel: "",
                            buildingFloor: "",
                            cellId: "",
                            roomId: "",
                            business:[]
                        },
                    },
                    // 查询客户更新历史
                    dialogCustomerHistory: false,
                    customerHistory: []
                },
                // 表单规则验证
                rules: {
                    edit: {
                        zoneName: [
                            { required: true, message: '请输入楼宇名称', trigger: 'blur' }
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
                        customerName: [
                            { required: true, message: '请输入企业客户名称', trigger: 'blur' }
                        ],
                        customerAddr: [
                            { required: true, message: '请输入客户地址', trigger: 'blur' }
                        ],
                        cellId: [
                            { required: true, message: '请输入单元号', trigger: 'blur' }
                        ],
                        roomId: [
                            { required: true, message: '请输入房间号', trigger: 'blur' }
                        ],
                        customerTypeName: [
                            { required: true, message: '请输入企业客户类型', trigger: 'blur' }
                        ],
                        busiScale: [
                            { required: true, message: '请输入营业额规模(万元)', trigger: 'blur' }
                        ],
                        officeSpace: [
                            { required: true, message: '请输入办公面积(平米)', trigger: 'blur' }
                        ],
                        staffCnt: [
                            { required: true, message: '请输入公司人数规模', trigger: 'blur' }
                        ],
                        companyTel: [
                            { required: true, validator: checkPhone, trigger: 'blur' }
                        ],
                        buildingFloor: [
                            { required: true, message: '请输入企业楼层', trigger: 'blur' }
                        ],
                        busiProvider: [
                            { required: true, message: '请输入业务供应商', trigger: 'blur' }
                        ],
                        otherManagerName: [
                            { required: true, message: '请输入异网客户经理', trigger: 'blur' }
                        ],
                        otherManagerPhone: [
                            { required: true, validator: checkPhone, trigger: 'blur' }
                        ],
                    }
                }
            }
        },
        watch: {
            zoneId(val) {
                const me = this;
                me.houseMainLeft.zoneId = val;
                me.houseMainCenter.zoneId = val;
                me.houseMainRight.zoneId = val;
                me.getPageData();
            },
            zoneTypeId(val) {
                const me = this;
                me.houseMainLeft.zoneTypeId = val;
                me.houseMainCenter.zoneTypeId = val;
                me.houseMainRight.zoneTypeId = val;
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
                me.getZoneBaseInfo();
                me.getZoneMarketInfo();
                me.getZoneNetInfo();
                me.getCustomerLists();
                me.getBuilding();
            },
            // 获取楼宇视图的基本数据
            getBuilding(){
                const me = this;
                me.getBuilingViewTopValues();
                me.getBuildingViewCell();
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
                const me = this;
                me.tabData.activeIndex = data;
                if(data === 0){
                    me.getPageData();
                } else if(data === 1){
                    me.getBuilding();
                }
            },
            // 查询客户清单
            getCustomerLists(){
                const me = this;
                me.getCustomerList.postData.zoneId = me.zoneId;
                me.getCustomerList.customerListLoading = true;
                UrbanAreaManage.getCustomerList(me.getCustomerList.postData)
                    .then(res => {
                        me.getCustomerList.data = res.data;
                        console.log(res.data)
                    })
                    .finally(() => {
                        me.getCustomerList.customerListLoading = false;
                    })
            },
            // 楼宇视图-四个指标
            getBuilingViewTopValues(){
                const me = this;
                me.getBuilingViewTopValue.postData.zoneId = me.zoneId;
                me.getCustomerList.builingViewTopValueLoading = true;
                UrbanAreaManage.getBuilingViewTopValue(me.getBuilingViewTopValue.postData)
                    .then(res => {
                        me.getBuilingViewTopValue.data = res.data;
                        console.log(me.getBuilingViewTopValue.data)
                    })
                    .finally(() => {
                        me.getCustomerList.builingViewTopValueLoading = false;
                    })
            },
            // 楼宇视图-单元列表
            getBuildingViewCell(){
                const me = this;
                me.getBuildingViewCells.postData.zoneId = me.zoneId;
                me.getBuildingViewCells.buildingViewCellsLoading = true;
                UrbanAreaManage.getBuildingViewCells(me.getBuildingViewCells.postData)
                    .then(res => {
                        me.getBuildingViewCells.data = res.data;
                        console.log(res.data)
                        if(me.getBuildingViewCells.data.length > 0){
                            me.getBuildingViewCells.activeList = me.getBuildingViewCells.data[0].cellId; // 默认选中第一个单元
                            me.getBuildingViewCells.activeName = me.getBuildingViewCells.data[0].cellName;
                            me.getBuildingViews();
                        }
                    })
                    .finally(() => {
                        me.getBuildingViewCells.buildingViewCellsLoading = false;
                    })
            },
            // 楼宇视图-切换单元
            btnListhandle(data){
                const me = this;
                me.getBuildingViewCells.activeList = data.cellId;
                me.getBuildingViewCells.activeName = data.cellName;
                me.getBuildingViews();
            },
            // 楼宇视图-房间列表
            getBuildingViews(){
                const me = this;
                me.getBuildingView.postData.zoneId = me.zoneId;
                me.getBuildingView.postData.cellId = me.getBuildingViewCells.activeList;
                me.getBuildingView.buildingViewLoading = true;
                UrbanAreaManage.getBuildingView(me.getBuildingView.postData)
                    .then(res => {
                        me.getBuildingView.data = res.data;
                        console.log(res.data)
                    })
                    .finally(() => {
                        me.getBuildingView.buildingViewLoading = false;
                    })
            },
            // 进入房间
            handleHomes(data){
                const me = this;
                me.activeStatus = false;
                me.handleHome.cells = data.roomId;
                me.handleHome.cellId = me.getBuildingViewCells.activeList;
                me.handleHome.cellName = me.getBuildingViewCells.activeName;
                me.getRoomCustomerLists(me.handleHome.cellId, me.handleHome.cells)
            },
            handleCancleHome(){
                const me = this;
                me.activeStatus = true;
            },
            // 楼宇视图-某个房间的客户列表
            getRoomCustomerLists(cellId, roomId){
                const me = this;
                me.getRoomCustomerList.postData.zoneId = me.zoneId;
                me.getRoomCustomerList.postData.cellId = cellId;
                me.getRoomCustomerList.postData.roomId = roomId;
                me.getRoomCustomerList.roomCustomerListLoading = true;
                UrbanAreaManage.getRoomCustomerList(me.getRoomCustomerList.postData)
                    .then((res) => {
                        me.getRoomCustomerList.data = res.data;
                    })
                    .finally(() => {
                        me.getRoomCustomerList.roomCustomerListLoading = false;
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
                me.dialogData.updateBaseInfoReset.zoneTypeId = me.houseMainLeft.data.zoneTypeId;
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
            },
            // 添加客户
            addGrid() {
                const me = this;
                me.dialogData.addGrid.dialogAreaGrid = true;
                me.dialogData.addGrid.postData.zoneId = me.zoneId;
                me.getCustomerTypes();
                me.getBusinessTypes();
            },
            closeGridDialog(){
                const me = this;
                me.getCustomerTypes();
                me.getBusinessTypes();
                me.dialogData.addGrid.postData.customerName = '';
                me.dialogData.addGrid.postData.customerAddr = '';
                me.dialogData.addGrid.postData.busiScale = '';
                me.dialogData.addGrid.postData.officeSpace = '';
                me.dialogData.addGrid.postData.staffCnt = '';
                me.dialogData.addGrid.postData.companyTel = '';
                me.dialogData.addGrid.postData.buildingFloor = '';
                me.dialogData.addGrid.postData.cellId = '';
                me.dialogData.addGrid.postData.roomId = '';
                me.dialogData.addGrid.postData.customerTypeName = '';
                me.dialogData.addGrid.postData.business = []
            },
            // 查询企业客户类型
            getCustomerTypes() {
                const me = this;
                UrbanAreaManage.getCustomerType()
                    .then(res => {
                        me.dialogData.addGrid.getCustomerType.data = res.data;
                    })
            },
            customerType(vId){
                const me = this;
                me.dialogData.addGrid.postData.customerType = vId;
            },
            // 查询业务类型
            getBusinessTypes() {
                const me = this;
                UrbanAreaManage.getBusinessType()
                    .then(res => {
                        me.dialogData.addGrid.getBusinessType.data = res.data;
                    })
            },
            busiType(vId,index){
                const me = this;
                me.dialogData.addGrid.postData.business[index].busiId = vId;
                console.log(vId,index);
            },
            // 添加增量业务信息
            addBusiness(){
                const me = this;
                me.dialogData.addGrid.postData.business.push({
                    busiId: "",
                    busiProvider: "",
                    otherManagerName: "",
                    otherManagerPhone: "",
                    busiEndDate: ""
                })
                me.dialogData.addGrid.businessFlag = false;
            },
            preservationAddGrid() {
                const me = this;
                for(var key in me.dialogData.addGrid.postData.business[0]){
                    if(!me.dialogData.addGrid.postData.business[0][key]) return me.dialogData.addGrid.postData.business.length = 0
                }
                console.log(me.dialogData.addGrid.postData);
                me.$refs["postData"].validate((valid) => {
                    if (valid) {
                        me.$confirm('是否确定创建名为'+me.dialogData.addGrid.postData.customerName+'的客户?','提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            UrbanAreaManage.addCustomer(me.dialogData.addGrid.postData)
                                .then(res => {
                                    me.$message({
                                        type: 'success',
                                        message: res.msg,
                                    });
                                })
                            me.dialogData.addGrid.dialogAreaGrid = false;
                        }).catch(() => {
                            me.$message({
                                type: 'info',
                                message: '已取消提交'
                            });
                            me.dialogData.addGrid.dialogAreaGrid = true;
                        });
                    }else{
                        return false;
                    }
                })
            },
            // 查询客户更新历史
            getCustomers(data){
                const me = this;
                me.dialogData.dialogCustomerHistory = true;
                me.getCustomerHistorys(data);
            },
            getCustomerHistorys(data){
                const me = this;
                UrbanAreaManage.getCustomerHistory({customerId: data})
                    .then(res => {
                        me.dialogData.customerHistory = res.data;
                        console.log(me.dialogData.customerHistory)
                    })
            }
        }
    }
</script>

<style lang="stylus">
    @import '~@/assets/styles/mixin.styl'
    .page-box-four
        .page-top
            border-bottom 1px solid rgba(218,226,237,1)
            .house-details
                box-shadow 0px 9px 12px 0px rgba(0, 0, 0, 0)
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
                            background url('~@/assets/image/dictSpace/UrbanAreaManage/icon-tabfour-' + index + '.png') 40px center no-repeat
            .tab-details
                .tab-content
                    .tab-top
                        display flex
                        justify-content space-between
                        padding 20px 0 15px
                        .tab-add
                            .el-button.el-button--primary.el-button--small
                                background linear-gradient(45deg,rgba(30,208,255,1) 0%,rgba(43,123,255,1) 100%)
                        .tab-search
                            display flex
                            justify-content space-between
                            .el-button.el-button--primary.el-button--small
                                background linear-gradient(45deg,rgba(30,208,255,1) 0%,rgba(43,123,255,1) 100%)
                                margin-left 10px
                    .tab-bottom
                        .el-table-column
                            span
                                padding 0 6px
                                color rgba(255,255,255,1)
                                border-radius 8px
                                cursor pointer
                        .tab-pagination
                            .el-pagination
                                float right
                                padding 10px 0
                    // 楼宇视图
                    .content-number
                        display flex
                        justify-content space-between
                        margin 10px 0
                        &-item
                            width 100%
                            padding 10px
                            text-align center
                            &-num
                                font-size 28px
                                font-weight bold
                                color rgba(255,255,255,1)
                                line-height 34px
                            &-font
                                font-size 16px
                                font-weight 500
                                color rgba(255,255,255,1)
                                line-height 22px
                            for index in 1 2 3 4
                                &:nth-child({index})
                                &:active
                                    background url("~@/assets/image/dictSpace/UrbanAreaManage/icon-building-"+index+".png") center no-repeat
                    .content-menu
                        .content-btn
                            display flex
                            .content-btn-item
                                .el-button
                                    width 127px
                                    margin-left 10px
                                &-none
                                    background rgba(244,246,248,1)
                                    border 1px solid rgba(62,130,254,1)
                                    color rgba(182,190,198,1)
                                &-active
                                    background rgba(62,130,254,1)
                                    color rgba(255,255,255,1)
                        .content-details
                            background rgba(244,246,248,1)
                            margin 10px
                            padding 10px
                            overflow hidden
                            zoom 1
                            .content-all
                                display flex
                                justify-content space-between
                                padding 10px 20px 20px 20px
                                &-left
                                    display flex
                                    &-item
                                        line-height 14px
                                        display flex
                                        for index in 1 2
                                            &:nth-child({index})
                                                &:before
                                                    content ''
                                                    margin 0 10px
                                                    width 12px
                                                    height 12px
                                                    border-radius 3px
                                            &:nth-child(1)
                                                &:before
                                                    background-color rgba(1,70,191,1)
                                            &:nth-child(2)
                                                &:before
                                                    background-color rgba(255,98,108,1)
                                &-right
                                    display flex
                                    &-item
                                        line-height 14px
                                        display flex
                                        for index in 1 2 3 4
                                            &:nth-child({index})
                                                &:before
                                                    content ''
                                                    margin 0 10px
                                                    width 12px
                                                    height 12px
                                                    border-radius 3px
                                            &:nth-child(1)
                                                &:before
                                                    background-color rgba(46,189,65,1)
                                            &:nth-child(2)
                                                &:before
                                                    background-color rgba(77,161,255,1)
                                            &:nth-child(3)
                                                &:before
                                                    background-color rgba(255,142,59,1)
                                            &:nth-child(4)
                                                &:before
                                                    background-color rgba(105,1,191,1)
                            .content-card
                                &-card
                                    cursor pointer
                                    width 24%
                                    margin 0.5%
                                    float left
                                    text-align center
                                    border 1px solid rgba(246,245,245,1)
                                    box-shadow 0px 0px 20px 1px rgba(176,192,237,0.42)
                                    background rgba(255,255,255,1)
                                    padding 10px 20px
                                    border-radius 3px
                                    span
                                        font-size 20px
                                        font-weight 500
                                        color rgba(55,57,76,1)
                                        line-height 25px
                                        text-align center
                                    &-one-active
                                        border 4px solid rgba(1,70,191,1)
                                    &-two-active
                                        border 4px solid rgba(255,98,108,1)
                                    &-box
                                        display flex
                                        justify-content space-between
                                        padding-top 10px
                                        &-item
                                            width 25px
                                            height 12px
                                            background rgba(221,233,253,1)
                                            border-radius 3px
                                            &-one-active
                                                background rgba(46,189,65,1)
                                            &-two-active
                                                background rgba(77,161,255,1)
                                            &-three-active
                                                background rgba(255,142,59,1)
                                            &-four-active
                                                background rgba(105,1,191,1)
                            .content-nocard
                                text-align center
                                padding 20px
                    // 房间
                    .tab-return
                        margin 20px 0
                        height 84px
                        background rgba(62,130,254,0.1)
                        display flex
                        justify-content space-between
                        align-items center
                        padding 0 10px
                        &-title
                            img
                                vertical-align middle
                            span
                                font-size 24px
                                font-weight 600
                                color rgba(57,60,65,1)
                                margin-left 20px
                                line-height 84px
                        &-icon
                            cursor pointer
                            .el-icon-back
                                border-radius 3px 0px 0px 3px
                                border 2px solid rgba(62,130,254,1)
                                color #3E82FE
                                line-height 24px
                                text-align center
                                font-weight bold
                                padding 0 4px
                                font-size 14px
                            span
                                padding 6px
                                background rgba(62,130,254,1)
                                border-radius 0px 3px 3px 0px
                                font-size 14px
                                color rgba(255,255,255,1)
                    .tab-home
                        padding-bottom 10px
        .el-dialog__header
            border-bottom 1px solid #E4E7EC
        .el-dialog__body
            padding 10px 20px
            .el-button
                width 100%
                border 1px dashed #1890ff
                background #e8f4ff
                .el-icon-plus
                    margin-right 20px
                    color #1890ff
                span
                    color #1890ff
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
            color rgba(55,57,76,1);
        .dialog-main
            &-list
                .dialog-list
                    margin-top 5px
                    &-itemOne
                        font-size 16px
                        font-weight 600
                    &-itemTwo
                        font-size 12px
                        color rgba(165,173,186,1)
                        margin-left 10px
                padding-bottom 10px
                border-bottom 1px solid rgba(165,173,186,1)
        .dialog-footer
            .dialog-footer-btnone
                background rgba(165,173,186,1)
                color rgba(123,123,123,1)
            .dialog-footer-btntwo
                background linear-gradient(45deg,rgba(30,208,255,1) 0%,rgba(43,123,255,1) 100%)
                color rgba(255,255,255,1)
        .el-form-item--small.el-form-item
            margin-bottom 10px
        .dialog-input
            display flex
        // 更新历史
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