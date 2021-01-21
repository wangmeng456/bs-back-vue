<template lang="pug">
  //- 这是专门为了多级菜单，而使用的一个用作路由转换的基础组件
  .multi-menu-base-view
    router-view
</template>

<script>
export default {
  name: "MultiMenuBaseView"
};
</script>