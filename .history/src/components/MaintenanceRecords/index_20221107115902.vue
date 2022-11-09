<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->

<template>
  <div class="maintenanceContain" id="">
  <div class="ChartHead">本月维保记录</div>
  <div class="ChartBody">
    <div class="maintenanceContain" id="maintenanceContain" ref="matChart">
        <div class = "tableCard" v-for="(item,i) in data" :key="item.id" :id="'div'+item.id">
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
    let myChart = this.myChart
        console.log("12123123",myChart)
        if (myChart != null && myChart != "" && myChart != undefined) {
          console.log("111111")
          myChart.dispose();//销毁
        }
        myChart = this.$echarts.init(this.$refs.matChart)
        this.myChart = myChart
        this.getdata();
        this.draw();
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
    draw() {
      var _this = this

      var mcolor = _this.mcolor

      let myChart = _this.myChart
      // 绘制图表配置
      var data = this.data
      let xData = data.map(function (item) {
          return item.name;
        })
      var normalize = d3.scaleLinear().domain([0, 300]).range([0, 1]);
      // cons
      const barOption = {
        toolbox:{
          show:true,
          feature:{
            dataView:{
              show: true,
              readOnly:false,
              optionToContent:(op)=>{
                var dataView = op.toolbox[0].feature.dataView
                var table = '<div></div'
                  return table
              }
 ,           },
            saveAsImage:{
              show: true,   
            }
          }
        }
      };
      // let currentOption = mapOption;
      myChart.setOption(barOption);
      // setInterval(function () {
      // 	currentOption = currentOption === mapOption ? barOption : mapOption;
      // 	myChart.setOption(currentOption, true);
      // }, 2000);
      // myChart.setOption(option);
      setTimeout(function() {
        window.onresize = function() {
          myChart.resize();
        }
      }, 200)
    },
  }
}
</script>
<style>
@import './index.css';
</style>
