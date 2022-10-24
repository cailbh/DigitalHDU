//配置路由
import Vue from 'vue';
import VueRouter from 'vue-router';
//使用插件
Vue.use(VueRouter);
import Home from '@/pages/Home'
import Search from '@/pages/Seaarch'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
//配置路由
export default new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/home",
            component: Home
        },
        {
            path: "/search",
            component: Search
        },
        {
            path: "/login",
            component: Login
        },
        {
            path: "/register",
            component: Register
        },
        //重定向，定位至首页
        {
            path: "*",
            redirect: "/home"
        },
    ]
})