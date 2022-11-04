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
      
      <div class="upHalf">
        <span calss="key">pm1.0:</span><span calss="value">{{weather.pm10}} </span>&nbsp;&nbsp;
        <span calss="key">pm2.5:</span><span calss="value">{{weather.pm25}} </span>&nbsp;&nbsp;
        <span calss="key">空气质量:</span><span calss="value">{{weather.quality}} </span>&nbsp;&nbsp;
        <span calss="key">湿度:</span><span calss="value">{{weather.shidu}} </span>&nbsp;&nbsp;
        <span calss="key">温度:</span><span calss="value">{{weather.wendu}} </span>&nbsp;&nbsp;
      </div>
        <div class="downHalf">
        </div>
    </div>
    <div class="headMid">
      杭州电子科技大学数字孪生校园
    </div>
    <div class="headRight">
      <div class="upHalf headRightUp">
        <span>杭州市:</span><span>{{date}} </span>
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
              ganmao: '',
              pm10: '--市／--℃',
              pm25: '--',
              quality: '0',
              shidu: '',
              wendu:"18",
              yesterday:{},
              forecast:[]
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
          console.log(response.data)
           _this.weather = response.data.data
  
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  mounted() {
    
    let _this = this; 
    this.timer = setInterval(() => {
      _this.date = new Date(); // 修改数据date
      _this.getTheWeather()
      console.log(_this.weather)
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