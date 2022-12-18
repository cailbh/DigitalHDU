<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->

<template>
	<div id="navBar">
    <div class="borderInner">
		</div>
    <div class="navShadow">
      </div>
    <div id="navBarBody" class="panel">
      <div id="livingRouterLink" class="routerLinkBut" @click="cli_Teaching" >主页</div>
      <div id="livingRouterLink" class="routerLinkBut" @click="cli_Living" >宿舍管理</div>
      <div id="historyMuseumRouterLink" class="routerLinkBut">校史馆</div>
      <div id="libraryRouterLink" class="routerLinkBut" @click="cli_Library">图书馆</div>
      <div id="canteenRouterLink" class="routerLinkBut">食堂管理</div>
      <div id="runRouterLink" class="routerLinkBut">阳光长跑</div>
    </div>
  </div>
</template>
  
  <script>
// import Monitor from "../../components/Monitor/index.vue"
export default {
  components: {},
  // components: { button1 },
  /* eslint-disable no-unused-vars */
	data() {
		return {
		}
	},
  methods:{
    cli_Living(){
      this.$emit("info", "Living");
    },
    cli_Teaching(){
      this.$emit("info", "Teaching");
    },
    cli_Library(){
      const routerData = this.$router.resolve({
        path: `http://www.lib.hdu.edu.cn/`
      })
      window.open(`http://www.lib.hdu.edu.cn/`,'_blank');
    }
  },
}
  </script>
  
  <style>
  @import './index.css';
  </style>
  