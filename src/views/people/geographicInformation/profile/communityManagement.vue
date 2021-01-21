<template lang="pug">
.page-box-three
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
              nobr 小区类型:
            span {{ zoneTypeName }}
          .house-main-left-list
            .introduce
              nobr 小区地址:
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
      //- 楼宇列表
      .tab-content(v-if="tabData.activeIndex === 0")
        .tab-top
          .tab-add
            el-button(type="primary", icon="el-icon-plus", @click="addGrid") 添加楼宇
        .tab-bottom
          .tab-table
            el-table(:data="tableData", max-height="390px")
              el-table-column(prop="zoneName", label="楼宇名称")
              el-table-column(prop="zoneTypeName", label="楼宇类型")
              el-table-column(prop="roomCnt", label="房屋套数")
              el-table-column(prop="famCnt", label="住户数")
              el-table-column(prop="peoCnt", label="人口数")
              el-table-column(prop="address", label="地址")
          .tab-pagination
            el-pagination(
              :total="2",
              layout="prev, pager, next, total, jumper",
              page.sync="1",
              limit.sync="10",
              @pagination="getChildList"
            )
      //- 异网竞争信息
      .tab-content(v-else-if="tabData.activeIndex === 1")
        .tab-top
          .tab-add
            el-button(
              type="primary",
              icon="el-icon-edit",
              @click="communityEdit"
            ) 编辑
        .tab
          .tab-center
            .tab-left
              .tab-image
                img(
                  src="~@/assets/image/dictSpace/UrbanAreaManage/icon-community-1.png"
                )
              .tab-font 异网渠道信息
            .tab-right
              .tab-table
                el-table(:data="tableOne", max-height="390px")
                  el-table-column(prop="cptrType", label="异网进驻情况")
                  el-table-column(prop="channelInfo", label="渠道信息描述")
          .tab-center
            .tab-left
              .tab-image
                img(
                  src="~@/assets/image/dictSpace/UrbanAreaManage/icon-community-2.png"
                )
              .tab-font 运营商资源情况
            .tab-right
              .tab-table
                el-table(:data="tableTwo", max-height="390px")
                  el-table-column(prop="cptrType", label="异网进驻情况")
                  el-table-column(prop="userCnt", label="用户数")
          .tab-center
            .tab-left
              .tab-image
                img(
                  src="~@/assets/image/dictSpace/UrbanAreaManage/icon-community-3.png"
                )
              .tab-font 异网客户经理
            .tab-right
              .tab-table
                el-table(:data="tableThree", max-height="390px")
                  el-table-column(prop="cptrType", label="异网进驻情况")
                  el-table-column(prop="otherManager", label="姓名")
                  el-table-column(prop="otherManagerTel", label="联系方式")
      //- 营销信息
      .tab-content(v-else-if="tabData.activeIndex === 2")
        .tab-top
          .tab-add
            el-button(
              type="primary",
              icon="el-icon-edit",
              @click="editMarketInfo"
            ) 编辑
        .tab-box
          .tab-list
            .tab-item 楼盘交付时间：
              span {{ deliveryTime }}
            .tab-item 小区责任人：
              span {{ owner }}
            .tab-item 结对门店：
              span {{ pairStore }}
          .tab-list
            .tab-item 物业公司：
              span {{ pmc }}
            .tab-item 物业联系人：
              span {{ pmcStaff }}
            .tab-item 物业联系方式：
              span {{ pmcStaffTel }}
  //- 编辑基本信息
  el-dialog(title="编辑基本信息", :visible.sync="areaEdits")
    .dialog-main
      el-form(
        label-position="labelPosition",
        label-width="100px",
        :model="edit",
        ref="postData"
      )
        el-form-item(label="小区名称")
          el-input(v-model="edit.zoneName", placeholder="请输入内容")
        el-form-item(label="小区类型:")
          span {{ zoneTypeName }}
        el-form-item(label="小区地址:")
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
  el-dialog(title="添加楼宇", :visible.sync="addGrids")
    .dialog-main
      el-form(
        label-position="labelPosition",
        label-width="100px",
        :model="add",
        ref="postData"
      )
        el-form-item(label="楼宇名称:")
          el-input(v-model="add.gridName", placeholder="请输入内容")
        el-form-item(label="楼宇类型:")
          el-select(v-model="add.gridType", placeholder="请选择类型")
            el-option(
              v-for="(item, index) in add.data",
              :key="index",
              :label="item.zoneTypeName",
              :value="item.zoneTypeId"
            )
        el-form-item(label="楼宇地址:")
          el-input(v-model="add.gridHouse", placeholder="请输入内容")
        el-form-item(label="上级经营单元:")
          span {{ zoneName }}
    .dialog-footer(slot="footer")
      el-button.dialog-footer-btntwo(@click="addGrids = false") 保 存
  //- 编辑竞争信息
  el-dialog(title="编辑竞争信息", :visible.sync="communityEdits")
    .dialog-main
      .tab-center
        .tab-left
          .tab-image
            img(
              src="~@/assets/image/dictSpace/UrbanAreaManage/icon-community-1.png"
            )
          .tab-font 异网渠道信息
        .tab-right
          el-form(
            label-position="labelPosition",
            :model="editCommunity.dynamicItemOne",
            v-for="(item, index) in editCommunity.dynamicItemOne.otherNetChannel"
          )
            .tab-item
              el-select(v-model="item.cptrType", placeholder="请选择异网进驻情况")
                el-option(
                  v-for="(item, index) in editCommunity.option",
                  :key="index",
                  :label="item.label",
                  :value="item.value"
                )
            .tab-item
              el-form-item
                el-input(v-model="item.channelInfo", placeholder="请输入渠道信息描述")
            .tab-item
              .tab-item-img
                img(
                  src="~@/assets/image/dictSpace/UrbanAreaManage/icon-add.png"
                )
                img(
                  src="~@/assets/image/dictSpace/UrbanAreaManage/icon-reduce.png",
                  :class="{ 'img-vis': editCommunity.dynamicItemOne.otherNetChannel.length < 2 }"
                )
      .tab-center
        .tab-left
          .tab-image
            img(
              src="~@/assets/image/dictSpace/UrbanAreaManage/icon-community-2.png"
            )
          .tab-font 运营商资源情况
        .tab-right
          el-form(
            label-position="labelPosition",
            :model="editCommunity.dynamicItemOne",
            v-for="(item, index) in editCommunity.dynamicItemOne.serviceProvider"
          )
            .tab-item
              el-select(v-model="item.cptrType", placeholder="请选择异网进驻情况")
                el-option(
                  v-for="(item, index) in editCommunity.option",
                  :key="index",
                  :label="item.label",
                  :value="item.value"
                )
            .tab-item
              el-form-item
                el-input(v-model="item.userCnt", placeholder="请输入用户数")
            .tab-item
              .tab-item-img
                img(
                  src="~@/assets/image/dictSpace/UrbanAreaManage/icon-add.png"
                )
                img(
                  src="~@/assets/image/dictSpace/UrbanAreaManage/icon-reduce.png",
                  :class="{ 'img-vis': editCommunity.dynamicItemOne.serviceProvider.length < 2 }"
                )
      .tab-center
        .tab-left
          .tab-image
            img(
              src="~@/assets/image/dictSpace/UrbanAreaManage/icon-community-3.png"
            )
          .tab-font 异网客户经理
        .tab-right
          el-form(
            label-position="labelPosition",
            :model="editCommunity.dynamicItemOne",
            v-for="(item, index) in editCommunity.dynamicItemOne.otherNetManager"
          )
            .tab-item
              el-select(v-model="item.cptrType", placeholder="请选择异网进驻情况")
                el-option(
                  v-for="(item, index) in editCommunity.option",
                  :key="index",
                  :label="item.label",
                  :value="item.value"
                )
            .tab-item
              el-form-item
                el-input(v-model="item.otherManager", placeholder="请输入姓名")
            .tab-item
              el-form-item
                el-input(v-model="item.otherManagerTel", placeholder="请输入联系方式")
            .tab-item
              .tab-item-img
                img(
                  src="~@/assets/image/dictSpace/UrbanAreaManage/icon-add.png"
                )
                img(
                  src="~@/assets/image/dictSpace/UrbanAreaManage/icon-reduce.png",
                  :class="{ 'img-vis': editCommunity.dynamicItemOne.otherNetManager.length < 2 }"
                )
    .dialog-footer(slot="footer")
      el-button.dialog-footer-btntwo(@click="communityEdits = false") 拿 回
      el-button.dialog-footer-btnone(
        :disabled="true",
        @click="communityEdits = false"
      ) 保 存
  //- 编辑营销信息
  el-dialog(title="编辑营销信息", :visible.sync="marketingInfos")
    .dialog-main
      el-form(
        label-position="labelPosition",
        label-width="110px",
        :model="updateMarketingInfo",
        ref="postData"
      )
        el-form-item(label="楼盘交付时间:")
          el-date-picker(
            v-model="updateMarketingInfo.deliveryTime",
            type="date",
            placeholder="选择楼盘交付时间",
            value-format="yyyy-MM-dd",
            format="yyyy-MM-dd"
          )
        el-form-item(label="小区责任人:")
          el-input(v-model="updateMarketingInfo.owner", placeholder="请输入小区责任人")
        el-form-item(label="结对门店:")
          el-input(
            v-model="updateMarketingInfo.pairStore",
            placeholder="请输入结对门店"
          )
        el-form-item(label="物业公司:")
          el-input(v-model="updateMarketingInfo.pmc", placeholder="请输入物业公司")
        el-form-item(label="物业联系人:")
          el-input(
            v-model="updateMarketingInfo.pmcStaff",
            placeholder="请输入物业联系人"
          )
        el-form-item(label="物业联系方式:")
          el-input(
            v-model="updateMarketingInfo.pmcStaffTel",
            placeholder="请输入物业联系方式"
          )
    .dialog-footer(slot="footer")
      el-button.dialog-footer-btntwo(@click="marketingInfos = false") 保 存'
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
import { getToken } from "@/utils/auth";
export default {
  name: "communityManagement",
  props: ["isFlag"],
  data() {
    return {
      zoneName: "世纪花园小区",
      gridCnt: 10,
      buildingCnt: 11,
      communityCnt: 12,
      zoneTypeName: "成型小区",
      address: "兴庆区-世纪果园包区-世纪花园网格",
      upUnit: "宁夏回族自治区-银川-兴庆区-世纪花园包区-世纪花园网格",
      roomCnt: 1000,
      famCnt: 200,
      peoCnt: 300,
      busiCnt: 50,
      netCustCnt: 600,
      netRoomCnt: 60,
      netBusiCnt: 70,
      rate: 30,
      tableData: [
        {
          zoneName: "世纪花园小区",
          zoneTypeName: "成型小区",
          roomCnt: 46,
          famCnt: 30,
          peoCnt: 20,
          busiCnt: 10,
          address: "银川",
        },
        {
          zoneName: "世纪果园小区",
          zoneTypeName: "非成型小区",
          roomCnt: 46,
          famCnt: 30,
          peoCnt: 20,
          busiCnt: 10,
          address: "银川",
        },
      ],
      // 标签页切换
      tabData: {
        // 标题切换索引
        activeIndex: 0,
        tabMenuListData: [
          { name: "楼宇列表", data: 0 },
          { name: "异网竞争信息", data: 1 },
          { name: "营销信息", data: 2 },
        ],
      },

      deliveryTime: "2020-07-16",
      owner: "张三",
      pairStore: "景芳营业厅",
      pmc: "中海置业",
      pmcStaff: "里斯",
      pmcStaffTel: "13812831331",
      tableOne: [{ cptrType: "联通", channelInfo: "营业厅1" }],
      tableTwo: [{ cptrType: "联通", userCnt: 1 }],
      tableThree: [
        {
          cptrType: "联通",
          otherManager: "张三",
          otherManagerTel: "18340828888",
        },
      ],
      areaEdits: false,
      areaDeclares: false,
      addGrids: false,
      communityEdits: false,
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
        gridName: "",
        gridType: "",
        data: [
          { zoneTypeName: "住宅楼宇", zoneTypeId: "1" },
          { zoneTypeName: "商务楼宇", zoneTypeId: "2" },
          { zoneTypeName: "商铺", zoneTypeId: "3" },
        ],
        gridHouse: "",
      },
      editCommunity: {
        dynamicItemOne: {
          otherNetChannel: [
            {
              typeId: 1,
              channelInfo: "",
              cptrType: 1,
            },
          ],
          otherNetManager: [
            {
              typeId: 3,
              otherManager: "",
              otherManagerTel: "",
              cptrType: 2,
            },
          ],
          serviceProvider: [
            {
              typeId: 2,
              userCnt: 1,
              cptrType: 3,
            },
          ],
        },
        option: [
          { label: "联通", value: 1 },
          { label: "移动", value: 2 },
          { label: "华数", value: 3 },
          { label: "其他", value: 4 },
        ],
      },
      marketingInfos: false,
      updateMarketingInfo: {
        deliveryTime: "2020-07-16",
        owner: "张三",
        pairStore: "景芳营业厅",
        pmc: "中海置业",
        pmcStaff: "里斯",
        pmcStaffTel: "13812831331",
        data: [],
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
    // tab 菜单点击切换
    tabSwitchhandle(data) {
      this.tabData.activeIndex = data;
    },
    getChildList() {},
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
    // 编辑异网信息
    communityEdit() {
      const me = this;
      me.communityEdits = true;
    },
    // 编辑营销信息
    editMarketInfo() {
      const me = this;
      me.marketingInfos = true;
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

.page-box-three {
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

        for index in 1 2 3 {
          &:nth-child({index}), &:active {
            background: url('~@/assets/image/dictSpace/UrbanAreaManage/icon-tabthree-' + index + '.png') 40px center no-repeat;
          }
        }
      }
    }

    .tab-details {
      .tab-content {
        .tab-top {
          display: flex;
          padding: 20px 0 15px;

          .tab-add {
            margin-right: 10px;

            .el-button.el-button--primary.el-button--small {
              background: linear-gradient(45deg, rgba(30, 208, 255, 1) 0%, rgba(43, 123, 255, 1) 100%);
            }
          }
        }

        .tab-bottom {
          .tab-pagination {
            .el-pagination {
              float: right;
              padding: 10px 0;
            }
          }
        }

        // 异网竞争信息
        .tab-center {
          display: flex;
          justify-content: space-between;

          .tab-left {
            margin: 0 0 20px 0;
            padding: 40px 10px 0 0;
            width: 16%;
            float: left;

            .tab-image {
              text-align: center;
            }

            .tab-font {
              font-size: 14px;
              font-weight: 500;
              color: rgba(55, 57, 76, 1);
              text-align: center;
            }
          }

          .tab-right {
            margin: 0 0 20px 0;
            width: 84%;
            float: left;
            border-left: 1px solid #E5EDF3;
            padding: 0 10px;
          }
        }

        // 营销信息
        .tab-box {
          .tab-list {
            display: flex;
            justify-content: space-between;

            .tab-item {
              width: 33%;
              font-size: 14px;
              color: rgba(147, 158, 171, 1);
              line-height: 24px;

              span {
                color: rgba(55, 57, 76, 1);
              }
            }
          }
        }

        .tab-unbox {
          text-align: center;
          padding: 20px;
        }
      }
    }
  }

  // 弹框
  .el-dialog__header {
    border-bottom: 1px solid #E4E7EC;
  }

  .el-dialog__body {
    padding: 10px 20px;
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

  // 异网渠道信息
  .dialog-main {
    .tab-center {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid rgba(228, 231, 236, 1);
      padding-top: 10px;

      .tab-left {
        width: 16%;
        float: left;
        margin: 10px 0;

        .tab-image {
          text-align: center;
        }

        .tab-font {
          font-size: 14px;
          font-weight: 500;
          color: rgba(55, 57, 76, 1);
          text-align: center;
        }
      }

      .tab-right {
        width: 84%;
        float: left;

        .el-form {
          display: flex;
          justify-content: space-between;

          .tab-item {
            padding-right: 4px;

            &-img {
              width: 60px;

              img {
                margin: 2px 2px 0 2px;
                cursor: pointer;

                .img-vis {
                  visibility: hidden;
                }
              }
            }
          }
        }
      }
    }
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
