<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->

<template>
	<div id="btnsDiv">
    <div class="bntDivShadow">
    </div>

    <div class="bntDivShadow1"></div>
    <div id="btnsBody">
      <div id="changeSky" class="btn" @click="cli_Sky" >主页</div>
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
      sky:"sunny",
		}
	},
  methods:{
    cli_Sky(){
      const _this = this;
      if(this.sky == "sunny"){
        this.sky = "night";
      }
      else{
        this.sky = "sunny";
      }
      this.$emit("sky", _this.sky);
    },
    cli_Living(){
      this.$emit("info", "Living");
    },
    cli_Teaching(){
      this.$emit("info", "Teaching");
    },
  },
}
  </script>
  
  <style>
  @import './index.css';
  </style>
  