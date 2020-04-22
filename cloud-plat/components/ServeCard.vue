<template>
  <div class="col-sm-6">
    <div class="tile center-layer">
      <div class="layer-figure">
        <img src="@/assets/img/product/DevCloud-ProjectMan.png" />
      </div>
      <h2 class="dev-list"><slot name="titel"></slot></h2>

      <div class="layer-text">
          <p class="dev-text">
            <slot name="content"></slot>
          </p>
        <div class="layer-btn">
          <slot name="jump"></slot>
          <!-- <a href="">
            <p>查看详情</p>
          </a> -->
        </div>
      </div>
    </div>
  </div>
</template>
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
    border: 1px;
}

</style>
