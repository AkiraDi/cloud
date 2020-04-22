<template>
  <div>
    <Head/>
    <div class="titel-style">
      <h1>服务申请</h1>
    </div>
    <el-divider content-position="center">
      <p v-if='mold==1' >MySQL单机</p>
      <p v-if='mold==2' >MySQL集群</p>
      <p v-if='mold==3' >Redis集群</p>
      <p v-if='mold==4' >用户</p>
    </el-divider>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="110px"
      class="registe-ruleForm"
    >
      <el-form-item v-show='mold==1 || mold==2 || mold==3 || mold==4' label="租户名称" prop="userId" >
        <el-input 
          v-model="ruleForm.userId" 
          :disabled="true"
          :rows="1"></el-input>
      </el-form-item>
      <el-form-item v-show='mold==1 || mold==2' label="数据库名称" prop="enName" >
        <el-input 
          v-model="ruleForm.enName"
          :rows="2"></el-input>
      </el-form-item>
      <el-form-item v-show='mold==4' label="服务英文名称" prop="enName" >
        <el-input 
          v-model="ruleForm.enName"
          :rows="2"></el-input>
      </el-form-item>
      <el-form-item v-show='mold==1 || mold==2 || mold==4' label="中文名称" prop="cnName" >
        <el-input 
          v-model="ruleForm.cnName"
          :rows="2"></el-input>
      </el-form-item>
      <el-form-item label="服务类型" prop="svrType" >
        <el-radio-group v-model="ruleForm.svrType">
          <el-radio :label="1">通用</el-radio>
          <el-radio :label="2">自用</el-radio>
        </el-radio-group>
      </el-form-item>  
      <el-form-item v-show='mold==4' label="服务详情介绍" prop="remark" >
        <el-input 
          v-model="ruleForm.remark"
          type="textarea"
          :rows="4"></el-input>
      </el-form-item>

      <el-form-item v-show='mold==4' ref="rulePoster" label="上传服务图标" prop="iconUrl">
        <Up-file :url.sync="ruleForm.iconUrl" @sendPosterUrl="handleiconUrl" /><span style="color:red">请上传图片格式</span>
      </el-form-item>
      <el-form-item v-show='mold==4' ref="rulePoster" label="上传应用程序" prop="sdkUrl">
        <Up-file :url.sync="ruleForm.sdkUrl" @sendPosterUrl="handlesdkUrl" /><span style="color:red">多个文件请打包zip文件上传</span>
      </el-form-item>
      <el-form-item v-show='mold==4' ref="rulePoster" label="上传技术文档" prop="docfileUrl">
        <Up-file :url.sync="ruleForm.docfileUrl" @sendPosterUrl="handledocfileUrl" /><span style="color:red">多个文件请打包zip文件上传</span>
      </el-form-item>
      <el-form-item v-show='mold==4' ref="rulePoster" label="上传资质文件" prop="qualityUrl">
        <Up-file :url.sync="ruleForm.qualityUrl" @sendPosterUrl="handlequalityUrl" /><span style="color:red">多个文件请打包zip文件上传</span>
      </el-form-item>

      <el-divider></el-divider>
      <el-form-item v-show='mold==2 || mold==3 || mold==4' label="数量" prop="COUNT" >
        <el-input 
          v-model.number="ruleForm.COUNT"
          :rows="2">
          <template slot="append">个</template>
        </el-input>
      </el-form-item>
      <el-form-item label="CPU" prop="CPU" >
        <el-input 
          v-model.number="ruleForm.CPU"
          :rows="2">
          <template slot="append">m</template>
        </el-input>
        单位为m,1m为“千分之一核心”
      </el-form-item>
      <el-form-item label="内存" prop="RAM" >
        <el-input 
          v-model.number="ruleForm.RAM"
          :rows="2">
          <template slot="append">Mi</template>
        </el-input>
        单位为Mi，1Mi相当于1M
      </el-form-item>
      <el-form-item label="申请时长" prop="TIME" >
        <el-input 
          v-model.number="ruleForm.TIME"
          :rows="2">
          <template slot="append">月</template>
        </el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type" hidden>
        <el-input 
          v-model.number="ruleForm.type"
          :rows="2">
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即申请</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Head from '~/components/Head.vue';
import UpFile from '~/components/UpFile.vue';
import { clearUserInfo,getUserInfo } from '@/utils/authority'
// import utils from '~/utils/urlGet'
export default {
  components: {
    Head,
    UpFile
  },
  data() {
    const username = JSON.parse(getUserInfo())
    if(username=== null){
      clearUserInfo()
      this.$router.push('/user/login')
    }
    const mold = getUrlKey('serveName')
    const nullURL = getChineseName(mold)
    const nullName = getName(mold)
    const checkNum = (rule, value, callback) => {
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'));
        }
        callback()
      }, 500);
    };
    return {
      mold:mold,
      ruleForm: {
        iconUrl:nullURL,
        sdkUrl:nullURL,
        docfileUrl:nullURL,
        qualityUrl:nullURL,
        svrType:2,
        enName:nullName,
        cnName:nullName,
        remark:nullURL,
        COUNT:1,
        CPU:'',
        RAM:'',
        TIME:'',
        userId:username.name,
        type:mold
      },
      rules: {
        enName: [
            { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        cnName: [
            { required: true, message: '请输入中文名称', trigger: 'blur' }
        ],
        iconUrl: [
            { required: true, message: '请上传图片', trigger: 'blur' }
        ],
        sdkUrl: [
            { required: true, message: '请上传程序', trigger: 'blur' }
        ],
        docfileUrl: [
            { required: true, message: '请上传文档', trigger: 'blur' }
        ],
        qualityUrl: [
            { required: true, message: '请上传文档', trigger: 'blur' }
        ],
        COUNT: [
            { required: true, message: '请输入数量', trigger: 'blur' },
            { validator: checkNum, trigger: 'blur' }
        ],
        CPU: [
            { required: true, message: '请输入CPU需求', trigger: 'blur' },
            { validator: checkNum, trigger: 'blur' }
        ],
        RAM: [
            { required: true, message: '请输入RAM需求', trigger: 'blur' },
            { validator: checkNum, trigger: 'blur' }
        ],
        TIME: [
            { required: true, message: '请输入申请时长', trigger: 'blur' },
            { validator: checkNum, trigger: 'blur' }
        ],
      }
    }
  },
  created() {
    if (this.url) {
      this.fileList.push({ name: '图片名称', url: this.url })
      this.showFileList = true
    }
  },
  methods: {
    submitForm(formName) {
      // console.log(formName)
      console.log(this.formParams())
      this.$refs[formName].validate(valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: '正在提交申请，请稍后！'
          })
          const data = this.formParams()
          // console.log('新建' + JSON.stringify(data))
          this.$store.dispatch('svr/register', {
            payload: data,
            callback: res => {
              loading.close()
              console.log(res)
              if (res.code === 200) {
                this.$message.success('申请成功', 500)
                this.$router.push('/order/listdata')
              } else {
                this.$message.error(res.msg || '系统异常，请稍后再试', 500)
                this.$router.push('/order/listdata')
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
    formParams() {
      // return {
      //   title: this.ruleForm.title,
      //   totalNum: this.ruleForm.totalNum,
      // };
      // es6写法
      const {
        iconUrl,
        sdkUrl,
        docfileUrl,
        qualityUrl,
        enName,
        cnName,
        remark,
        svrType,
        COUNT,
        CPU,
        RAM,
        TIME,
        type
      } = this.ruleForm
      // const posterUrl = this.posterUrl
      return {
        iconUrl,
        sdkUrl,
        docfileUrl,
        qualityUrl,
        enName,
        cnName,
        remark,
        svrType,
        COUNT,
        CPU,
        RAM,
        TIME,
        type
      }
    },
    handleiconUrl(url) {
      console.log('获取图片地址成功！！' + url)
      if (url) {
        this.$refs.rulePoster.clearValidate()
      }
      this.ruleForm.iconUrl = url
    },
    handlesdkUrl(url) {
      console.log('获取图片地址成功！！' + url)
      if (url) {
        this.$refs.rulePoster.clearValidate()
      }
      this.ruleForm.sdkUrl = url
    },
    handledocfileUrl(url) {
      console.log('获取图片地址成功！！' + url)
      if (url) {
        this.$refs.rulePoster.clearValidate()
      }
      this.ruleForm.docfileUrl = url
    },
    handlequalityUrl(url) {
      console.log('获取图片地址成功！！' + url)
      if (url) {
        this.$refs.rulePoster.clearValidate()
      }
      this.ruleForm.qualityUrl = url
    }
  }
}
function getUrlKey(name) { 
  return (
    decodeURIComponent(
      (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(
        location.href
      ) || ['', ''])[1].replace(/\+/g, '%20')
    ) || null
  );
}

function getChineseName(param){
  if(param === '1'){
    return 'MySQL单机服务'
  }else if(param === '2'){
    return 'MySQL集群服务'
  }else if(param === '3'){
    return 'Redis集群服务'
  }else if(param === '4'){
    return ''
  }
}

function getName(param){
  if(param === '3'){
    return 'Redis集群服务'
  }else{
    return ''
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
  width: 700px;
  padding-left: 200px;
}
.titel-style {
  padding-top: 80px;
  padding-left: 250px;
  color: #022545;
  font-family:'Hiragino Sans GB';
}
.el-divider--horizontal{
  margin: 20px 0;
}
</style>

