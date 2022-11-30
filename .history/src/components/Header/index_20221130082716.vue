<template>
  <!-- 头部 -->
  <!-- <header class="header">
    <div>
      <b-nav tabs fill>
        <b-nav-item active>Active</b-nav-item>
        <b-nav-item>Link</b-nav-item>
        <b-nav-item>Link with a long name </b-nav-item>
        <b-nav-item disabled>Disabled</b-nav-item>
      </b-nav>
    </div>
  </header> -->
  <div class="head">
    <div class="headLeft">
      <div class="upHalf headLeftUp">
        <div class="timeLogo"></div>
        <div class="headInfo">{{weather.ymd}}&nbsp;&nbsp;{{date}}</div>
        <div class="weatherLogo"></div>
        <div class="headInfo">{{weather.type}}&nbsp;&nbsp;{{weather.wendu}}℃</div> 
        <!-- <div class="wetherLogo"></div> -->
      </div>
        <div class="downHalf">
        </div>
    </div>
    <div class="headMid">
      <div class="headMidUp">
        杭州电子科技大学数字孪生校园
      </div>
      <div class="headMidDown"> 
      </div>
    </div>
    <div class="headRight">
      <div class="upHalf headRightUp">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span calss="key">pm1.0:</span><span calss="value" id="value_pm10">{{weather.pm10}} </span>&nbsp;&nbsp;
        <span calss="key">pm2.5:</span><span calss="value"  id="value_pm25">{{weather.pm25}} </span>&nbsp;&nbsp;
        <span calss="key">空气质量:</span><span calss="value"  id="value_qua">{{weather.quality}} </span>&nbsp;&nbsp;
        <span calss="key">湿度:</span><span calss="value"  id="value_shi">{{weather.shidu}} </span>&nbsp;&nbsp;
        <!-- <span calss="key">温度:</span><span calss="value"  id="value_wen">{{weather.wendu}} </span>&nbsp;&nbsp; -->
      </div>
      <div class="downHalf">
      </div>
    </div>
  </div>
</template>

<script>  
export default {
  data() {
    return {
      date:null,
      cityName:'',
      weather: {
              type:'',
              wendu:"18",
              ganmao: '',
              pm10: '--市／--℃',
              pm25: '--',
              quality: '0',
              shidu: '',
              ymd:""
          },
    }
  },
  methods: {
    getDate(){},
    // 获取天气
    getTheWeather() {
      const _this = this;
      this.$axios
        .get("/we/101210101")
        .then((response) => { 
          let data = response.data.data;
           _this.weather={
              type:data.forecast[0]['type'],
              wendu:data.wendu,
              ganmao:data.ganmao,
              pm10: data.pm10,
              pm25: data.pm25,
              quality: data.quality,
              shidu: data.shidu,
              ymd: data.forecast[0]['ymd'],
           }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  mounted() {
    
    let _this = this; 
    this.timer = setInterval(() => {
      let date= new Date();   
      let hours =  ''+date.getHours();        //时
      let minutes = ''+date.getMinutes();    //分
      let seconds = ''+date.getSeconds();    //秒
      let time =  hours.padStart(2, '0') + ":" + minutes.padStart(2, '0') + ":" + seconds.padStart(2, '0') + "" ;
      _this.date = time
      _this.getTheWeather()
    }, 1000)
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  }
};
</script>
<style>
  @import '../../assets/style/head.css';
</style>