<template lang="pug">
//- 城市区域
.urban-area-manage
  .header
    el-form(ref="form", :model="form", label-width="100px")
      el-row
        el-col(:span="18")
          el-form-item(label="地域维度")
            el-cascader(
              v-model="form.region",
              :options="form.option",
              @change="handleChange"
            )
        el-col(:span="6")
          el-form-item
            el-button(type="primary") 查询
            el-button(type="success") 重置
  .page-main
    //- 左侧内容
    .page-list
      .area-per
        .area-text 
          span 信息完整率
          span.text-value.area-text-span {{ rate }}%
        .area-img
          .img-mask(:style="{ left: rate + '%' }")
      .house-data
        .search-input
          el-input(
            placeholder="按名称搜索",
            prefix-icon="el-icon-search",
            v-model="zoneName"
          )
        .area-radio
          el-radio-group(v-model="perfectType")
            el-radio-button(label="") 全部 {{ totalCnt }}
            el-radio-button(label="1") 已完善
              span.area-radio-done {{ perfectCnt }}
            el-radio-button(label="2") 待完善
              span.area-radio-none {{ imperfectCnt }}
        .area-tree
          Tree(@children-tree="dataEvent")
    //- 右侧内容
    .page-details
      PackageAreaManagement(v-show="isFlag === 1", :isFlag="isFlag")
      GridManagement(v-show="isFlag === 2", :isFlag="isFlag")
      CommunityManagement(v-show="isFlag === 3", :isFlag="isFlag")
      BuildingManagement(v-show="isFlag === 4", :isFlag="isFlag")
</template>

<script>
// components
import Tree from "@/components/Tree";
import PackageAreaManagement from "./profile/packageAreaManagement";
import GridManagement from "./profile/gridManagement";
import CommunityManagement from "./profile/communityManagement";
import BuildingManagement from "./profile/buildingManagement";

export default {
  name: "UrbanAreaManage",
  components: {
    Tree,
    PackageAreaManagement,
    GridManagement,
    CommunityManagement,
    BuildingManagement,
  },
  data() {
    return {
      rate: 56.3,
      zoneName: "",
      perfectType: "",
      totalCnt: 119,
      perfectCnt: 67,
      imperfectCnt: 52,
      isFlag: 1,
      form: {
        date1: "",
        date2: "",
        region: "",
        option: [
          {
            label: "北京",
            value: "beijing",
            children: [{ label: "北京市", value: "beijings" }],
          },
          {
            label: "天津",
            value: "tianjin",
            children: [{ label: "天津市", value: "tianjins" }],
          },
          {
            label: "上海",
            value: "shanghai",
            children: [{ label: "上海市", value: "shanghais" }],
          },
          {
            label: "重庆",
            value: "chongqing",
            children: [{ label: "重庆市", value: "chongqings" }],
          },
          {
            label: "河北省",
            value: "hebei",
            children: [
              { label: "石家庄市", value: "shijiazhuang" },
              { label: "唐山市", value: "tangshan" },
              { label: "秦皇岛市", value: "qinhuangdao" },
              { label: "邯郸市", value: "handan" },
              { label: "邢台市", value: "xingtai" },
              { label: "保定市", value: "baoding" },
              { label: "张家口市", value: "zhangjiakou" },
              { label: "承德市", value: "chengde" },
              { label: "沧州市", value: "cangzhou" },
            ],
          },
          {
            label: "河南省",
            value: "henan",
            children: [
              { label: "郑州市", value: "zhengzhou" },
              { label: "开封市", value: "kaifeng" },
              { label: "洛阳市", value: "luoyang" },
              { label: "平顶山市", value: "pingdingshan" },
              { label: "安阳市", value: "anyang" },
            ],
          },
          { label: "云南省", value: "yunnan" },
          { label: "辽宁省", value: "liaoning" },
          { label: "黑龙江市", value: "heilongjiang" },
          { label: "湖南省", value: "hunan" },
          { label: "安徽省", value: "anhui" },
          { label: "山东省", value: "shandong" },
          { label: "新疆省", value: "xinjiang" },
          { label: "江苏省", value: "jiangsu" },
          { label: "浙江省", value: "zhejiang" },
          { label: "江西省", value: "jiangxi" },
          { label: "湖北省", value: "hubei" },
        ],
      },
    };
  },
  created() {},
  methods: {
    handleChange() {},
    dataEvent(data) {
      this.isFlag = data.flag;
    },
  },
};
</script>

<style lang="stylus">
@import '~@/assets/styles/mixin.styl';

layout-block() {
  box-shadow: 0 0 0 1px rgba(218, 226, 237, 1) inset;
  border-radius: 3px;
  background-color: #fff;
}

.urban-area-manage {
  .header {
    border: 1px solid #d8dce5;
    padding-top: 20px;
    background: #ffffff;
  }

  .page-main {
    width: $min-width;
    margin: 15px auto;
    display: flex;
    justify-content: space-between;
    min-height: 100vh;

    // 左侧
    .page-list {
      width: (308 / 1162 * 100)%;

      .area-per {
        layout-block();
        margin: 0 0 12px 0;
        padding: 25px 20px;

        .area-text {
          display: flex;
          justify-content: space-between;
          line-height: 30px;
          font-size: 18px;
          font-weight: 600;

          .area-text-span {
            color: #3E82FE;
          }
        }

        .area-img {
          height: 23px;
          margin: 10px 0;
          background: url('~@/assets/image/dictSpace/buildingInfoManage/info-img.png') left center;
          background-size: cover;
          position: relative;
          overflow: hidden;

          .img-mask {
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.5);
          }
        }
      }
    }

    .house-data {
      layout-block();
      padding: 10px;
      min-height: 400px;

      .search-input {
        padding: 10px 8px;
      }

      .area-radio {
        padding: 0 8px;
        margin: 10px 0;

        radio() {
          padding: 0 4px;
          margin: 0 4px;
          border-radius: 10px;
          color: #ffffff;
        }

        .area-radio-done {
          background: #2EBD41;
          radio();
        }

        .area-radio-none {
          background: #BF0152;
          radio();
        }
      }

      .area-tree {
        padding: 8px;

        icon() {
          content: '';
          display: block;
          width: 18px;
          height: 18px;
          font-size: 16px;
          background-size: 16px;
        }

        status() {
          width: 8px;
          height: 8px;
          border-radius: 8px;
          display: block;
          float: right;
          margin: 7px;
        }

        .tree-active {
          color: #4687FE;
          background-color: #EBF2FE !important;
          padding: 2px 10px 2px 0;
        }

        .el-tree-node__content:hover {
          background: #ffffff;
        }

        .el-tree-node:focus>.el-tree-node__content {
          background: #ffffff;
        }

        .el-tree .el-tree-node__expand-icon.expanded {
          -webkit-transform: rotate(0deg);
          transform: rotate(0deg);
        }

        .el-tree .el-tree-node__expand-icon .el-icon-caret-right:before {
          background: url('~@/assets/image/dictSpace/UrbanAreaManage/icon-marshalling.png') no-repeat 0 2px;
          icon();
        }

        .el-tree .el-tree-node__expand-icon .el-icon-caret-right:before {
          background: url('~@/assets/image/dictSpace/UrbanAreaManage/icon-marshalling1.png') no-repeat 0 2px;
          icon();
        }

        .el-tree-node__expand-icon.is-leaf::before {
          display: none;
        }

        .status1 {
          background: red;
          status();
        }

        .status2 {
          background: greenyellow;
          status();
        }
      }
    }

    // 右侧
    .page-details-data-none {
      flex: 1;

      layout-block() {
        margin: 0 0 0 12px;
        text-align: center;
        line-height: 300px;
        font-size: 18px;
      }
    }

    .page-details {
      flex: 1;
      layout-block();
      margin: 0 0 0 12px;
      position: relative;
    }
  }
}
</style>