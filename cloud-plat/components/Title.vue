<template>
  <el-menu
    :default-active="$route.path"
    class="el-menu-demo"
    mode="horizontal"
    router
  >
    <el-menu-item index="/order/listdata">服务工单列表</el-menu-item>
    <!-- <el-menu-item index="/order/addorder">新建服务工单</el-menu-item> -->
  </el-menu>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu-demo {
  padding-top: 160px;
}
/* 水平样式 */
.el-menu--horizontal > div > .el-submenu {
  float: left;
}

/* 一级菜单的样式 */
.el-menu--horizontal > div > .el-menu-item {
  float: left;
  height: 60px;
  line-height: 60px;
  margin: 0;
  border-bottom: 2px solid transparent;
  color: #909399;
}
</style>
