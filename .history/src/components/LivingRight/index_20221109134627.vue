<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->

<template>
	<div id="livingRight">     
        <div id="livingRightup" class="panel">
          <profile></profile>
          <!-- <profile :type="tp" ></profile> -->
        </div>
        <div id="livingRightmid" class="panel">
         <!-- <emergency></emergency> -->
          <!-- <radar></radar> -->
        </div>
        <div id="livingRightdown" class="panel">
          <!-- <maintRecord></maintRecord> -->
        </div>
      </div>
</template>
  
  <script>
import * as d3 from "d3";
import Head from "../../components/Header/index.vue"
import emergency from "../../components/Emergency/index.vue";
import radar from "../../components/Radar/index.vue";
import profile from "../../components/HDUProfile/index.vue";
import maintRecord from "../../components/MaintenanceRecords/index.vue"
export default {
  components: {radar,emergency,Head,maintRecord,profile},
  // components: { button1 },
  /* eslint-disable no-unused-vars */
	data() {
		return {
      tp:"living"
		}
	},
  mounted(){
    this.tp = 'living'
  }
  }
  </script>
  
  <style>
  @import './index.css';
  </style>
  