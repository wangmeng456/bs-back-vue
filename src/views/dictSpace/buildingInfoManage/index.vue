<template lang="pug">
//- 楼宇信息管理
.building-info-manage
  .page-main
    //- 左侧内容
    .page-list
      .info-per(v-loading="leftData.perLoading")
        .info-text 
          span 信息完整率
          span.text-value {{ leftData.infoPer }}% 
        .info-img
          .img-mask(:style="{ left: leftData.infoPer + '%' }")
      .house-data
        .search-input
          el-input(placeholder="请输入楼宇名称" prefix-icon="el-icon-search" v-model="leftData.listPostData.searchValue" @keyup.enter.native="getbuildingbyname" @change="houseSearchChangeHandle")
        .list-content(v-loading="leftData.listLoading")
          ul.list-data(v-infinite-scroll="getHouseLeftList")
            li.list-item(v-for="(item,index) in leftData.listData.list" :key="index" :class="{ 'list-item-active': leftData.signHouseData.bldg_id === item.bldg_id }" @click="chooseHouseHandle(item)")
              .item-content
                .list-title {{ item.bldg_name }}
                .list-per 
                  .per-title 信息完整率
                  .per-val {{ item.completionRate }}%
          .list-data-none(v-if="leftData.listData.total === 0") 暂无数据
    //- 右侧内容
    .page-details(v-if="leftData.signHouseData")
      .house-details
        .base-info(v-loading="rightData.houseDetailsDataLoading")
          .info-per
            el-progress(type="circle" :stroke-width="10" :width="128" :percentage="rightData.houseDetailsData.completionRate" color="#FF8E3B")
          .info-details
            h4 {{ rightData.houseDetailsData.bldg_name }}
            .info-list
              //- .list-item
                .info-item
                  .item-title 楼宇类型：
                  .item-text {{ houseTypeJson[rightData.houseDetailsData.bldg_type] }}
              .list-item
                .info-item
                  .item-title 上级经营单元：
                  .item-text {{ rightData.houseDetailsData.manage_id }}
              .list-item
                .info-item
                  .item-title 楼宇物管公司：
                  .item-text {{ rightData.houseDetailsData.bldg_roperty }}
              .list-item
                .info-item
                  .item-title 楼宇包含范围：
                  .item-text {{ rightData.houseDetailsData.bldg_area }}
              .list-item
                .info-item
                  .item-title 电信是否与物管公司有合作分成协议：
                  .item-text {{ JSON.stringify(rightData.houseDetailsData) !== "{}" && booleanOptions[rightData.houseDetailsData.is_ptnr].label }}
              .list-item
                .info-item
                  .item-title 楼宇地址：
                  .item-text {{ rightData.houseDetailsData.bldg_add }}
          .info-button
            .button-edit(@click="dialogData.buildingEdit.switch = true") 编辑
            .button-history(@click="getbuildinghistory") 更新历史
        .info-tab
          //- tab 顶部菜单
          .tab-menu
            .menu-item(v-for="(item,index) in rightData.tabData.tabMenuListData" :key="item.data" :class="{ 'menu-item-active': rightData.tabData.activeIndex === item.data }" @click="tabSwitchhandle(item.data)") {{ item.name }}
          .tab-details
            //- 企业客户
            .tab-content(v-if="rightData.tabData.activeIndex === 0")
              .tab-top
                .tab-add
                  el-button(type="primary" icon="el-icon-plus" @click="dialogData.customerMaintain.switch = true") 新增客户
                .tab-search
                  el-input(placeholder="请输入客户名称" prefix-icon="el-icon-search" v-model="rightData.tabData.customerTableData.postData.searchValue")
                  el-button(type="primary" @click="searchCompanyHandle") 搜索
              .tab-bottom
                .tab-table
                  el-table(:data="rightData.tabData.customerTableData.data.list" v-loading="rightData.tabData.customerTableData.loading" max-height="390px")
                    el-table-column(prop="company_name" label="企业客户名称")
                      template(slot-scope="scope")
                        span.jump-link(@click="jumpCompanyView(scope.row)") {{ scope.row.company_name }}
                    el-table-column(prop="company_addr" label="企业客户地址")
                    el-table-column(prop="cust_type" label="类型")
                      template(slot-scope="scope")
                        span {{ custTypeJson[scope.row.cust_type] }}

                    el-table-column(prop="completionRate" label="信息完整率")
                    el-table-column(label="操作")
                      template(slot-scope="scope")
                        el-button(type="primary" @click="getcompanyhistory(scope.row)" round) 更新历史
                .tab-pagination(v-if="rightData.tabData.customerTableData.data.total > 0")
                  pagination(:total="rightData.tabData.customerTableData.data.total" :page.sync="rightData.tabData.customerTableData.postData.pageNum" :limit.sync="rightData.tabData.customerTableData.postData.pageSize" @pagination="getcompanybybldgidandname")
            //- 联系人
            .tab-content(v-else-if="rightData.tabData.activeIndex === 1")
              .tab-top
                .tab-add
                  el-button(type="primary" icon="el-icon-plus" @click="dialogData.contactMaintain.switch = true") 新增联系人
              .tab-table
                el-table(:data="rightData.tabData.contactTableData.data.list" v-loading="rightData.tabData.contactTableData.loading" max-height="380px")
                  el-table-column(prop="contact_name" label="姓名")
                  el-table-column(prop="contact_gender" label="性别")
                    template(slot-scope="scope")
                      span {{ sexJson[scope.row.contact_gender] }}
                  el-table-column(prop="contact_phone" label="联系方式")
                  el-table-column(prop="contact_pstn" label="岗位")
                  el-table-column(prop="prop6" label="操作")
                    template(slot-scope="scope")
                      .button-list
                        el-button(type="primary" plain @click="deleteContactHandle(scope.row)") 删除
                        el-button(type="primary" plain @click="editContactHandle(scope.row)") 编辑
              .tab-pagination(v-if="rightData.tabData.contactTableData.data.total > 0")
                pagination(:total="rightData.tabData.contactTableData.data.total" :page.sync="rightData.tabData.contactTableData.postData.pageNum" :limit.sync="rightData.tabData.contactTableData.postData.pageSize" @pagination="getbuildingcontact")
            //- 楼宇视图
            .tab-content(v-else-if="rightData.tabData.activeIndex === 2")
              //- 楼宇切换模块
              .view-switch(v-if="!rightData.tabData.viewData.detailsSwitch")
                .tab-top(v-loading="rightData.tabData.viewData.totalDataLoading")
                  .count-list
                    .count-item 
                      .item-value {{ rightData.tabData.viewData.totalData.cellUserCount }}
                      .item-text 本网客户数
                    .count-item 
                      .item-value {{ rightData.tabData.viewData.totalData.cellCount }}
                      .item-text 总房间数
                    .count-item 
                      .item-value {{ rightData.tabData.viewData.totalData.permeability }}%
                      .item-text 渗透率
                    .count-item 
                      .item-value {{ rightData.tabData.viewData.totalData.assets }}
                      .item-text 总资产数
                .tab-bottom
                  .unit-list(v-loading="rightData.tabData.viewData.unitListLoading")
                    .unit-item(v-for="(item,index) in rightData.tabData.viewData.unitList" :key="index" :class="{ 'unit-item-active': rightData.tabData.viewData.signUnitData.unitName === item.unitName }" @click="unitSwitchHandle(item)") {{ item.unitName }}
                  .room-content
                    .room-tip
                      .tip-list
                        .tip-item 电信
                        .tip-item 他网
                      .tip-list
                        .tip-item 宽带
                        .tip-item 移动
                        .tip-item 固话
                        .tip-item 天翼高清
                    .room-list(v-loading="rightData.tabData.viewData.roomListLoading")
                      .room-item(v-for="(item,index) in rightData.tabData.viewData.roomList" @click="roomSwitchHandle(item)" :key="index" :class="{ 'room-item-dx': item.dxFlag, 'room-item-tw': !item.dxFlag }")
                        .room-title {{ item.tenementId }}
                        .button-list
                          .button-item(:class="{ 'button-item-kd': item.busiId === 1 }")
                          .button-item(:class="{ 'button-item-yd': item.busiId === 2 }")
                          .button-item(:class="{ 'button-item-gh': item.busiId === 3 }")
                          .button-item(:class="{ 'button-item-tygq': item.busiId === 4 }")
                    .list-data-none 暂无数据
              //- 楼宇切换模块
              .view-switch(v-else)
                .tab-top
                  .room-title
                    .title-text {{ rightData.tabData.viewData.signUnitData.unitName + " " + rightData.tabData.viewData.signRoomData.tenementId }}
                    .title-back(@click="rightData.tabData.viewData.detailsSwitch = false")
                      .back-icon
                        i.el-icon-back
                      .back-text 返回
                .tab-table
                  el-table(:data="rightData.tabData.viewData.roomTableData" v-loading="rightData.tabData.viewData.roomTableDataLoading")
                    el-table-column(type="index" label="序号")
                    el-table-column(prop="vipCustName" label="客户名称")
                    el-table-column(prop="busiId" label="资产类型")
                      template(slot-scope="scope")
                        span {{ scope.row.busiId && businessJson[scope.row.busiId] }}
                    el-table-column(prop="servId" label="资产号码")
            //- 异网竞争信息
            .tab-content(v-else-if="rightData.tabData.activeIndex === 3")
              .tab-form(v-loading="rightData.tabData.differentData.loading")
                el-form(label-width="130px")
                  .form-submit
                    el-button(type="primary" icon="el-icon-s-promotion" @click="addCompetitor") 提交
                  el-form-item(label="异网渠道信息")
                    .operator-list
                      .operator-item(v-for="(item,index) in rightData.tabData.differentData.postData.otherNetChannel" :key="index")
                        el-select(v-model="item.cptrType" placeholder="请选择")
                          el-option(v-for="(operator,index) in operatorOptions" :key="operator.value" :label="operator.label" :value="operator.value")
                        el-input(v-model="item.channelInfo" placeholder="请输入渠道信息描述")
                        .delete-button(title="删除" @click="rightData.tabData.differentData.postData.otherNetChannel.splice(index,1)")
                          i.el-icon-close
                      .add-button(@click="rightData.tabData.differentData.postData.otherNetChannel.push(JSON.parse(JSON.stringify(rightData.tabData.differentData.baseChannelList)))")
                        el-button(type="primary" plain) 添加
                  el-form-item(label="运营商资源情况")
                    .operator-list
                      .operator-item(v-for="(item,index) in rightData.tabData.differentData.postData.serviceProvider" :key="index")
                        el-select(v-model="item.cptrType" placeholder="请选择")
                          el-option(v-for="(operator,index) in operatorOptions" :key="operator.value" :label="operator.label" :value="operator.value")
                        el-input(v-model="item.userCnt" placeholder="请输入用户数")
                        .delete-button(title="删除" @click="rightData.tabData.differentData.postData.serviceProvider.splice(index,1)")
                          i.el-icon-close
                      .add-button(@click="rightData.tabData.differentData.postData.serviceProvider.push(JSON.parse(JSON.stringify(rightData.tabData.differentData.baseOperatorList)))")
                        el-button(type="primary" plain) 添加
                  el-form-item(label="异网客户经理")
                    .operator-list
                      .operator-item(v-for="(item,index) in rightData.tabData.differentData.postData.otherNetCustomer" :key="index")
                        el-select(v-model="item.cptrType" placeholder="请选择")
                          el-option(v-for="(operator,index) in operatorOptions" :key="operator.value" :label="operator.label" :value="operator.value")
                        el-input(v-model="item.userCnt" placeholder="请输入用户数")
                        .delete-button(title="删除" @click="rightData.tabData.differentData.postData.otherNetCustomer.splice(index,1)")
                          i.el-icon-close
                      .add-button(@click="rightData.tabData.differentData.postData.otherNetCustomer.push(JSON.parse(JSON.stringify(rightData.tabData.differentData.baseManagerList)))")
                        el-button(type="primary" plain) 添加
  
      //- 更新历史列表（公用）
      .update-history(v-if="dialogData.updateHistory.switch")
        .history-title
          h3 更新历史 #[span.color-red ({{ dialogData.updateHistory.listData.length }})]
          .close-button(@click="cancelUpdateHistory")
            i.el-icon-close
        .history-content
          .house-title {{ rightData.tabData.customerTableData.signCustomerData.company_name || rightData.houseDetailsData.bldg_name }}
          //- TODO: (v-infinite-scroll="loadUpdateHistoryList" :infinite-scroll-immediate="false")
          ul.history-list
            li.list-item(v-for="(item,index) in dialogData.updateHistory.listData" :key="index")
              .item-title #[span.item-user {{ item.name }}] {{ item.time }}
              .item-details {{ item.text }}
          .list-data-none(v-if="dialogData.updateHistory.listData.length === 0") 暂无数据
      //- 商机调查（公用）
      .business-investigation(v-if="dialogData.businessInvestigation.switch")
        .history-title
          h3 商机调查
          .close-button
            i.el-icon-close
        .history-form
          el-form(ref="businessInvestigationForm" :model="dialogData.businessInvestigation.formParameter" label-position="top")
            el-form-item(label="1、公司网络使用人数规模？")
              el-input(v-model="dialogData.businessInvestigation.formParameter.peopleCount" placeholder="请输入")
            el-form-item(label="2、是否有访问国外网络链路的需求？")
              .select-list
                el-radio-group(v-model="dialogData.businessInvestigation.formParameter.needBoolean")
                  el-radio(v-for="(item,index) in haveOptions" :key="index" :label="item.value") {{ item.label }}
            el-form-item(label="3、是否有配置专职网络管理人员？")
              .select-list
                el-radio-group(v-model="dialogData.businessInvestigation.formParameter.haveConfig")
                  el-radio(v-for="(item,index) in haveOptions" :key="index" :label="item.value") {{ item.label }}
            el-form-item(label="4、贵公司是如何规范员工上网的？")
              .select-list
                el-checkbox-group(v-model="dialogData.businessInvestigation.formParameter.howStandard")
                  el-checkbox(v-for="(item,index) in dialogData.businessInvestigation.howStandardOptions" :key="index" :label="item.value") {{ item.label }}
            el-form-item(label="5、是否需要上下班打卡？")
              .select-list
                el-radio-group(v-model="dialogData.businessInvestigation.formParameter.haveClock")
                  el-radio(v-for="(item,index) in haveOptions" :key="index" :label="item.value") {{ item.label }}
            el-form-item(label="6、出差报销是否需要凭证？")
              .select-list
                el-radio-group(v-model="dialogData.businessInvestigation.formParameter.haveVoucher")
                  el-radio(v-for="(item,index) in haveOptions" :key="index" :label="item.value") {{ item.label }}
            el-form-item(label="7、公司办公使用场地面积？")
              el-input(v-model="dialogData.businessInvestigation.formParameter.area" placeholder="请输入")
            el-form-item(label="8、公司局域网是否信号覆盖不均匀？")
              .select-list
                el-radio-group(v-model="dialogData.businessInvestigation.formParameter.haveVoucher")
                  el-radio(v-for="(item,index) in haveOptions" :key="index" :label="item.value") {{ item.label }}
            el-form-item(label="9、销售人员是否需要常常拜访客户，电话联络客户，公司是否需要对其进行管控？")
              .select-list
                el-radio-group(v-model="dialogData.businessInvestigation.formParameter.haveVoucher")
                  el-radio(v-for="(item,index) in haveOptions" :key="index" :label="item.value") {{ item.label }}
            el-form-item(label="10、公司是否有多个WIFI热点？")
              .select-list
                el-radio-group(v-model="dialogData.businessInvestigation.formParameter.haveVoucher")
                  el-radio(v-for="(item,index) in haveOptions" :key="index" :label="item.value") {{ item.label }}
            el-form-item(label="11、公司局域网信号是否不稳定？")
              .select-list
                el-radio-group(v-model="dialogData.businessInvestigation.formParameter.haveVoucher")
                  el-radio(v-for="(item,index) in haveOptions" :key="index" :label="item.value") {{ item.label }}
    //- 右侧内容
    .page-details-data-none(v-else) 暂无数据
  //- 弹窗部分
  //- 联系人维护表单（公用）
  .contact-maintain
    el-dialog(title="联系人维护" :visible.sync="dialogData.contactMaintain.switch" width="460px" @close="cancelContactForm")
      el-form(ref="contactMaintainForm" :model="dialogData.contactMaintain.formParameter" :rules="dialogData.contactMaintain.formRules" label-width="120px")
        el-form-item(label="联系人姓名" prop="contact_name")
          el-input(v-model="dialogData.contactMaintain.formParameter.contact_name" placeholder="请输入联系人姓名")
        el-form-item(label="联系人性别" prop="contact_gender")
          el-radio-group(v-model="dialogData.contactMaintain.formParameter.contact_gender")
            el-radio(v-for="(item,index) in sexOptions" :key="index" :label="item.value") {{ item.label }}
        el-form-item(label="联系人电话" prop="contact_phone")
          el-input(v-model="dialogData.contactMaintain.formParameter.contact_phone" placeholder="请输入联系人电话" maxlength="11")
        el-form-item(label="联系人岗位" prop="contact_pstn")
          el-input(v-model="dialogData.contactMaintain.formParameter.contact_pstn" placeholder="请输入联系人岗位")
      div(slot="footer" class="dialog-footer")
        el-button(type="primary" @click="submitContactForm") 保存 
        el-button(@click="cancelContactForm") 取 消

  //- 商务楼宇 - 楼宇编辑
  .building-edit
    el-dialog(title="楼宇编辑" :visible.sync="dialogData.buildingEdit.switch" width="600px" @close="cancelBuildingEdit")
      el-form(ref="buildingEditForm" :model="dialogData.buildingEdit.formParameter" label-width="160px")
        el-form-item(label="楼宇名称：")
          span {{ rightData.houseDetailsData.bldg_name }}
        el-form-item(label="上级经营单元：")
          span {{ rightData.houseDetailsData.manage_id }}
        el-form-item(label="楼宇地址：")
          span {{ rightData.houseDetailsData.bldg_add }}
        //- el-form-item(label="楼宇类型：")
          el-select(v-model="rightData.houseDetailsData.bldg_type" placeholder="请选择")
            el-option(v-for="(item,index) in houseTypeOptions" :key="item.value" :label="item.label" :value="item.value")
        el-form-item(label="楼宇物管公司")
          el-input(v-model="rightData.houseDetailsData.bldg_roperty" placeholder="请输入")
        el-form-item(label="楼宇包含范围")
          el-input(v-model="rightData.houseDetailsData.bldg_area" placeholder="请输入")
        el-form-item(label="电信是否与物管公司有合作分成协议")
          el-radio-group(v-model="rightData.houseDetailsData.is_ptnr")
            el-radio(v-for="(item,index) in booleanOptions" :key="index" :label="item.value") {{ item.label }}
      div(slot="footer" class="dialog-footer")
        el-button(type="primary" @click="updatebuilding") 保存 
        el-button(@click="cancelBuildingEdit") 取 消
  //- 商务楼宇 - 企业客户维护（公用）
  .customer-maintain
    el-dialog(title="企业客户维护" :visible.sync="dialogData.customerMaintain.switch" width="660px" @close="cancelCustomerMaintain")
      el-form(ref="customerMaintainForm" :model="dialogData.customerMaintain.formParameter" :rules="dialogData.customerMaintain.formRules" label-width="130px")
        el-form-item(label="企业客户名称" prop="companyName")
          el-input(v-model="dialogData.customerMaintain.formParameter.companyName" placeholder="请输入企业客户名称")
        el-form-item(label="客户地址：" prop="companyAddr")
          el-input(v-model="dialogData.customerMaintain.formParameter.companyAddr" placeholder="请输入地址")
        el-row
          el-col(:xs="12" :sm="12")
            el-form-item(label="单元号：" prop="companyUnit")
              el-input(v-model="dialogData.customerMaintain.formParameter.companyUnit" placeholder="请输入单元号")
          el-col(:xs="12" :sm="12")
            el-form-item(label="房间号：" prop="companyRoom")
              el-input(v-model="dialogData.customerMaintain.formParameter.companyRoom" placeholder="请输入房间号")
        el-form-item.form-select(label="企业客户类型" prop="custType")
          el-select(v-model="dialogData.customerMaintain.formParameter.custType" placeholder="请选择")
            el-option(v-for="(item,index) in customerTypeOptions" :key="item.value" :label="item.label" :value="item.value")
        el-form-item(label="营业额规模(万元)" prop="busiScale")
          el-input(v-model="dialogData.customerMaintain.formParameter.busiScale" placeholder="请输入")
        el-form-item(label="办公面积(平米)" prop="companySpace")
          el-input(v-model="dialogData.customerMaintain.formParameter.companySpace" placeholder="请输入")
        el-form-item(label="公司人数规模" prop="companyStaff")
          el-input(v-model="dialogData.customerMaintain.formParameter.companyStaff" placeholder="请输入")
        el-form-item(label="公司电话" prop="contactPhone")
          el-input(v-model="dialogData.customerMaintain.formParameter.contactPhone" placeholder="请输入")
        el-form-item(label="企业楼层" prop="bldgFloor")
          el-input(v-model="dialogData.customerMaintain.formParameter.bldgFloor" placeholder="请输入")
        .incremental-list
          .incremental-item(v-for="(item,index) in dialogData.customerMaintain.formParameter.business")
            el-form-item(label="业务类型")
              el-select(v-model="item.busiId" placeholder="请选择")
                el-option(v-for="(business,index) in businessOptions" :key="business.value" :label="business.label" :value="business.value")
            el-form-item(label="业务提供商")
              el-input(v-model="item.busiProvider" placeholder="请输入")
            el-form-item(label="异网客户经理")
              el-input(v-model="item.otherManagerName" placeholder="请输入")
            el-form-item(label="联系方式")
              el-input(v-model="item.otherManagerPhone" placeholder="请输入")
            el-form-item(label="到期时间")
              el-date-picker(v-model="item.busiEndDate" value-format="yyyy-MM-dd" type="date")
        .add-button(@click="dialogData.customerMaintain.formParameter.business.push(JSON.parse(JSON.stringify(dialogData.customerMaintain.baseIncrementalList)))")
          el-button(type="primary" plain) 添加增量业务信息
      div(slot="footer" class="dialog-footer")
        el-button(type="primary" @click="submitCustomerMaintain") 保存 
        el-button(@click="cancelCustomerMaintain") 取 消

</template>

<script>
// api
import { buildingInfoManage } from "@/api/dictSpace/buildingInfoManage";

export default {
  name: "BuildingInfoManage",
  data() {
    return {
      /***************************页面公用 部分 */
      sexOptions: [
        {
          value: "1",
          label: "男"
        },
        {
          value: "2",
          label: "女"
        },
        {
          value: "3",
          label: "未知"
        }
      ],
      // 运营商资源情况
      operatorOptions: [
        {
          value: "0",
          label: "联通"
        },
        {
          value: "1",
          label: "移动"
        },
        {
          value: "2",
          label: "华数"
        },
        {
          value: "3",
          label: "其他"
        }
      ],
      // 企业客户类型
      customerTypeOptions: [
        {
          value: 101,
          label: "存量"
        },
        {
          value: 102,
          label: "蓝海"
        },
        {
          value: 103,
          label: "移动"
        },
        {
          value: 104,
          label: "联通"
        },
        {
          value: 105,
          label: "其他"
        },
        {
          value: 106,
          label: "未知"
        },
        {
          value: 999,
          label: "蓝海废弃"
        },
        {
          value: 998,
          label: "他网废弃"
        },
        {
          value: 997,
          label: "存量废弃"
        }
      ],
      // 楼宇类型
      houseTypeOptions: [
        {
          value: 1001,
          label: "城区住宅"
        },
        {
          value: 1002,
          label: "商务楼宇"
        },
        {
          value: 1003,
          label: "工业园区"
        },
        {
          value: 1004,
          label: "专业市场"
        },
        {
          value: 1005,
          label: "农村住宅"
        },
        {
          value: 1006,
          label: "厂区宿舍"
        },
        {
          value: 1007,
          label: "自有楼宇"
        },
        {
          value: 1008,
          label: "沿街店铺"
        }
      ],
      // 业务下拉列表
      businessOptions: [
        {
          value: 1,
          label: "宽带"
        },
        {
          value: 2,
          label: "固话"
        },
        {
          value: 3,
          label: "移动"
        },
        {
          value: 4,
          label: "天翼高清"
        }
      ],
      // 有无
      haveOptions: [
        {
          value: 1,
          label: "有"
        },
        {
          value: 0,
          label: "无"
        }
      ],
      // 是否
      booleanOptions: [
        {
          value: 1,
          label: "是"
        },
        {
          value: 0,
          label: "否"
        }
      ],
      // 是否 json
      booleanJson: {
        0: "否",
        1: "是"
      },
      // 楼宇类型 json
      houseTypeJson: {
        1001: "城区住宅",
        1002: "商务楼宇",
        1003: "工业园区",
        1004: "专业市场",
        1005: "农村住宅",
        1006: "厂区宿舍",
        1007: "自有楼宇",
        1008: "沿街店铺"
      },
      // 性别 json
      sexJson: {
        1: "男",
        2: "女",
        3: "未知"
      },
      // 资产类型 json
      businessJson: {
        1: "宽带",
        2: "固话",
        3: "移动",
        4: "天翼高清"
      },
      // 企业客户类型 json
      custTypeJson: {
        101: "存量",
        102: "蓝海",
        103: "移动",
        104: "联通",
        105: "其他",
        106: "未知",
        999: "蓝海废弃",
        998: "他网废弃",
        997: "存量废弃"
      },
      // 左侧
      leftData: {
        // 完整率
        infoPer: 0.0,
        perLoading: false,
        // 列表入参
        listPostData: {
          // 因为这里是滚动加载数据，默认会自动请求一遍接口 pageNum++，所以默认值设为 0
          pageNum: 0,
          pageSize: 10,
          // 检索值
          searchValue: ""
        },
        // 列表数据
        listData: {},
        listLoading: false,
        // 选中的楼宇数据，右侧用来使用
        signHouseData: {}
      },
      // 右侧
      rightData: {
        // 顶部楼宇详情
        houseDetailsData: {},
        houseDetailsDataLoading: false,
        // tab 切换
        tabData: {
          // 标题切换索引
          activeIndex: 0,
          tabMenuListData: [
            {
              name: "企业客户",
              data: 0
            },
            {
              name: "联系人",
              data: 1
            },
            {
              name: "楼宇视图",
              data: 2
            },
            {
              name: "异网竞争信息",
              data: 3
            }
          ],
          // 企业客户表格
          customerTableData: {
            loading: false,
            postData: {
              bldgId: null,
              pageNum: 1,
              pageSize: 10,
              searchValue: ""
            },
            data: {},
            // 更新历史 按钮 选中的企业客户
            signCustomerData: {}
          },
          // 联系人表格
          contactTableData: {
            loading: false,
            postData: {
              // 楼宇 id
              bldgId: null,
              pageNum: 1,
              pageSize: 10
            },
            data: {}
          },
          // 楼宇视图
          viewData: {
            // 四个总数
            totalData: {},
            totalDataLoading: false,
            // 单元列表
            unitList: [],
            unitListLoading: false,
            // 储存选中的单元数据
            signUnitData: {},
            // 房间详情开关按钮
            detailsSwitch: false,
            // 储存选中的房间数据
            signRoomData: {},
            // 房间列表
            roomList: [],
            roomListLoading: false,
            // 房间详情表格
            roomTableData: [],
            roomTableDataLoading: false
          },
          // 异网竞争信息
          differentData: {
            loading: false,
            // 基本的一组渠道信息所填表单数据
            baseChannelList: {
              cptrType: null,
              channelInfo: ""
            },
            // 基本的一组运营商资源情况所填表单数据
            baseOperatorList: {
              cptrType: null,
              userCnt: ""
            },
            // 基本的一组异网客户经理所填表单数据
            baseManagerList: {
              cptrType: null,
              userCnt: ""
            },
            // 需要提交的数据
            postData: {
              // 楼宇 id
              bldgId: null,
              // 渠道信息所填列表数据
              otherNetChannel: [],
              // 运营商资源情况所填列表数据
              serviceProvider: [],
              // 异网客户经理所填列表数据
              otherNetCustomer: []
            }
          }
        }
      },
      /***************************弹窗 部分 */
      dialogData: {
        // 联系人维护表单（公用）
        contactMaintain: {
          switch: false,
          // 表单参数
          formParameter: {
            bldg_id: "",
            contact_id: null,
            contact_name: "",
            contact_gender: "",
            contact_phone: "",
            contact_pstn: ""
          },
          // 表单规则
          formRules: {
            contact_name: [
              { required: true, message: "用户名称不能为空", trigger: "blur" }
            ],
            contact_gender: [
              { required: true, message: "用户性别不能为空", trigger: "blur" }
            ]
          }
        },
        // 更新历史列表（公用）
        updateHistory: {
          switch: false,
          // 标题
          title: "",
          // 列表数据
          listData: []
        },
        // 商务楼宇 - 楼宇编辑
        buildingEdit: {
          switch: false
        },
        // 商务楼宇 - 企业客户维护（公用）
        customerMaintain: {
          switch: false,
          // 表单参数
          formParameter: {
            companyName: "",
            companyAddr: "",
            custType: null,
            busiScale: "",
            companySpace: "",
            companyStaff: null,
            contactPhone: "",
            bldgFloor: "",
            managerId: null,
            companyUnit: "",
            companyRoom: "",
            business: []
          },
          // 表单规则
          formRules: {
            companyName: [
              {
                required: true,
                message: "企业客户名称不能为空",
                trigger: "blur"
              }
            ],
            custType: [
              {
                required: true,
                message: "企业客户类型不能为空",
                trigger: "blur"
              }
            ]
          },
          // 基本的一组增量业务所填表单数据
          baseIncrementalList: {
            busiId: "",
            busiProvider: "",
            otherManagerName: "",
            otherManagerPhone: "",
            busiEndDate: ""
          },
          // 储存所填的每一组增量业务列表数据
          incrementalList: []
        },
        // 商机调查（公用）
        businessInvestigation: {
          switch: false,
          // 表单参数
          howStandardOptions: [
            {
              value: 0,
              label: "否"
            },
            {
              value: 1,
              label: "是"
            }
          ],
          formParameter: {
            peopleCount: "",
            needBoolean: "",
            haveConfig: "",
            howStandard: [],
            haveClock: "",
            haveVoucher: "",
            area: ""
          }
        }
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
      me.getBuildInformationIntegrityRate();
    },
    /***************************左侧 部分 */
    /**
     * 获取 楼宇信息完整率 数据
     */
    getBuildInformationIntegrityRate() {
      const me = this;
      me.leftData.perLoading = true;
      buildingInfoManage
        .getBuildInformationIntegrityRate()
        .then(res => {
          // 由于 js 计算不精确，所以数字转换时需要特殊处理
          res.data && (me.leftData.infoPer = (res.data * 1000) / 10);
        })
        .finally(() => {
          me.leftData.perLoading = false;
        });
    },
    /**
     * 获取 楼宇列表信息 数据
     */
    getbuildingbyname() {
      const me = this;
      me.leftData.listLoading = true;
      buildingInfoManage
        .getbuildingbyname(me.leftData.listPostData)
        .then(res => {
          if (me.leftData.listPostData.pageNum === 1) {
            // 初始化操作
            me.leftData.listData = res.data;
            // 默认选中第一个楼宇
            me.leftData.signHouseData = me.leftData.listData.list[0];
            me.getbuildingbyid();
          } else {
            me.leftData.listData.list = me.leftData.listData.list.concat(
              res.data.list
            );
          }
        })
        .finally(() => {
          me.leftData.listLoading = false;
        });
    },
    /**
     * 滚动加载列表数据
     */
    getHouseLeftList() {
      const me = this;
      if (
        me.leftData.listPostData.pageNum === 0 ||
        me.leftData.listPostData.pageNum < me.leftData.listData.pages
      ) {
        me.leftData.listPostData.pageNum++;
        me.getbuildingbyname();
      }
    },
    /**
     * 检索值发生改变时回调，主要是需要重置页码为 1
     */
    houseSearchChangeHandle() {
      const me = this;
      me.leftData.listPostData.pageNum = 1;
    },
    /**
     * 选中单个楼宇回调
     */
    chooseHouseHandle(houseData) {
      const me = this;
      me.leftData.signHouseData = houseData;
      me.getbuildingbyid();
    },
    /***************************右侧 部分 */
    /**
     * 获取 单个楼宇的详情数据
     */
    getbuildingbyid() {
      const me = this;
      me.rightData.houseDetailsDataLoading = true;
      const { bldg_id } = me.leftData.signHouseData;
      // 判断如果左侧选中的楼宇数据清空的话，不请求数据
      bldg_id &&
        buildingInfoManage
          .getbuildingbyid({
            id: bldg_id
          })
          .then(res => {
            me.rightData.houseDetailsData = res.data;
            // 联动右侧 tab 的数据
            switch (me.rightData.tabData.activeIndex) {
              case 0:
                me.getcompanybybldgidandname();
                break;
              case 1:
                me.getbuildingcontact();
                break;
              case 2:
                me.getbuildingview();
                break;
              case 3:
                me.getCompetitor();
                break;

              default:
                break;
            }
          })
          .finally(() => {
            me.rightData.houseDetailsDataLoading = false;
          });
    },
    /**
     * 获取 单个楼宇的更新历史
     */
    getbuildinghistory() {
      const me = this;
      const { bldg_id } = me.leftData.signHouseData;
      buildingInfoManage
        .getbuildinghistory({
          id: bldg_id
        })
        .then(res => {
          me.dialogData.updateHistory.listData = res.data;
          me.dialogData.updateHistory.switch = true;
        });
    },
    /**
     * tab 菜单点击切换
     * data 菜单 data 属性
     */
    tabSwitchhandle(data) {
      const me = this;
      me.rightData.tabData.activeIndex = data;
      switch (data) {
        case 0:
          me.getcompanybybldgidandname();
          break;
        case 1:
          me.getbuildingcontact();
          break;
        case 2:
          me.getbuildingview();
          break;
        case 3:
          me.getCompetitor();
          break;

        default:
          break;
      }
    },
    /*******************************企业客户 */
    /**
     * 搜索企业客户名称
     */
    searchCompanyHandle() {
      const me = this;
      me.rightData.tabData.customerTableData.postData.pageNum = 1;
      me.getcompanybybldgidandname();
    },
    /**
     * 获取企业客户表格数据
     */
    getcompanybybldgidandname() {
      const me = this;
      me.rightData.tabData.customerTableData.loading = true;
      // 获取楼宇 id
      const { bldg_id } = me.leftData.signHouseData;
      me.rightData.tabData.customerTableData.postData.bldgId = bldg_id;
      buildingInfoManage
        .getcompanybybldgidandname(
          me.rightData.tabData.customerTableData.postData
        )
        .then(res => {
          me.rightData.tabData.customerTableData.data = res.data;
        })
        .finally(() => {
          me.rightData.tabData.customerTableData.loading = false;
        });
    },
    /**
     * 新增企业客户
     */
    addcompany() {
      const me = this;
      // 获取楼宇 id
      const { bldg_id } = me.leftData.signHouseData;
      me.dialogData.customerMaintain.formParameter.bldgId = bldg_id;
      buildingInfoManage
        .addcompany(me.dialogData.customerMaintain.formParameter)
        .then(res => {
          me.$message.success("新增成功！");
          me.getcompanybybldgidandname();
        })
        .finally(() => {
          me.cancelCustomerMaintain();
        });
    },
    /**
     * 获取 单个企业客户的更新历史
     */
    getcompanyhistory(row) {
      const me = this;
      // 企业
      const { company_id } = row;
      me.rightData.tabData.customerTableData.signCustomerData = row;
      buildingInfoManage
        .getcompanyhistory({ id: company_id })
        .then(res => {
          me.dialogData.updateHistory.listData = res.data;
          me.dialogData.updateHistory.switch = true;
        })
        .finally(() => {
          me.cancelCustomerMaintain();
        });
    },

    /*******************************联系人 */
    /**
     * 获取 联系人表格 数据
     */
    getbuildingcontact() {
      const me = this;
      me.rightData.tabData.contactTableData.loading = true;
      // 获取楼宇 id
      const { bldg_id } = me.leftData.signHouseData;
      me.rightData.tabData.contactTableData.postData.bldgId = bldg_id;
      buildingInfoManage
        .getbuildingcontact(me.rightData.tabData.contactTableData.postData)
        .then(res => {
          me.rightData.tabData.contactTableData.data = res.data;
        })
        .finally(() => {
          me.rightData.tabData.contactTableData.loading = false;
        });
    },
    /**
     * 联系人表格 删除 点击回调
     * contact_name 联系人 姓名
     * contact_id 联系人 id
     */
    deleteContactHandle({ contact_name, contact_id }) {
      const me = this;
      me.$confirm(`是否确认删除联系人：${contact_name}？`, "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return buildingInfoManage.deletebuildingcontact({
            contactId: contact_id
          });
        })
        .then(() => {
          me.$message.success("删除成功！");
          me.getbuildingcontact();
        })
        .catch(function() {});
    },
    /**
     * 联系人表格 编辑 点击回调
     * contact_name 联系人 姓名
     * contact_id 联系人 id
     * contact_gender 联系人性别(1男，2女，3未知)
     * contact_phone 联系人电话
     * contact_pstn 联系人岗位
     */
    editContactHandle({
      contact_id,
      contact_name,
      contact_gender,
      contact_phone,
      contact_pstn
    }) {
      const me = this;
      me.dialogData.contactMaintain.formParameter = {
        contact_id,
        contact_name,
        contact_gender,
        contact_phone,
        contact_pstn
      };
      me.dialogData.contactMaintain.switch = true;
    },

    /*******************************楼宇视图 */
    /**
     * 获取 楼宇视图 四个总数
     */
    getbuildingview() {
      const me = this;
      me.rightData.tabData.viewData.totalDataLoading = true;
      // 获取楼宇 id
      const { bldg_id } = me.leftData.signHouseData;
      buildingInfoManage
        .getbuildingview({
          bldgId: bldg_id
        })
        .then(res => {
          me.rightData.tabData.viewData.totalData = res.data;
        })
        .finally(() => {
          me.rightData.tabData.viewData.totalDataLoading = false;
        });
    },
    /**
     * 获取 单元列表 数据
     */
    getUnitList() {
      const me = this;
      me.rightData.tabData.viewData.unitListLoading = true;
      // 获取楼宇 id
      const { bldg_id } = me.leftData.signHouseData;
      buildingInfoManage
        .getUnitList({
          bldgId: bldg_id
        })
        .then(res => {
          me.rightData.tabData.viewData.unitList = res.data;
        })
        .finally(() => {
          me.rightData.tabData.viewData.unitListLoading = false;
        });
    },
    /**
     * 根据单元号获取相应的房间列表
     */
    getRoomByCell() {
      const me = this;
      me.rightData.tabData.viewData.roomListLoading = true;
      // 获取楼宇 id
      const { bldg_id } = me.leftData.signHouseData;
      // 获取楼宇单元
      const { cellId } = me.rightData.tabData.viewData.signUnitData;

      buildingInfoManage
        .getRoomByCell({
          bldgId: bldg_id,
          cellId
        })
        .then(res => {
          me.rightData.tabData.viewData.roomList = res.data;
        })
        .finally(() => {
          me.rightData.tabData.viewData.roomListLoading = false;
        });
    },
    /**
     * 根据房间号获取相应的房间信息
     */
    getRoomMessage() {
      const me = this;
      me.rightData.tabData.viewData.roomTableDataLoading = true;
      // 获取楼宇 id
      const { bldg_id } = me.leftData.signHouseData;
      // 获取楼宇单元
      const { cellId } = me.rightData.tabData.viewData.signUnitData;
      // 获取房间号
      const { tenementId } = me.rightData.tabData.viewData.signRoomData;

      buildingInfoManage
        .getRoomMessage({
          bldgId: bldg_id,
          cellId,
          tenementId
        })
        .then(res => {
          me.rightData.tabData.viewData.roomTableData = res.data;
        })
        .finally(() => {
          me.rightData.tabData.viewData.roomTableDataLoading = false;
        });
    },
    /**
     * 单元号切换回调
     * row 选中的单元数据
     */
    unitSwitchHandle(row) {
      const me = this;
      me.rightData.tabData.viewData.signUnitData = row;
      me.getRoomByCell();
    },
    /**
     * 房间号切换回调
     * row 选中的房间数据
     */
    roomSwitchHandle(row) {
      const me = this;
      me.rightData.tabData.viewData.signRoomData = row;
      me.rightData.tabData.viewData.detailsSwitch = true;
      me.getRoomMessage();
    },

    /*******************************异网竞争信息 */
    /**
     * 获取 异网竞争信息 数据
     */
    getCompetitor() {
      const me = this;
      me.rightData.tabData.differentData.loading = true;
      // 获取楼宇 id
      const { bldg_id } = me.leftData.signHouseData;
      buildingInfoManage
        .getCompetitor({
          bldgId: bldg_id
        })
        .then(res => {
          me.rightData.tabData.differentData.postData = res.data;
        })
        .finally(() => {
          me.rightData.tabData.differentData.loading = false;
        });
    },
    /**
     * 提交 异网竞争信息 表单数据
     */
    addCompetitor() {
      const me = this;
      me.rightData.tabData.differentData.loading = true;
      // 获取楼宇 id
      const { bldg_id } = me.leftData.signHouseData;
      me.rightData.tabData.differentData.postData.bldgId = bldg_id;
      buildingInfoManage
        .addCompetitor(me.rightData.tabData.differentData.postData)
        .then(res => {
          me.$message.success("提交成功！");
        })
        .finally(() => {
          me.rightData.tabData.differentData.loading = false;
        });
    },

    /***************************企业客户 部分 */
    /**
     * 左侧 - 列表分页更新
     */
    getCompanyLeftList() {},
    /**
     * 企业客户编辑
     */
    companyCustomerEdit() {
      const me = this;
      // 需要赋值之后，再将弹窗打开
      me.dialogData.customerMaintain.switch = true;
    },
    /***************************弹窗 部分 */
    /**
     * 提交联系人维护表单
     */
    submitContactForm() {
      const me = this;
      me.$refs["contactMaintainForm"].validate(valid => {
        if (valid) {
          // 用 contact_id 字段来判断一下是 新增 还是 编辑
          const { contact_id } = me.dialogData.contactMaintain.formParameter;
          if (contact_id) {
            // 编辑
            buildingInfoManage
              .updatebuildingcontact(
                me.dialogData.contactMaintain.formParameter
              )
              .then(res => {
                me.$message.success("编辑成功！");
                me.getbuildingcontact();
              })
              .finally(() => {
                me.cancelContactForm();
              });
          } else {
            // 新增
            const { bldg_id } = me.leftData.signHouseData;
            me.dialogData.contactMaintain.formParameter.bldg_id = bldg_id;
            buildingInfoManage
              .addbuildingcontact(me.dialogData.contactMaintain.formParameter)
              .then(res => {
                me.$message.success("新增成功！");
                me.getbuildingcontact();
              })
              .finally(() => {
                me.cancelContactForm();
              });
          }
        }
      });
    },
    /**
     * 关闭联系人维护弹窗
     */
    cancelContactForm() {
      const me = this;
      me.dialogData.contactMaintain.switch = false;
      me.dialogData.contactMaintain.formParameter = {
        bldg_id: "",
        contact_id: null,
        contact_name: "",
        contact_gender: "",
        contact_phone: "",
        contact_pstn: ""
      };
      me.resetForm("contactMaintainForm");
    },
    /**
     * 获取更新历史列表（公用）数据
     * id 楼宇 id，默认不传，取的是左侧点击的楼宇
     * row 企业客户信息 json
     */
    // loadUpdateHistoryList(id) {
    //   const me = this;
    //   // 判断是请求的楼宇信息，还是企业客户信息
    //   if (id && id.company_id) {
    //     // 企业
    //     const { company_id } = id;
    //     me.rightData.tabData.customerTableData.signCustomerData = id;
    //     buildingInfoManage
    //       .getcompanyhistory({ id: company_id })
    //       .then(res => {
    //         me.dialogData.updateHistory.listData = res.data;
    //         me.dialogData.updateHistory.switch = true;
    //       })
    //       .finally(() => {
    //         me.cancelCustomerMaintain();
    //       });
    //   } else {
    //     debugger
    //     // 楼宇
    //     // 因为这个列表不需要分页了，所以暂时判断一下，如果有数据就不再请求接口
    //     !me.dialogData.updateHistory.listData.length &&
    //       me.getbuildinghistory(id);
    //   }
    // },
    /**
     * 关闭更新历史列表（公用）
     */
    cancelUpdateHistory() {
      const me = this;
      // 清空内部的列表数据
      me.dialogData.updateHistory.listData = [];
      me.rightData.tabData.customerTableData.signCustomerData = {};
      me.dialogData.updateHistory.switch = false;
    },
    /**
     * 提交商务楼宇 - 楼宇编辑表单
     */
    updatebuilding() {
      const me = this;
      buildingInfoManage
        .updatebuilding(me.leftData.signHouseData)
        .then(res => {
          me.$message.success("编辑成功！");
        })
        .finally(() => {
          me.cancelBuildingEdit();
        });
    },
    /**
     * 关闭商务楼宇 - 楼宇编辑弹窗
     */
    cancelBuildingEdit() {
      const me = this;
      me.dialogData.buildingEdit.switch = false;
      me.resetForm("buildingEditForm");
    },
    /**
     * 提交商务楼宇/企业客户 - 企业客户维护（公用）表单
     */
    submitCustomerMaintain() {
      const me = this;
      me.$refs["customerMaintainForm"].validate(valid => {
        if (valid) {
          me.addcompany();
        }
      });
    },
    /**
     * 关闭商务楼宇/企业客户 - 企业客户维护（公用）弹窗
     */
    cancelCustomerMaintain() {
      const me = this;
      me.dialogData.customerMaintain.switch = false;
      me.dialogData.customerMaintain.formParameter = {
        companyName: "",
        companyAddr: "",
        custType: null,
        busiScale: "",
        companySpace: "",
        companyStaff: null,
        contactPhone: "",
        bldgFloor: "",
        managerId: null,
        companyUnit: "",
        companyRoom: "",
        business: []
      };
      me.resetForm("customerMaintainForm");
    },
    /**
     * 跳转到企业客户页面
     */
    jumpCompanyView({ company_id }) {
      const me = this;
      me.$router.push({
        name: "客户信息采集",
        query: {
          companyId: company_id
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/mixin.styl'
layout-block()
  box-shadow 0 0 0 1px rgba(218, 226, 237, 1) inset
  border-radius 3px
  background-color #fff
.building-info-manage
  .list-data-none
    color #666
    text-align center
    line-height 100px
  .page-main
    width $min-width
    margin 15px auto
    display flex
    justify-content space-between
    min-height 400px
    .page-list
      width (308 / 1162 * 100)%
      .info-per
        layout-block()
        margin 0 0 12px 0
        padding 25px 20px
        .info-text
          display flex
          justify-content space-between
          line-height 30px
          font-size 18px
          .text-value
            font-size 24px
            color $main-blue-color
            font-weight bold
        .info-img
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
        .list-data
          max-height 580px
          overflow-y auto
          .list-item
            cursor pointer
            padding 10px 8px
            border-bottom 1px dashed rgba(218, 226, 237, 1)
            display flex
            &:before
              content ''
              width 26px
              height 37px
              margin 0 14px 0 0
              background url('~@/assets/image/dictSpace/buildingInfoManage/icon-house-info.png') center center no-repeat
            .item-content
              flex 1
              .list-title
                color $font-default-color
                font-weight 600
              .list-per
                display flex
                justify-content space-between
                line-height 28px
                .per-title
                  color #939EAB
                  font-size 12px
                .per-val
                  color #3E4053
                  font-size 16px
                  font-weight 600px
            &-active
              background-color #EDF5FF
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
      .house-details
        .base-info
          display flex
          justify-content space-between
          align-items center
          padding 20px
          box-shadow 0px 9px 12px 0px rgba(0, 0, 0, 0.11)
          position relative
          .info-per
            width 120px
            text-align center
            /deep/ .el-progress__text
              color #FF8E3B
              font-size 24px !important
              &:after
                content '信息完整率'
                display block
                font-size 14px
                color $font-default-color
          .info-details
            margin 0 0 0 34px
            h4
              color $font-default-color
              font-size 20px
              margin 0 0 10px 0
            .info-list
              flex 1
              display flex
              flex-wrap wrap
              .list-item
                min-width 200px
                margin 0 10px 6px 0
                .info-item
                  display flex
                  color #080808
                  .item-title
                    color #939EAB
          .info-button
            position absolute
            right 20px
            top 10px
            display flex
            [class*='button']
              cursor pointer
              padding 0 0 0 30px
              position relative
              &:before
                content ''
                position absolute
                left 0
                top 0
                width 20px
                height 20px
                background url('~@/assets/image/dictSpace/buildingInfoManage/icon-history.png') left center
            &>div:first-child
              margin 0 20px 0 0
              &:before
                background url('~@/assets/image/dictSpace/buildingInfoManage/icon-edit.png') left center
        .info-tab
          padding 20px
          .tab-menu
            display flex
            box-shadow 0 1px 0 0 #E5EDF3
            .menu-item
              width 25%
              line-height 36px
              padding 10px 0
              color $font-default-color
              font-size 18px
              display flex
              justify-content center
              align-items center
              cursor pointer
              position relative
              transition all 0.3s
              &:before
                content ''
                width 22px
                height 22px
                margin 0 10px 0 0
              &-active
                color $main-blue-color
                box-shadow 0 -2px 0 0 $main-blue-color inset
              for index in 1 2 3 4
                &:nth-child({index})
                  &:before
                    background url('~@/assets/image/dictSpace/buildingInfoManage/icon-tab-' + index + '.png') center center no-repeat
          .tab-details
            .tab-content
              .tab-top
                display flex
                justify-content space-between
                padding 20px 0 15px
                .tab-search
                  display flex
                  justify-content space-between
                  /deep/
                    .el-input
                      margin 0 10px 0 0
                .count-list
                  display flex
                  justify-content space-between
                  padding 5px 0 10px
                  flex 1
                  .count-item
                    flex 1
                    margin 0 0 0 14px
                    height 71px
                    display flex
                    flex-direction column
                    justify-content center
                    align-items center
                    color #fff
                    text-shadow 0px 1px 3px rgba(0, 0, 0, 0.5)
                    .item-value
                      font-size 28px
                      font-weight bold
                    &:first-child
                      margin 0
                    for index in 1 2 3 4
                      &:nth-child({index})
                        background url('~@/assets/image/dictSpace/buildingInfoManage/house-bg' + index + '.png') center center no-repeat
                        background-size cover
                .room-title
                  flex 1
                  height 84px
                  background rgba(62, 130, 254, 0.1)
                  border-radius 3px
                  box-shadow 0 0 0 1px rgba(62, 130, 254, 1) inset
                  display flex
                  justify-content space-between
                  padding 0 24px
                  align-items center
                  .title-text
                    color #393C41
                    font-size 24px
                    display flex
                    align-items center
                    &:before
                      content ''
                      width 71px
                      height 71px
                      background url('~@/assets/image/dictSpace/buildingInfoManage/icon-room.png') center center
                      background-size cover
                  .title-back
                    width 76px
                    border-radius 3px
                    display flex
                    justify-content space-between
                    background-color $main-blue-color
                    height 28px
                    line-height 28px
                    text-align center
                    cursor pointer
                    .back-icon
                      width 28px
                      color $main-blue-color
                      background-color #EBF2FE
                      box-shadow 0 0 0 3px $main-blue-color inset
                      font-size 20px
                    .back-text
                      flex 1
                      color #fff
              .tab-form
                padding 20px 0
                max-height 500px
                overflow-y auto
                .form-submit
                  padding 0 0 15px
                  max-height 286px
                  overflow-y auto
                .el-form-item
                  padding 20px 0 40px
                  box-shadow 0px 5px 14px 0px rgba(0, 0, 0, 0.11)
                  .add-button
                    bottom -30px
              .tab-table
                .button-list
                  display flex
                  justify-content center
              .tab-bottom
                .unit-list
                  display flex
                  flex-wrap wrap
                  .unit-item
                    width (122 / 802 * 100)%
                    height 35px
                    line-height 35px
                    text-align center
                    background rgba(244, 246, 248, 1)
                    border-radius 3px
                    font-size 16px
                    color #B6BEC6
                    margin 0 0 14px (14 / 802 * 100)%
                    cursor pointer
                    &:nth-child(6n + 1)
                      margin 0 0 14px 0
                    &-active
                      background rgba(62, 130, 254, 1)
                      color #fff
                .room-content
                  background-color #F4F6F8
                  .room-tip
                    padding 16px 40px 23px
                    display flex
                    justify-content space-between
                    .tip-list
                      display flex
                      justify-content space-between
                      .tip-item
                        min-width 90px
                        height 20px
                        display flex
                        align-items center
                        &:before
                          content ''
                          width 12px
                          height 12px
                          border-radius 3px
                          margin 0 7px 0 0
                      &:nth-child(1)
                        &>div:nth-child(1)
                          &:before
                            background-color #0146BF
                        &>div:nth-child(2)
                          &:before
                            background-color #FF626C
                      &:nth-child(2)
                        &>div:nth-child(1)
                          &:before
                            background-color $down-text-color
                        &>div:nth-child(2)
                          &:before
                            background-color #4DA1FF
                        &>div:nth-child(3)
                          &:before
                            background-color #FF8E3B
                        &>div:nth-child(4)
                          &:before
                            background-color #6901BF
                  .room-list
                    padding 0 20px
                    display flex
                    flex-wrap wrap
                    max-height 286px
                    overflow-y auto
                    .room-item
                      width (178 / 762 * 100)%
                      height 72px
                      text-align center
                      box-shadow 0px 0px 20px 1px rgba(176, 192, 237, 0.42)
                      border-radius 5px
                      background-color #fff
                      box-shadow 0 0 0 1px rgba(246, 245, 245, 1) inset
                      border-radius 3px
                      margin 0 0 16px (16 / 762 * 100)%
                      cursor pointer
                      padding 10px 0
                      &:nth-child(4n + 1)
                        margin 0 0 16px 0
                      &-dx
                        box-shadow 0 0 0 4px #0146BF inset
                      &-tw
                        box-shadow 0 0 0 4px #FF626C inset
                      .room-title
                        color $font-default-color
                        font-size 20px
                        line-height 30px
                        font-weight 500
                        margin 0 0 5px 0
                      .button-list
                        padding 0 20px
                        display flex
                        justify-content space-between
                        .button-item
                          margin 0 12px 0 0
                          flex 1
                          height 12px
                          border-radius 3px
                          background-color #DDE9FD
                          &-kd
                            background-color $down-text-color
                          &-yd
                            background-color #4DA1FF
                          &-gh
                            background-color #FF8E3B
                          &-tygq
                            background-color #6901BF
      .business-investigation
        overflow-y auto
      .update-history, .business-investigation
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
  // 弹窗相关部分
  .building-edit, .customer-maintain, .tab-form
    .el-form-item
      .el-select
        display block
    .operator-list, .incremental-list
      .incremental-item
        position relative
        &:after
          content ''
          position absolute
          width 100%
          left 0
          bottom -8px
          border-bottom 1px dashed $box-shadow-color
      .operator-item
        margin 0 0 10px 0
        display flex
        .el-form-item
          flex 1
        .el-select, .el-form-item
          margin 0 10px 0 0
        .delete-button
          padding 0 10px
          cursor pointer
    .add-button
      position absolute
      left 0
      right 0
      margin auto auto 0 auto
      width 200px
      .el-button
        width 100%
  .select-place
    display flex
    justify-content space-between
    align-items center
    background-color #f6f7f9
    padding 10px
    margin 0 0 10px 0
    .place-details
      .place-name
        color #333
        font-size 16px
  .select-building
    .select-list
      padding 10px 0
      max-height 400px
      overflow-y auto
      .el-radio-group
        width 100%
      .el-radio
        padding 10px 0
        display flex
        align-items center
        margin 0
        box-shadow 0 -1px 0 0 #d7dae2 inset
        .radio-name
          margin 0 0 10px 0
  .customer-maintain
    .el-form
      position relative
      padding-bottom 32px
      max-height 400px
      overflow-y auto
      /deep/
        .el-select
          display block
</style>
