<template>
  <div>
    <!-- 面包屑 -->
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
              <el-option label="用户名" value="name"></el-option>
              <el-option label="用户电话" value="tel"></el-option>
              <!-- <el-option label="状态" value="status"></el-option> -->
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table
        :data="userList"
        border stripe
        style="width: 100%">
        <el-table-column
          type="index">
        </el-table-column>
        <el-table-column
          prop="name"
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="tel"
          label="用户电话">
        </el-table-column>
        <el-table-column
          prop="status"
          :formatter="formatStatus"
          label="状态">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <!-- <el-tooltip content="审核通过" placement="top"> -->
              <el-button type="success" icon="el-icon-check" v-if="scope.row.status===2" size="small" @click="changeState(scope.row)" >
                审核通过
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
        size: 5,
        select: '',
        inputCon: ''
      },
      userList: [],
      total: 0
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    async getUserList () {
      // const namekey = this.Info.select
      const getListArr = { page: this.Info.page, size: this.Info.size }
      getListArr[this.Info.select] = this.Info.inputCon
      // console.log(getListArr)
      const { data: res } = await this.$http.get('/v1/users', { params: getListArr })
      if (res.code !== 200) return this.$message.error('数据获取失败')
      this.userList = res.info.data
      this.total = parseInt(res.info.total)
      this.page = parseInt(res.info.page)
      this.size = parseInt(res.info.size)
    },
    formatStatus (row, column) {
      if (row[column.property] === 1) {
        return '审核通过'
      } else {
        return '未审核'
      }
    },
    handleSizeChange (newSize) {
      this.Info.size = newSize
      this.getUserList()
    },
    handleCurrentChange (newPage) {
      this.Info.page = newPage
      this.getUserList()
    },
    async changeState (row) {
      const { data: res } = await this.$http.put('/v1/users/' + row.id, { status: '1' })
      if (res.code !== 200) return this.$message.error('审核通过失败')
      this.getUserList()
      return this.$message.success('审核通过成功')
    }
  }
}
</script>
<style lang="less" scoped>
.el-select {
  width: 110px;
}
</style>
