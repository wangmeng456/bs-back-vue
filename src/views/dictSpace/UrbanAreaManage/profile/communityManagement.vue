<template lang="pug">
    .page-box-three
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
                                nobr 小区类型:
                            span {{houseMainLeft.data.zoneTypeName}}
                        .house-main-left-list
                            .introduce
                                nobr 小区地址:
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
                //- 楼宇列表
                .tab-content(v-if="tabData.activeIndex === 0")
                    .tab-top
                        .tab-add
                            el-button(type="primary" icon="el-icon-plus" @click="addGrid") 添加楼宇
                    .tab-bottom
                        .tab-table
                            el-table(v-loading="tableLoading" :data="tableData.data.rows" max-height="390px")
                                el-table-column(prop="zoneName" label="楼宇名称")
                                el-table-column(prop="zoneTypeName" label="楼宇类型")
                                el-table-column(prop="roomCnt" label="房屋套数")
                                el-table-column(prop="famCnt" label="住户数" v-if="zoneTypeId === 1200 || zoneTypeId === 1000 || zoneTypeId === 2000 || zoneTypeId === 2100 || zoneTypeId === 3000 || zoneTypeId === 3100 || zoneTypeId === 4000")
                                el-table-column(prop="peoCnt" label="人口数" v-if="zoneTypeId === 1200 || zoneTypeId === 1000 || zoneTypeId === 2000 || zoneTypeId === 2100 || zoneTypeId === 3000 || zoneTypeId === 3100 || zoneTypeId === 4000")
                                el-table-column(prop="busiCnt" label="商户数" v-if="zoneTypeId === 1100 || isFlag === 1")
                                el-table-column(prop="address" label="地址")
                        .tab-pagination(v-if="tableData.data.total > 0")
                            el-pagination(:total="tableData.data.total" layout="prev, pager, next, total, jumper" :page.sync="tableData.postData.pageNum" :limit.sync="tableData.postData.pageSize" @pagination="getChildList")
                //- 异网竞争信息
                .tab-content(v-else-if="tabData.activeIndex === 1")
                    .tab-top
                        .tab-add
                            el-button(type="primary" icon="el-icon-edit" @click="communityEdit") 编辑
                    .tab(v-loading="otherNetCompetition")
                        .tab-center
                            .tab-left
                                .tab-image
                                    img(src="~@/assets/image/dictSpace/UrbanAreaManage/icon-community-1.png")
                                .tab-font 异网渠道信息
                            .tab-right
                                .tab-table
                                    el-table(:data="getOtherNetCompetition.data.otherNetChannel" max-height="390px")
                                        el-table-column(label="异网进驻情况")
                                            template(slot-scope="scope") {{cptrType[scope.row.cptrType-1]}}
                                        el-table-column(prop="channelInfo" label="渠道信息描述")
                        .tab-center
                            .tab-left
                                .tab-image
                                    img(src="~@/assets/image/dictSpace/UrbanAreaManage/icon-community-2.png")
                                .tab-font 运营商资源情况
                            .tab-right
                                .tab-table
                                    el-table(:data="getOtherNetCompetition.data.serviceProvider" max-height="390px")
                                        el-table-column(label="异网进驻情况")
                                            template(slot-scope="scope") {{cptrType[scope.row.cptrType-1]}}
                                        el-table-column(prop="userCnt" label="用户数")
                        .tab-center
                            .tab-left
                                .tab-image
                                    img(src="~@/assets/image/dictSpace/UrbanAreaManage/icon-community-3.png")
                                .tab-font 异网客户经理
                            .tab-right
                                .tab-table
                                    el-table(:data="getOtherNetCompetition.data.otherNetManager" max-height="390px")
                                        el-table-column(label="异网进驻情况")
                                            template(slot-scope="scope") {{cptrType[scope.row.cptrType-1]}}
                                        el-table-column(prop="otherManager" label="姓名")
                                        el-table-column(prop="otherManagerTel" label="联系方式")
                //- 营销信息
                .tab-content(v-else-if="tabData.activeIndex === 2")
                    .tab-top
                        .tab-add
                            el-button(type="primary" icon="el-icon-edit" @click="editMarketInfo") 编辑
                    .tab-box(v-loading="marketingInfo")
                        .tab-list
                            .tab-item 楼盘交付时间：
                                span {{getMarketingInfo.data.deliveryTime}}
                            .tab-item 小区责任人：
                                span {{getMarketingInfo.data.owner}}
                            .tab-item 结对门店：
                                span {{getMarketingInfo.data.pairStore}}
                        .tab-list
                            .tab-item 物业公司：
                                span {{getMarketingInfo.data.pmc}}
                            .tab-item 物业联系人：
                                span {{getMarketingInfo.data.pmcStaff}}
                            .tab-item 物业联系方式：
                                span {{getMarketingInfo.data.pmcStaffTel}}
                    //- .tab-unbox(v-if="JSON.stringify(getMarketingInfo.data) == '{}'") 暂无数据
        //- 编辑基本信息
        el-dialog(title="编辑基本信息" :visible.sync="dialogData.dialogAreaEdit" @close='closeAreaDialog')
            .dialog-header
                span 提交人：{{houseMainLeft.data.deptName}}-{{houseMainLeft.data.staffName}}（{{houseMainLeft.data.staffId}}）
                span(v-if="houseMainLeft.data.status === '1'" class="status") 审批中
            .dialog-main
                el-form(label-position="labelPosition" label-width="100px" :model="dialogData.houseMainLeft" :rules="rules.edit" ref="postData")
                    el-form-item(label="小区名称" prop="zoneName")
                        el-input(v-model="dialogData.houseMainLeft.data.zoneName" placeholder="请输入小区名称")
                    el-form-item(label="小区类型:")
                        span {{houseMainLeft.data.zoneTypeName}}
                    el-form-item(label="小区地址:")
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
        //- 添加楼宇
        el-dialog(title="添加楼宇" :visible.sync="dialogData.addGrid.dialogAreaGrid" @close="closeGridDialog")
            .dialog-main
                el-form(label-position="labelPosition" label-width="100px" :model="dialogData.addGrid" :rules="rules.grid" ref="postData")
                    el-form-item(label="楼宇名称:" prop="gridName")
                        el-input(v-model="dialogData.addGrid.gridName" placeholder="请输入楼宇名称")
                    el-form-item(label="楼宇类型:")
                        el-select(v-model="dialogData.addGrid.gridType" placeholder="请选择楼宇类型" @change="zoneTypeHandle")
                            el-option(v-for="(item,index) in dialogData.addGrid.data" :key="index" :label="item.zoneTypeName" :value="item.zoneTypeId")
                    el-form-item(label="楼宇地址:" prop="gridHouse")
                        el-input(v-model="dialogData.addGrid.gridHouse" placeholder="请输入楼宇地址")
                    el-form-item(label="上级经营单元:")
                        span {{houseMainLeft.data.zoneName}}
            .dialog-footer(slot="footer")
                el-button(class="dialog-footer-btntwo" @click="preservationAddGrid") 保 存
        //- 编辑营销信息
        el-dialog(title="编辑营销信息" :visible.sync="dialogData.updateMarketingInfo.dialogMarketingInfo" @close="closeMarketDialog")
            .dialog-main
                el-form(label-position="labelPosition" label-width="110px" :model="dialogData.updateMarketingInfo" :rules="rules.market" ref="postData")
                    el-form-item(label="楼盘交付时间:" prop="deliveryTime")
                        el-date-picker(v-model="dialogData.updateMarketingInfo.deliveryTime" type="date" placeholder="选择楼盘交付时间" value-format="yyyy-MM-dd" format="yyyy-MM-dd" @change="selectTime(dialogData.updateMarketingInfo.deliveryTime)")
                    el-form-item(label="小区责任人:" prop="owner")
                        el-input(v-model="dialogData.updateMarketingInfo.owner" placeholder="请输入小区责任人")
                    el-form-item(label="结对门店:" prop="pairStore")
                        el-input(v-model="dialogData.updateMarketingInfo.pairStore" placeholder="请输入结对门店")
                    el-form-item(label="物业公司:" prop="pmc")
                        el-input(v-model="dialogData.updateMarketingInfo.pmc" placeholder="请输入物业公司")
                    el-form-item(label="物业联系人:" prop="pmcStaff")
                        el-input(v-model="dialogData.updateMarketingInfo.pmcStaff" placeholder="请输入物业联系人")
                    el-form-item(label="物业联系方式:" prop="pmcStaffTel")
                        el-input(v-model="dialogData.updateMarketingInfo.pmcStaffTel" placeholder="请输入物业联系方式")
            .dialog-footer(slot="footer")
                el-button(class="dialog-footer-btntwo" @click="updateMarketingInfo") 保 存
        //- 编辑竞争信息
        el-dialog(title="编辑竞争信息" :visible.sync="dialogData.dialogCommunityEdit" @close="closeCommunityDialog")
            .dialog-header
                span(v-if="getOtherNetCompetition.data.status === '1'") 提交人：{{getOtherNetCompetition.data.deptName}}-{{getOtherNetCompetition.data.staffName}}（{{getOtherNetCompetition.data.staffId}}）
                span(v-if="getOtherNetCompetition.data.status === '1'" class="status") 审批中
            .dialog-main
                .tab-center
                    .tab-left
                        .tab-image
                            img(src="~@/assets/image/dictSpace/UrbanAreaManage/icon-community-1.png")
                        .tab-font 异网渠道信息
                    .tab-right
                        el-form(label-position="labelPosition" :model="dialogData.editCommunity.dynamicItemOne" v-for="(item,index) in dialogData.editCommunity.dynamicItemOne.otherNetChannel")
                            .tab-item
                                el-select(v-model="item.cptrType" placeholder="请选择异网进驻情况" @change="oneOtherNetChannel($event,index)")
                                    el-option(v-for="(item,index) in dialogData.editCommunity.option" :key="index" :label="item.label" :value="item.value")
                            .tab-item
                                el-form-item
                                    el-input(v-model="item.channelInfo" placeholder="请输入渠道信息描述")
                            .tab-item
                                .tab-item-img
                                    img(src="~@/assets/image/dictSpace/UrbanAreaManage/icon-add.png" @click="addFormOne")
                                    img(src="~@/assets/image/dictSpace/UrbanAreaManage/icon-reduce.png" :class="{'img-vis': dialogData.editCommunity.dynamicItemOne.otherNetChannel.length<2}" @click="deleteOne(item,index)")
                        div(v-if="!dialogData.editCommunity.flag" v-for="(item, index) in dialogData.editCommunity.postData.otherNetChannel" :key="index")
                            el-form(label-position="labelPosition" :model="dialogData.editCommunity.postData" :rules="rules.community" ref="postData")
                                .tab-item
                                    el-select(v-model="item.cptrType" placeholder="请选择异网进驻情况" @change="otherNetChannel($event,index)")
                                        el-option(v-for="(item,index) in dialogData.editCommunity.option" :key="index" :label="item.label" :value="item.value")
                                .tab-item
                                    el-form-item
                                        el-input(v-model="item.channelInfo" placeholder="请输入渠道信息描述")
                                .tab-item
                                    .tab-item-img
                                        img(src="~@/assets/image/dictSpace/UrbanAreaManage/icon-add.png" @click="addFormOne")
                                        img(src="~@/assets/image/dictSpace/UrbanAreaManage/icon-reduce.png" @click="deleteFormOne(item,index)")
                .tab-center
                    .tab-left
                        .tab-image
                            img(src="~@/assets/image/dictSpace/UrbanAreaManage/icon-community-2.png")
                        .tab-font 运营商资源情况
                    .tab-right
                        el-form(label-position="labelPosition" :model="dialogData.editCommunity.dynamicItemOne" v-for="(item,index) in dialogData.editCommunity.dynamicItemOne.serviceProvider")
                            .tab-item
                                el-select(v-model="item.cptrType" placeholder="请选择异网进驻情况" @change="oneServiceProvider($event,index)")
                                    el-option(v-for="(item,index) in dialogData.editCommunity.option" :key="index" :label="item.label" :value="item.value")
                            .tab-item
                                el-form-item
                                    el-input(v-model="item.userCnt" placeholder="请输入用户数")
                            .tab-item
                                .tab-item-img
                                    img(src="~@/assets/image/dictSpace/UrbanAreaManage/icon-add.png" @click="addFormTwo")
                                    img(src="~@/assets/image/dictSpace/UrbanAreaManage/icon-reduce.png" :class="{'img-vis': dialogData.editCommunity.dynamicItemOne.serviceProvider.length<2}" @click="deleteTwo(item,index)")
                        div(v-if="!dialogData.editCommunity.flagTwo" v-for="(item, index) in dialogData.editCommunity.postData.serviceProvider" :key="index")
                            el-form(label-position="labelPosition" :model="dialogData.editCommunity.postData" :rules="rules.community" ref="postData")
                                .tab-item
                                    el-select(v-model="item.cptrType" placeholder="请选择异网进驻情况" @change="serviceProvider($event,index)")
                                        el-option(v-for="(item,index) in dialogData.editCommunity.option" :key="index" :label="item.label" :value="item.value")
                                .tab-item
                                    el-form-item
                                        el-input(v-model="item.userCnt" placeholder="请输入用户数")
                                .tab-item
                                    .tab-item-img
                                        img(src="~@/assets/image/dictSpace/UrbanAreaManage/icon-add.png" @click="addFormTwo")
                                        img(src="~@/assets/image/dictSpace/UrbanAreaManage/icon-reduce.png" @click="deleteFormTwo(item,index)")
                .tab-center
                    .tab-left
                        .tab-image
                            img(src="~@/assets/image/dictSpace/UrbanAreaManage/icon-community-3.png")
                        .tab-font 异网客户经理
                    .tab-right
                        el-form(label-position="labelPosition" :model="dialogData.editCommunity.dynamicItemOne" v-for="(item,index) in dialogData.editCommunity.dynamicItemOne.otherNetManager")
                            .tab-item
                                el-select(v-model="item.cptrType" placeholder="请选择异网进驻情况" @change="oneOtherNetManager($event,index)")
                                    el-option(v-for="(item,index) in dialogData.editCommunity.option" :key="index" :label="item.label" :value="item.value")
                            .tab-item
                                el-form-item
                                    el-input(v-model="item.otherManager" placeholder="请输入姓名")
                            .tab-item
                                el-form-item
                                    el-input(v-model="item.otherManagerTel" placeholder="请输入联系方式")
                            .tab-item
                                .tab-item-img
                                    img(src="~@/assets/image/dictSpace/UrbanAreaManage/icon-add.png" @click="addFormThree")
                                    img(src="~@/assets/image/dictSpace/UrbanAreaManage/icon-reduce.png" :class="{'img-vis': dialogData.editCommunity.dynamicItemOne.otherNetManager.length<2}" @click="deleteThree(item,index)")
                        div(v-if="!dialogData.editCommunity.flagThree" v-for="(item, index) in dialogData.editCommunity.postData.otherNetManager" :key="index")
                            el-form(label-position="labelPosition" :model="dialogData.editCommunity.postData" :rules="rules.community" ref="postDataThree")
                                .tab-item
                                    el-select(v-model="item.cptrType" placeholder="请选择异网进驻情况" @change="otherNetManager($event,index)")
                                        el-option(v-for="(item,index) in dialogData.editCommunity.option" :key="index" :label="item.label" :value="item.value")
                                .tab-item
                                    el-form-item
                                        el-input(v-model="item.otherManager" placeholder="请输入姓名")
                                .tab-item
                                    el-form-item
                                        el-input(v-model="item.otherManagerTel" placeholder="请输入联系方式")
                                .tab-item
                                    .tab-item-img
                                        img(src="~@/assets/image/dictSpace/UrbanAreaManage/icon-add.png" @click="addFormThree")
                                        img(src="~@/assets/image/dictSpace/UrbanAreaManage/icon-reduce.png" @click="deleteFormThree(item,index)")
            .dialog-footer(slot="footer" v-if="getOtherNetCompetition.data.status === '1'")
                el-button(class="dialog-footer-btntwo" @click="updateOtherNetCompetition") 拿 回
                el-button(class="dialog-footer-btnone" :disabled="true") 保 存
            .dialog-footer(slot="footer" v-if="getOtherNetCompetition.data.status === '0'")
                el-button(class="dialog-footer-btnone" :disabled="true") 拿 回
                el-button(class="dialog-footer-btntwo" @click="addOtherNetCompetition") 保 存
            .dialog-footer(slot="footer" v-if="getOtherNetCompetition.data.status !== '0' || getOtherNetCompetition.data.status !== '1'")
                el-button(class="dialog-footer-btntwo" @click="addOtherNetCompetition") 保 存
</template>

<script>
    import { UrbanAreaManage } from "@/api/dictSpace/UrbanAreaManage";
    export default {
        name: "communityManagement",
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
                        return callback(new Error('请输入物业联系方式'));
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
                // 异网竞争信息
                otherNetCompetition: false,
                getOtherNetCompetition: {
                    postData:{
                        zoneId: null,
                    },
                    data: {}
                },
                cptrType: ['联通','移动','华数','其他'],
                // 营销信息
                marketingInfo: false,
                getMarketingInfo: {
                    postData:{
                        zoneId: null,
                    },
                    data: {}
                },
                // 标签页切换
                tabData: {
                    // 标题切换索引
                    activeIndex: 0,
                    tabMenuListData: [
                        {name: "楼宇列表", data: 0},
                        {name: "异网竞争信息", data: 1},
                        {name: "营销信息", data: 2}
                    ],
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
                    // 添加楼宇
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
                    // 编辑异网信息
                    dialogCommunityEdit: false,
                    editCommunity:{
                        dynamicItemOne: {
                            otherNetChannel:[],
                            otherNetManager: [],
                            serviceProvider: []
                        },
                        option: [
                            {label:'联通', value:1},
                            {label:'移动', value:2},
                            {label:'华数', value:3},
                            {label:'其他', value:4}
                        ],
                        postData: {
                            zoneId: null,
                            otherNetChannel: [],
                            otherNetManager: [],
                            serviceProvider: []
                        },
                        flag: true,
                        flagTwo: true,
                        flagThree: true,
                        updateOtherNetCompetition: {
                            zoneId: null
                        }
                    },
                    // 编辑营销信息
                    updateMarketingInfo: {
                        dialogMarketingInfo: false,
                        deliveryTime: '',
                        owner: '',
                        pairStore: '',
                        pmc: '',
                        pmcStaff: '',
                        pmcStaffTel: '',
                        data: [],
                        postData: {
                            zoneId: '',
                            deliveryTime: '',
                            owner: '',
                            pairStore: '',
                            pmc: '',
                            pmcStaff: '',
                            pmcStaffTel: ''
                        }
                    }
                },
                // 表单规则验证
                rules: {
                    edit: {
                        zoneName: [
                            { required: true, message: '请输入小区名称', trigger: 'blur' }
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
                            { required: true, message: '请输入楼宇名称', trigger: 'blur' }
                        ],
                        gridHouse: [
                            { required: true, message: '请输入楼宇地址', trigger: 'blur' }
                        ],
                    },
                    market: {
                        owner: [
                            { required: true, message: '请输入小区责任人', trigger: 'blur' }
                        ],
                        pairStore: [
                            { required: true, message: '请输入结对门店', trigger: 'blur' }
                        ],
                        pmc: [
                            { required: true, message: '请输入物业公司', trigger: 'blur' }
                        ],
                        pmcStaff: [
                            { required: true, message: '请输入物业联系人', trigger: 'blur' }
                        ],
                        pmcStaffTel: [
                            { required: true, validator: checkPhone, trigger: 'blur' }
                        ]
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
                me.tableData.postData.zoneId = val;
                me.getPageData();
            },
            zoneTypeId(val) {
                const me = this;
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
                me.getZoneBaseInfo();
                me.getZoneMarketInfo();
                me.getZoneNetInfo();
                me.getChildList();
                me.getOtherNetCompetitions();
                me.getMarketingInfos();
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
                }else if(data === 1){
                    me.getOtherNetCompetitions();
                }else if(data === 2){
                    me.getMarketingInfos();
                }
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
            // 添加楼宇
            addGrid() {
                const me = this;
                me.dialogData.addGrid.dialogAreaGrid = true;
                me.getZoneType(3);
            },
            closeGridDialog(){
                const me = this;
                me.getZoneType(3);
                me.dialogData.addGrid.gridName = '';
                me.dialogData.addGrid.gridHouse = '';
            },
            preservationAddGrid() {
                const me = this;
                me.dialogData.addGrid.postData.zoneName = me.dialogData.addGrid.gridName;
                me.dialogData.addGrid.postData.zoneAddress = me.dialogData.addGrid.gridHouse;
                me.dialogData.addGrid.postData.parentZoneId = me.houseMainLeft.data.zoneId;
                me.dialogData.addGrid.postData.upUnit = me.houseMainLeft.data.zoneName;
                console.log(me.dialogData.addGrid.postData);
                me.$refs["postData"].validate((valid) => {
                    if (valid) {
                        this.$confirm('是否确定创建名为'+me.dialogData.addGrid.postData.zoneName+'的网格?','提示', {
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
                            me.getZoneType(3);
                            me.dialogData.addGrid.gridName = '';
                            me.dialogData.addGrid.gridHouse = '';
                            this.dialogData.addGrid.dialogAreaGrid = true;
                        });
                    }else{
                        return false;
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
            // 查询异网竞争信息
            getOtherNetCompetitions(){
                const me = this;
                me.getOtherNetCompetition.postData.zoneId = me.zoneId;
                console.log(me.getOtherNetCompetition.postData);
                me.otherNetCompetition = true;
                UrbanAreaManage.getOtherNetCompetitions(me.getOtherNetCompetition.postData)
                    .then(res => {
                        me.getOtherNetCompetition.data = res.data.data;
                        console.log(me.getOtherNetCompetition.data)
                    })
                    .finally(()=>{
                        me.otherNetCompetition = false;
                    })
            },
            // 编辑异网信息 
            communityEdit(){
                const me = this;
                me.dialogData.dialogCommunityEdit = true;
                me.dialogData.editCommunity.postData.zoneId = me.zoneId;
                if(JSON.stringify(me.getOtherNetCompetition.data) === '{}'){
                    me.dialogData.editCommunity.dynamicItemOne.otherNetChannel.push({
                        typeId: 1,
                        channelInfo: '',
                        cptrType: undefined
                    })
                    me.dialogData.editCommunity.dynamicItemOne.serviceProvider.push({
                        typeId: 2,
                        userCnt: undefined,
                        cptrType: undefined
                    })
                    me.dialogData.editCommunity.dynamicItemOne.otherNetManager.push({
                        typeId: 3,
                        otherManager: '',
                        otherManagerTel: '',
                        cptrType: undefined
                    })
                } else {
                    for(let i=0; i<me.getOtherNetCompetition.data.otherNetChannel.length; i++){
                        me.dialogData.editCommunity.dynamicItemOne.otherNetChannel.push({
                            typeId: 1,
                            channelInfo: me.getOtherNetCompetition.data.otherNetChannel[i].channelInfo,
                            cptrType: me.getOtherNetCompetition.data.otherNetChannel[i].cptrType
                        })
                    }
                    for(let i=0; i<me.getOtherNetCompetition.data.serviceProvider.length; i++){
                        me.dialogData.editCommunity.dynamicItemOne.serviceProvider.push({
                            typeId: 2,
                            userCnt: me.getOtherNetCompetition.data.serviceProvider[i].userCnt,
                            cptrType: me.getOtherNetCompetition.data.serviceProvider[i].cptrType
                        })
                    }
                    for(let i=0; i<me.getOtherNetCompetition.data.otherNetManager.length; i++){
                        me.dialogData.editCommunity.dynamicItemOne.otherNetManager.push({
                            typeId: 3,
                            otherManager: me.getOtherNetCompetition.data.otherNetManager[i].otherManager,
                            otherManagerTel: me.getOtherNetCompetition.data.otherNetManager[i].otherManagerTel,
                            cptrType: me.getOtherNetCompetition.data.otherNetManager[i].cptrType
                        })
                    }
                }
            },
            closeCommunityDialog(){
                const me = this;
                me.dialogData.editCommunity.dynamicItemOne.otherNetChannel = [];
                me.dialogData.editCommunity.dynamicItemOne.serviceProvider = [];
                me.dialogData.editCommunity.dynamicItemOne.otherNetManager = [];
                me.dialogData.editCommunity.postData.otherNetChannel = [];
                me.dialogData.editCommunity.postData.serviceProvider = [];
                me.dialogData.editCommunity.postData.otherNetManager = [];
            },
            addFormOne(){
                const me = this;
                me.dialogData.editCommunity.postData.otherNetChannel.push({
                    typeId: 1,
                    channelInfo: '',
                    cptrType: undefined
                })
                me.dialogData.editCommunity.flag = false;
            },
            deleteFormOne (item, index) {
                const me = this;
                me.dialogData.editCommunity.postData.otherNetChannel.splice(index, 1)
            },
            deleteOne(item, index){
                const me = this;
                if(me.dialogData.editCommunity.dynamicItemOne.otherNetChannel.length>1){
                    me.dialogData.editCommunity.dynamicItemOne.otherNetChannel.splice(index, 1)
                }
            },
            oneOtherNetChannel(vId,index){
                const me = this;
                me.dialogData.editCommunity.dynamicItemOne.otherNetChannel[index].cptrType = vId;
            },
            otherNetChannel(vId,index){
                const me = this;
                me.dialogData.editCommunity.postData.otherNetChannel[index].cptrType = vId;
            },
            addFormTwo(){
                const me = this;
                me.dialogData.editCommunity.postData.serviceProvider.push({
                    typeId: 2,
                    userCnt: undefined,
                    cptrType: undefined
                })
                me.dialogData.editCommunity.flagTwo = false;
            },
            deleteFormTwo (item, index) {
                const me = this;
                me.dialogData.editCommunity.postData.serviceProvider.splice(index, 1)
            },
            deleteTwo(item, index){
                const me = this;
                if(me.dialogData.editCommunity.dynamicItemOne.serviceProvider.length>1){
                    me.dialogData.editCommunity.dynamicItemOne.serviceProvider.splice(index, 1)
                }
            },
            oneServiceProvider(vId,index){
                const me = this;
                me.dialogData.editCommunity.dynamicItemOne.serviceProvider[index].cptrType = vId;
            },
            serviceProvider(vId,index){
                const me = this;
                me.dialogData.editCommunity.postData.serviceProvider[index].cptrType = vId;
            },
            addFormThree(){
                const me = this;
                me.dialogData.editCommunity.postData.otherNetManager.push({
                    typeId: 3,
                    otherManager: '',
                    otherManagerTel: '',
                    cptrType: undefined
                })
                me.dialogData.editCommunity.flagThree = false;
            },
            deleteFormThree (item, index) {
                const me = this;
                me.dialogData.editCommunity.postData.otherNetManager.splice(index, 1)
            },
            deleteThree(item, index){
                const me = this;
                if(me.dialogData.editCommunity.dynamicItemOne.otherNetManager.length>1){
                    me.dialogData.editCommunity.dynamicItemOne.otherNetManager.splice(index, 1)
                }
            },
            oneOtherNetManager(vId,index){
                const me = this;
                me.dialogData.editCommunity.dynamicItemOne.otherNetManager[index].cptrType = vId;
                console.log(vId,index)
            },
            otherNetManager(vId,index){
                const me = this;
                me.dialogData.editCommunity.postData.otherNetManager[index].cptrType = vId;
            },
            // 编辑异网竞争信息-保存
            addOtherNetCompetition(){
                const me = this;
                let arr = me.dialogData.editCommunity.dynamicItemOne.otherNetChannel.concat(me.dialogData.editCommunity.postData.otherNetChannel);
                me.dialogData.editCommunity.postData.otherNetChannel = arr;
                for(let i=0; i<me.dialogData.editCommunity.postData.serviceProvider.length; i++){
                    me.dialogData.editCommunity.postData.serviceProvider[i].userCnt = Number(me.dialogData.editCommunity.postData.serviceProvider[i].userCnt)
                }
                let brr = me.dialogData.editCommunity.dynamicItemOne.serviceProvider.concat(me.dialogData.editCommunity.postData.serviceProvider);
                me.dialogData.editCommunity.postData.serviceProvider = brr;
                let crr = me.dialogData.editCommunity.dynamicItemOne.otherNetManager.concat(me.dialogData.editCommunity.postData.otherNetManager);
                me.dialogData.editCommunity.postData.otherNetManager = crr;
                UrbanAreaManage.addOtherNetCompetition(me.dialogData.editCommunity.postData)
                    .then(res => {
                        me.$message({
                            type: 'success',
                            message: res.msg,
                        });
                        me.getOtherNetCompetition.data.status === 0;
                        me.getOtherNetCompetitions();
                        me.dialogData.dialogCommunityEdit = false;
                    })
            },
            // 编辑异网竞争信息-拿回
            updateOtherNetCompetition(){
                const me = this;
                me.dialogData.editCommunity.updateOtherNetCompetition.zoneId = me.zoneId;
                console.log(me.dialogData.editCommunity.updateOtherNetCompetition)
                me.$refs["postData"].validate((valid) => {
                    if (valid) {
                        UrbanAreaManage.updateOtherNetCompetition(me.dialogData.editCommunity.updateOtherNetCompetition)
                            .then(res => {
                                me.$message({
                                    type: 'success',
                                    message: res.msg,
                                });
                                me.dialogData.dialogCommunityEdit = false;
                            })
                        me.getOtherNetCompetitions();
                    }else{
                        return false;
                    }
                })
            },
            // 查询营销信息
            getMarketingInfos(){
                const me = this;
                me.getMarketingInfo.postData.zoneId = me.zoneId;
                me.marketingInfo = true;
                UrbanAreaManage.getMarketingInfos(me.getMarketingInfo.postData)
                    .then(res => {
                        me.getMarketingInfo.data = res.data;
                        console.log(res.data)
                        if(JSON.stringify(me.getMarketingInfo.data) == '{}'){
                            me.$set(me.getMarketingInfo.data, 'deliveryTime', '-')
                            me.$set(me.getMarketingInfo.data, 'owner', '-')
                            me.$set(me.getMarketingInfo.data, 'pairStore', '-')
                            me.$set(me.getMarketingInfo.data, 'pmc', '-')
                            me.$set(me.getMarketingInfo.data, 'pmcStaff', '-')
                            me.$set(me.getMarketingInfo.data, 'pmcStaffTel', '-')
                        }
                    })
                    .finally(()=>{
                        me.marketingInfo = false;
                    })
            },
            // 编辑营销信息
            editMarketInfo(){
                const me = this;
                me.dialogData.updateMarketingInfo.deliveryTime = me.getMarketingInfo.data.deliveryTime;
                me.dialogData.updateMarketingInfo.owner = me.getMarketingInfo.data.owner;
                me.dialogData.updateMarketingInfo.pairStore = me.getMarketingInfo.data.pairStore;
                me.dialogData.updateMarketingInfo.pmc = me.getMarketingInfo.data.pmc;
                me.dialogData.updateMarketingInfo.pmcStaff = me.getMarketingInfo.data.pmcStaff;
                me.dialogData.updateMarketingInfo.pmcStaffTel = me.getMarketingInfo.data.pmcStaffTel;
                me.dialogData.updateMarketingInfo.dialogMarketingInfo = true;
            },
            closeMarketDialog(){
                const me = this;
                me.dialogData.updateMarketingInfo.deliveryTime = me.getMarketingInfo.data.deliveryTime;
                me.dialogData.updateMarketingInfo.owner = me.getMarketingInfo.data.owner;
                me.dialogData.updateMarketingInfo.pairStore = me.getMarketingInfo.data.pairStore;
                me.dialogData.updateMarketingInfo.pmc = me.getMarketingInfo.data.pmc;
                me.dialogData.updateMarketingInfo.pmcStaff = me.getMarketingInfo.data.pmcStaff;
                me.dialogData.updateMarketingInfo.pmcStaffTel = me.getMarketingInfo.data.pmcStaffTel;
            },
            updateMarketingInfo(){
                const me = this;
                me.dialogData.updateMarketingInfo.postData.zoneId = me.zoneId;
                me.dialogData.updateMarketingInfo.postData.deliveryTime = me.dialogData.updateMarketingInfo.deliveryTime;
                me.dialogData.updateMarketingInfo.postData.owner = me.dialogData.updateMarketingInfo.owner;
                me.dialogData.updateMarketingInfo.postData.pairStore = me.dialogData.updateMarketingInfo.pairStore;
                me.dialogData.updateMarketingInfo.postData.pmc = me.dialogData.updateMarketingInfo.pmc;
                me.dialogData.updateMarketingInfo.postData.pmcStaff = me.dialogData.updateMarketingInfo.pmcStaff;
                me.dialogData.updateMarketingInfo.postData.pmcStaffTel = me.dialogData.updateMarketingInfo.pmcStaffTel;
                me.$refs["postData"].validate((valid) => {
                    if (valid) {
                        UrbanAreaManage.updateMarketingInfo(me.dialogData.updateMarketingInfo.postData)
                            .then((res)=>{
                                me.$message({
                                    type: 'success',
                                    message: res.msg,
                                });
                                me.dialogData.updateMarketingInfo.dialogMarketingInfo = false;
                            })
                        me.getMarketingInfos();
                    }else{
                        return false;
                    }
                })
            },
            selectTime(time){
                const me = this;
                me.dialogData.updateMarketingInfo.deliveryTime = time;
            },
        }
    }
</script>

<style lang="stylus">
    @import '~@/assets/styles/mixin.styl'
    .page-box-three
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
                    for index in 1 2 3
                        &:nth-child({index})
                        &:active
                            background url('~@/assets/image/dictSpace/UrbanAreaManage/icon-tabthree-' + index + '.png') 40px center no-repeat
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
                    // 异网竞争信息
                    .tab-center
                        display flex
                        justify-content space-between
                        .tab-left
                            margin 0 0 20px 0
                            padding 40px 10px 0 0
                            width 16%
                            float left
                            .tab-image
                                text-align center                               
                            .tab-font
                                font-size 14px
                                font-weight 500
                                color rgba(55,57,76,1)
                                text-align center
                        .tab-right
                            margin 0 0 20px 0
                            width 84%
                            float left
                            border-left 1px solid #E5EDF3
                            padding 0 10px
                    // 营销信息
                    .tab-box
                        .tab-list
                            display flex
                            justify-content space-between
                            .tab-item
                                width 33%
                                font-size 14px
                                color rgba(147,158,171,1)
                                line-height 24px
                                span
                                    color rgba(55,57,76,1)
                    .tab-unbox
                        text-align center
                        padding 20px
        // 弹框
        .el-dialog__header
            border-bottom 1px solid #E4E7EC
        .el-dialog__body
            padding 10px 20px
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
        .dialog-footer
            .dialog-footer-btnone
                background rgba(165,173,186,1)
                color rgba(123,123,123,1)
            .dialog-footer-btntwo
                background linear-gradient(45deg,rgba(30,208,255,1) 0%,rgba(43,123,255,1) 100%)
                color rgba(255,255,255,1)
        // 异网渠道信息
        .dialog-main
            .tab-center
                display flex
                justify-content space-between
                border-bottom 1px solid rgba(228,231,236,1)
                padding-top 10px
                .tab-left
                    width 16%
                    float left
                    margin 10px 0
                    .tab-image
                        text-align center                               
                    .tab-font
                        font-size 14px
                        font-weight 500
                        color rgba(55,57,76,1)
                        text-align center
                .tab-right
                    width 84%
                    float left
                    .el-form
                        display flex
                        justify-content space-between
                        .tab-item
                            padding-right 4px
                            &-img
                                width 60px
                                img
                                    margin 2px 2px 0 2px
                                    cursor pointer
                                    .img-vis
                                        visibility hidden
                        
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