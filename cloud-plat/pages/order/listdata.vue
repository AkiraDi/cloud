<template>
  <section class="container">
    <Head/>
    <Lift/>
    
    <div class="table-constainer">
      <div class="table-list">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <!-- <div style="margin-top: 15px;">
                  <el-input v-model="input3" placeholder="请输入内容" class="input-with-select">
                    <el-select slot="prepend" v-model="select" placeholder="请选择">
                      <el-option label="自用服务" value="1"></el-option>
                      <el-option label="订单号" value="2"></el-option>\
                    </el-select>
                    <el-button slot="append" icon="el-icon-search"></el-button>
                  </el-input>
                </div> -->
                <!-- <el-form-item label="服务图标地址">
                  <span>{{ props.row.iconUrl }}</span>
                </el-form-item>
                <el-form-item label="应用程序包地址">
                  <span>{{ props.row.sdkUrl }}</span>
                </el-form-item>
                <el-form-item label="资质证明地址">
                  <span>{{ props.row.qualityUrl }}</span>
                </el-form-item>
                <el-form-item label="技术文档地址">
                  <span>{{ props.row.docfileUrl }}</span>
                </el-form-item> -->
                <el-form-item label="审核原因">
                  <span>{{ props.row.state_des }}</span>
                </el-form-item>
                <el-form-item label="详情">
                  <span>{{ props.row.detail }}</span>
                </el-form-item>
                <el-form-item label="备注">
                  <span>{{ props.row.remark }}</span>
                </el-form-item>
                <el-form-item label="内容">
                  <span>{{ props.row.content }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="订单编号" prop="orderId"/>
          <el-table-column label="英文名称" prop="enName"/>
          <el-table-column label="中文名称" prop="cnName"/>
          <el-table-column label="创建时间" prop="createTime"/>
          <el-table-column label="服务状态" prop="statusName"/>
          <el-table-column label="工单状态" prop="stateName"/>
          <el-table-column
            fixed="right"
            label="操作"
            width="200">
            <template slot-scope="scope">
              <el-button
                size="mini"
                :disabled="scope.row.state === 1||scope.row.state === 2||scope.row.state === 4"
                @click="handleClickDel(scope.row)"
                >取消申请</el-button>
              <el-button
                size="mini"
                :disabled="scope.row.state === 1||scope.row.state === 2||scope.row.state === 4"
                @click="handleClick(scope.row)"
                >重新申请</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="table-bd clearfix">
        <div class="table-bd_right">
          <el-pagination
            :current-page="pno"
            :page-sizes="[5, 10, 20]"
            :page-size="psize"
            background
            layout="total, sizes, prev, pager,next, jumper"
            :total="tableLength"
            @size-change="handleSizeChange"
            @current-change="handleCurrentPageChange"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Head from '~/components/Head.vue'
import Lift from '~/components/Title.vue'
import { mapState } from 'vuex'
export default {
  components: {
    Head,
    Lift
  },
  data() {
    return {
      currentRow: {},
      filters: {
        svrType: '2'
      },
      pno: 1,
      psize: 5
    }
  },
  computed: {
    ...mapState({
      tableData: state => state.svr.listdata.info,
      tableLength: state => parseInt(state.svr.listdata.total)
    })
  },
  created() {
    this.$store.dispatch('svr/listdata', this.queryparams())
  },
  methods: {
    handleClick(row) {
      this.$router.push({ path: '/order/editorder', query: { id: row.id, mold: row.type } })
    },
    handleClickDel(row) {
      this.$confirm('此操作将取消申请该服务, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(row)
        this.$store.dispatch('svr/del', {
          payload: row.id,
          callback: res => {
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: '取消服务成功!'
              })
            } else {
              this.$message.error(res.msg || '系统异常，请稍后再试', 500)
            }
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })          
      })
    },
    initdata() {
      this.pno = 1
      this.filters = {
        id: '',
        name: ''
      }
      this.$refs.listTable.clearFilter()
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 获取排序参数
    getFiltersParams() {
      const { filters } = this
      const searchParams = {}
      const searchKeys = Object.keys(filters).filter(key => {
        // 这个条件是为了减少不必要的参数，一大堆查询参数看着难受。
        // 如果有特殊条件，比如就是要传空值，那么你就需要单独判断下。
        if (filters[key] === null || filters[key] === '') {
          return false
        }
        return true
      })
      searchKeys.forEach(key => {
        searchParams[key] = filters[key]
      })
      return searchParams
    },
    // 获取检索参数
    getSorterParams() {
      return this.sorter
    },
    // 生成查询条件
    queryparams() {
      const { pno, psize } = this
      return {
        pno,
        psize,
        ...this.getFiltersParams(),
        ...this.getSorterParams()
      }
    },
    // 页码切换
    handleCurrentPageChange(val) {
      this.pno = val
      this.$store.dispatch('svr/listdata', this.queryparams())
    },
    // 每页显示条数变更
    handleSizeChange(val) {
      this.psize = val
      this.pno = 1 // 当前页码重置
      this.$store.dispatch('svr/listdata', this.queryparams())
    },
    // 检索查询
    handleSearch() {
      this.pno = 1 // 当前页码要重置
      this.$store.dispatch('svr/listdata', this.queryparams())
    },
    // 排序
    handleSortChange({ column, prop, order }) {
      // console.log(resp)
      if (prop) {
        this.sorter = {
          sortfield: prop,
          sorttype: order === 'descending' ? 'desc' : 'asc'
        }
      } else {
        this.sorter = {}
      }
      this.$store.dispatch('svr/listdata', this.queryparams())
    },
    // 表头过滤
    handleFilterChange(filters) {
      // console.log(filters)
      Object.keys(filters).forEach(key => {
        this.filters[key] = filters[key].join(',')
      })
      this.pno = 1 // 当前页码重置
      this.$store.dispatch('svr/listdata', this.queryparams())
    },
    handleResetSearch() {
      this.initdata()
      this.$store.dispatch('svr/listdata', this.queryparams())
    },
    // 需要更新state中的name信息，或者直接刷新页面
    handleEditName(newrow) {
      // 暂时刷新
      this.$store.dispatch('svr/listdata', this.queryparams())
    }
  }
}
</script>

<style lang="scss">
.menu-area {
  background-color: #022545;
}
.desktop-panel{
  padding-top: 20px
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 120px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

</style>
