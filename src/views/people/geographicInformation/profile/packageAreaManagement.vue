<template lang="pug">
.page-box-one
  .page-top
    .house-details
      .base-info
        .base-info-left {{ zoneName }}
        .base-info-right(@click="getcompanyhistory")
          img(
            src="~@/assets/image/dictSpace/buildingInfoManage/icon-history.png"
          )
          a.base-info-right-span 更新历史
      .base-foot
        .base-foot-item
          .base-foot-top
            img(src="~@/assets/image/dictSpace/UrbanAreaManage/icon-grid.png")
            .base-foot-details
              span.base-foot-num {{ gridCnt }}
              br
              span.base-foot-font 网格数量
        .base-foot-item
          .base-foot-top
            img(
              src="~@/assets/image/dictSpace/UrbanAreaManage/icon-residentialQuarters.png"
            )
            .base-foot-details
              span.base-foot-num {{ communityCnt }}
              br
              span.base-foot-font 小区数量
        .base-foot-item
          .base-foot-top
            img(
              src="~@/assets/image/dictSpace/UrbanAreaManage/icon-building.png"
            )
            .base-foot-details
              span.base-foot-num {{ buildingCnt }}
              br
              span.base-foot-font 楼宇数量

    .house-main
      .house-main-left
        span.house-main-left-header 基本信息
        el-button(round, @click="areaEdit") 编辑
        .house-main-left-details
          .house-main-left-list
            .introduce
              nobr 包区类型:
            span {{ zoneTypeName }}
          .house-main-left-list
            .introduce
              nobr 包区地址:
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
      //- 网格列表
      .tab-content(v-if="tabData.activeIndex === 0")
        .tab-top
          .tab-add
            el-button(type="primary", icon="el-icon-plus", @click="addGrid") 添加网格
        .tab-bottom
          .tab-table
            el-table(:data="tableData", max-height="390px")
              el-table-column(prop="zoneName", label="网格名称")
              el-table-column(prop="zoneTypeName", label="网格类型")
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
      //- 统计分析
      .tab-content(v-else-if="tabData.activeIndex === 1")
        .tab-bottom
          el-row(:gutter="20")
            el-col(:span="12")
              el-card(shadow="always")
                span.tab-card-header 各业务计费到达情况
                el-date-picker(
                  v-model="topleftTimeValue",
                  type="month",
                  placeholder="选择月",
                  value-format="yyyy-MM",
                  format="yyyy-MM"
                )
                .tab-card-main
                EchartsBar
            el-col(:span="12")
              el-card(shadow="always")
                span.tab-card-header 各业务发展情况
                EchartsPile
          el-row(:gutter="20")
            el-col(:span="12")
              el-card(shadow="always")
                span.tab-card-header 各业务收入占比
                el-date-picker(
                  v-model="bottomleftTimeValue",
                  type="month",
                  placeholder="选择月",
                  value-format="yyyy-MM",
                  format="yyyy-MM"
                )
                EchartsPie
            el-col(:span="12")
              el-card(shadow="always")
                span.tab-card-header 光端口使用情况
                el-date-picker(
                  v-model="bottomrightTimeValue",
                  type="month",
                  placeholder="选择月",
                  value-format="yyyy-MM",
                  format="yyyy-MM"
                )
                EchartsWaterWaveBall

  //- 编辑基本信息
  el-dialog(title="编辑基本信息", :visible.sync="areaEdits")
    .dialog-main
      el-form(
        label-position="labelPosition",
        label-width="100px",
        :model="edit",
        ref="postData"
      )
        el-form-item(label="包区名称")
          el-input(v-model="edit.zoneName", placeholder="请输入内容")
        el-form-item(label="包区类型:")
          span {{ zoneTypeName }}
        el-form-item(label="包区地址:")
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
  el-dialog(title="添加网格", :visible.sync="addGrids")
    .dialog-main
      el-form(
        label-position="labelPosition",
        label-width="100px",
        :model="add",
        ref="postData"
      )
        el-form-item(label="网格名称:")
          el-input(v-model="add.gridName", placeholder="请输入内容")
        el-form-item(label="网格类型:")
          el-select(v-model="add.gridType", placeholder="请选择网格类型")
            el-option(
              v-for="(item, index) in add.data",
              :key="index",
              :label="item.zoneTypeName",
              :value="item.zoneTypeId"
            )
        el-form-item(label="网格地址:")
          el-input(v-model="add.gridHouse", placeholder="请输入内容")
        el-form-item(label="上级经营单元:")
          span {{ zoneName }}
    .dialog-footer(slot="footer")
      el-button.dialog-footer-btntwo(@click="addGrids = false") 保 存
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
import EchartsBar from "@/components/Echarts/UrbanAreaManage/EchartsBar";
import EchartsPie from "@/components/Echarts/UrbanAreaManage/EchartsPie";
import EchartsPile from "@/components/Echarts/UrbanAreaManage/EchartsPile";
import EchartsWaterWaveBall from "@/components/Echarts/UrbanAreaManage/EchartsWaterWaveBall";
export default {
  name: "PackageAreaManagement",
  components: { EchartsBar, EchartsPie, EchartsPile, EchartsWaterWaveBall },
  props: ["isFlag"],
  data() {
    return {
      zoneName: "世纪花园包区",
      gridCnt: 10,
      buildingCnt: 11,
      communityCnt: 12,
      zoneTypeName: "混合包区",
      address: "宁夏回族自治区-银川-兴庆区",
      upUnit: "宁夏回族自治区-银川",
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
          { name: "网格列表", data: 0 },
          { name: "统计分析", data: 1 },
        ],
      },
      tableData: [
        {
          zoneName: "原州网格",
          zoneTypeName: "城市网格",
          roomCnt: 46,
          famCnt: 30,
          peoCnt: 20,
          busiCnt: 10,
          address: "银川",
        },
        {
          zoneName: "西吉网格",
          zoneTypeName: "城市网格",
          roomCnt: 46,
          famCnt: 30,
          peoCnt: 20,
          busiCnt: 10,
          address: "银川",
        },
      ],
      // 统计分析
      topleftTimeValue: "2020-12",
      topleftLastTimeValue: "2020-12",
      bottomleftTimeValue: "2020-12",
      bottomleftLastTimeValue: "2020-12",
      bottomrightTimeValue: "2020-12",
      bottomrightLastTimeValue: "2020-12",
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
        gridName: "",
        gridType: "",
        data: [
          { zoneTypeName: "城市网格", zoneTypeId: "1" },
          { zoneTypeName: "农村网格", zoneTypeId: "2" },
        ],
        gridHouse: "",
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
  created() {},
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

.page-box-one {
  .page-top {
    border-bottom: 1px solid rgba(218, 226, 237, 1);

    .house-details {
      box-shadow: 0px 9px 12px 0px rgba(0, 0, 0, 0.11);

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

      .base-foot {
        display: flex;
        align-items: center;
        padding: 10px 0;
        justify-content: space-around;

        .base-foot-item {
          .base-foot-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .base-foot-details {
            text-align: center;
            margin: 0 10px;
          }

          .base-foot-num {
            font-size: 18px;
            font-weight: 600;
            color: rgba(55, 57, 76, 1);
            line-height: 28px;
          }

          .base-foot-font {
            font-size: 14px;
            color: rgba(147, 158, 171, 1);
            line-height: 20px;
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
            background: url('~@/assets/image/dictSpace/UrbanAreaManage/icon-tab-' + index + '.png') 40px center no-repeat;
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
        }

        .tab-bottom {
          .tab-pagination {
            .el-pagination {
              float: right;
              padding: 10px 0;

              button, ul, .el-pagination__total {
                margin-top: 2px;
              }

              .el-pagination__total, .el-pagination__jump {
                margin-left: 4px;
              }
            }
          }

          .el-row {
            margin: 10px;

            .tab-card-header {
              font-size: 16px;
              font-weight: 600;
              color: rgba(55, 57, 76, 1);
            }

            .el-date-editor.el-input.el-input--small.el-input--prefix.el-input--suffix.el-date-editor--month {
              width: 100px;
              float: right;

              .el-input__inner {
                font-size: 12px;
                padding: 0 10px;
              }

              .el-input__icon.el-icon-date {
                width: 14px;
                padding: 0 70px;
              }
            }

            .tab-card-main {
              margin-top: 15px;
            }

            .tab-card-all {
              font-size: 14px;
              font-weight: 400;
              color: rgba(55, 57, 76, 1);
            }

            .tab-card-num {
              font-size: 18px;
              font-weight: bold;
              color: rgba(62, 130, 254, 1);
            }
          }
        }
      }
    }
  }

  .el-dialog__header {
    border-bottom: 1px solid #E4E7EC;
  }

  .el-dialog__body {
    padding: 10px 20px;

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

  .dialog-footer {
    .dialog-footer-btnone {
      background: rgba(165, 173, 186, 1);
      color: rgba(255, 255, 255, 1);
    }

    .dialog-footer-btntwo {
      background: linear-gradient(45deg, rgba(30, 208, 255, 1) 0%, rgba(43, 123, 255, 1) 100%);
      color: rgba(255, 255, 255, 1);
    }
  }

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