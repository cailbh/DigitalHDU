<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->

<template>
	<div id="homeRight">     
        <div id="homeRightup" class="panel">
          <component :is="comUp"></component>
          <!-- <profile></profile> -->
        </div>
        <div id="homeRightmid" class="panel">
          <component :is="comMid"></component>
          <!-- <radar></radar> -->
        </div>
        <div id="homeRightdown" class="panel">
          <component :is="comDown"></component>
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
  props: ["type"],
  components: { radar, emergency, Head, maintRecord, profile},
  // components: { button1 },
  /* eslint-disable no-unused-vars */
	data() {
		return {
      tp:"home",
      comUp:"profile",
      comMid:"emergency",
      comDown:"maintRecord",
		}
	}, 
  watch: {
    type(val){
      let _this = this
        if("Living" == val){
          setTimeout(()=>{
          _this.comUp="emergency"
          }, 1000);
        }
        else if("Teaching" == val){
        
        }
      }
  },
  mounted(){
    this.tp = 'home'
  }
  }
  </script>
  
  <style>
  @import './index.css';
  </style>
  