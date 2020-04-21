<template>
  <div class="login_con">
    <div class="login_title">号百控股云平台审核管理系统</div>
    <div class="login_box">
      <div class="aratar_box">
        <img src="../assets/logo.png" alt />
      </div>
      <el-form
        ref="loginformRef"
        :model="loginform"
        :rules="loginformRules"
        label-width="0px"
        class="login_form"
      >
        <el-form-item prop="name">
          <el-input v-model="loginform.name" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="passWord">
          <el-input
            v-model="loginform.passWord"
            prefix-icon="iconfont icon-3702mima"
            type="passWord"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登陆</el-button>
          <el-button type="info" @click="resetForm('loginformRef')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginform: {
        name: '',
        passWord: ''
      },
      loginformRules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    login () {
      this.$refs.loginformRef.validate(async valid => {
        if (!valid) {
          return ''
        }
        // 调用接口
        const res = await this.$http.post('/v1/users/login', this.loginform).catch(function (error) {
          if (error.response) {
            // console.log(error.response.data.code)
            return alert(error.response.data.msg + ',' + error.response.data.info)
          }
        })
        if (res) {
          this.$message.success('登陆成功')
          window.sessionStorage.setItem('token', this.loginform.name) // 储存返回token
          this.$router.push('/home')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_con {
  background-color: #2b4b6b;
  height: 100%;
}
.login_title{
  font-size: 3em;
  font-family: "Hiragino Sans GB";
  color: #ddd;
  padding-top: 9%;
  text-align: center;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .aratar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
