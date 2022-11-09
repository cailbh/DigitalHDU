<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->

<template>
  <div class="maintenanceContain" id="">
  <div class="ChartHead">本月维保记录</div>
  <div class="ChartBody">
    <div class="maintenanceContain" id="maintenanceContain" ref="matChart">
        <div class = "tableCard" v-for="(item,i) in data" :key="item.id" :id="'div'+item.id">
          <div class="col">{{item.name}}</div>
        </div>
    </div>
  </div>
</div>
</template>

<script>

import * as d3 from "d3";
export default {
  data() {
    return {
      geoCoordMap:{},
      data:[],
      myChart:null,
      mcolor:[
        "#0000CC",
        "#0033CC",
        "#0066CC",
        "#0099CC",
        "#00CCCC",
        "#00FFCC",
      ]
    }
  },
  mounted() {
        this.getdata();
  },
  methods: {
    
    getdata(){
        
        this.data = [
            { id:'re0', time:"10-21", pos:"北门", state:"正常", name: '1月' },
            { id:'re1', time:"10-21", pos:"北门", state:"正常", name: '2月' },
            { id:'re2', time:"10-21", pos:"北门", state:"正常",  name: '3月' },
            { id:'re3', time:"10-21", pos:"北门", state:"正常", name: '4月' },
            { id:'re4', time:"10-21", pos:"北门", state:"正常",  name: '5月' },
            { id:'re5', time:"10-21", pos:"北门", state:"正常",  name: '6月' },
          ]
        
    },
  }
}
</script>
<style>
@import './index.css';
</style>
