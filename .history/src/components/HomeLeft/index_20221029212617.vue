<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->

<template>
	<div id="homeLeft">
		<div id="homeLeftup" class="panel">
			<teachers></teachers>
		  </div>
		  <div id="homeLeftmid" class="panel">
			<bar></bar>
		  </div>
		  <div id="homeLeftdown" class="panel">
			<workers></workers>
		  </div>	  
	</div>
</template>
  
  <script>
import bar from "../../components/Bar/index.vue";
import teachers from "../../components/Teachers/index.vue";
import workers from "../../components/Workers/index.vue"
export default {
  components: {bar,teachers,workers},
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
  