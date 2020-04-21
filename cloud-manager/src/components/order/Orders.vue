<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>申请用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>申请用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- <el-row>
        <el-col :span="14">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row> -->
      <el-table
        :data="OrderList"
        stripe
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="状态描述">
                <span>{{ props.row.state_des }}</span>
              </el-form-item>
              <el-form-item label="企业名称">
                <span>{{ props.row.user.nickname }}</span>
              </el-form-item>
              <el-form-item label="企业联系电话">
                <span>{{ props.row.user.tel }}</span>
              </el-form-item>
              <el-form-item label="服务类型">
                <span>{{ props.row.service.typeWord }}</span>
              </el-form-item>
              <el-form-item label="服务中文名称">
                <span>{{ props.row.service.cnName }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          prop="NO"
          label="工单编号">
        </el-table-column>
        <el-table-column
          prop="state"
          :formatter="formatStatus"
          label="工单状态">
        </el-table-column>
        <el-table-column
          prop="creater"
          label="提交人员">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <!-- <el-tooltip content="审核通过" placement="top"> -->
              <el-button type="text" size="mini" icon="el-icon-check" v-if="scope.row.state==2" @click="changeState(scope.row)" >
                审核通过
              </el-button>
              <el-button type="text" size="mini" icon="el-icon-close" v-if="scope.row.state==2" @click="openText(scope.row)" >
                审核不通过
              </el-button>
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
        page: 1,
        size: 5
      },
      OrderList: [],
      total: 0
    }
  },
  created () {
    this.getOrderList()
  },
  methods: {
    async getOrderList () {
      const { data: res } = await this.$http.get('/v1/orders', { params: this.Info })
      if (res.code !== 200) return this.$message.error('数据获取失败')
      this.OrderList = res.info.data
      // console.log(this.OrderList)
      for (let i = 0; i < this.OrderList.length; i++) {
        if (this.OrderList[i].service.type === '1') {
          this.OrderList[i].service.typeWord = 'mysql单机'
        } else if (this.OrderList[i].service.type === '2') {
          this.OrderList[i].service.typeWord = 'mysql集群'
        } else if (this.OrderList[i].service.type === '3') {
          this.OrderList[i].service.typeWord = 'redis服务'
        } else if (this.OrderList[i].service.type === '4') {
          this.OrderList[i].service.typeWord = '用户服务'
        }
      }
      this.total = parseInt(res.info.total)
      this.page = parseInt(res.info.page)
      this.size = parseInt(res.info.size)
    },
    formatStatus (row, column) {
      if (row.state === '1') {
        return '审核通过'
      } else if (row.state === '3') {
        return '审核不通过'
      } else if (row.state === '2') {
        return '未审核'
      } else if (row.state === '4') {
        return '已关闭'
      }
    },
    handleSizeChange (newSize) {
      this.Info.size = newSize
      this.getOrderList()
    },
    handleCurrentChange (newPage) {
      this.Info.page = newPage
      this.getOrderList()
    },
    async changeState (row) {
      const { data: res } = await this.$http.put('/v1/orders/' + row.id, { state: '1' })
      if (res.code !== 200) return this.$message.error('审核通过失败')
      this.getOrderList()
      return this.$message.success('审核通过成功')
    },
    openText (row) {
      // console.log(row)
      this.$prompt('请输入原因', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.changeStateNo(row, value)
        return this.$message.success('审核不通过成功')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    async changeStateNo (row, value) {
      const { data: res } = await this.$http.put('/v1/orders/' + row.id, { state: '3', state_des: value })
      if (res.code !== 200) return this.$message.error('审核通过失败')
      this.getOrderList()
    }
  }
}
</script>
<style scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
