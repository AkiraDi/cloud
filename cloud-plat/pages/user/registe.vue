<template>
  <div>
    <Head/>
    <div>
      <h2 class="titel-style">用户注册</h2>
      <el-divider>
        <i class="el-icon-mobile-phone"></i>
      </el-divider>
    </div>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      class="registe-ruleForm"
    >
      <el-form-item label="登陆名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="企业名称" prop="nickname">
        <el-input v-model="ruleForm.nickname"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" type="password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="tel">
        <el-input v-model="ruleForm.tel"></el-input>
      </el-form-item>
      <el-form-item label="上传资质证明" prop="annexUrl">
        <el-upload
          :action="uploadAction"
          :show-file-list="showFileList"
          list-type="picture-card"
          :file-list="fileList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :limit="1"
          :on-success="handleSuccess"
          :before-upload="beforeUpload"
          :on-exceed="handleExceed"
        >
          <i class="el-icon-plus"></i>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5MB</div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt>
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即注册</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Head from '~/components/Head.vue'
export default {
  components: {
    Head
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        name: '',
        password: '',
        tel: '',
        annexUrl: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入登陆名称', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        password: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }]
      },
      uploadAction: `/api${'/upload/'}`,
      fileList: [],
      showFileList: false,
      dialogImageUrl: '',
      dialogVisible: false,
    }
  },
  created() {
    console.log('url====' + this.url)
    if (this.url) {
      this.fileList.push({ name: '图片名称', url: this.url })
      this.showFileList = true
      console.log(this.fileList)
    }
  },
  methods: {
    submitForm(formName) {
      // console.log(formName)
      this.$refs[formName].validate(valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: '正在注册账号，请稍后！'
          })
          const data = this.formParams()
          console.log('新建' + JSON.stringify(data))
          this.$store.dispatch('uc/register', {
            payload: data,
            callback: res => {
              loading.close()
              console.log(res.code)
              if (res.code === 200) {
                this.$message.success('注册成功', 500)
                this.$router.push('/user/login')
              } else {
                this.$message.error(res.msg || '系统异常，请稍后再试', 500)
              }
            }
          })
        } else {
          this.$message({
            showClose: true,
            message: '提交失败',
            type: 'error'
          })
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 图片上传
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    // 超出上传个数
    handleExceed(file, fileList) {
      this.$message.error('超出上传个数!')
      console.log('超出' + file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleSuccess(res, file, fileList) {
      // filelist[0].url || filelist[0].response.info.url//修改时的数据
      console.log('handleSuccess', res, file, fileList)
      if (res.code === 200) {
        // 成功
        console.log('获取图片地址成功！！' + res.data.url)
        this.showFileList = true // 显示图片
        this.ruleForm.annexUrl = res.data.url
      } else {
        this.$message.error(res.msg || '系统异常，请稍后再试')
      }
      // console.log('handleSuccess', res, file, fileList)
    },
    // 限制用户上传的图片格式和大小
    beforeUpload(file) {
      console.log(file)
      const isJPG = file.type === 'image/png' || file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 5 // 单位为MB
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG、png 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 5MB!')
      }
      return isJPG && isLt2M
    },
    formParams() {
      // return {
      //   title: this.ruleForm.title,
      //   totalNum: this.ruleForm.totalNum,
      // };
      // es6写法
      const {
        name,
        nickname,
        password,
        tel,
        annexUrl
      } = this.ruleForm
      // const posterUrl = this.posterUrl
      return {
        name,
        nickname,
        password,
        tel,
        annexUrl
      }
    },
    jumpPop (row, type) {
      let word = ''
      if (type === 'up') {
        word = '上线'
      } else {
        word = '下线'
      }
      this.$confirm('此操作将' + word + '该服务, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return this.changeState(row, type)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消' + word
        })
      })
    }
  }
}
</script>
<style>
@import url('//unpkg.com/element-ui@2.8.2/lib/theme-chalk/index.css');
.menu-area {
  background-color: #022545;
}
.registe-ruleForm {
  padding-top: 20px;
  height: 200px;
  width: 700px;
  padding-left: 200px;
}
.titel-style {
  padding-top: 90px;
  padding-left: 20px;
  color: #022545;
}
</style>

