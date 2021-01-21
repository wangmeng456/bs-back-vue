<template lang="pug">
.page-box-four
  .page-top
    .house-details
      .base-info
        .base-info-left {{ zoneName }}
        .base-info-right(@click="getcompanyhistory")
          img(
            src="~@/assets/image/dictSpace/buildingInfoManage/icon-history.png"
          )
          a.base-info-right-span 更新历史
    .house-main
      .house-main-left
        span.house-main-left-header 基本信息
        el-button(round, @click="areaEdit") 编辑
        .house-main-left-details
          .house-main-left-list
            .introduce
              nobr 楼宇类型:
            span {{ zoneTypeName }}
          .house-main-left-list
            .introduce
              nobr 楼宇地址:
            span {{ address }}
          .house-main-left-list
            .introduce
              nobr 上级经营单元:
            span {{ upUnit }}
      .house-main-center
        span.house-main-left-header 市场空间信息
        span.house-main-left-status 审批中
        el-button(round, @click="areaDeclare") 申报
        .house-main-left-details
          .house-main-left-list
            .introduce 房屋套数:
            span {{ roomCnt }}
          .house-main-left-list
            .introduce 户口数:
            span {{ famCnt }}
          .house-main-left-list
            .introduce 人口数:
            span {{ peoCnt }}
      .house-main-right
        span.house-main-left-header 本网业务信息
        .house-main-left-details
          .house-main-left-list
            .introduce 本网客户数:
            span {{ netCustCnt }}
          .house-main-left-list
            .introduce 本网房间数:
            span {{ netRoomCnt }}
          .house-main-left-list
            .introduce 总渗透率:
            span {{ rate }}%
  .page-table
    //- tab 顶部菜单
    .tab-menu
      .menu-item(
        v-for="(item, index) in tabData.tabMenuListData",
        :key="index",
        :class="{ 'menu-item-active': tabData.activeIndex === item.data }",
        @click="tabSwitchhandle(item.data)"
      ) {{ item.name }}
    .tab-details
      //- 客户清单
      .tab-content(v-if="tabData.activeIndex === 0")
        .tab-top
          .tab-add
            el-button(type="primary", icon="el-icon-plus", @click="addGrid") 添加客户
          .tab-search
            el-input(
              placeholder="搜索客户",
              prefix-icon="el-icon-search",
              v-model="customerName"
            )
            el-button(type="primary") 搜索
        .tab-bottom
          .tab-table
            el-table(:data="tableData", max-height="390px")
              el-table-column(prop="customerName", label="客户名称")
              el-table-column(prop="customerAddr", label="客户地址")
              el-table-column(prop="customerType", label="类型")
              el-table-column(prop="rate", label="信息完整率")
              el-table-column(label="操作")
                template
                  el-button(type="text") 更新历史
      //- 楼宇视图
      .tab-content(v-else-if="tabData.activeIndex === 1 && activeStatus")
        .content-number
          .content-number-item
            span.content-number-item-num {{ getBuilingViewTopValue.netCustCnt }}
            br
            span.content-number-item-font 本网客户数
          .content-number-item
            span.content-number-item-num {{ getBuilingViewTopValue.roomCnt }}
            br
            span.content-number-item-font 总房间数
          .content-number-item
            span.content-number-item-num {{ getBuilingViewTopValue.rate }}%
            br
            span.content-number-item-font 渗透率
          .content-number-item
            span.content-number-item-num {{ getBuilingViewTopValue.assetCnt }}
            br
            span.content-number-item-font 总资产数
        .content-menu
          .content-btn
            .content-btn-item(
              v-for="(item, index) in getBuildingViewCells.data",
              :key="index"
            )
              el-button(
                @click="btnListhandle(item)",
                :class="{ 'content-btn-item-active': getBuildingViewCells.activeList === item.cellId, 'content-btn-item-none': getBuildingViewCells.activeList !== item.cellId }"
              ) {{ item.cellName }}
          .content-details
            .content-all
              .content-all-left
                .content-all-left-item(
                  v-for="(item, index) in view.left",
                  :key="index"
                ) {{ item.value }}
              .content-all-right
                .content-all-right-item(
                  v-for="(item, index) in view.right",
                  :key="index"
                ) {{ item.value }}
            .content-card
              .content-card-card(
                v-for="(item, index) in getBuildingView.data",
                :key="index",
                @click="handleHomes(item)",
                :class="{ 'content-card-card-one-active': item.custType === '1', 'content-card-card-two-active': item.custType === '2' }"
              )
                span {{ item.roomId }}室
                .content-card-card-box
                  .content-card-card-box-item(
                    :class="{ 'content-card-card-box-item-one-active': item.wbFlag === '1' }"
                  )
                  .content-card-card-box-item(
                    :class="{ 'content-card-card-box-item-two-active': item.mobileFlag === '1' }"
                  )
                  .content-card-card-box-item(
                    :class="{ 'content-card-card-box-item-three-active': item.fixedFlag === '1' }"
                  )
                  .content-card-card-box-item(
                    :class="{ 'content-card-card-box-item-four-active': item.iptvFlag === '1' }"
                  )
      //- 进入房间
      .tab-content(v-else-if="tabData.activeIndex === 1 && !activeStatus")
        .tab-return
          .tab-return-title
            img(src="~@/assets/image/dictSpace/UrbanAreaManage/icon-home.png")
            span {{ handleHome.cellName }} {{ handleHome.cells }}室
          .tab-return-icon(@click="handleCancleHome")
            i.el-icon-back
            span 返回
        .tab-home
          .tab-table
            el-table(:data="getRoomCustomerList", max-height="390px")
              el-table-column(type="index", label="序号")
              el-table-column(prop="customerName", label="客户名称")
              el-table-column(prop="assetType", label="资产类型")
              el-table-column(prop="assetNbr", label="资产号码")
  //- 编辑基本信息
  el-dialog(title="编辑基本信息", :visible.sync="areaEdits")
    .dialog-main
      el-form(
        label-position="labelPosition",
        label-width="100px",
        :model="edit",
        ref="postData"
      )
        el-form-item(label="楼宇名称")
          el-input(v-model="edit.zoneName", placeholder="请输入内容")
        el-form-item(label="楼宇类型:")
          span {{ zoneTypeName }}
        el-form-item(label="楼宇地址:")
          span {{ address }}
        el-form-item(label="上级经营单元:")
          span {{ upUnit }}
    .dialog-footer(slot="footer")
      el-button.dialog-footer-btnone(
        :disabled="true",
        @click="areaEdits = false"
      ) 拿 回
      el-button.dialog-footer-btntwo(@click="areaEdits = false") 保 存
  //- 市场空间申报
  el-dialog(title="市场空间申报", :visible.sync="areaDeclares")
    .dialog-header
      span 提交人：{{ deptName }}-{{ staffName }}（{{ taffId }}）
      span.status 审批中
    .dialog-main
      el-form(
        label-position="labelPosition",
        label-width="100px",
        :model="declare",
        ref="postData"
      )
        el-form-item(label="房屋套数")
          el-input(v-model="declare.roomCnt", placeholder="请输入房屋套数")
        el-form-item(label="住户数")
          el-input(v-model="declare.famCnt", placeholder="请输入住户数")
        el-form-item(label="人口数")
          el-input(v-model="declare.peoCnt", placeholder="请输入人口数")
    .dialog-footer(slot="footer")
      el-button.dialog-footer-btntwo(@click="areaDeclares = false") 拿 回
      el-button.dialog-footer-btnone(
        :disabled="true",
        @click="areaDeclares = false"
      ) 保 存
  //- 添加网格
  el-dialog(title="添加客户", :visible.sync="addGrids")
    .dialog-main
      el-form(
        label-position="labelPosition",
        label-width="140px",
        :model="add",
        ref="postData"
      )
        el-form-item(label="企业客户名称:")
          el-input(v-model="add.customerName", placeholder="请输入")
        el-form-item(label="客户地址:")
          el-input(v-model="add.customerAddr", placeholder="请输入")
        .dialog-input
          el-form-item(label="单元号:")
            el-input(v-model="add.cellId", placeholder="请输入")
          el-form-item(label="房间号:")
            el-input(v-model="add.roomId", placeholder="请输入")
        el-form-item(label="企业客户类型:")
          el-select(v-model="add.customerTypeName", placeholder="请选择企业客户类型")
            el-option(
              v-for="(item, index) in add.getCustomerType.data",
              :label="item.customerTypeName",
              :value="item.customerType"
            )
        el-form-item(label="营业额规模(万元):")
          el-input(v-model="add.busiScale", placeholder="请输入")
        el-form-item(label="办公面积(平米):")
          el-input(v-model="add.officeSpace", placeholder="请输入")
        el-form-item(label="公司人数规模:")
          el-input(v-model="add.staffCnt", placeholder="请输入")
        el-form-item(label="公司电话:")
          el-input(v-model="add.companyTel", placeholder="请输入")
        el-form-item(label="企业楼层:")
          el-input(v-model="add.buildingFloor", placeholder="请输入")
        .business(
          v-if="!add.businessFlag",
          v-for="(item, index) in add.business",
          :key="index"
        )
          el-form-item(label="业务类型:")
            el-select(v-model="item.busiName", placeholder="请选择业务类型")
              el-option(
                v-for="(item, index) in add.getBusinessType.data",
                :label="item.busiName",
                :value="item.busiId"
              )
          el-form-item(label="业务供应商：")
            el-input(v-model="item.busiProvider", placeholder="请输入")
          el-form-item(label="异网客户经理:")
            el-input(v-model="item.otherManagerName", placeholder="请输入")
          el-form-item(label="联系方式：")
            el-input(v-model="item.otherManagerPhone", placeholder="请输入")
          el-form-item(label="到期时间：")
            el-date-picker(
              v-model="item.busiEndDate",
              type="date",
              placeholder="选择时间",
              value-format="yyyy-MM-dd",
              format="yyyy-MM-dd"
            )
        el-form-item
          el-button(
            type="primary",
            plain,
            icon="el-icon-plus",
            @click="addBusiness"
          ) 添加增量业务信息
    .dialog-footer(slot="footer")
      el-button.dialog-footer-btnone(@click="addGrids = false") 取消返回
      el-button.dialog-footer-btntwo(@click="addGrids = false") 确认提交
  //- 更新历史列表
  .update-history(v-if="switchs")
    .history-title
      h3 更新历史 #[span.color-red ({{ updateHistory.data.length }})]
      .close-button(@click="cancelUpdateHistory")
        i.el-icon-close
    .history-content
      .house-title {{ zoneName }}
      ul.history-list
        li.list-item(v-for="(item, index) in updateHistory.data", :key="index")
          .item-title #[span.item-user {{ item.operateStaff }}] {{ item.operateDate }}
          .item-details(v-html="item.operateDesc")
      .list-data-none(v-if="updateHistory.data.length === 0") 暂无数据
</template>

<script>
export default {
  name: "buildingManagement",
  props: ["isFlag"],
  data() {
    return {
      zoneName: "一号楼",
      gridCnt: 10,
      buildingCnt: 11,
      communityCnt: 12,
      zoneTypeName: "住宅楼宇",
      address: "兴庆区-世纪花园包区-世纪花园网格-世纪花园小区",
      upUnit:
        "宁夏回族自治区-银川-兴庆区-世纪花园包区-世纪花园网格-世纪花园小区",
      roomCnt: 1000,
      famCnt: 200,
      peoCnt: 300,
      busiCnt: 50,
      netCustCnt: 600,
      netRoomCnt: 60,
      netBusiCnt: 70,
      rate: 30,
      // 标签页切换
      tabData: {
        // 标题切换索引
        activeIndex: 0,
        tabMenuListData: [
          { name: "客户清单", data: 0 },
          { name: "楼宇视图", data: 1 },
        ],
      },
      customerName: "",
      tableData: [
        {
          customerName: "亚信中国有限公司",
          customerAddr: "西二旗",
          customerType: "存量",
          rate: "37.50",
        },
        {
          customerName: "亚信",
          customerAddr: "兴庆区-世纪果园包区-原州网格-世纪花园小区",
          customerType: "存量",
          rate: "37.50",
        },
      ],
      getBuilingViewTopValue: {
        netCustCnt: 22,
        roomCnt: 77,
        rate: 22.27,
        assetCnt: 100,
      },
      // 楼宇视图-单元列表
      getBuildingViewCells: {
        data: [
          { cellId: "1", cellName: 0 },
          { cellId: "2", cellName: 0 },
        ],
        activeList: "1",
        activeName: 0,
      },
      view: {
        left: [
          { id: 1, value: "电信" },
          { id: 2, value: "他网" },
        ],
        right: [
          { id: 1, value: "宽带" },
          { id: 2, value: "移动" },
          { id: 3, value: "固话" },
          { id: 4, value: "天翼高清" },
        ],
      },
      // 楼宇视图-房间列表
      getBuildingView: {
        data: [
          {
            custType: "1",
            fixedFlag: "1",
            iptvFlag: "0",
            mobileFlag: "1",
            roomId: "101",
            wbFlag: "1",
          },
          {
            custType: "1",
            fixedFlag: "0",
            iptvFlag: "0",
            mobileFlag: "0",
            roomId: "203",
            wbFlag: "0",
          },
        ],
      },
      //进入房间
      activeStatus: true,
      handleHome: {
        cells: "",
        rooms: "",
        cellId: "",
        cellName: "",
      },
      getRoomCustomerList: [
        { customerName: "亚信中国有限公司", assetType: "宽带", assetNbr: 1234 },
        { customerName: "亚信中国有限公司", assetType: "移动", assetNbr: 1234 },
        { customerName: "亚信中国有限公司", assetType: "联通", assetNbr: 1234 },
      ],
      areaEdits: false,
      areaDeclares: false,
      addGrids: false,
      switchs: false,
      edit: {
        zoneName: "",
      },
      deptName: "宁夏回族自治区",
      staffName: "系统管理员",
      taffId: 1,
      declare: {
        roomCnt: "",
        famCnt: "",
        peoCnt: "",
      },
      add: {
        // 查询企业客户类型
        getCustomerType: {
          customerTypeName: "",
          data: [
            { customerTypeName: "存量", customerType: "1" },
            { customerTypeName: "蓝海", customerType: "2" },
            { customerTypeName: "移动", customerType: "3" },
          ],
        },
        // 查询业务类型
        getBusinessType: {
          busiName: "",
          data: [
            { busiName: "宽带", busiId: 1 },
            { busiName: "移动", busiId: 2 },
            { busiName: "固话", busiId: 3 },
            { busiName: "天翼高清", busiId: 4 },
          ],
        },
        businessFlag: true,
        // 提交数据
        customerName: "",
        customerAddr: "",
        customerType: "",
        busiScale: "",
        officeSpace: "",
        staffCnt: "",
        companyTel: "",
        buildingFloor: "",
        cellId: "",
        roomId: "",
        business: [],
      },
      updateHistory: {
        data: [],
      },
    };
  },
  watch: {
    isFlag(val) {
      const me = this;
      me.isFlag = val;
    },
  },
  created() {
    const me = this;
  },
  methods: {
    tabSwitchhandle(data) {
      this.tabData.activeIndex = data;
    },
    // 进入房间
    handleHomes(data) {
      const me = this;
      me.handleHome.cells = data.roomId;
      me.handleHome.cellId = me.getBuildingViewCells.activeList;
      me.handleHome.cellName = me.getBuildingViewCells.activeName;
      me.activeStatus = false;
    },
    handleCancleHome() {
      const me = this;
      me.activeStatus = true;
    },
    // 楼宇视图-切换单元
    btnListhandle(data) {
      const me = this;
      me.getBuildingViewCells.activeList = data.cellId;
      me.getBuildingViewCells.activeName = data.cellName;
    },
    // 编辑 基本信息
    areaEdit() {
      const me = this;
      me.areaEdits = true;
    },
    // 市场空间申报
    areaDeclare() {
      const me = this;
      me.areaDeclares = true;
    },
    // 添加网格
    addGrid() {
      const me = this;
      me.addGrids = true;
    },
    addBusiness() {
      const me = this;
      me.add.business.push({
        busiId: "",
        busiProvider: "",
        otherManagerName: "",
        otherManagerPhone: "",
        busiEndDate: "",
      });
      me.add.businessFlag = false;
    },
    // 更新历史
    getcompanyhistory() {
      const me = this;
      me.switchs = true;
    },
    cancelUpdateHistory() {
      const me = this;
      me.switchs = false;
    },
  },
};
</script>

<style lang="stylus">
@import '~@/assets/styles/mixin.styl';

.page-box-four {
  .page-top {
    border-bottom: 1px solid rgba(218, 226, 237, 1);

    .house-details {
      box-shadow: 0px 9px 12px 0px rgba(0, 0, 0, 0);

      .base-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 6px 0 0 0;
        position: relative;

        .base-info-left {
          width: 50%;
          background: url('~@/assets/image/dictSpace/UrbanAreaManage/icon-garden.png') no-repeat;
          font-size: 16px;
          font-weight: 600;
          color: rgba(255, 255, 255, 1);
          padding: 6px 188px 6px 23px;
        }

        .base-info-right {
          font-size: 14px;
          color: rgba(147, 158, 171, 1);

          img {
            vertical-align: middle;
          }

          .base-info-right-span {
            vertical-align: middle;
            margin: 0 12px 0 6px;
          }
        }
      }
    }

    .house-main {
      display: flex;

      house-main-left() {
        padding: 18px;

        .house-main-left-header {
          font-size: 16px;
          font-weight: 600;
          color: rgba(55, 57, 76, 1);
          line-height: 36px;
        }

        .el-button {
          width: 50px;
          height: 20px;
          font-size: 12px;
          color: #3E82FE;
          padding: 0;
          float: right;
          margin-top: 6px;
        }

        .house-main-left-details {
          .house-main-left-list {
            display: flex;
            margin: 6px 0;

            .introduce {
              color: rgba(147, 158, 171, 1);
              padding-right: 6px;
            }
          }
        }
      }

      .house-main-left {
        house-main-left();
        border-right: 1px solid #E5EDF3;
        width: 44%;
      }

      .house-main-center {
        house-main-left();
        border-right: 1px solid #E5EDF3;
        width: 32%;

        .house-main-left-status {
          width: 40px;
          height: 15px;
          background: rgba(255, 142, 59, 0.2);
          border-radius: 3px;
          border: 1px solid rgba(255, 142, 59, 1);
          font-size: 10px;
          color: rgba(255, 142, 59, 1);
          line-height: 15px;
          margin: 0 20px 0 10px;
        }
      }

      .house-main-right {
        house-main-left();
      }
    }
  }

  .page-table {
    flex: 1;
    border-top: 10px solid #F4F6F8;
    padding: 0 20px;

    .tab-menu {
      display: flex;
      box-shadow: 0 1px 0 0 #E5EDF3;

      .menu-item {
        width: 25%;
        line-height: 36px;
        padding: 10px 0;
        color: $font-default-color;
        font-size: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: all 0.3s;

        &:before {
          content: '';
          width: 22px;
          height: 22px;
          margin: 0 10px 0 0;
        }

        &-active {
          color: $main-blue-color;
          box-shadow: 0 -2px 0 0 $main-blue-color inset;
        }

        for index in 1 2 {
          &:nth-child({index}), &:active {
            background: url('~@/assets/image/dictSpace/UrbanAreaManage/icon-tabfour-' + index + '.png') 40px center no-repeat;
          }
        }
      }
    }

    .tab-details {
      .tab-content {
        .tab-top {
          display: flex;
          justify-content: space-between;
          padding: 20px 0 15px;

          .tab-add {
            .el-button.el-button--primary.el-button--small {
              background: linear-gradient(45deg, rgba(30, 208, 255, 1) 0%, rgba(43, 123, 255, 1) 100%);
            }
          }

          .tab-search {
            display: flex;
            justify-content: space-between;

            .el-button.el-button--primary.el-button--small {
              background: linear-gradient(45deg, rgba(30, 208, 255, 1) 0%, rgba(43, 123, 255, 1) 100%);
              margin-left: 10px;
            }
          }
        }

        .tab-bottom {
          .el-table-column {
            span {
              padding: 0 6px;
              color: rgba(255, 255, 255, 1);
              border-radius: 8px;
              cursor: pointer;
            }
          }

          .tab-pagination {
            .el-pagination {
              float: right;
              padding: 10px 0;
            }
          }
        }

        // 楼宇视图
        .content-number {
          display: flex;
          justify-content: space-between;
          margin: 10px 0;

          &-item {
            width: 100%;
            padding: 10px;
            text-align: center;

            &-num {
              font-size: 28px;
              font-weight: bold;
              color: rgba(255, 255, 255, 1);
              line-height: 34px;
            }

            &-font {
              font-size: 16px;
              font-weight: 500;
              color: rgba(255, 255, 255, 1);
              line-height: 22px;
            }

            for index in 1 2 3 4 {
              &:nth-child({index}), &:active {
                background: url('~@/assets/image/dictSpace/UrbanAreaManage/icon-building-' + index + '.png') center no-repeat;
              }
            }
          }
        }

        .content-menu {
          .content-btn {
            display: flex;

            .content-btn-item {
              .el-button {
                width: 127px;
                margin-left: 10px;
              }

              &-none {
                background: rgba(244, 246, 248, 1);
                border: 1px solid rgba(62, 130, 254, 1);
                color: rgba(182, 190, 198, 1);
              }

              &-active {
                background: rgba(62, 130, 254, 1);
                color: rgba(255, 255, 255, 1);
              }
            }
          }

          .content-details {
            background: rgba(244, 246, 248, 1);
            margin: 10px;
            padding: 10px;
            overflow: hidden;
            zoom: 1;

            .content-all {
              display: flex;
              justify-content: space-between;
              padding: 10px 20px 20px 20px;

              &-left {
                display: flex;

                &-item {
                  line-height: 14px;
                  display: flex;

                  for index in 1 2 {
                    &:nth-child({index}) {
                      &:before {
                        content: '';
                        margin: 0 10px;
                        width: 12px;
                        height: 12px;
                        border-radius: 3px;
                      }
                    }

                    &:nth-child(1) {
                      &:before {
                        background-color: rgba(1, 70, 191, 1);
                      }
                    }

                    &:nth-child(2) {
                      &:before {
                        background-color: rgba(255, 98, 108, 1);
                      }
                    }
                  }
                }
              }

              &-right {
                display: flex;

                &-item {
                  line-height: 14px;
                  display: flex;

                  for index in 1 2 3 4 {
                    &:nth-child({index}) {
                      &:before {
                        content: '';
                        margin: 0 10px;
                        width: 12px;
                        height: 12px;
                        border-radius: 3px;
                      }
                    }

                    &:nth-child(1) {
                      &:before {
                        background-color: rgba(46, 189, 65, 1);
                      }
                    }

                    &:nth-child(2) {
                      &:before {
                        background-color: rgba(77, 161, 255, 1);
                      }
                    }

                    &:nth-child(3) {
                      &:before {
                        background-color: rgba(255, 142, 59, 1);
                      }
                    }

                    &:nth-child(4) {
                      &:before {
                        background-color: rgba(105, 1, 191, 1);
                      }
                    }
                  }
                }
              }
            }

            .content-card {
              &-card {
                cursor: pointer;
                width: 24%;
                margin: 0.5%;
                float: left;
                text-align: center;
                border: 1px solid rgba(246, 245, 245, 1);
                box-shadow: 0px 0px 20px 1px rgba(176, 192, 237, 0.42);
                background: rgba(255, 255, 255, 1);
                padding: 10px 20px;
                border-radius: 3px;

                span {
                  font-size: 20px;
                  font-weight: 500;
                  color: rgba(55, 57, 76, 1);
                  line-height: 25px;
                  text-align: center;
                }

                &-one-active {
                  border: 4px solid rgba(1, 70, 191, 1);
                }

                &-two-active {
                  border: 4px solid rgba(255, 98, 108, 1);
                }

                &-box {
                  display: flex;
                  justify-content: space-between;
                  padding-top: 10px;

                  &-item {
                    width: 25px;
                    height: 12px;
                    background: rgba(221, 233, 253, 1);
                    border-radius: 3px;

                    &-one-active {
                      background: rgba(46, 189, 65, 1);
                    }

                    &-two-active {
                      background: rgba(77, 161, 255, 1);
                    }

                    &-three-active {
                      background: rgba(255, 142, 59, 1);
                    }

                    &-four-active {
                      background: rgba(105, 1, 191, 1);
                    }
                  }
                }
              }
            }

            .content-nocard {
              text-align: center;
              padding: 20px;
            }
          }
        }

        // 房间
        .tab-return {
          margin: 20px 0;
          height: 84px;
          background: rgba(62, 130, 254, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 10px;

          &-title {
            img {
              vertical-align: middle;
            }

            span {
              font-size: 24px;
              font-weight: 600;
              color: rgba(57, 60, 65, 1);
              margin-left: 20px;
              line-height: 84px;
            }
          }

          &-icon {
            cursor: pointer;

            .el-icon-back {
              border-radius: 3px 0px 0px 3px;
              border: 2px solid rgba(62, 130, 254, 1);
              color: #3E82FE;
              line-height: 24px;
              text-align: center;
              font-weight: bold;
              padding: 0 4px;
              font-size: 14px;
            }

            span {
              padding: 6px;
              background: rgba(62, 130, 254, 1);
              border-radius: 0px 3px 3px 0px;
              font-size: 14px;
              color: rgba(255, 255, 255, 1);
            }
          }
        }

        .tab-home {
          padding-bottom: 10px;
        }
      }
    }
  }

  .el-dialog__header {
    border-bottom: 1px solid #E4E7EC;
  }

  .el-dialog__body {
    padding: 10px 20px;

    .el-button {
      width: 100%;
      border: 1px dashed #1890ff;
      background: #e8f4ff;

      .el-icon-plus {
        margin-right: 20px;
        color: #1890ff;
      }

      span {
        color: #1890ff;
      }
    }

    .el-select {
      width: 100%;
    }
  }

  .dialog-header {
    font-size: 14px;
    padding: 20px 0;
    color: rgba(147, 158, 171, 1);

    .status {
      width: 40px;
      height: 15px;
      background: rgba(255, 142, 59, 0.2);
      border-radius: 3px;
      border: 1px solid rgba(255, 142, 59, 1);
      font-size: 10px;
      color: rgba(255, 142, 59, 1);
      line-height: 15px;
      margin: 0 20px 0 10px;
    }
  }

  .el-form-item__label {
    font-size: 14px;
    font-weight: 400;
    color: rgba(123, 123, 123, 1);
  }

  .el-form-item__content {
    span {
      font-size: 14px;
      font-weight: 400;
      color: rgba(55, 57, 76, 1);
    }
  }

  .el-input__inner {
    font-size: 14px;
    font-weight: 400;
    color: rgba(55, 57, 76, 1);
  }

  .dialog-main {
    &-list {
      .dialog-list {
        margin-top: 5px;

        &-itemOne {
          font-size: 16px;
          font-weight: 600;
        }

        &-itemTwo {
          font-size: 12px;
          color: rgba(165, 173, 186, 1);
          margin-left: 10px;
        }
      }

      padding-bottom: 10px;
      border-bottom: 1px solid rgba(165, 173, 186, 1);
    }
  }

  .dialog-footer {
    .dialog-footer-btnone {
      background: rgba(165, 173, 186, 1);
      color: rgba(123, 123, 123, 1);
    }

    .dialog-footer-btntwo {
      background: linear-gradient(45deg, rgba(30, 208, 255, 1) 0%, rgba(43, 123, 255, 1) 100%);
      color: rgba(255, 255, 255, 1);
    }
  }

  .el-form-item--small.el-form-item {
    margin-bottom: 10px;
  }

  .dialog-input {
    display: flex;
  }

  // 更新历史
  .update-history {
    position: absolute;
    width: 487px;
    top: 0;
    bottom: 0;
    right: 0;
    padding: 20px 30px;
    box-shadow: 1px 7px 25px -1px rgba(0, 0, 0, 0.3);
    border-radius: 3px;
    box-shadow: 0 0 0 1px rgba(218, 226, 237, 1) inset, 1px 7px 25px -1px rgba(0, 0, 0, 0.3);
    background-color: #fff;
    z-index: 88;

    .history-title {
      line-height: 42px;
      padding: 0 0 5px 0;
      box-shadow: 0 -1px 0 0 #E4E7EC inset;
      display: flex;
      justify-content: space-between;

      h3 {
        color: $font-default-color;
        font-size: 24px;

        .color-red {
          color: $main-red-color;
          font-size: 18px;
        }
      }

      .close-button {
        padding: 0 0 10px;
        font-size: 18px;
        color: $main-blue-color;
        cursor: pointer;
      }
    }

    .history-content {
      padding: 15px 0;

      .house-title {
        height: 53px;
        line-height: 53px;
        color: #393C41;
        font-size: 18px;
        border-radius: 3px;
        box-shadow: 0 0 0 1px rgba(62, 130, 254, 1) inset;
        padding: 0 0 0 48px;
        background: url('~@/assets/image/dictSpace/buildingInfoManage/icon-history-house.png') left center no-repeat rgba(62, 130, 254, 0.1);
      }

      .history-list {
        max-height: 600px;
        overflow-y: auto;
        padding: 10px 0 0;

        .list-item {
          padding: 10px 8px 10px (15 + 32)px;
          box-shadow: 0 -1px 0 0 #E5EDF3 inset;
          background: url('~@/assets/image/dictSpace/buildingInfoManage/icon-history-info.png') left center no-repeat;

          .item-title {
            color: #939EAB;
            display: flex;

            .item-user {
              color: $main-blue-color;
              min-width: 50px;
              margin: 0 10px 0 0;
            }
          }
        }
      }
    }
  }
}
</style>