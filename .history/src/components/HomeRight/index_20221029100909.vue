<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->

<template>
	<div id="homeRight">     
        <div id="homeRightup" class="panel">
         <lineChart></lineChart>
        </div>
        <div id="homeRightmid" class="panel">
          <radar></radar>
        </div>
        <div id="homeRightdown" class="panel">
          <maintRecord></maintRecord>
        </div>
      </div>
</template>
  
  <script>
import * as d3 from "d3";
import Head from "../../components/Header/index.vue"
import lineChart from "../../components/Line/index.vue";
import radar from "../../components/Radar/index.vue";
import maintRecord from "../../components/MaintenanceRecords/index.vue"
export default {
  components: {radar,lineChart,Head,maintRecord},
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
  