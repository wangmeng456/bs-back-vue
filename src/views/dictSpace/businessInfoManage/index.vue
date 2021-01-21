<template lang="pug">
<div class="business-info-manage">
  .pageConditionDiv(v-show="!marketShow")
    .orgnTxt 营销组织：
    identity-tree(@update-component-data="getPageData")
    .orgnTxt 空间类别：
    <el-select v-model="value" placeholder="请选择" @change="changeSpaceType">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  <component :is="marketGrid" :key="childCompKey" v-show="marketShow" :parentPageParam="marketType" @backView="getBack"></component>
  <div class="business-info-manage" v-loading="pageDataLoading" v-show="!marketShow">
    <el-row :gutter="20">
      <el-col :span="6" v-for="item in colList" :key="item.ZONE_TYPE_ID">
        <div class="grid-content">
          <div class="grid-item grid-title">{{item.ZONE_TYPE_NAME}}</div>
          <div class="grid-item">
            <div class="el-progress-circle">
              <el-progress type="circle" :stroke-width="10" :width="128" :percentage="parseFloat(item.STL_RATE)" color="#FF8E3B" :format="format"></el-progress>
            </div>
          </div>
          <div class="grid-item">
            <div class="grid-bigNum"> {{item.ZONE_CNT}}</div>
            <div class="grid-bigNumTxt"> {{item.ZONE_TYPE_NAME}}数量</div>
          </div>
          <div class="grid-item">
          <!--
            <div class="floor3Txt">
              <span class="floor4Txt">包含楼宇数：</span>
              <span class="grid-num"> {{item.BLDG_CNT}}</span>
            </div> -->
            <div>
              <span class="floor4Txt">包含企业客户数：</span>
              <span class="grid-num"> {{item.ENT_CNT}}</span>
            </div>
          </div>
          <div class="grid-item">
            <el-button type="primary" size="medium" :round=true @click="chooseSpaceHandle(item)">进入></el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</div>
</template>

<script>
import { businessCustomerSpaceManage } from "@/api/dictSpace/businessCustomerSpaceManage";
import IdentityTree from "@/components/IdentityTree";
export default {
  name: "BusinessInfoManage",
  components: {
    marketGrid: () => import(`@/views/dictSpace/businessInfoManage/marketGrid`),
    IdentityTree
  },
  data() {
    return {
      colList:[],
      pageDataLoading: false,
      marketType: {},
      marketShow: false,
      marketGrid:null,
      childCompKey:1,
      pageCondition:null,
      options: [{
          value: '603',
          label: '校园空间'
        }, {
          value: '602',
          label: '商客空间'
        }],
      value:'602'
    };
  },
  methods: {
    getPageData(orgnNode) {
      const me = this;
      me.pageDataLoading = true;
      me.pageCondition = orgnNode;
      me.getMarketList(orgnNode);
    },
    getMarketList(orgnNode){
      const me = this;
      let paramObj = Object.assign({ "zoneKindId": me.value }, orgnNode);
      businessCustomerSpaceManage.getMarketList(paramObj).then(res => {
        if(res.status === 200){
          me.colList = res.data.data;
        }
      }).finally(() => {
        me.pageDataLoading = false;
      });
    },
    chooseSpaceHandle(val){//点击进入进入到对应的特征市场的网格列表
      this.marketType = Object.assign(val, this.pageCondition);
      this.marketShow = true;
      ++this.childCompKey;
      this.marketGrid = 'marketGrid';
    },
    getBack(){
      this.marketShow = !this.marketShow;
    },
    format(percentage){
      return `${percentage}%`;
    },
    changeSpaceType(){
      const me = this;
      me.getMarketList(me.pageCondition);
    }
  }
};
</script>

<style lang="stylus" scoped>
.business-info-manage
  padding 36px 60px 0px 60px
  .pageConditionDiv
    -webkit-box-shadow 0 5px 10px #ddd
    box-shadow 0 5px 10px #ddd
    background-color #fff
    min-height 48px
    line-height 48px
    padding-left 60px
    position absolute
    top 0
    left 0
    width 100%
  .orgnTxt
    float left
    line-height 48px
  .identity-tree
    float left
    margin-right 6px
  .el-row 
    margin-bottom 20px
    &:last-child 
      margin-bottom 0
    .el-col 
      border-radius 4px
      margin-bottom 20px
      .grid-content 
        border-radius 4px
        background #fff
        display inline-block
        width 100%
        padding 0px 10px
        &:last-child 
          padding-bottom 0
        .grid-item
          text-align center
          padding 24px 0px
          border-bottom 1px solid #e5e5e5
          &:last-child
            border-bottom 0px
            padding 48px 0px
          &:not(:first-child)
            margin 0px 20px
      .grid-title 
        font-size 24px
        font-weight 600
        color #666666
      .el-progress-circle
        color #FF8E3B
        /deep/ .el-progress__text
          color #FF8E3B
          &:after
            content '渗透率'
            display block
            margin-top 10px
            font-size 14px
            color #666
      .grid-bigNum 
        color #017bb4
        font-size 36px
      .grid-bigNumTxt 
        color #999
        font-size 12px
      .floor3Txt 
        margin-bottom 20px
      .floor4Txt 
        color #999
        font-size 17px
      .grid-num 
        font-size 16px
</style>
