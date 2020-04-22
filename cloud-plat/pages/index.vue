<template>
  <section class="container">
    <Head/>
    <div id="banner_tabs" class="flexslider">
      <ul class="slides">
        <li class="active">
          <a title href="">
            <img class ='headimg'
              alt
              src="@/assets/images/alpha.png"
            >
          </a>
        </li>
      </ul>
      <!-- <ul class="flex-direction-nav">
        <li>
          <a class="flex-prev" href="javascript:;">Previous</a>
        </li>
        <li>
          <a class="flex-next" href="javascript:;">Next</a>
        </li>
      </ul> -->
    </div>

    <div style="width:1140px;margin:0 auto;padding:20px 0;">
      <div style="text-align:center;font-size:30px;line-height:80px;color:#555;">我们的优势</div>
      <img
        src="http://pic01.v.vnet.mobi/image/tmpl/2019/02/21/7007990181.png "
        alt
        style="width:100%"
      >
    </div>

    <section id="aui-content">
      <div class="aui-container">
        <div class="aui-firstBox-title">
          <h1>为企业提供云计算的平台</h1>
          <p>提供最新的云计算应用工能实时更新您的服务云计算的平台</p>
        </div>
        <div class="aui-firstBox-list clearfix">
          <div class="aui-firstBox-list-service">
            <div class="aui-service-img"><img src="@/assets/img/icon/icon-s1.png" alt=""></div>
            <h2>变现服务</h2>
            <p>应用为中心，简化应用管理，提升运维效率，支持负载均衡、弹性伸缩、高可靠等。</p>
          </div>
          <div class="aui-firstBox-list-service">
            <div class="aui-service-img"><img src="@/assets/img/icon/icon-s2.png" alt=""></div>
            <h2>应用转化</h2>
            <p>应用为中心，简化应用管理，提升运维效率，支持负载均衡、弹性伸缩、高可靠等。</p>
          </div>
          <div class="aui-firstBox-list-service">
            <div class="aui-service-img"><img src="@/assets/img/icon/icon-s3.png" alt=""></div>
            <h2>自动运维</h2>
            <p>应用为中心，简化应用管理，提升运维效率，支持负载均衡、弹性伸缩、高可靠等。</p>
          </div>
          <div class="aui-firstBox-list-service">
            <div class="aui-service-img"><img src="@/assets/img/icon/icon-s4.png" alt=""></div>
            <h2>一键部署</h2>
            <p>应用为中心，简化应用管理，提升运维效率，支持负载均衡、弹性伸缩、高可靠等。</p>
          </div>
          <div class="aui-firstBox-list-service">
            <div class="aui-service-img"><img src="@/assets/img/icon/icon-s5.png" alt=""></div>
            <h2>智能管理</h2>
            <p>应用为中心，简化应用管理，提升运维效率，支持负载均衡、弹性伸缩、高可靠等。</p>
          </div>
          <div class="aui-firstBox-list-service">
            <div class="aui-service-img"><img src="@/assets/img/icon/icon-s6.png" alt=""></div>
            <h2>资源丰富</h2>
            <p>应用为中心，简化应用管理，提升运维效率，支持负载均衡、弹性伸缩、高可靠等。</p>
          </div>
        </div>
      </div>
    </section>

    <section id="aui-web">
      <div class="aui-firstBox-title">
        <h1>逾十个行业已在控股云计算平台</h1>
        <p>助力企业通过控股云计算实现互联网</p>
      </div>
      <div class="web clearfix">
        <div class="con clearfix">
          <ul>
            <li class="" @mouseover="changeActive($event)" @mouseout="removeActive($event)">
              <img src="@/assets/images/class1.jpg"/>
              <div class="txt">
                <h3 style="color: fff">互联网</h3>
                <p>让互联网在路上走得更远</p>
              </div>
            </li>
            <li class="" @mouseover="changeActive($event)" @mouseout="removeActive($event)">
              <img src="@/assets/images/class2.jpg"/>
              <div class="txt">
                <h3>教育行业</h3>
                <p>提供各个教育下的解决方案</p>
              </div>
            </li>
            <li class="" @mouseover="changeActive($event)" @mouseout="removeActive($event)">
              <img src="@/assets/images/class3.jpg"/>
              <div class="txt">
                <h3>金融行业</h3>
                <p>为金融提供云计算</p>
              </div>
            </li>
            <li class="" @mouseover="changeActive($event)" @mouseout="removeActive($event)">
              <img src="@/assets/images/class4.jpg"/>
              <div class="txt">
                <h3>汽车行业</h3>
                <p>为汽车行业提供一站式服务</p>
              </div>
            </li>
            <li class="" @mouseover="changeActive($event)" @mouseout="removeActive($event)">
              <img src="@/assets/images/class5.jpg"/>
              <div class="txt">
                <h3>人工智能</h3>
                <p>AI的时代来了</p>
              </div>
            </li>
            <li class="" @mouseover="changeActive($event)" @mouseout="removeActive($event)">
              <img src="@/assets/images/class6.jpg"/>
              <div class="txt">
                <h3>移动互联</h3>
                <p>提供移动app</p>
              </div>
            </li>
            <li class="" @mouseover="changeActive($event)" @mouseout="removeActive($event)">
              <img src="@/assets/images/class7.jpg"/>
              <div class="txt">
                <h3>新能源</h3>
                <p>新能源的趋势让世界更美好</p>
              </div>
            </li>
            <li class="" @mouseover="changeActive($event)" @mouseout="removeActive($event)">
              <img src="@/assets/images/class8.jpg"/>
              <div class="txt">
                <h3>物联网</h3>
                <p>现在是物联网的时代</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <section id="aui-footer">
			<div class="aui-footer">
				<div class="aui-container clearfix">
					<div class="aui-footer-list">
						<div class="aui-footer-title">产品目录</div>
						<ul>
							<li><a href="#" title="" target="_blank">私有云计算</a></li>
							<li><a href="#" title="" target="_blank">魔盒服务器</a></li>
							<li><a href="#" title="" target="_blank">镜像市场</a></li>
							<li><a href="#" title="" target="_blank">解决方案</a></li>
							<li><a href="#" title="" target="_blank">客户案例</a></li>
						</ul>
					</div>
					<div class="aui-footer-list">
						<div class="aui-footer-title">价格服务</div>
						<ul>
							<li><a href="#" title="" target="_blank">产品价格</a></li>
							<li><a href="#" title="" target="_blank">产品服务</a></li>
							<li><a href="#" title="" target="_blank">服务条款</a></li>
							<li><a href="#" title="" target="_blank">常见问题</a></li>
						</ul>
					</div>
					<div class="aui-footer-list">
						<div class="aui-footer-title">帮助文档</div>
						<ul>
							<li><a href="#" title="" target="_blank">帮助文档</a></li>
							<li><a href="#" title="" target="_blank">社区问答</a></li>
							<li><a href="#" title="" target="_blank">技术博客</a></li>
							<li><a href="#" title="" target="_blank">开发平台</a></li>
							<li><a href="#" title="" target="_blank">API接口</a></li>
						</ul>
					</div>
					<div class="aui-footer-list">
						<div class="aui-footer-title">关于我们</div>
						<ul>
							<li><a href="#" title="" target="_blank">关于我们</a></li>
							<li><a href="#" title="" target="_blank">合作伙伴</a></li>
							<li><a href="#" title="" target="_blank">加入我们</a></li>
							<li><a href="#" title="" target="_blank">联系我们</a></li>
							<li><a href="#" title="" target="_blank">合作事宜</a></li>
						</ul>
					</div>
					<div class="aui-footer-list">
						<div class="aui-footer-title">联系我们</div>
						<ul>
							<li><a href="#" title="" target="_blank">业务咨询</a></li>
							<li><a href="#" title="" target="_blank">渠道合作</a></li>
							<li><a href="#" title="" target="_blank">市场合作</a></li>
							<li><a href="#" title="" target="_blank">联系我们</a></li>
							<li><a href="#" title="" target="_blank">合作事宜</a></li>
						</ul>
					</div>
          <div class="aui-footer-list-right">
						<div class="aui-footer-code"><img src="@/assets/img/icon/foot-wx.jpg" alt=""></div>
						<div class="aui-footer-ewm">扫一扫关注我们</div>
					</div>
          <div class="aui-footer-info">
            <div class="aui-container">
              <div class="aui-footer-copy">
                <p>版权所有：控股云 © 2019 天翼视讯传媒有限公司 <a href="" target="_blank" title=""></a></p>
              </div>
            </div>
          </div>
				</div>
        
			</div>
		</section>
  </section>


</template>

<script>
import Head from '~/components/Head.vue'

export default {
  components: {
    Head
  },
  methods:{
    changeActive($event){
            $event.currentTarget.className="onimg";
    },
    removeActive($event){
            $event.currentTarget.className="";
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/home.css';
@import '~/assets/css/base.css';

.onimg .txt h3{
  color: #fff;
  padding-top: 60px;
}
.onimg .txt{
  height: 198px;
}
.headimg{
  width : "1920";
  height : "482";
  background : #fff
  url(~assets/images/banner1.jpg) 
  no-repeat center; 
  background-size:cover
}
.index-banner {
  overflow: hidden;
  width: 100%;
  position: relative;
  height: 420px;
  .image-layer {
    width: 100%;
    height: 400px;
    background: #171717
      url(//img.alicdn.com/tfs/TB1gHyPBkPoK1RjSZKbXXX1IXXa-3840-800.png)
      no-repeat top;
    background-size: 1920px 400px;
    padding-top: 100px;

    .dn-container {
      width: 1140px;
      margin: 0 auto;
      .st {
        font-size: 24px;
        color: #fff;
        letter-spacing: 8px;
        text-align: center;
        height: 33px;
        line-height: 33px;
        margin-bottom: 3px;
      }
      .tit {
        height: 73px;
        line-height: 73px;
        font-size: 52px;
        color: #fff;
        text-align: center;
        margin-bottom: 27px;
      }
      .linkarea {
        overflow: hidden;
        text-align: center;
        margin-bottom: 29px;

        .golink1 {
          display: inline-block;
          width: 140px;
          height: 40px;
          line-height: 40px;
          background-image: linear-gradient(-90deg, #0375f4, #0396eb);
          text-align: center;
          font-size: 16px;
          color: #fff;
          margin: 0 9px;
        }
        .golink2 {
          display: inline-block;
          width: 140px;
          height: 40px;
          line-height: 40px;
          border: 1px solid #fff;
          text-align: center;
          font-size: 16px;
          color: #fff;
          margin: 0 9px;
        }
      }
    }
  }
}
</style>
