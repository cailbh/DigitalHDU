<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->

<template>
	<div id="btnsDiv">
    <div id="btnsBody" class="panel">
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
      if(this.sky == "sunny"){
        this.sky = "night";
      }
      else{
        this.sky = "sunny";
      }
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
  