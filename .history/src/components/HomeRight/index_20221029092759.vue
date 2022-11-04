<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->

<template>
	<div id="right">     
        <div id="rightup" class="panel">
         <lineChart></lineChart>
        </div>
        <div id="rightdown" class="panel">
          <radar></radar>
        </div>
      </div>
</template>
  
  <script>
import * as d3 from "d3";
import Head from "../../components/Header/index.vue"
import lineChart from "../../components/Line/index.vue";
import radar from "../../components/Radar/index.vue";
export default {
  components: {radar,lineChart,Head},
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
  