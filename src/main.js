import Vue from 'vue'
import App from './App.vue'
import * as echarts from 'echarts'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.use(BootstrapVue)
Vue.config.productionTip = true
Vue.prototype.$echarts = echarts
import router from '@/router';
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
