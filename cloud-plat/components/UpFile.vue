<template>
  <div>
    <!-- :action="uploadUrl" -->
    <el-upload
      class="upload-demo"
      :action="uploadAction"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      list-type="picture"
      :on-success="handleSuccess"
      :on-exceed="handleExceed"
      >
      
      <el-button size="small" type="primary"><i class="el-icon-plus" />点击上传</el-button>
      <!-- <div slot="tip" class="el-upload__tip">
        只能上传jpg/png文件，且不超过5MB
      </div> -->
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    url: { type: String, default: null }
    // submit: { type: Function, default: () => {} }
  },
  data() {
    return {
      uploadAction: `/api${'/upload/'}`,
      fileList: [],
      showFileList: false,
      dialogImageUrl: '',
      dialogVisible: false,
    }
  },
  created() {
    // console.log('url====' + this.url)
    if (this.url) {
      this.fileList.push({ name: '图片名称', url: this.url })
      this.showFileList = true
      // console.log(this.fileList)
    }
  },
  methods: {
    handleRemove(file, fileList) {
      // console.log(file, fileList)
    },
    // 超出上传个数
    handleExceed(file, fileList) {
      this.$message.error('超出上传个数!')
      // console.log('超出' + file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleSuccess(res, file, fileList) {
      // filelist[0].url || filelist[0].response.info.url//修改时的数据
      if (res.code === 200) {
        // 成功
        // console.log('获取图片地址成功！！' + res.data.url)
        this.showFileList = true // 显示图片
        this.$emit('sendPosterUrl', res.data.url) // 传入url
      } else {
        this.$message.error(res.msg || '系统异常，请稍后再试')
      }
      // console.log('handleSuccess', res, file, fileList)
    },
  }
}
</script>
