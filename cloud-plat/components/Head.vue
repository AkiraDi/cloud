<template>
  <section id="menuArea" class="menu-area">
    <div class="top-menu-area">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="menu-full-width">
              <div class="logo-box"><div class="logo">
                  <a href="/" title="Avivon">
                    <img
                      src="~/assets/img/titel.png"
                      width="144px"
                      height="50px"
                      alt="logo"
                    >
                  </a>
                </div>
              </div>
              <div class="main-menu">
                <div class="aui-head-menu">
                  <ul>
                    <!-- <li><a href="/public/docs">帮助文档</a></li> -->
                    <li v-if="flag" ><a href="/public/produce#">产品</a></li>
                  </ul>
                </div>
                <div v-if="flag" class="logo-right-button"> 
                  <el-dropdown  size="medium" @command="handleCommand">
                    <span class="contact-para ">
                      {{name}}
                      <i class="el-icon-arrow-down el-icon--right" />
                    </span>
                    <!-- <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="logout">
                        注销
                      </el-dropdown-item>
                    </el-dropdown-menu> -->
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="myProduct">
                        <i class="el-icon-s-promotion">我的产品</i>
                      </el-dropdown-item>
                      <el-dropdown-item command="logout">
                        <i class="el-icon-switch-button">注销</i>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
                <div v-show="isShow" id='user' class="logo-right-button">
                  <!-- end lang-dropdown -->
                  <div class="contact-para">
                    <p><a href="/user/registe">注册</a></p>
                  </div>
                  <div class="contact-para">
                    <p><a href="/user/login">登陆</a></p>
                  </div>
                  <!-- end contact-para -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { getUserInfo } from '@/utils/authority'

export default {
  data() {
    const username = JSON.parse(getUserInfo())
    if(username==null){
      return {
        isShow:true,
        flag:false,
        name:'未登录'
      }
    }else{
      return {
        isShow:false,
        flag:true,
        name:username.name
      }
    }
  },
  mounted () {
        // 事件监听滚动条
        window.addEventListener('scroll', this.watchScroll, true);
  },
  methods: {
    watchScroll() {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      //  当滚动超过 30 时，实现非透明
      if (scrollTop > 30) {
        document.getElementById('menuArea').className = 'menu-area active'
      } else {
        document.getElementById('menuArea').className = 'menu-area'
      }
    },
    
    handleCommand(command) {
      const _this = this
      if (command === 'myProduct') {
        _this.$router.push({path: "/order/listdata"});
      } 
      if (command === 'logout') {
        _this.$store.dispatch('uc/logout')
      } 
    },
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/style.css';
@import '~/assets/css/home.css';
@import '~/assets/css/base.css';
.menu-area.active {
  background-color: #022545;
  -webkit-transition: all 0.7s;
  transition: all 0.7s;
}
</style>
