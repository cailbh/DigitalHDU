<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->

<template>
	<div id="btnsDiv">
    <div id="btnsBody">
        <div class="bntDivShadow">
        </div>
        <div id="changeSky" class="btn" @click="cli_Sky" ref="skyBtn"></div>
        <div id="showLabel" class="btn" @click="cli_ShowLabel" ref="showLabelBtn"></div>
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
        this.$refs.skyBtn.className = this.sky
      this.$emit("sky", _this.sky);
    },
    cli_Living(){
      this.$emit("info", "Living");
    },
    cli_Teaching(){
      this.$emit("info", "Teaching");
    },
  },
  created() {
    this.$refs.skyBtn.className = this.sky
  }, 
  mounted() {
    this.$refs.skyBtn.className = this.sky
  }
}
  </script>
  
  <style>
  @import './index.css';
  </style>
  