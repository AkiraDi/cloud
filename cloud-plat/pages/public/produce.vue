<template>
<div class="bg-white">
  <Head/>
	<div class="developer-toolbag-block">
		<div class="titleBar">
			<h3 class="caption">基础服务介绍</h3>

			<p class="descript">数据库、数据存储等些许服务。</p>
		</div>
		<div class="AGrid-row  tool-package">
			<!-- <div class="col-sm-6 ">
				<div class="tile center-layer">
					<div class="layer-figure">
						<img src="@/assets/img/product/DevCloud-ProjectMan.png">
					</div>
					<h2 class="dev-list">项目管理</h2>

					<div class="layer-text">
						
						<div class="layer-btn">
							<a href="#">
								<p>查看详情</p>
							</a>
						</div>
					</div>
				</div>
			</div>
			
			<div class="col-sm-6 ">
				<div class="tile center-layer">
					<div class="layer-figure">
						<img src="@/assets/img/product/DevCloud-CloudBuild.png">
					</div>
					<h2 class="dev-list">编译构建</h2>

					<div class="layer-text">
						<p class="dev-text">
							提供配置简单的混合语言构建平台，实现编译构建云端化，自定制可视化的自动化交付流水线，支撑企业实现持续交付，提升交付效率。
						</p>
						<div class="layer-btn">
							<a href="#">
								<p>查看详情</p>
							</a>
						</div>
					</div>
				</div>
			</div>
			<div class="col-sm-6 ">
				<div class="tile center-layer">
					<div class="layer-figure">
						<img src="@/assets/img/product/DevCloud-TestMan.png">
					</div>
					<h2 class="dev-list">测试管理</h2>

					<div class="layer-text">
						<p class="dev-text">
							提供一体化测试解决方案，覆盖测试需求、用例管理、测试任务管理、缺陷管理，多维度评估产品质量，帮助您高效管理测试活动，保障产品高质量交付。
						</p>
						<div class="layer-btn">
							<a href="#">
								<p>查看详情</p>
							</a>
						</div>
					</div>
				</div>
			</div> -->
			<ServeCard>
				<h2 slot="titel" class="dev-list">MySQL单机</h2>
				<p slot="content" class="dev-text">是指在一台物理的PC服务器上运行多个MySQL数据库实例。</p>
				<a slot="jump" href="#">
					<p><el-button type="text" @click="open1">查看详情</el-button></p>
				</a>
			</ServeCard>
			<ServeCard>
				<h2 slot="titel" class="dev-list">MySQL集群</h2>
				<p slot="content" class="dev-text">集群（Cluster）技术是指一组相互独立的计算机，利用高速通信网络组成一个计算机系统，每个群集节点（即集群中的每台计算机）都是可以自主运行的一个独立服务器。</p>
				<a slot="jump" href="#">
					<p><el-button type="text" @click="open2">查看详情</el-button></p>
				</a>
			</ServeCard>
			<ServeCard>
				<h2 slot="titel" class="dev-list">Redis集群</h2>
				<p slot="content" class="dev-text">Redis是NoSQL的一种，是一个基于内存的高性能key-value（k-v）数据库</p>
				<a slot="jump" href="#">
					<p><el-button type="text" @click="open3">查看详情</el-button></p>
				</a>
			</ServeCard>
			<ServeCard>
				<h2 slot="titel" class="dev-list">用户服务</h2>
				<p slot="content" class="dev-text">主要体现了一种以客户满意为导向的价值观，它整合及管理在预先设定的最优成本</p>
				<a slot="jump" href="#">
					<p><el-button type="text" @click="open4">查看详情</el-button></p>
				</a>
			</ServeCard>
		</div>
	</div>
	<!-- <div class="developer-toolbag-block">
		<div class="titleBar">
			<h3 class="caption">用户服务介绍</h3>
			<p class="descript">用户相关服务介绍。</p>
		</div>
		<div class="AGrid-row  tool-package">
			<ServeCard>
				<h2 slot="titel" class="dev-list">用户服务</h2>
				<p slot="content" class="dev-text">产品简介</p>
				<a slot="jump" href="#">
					<p><el-button type="text" @click="open4">查看详情</el-button></p>
				</a>
			</ServeCard>
		</div>
	</div> -->
</div>
</template>

<script>
import Head from '~/components/Head.vue'
import ServeCard from '~/components/ServeCard.vue'
export default {
  components: {
    Head,
		ServeCard
  },
	methods: {
      open1() {
				this.$confirm('<i>MySQL单机</i> 是指在一台物理的PC服务器上运行多个MySQL数据库实例。<br/><strong>优点：</strong><br/>1.节省成本，如果可以缩减机器的数量，考虑到节省电力和机房使用的成本，比单机单实例的方案更便宜。<br/>2.充分利用资源，提升利用率，将MySQL实例绑定在不同的CPU节点，不仅提高了CPU利用率，同时解决了MySQL对多核CPU的利用率问题。<br/><br/><div class="apply">'
											+'<a style="color: #409eff;text-decoration: none;" href="/order/addorder?serveName=1">立即申请</a></div>', 'MySQL单机 详情', {
          dangerouslyUseHTMLString: true,
					showConfirmButton:false,
					cancelButtonText:'取消',
        }).catch(() => {
        });
      },
			open2() {
        this.$confirm('<strong><i>MySQL集群</i></strong>  技术是指一组相互独立的计算机，利用高速通信网络组成一个计算机系统，每个群集节点（即集群中的每台计算机）都是可以自主运行的一个独立服务器。这些服务器可以彼此通信，对网络客户机来说就像是形成了一个单一系统，协同起来向用户提供应用程序、系统资源和数据，并以单一系统的模式加以管理<br/><strong>优点：</strong>性能有较高的提升，可用性和可扩展性提高，能处理更多的事物。<br/><strong>特点：</strong><br/>高可用性HAC（Highavailability cluster）<br/>负载均衡集群LBC(load  balance cluster)<br/>高性能HPC（Highperformance cluster）<br/><br/><div class="apply">'
											+'<a style="color: #409eff;text-decoration: none;" href="/order/addorder?serveName=2">立即申请</a></div>', 
											'MySQL集群 详情', {
          dangerouslyUseHTMLString: true,
					showConfirmButton:false,
					cancelButtonText:'取消',
        }).catch(() => {
        });
      },
			open3() {
        this.$confirm('<strong><i>Redis集群</i></strong> 有三种集群模式，分别是：<br/>主从模式，Sentinel模式，Cluster模式<br/><strong>特点：</strong><br/>高可用：当master节点故障时，自动主从切换<br/>高性能：主节点提供读写服务，从节点只读服务，提高系统吞吐量可<br/>扩展性：集群的数据分片存储，主节点间数据各不同，各自维护对应数据，可以为集群添加节点进行扩容，也可以下线部分节点进行水平缩容<br/><br/><div class="apply">'
											+'<a style="color: #409eff;text-decoration: none;" href="/order/addorder?serveName=3">立即申请</a></div>',
											'Redis集群 详情', {
          dangerouslyUseHTMLString: true,
					showConfirmButton:false,
					cancelButtonText:'取消',
        }).catch(() => {
        });
      },
			open4() {
        this.$confirm('<strong><i>用户服务</i></strong>是标注完胜, 速度更快，高保真的交互原型，权限管理，支持企业级部署<br/><br/><div class="apply">'
											+'<a style="color: #409eff;text-decoration: none;" href="/order/addorder?serveName=4">立即申请</a></div>', 
											'用户服务 详情', {
          dangerouslyUseHTMLString: true,
					showConfirmButton:false,
					cancelButtonText:'取消',
        }).catch(() => {
        });
      },
    }
}
</script>


<style lang="scss" scoped>
@import '~/assets/css/produce.css';

.menu-area {
  background-color: #022545;
}

.caption{
  padding-top: 30px;
}

.apply{
	color: #409eff;
	text-decoration: none;
	font-size: 1.2em;
}

</style>
