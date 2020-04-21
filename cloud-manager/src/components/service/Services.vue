<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>申请用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>申请用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col :span="14">
          <el-input placeholder="请输入内容" v-model="Info.inputCon" class="input-with-select">
            <el-select v-model="Info.select" slot="prepend" placeholder="请选择">
              <el-option label="中文服务名" value="cnName"></el-option>
              <el-option label="服务英文名" value="enName"></el-option>
              <el-option label="申请人" value="name"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="getServeList"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table
        :data="serveList"
        stripe
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="服务英文名">
                <span>{{ props.row.enName }}</span>
              </el-form-item>
              <!-- <el-form-item label="服务图标地址">
                <span>{{ props.row.iconUrl }}</span>
              </el-form-item>
              <el-form-item label="应用程序包地址">
                <span>{{ props.row.sdkUrl }}</span>
              </el-form-item>
              <el-form-item label="技术文档地址">
                <span>{{ props.row.docfileUrl }}</span>
              </el-form-item>
              <el-form-item label="资质文件地址">
                <span>{{ props.row.qualityUrl }}</span>
              </el-form-item> -->
              <el-form-item label="服务详细说明">
                <span>{{ props.row.remark }}</span>
              </el-form-item>
              <el-form-item label="服务具体内容">
                <span>{{ props.row.content }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          prop="cnName"
          label="中文服务名">
        </el-table-column>
        <el-table-column
          prop="orderId"
          label="工单ID">
        </el-table-column>
        <el-table-column
          prop="status"
          :formatter="formatStatus"
          label="服务状态">
        </el-table-column>
        <el-table-column
          prop="svrType"
          :formatter="formatType"
          label="服务类型">
        </el-table-column>
        <el-table-column
          prop="name"
          :formatter="formatName"
          label="服务申请人">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="服务申请时间">
        </el-table-column>
        <el-table-column
          label="操作"
          width="160">
          <template slot-scope="scope">
            <!-- <el-tooltip content="审核通过" placement="top"> -->
              <el-button type="success" icon="el-icon-check" v-if="(scope.row.status==='2' && scope.row.orserState==='1') || (scope.row.status==='3' && scope.row.orserState==='1')" size="small" @click="changeStatePop(scope.row,'up')" >
                服务上线
              </el-button>
              <el-button type="warning" icon="el-icon-bottom" v-if="scope.row.status==='1' && scope.row.orserState==='1'" size="small" @click="changeStatePop(scope.row,'down')" >
                服务下线
              </el-button>
              <span v-if="scope.row.orserState!=='1'" style="color:red">订单未通过审核，无法操作</span>
            <!-- </el-tooltip> -->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="Info.page"
        :page-sizes="[5, 10, 20]"
        :page-size="Info.size"
        layout="total, sizes, prev, pager, next"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>
<script>
// import axios from 'axios'
export default {
  data () {
    return {
      Info: {
        name: '',
        tel: '',
        status: '',
        page: 1,
        size: 5
      },
      serveList: [],
      total: 0
    }
  },
  created () {
    this.getServeList()
  },
  methods: {
    async getServeList () {
      const getListArr = { page: this.Info.page, size: this.Info.size }
      getListArr[this.Info.select] = this.Info.inputCon
      const { data: res } = await this.$http.get('/v1/servers', { params: getListArr })
      this.serveList = res.info.data
      // console.log(this.serveList)
      if (res.code !== 200) return this.$message.error('数据获取失败')
      for (let i = 0; i < this.serveList.length; i++) {
        this.serveList[i].orserState = this.serveList[i].order.state
      }
      this.total = parseInt(res.info.total)
      this.page = parseInt(res.info.page)
      this.size = parseInt(res.info.size)
    },
    formatStatus (row, column) {
      if (row.status === '1') {
        return '已上线'
      } else if (row.status === '2') {
        return '未上线'
      } else if (row.status === '3') {
        return '已下线'
      } else if (row.status === '4') {
        return '已关闭'
      }
    },
    formatType (row, column) {
      if (row.svrType === 1) {
        return '通用'
      } else {
        return '商户自用'
      }
    },
    formatName (row, column) {
      const res = row.user.name
      if (row.user.nickname) {
        return res + '(' + row.user.nickname + ')'
      }
      return res
    },
    handleSizeChange (newSize) {
      this.Info.size = newSize
      this.getServeList()
    },
    handleCurrentChange (newPage) {
      this.Info.page = newPage
      this.getServeList()
    },
    async changeState (row, type) {
      let status = '3' // 状态下线
      if (type === 'up') {
        status = '1'
      }
      const { data: res } = await this.$http.put('/v1/servers/' + row.id, { status: status })
      if (res.code !== 200) return this.$message.error('审核失败')
      return this.getServeList()
      // return this.$message.success('审核成功')
    },
    changeStatePop (row, type) {
      // console.log(row.order.state)
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
        this.changeState(row, type)
        this.$message({
          type: 'success',
          message: '操作成功!'
        })
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
<style >
  .el-select {
    width: 130px;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 150px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
