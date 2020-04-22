<template>
  <section id="aui-list">
    <Head/>
    <div class="aui-container">
      <div class="aui-docs-wrap clearfix">
        <div class="aui-docs-left clearfix">
          <div class="aui-docs-content">
            <h2>帮助文档</h2>
            <div class="aui-docs-section">
              <el-card class="box-card">
                <div
                  v-for="tableDatas in tableData"
                  :key="tableDatas.id"
                  class="text item"
                >
                  <a :href="tableDatas.url" class="ramark">{{tableDatas.name}}
                    <p >{{tableDatas.remark}}</p>
                  </a>
                  <el-divider></el-divider>
                </div>
              </el-card>
            </div>
          </div>
        </div>
        <div class="aui-docs-right">
          <!-- <div class="aui-docs-widget">
            <h3>被推荐的文档</h3>
            <ul>
              <li v-for="(item,index) in tableData.slice(0,2)" :key="index" 
                  class="text item">

                <a :href="item.url">{{item.name}}</a>
              </li>
            </ul>
          </div> -->
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import Head from '~/components/Head.vue'
import { mapState } from 'vuex'
export default {
  components: {
    Head
  },
  computed: {
    ...mapState({
      tableData: state => state.pub.listdata
    })
  },
  created() {
    this.$store.dispatch('pub/listdata')
  },
}
</script>
<style lang="scss" scoped>
@import '~/assets/css/home.css';
@import '~/assets/css/base.css';
.ramark p{
  text-decoration: none;
  color: #999
}
.menu-area {
  background-color: #022545;
}
.aui-docs-content {
  padding-top: 20px;
}
.text {
	font-size: 14px;
}
.item {
	margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
	display: table;
	content: "";
}
.clearfix:after {
	clear: both
}

.box-card {
	width: 480px;
}
</style>
