<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->

<template>
	<div id="homeLeft">
		<div id="homeLeftup" class="panel">
			<component :is="comUp"></component>
			<!-- <teachers></teachers> -->
		  </div>
		  <div id="homeLeftmid" class="panel">
			<!-- <emergency></emergency> -->
			<component :is="comMid"></component>
			<!-- <students></students> -->
		  </div>
		  <div id="homeLeftdown" class="panel">
			<component :is="comDown"></component>
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
import inNum from "../../components/InNum/index.vue"
import Flowrate from "../../components/Flowrate/index.vue"
import livingRate from "../../components/LivingRate/index.vue"

export default {
  components: {emergency,teachers,workers,students,Flowrate,radar,inNum,livingRate},
  // components: { button1 },
  /* eslint-disable no-unused-vars */
  props:["type"],
	data() {
		return {
			comUp:"teachers",
     		comMid:"students",
      		comDown:"workers",
		}
	},
	watch: {
		type(val){
		let _this = this
			if("Living" == val){
			setTimeout(()=>{
			_this.tp = 'living';
			_this.comUp="livingRate";
			_this.comMid = 'inNum';
			_this.comDown="Flowrate";
			}, 500);
			}
			else if("Teaching" == val){
			setTimeout(()=>{
			_this.tp = 'home';
			_this.comUp="teachers";
			_this.comMid="students";
			_this.comDown = 'workers';
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
  