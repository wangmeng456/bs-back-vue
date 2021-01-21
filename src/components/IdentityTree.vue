<template lang="pug">
//- 基于 el-cascader 组件，自定义一个角色结构树组件
.identity-tree
  //- 是否保留清空方法待定 clearable
  el-cascader(ref="identityTree" v-model="selectedOptions" :props="{ checkStrictly: true,lazy: true,lazyLoad: loadHandleNode,leaf: 'isLeaf', label: 'orgnName', value: 'orgnId'}" :show-all-levels="false" @change="cascaderHandleChange" filterable placeholder="请选择" size="mini")
</template>

<script>
// api
import { getSysOrgnInfo } from "@/api/common";

export default {
  name: "IdentityTree",
  data() {
    return {
      selectedOptions: [],
      // 储存转换后的当前用户信息
      currentUserInfo: {}
    };
  },
  methods: {
    /**
     * 查询部门下拉树结构
     * id 如果有传 id 值，表示这里请求的是子级的数据，返回一个 peomise，否则表示是一级数据直接返回
     */
    getSysOrgnInfo(orgnId) {
      // 判断如果传的是 "" 值，表示这里是需要初始化最初的用户身份，否则正常请求接口
      if (orgnId) {
        // 获取下级的列表数据
        return new Promise(resolve => {
          getSysOrgnInfo({
            orgnSumId: orgnId
          }).then(res => {
            let saveData = res.data.data;
            // 手动将 isLeaf 字段转换成 Boolean 值
            saveData.forEach(element => {
              element.isLeaf = !!element.isLeaf;
            });
            resolve(saveData);
          });
        });
      } else {
        //console.log(localStorage.getItem("__userInfo__"));
        // 获取当前用户身份的数据
        return new Promise(resolve => {
          let { currentManagerTm } = JSON.parse(
            localStorage.getItem("__userInfo__")
          );
          currentManagerTm.orgnName = currentManagerTm.areaName;
          // currentManagerTm.orgnId = currentManagerTm.areaId;
          currentManagerTm.orgnId = 95;
          getSysOrgnInfo({
            sessionOrgnSumId: currentManagerTm.orgnId
          }).then(res => {
            let saveData = res.data.data;
            // 手动将 isLeaf 字段转换成 Boolean 值
            saveData.forEach(element => {
              element.isLeaf = !!element.isLeaf;
            });
            resolve(saveData);
            this.currentUserInfo = saveData[0];
            // 默认选中当前用户身份，并触发页面加载数据
            this.selectedOptions = [currentManagerTm.orgnId];
            this.$emit("update-component-data", saveData[0]);
          });
        });

      }
    },
    /**
     * 部门节点加载函数
     */
    async loadHandleNode(node, resolve) {
      const data = await this.getSysOrgnInfo(
        node.level === 0 ? "" : node.data.orgnId
      );
      resolve(data);
    },
    /**
     * 选中弹窗内部的部门节点加载函数
     */
    cascaderHandleChange(value) {
      let $identityTree = this.$refs.identityTree;
      // 由于组件没有单选关闭悬浮窗的回调，所以需要手动关闭
      $identityTree.toggleDropDownVisible(false);
      if (value) {
        // 调用父组件方法，传递当前单选选中的身份对象
        const checkedNodes = $identityTree.getCheckedNodes();
        // 判断如果单选无选中值时，传递当前用户信息
        this.$emit(
          "update-component-data",
          checkedNodes.length ? checkedNodes[0].data : this.currentUserInfo
        );
      }
    }
  }
};
</script>