<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->

<template>
  <div class="AbnormalOutContain" id="">
  <div class="ChartHead">出校异常</div>
  <div class="ChartBody">
    <div class="tableHead">
      <div class="col">{{'姓名'}}</div>
      <div class="col">{{'地点'}}</div>
      <div class="col">{{'时间/天'}}</div>
      <div class="col">{{'状态'}}</div>
    </div>
    <div class="AbnormalOutContain" id="AbnormalOutContain" ref="aboChart">
        <div class = "tableCard" v-for="(item,i) in data" :key="item.id" :id="'div'+item.id">
          <div class="col">{{item.name}}</div>
          <div class="col">{{item.pos}}</div>
          <div class="col">{{item.time}}</div>
          <div class="col">{{item.state}}</div>
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
            { id:'Out0', time:"15", pos:"3101", state:"异常", name: '李三' },
            { id:'Out1', time:"11", pos:"1021", state:"异常", name: '李二' },
            { id:'Out2', time:"10", pos:"1210", state:"异常",  name: '张四' },
            { id:'Out3', time:"10", pos:"2123", state:"异常", name: '张五' },
            { id:'Out4', time:"3", pos:"1203", state:"异常",  name: '吴六' },
            { id:'Out5', time:"3", pos:"1032", state:"异常",  name: '吴七' },
          ]
        
    },
  }
}
</script>
<style>
@import './index.css';
</style>
