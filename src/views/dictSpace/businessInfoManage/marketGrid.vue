<template lang="pug">
<div class="grid-info">
  <div class="page-main">
    <div class="page-list">
      <div class="info-per" v-loading="perLoading">
        <div class="info-text">
          <el-button type="primary" size="mini" @click="jumpBack">返回</el-button>
          <span>总渗透率</span>
          <span class="text-value">{{parentPageParam.STL_RATE}}%</span>
        </div>
        <div class="info-img">
          <div class="img-mask" :style="{ left: parentPageParam.STL_RATE + '%' }"></div>
        </div>
      </div>
      <div class="house-data">
        <div class="search-input">
          <el-button class="addGridBtn" type="primary" size="small" @click="beforeAddGrid">新增空间</el-button>
          <el-input placeholder="请输入空间名称" prefix-icon="el-icon-search" v-model="spaceName" @keyup.enter.native="getSpaceListByName"></el-input>
        </div>
        <div class="list-content" v-loading="spaceListLoading">
          <ul class="list-data" v-infinite-scroll="getSpaceListByScroll">
            <li class="list-item" v-for="(item,index) in spaceList.records" :key="index" :class="{ 'list-item-active': selectedSpace.ZONE_ID === item.ZONE_ID }" @click="chooseSpaceHandle(item)">
              <div class="item-content">
                <div class="list-per">
                  <div class="list-title">{{item.ZONE_NAME}}</div>
                  <div class="per-val">{{item.STL_RATE}}%</div>
                </div>
                <div class="list-per">
                  <div class="per-title">{{item.ZONE_ADDR}}</div>
                </div>
              </div>
            </li>
          </ul>
          <div class="list-data-none" v-if="spaceList.total === 0">暂无数据</div>
        </div>
      </div>
    </div>
    <div class="page-details" v-if="selectedSpace">
      <div class="house-details">
        <div class="base-info" v-loading="spaceDetailsDataLoading">
          <div class="info-per">
            <el-progress type="circle" :stroke-width="10" :width="128" :percentage="selectedSpace.STL_RATE" color="#FF8E3B" :format="format"></el-progress>
          </div>
          <div class="info-details">
            <h4>{{ selectedSpace.ZONE_NAME }}</h4>
            <div class="info-list">
              <div class="list-item">
                <div class="info-item">
                  <div class="item-title">空间类型：</div>
                  <div class="item-text">{{parentPageParam.ZONE_TYPE_NAME}}</div>
                </div>
              </div>
              <div class="list-item">
                <div class="info-item">
                  <div class="item-title">企业数：</div>
                  <div class="item-text">{{companyCnt}}</div>
                </div>
              </div>
              <div class="list-item" style="min-width:600px">
                <div class="info-item">
                  <div class="item-title">经营单元：</div>
                  <div class="item-text">{{selectedSpace.LATN_NAME}}&nbsp;-&nbsp;{{selectedSpace.ORG3_NAME}}&nbsp;-&nbsp;{{selectedSpace.ORG4_NAME}}&nbsp;-&nbsp;{{selectedSpace.ORG5_NAME}}</div>
                </div>
              </div>
              <div class="list-item">
                <div class="info-item">
                  <div class="item-title">空间地址：</div>
                  <div class="item-text">{{selectedSpace.ZONE_ADDR}}</div>
                </div>
              </div>
            </div>
            <div class="info-button" style="color:#999;font-size:14px;">
              <div class="button-edit" @click="beforeEditGrid">编辑</div>
              <div class="button-history" @click="getGridHistory">更新历史</div>
            </div>
          </div>
        </div>
        <div class="info-tab">
          <div class="tab-menu">
            <div class="menu-item" v-for="(item,index) in tabMenuListData" :key="item.data" :class="{ 'menu-item-active': activeIndex === item.data }" @click="tabSwitchhandle(item.data)"> {{ item.name }} </div>
          </div>
          <div class="tab-details">
            //- 企业客户
            <div class="tab-content" v-if="activeIndex === 0">
              .tab-top
                .tab-add
                  el-button(type="primary" icon="el-icon-plus" @click="dialogData.customerMaintain.switch = true") 新增客户
                .tab-search
                  el-input(placeholder="请输入客户名称" prefix-icon="el-icon-search" v-model="customerTableData.postData.companyName")
                  el-button(type="primary" @click="searchCompanyHandle") 搜索
              .tab-bottom
                .tab-table
                  el-table(:data="customerTableData.data.records" v-loading="customerTableDataLoading" max-height="390px")
                    el-table-column(prop="ENT_NAME" label="企业名称")
                      template(slot-scope="scope")
                        span.jump-link(@click="jumpCompanyView(scope.row)") {{ scope.row.ENT_NAME }}
                    el-table-column(prop="ENT_ADDR" label="企业地址")
                    el-table-column(prop="ENT_KIND" label="企业类型" width="90")
                      template(slot-scope="scope")
                        span {{ scope.row.ENT_KIND }}
                    el-table-column(prop="LINK_TELE" label="联系电话" width="130")
                    el-table-column(prop="ZGDX_FLAG_NAME" label="是否电信用户" width="110")
                      template(slot-scope="scope")
                        span(:class="{ 'font-color-red': scope.row.ZGDX_FLAG === 1, 'font-color-blue': scope.row.ZGDX_FLAG === 2, 'font-color-green': scope.row.ZGDX_FLAG === 0 }") {{ scope.row.ZGDX_FLAG_NAME }}
                    el-table-column(label="操作" width="110")
                      template(slot-scope="scope")
                        el-button(type="primary" @click="getCompanyHistory(scope.row)" round) 更新历史
                .tab-pagination(v-if="customerTableData.data.total > 0")
                  pagination(:total="customerTableData.data.total" :page.sync="customerTableData.postData.pageNum" :limit.sync="customerTableData.postData.pageSize" @pagination="companyPagination")
            </div>
            //- 空间地址
            <div class="tab-content" v-else-if="activeIndex === 1">
              .tab-bottom
                .tab-table
                  el-table(:data="bldgTableData.data" v-loading="bldgTableDataLoading" :row-class-name="tableRowClassName" :key="treeTableKey" max-height="460px" row-key="ADDR_ID" lazy :load="loadTreeTable" :tree-props="{children: 'children', hasChildren: 'hasChildren'}")
                    el-table-column(prop="ADDR_NAME" label="标准地址名称" align="left")
                      template(slot-scope="scope")
                        el-popover(trigger="hover" placement="top")
                          span {{scope.row.ADDR_DESC}}
                          name-wrapper(slot="reference") {{scope.row.ADDR_NAME}}
                    el-table-column(prop="ADDR_TYPE" label="标准地址层级" width="110")
                    el-table-column(prop="ENT_NAME" label="入住企业名称")
                    el-table-column(prop="ZGDX_FLAG" label="企业类别" width="110")
                    el-table-column(label="操作" width="210")
                      template(slot-scope="scope")
                        el-link(v-if="scope.row.ADDR_LEVEL === 10" type="primary" :underline="false" @click="queryEntBaseInfo(scope,scope.row)") 认领企业 &nbsp;
                        el-link(v-else-if="scope.row.ADDR_LEVEL != 10" type="primary" :underline="false" @click="changeName(scope.row)") 添加下级 &nbsp;
                        el-link(type="primary" :underline="false" @click="changeName(scope.row)") 名称变更 &nbsp;
            </div>
            <div class="tab-content" v-else-if="activeIndex === 2">
              .analysis-view
                el-row(:gutter="10")
                  el-col(:span="12")
                    .grid-title 光端口使用情况
                    .grid-content
                      EchartsWaterWaveBall(:dataItems="waterWaveBallChart")
                  el-col(:span="12")
                    .grid-title 各业务收入占比
                    .grid-content
                      EchartsPie(:dataItems="pieChart")
                el-row(:gutter="10" style="margin-top:10px")
                  el-col(:span="12")
                    .grid-title 本月各业务发展情况
                    .grid-content
                      EchartsLine(:dataItems="lineChart")
                  el-col(:span="12")
                    .grid-title 各业务计费到达情况
                    .grid-content
                      EchartsBar(:dataItems="barChart")
            </div>
            <div class="tab-content" v-else-if="activeIndex === 3">
              iframe(width="100%" height="650px" min-height="650px" :src="iframeUrl")
            </div>
          </div>
        </div>
        //- 更新历史列表（公用）
        .update-history(v-if="dialogData.updateHistory.switch")
          .history-title
            h3 更新历史 #[span.color-red ({{ dialogData.updateHistory.listData.length }})]
            .close-button(@click="cancelUpdateHistory")
              i.el-icon-close
          .history-content
            .house-title {{ selectedSpace.gridName || customerTableData.selectedCustomerData.companyName || bldgTableData.selectedBldgData.bldgName }}
            ul.history-list
              li.list-item(v-for="(item,index) in dialogData.updateHistory.listData" :key="index")
                .item-title #[span.item-user {{ item.name }}] {{ item.time }}
                .item-details {{ item.text }}
            .list-data-none(v-if="dialogData.updateHistory.listData.length === 0") 暂无数据
      </div>
    </div>
  </div>
  //- 企业客户维护（公用）
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
      div(slot="footer" class="dialog-footer")
        el-button(type="primary" @click="submitCustomerMaintain") 保存 
        el-button(@click="cancelCustomerMaintain") 取 消
  //- 空间编辑
  .building-edit
    el-dialog(title="空间编辑" :visible.sync="dialogData.gridEdit.switch" width="600px" @close="cancelGridEdit")
      el-form(ref="gridEditForm" :model="dialogData.gridEdit.formParameter" label-width="160px")
        el-form-item(label="空间名称：")
          el-input(v-model="dialogData.gridEdit.formParameter.ZONE_NAME" placeholder="请输入")
        el-form-item(label="空间地址：")
          el-input(v-model="dialogData.gridEdit.formParameter.ZONE_ADDR" placeholder="请输入")
        //el-form-item(label="空间类型：")
          //el-select(v-model="dialogData.gridEdit.formParameter.ZONE_TYPE_NAME" placeholder="请选择")
            //el-option(v-for="(item,index) in spaceTypes" :key="item.value" :label="item.label" :value="item.value")
        el-form-item(label="经营单元：")
          identity-tree(@update-component-data="chooseAreaHandle")
      div(slot="footer" class="dialog-footer")
        el-button(type="primary" @click="updateGrid") 保存 
        el-button(@click="cancelGridEdit") 取 消
  //- 认领企业
  .building-edit
    el-dialog(title="认领企业" :visible.sync="dialogData.companyWin.switch" width="600px")
      span 企业名称：&nbsp;
      el-select(v-model="entBaseSelect" filterable placeholder="请选择" style="width:370px")
        el-option(v-for="item in dialogData.companyWin.entBase" :key="item.ZQ_CUST_ID" :label="item.ENT_NAME" :value="item.ZQ_CUST_ID")
      div(slot="footer" class="dialog-footer")
        el-button(type="primary" @click="updateEntBaseAddr") 保存 
        el-button(@click="closeEntBaseWin") 取 消
</div>
</template>

<script>
import EchartsWaterWaveBall from "@/components/Echarts/EchartsWaterWaveBall";
import EchartsPie from "@/components/Echarts/EchartsPie";
import EchartsLine from "@/components/Echarts/EchartsLine";
import EchartsBar from "@/components/Echarts/EchartsBar";
import IdentityTree from "@/components/IdentityTree";
import { businessCustomerSpaceManage } from "@/api/dictSpace/businessCustomerSpaceManage";
export default {
  name: "marketGrid",
  components: {
    EchartsWaterWaveBall,
    EchartsPie,
    EchartsLine,
    EchartsBar,
    IdentityTree,
    businessCustomerSpaceManage
  },
  props: {
    parentPageParam: {//特征市场类型
      type: Object
    }
  },
  data() {
    return {
      spaceName:''//空间名称
      ,entBaseSelect:''
      ,treeTableKey:''
      ,iframeUrl: ""
      ,tenAddr: ""
      ,companyCnt: 0
      ,companyCntFlag: true
      ,selectAreaId: ''
      //,spaceTypes: [{value: "1", label: "产业园区"},{value: "2", label: "专业市场"},{value: 3, label: "商务楼宇"},{value: 4, label: "沿街商铺"}]
      ,perLoading: false//渗透率等待
      ,spaceListLoading: false//空间列表等待
      ,spaceDetailsDataLoading: false//空间信息等待
      ,customerTableDataLoading: false//企业客户等待
      ,bldgTableDataLoading: false//楼宇列表等待
      ,selectedSpace: {}//选中的空间
      ,spaceList: {}//空间列表
      ,spacePageSize: 15
      ,spaceListForSearch: false
      ,spacePageNum: 1
      ,activeIndex: 0//标题切换索引
      ,tabMenuListData: [{ name: "企业客户",data: 0 },{ name: "空间地址",data: 1 },{ name: "空间画像",data: 2 },{ name: "竞争信息",data: 3 }]
      ,bldgNameSearchValue: ""
      ,customerTableData: {
        postData: { pageNum: 1,pageSize: 10,companyName: "" },
        data: {},
        selectedCustomerData: {}
      }
      ,bldgTableData: {
        postData: { pageNum: 1, pageSize: 10, searchValue: "" },
        data: {},
        selectedBldgData: {}
      }
      ,dialogData: {
        updateHistory: {
          switch: false,
          title: "",
          listData: []
        },
        companyWin:{
          switch: false,
          entBase: []
        },
        gridEdit: {
          switch: false,
          formParameter: {
            ZONE_NAME: "", ZONE_ADDR: "",ZONE_TYPE_ID: "", ZONE_TYPE_NAME: "", spaceOrgnId: ""
          },
          formRules: {
            companyName: [ { required: true, message: "企业客户名称不能为空", trigger: "blur" } ],
            custType: [ { required: true, message: "企业客户类型不能为空", trigger: "blur" } ]
          }
        },
        customerMaintain: {
          switch: false,
          formParameter: {
            companyName: "", companyAddr: "", custType: null, busiScale: "", companySpace: "", companyStaff: null, contactPhone: "",
            bldgFloor: "", managerId: null, companyUnit: "", companyRoom: "", business: []
          },
          formRules: {
            companyName: [ { required: true, message: "企业客户名称不能为空", trigger: "blur" } ],
            custType: [ { required: true, message: "企业客户类型不能为空", trigger: "blur" } ]
          }
        },
        bldgMaintain: {
          switch: false,
          formParameter: {
            bldgName: "",bldgAddr: ""
          },
          formRules: {
            companyName: [ { required: true, message: "企业客户名称不能为空", trigger: "blur" } ],
            custType: [ { required: true, message: "企业客户类型不能为空", trigger: "blur" } ]
          }
        }
      }
      ,customerTypeOptions: [
        { value: 101, label: "存量" }, { value: 102, label: "蓝海" }, { value: 103, label: "移动" }, { value: 104, label: "联通" }, 
        { value: 105, label: "其他" }, { value: 106, label: "未知" }, { value: 999, label: "蓝海废弃" }, { value: 998, label: "他网废弃" },
        { value: 997, label: "存量废弃" }
      ]
      ,portChart: {//光端口图表
        legendValue:{value1:'光端口容量：198',value2:'光端口实占：98',value3:'光端口实占率：98%'},
        seriesValue:48
      },
      waterWaveBallChart:[ {FTTH_PORT_ALL:0, FTTH_PORT_OCC:0, FTTH_PORT_RATE:0} ],//光端口使用情况
      pieChart:[{ZONE_INCM_Y:0, CDMA_INCM_Y:0, YXKD_INCM_Y:0, IPTV_INCM_Y:0, QITA_INCM_Y:0}],//各业务收入占比
      lineChart:{ DAY_ID:[0] ,CDMA_DEVP_M:[0] ,YXKD_DEVP_M:[0] ,IPTV_DEVP_M:[0] },//本月各业务发展情况
      barChart:{ CDMA_BILL_A:[0], YXKD_BILL_A:[0], IPTV_BILL_A:[0] },//各业务计费到达情况
      businessIncomChart: { },
      businessDevelopmentChart: { },
      billingArriveChart: { }
    };
  },
  created() {
    const me = this;
    me.getPageData();
  },
  watch:{
    parentPageParam:function(newVal,oldVal){
      
    }
  },
  methods: {
    getPageData() {
      //console.log(this.parentPageParam);
      this.spaceDetailsDataLoading = true;
      this.getSpaceList();
    },
    tableRowClassName({row, rowIndex}) {
      if(row.ADDR_LEVEL === 10){
        return 'tenth-addr-row';
      }
    },
    queryEntBaseInfo(val,item){
      const me = this;
      me.tenAddr = item.ADDR_ID;
      let param = {"ZONE_ID":me.selectedSpace.ZONE_ID};
      businessCustomerSpaceManage.queryEntBaseInfo(param).then(res => {
        me.dialogData.companyWin.entBase = res.data.data;
        me.dialogData.companyWin.switch = true;
      })
    },
    closeEntBaseWin(){
      const me = this;
      me.dialogData.companyWin.switch = false;
    },
    updateEntBaseAddr(){
      const me = this;
      let param = {"ZQ_CUST_ID":me.entBaseSelect,"LATN_ID":me.selectedSpace.LATN_ID,"ADDR_ID":me.tenAddr};
      businessCustomerSpaceManage.updateEntBaseAddr(param).then(res => {
        me.dialogData.companyWin.switch = false;
        if(res.status === 200){
          this.$message({
            type: 'success',
            message: '企业认领成功！'
          });
          me.getSpaceAddr();
          me.treeTableKey = Math.random();
        }
      });
    },
    changeName(item){
      this.$prompt('标准地址名称', '标准地址修正', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          if(value){
            this.$message({
              type: 'success',
              message: '地址修正请求已经发送给资源管理系统，后端运维管理人员审核后生效。'
            });
          }else{
            this.$message({
              type: 'success',
              message: '标准地址名称不能为空！'
            });
          }
        }).catch(() => {
            
        });
    },
    getMarketGirdBall(){
      let zoneId = this.selectedSpace.ZONE_ID;
      businessCustomerSpaceManage.getMarketGirdBall(zoneId).then(res => {
        if(res.status === 200){
          if(res.data.data!=null && res.data.data.length!=0){
            this.waterWaveBallChart=[];
            this.waterWaveBallChart=res.data.data;
          }else{//光端口使用情况
            this.waterWaveBallChart = [{FTTH_PORT_ALL:0,FTTH_PORT_OCC:0,FTTH_PORT_RATE:0}]
          }
        }
      }).finally(() => {

      });
    },
    getMarketGirdPie(){
       let zoneId = this.selectedSpace.ZONE_ID;
      businessCustomerSpaceManage.getMarketGirdPie(zoneId).then(res => {
        if(res.status === 200){
           if(res.data.data!=null && res.data.data.length!=0){
             this.pieChart=[];
              this.pieChart=res.data.data;
           }else{
              this.pieChart=[{ ZONE_INCM_Y:0, CDMA_INCM_Y:0, YXKD_INCM_Y:0, IPTV_INCM_Y:0, QITA_INCM_Y:0 }]
           }
        }
      }).finally(() => {

      });
    },
    getMarketGirdLine(){
      let zoneId=this.selectedSpace.ZONE_ID;
      businessCustomerSpaceManage.getMarketGirdLine(zoneId).then(res => {
        if(res.status === 200){
          if(res.data.data!=null && res.data.data.length!=0){
            this.lineChart={};
            var dayArr = [];
            var cdmaArr = [];
            var yxkdArr = [];
            var iptvArr = [];
            for(var i = 0;i<res.data.data.length;i++){
              dayArr.push(res.data.data[i].DAY_ID);
              cdmaArr.push(res.data.data[i].CDMA_DEVP_M);
              yxkdArr.push(res.data.data[i].YXKD_DEVP_M);
              iptvArr.push(res.data.data[i].IPTV_DEVP_M);
            }
            this.lineChart = { DAY_ID:dayArr ,CDMA_DEVP_M:cdmaArr ,YXKD_DEVP_M:yxkdArr ,IPTV_DEVP_M:iptvArr }
          }else{
            this.lineChart = { DAY_ID:[0] ,CDMA_DEVP_M:[0] ,YXKD_DEVP_M:[0] ,IPTV_DEVP_M:[0] }
           }
        }
      }).finally(() => {

      });
    },
    getMarketGirdBar(){
      let zoneId=this.selectedSpace.ZONE_ID;
      businessCustomerSpaceManage.getMarketGirdBar(zoneId).then(res => {
        if(res.status === 200){
          if(res.data.data!=null && res.data.data.length!=0){
            this.barChart={ CDMA_BILL_A:[], YXKD_BILL_A:[], IPTV_BILL_A:[] };
            let count=parseInt(res.data.data[0].CDMA_BILL_A)+parseInt(res.data.data[0].YXKD_BILL_A)+parseInt(res.data.data[0].IPTV_BILL_A);
            this.barChart.CDMA_BILL_A.push((res.data.data[0].CDMA_BILL_A/count).toFixed(2)*100);
            this.barChart.YXKD_BILL_A.push((res.data.data[0].YXKD_BILL_A/count).toFixed(2)*100);
            this.barChart.IPTV_BILL_A.push((res.data.data[0].IPTV_BILL_A/count).toFixed(2)*100);
          }else{
            this.barChart={ CDMA_BILL_A:[0], YXKD_BILL_A:[0], IPTV_BILL_A:[0] }
          }
        }
      }).finally(() => {

      });
    },
    format(percentage){
      return `${percentage}%`;
    },
    jumpBack(){//返回商客空间管理列表
      this.$emit("backView", { });
    },
    beforeAddGrid(){
      const me = this;
      me.dialogData.gridEdit.switch = true;
    },
    getSpaceList(){
      const me = this;
      me.spaceListLoading = true;
      if(me.spaceListForSearch){
        me.spacePageNum = 1;
        me.spaceListForSearch = false;
      }
      let param = Object.assign({ "pageNum": me.spacePageNum,"pageSize": me.spacePageSize,"spaceName":me.spaceName }, this.parentPageParam);
      businessCustomerSpaceManage.getSpaceList(param).then(res => {
        if(res.status === 200){
          if(me.spacePageNum === 1){
            me.spaceList = res.data.data;
            me.selectedSpace = me.spaceList.records[0];
            me.companyCntFlag = true;
            me.getCompanyList();
            me.getSpaceAddr();
          }else{
            me.spaceList.records = me.spaceList.records.concat(res.data.data.records);
          }
        }
      }).finally(() => {
        me.spaceListLoading = me.spaceDetailsDataLoading = false;
      });
    },
    getSpaceListByName(){
      const me = this;
      me.spaceListForSearch = true;
      me.getSpaceList();
    },
    getSpaceListByScroll(){//空间列表滚动事件
      const me = this;
      if (me.spacePageNum === 0 || me.spaceList.current < me.spaceList.pages ) {
        me.spacePageNum++;
        me.getSpaceList();
      }
    },
    chooseSpaceHandle(item){//选中空间事件
      const me = this;
      me.selectedSpace = item;
      me.tabSwitchhandle(0);
      me.customerTableDataLoading = true;
      me.companyCntFlag = true;
      me.getCompanyList();
      me.getSpaceAddr();
    },
    chooseAreaHandle({ orgnId }) {
      const me = this;
      me.selectAreaId = orgnId;
    },
    beforeEditGrid(){
      const me = this;
      me.dialogData.gridEdit.formParameter = me.selectedSpace;
      me.dialogData.gridEdit.switch = true;
    },
    updateGrid() {
      const me = this;
      me.selectedSpace.ZONE_NAME = me.dialogData.gridEdit.formParameter.ZONE_NAME;
      me.selectedSpace.ZONE_ADDR = me.dialogData.gridEdit.formParameter.ZONE_ADDR;
      businessCustomerSpaceManage.updateZoneInfo(me.selectedSpace).then(res => {
        console.log(res);
        if(res.status === 200){
          me.$message({
            type: 'success',
            message: '空间信息更新成功！'
          });
        }
      }).finally(() => {
        me.cancelGridEdit();
      });
    },
    cancelGridEdit() {
      const me = this;
      me.dialogData.gridEdit.switch = false;
      me.dialogData.gridEdit.formParameter = {
        ZONE_NAME: "", ZONE_ADDR: "",ZONE_TYPE_ID: "", ZONE_TYPE_NAME: "", spaceOrgnId: ""
      }
      me.resetForm("gridEditForm");
    },
    getGridHistory(){
      const me = this;
      me.dialogData.updateHistory.switch = true;
    },
    tabSwitchhandle(val){
      if(val === 3){
        //this.$refs.iframe.contentWindow.location.reload(true);
        this.iframeUrl = "http://136.127.50.92:8001/ODSMSPortlet/objectExtd!init.action?pageId=61&objectTypeId=6&objectId=" + this.selectedSpace.ZONE_ID + "&latnId=" + this.parentPageParam.latnId;
      }
      this.getMarketGirdBall();
      this.getMarketGirdPie();
      this.getMarketGirdLine();
      this.getMarketGirdBar();

      this.activeIndex = val;
    },
    searchCompanyHandle(){
      const me = this;
      me.customerTableData.postData.pageNum = 1;
      me.companyCntFlag = false;
      me.getCompanyList();
    },
    companyPagination(){
      const me = this;
      me.companyCntFlag = false;
      me.getCompanyList();
    },
    jumpCompanyView(item) {
      const me = this;
      let para = {"searchTxt":item.ENT_NAME,"classIndex":1};
      sessionStorage.setItem("enterprise-search-param", JSON.stringify(para));
      this.$router.push({
        path: "/enterpriseInfo/enterpriseInfoQuery"
      });
      /*
      me.$router.push({
        name: "客户信息采集",
        query: {
          companyId: companyId
        }
      });*/
    },
    getCompanyList(){
      const me = this;
      me.customerTableDataLoading = true;
      let param = Object.assign({ "pageNum": me.customerTableData.postData.pageNum,"pageSize": me.customerTableData.postData.pageSize,"companyName":me.customerTableData.postData.companyName }, this.selectedSpace);
      businessCustomerSpaceManage.getCompanyList(param).then(res => {
        if(res.status === 200){
          me.customerTableData.data = res.data.data;
          if(me.companyCntFlag){
            // me.companyCnt = me.customerTableData.data.total;
          }
        }
      }).finally(() => {
        me.customerTableDataLoading = false;
      });
    },
    getSpaceAddr(){
      const me = this;
      let param = Object.assign({"addrSumId":""},me.selectedSpace);
      businessCustomerSpaceManage.getSpaceAddr(param).then(res => {
        me.bldgTableData.data = res.data.data;
      }).finally(() => {

      });
    },
    loadTreeTable(tree, treeNode, resolve){
      const me = this;
      let param = Object.assign({"addrSumId":tree.ADDR_ID},me.selectedSpace);
      businessCustomerSpaceManage.getSpaceAddr(param).then(res => {
        resolve(res.data.data);
      }).finally(() => {

      });
    },
    getCompanyHistory(row){
      const me = this;
    },
    getBldgHistory(row){
      const me = this;
    },
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
    submitCustomerMaintain() {
      const me = this;
      me.$refs["customerMaintainForm"].validate(valid => {
        if (valid) {
          me.addcompany();
        }
      });
    },
    cancelBldgMaintain(){
      const me = this;
      me.dialogData.bldgMaintain.switch = false;
      me.dialogData.bldgMaintain.formParameter = {
        bldgName:"",bldgAddr:""
      };
      me.resetForm("bldgMaintainForm");
    },
    cancelUpdateHistory() {
      const me = this;
      //me.dialogData.updateHistory.listData = [];
      //me.rightData.tabData.customerTableData.signCustomerData = {};
      me.dialogData.updateHistory.switch = false;
    },
  }
};
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/mixin.styl'
layout-block()
  box-shadow 0 0 0 1px rgba(218, 226, 237, 1) inset
  border-radius 3px
  background-color #fff
.font-color-red
  color #f15a4a
.font-color-blue
  color #10a6e2
.font-color-green
  color #0db789
.grid-info
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
          display flex
          .addGridBtn
            padding 10px 15px
            border 0px
          .el-input
            width auto
            margin-left 5px
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
              max-width 85%
              .list-title
                color $font-default-color
                font-weight 600
                overflow hidden
                white-space nowrap
                text-overflow ellipsis
              .list-per
                display flex
                justify-content space-between
                line-height 28px
                .per-title
                  color #939EAB
                  font-size 12px
                  overflow hidden
                  white-space nowrap
                  text-overflow ellipsis
                  max-width 80%
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
                content '渗透率'
                display block
                font-size 14px
                color $font-default-color
                margin-top 8px
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
                margin 0 10px 10px 0
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
              min-height 650px
              .analysis-view
                background #f4f6f8
                display inline-block
                width 100%
                padding 10px
                .grid-title
                  background #fff
                  padding 10px
                  text-align center
                  font-size 18px
                  font-weight 600
                  color #333333
                .grid-content
                  height 260px
                  background #fff
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
  // 弹窗相关部分
  .building-edit, .customer-maintain, .tab-form
    .el-form-item
      .el-select
        display block
      .identity-tree
        .el-cascader
          width 100%
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
      padding-left 10px
      padding-right 10px
      max-height 400px
      overflow-y auto
      /deep/
        .el-select
          display block
</style>
