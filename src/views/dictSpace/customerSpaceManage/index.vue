<template lang="pug">
//- 客户信息采集 页面
.customer-space-manage
  //- .page-top
  //-   .top-content
  //-     h3.title-text {{ rightData.companyDetailsData.companyName }}
  //-       el-button(type="primary" icon="el-icon-plus" @click="openSelectBuilding") 新增客户
  //-     .title-back(@click="$router.push({ name: '楼宇信息管理' })")
  //-       .back-icon
  //-         i.el-icon-back
  //-       .back-text 返回

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
          el-input(placeholder="请输入企业客户名称" prefix-icon="el-icon-search" v-model="leftData.listPostData.searchValue" @keyup.enter.native="getcompanybyname" @change="companySearchChangeHandle")
        .list-content(v-loading="leftData.listLoading")
          ul.list-data(v-infinite-scroll="getCompanyLeftList")
            li.list-item(v-for="(item,index) in leftData.listData.list" :key="index" :class="{ 'list-item-active': leftData.signCompanyData.company_id === item.company_id }" @click="chooseCompanyHandle(item)")
              .item-content
                .list-title {{ item.company_name }}
                .list-per 
                  .per-title 信息完整率
                  .per-val {{ item.completionRate }}%
          .list-data-none(v-if="leftData.listData.total === 0") 暂无数据
    //- 右侧内容
    .page-details(v-if="leftData.signCompanyData")
      .house-details
        .base-info(v-loading="rightData.companyDetailsDataLoading")
          .info-per
            el-progress(type="circle" :stroke-width="10" :width="128" :percentage="rightData.companyDetailsData.completionRate" color="#FF8E3B")
          .info-details
            h4 {{ rightData.companyDetailsData.companyName }}
            .info-list
              .list-item
                .info-item
                  .item-title 企业客户类型：
                  .item-text {{ custTypeJson[rightData.companyDetailsData.custType] }}
              .list-item
                .info-item
                  .item-title 营业额规模(万元)：
                  .item-text {{ rightData.companyDetailsData.busiScale }}
              .list-item
                .info-item
                  .item-title 办公面积(平米)：
                  .item-text {{ rightData.companyDetailsData.companySpace }}
              .list-item
                .info-item
                  .item-title 公司人数规模：
                  .item-text {{ rightData.companyDetailsData.companyStaff }}
              .list-item
                .info-item
                  .item-title 公司楼层：
                  .item-text {{ rightData.companyDetailsData.bldgFloor }}
              .list-item
                .info-item
                  .item-title 公司电话：
                  .item-text {{ rightData.companyDetailsData.contactPhone }}
              .list-item
                .info-item
                  .item-title 企业地址：
                  .item-text {{ rightData.companyDetailsData.companyAddr }}
          .info-button
            .button-edit(@click="editActiveCompanyHandle") 编辑
            .button-history(@click="getcompanyhistory") 更新历史
            .button-business(@click="getsurvey") 商机调查
        .info-tab
          //- tab 顶部菜单
          .tab-menu
            .menu-item(v-for="(item,index) in rightData.tabData.tabMenuListData" :key="item.data" :class="{ 'menu-item-active': rightData.tabData.activeIndex === item.data }" @click="tabSwitchhandle(item.data)") {{ item.name }}
          .tab-details
            //- 关键人
            .tab-content(v-if="rightData.tabData.activeIndex === 0")
              .tab-top
                .tab-add
                  el-button(type="primary" icon="el-icon-plus" @click="openAddKeyPerson" :disabled="rightData.tabData.keyPersonTableData.data.list.length >= 5") 新建关键人（ {{ rightData.tabData.keyPersonTableData.data.list.length }} / 5 ）
              .tab-bottom
                .tab-table
                  el-table(:data="rightData.tabData.keyPersonTableData.data.list" v-loading="rightData.tabData.keyPersonTableData.loading" max-height="390px")
                    el-table-column(prop="keyPersonName" label="姓名")
                    el-table-column(prop="keyPersonPhone" label="电话")
                    el-table-column(prop="keyPersonType" label="关键人类型")
                    el-table-column(label="操作" width="100")
                      template(slot-scope="scope")
                        .button-list
                          el-button(type="text" v-if="scope.row.orderNum != 1" @click="deleteContactHandle(scope.row)") 删除
                          el-button(type="text" v-else @click="editContactHandle(scope.row)") 编辑
                .tab-pagination(v-if="rightData.tabData.keyPersonTableData.data.total > 0")
                  pagination(:total="rightData.tabData.keyPersonTableData.data.total" :page.sync="rightData.tabData.keyPersonTableData.postData.pageNum" :limit.sync="rightData.tabData.keyPersonTableData.postData.pageSize" @pagination="getcompanycontact")
            //- 业务信息
            .tab-content(v-else-if="rightData.tabData.activeIndex === 1")
              .tab-top
                //- .tab-add
                  el-button(type="primary" icon="el-icon-plus" @click="dialogData.contactMaintain.switch = true") 新增业务信息
              .tab-table
                el-table(:data="rightData.tabData.businessData.data.list" v-loading="rightData.tabData.businessData.loading" max-height="380px")
                  el-table-column(prop="busiId" label="业务")
                    template(slot-scope="scope")
                      span {{ businessJson[scope.row.busiId] }}
                  el-table-column(prop="busiProvider" label="业务提供商" :show-overflow-tooltip="true" width="150px")
                  el-table-column(prop="otherManagerName" label="异网客户经理")
                  el-table-column(prop="otherManagerPhone" label="异网客户经理联系方式" :show-overflow-tooltip="true" width="180px")
                  el-table-column(prop="busiEndDate" label="业务到期时间")
                  el-table-column(label="操作")
                    template(slot-scope="scope")
                      .button-list
                        el-button(type="primary" plain @click="deleteBusinessHandle(scope.row)") 删除
                        el-button(type="primary" plain @click="editBusinessHandle(scope.row)") 编辑
              .tab-pagination(v-if="rightData.tabData.businessData.data.total > 0")
                pagination(:total="rightData.tabData.businessData.data.total" :page.sync="rightData.tabData.businessData.postData.pageNum" :limit.sync="rightData.tabData.businessData.postData.pageSize" @pagination="getcompanycontact")
            //- 铁三角 technicaData
            .tab-content(v-else)
              .tab-content-box(v-for="(val, index) in rightData.tabData.technicaData" :key="index")
                .tab-box-left
                  .tab-box-inner
                    h3 {{ val.title }}
                    img(src="@/assets/image/dictSpace/buildingInfoManage/icon-manager-0.png" v-if="index===0")
                    img(src="@/assets/image/dictSpace/buildingInfoManage/icon-manager-1.png" v-if="index===1")
                    img(src="@/assets/image/dictSpace/buildingInfoManage/icon-manager-2.png" v-if="index===2")
                    img(src="@/assets/image/dictSpace/buildingInfoManage/icon-manager-3.png" v-if="index===3")
                    el-button(type="primary" @click="manageDialog(val.title, val.managerType)" :disabled="val.listData.length >= val.maxLength || (index===0 && isBranch)") 新建（ {{ val.listData.length }} / {{ val.maxLength }} ）
                .tab-box-right
                  el-table(:data="val.listData" max-height="380px" v-loading="rightData.tabData.technicaLoading")
                    el-table-column(prop="mgrName" label="姓名" width="150px")
                    el-table-column(prop="mgrId" label="工号")
                    el-table-column(prop="mgrArea" label="所属分公司" :show-overflow-tooltip="true" width="180px")
                    el-table-column(prop="mgrDate" label="配置时间")
                    el-table-column(label="操作")
                      template(slot-scope="scope")
                        .button-list
                          el-button(v-if="scope.row.orderNum === 1" :disabled="index===0 && isBranch" type="text" @click="manageDialog(val.title, val.managerType, false)") 编辑
                          el-button(v-else type="text" @click="delManager(val.managerType, scope.row.mgrId)") 删除
                          //- el-button(type="text" @click="delManager(val.managerType, scope.row.mgrId)") 删除
                          //- el-button(type="text") 编辑
      //- 更新历史列表（公用）
      .update-history(v-if="dialogData.updateHistory.switch")
        .history-title
          h3 更新历史 #[span.color-red ({{ dialogData.updateHistory.listData.length }})]
          .close-button(@click="cancelUpdateHistory")
            i.el-icon-close
        .history-content
          .house-title {{ rightData.companyDetailsData.companyName }}
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
          .close-button(@click="cancelBusinessInvestigation")
            i.el-icon-close
        .history-form
          el-form(ref="businessInvestigationForm" :model="dialogData.businessInvestigation.formParameter" label-position="top")
            el-form-item(label="1、公司网络使用人数规模？")
              el-input(v-model="dialogData.businessInvestigation.formParameter.netCnt" placeholder="请输入")
            el-form-item(label="2、是否有访问国外网络链路的需求？")
              .select-list
                el-radio-group(v-model="dialogData.businessInvestigation.formParameter.isInterNet")
                  el-radio(v-for="(item,index) in haveOptions" :key="index" :label="item.value") {{ item.label }}
            el-form-item(label="3、是否有配置专职网络管理人员？")
              .select-list
                el-radio-group(v-model="dialogData.businessInvestigation.formParameter.isNetPerson")
                  el-radio(v-for="(item,index) in haveOptions" :key="index" :label="item.value") {{ item.label }}
            el-form-item(label="4、贵公司是如何规范员工上网的？")
              .select-list
                el-checkbox-group(v-model="dialogData.businessInvestigation.interConditionList")
                  el-checkbox(v-for="(item,index) in dialogData.businessInvestigation.howStandardOptions" :key="index" :label="item.value") {{ item.label }}
            el-form-item(label="5、是否需要上下班打卡？")
              .select-list
                el-radio-group(v-model="dialogData.businessInvestigation.formParameter.isClockin")
                  el-radio(v-for="(item,index) in haveOptions" :key="index" :label="item.value") {{ item.label }}
            el-form-item(label="6、出差报销是否需要凭证？")
              .select-list
                el-radio-group(v-model="dialogData.businessInvestigation.formParameter.isCertificate")
                  el-radio(v-for="(item,index) in haveOptions" :key="index" :label="item.value") {{ item.label }}
            el-form-item(label="7、公司办公使用场地面积？")
              el-input(v-model="dialogData.businessInvestigation.formParameter.area" placeholder="请输入")
            el-form-item(label="8、公司局域网是否信号覆盖不均匀？")
              .select-list
                el-radio-group(v-model="dialogData.businessInvestigation.formParameter.isGoodWifi")
                  el-radio(v-for="(item,index) in haveOptions" :key="index" :label="item.value") {{ item.label }}
            el-form-item(label="9、销售人员是否需要常常拜访客户，电话联络客户，公司是否需要对其进行管控？")
              .select-list
                el-radio-group(v-model="dialogData.businessInvestigation.formParameter.isContact")
                  el-radio(v-for="(item,index) in haveOptions" :key="index" :label="item.value") {{ item.label }}
            el-form-item(label="10、公司是否有多个WIFI热点？")
              .select-list
                el-radio-group(v-model="dialogData.businessInvestigation.formParameter.isManyWifi")
                  el-radio(v-for="(item,index) in haveOptions" :key="index" :label="item.value") {{ item.label }}
            el-form-item(label="11、公司局域网信号是否不稳定？")
              .select-list
                el-radio-group(v-model="dialogData.businessInvestigation.formParameter.isGoodNet")
                  el-radio(v-for="(item,index) in haveOptions" :key="index" :label="item.value") {{ item.label }}
            el-form-item(label="12、公司有哪些信息系统?")
              .select-list
                el-checkbox-group(v-model="dialogData.businessInvestigation.infoSystemsList")
                  el-checkbox(v-for="(item,index) in dialogData.businessInvestigation.systemOptions" :key="index" :label="item.value") {{ item.label }}
            el-form-item(label="13、公司是否有硬件服务器及机房?")
              .select-list
                el-radio-group(v-model="dialogData.businessInvestigation.formParameter.isEngineRoom")
                  el-radio(v-for="(item,index) in dialogData.businessInvestigation.haveComputerRoomOptions" :key="index" :label="item.value") {{ item.label }}
            el-form-item(label="14、其他需求说明?")
              el-input(type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="dialogData.businessInvestigation.formParameter.otherSurveyinfo")
            el-button(type="primary" @click="submitBusinessInvestigation") 提交
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
  //- 弹窗部分
  //- 关键人维护表单（公用）        
  .contact-maintain
    el-dialog(:title="dialogData.keyPersonMaintain.keyPersonTitle" :visible.sync="dialogData.keyPersonMaintain.switch" width="460px" @close="cancelKeyPersonForm")
      el-form(ref="keyPersonMaintainForm" :model="dialogData.keyPersonMaintain.formParameter" :rules="dialogData.keyPersonMaintain.formRules" label-width="120px")
        el-form-item(label="关键人姓名" prop="keyPersonName")
          el-input(v-model="dialogData.keyPersonMaintain.formParameter.keyPersonName" placeholder="请输入关键人姓名")
        el-form-item(label="关键人电话" prop="keyPersonPhone")
          el-input(v-model="dialogData.keyPersonMaintain.formParameter.keyPersonPhone" placeholder="请输入关键人电话" maxlength="11")
        el-form-item(label="关键人类型" prop="keyPersonType")
          el-select(v-model="dialogData.keyPersonMaintain.formParameter.keyPersonType" placeholder="请选择")
            el-option(v-for="keyPersonType in keyPersonTypeOptions" :key="keyPersonType.value" :label="keyPersonType.label" :value="keyPersonType.value")  
      div(slot="footer" class="dialog-footer")
        el-button(type="primary" @click="submitKeyPersonForm") 保存 
        el-button(@click="cancelKeyPersonForm") 取 消        
  //- 铁三角弹窗（公用）
  .technica-maintain
    account-manager-inquiries(ref="accountManagerInquiries" @manageData="manageData")
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

  //- 选择楼宇弹窗
  .select-building
    el-dialog(title="企业客户维护" :visible.sync="dialogData.selectBuilding.switch" width="538px" @close="cancelSelectBuilding")
      .select-content
        .search-input
          el-input(placeholder="请输入楼宇名称" prefix-icon="el-icon-search" v-model="dialogData.selectBuilding.listPostData.searchValue" @keyup.enter.native="getbuildingbyname" @change="houseSearchChangeHandle")
        .list-content(v-loading="dialogData.selectBuilding.listLoading")
          ul.list-data(v-infinite-scroll="getHouseList" :infinite-scroll-disabled="dialogData.selectBuilding.listLoading")
            li.list-item(v-for="(item,index) in dialogData.selectBuilding.listData.list" :key="index" :class="{ 'list-item-active': dialogData.selectBuilding.signHouseData.bldg_id === item.bldg_id }" @click="chooseHouseHandle(item)")
              .item-icon
              .item-content
                .list-title {{ item.bldg_name }}
                .list-per 
                  .per-title 信息完整率
                  .per-val {{ item.completionRate }}%
          .list-data-none(v-if="dialogData.selectBuilding.listData.total === 0") 暂无数据
      div(slot="footer" class="dialog-footer")
        el-button(type="primary" @click="submitSelectBuilding") 确定 
        el-button(@click="cancelSelectBuilding") 取 消

  //- 编辑业务信息 弹窗
  .edit-business
    el-dialog(title="编辑业务信息" :visible.sync="dialogData.editBusiness.switch" width="460px" @close="cancelEditBusiness")
      el-form(ref="editBusinessForm" :model="dialogData.editBusiness.formParameter" :rules="dialogData.editBusiness.formRules" label-width="120px")
        el-form-item(label="业务类型")
          el-select(v-model="dialogData.editBusiness.formParameter.busiId" placeholder="请选择")
            el-option(v-for="(business,index) in businessOptions" :key="business.value" :label="business.label" :value="business.value")
        el-form-item(label="业务提供商")
          el-input(v-model="dialogData.editBusiness.formParameter.busiProvider" placeholder="请输入")
        el-form-item(label="异网客户经理")
          el-input(v-model="dialogData.editBusiness.formParameter.otherManagerName" placeholder="请输入")
        el-form-item(label="联系方式")
          el-input(v-model="dialogData.editBusiness.formParameter.otherManagerPhone" placeholder="请输入")
        el-form-item(label="到期时间")
          el-date-picker(v-model="dialogData.editBusiness.formParameter.busiEndDate" value-format="yyyy-MM-dd" type="date")
    
      div(slot="footer" class="dialog-footer")
        el-button(type="primary" @click="submitEditBusiness") 确定 
        el-button(@click="cancelEditBusiness") 取 消
</template>

<script>
// api
import { customerSpaceManage } from "@/api/dictSpace/customerSpaceManage";
import { AccountManagerInquiries } from "@/views/components"
export default {
  name: "CustomerSpaceManage",
  components: {
    AccountManagerInquiries
  },
  data() {
    let checkPhone = (rule, value, callback) => {
      const isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/; //手机号码
      const isMob= /^0?1[3|4|5|8][0-9]\d{8}$/; // 座机格式
      if(rule.required){
        if (!value) {
          return callback(new Error('联系电话不能为空'));
        }
      
        if(isMob.test(value)||isPhone.test(value))
          return callback();
        else
          return callback(new Error('请输入正确的手机号或座机号！'));
      }
    };
    return {
      isBranch : false,

      isAdd: true, // 判断铁三角经理是否为新增
      // 接收 url 传递过来的 companyId
      urlCompanyId: null,
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
      //关键人类型下拉列表
      keyPersonTypeOptions:  [
        {
          value: '10',
          label: '公司领导'
        }, {
          value: '20',
          label: '物业公司'
        }, {
          value: '30',
          label: '财务人员'
        }, {
          value: '40',
          label: '领票人'
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
        // 选中的企业客户数据，右侧用来使用
        signCompanyData: {}
      },
      // 右侧
      rightData: {
        // 顶部企业客户详情
        companyDetailsData: {},
        companyDetailsDataLoading: false,
        // tab 切换
        tabData: {
          // 标题切换索引
          activeIndex: 0,
          tabMenuListData: [
            {
              name: "关键人",
              data: 0
            },
            {
              name: "业务信息",
              data: 1
            },
            {
              name: "铁三角",
              data: 2
            }
          ],
          // 联系人表格
          keyPersonTableData: {
            loading: true,
            postData: {
              // 企业客户 id
              companyId: null,
              pageNum: 1,
              pageSize: 10
            },
            data: {
              list:[]
            }
          },
          // 企业客户视图
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
          businessData: {
            loading: false,
            postData: {
              // 企业客户 id
              companyId: null,
              pageNum: 1,
              pageSize: 10
            },
            data: {},
            // 需要提交的数据
            postData: {
              // 企业客户 id
              bldgId: null,
              // 渠道信息所填列表数据
              otherNetChannel: [],
              // 运营商资源情况所填列表数据
              serviceProvider: [],
              // 异网客户经理所填列表数据
              otherNetCustomer: []
            }
          },
          
          managerType: '',     //经理类型
          managerTypeName: '', // 经理类型名称
          technicaLoading: false,
          // 铁三角
          technicaData:[
            {
              title: '首席客户经理',
              maxLength: 1,
              managerType: 9,
              listData:[],
            },
            {
              title: '客户经理',
              maxLength: 5,
              managerType: 1,
              listData:[],
            },
            {
              title: '方案经理',
              maxLength: 5,
              managerType: 3,
              listData:[],
            },
            {
              title: '项目经理',
              maxLength: 5,
              managerType: 2,
              listData:[],
            },
          ]
        }
      },
      /***************************弹窗 部分 */
      dialogData: {
        // 选择楼宇
        selectBuilding: {
          switch: false,
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
          // 标记选中的楼宇数据，如果是楼宇页面跳转而来的话，这个值需要 created 接收并初始化一下
          signHouseData: {}
        },
        // 联系人维护表单（公用）
        contactMaintain: {
          switch: false,
          // 表单参数
          formParameter: {
            company_id: "",
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
        // 关键人维护表单（公用）
        keyPersonMaintain: {
          switch: false,
          keyPersonTitle: "新建关键人",
          // 表单参数
          formParameter: {
            company_id: "",
            contact_id: null,
            keyPersonName: "",
            keyPersonPhone: "",
            keyPersonType: ""
          },   
          // 表单规则
          formRules: {
            keyPersonName: [
              { required: true, message: "关键人名称不能为空", trigger: "blur" }
            ],
            keyPersonPhone: [
              {required: true, validator: checkPhone, trigger: "blur" }
            ],
            keyPersonType: [
               { required: true, message: "请选择关键人类型", trigger: "change" }
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
        // 商务企业客户 - 企业客户维护（公用）
        customerMaintain: {
          switch: false,
          // 表单参数
          formParameter: {
            // 修改使用
            companyId: null,
            // 新增使用
            bldgId: null,
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
              value: 1,
              label: "规章制度要求"
            },
            {
              value: 2,
              label: "采购设备限制上网行为"
            }
          ],
          systemOptions: [
            {
              value: 1,
              label: "门户网站"
            },
            {
              value: 2,
              label: "微信公众号"
            },
            {
              value: 3,
              label: "ERP系统"
            },
            {
              value: 4,
              label: "门店销售系统"
            },
            {
              value: 5,
              label: "OA办公系统"
            },
            {
              value: 6,
              label: "HR人力资源系统"
            },
            {
              value: 7,
              label: "其他系统"
            }
          ],
          haveComputerRoomOptions: [
            {
              value: 1,
              label: "无服务器及机房"
            },
            {
              value: 2,
              label: "有服务器但无标准机房"
            },
            {
              value: 3,
              label: "已有机房（5年以上）"
            },
            {
              value: 4,
              label: "新建机房（5年以内）"
            }
          ],
          interConditionList: [],
          infoSystemsList: [],
          formParameter: {
            netCnt: "",
            isInterNet: null,
            isNetPerson: null,
            interCondition: "",
            isClockin: null,
            isCertificate: null,
            isGoodWifi: null,
            isContact: null,
            isManyWifi: null,
            isGoodNet: null,
            infoSystems: "",
            isEngineRoom: null,
            otherSurveyinfo: ""
          }
        },
        // 编辑业务信息
        editBusiness: {
          switch: false,
          formParameter: {
            companyId: null,
            busiId: null,
            busiProvider: "",
            otherManagerName: "",
            otherManagerPhone: "",
            busiEndDate: ""
          },
          formRules: {}
        }
      }
    };
  },
  watch: {
    $route: {
      handler(route) {
        this.urlCompanyId = route.query.companyId;
      },
      immediate: true
    }
  },
  created() {
    const me = this;
    // 判断是否为分公司 22为市公司
    me.isBranch = me.$store.getters.areaId != 22;

    me.getPageData();
  },
  methods: {
    /**
     * 获取页面基本数据
     */
    getPageData() {
      const me = this;
      me.getCompInformationIntegrityRate();
    },
    /***************************左侧 部分 */
    /**
     * 获取 企业客户信息完整率 数据
     */
    getCompInformationIntegrityRate() {
      const me = this;
      me.leftData.perLoading = true;
      customerSpaceManage
        .getCompInformationIntegrityRate()
        .then(res => {
          // 由于 js 计算不精确，所以数字转换时需要特殊处理
          res.data && (me.leftData.infoPer = (res.data * 1000) / 10);
        })
        .finally(() => {
          me.leftData.perLoading = false;
        });
    },
    /**
     * 获取 企业客户列表信息 数据
     */
    getcompanybyname() {
      const me = this;
      me.leftData.listLoading = true;
      customerSpaceManage
        .getcompanybyname(me.leftData.listPostData)
        .then(res => {
          if (me.leftData.listPostData.pageNum === 1) {
            // 初始化操作
            me.leftData.listData = res.data;
            // 判断如果页面是从楼宇页面跳转过来的话，需要设置默认显示的企业客户
            if (me.urlCompanyId) {
              me.leftData.signCompanyData = {
                company_id: me.urlCompanyId
              };
            } else {
              // 默认选中第一个企业客户
              me.leftData.signCompanyData = me.leftData.listData.list[0];
            }
            me.getcompanybyid();
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
    getCompanyLeftList() {
      const me = this;
      if (
        me.leftData.listPostData.pageNum === 0 ||
        me.leftData.listPostData.pageNum < me.leftData.listData.pages
      ) {
        me.leftData.listPostData.pageNum++;
        me.getcompanybyname();
      }
    },
    /**
     * 检索值发生改变时回调，主要是需要重置页码为 1
     */
    companySearchChangeHandle() {
      const me = this;
      me.leftData.listPostData.pageNum = 1;
    },
    /**
     * 选中单个企业客户回调
     */
    chooseCompanyHandle(companyData) {
      const me = this;
      me.leftData.signCompanyData = companyData;
      me.getcompanybyid();
    },
    /***************************右侧 部分 */
    /**
     * 获取 单个企业客户的详情数据
     */
    getcompanybyid() {
      const me = this;
      me.rightData.companyDetailsDataLoading = true;
      const { company_id } = me.leftData.signCompanyData;
      // 判断如果左侧选中的企业客户数据清空的话，不请求数据
      company_id &&
        customerSpaceManage
          .getcompanybyid({
            id: company_id
          })
          .then(res => {
            me.rightData.companyDetailsData = res.data;
            // 联动右侧 tab 的数据
            switch (me.rightData.tabData.activeIndex) {
              case 0:
                me.getKeyPersons();
                // me.getcompanycontact();
                break;
              case 1:
                me.getcompanyBusiness();
                break;
              case 2:
                me.getManagers();
                break;
              default:
                break;
            }
          })
          .finally(() => {
            me.rightData.companyDetailsDataLoading = false;
          });
    },
    /**
     * 点击企业详情右上角 编辑 按钮回调
     */
    async editActiveCompanyHandle() {
      const me = this;
      // 设置 商务楼宇 - 企业客户维护（公用）表单中的初始值
      me.dialogData.customerMaintain.formParameter = Object.assign(
        me.dialogData.customerMaintain.formParameter,
        me.rightData.companyDetailsData
      );
      me.dialogData.customerMaintain.formParameter.companyId =
        me.leftData.signCompanyData.company_id;
      // 判断如果业务信息列表为空的话，需要先请求弹窗中需要的业务信息列表
      if (
        !me.rightData.tabData.businessData.data.list ||
        !me.rightData.tabData.businessData.data.list.length
      ) {
        let data = await me.getcompanyBusiness();
        data = data || [];
        console.log(data);
        me.dialogData.customerMaintain.formParameter.business = data;
      } else {
        me.dialogData.customerMaintain.formParameter.business =
          me.rightData.tabData.businessData.data.list || [];
      }

      me.dialogData.customerMaintain.switch = true;
    },
    /**
     * 提交 编辑当前企业客户 数据
     */
    updatecompany() {
      const me = this;
      // 获取企业客户 id
      const { company_id } = me.leftData.signCompanyData;
      me.dialogData.customerMaintain.formParameter.companyId = company_id;
      customerSpaceManage
        .updatecompany(me.dialogData.customerMaintain.formParameter)
        .then(res => {
          me.$message.success("修改成功！");
          // 同步更新业务信息表格
          me.rightData.tabData.activeIndex === 1 && me.getcompanyBusiness();
        })
        .finally(() => {
          me.getcompanybyid();
          me.cancelCustomerMaintain();
        });
    },
    /**
     * 获取 单个企业客户的更新历史
     */
    getcompanyhistory() {
      const me = this;
      const { company_id } = me.leftData.signCompanyData;
      customerSpaceManage
        .getcompanyhistory({
          id: company_id
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
          // 获取关键人
          // me.getcompanycontact();
          me.getKeyPersons();
          break;
        case 1:
          // 业务信息
          me.getcompanyBusiness();
          break;
        case 2:
          // 获取铁三角
           me.getManagers();
          break;
        default:
          break;
      }
    },

    /*******************************联系人 */
    /**
     * 获取 联系人表格 数据
     */
    getcompanycontact() {
      const me = this;
      me.rightData.tabData.keyPersonTableData.loading = true;
      // 获取企业客户 id
      const { company_id } = me.leftData.signCompanyData;
      me.rightData.tabData.keyPersonTableData.postData.companyId = company_id;
      customerSpaceManage
        .getcompanycontact(me.rightData.tabData.keyPersonTableData.postData)
        .then(res => {
          me.rightData.tabData.keyPersonTableData.data = res.data;
        })
        .finally(() => {
          me.rightData.tabData.keyPersonTableData.loading = false;
        });
    },
    /**
     * 联系人表格 删除 点击回调
     * customerId 客户编码
     * keyPersonName 关键人 姓名
     * keyPersonType 关键人 类型
     */
    deleteContactHandle({ customerId, keyPersonName, keyPersonId, typeId: keyPersonType, keyPersonType: PersonType }) {
      const me = this;
      me.$confirm(`确认删除${PersonType}：${keyPersonName}？`, "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        return customerSpaceManage.deleteKeyPerson({
          customerId,
          keyPersonId,
          keyPersonName,
          keyPersonType
        });
        // return customerSpaceManage.deletecompanycontact({
        //   contactId: contact_id
        // });

      })
      .then(() => {
        me.$message.success("删除成功！");
        me.getKeyPersons();
        // me.getcompanycontact();
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
    // editContactHandle({
    //   contact_id,
    //   contact_name,
    //   contact_gender,
    //   contact_phone,
    //   contact_pstn
    // }) {
    //   const me = this;
    //   me.dialogData.contactMaintain.formParameter = {
    //     contact_id,
    //     contact_name,
    //     contact_gender,
    //     contact_phone,
    //     contact_pstn
    //   };
    //   me.dialogData.contactMaintain.switch = true;
    // },

    /*******************************业务信息 */
    /**
     * 获取 业务信息列表 数据
     */
    getcompanyBusiness() {
      const me = this;
      me.rightData.tabData.businessData.loading = true;
      // 获取企业客户 id
      const { company_id } = me.leftData.signCompanyData;
      me.rightData.tabData.businessData.postData.companyId = company_id;
      return new Promise(resolve => {
        customerSpaceManage
          .getcompanyBusiness(me.rightData.tabData.businessData.postData)
          .then(res => {
            me.rightData.tabData.businessData.data = res.data;
            resolve(res.data.list);
          })
          .finally(() => {
            me.rightData.tabData.businessData.loading = false;
          });
      });
    },
    /**
     * 业务信息表格 删除 点击回调
     * contact_id 联系人 id
     */
    deleteBusinessHandle({ serviceId }) {
      const me = this;
      me.$confirm(`是否确认删除？`, "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return customerSpaceManage.deletecompanyBusiness({
            serviceId: serviceId
          });
        })
        .then(() => {
          me.$message.success("删除成功！");
          me.getcompanyBusiness();
        })
        .catch(function() {});
    },
    /**
     * 业务信息表格 编辑 点击回调
     * serviceId 业务 id
     * busiId 业务类型
     * busiProvider 业务提供商
     * otherManagerName 异网客户经理
     * otherManagerPhone 异网客户经理联系方式
     * busiEndDate 业务到期时间 2019-11-08
     */
    editBusinessHandle({
      serviceId,
      busiId,
      busiProvider,
      otherManagerName,
      otherManagerPhone,
      busiEndDate
    }) {
      const me = this;
      me.dialogData.editBusiness.formParameter = {
        serviceId,
        busiId,
        busiProvider,
        otherManagerName,
        otherManagerPhone,
        busiEndDate
      };
      me.dialogData.editBusiness.switch = true;
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
            customerSpaceManage
              .updatecompanycontact(me.dialogData.contactMaintain.formParameter)
              .then(res => {
                me.$message.success("编辑成功！");
                me.getcompanycontact();
              })
              .finally(() => {
                me.cancelContactForm();
              });
          } else {
            // 新增
            const { company_id } = me.leftData.signCompanyData;
            me.dialogData.contactMaintain.formParameter.company_id = company_id;
            customerSpaceManage
              .addcompanycontact(me.dialogData.contactMaintain.formParameter)
              .then(res => {
                me.$message.success("新增成功！");
                me.getcompanycontact();
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
        company_id: "",
        contact_id: null,
        contact_name: "",
        contact_gender: "",
        contact_phone: "",
        contact_pstn: ""
      };
      me.resetForm("contactMaintainForm");
    },
    /**
     * 修改关键人回调
     */
    editContactHandle({keyPersonId, keyPersonName, keyPersonPhone, typeId: keyPersonType}){
      this.dialogData.keyPersonMaintain.keyPersonTitle = "修改关键人";
      this.dialogData.keyPersonMaintain.formParameter.keyPersonId = keyPersonId;
      this.dialogData.keyPersonMaintain.formParameter.keyPersonName = keyPersonName;
      this.dialogData.keyPersonMaintain.formParameter.keyPersonPhone = keyPersonPhone;
      this.dialogData.keyPersonMaintain.formParameter.keyPersonType = keyPersonType;
      this.dialogData.keyPersonMaintain.formRules.keyPersonPhone = 
         [
            { required: true, 
              validator: (rule, value, callback) => {
                const isPhone = /^0?(13|14|15|18|17|16|19)[0-9]{9}$/; //手机号码
                // const isMob= /^0?1[3|4|5|8][0-9]\d{8}$/; // 座机格式
                const isMob = /0\d{10,11}/;
                if(rule.required){
                  if (!value) {
                    return callback(new Error('联系电话不能为空'));
                  }
                
                  if(isMob.test(value)||isPhone.test(value))
                    return callback();
                  else
                    return callback(new Error('请输入正确的手机号或座机号（带区号）！'));
                }
              }, 
              trigger: "blur" 
            }
        ];
      this.dialogData.keyPersonMaintain.switch = true;
    },

    /**
     * 
     */
    openAddKeyPerson(){
      this.dialogData.keyPersonMaintain.keyPersonTitle = "新建关键人";
      this.dialogData.keyPersonMaintain.switch = true;
      // 
      if(this.rightData.tabData.keyPersonTableData.data.list.length >= 1){
        this.dialogData.keyPersonMaintain.formRules.keyPersonPhone = 
          [
            { required: false, 
              validator: (rule, value, callback) => {
                const isPhone = /^0?(13|14|15|18|17|16|19)[0-9]{9}$/; //手机号码
                // const isMob= /^0?1[3|4|5|8][0-9]\d{8}$/; // 座机格式\
                const isMob = /0\d{10,11}/;
                  if (!value) {
                    return callback();
                  }
                
                  if(isMob.test(value)||isPhone.test(value)){
                    this.verificationPhone(value)
                    .then(res =>{
                      if (res)
                        callback(new Error('输入的手机号或座机号重复，请检查！！！'));
                      else
                        callback();
                    })
                  }
                  else{
                    return callback(new Error('请输入正确的手机号或座机号（带区号）！'));
                  }

              }, 
              trigger: "blur" 
            }
        ];
      } else {
        this.dialogData.keyPersonMaintain.formRules.keyPersonPhone = 
          [
            { required: true, 
              validator: (rule, value, callback) => {
                const isPhone = /^0?(13|14|15|18|17|16|19)[0-9]{9}$/; //手机号码
                // const isMob= /^0?1[3|4|5|8][0-9]\d{8}$/; // 座机格式\
                const isMob = /0\d{10,11}/;
                if(rule.required){
                  if (!value) {
                    return callback(new Error('联系电话不能为空'));
                  }
                
                  if(isMob.test(value)||isPhone.test(value)){
                   this.verificationPhone(value)
                    .then(res =>{
                      if (res)
                        callback(new Error('输入的手机号或座机号重复，请检查！！！'));
                      else
                        callback();
                    })
                  }
                  else
                    return callback(new Error('请输入正确的手机号或座机号（带区号）！'));
                }
              }, 
              trigger: "blur" 
            }
        ];
      }
    },

    /**
     * 提交关键人维护表单
     */
    submitKeyPersonForm() {
      const me = this;
      const companyName = me.rightData.companyDetailsData.companyName;
      const { company_id: customerId } = this.leftData.signCompanyData;
      const { keyPersonName, keyPersonPhone, keyPersonType } = me.dialogData.keyPersonMaintain.formParameter;
      const params = {
        customerId,
        customerName: companyName,
        keyPersonName,
        keyPersonPhone,
        keyPersonType
      }
      me.$refs["keyPersonMaintainForm"].validate(valid => {
        if (valid) {
          if( this.dialogData.keyPersonMaintain.keyPersonTitle === "新建关键人")
            this.addKeyPerson(params);
          else{
            params.keyPersonId = me.dialogData.keyPersonMaintain.formParameter.keyPersonId;
            this.updateKeyPerson(params);
          }
          me.dialogData.keyPersonMaintain.switch = false;
        }
      });
    },
    /**
     * 添加关键人
     */
    addKeyPerson(params){
      const me = this;
      customerSpaceManage.addKeyPerson(params)
      .then(res => {
        if(res.code == 200){
          me.$message.success(res.msg);
          this.getKeyPersons();
        }
      })
      .finally(()=>{})
    },
    /**
     * 修改关键人
     */
    updateKeyPerson(params){
      const me = this;
      customerSpaceManage.updateKeyPerson(params)
      .then(res => {
        if(res.code == 200){
          me.$message.success(res.msg);
          this.getKeyPersons();
        }
      })
      .finally(()=>{})
    },
    /**
     * 获取关键人
     */
    getKeyPersons(){
      const me = this;
      me.rightData.tabData.keyPersonTableData.loading = true;
      const { company_id: customerId } = this.leftData.signCompanyData;
      customerSpaceManage.getKeyPersons({customerId})
      .then(res => {
        if(res.code == 200)
          me.rightData.tabData.keyPersonTableData.data.list = res.data;
      })
      .finally(()=>{me.rightData.tabData.keyPersonTableData.loading = false;})
    },
    /**
     * 关闭关键人维护弹窗
     */
    cancelKeyPersonForm() {
      const me = this;
      me.dialogData.keyPersonMaintain.switch = false;
      me.dialogData.keyPersonMaintain.formParameter = {
        company_id: "",
        contact_id: null,
        keyPersonName: "",
        keyPersonPhone: "",
        keyPersonType: ""
      };
      me.resetForm("keyPersonMaintainForm");
    },

    /**
     * 提交 编辑业务信息 表单
     */
    submitEditBusiness() {
      const me = this;
      me.$refs["editBusinessForm"].validate(valid => {
        if (valid) {
          customerSpaceManage
            .updatecompanyBusiness(me.dialogData.editBusiness.formParameter)
            .then(res => {
              me.$message.success("编辑成功！");
              me.getcompanyBusiness();
            })
            .finally(() => {
              me.cancelEditBusiness();
            });
        }
      });
    },
    /**
     * 关闭 编辑业务信息 弹窗
     */
    cancelEditBusiness() {
      const me = this;
      me.dialogData.editBusiness.switch = false;
      me.dialogData.editBusiness.formParameter = {
        companyId: null,
        busiId: null,
        busiProvider: "",
        otherManagerName: "",
        otherManagerPhone: "",
        busiEndDate: ""
      };
      me.resetForm("editBusinessForm");
    },
    /**
     * 关闭更新历史列表（公用）
     */
    cancelUpdateHistory() {
      const me = this;
      // 清空内部的列表数据
      me.dialogData.updateHistory.listData = [];
      me.rightData.tabData.keyPersonTableData.signCustomerData = {};
      me.dialogData.updateHistory.switch = false;
    },
    /**
     * 提交商务楼宇/企业客户 - 企业客户维护（公用）表单
     */
    submitCustomerMaintain() {
      const me = this;
      me.$refs["customerMaintainForm"].validate(valid => {
        if (valid) {
          // 判断是修改还是新增
          const { companyId } = me.dialogData.customerMaintain.formParameter;
          if (companyId) {
            // 修改
            me.updatecompany();
          } else {
            // 新增
            me.addcompany();
          }
        }
      });
    },
    /**
     * 关闭商务楼宇/企业客户 - 企业客户维护（公用）弹窗
     */
    cancelCustomerMaintain() {
      const me = this;
      me.dialogData.customerMaintain.switch = false;
      // 清空 商务楼宇 - 企业客户维护（公用）表单中的数据
      me.dialogData.customerMaintain.formParameter = {
        // 修改使用
        companyId: null,
        // 新增使用
        bldgId: null,
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
     * 获取 商机调查 表单 数据
     */
    getsurvey() {
      const me = this;
      const { company_id } = me.leftData.signCompanyData;
      customerSpaceManage
        .getsurvey({
          companyId: company_id
        })
        .then(res => {
          me.dialogData.businessInvestigation.formParameter = res.data;
          me.dialogData.businessInvestigation.switch = true;
        });
    },
    /**
     * 提交商机调查（公用）表单
     */
    submitBusinessInvestigation() {
      const me = this;
      me.$refs["businessInvestigationForm"].validate(valid => {
        if (valid) {
          // 转换数据
          me.dialogData.businessInvestigation.formParameter.interCondition = me.dialogData.businessInvestigation.interConditionList.join(
            ","
          );
          me.dialogData.businessInvestigation.formParameter.infoSystems = me.dialogData.businessInvestigation.infoSystemsList.join(
            ","
          );
          const { company_id } = me.leftData.signCompanyData;
          me.dialogData.businessInvestigation.formParameter.companyId = company_id;

          customerSpaceManage
            .addsurvey(me.dialogData.businessInvestigation.formParameter)
            .then(res => {
              me.$message.success("提交成功！");
              me.dialogData.businessInvestigation.switch = false;
            });
        }
      });
    },
    /**
     * 关闭商机调查（公用）弹窗
     */
    cancelBusinessInvestigation() {
      const me = this;
      me.dialogData.businessInvestigation.switch = false;
      me.dialogData.businessInvestigation.formParameter = {
        userName: "",
        sex: "",
        userAddress: "",
        userPhone: "",
        userJob: ""
      };
      me.resetForm("businessInvestigationForm");
    },
    /***************************新增客户 部分 */
    /**
     * 新增客户 按钮 点击回调
     */
    openSelectBuilding() {
      const me = this;
      me.cancelCustomerMaintain();
      // 打开楼宇选择弹窗
      me.dialogData.selectBuilding.switch = true;
      me.getHouseList();
    },
    /**
     * 选中单个楼宇回调
     */
    chooseHouseHandle(houseData) {
      const me = this;
      me.dialogData.selectBuilding.signHouseData = houseData;
    },
    /**
     * 提交 选择楼宇 弹窗 数据
     */
    submitSelectBuilding() {
      const me = this;
      // 判断是否未选择
      const { bldg_id, bldg_add } = me.dialogData.selectBuilding.signHouseData;
      if (!bldg_id) {
        me.$message.warning("请先选择楼宇！");
      } else {
        // 赋值
        me.dialogData.customerMaintain.formParameter.bldgId = bldg_id;
        me.dialogData.customerMaintain.formParameter.companyAddr = bldg_add;
        // 打开 企业客户维护（公用）弹窗
        me.dialogData.customerMaintain.switch = true;
        me.cancelSelectBuilding();
      }
    },
    /**
     * 关闭 选择楼宇 弹窗
     */
    cancelSelectBuilding() {
      const me = this;
      me.dialogData.selectBuilding.switch = false;
    },
    /**
     * 获取 楼宇列表信息 数据
     */
    getbuildingbyname() {
      const me = this;
      me.dialogData.selectBuilding.listLoading = true;
      customerSpaceManage
        .getbuildingbyname(me.dialogData.selectBuilding.listPostData)
        .then(res => {
          if (me.dialogData.selectBuilding.listPostData.pageNum === 1) {
            // 初始化操作
            me.dialogData.selectBuilding.listData = res.data;
            // 默认选中第一个楼宇
            me.dialogData.selectBuilding.signHouseData =
              me.dialogData.selectBuilding.listData.list[0];
          } else {
            me.dialogData.selectBuilding.listData.list = me.dialogData.selectBuilding.listData.list.concat(
              res.data.list
            );
          }
        })
        .finally(() => {
          me.dialogData.selectBuilding.listLoading = false;
        });
    },
    /**
     * 滚动加载列表数据
     */
    getHouseList() {
      const me = this;
      if (
        me.dialogData.selectBuilding.listPostData.pageNum === 0 ||
        me.dialogData.selectBuilding.listPostData.pageNum <
          me.dialogData.selectBuilding.listData.pages
      ) {
        me.dialogData.selectBuilding.listPostData.pageNum++;
        me.getbuildingbyname();
      }
    },
    /**
     * 检索值发生改变时回调，主要是需要重置页码为 1
     */
    houseSearchChangeHandle() {
      const me = this;
      me.dialogData.selectBuilding.listPostData.pageNum = 1;
    },
    /**
     * 新增企业客户
     */
    addcompany() {
      const me = this;
      customerSpaceManage
        .addcompany(me.dialogData.customerMaintain.formParameter)
        .then(res => {
          me.$message.success("新增成功！");
        })
        .finally(() => {
          me.cancelCustomerMaintain();
        });
    },
    /**
     * 获取客户经理
     */
    getManagers () {
      const me = this;
      const { company_id } = me.leftData.signCompanyData;
      me.rightData.tabData.technicaLoading = true;
      customerSpaceManage.getManagers({
        customerId: company_id
      })
      .then(res => {
        if(res.code == 200){
          me.rightData.tabData.technicaData[0].listData = res.data.vip == undefined ? [] : res.data.vip;
          me.rightData.tabData.technicaData[1].listData = res.data.customer == undefined ? [] : res.data.customer;
          me.rightData.tabData.technicaData[2].listData = res.data.solution == undefined ? [] : res.data.solution;
          me.rightData.tabData.technicaData[3].listData = res.data.project == undefined ? [] : res.data.project;  
        }
      })
      .finally(() => {
        me.rightData.tabData.technicaLoading = false;
      })
    },

    /**
     * 打开客户经理查询
     */
    manageDialog(managerTypeName, managerType, isAdd = true) {
      this.isAdd = isAdd; // 铁三角经理是否为新增
      this.rightData.tabData.managerTypeName = managerTypeName;
      this.rightData.tabData.managerType = managerType;
      this.$refs.accountManagerInquiries.openManageDialog();
    },
    /**
     * 获取客户经理选择数据
     */
    manageData (val) {
      const { company_id, company_name } = this.leftData.signCompanyData;
      const me = this,
            params = val;
      params.managerType = this.rightData.tabData.managerType;
      params.managerTypeName = this.rightData.tabData.managerTypeName;
      params.customerId = company_id;
      params.customerName = company_name;
      params.managerId = val.managerId;
      params.mobilePhone = val.mobilePhone;
      params.regionNbr = val.regionNbr;
      params.ROW_ID = undefined;
      params.orderNum = 1; 
      if(this.isAdd){
        switch (this.rightData.tabData.managerType) {
          case 1:
            params.orderNum = me.rightData.tabData.technicaData[1].listData.length + 1;
            break;
          case 2:
            params.orderNum = me.rightData.tabData.technicaData[3].listData.length + 1;
            break;
          case 3:
            params.orderNum = me.rightData.tabData.technicaData[2].listData.length + 1;
            break;
          default:
            params.orderNum = 1;
            break;
        }
        customerSpaceManage.addManager(params)
        .then(res => {
          if(res.code == 200){
            me.$message.success(res.msg);
            me.getManagers();
          }
        })
        .finally(() => {
          me.getManagers();
        })
      } else{
        customerSpaceManage.updateManager(params)
        .then(res => {
          if(res.code == 200){
            me.$message.success(res.msg);
            me.getManagers();
          }
        })
        .finally(() => {
          me.getManagers();
        })
      }
    },

    /**
     *  @param managerType 客户经理类型
     *  @param managerId   客户经理Id
     */
    delManager(managerType, managerId){
      const me = this;
      this.$confirm('你确定删除该经理吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        me.deleteManager(managerType, managerId);
      }).catch(() => {
         
      });
    },
    /**
     * 删除客户经理
     */
    deleteManager(managerType, managerId){
      const me = this;
      const { company_id } = this.leftData.signCompanyData;
      customerSpaceManage.deleteManager({
        customerId: company_id.toString(),
        managerType,
        managerId
      })
      .then(res =>{
        if (res.code == 200) {
          this.$message({
            type: 'success',
            message: res.msg
          });
          me.getManagers();
        }
      })
    },
    /**
     * 验证手机号是否重复
     */
    async verificationPhone (phone = null) {
      const { company_id } = this.leftData.signCompanyData;
      const res = await customerSpaceManage.checkKeyPersonPhone({
        customerId : company_id, 
        keyPersonPhone: phone
      });
      return res.data;
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
.customer-space-manage
  min-width $min-width
  // 返回按钮
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
  .list-data-none
    color #666
    text-align center
    line-height 100px
  .page-top
    .top-content
      layout-content()
      margin 15px auto
      display flex
      justify-content space-between
      align-items center
      padding 0 20px 0 60px
      line-height 60px
      height 60px
      background url('~@/assets/image/dictSpace/customerSpaceManage/top-bg.jpg') left center
      background-size cover
      .title-text
        color #939EAB
        font-size 18px
        .el-button
          margin 0 0 0 20px
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
            &>div:nth-child(3)
              margin 0 0 0 20px
              &:before
                background url('~@/assets/image/dictSpace/customerSpaceManage/icon-business.png') left center
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
              for index in 1 2 3
                &:nth-child({index})
                  &:before
                    background url('~@/assets/image/dictSpace/customerSpaceManage/icon-tab-' + index + '.png') center center no-repeat
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
              .tab-content-box
                display flex
                margin-top 15px
                .tab-box-left
                  border-right 3px solid #36ab60
                  margin-right 10px
                  width 140px
                  // height 131.6px
                  // margin auto
                  text-align center
                  display flex
                  align-items center
                  .tab-box-inner
                    img
                      width 50px
                      height 50px
                      margin 10px 0px
                .tab-box-right
                  width calc(100% - 160px)
      .business-investigation
        overflow-y auto
        .history-form
          .el-button
            display block
            margin 0 auto
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
  .technica-maintain
    .el-form
      margin-left -20px
    .el-input
      width 187px
  // 选择楼宇弹窗
  .select-building
    .select-content
      height 400px
      .list-content
        height 400px
        .list-data
          max-height 400px
          padding 20px 0
          overflow-y auto
          .list-item
            cursor pointer
            padding 10px 40px 10px 10px
            display flex
            margin 0 0 12px 0
            box-shadow 0px 5px 14px 0px rgba(0, 0, 0, 0.11), 0 0 0 1px rgba(228, 231, 236, 1) inset
            border-radius 3px
            .item-icon
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
                line-height 22px
                .per-title
                  color #939EAB
                  font-size 12px
                .per-val
                  color #3E4053
                  font-size 16px
                  font-weight 600px
            &-active
              box-shadow 0px 5px 14px 0px rgba(0, 0, 0, 0.11), 0 0 0 2px rgba(247, 191, 71, 1) inset
              position relative
              &:before
                content ''
                width 0
                height 0
                position absolute
                right 0
                bottom 0
                border-style solid
                border-color transparent rgba(247, 191, 71, 1) rgba(247, 191, 71, 1) transparent
                border-width 18px 18px
              &:after
                content ''
                width 14px
                height 13px
                background url('~@/assets/image/dictSpace/customerSpaceManage/icon-selected.png') center center no-repeat
                position absolute
                right 4px
                bottom 4px
              
</style>
