<template>
  <div class="login-page-container">
    <div class="login-body">
      <el-row class="inner" type="flex" align="middle">
        <el-col :span="14">
          <div class="login-body-txt-box">
            <h1 class="box-title">
              云与企业深度融合，创造数字化未来
            </h1>
            <ul>
              <li> 完整的云计算基础体系</li>
              <li> 多种行业定制解决方案</li>
              <li> 智能云安全防护架构</li>
              <li> 高效的大数据分析和处理能力</li>
              <li> 人工智能向全局智能持续演进</li>
            </ul>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="panel-login">
            <div class="panel-title">
              <span>密码登录</span>
              <!-- <el-button style="float: right; padding: 3px 0" type="text">注册</el-button> -->
            </div>
            <div class="form-user-sign">
              <el-form
                ref="loginform"
                :model="loginform"
                :rules="rules"
                size="middle"
              >
                <!-- 手机号 或  11位手机号 或  -->
                <el-form-item prop="loginName">
                  <el-input v-model="loginform.loginName" placeholder="请输入账号">
                    <i slot="prepend" class="el-icon-user" />
                  </el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input v-model="loginform.password" type="password" placeholder="请输入密码">
                    <i slot="prepend" class="el-icon-key" />
                  </el-input>
                </el-form-item>
                <div><a href="/user/registe" class="registe-user">注册账号</a></div>
                <el-button type="primary" size="middle" class="submitBtn" style="width:100%" @click="handleLogin">
                  登录
                </el-button>
              </el-form>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import Head from '~/components/Head'
// eslint-disable-next-line no-unused-vars
import * as axios from 'axios'
export default {
  data() {
    return {
      loginform: {
        loginName: '',
        password: ''
      },
      rules: {
        loginName: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      components: {
        Head
      }
    }
  },

  methods: {
    handleLogin() {
      const self = this
      this.$refs.loginform.validate((valid, formdata) => {
        if (!valid) {
          return false
        }
        self.$store.dispatch('uc/login', {
          payload: {
            name: self.loginform.loginName,
            password: self.loginform.password
          },
          callback(loginresp) {
            console.log(loginresp)
            if (loginresp.code === 200) {
              self.$router.push('/')
            } else {
              self.$message.error(loginresp.info)
            }
          }
        })
      })

      // this.$router.push('/crmg')
    }
  }
}
</script>

<style lang="scss" scoped>
.registe-user{
  font-size: 12px;
  color:#409eff;
  text-decoration:none;
}
html, body {
    height: 100%;
    margin: 0px;
    padding: 0px;
}
.login-body {
  width: 100%;
  height: 920px;
  background-image: url(http://gw.alicdn.com/tfs/TB1ittHRFXXXXcSXFXXXXXXXXXX-2880-1280.jpg);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  background-color: #1f2325;
  .inner {
    width: 1140px;
    margin: 0 auto;
    height: 70%;
  }

  .login-body-txt-box {
    // position: absolute;
    // left: 0;
    color: #fff;
    text-align: left;
    // top: 100px;
    h1 {
      font-size: 30px;
      color: #ffffff;
      line-height: 36px;
      margin-bottom: 19px;
      font-weight: bold;
    }
    ul {
      list-style: none;
      padding: 0;

      li {
        font-size: 14px;
        color: #ffffff;
        letter-spacing: 0.47px;
        line-height: 30px;
      }
    }
  }

  // 登录注册页面
  .panel-login {
    margin: 0 auto;
    width: 300px;
    background: #fff;
    padding: 20px 24px;
    .panel-title {
      font-weight: 400;
      font-size: 18px;
      color: #444;
      padding-bottom: 20px;
    }
    .form-user-sign {
      background-color: #fff;
      .criconfont {
        font-size: 18px;
        // font-weight: bold;
      }
      .submitBtn {
        margin-top: 10px;
      }
      .more-login-area {
        margin-top: 10px;
        margin-bottom: 25px;
        border-bottom: 1px solid #eee;
        color: #777;
        text-align: center;
        position: relative;
      }

      .more-login-area .more-login-words {
        position: absolute;
        left: calc(50% - 52px);
        top: -10px;
        padding: 0 10px;
        background: #fff;
        font-size: 14px;
      }

      .el-form--label-top .el-form-item__label {
        padding-bottom: 0;
        font-weight: bold;
      }
    }
  }
}
</style>
