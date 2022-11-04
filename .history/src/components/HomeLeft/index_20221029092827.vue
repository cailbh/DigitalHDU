<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->

<template>
	<div id="left">
		<div id="leftup" class="panel">
			<polarStacked></polarStacked>
		  </div>
		  <div id="leftdown" class="panel">
			<bar></bar>
		  </div>	  
	</div>
</template>
  
  <script>
  import * as d3 from "d3";
import Head from "../../components/Header/index.vue"
import scene from "../../components/Scene/index.vue";
import bar from "../../components/Bar/index.vue";
import lineChart from "../../components/Line/index.vue";
import radar from "../../components/Radar/index.vue";
import polarStacked from "../../components/PolarStacked/index.vue";
import homeLeft from "../../components/HomeLeft/index.vue"
export default {
  components: {bar,polarStacked},
  // components: { button1 },
  /* eslint-disable no-unused-vars */
	data() {
		return {
		}
	},
  }
  </script>
  
  <style>
  @import './index.css';
  </style>
  