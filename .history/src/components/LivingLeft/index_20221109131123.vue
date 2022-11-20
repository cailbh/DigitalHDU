<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->

<template>
	<div id="livingLeft">
		<div id="livingLeftup" class="panel">
			<!-- <teachers></teachers> -->
		  </div>
		  <div id="livingLeftmid" class="panel">
			<!-- <emergency></emergency> -->
			<!-- <students></students> -->
		  </div>
		  <div id="livingLeftdown" class="panel">
			<!-- <workers></workers> -->
			<!-- <radar></radar> -->
		  </div>	  
	</div>
</template>
  
  <script>
import emergency from "../../components/Emergency/index.vue";
import teachers from "../../components/Teachers/index.vue";
import students from "../../components/Students/index.vue";
import workers from "../../components/Workers/index.vue"
import radar from "../../components/Radar/index.vue"

export default {
  components: {emergency,teachers,workers,students,radar},
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
  