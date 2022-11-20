<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->

<template>
	<div id="homeRight">     
        <div id="homeRightup" class="panel">
          <component :is="comUp" :currentProp="this.upProp" ></component>
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
import AbnormalOut from "../../components/AbnormalOut/index.vue"
import AbnormalIn from "../../components/AbnormalIn/index.vue"
export default {
  components: { radar, emergency, Head, maintRecord, profile,AbnormalOut,AbnormalIn},
  // components: { button1 },
  /* eslint-disable no-unused-vars */
  props:["type"],
	data() {
		return {
      tp:"home",
      comUp:"profile",
      comMid:"emergency",
      comDown:"maintRecord",
		}
	}, 
  computed: {
    upProp() {
      switch (this.tp) {
        case 'living':
          return { type: "living"};
        case 'home':
          return { type: "home"};
        default:
          
      }
    },
  },
  watch: {
    type(val){
      let _this = this
        if("Living" == val){
          setTimeout(()=>{
          _this.tp = 'living';
          _this.comUp="profile";
          _this.comMid = 'AbnormalIn';
          _this.comDown="AbnormalOut";
          }, 500);
        }
        else if("Teaching" == val){
        setTimeout(()=>{
          _this.tp = 'home';
          _this.comUp="profile";
          _this.comMid="emergency";
          _this.comDown = 'maintRecord';
          }, 500);
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
  