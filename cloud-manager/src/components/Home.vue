<template>
  <el-container class="H_contatoner">
    <el-header>
      <div>
        <img src="../assets/title.png" style="width: 50px;height: 50px;" />
        <span>云平台审核管理系统</span>
      </div>
      <div>你好，{{userName}}!!
        <el-button type="info" @click="logout">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '61px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#409eff" :unique-opened="true" :collapse="isCollapse" :collapse-transition="false" router :default-active="acPath">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>人员租户管理</span>
            </template>
            <el-menu-item index="/users" @click="saveNav('/users')">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-shop"></i>
              <span>可用服务管理</span>
            </template>
            <el-menu-item index="/services" @click="saveNav('/services')">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span>申请工单管理</span>
            </template>
            <el-menu-item index="/orders" @click="saveNav('/orders')">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>列表</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 操作面 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      // 是否折叠
      isCollapse: false,
      acPath: '',
      userName: ''
    }
  },
  created () {
    // 高亮赋值
    this.acPath = window.sessionStorage.getItem('acPath')
    this.userName = window.sessionStorage.getItem('token')
  },
  methods: {
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    },
    saveNav (acPath) {
      window.sessionStorage.setItem('acPath', acPath)
      this.acPath = acPath
    }
  }
}
</script>

<style lang="less" scoped>
.H_contatoner {
  height: 100%;
}
.el-header {
  background-color: #334869;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #333744;
  .el-menu{
    border-right: 0;
  }
}

.el-main {
  background-color: #eaedf1;
}
.iconfont{
  margin-right: 10px;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 18px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
