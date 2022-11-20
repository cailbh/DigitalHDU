<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->

<template>
  <div class="AbnormalInContain" id="">
  <div class="ChartHead">留宿异常</div>
  <div class="ChartBody">
    <div class="tableHead">
      <div class="col">{{'姓名'}}</div>
      <div class="col">{{'宿舍'}}</div>
      <div class="col">{{'时间'}}</div>
      <div class="col">{{'状态'}}</div>
    </div>
    <div class="AbnormalInContain" id="AbnormalInContain" ref="abiChart">
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
            { id:'In0', time:"15", pos:"1101", state:"异常", name: '张三' },
            { id:'In1', time:"11", pos:"2021", state:"异常", name: '张二' },
            { id:'In2', time:"10", pos:"2210", state:"异常",  name: '李四' },
            { id:'In3', time:"10", pos:"1123", state:"异常", name: '李五' },
            { id:'In4', time:"3", pos:"1233", state:"异常",  name: '赵六' },
            { id:'In5', time:"3", pos:"3032", state:"异常",  name: '赵七' },
          ]
        
    },
  }
}
</script>
<style>
@import './index.css';
</style>
