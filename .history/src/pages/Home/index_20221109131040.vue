<template>
  <div id="root">
    <!-- <button1 ref="button1"></button1>
    <button v-on:click="clickHandler">按钮</button> -->
    <!-- <svg width="1200" height="1000"></svg> -->
     
    <div id="Container">
      <!-- <div id="Container-back"></div> -->
      <div id="head">
        <Head></Head>
      </div>
        <navBar @info="getLink"></navBar>
        <transition name="homeLeftTran">
          <homeLeft v-show="showHomeLeft" ></homeLeft>
        </transition>
        <transition name="livingLeftTran">
          <livingLeft v-show="showLivingLeft" ></livingLeft>
        </transition>
        <transition name="homeRightTran">
          <div id="sceneContainer" v-show="showScene">
            <scene :type="barType"></scene>
          </div>
        </transition>
        <transition name="livingRightTran">
          <homeRight v-show="showHomeRight"></homeRight>
        </transition>
        <transition name="homeRightTran">
          <livingRight v-show="showLivingRight"></livingRight>
        </transition>
        <transition name="livingBottomTran">
          <homeBottom v-show="showHomeBottom"></homeBottom>
        </transition>
        <transition name="homeBottomTran">
          <livingBottom v-show="showLivingBottom"></livingBottom>
        </transition>
    </div>
  </div>
</template>

<script>
import Head from "../../components/Header/index.vue"
import scene from "../../components/Scene/index.vue";
import homeLeft from "../../components/HomeLeft/index.vue"
import homeRight from "../../components/HomeRight/index.vue"
import homeBottom from "../../components/HomeBottom/index.vue"
import livingLeft from "../../components/LivingLeft/index.vue"
import livingRight from "../../components/LivingRight/index.vue"
import livingBottom from "../../components/HomeBottom/index.vue"
import navBar from "../../components/NavBar/index.vue"

export default {
  components: { scene,Head,homeLeft,homeRight,homeBottom,navBar,livingLeft,livingRight,livingBottom},
  // components: { button1 },
  /* eslint-disable no-unused-vars */
  data() {
    return {
      timer:null,
      showHomeLeft: true,
      showHomeRight: true,
      showHomeBottom: true,
      showLivingLeft: false,
      showLivingRight: false,
      showLivingBottom: false,
      showScene: true,
      netData: null,
      texts: null,
      forceJageClick: 0,
      myWordCloud: null,
      wordCloudOption: null,
      communityNum: 0,
      clu: 15,
      windowWidth: document.documentElement.clientWidth, //实时屏幕宽度
      windowHeight: document.documentElement.clientHeight, //实时屏幕高度
      data: [73, 52, 33, 22, 14, 68],
      cube_data: "",
      cluData: "",
      piblicPath: process.env.BASE_URL,
      cube_size: [71, 285, 1000],
      mcolor: [
        "rgb(255,60,60)",
        "rgb(155,20,100)",
        "rgb(255,83,255)",
        "rgb(200,100,50)",
        "rgb(235,135,162)",
        "rgb(200,200,102)",
        "rgb(255,178,101)",
        "rgb(63,151,134)",
        "rgb(83,155,255)",
        "rgb(50,200,120)",
        "rgb(2,50,200)",
        "rgb(0,122,244)",
        "rgb(150,122,244)",
        "rgb(168,168,255)",
        "rgb(200,200,200)",
      ],
      mLigntcolor: [
        "#ff9c9c",
        "#cc88b0",
        "#ffa8ff",
        "#e3b097",
        "#f4c3d0",
        "#f4f4d0",
        "#ffd8b1",
        "#9ecac2",
        "#a8ccff",
        "#97e3ba",
        "#6f8be0",
        "rgb(0,122,244)",
        "#b6a2f7",
        "rgb(168,168,255)",
        "rgb(200,200,200)",
      ],
      marge: {
        top: 6,
        right: 10,
        bottom: 16,
        left: 6,
      },
      barType:"",
    };
  },
  watch: {
    cube_data() {
      this.$nextTick(() => {});
    },
    cluData() {
      this.$nextTick(() => {
      });
    },
    showScene(val){
      if(val==false){
        console.log('fa')
        this.timer = setTimeout(this.changeSceneShow(), 10000);
      }
    },
    barType(val){
      if("Living"==val){
        this.showHomeLeft = false
        this.showHomeRight = false
        this.showHomeBottom = false
        this.showLivingLeft = true
        this.showLivingRight = true
        this.showLivingBottom = true
        this.showScene = false
      }
      else if("Teaching"==val){
        this.showHomeLeft = true
        this.showHomeRight = true
        this.showHomeBottom = true
        this.showLivingLeft = false
        this.showLivingRight = false
        this.showLivingBottom = false
        this.showScene = false
      }
    }
  },
  methods: {
    getLink(value){
      this.barType = value
    },
    changeSceneShow(){    
        this.showScene = true
        console.log(111)
        clearTimeout(this.timer);
      },
    getData() {
      const _this = this;
      this.$http
        .get("/api/test/getData", { params: { name: "12345" } }, {})
        .then((response) => {
          // 响应成功回调
          console.log(response);
        });
      // .then((response) => {
      //   console.log(response);
      // })
      // .catch((reject) => {
      //   console.log(reject);
      // });
    }, //获取数据

    clickHandler() {
      console.log(111111);
    },
  },
  created: function () {
    var _this = this;
  },
  mounted() {
    this.$el.style.setProperty("--heightStyle", this.windowHeight + "px");

    this.getData();
  },
  beforeDestroy() {
      clearTimeout(this.timer);
    }
};
</script>

<style>
  @import '../../assets/style/home.css';
</style>