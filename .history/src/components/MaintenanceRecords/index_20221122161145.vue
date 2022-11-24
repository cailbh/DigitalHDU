<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->

<template>
  <div class="maintenanceContain" id="">
  <div class="ChartHead">本月维保记录</div>
  <div class="ChartBody">
    <div class="tableHead">
      <div class="col">{{'姓名'}}</div>
      <div class="col">{{'地点'}}</div>
      <div class="col">{{'时间'}}</div>
      <div class="col">{{'状态'}}</div>
    </div>
    <div class="maintenanceContain" id="maintenanceContain" ref="matChart">
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
      const _this = this;
					this.$http
					.get('/api/maintenance/getData', { params: {} }, {})
					.then((response) => {
						var body = response.body
						_this.data = body
					})
					.catch(function (error) {
					console.log(error);
					});
        // this.data = [
        //     { id:'re0', time:"11-4", pos:"北门", state:"正常", name: '张三' },
        //     { id:'re1', time:"11-1", pos:"南门", state:"正常", name: '张二' },
        //     { id:'re2', time:"10-28", pos:"东门", state:"正常",  name: '李四' },
        //     { id:'re3', time:"10-25", pos:"五教", state:"正常", name: '李五' },
        //     { id:'re4', time:"10-22", pos:"北门", state:"正常",  name: '赵六' },
        //     { id:'re5', time:"10-21", pos:"北门", state:"正常",  name: '赵七' },
        //   ]
        
    },
  }
}
</script>
<style>
@import './index.css';
</style>
