// import Vue from 'vue'
import {createApp} from 'vue'
import App from './App.vue'
// import Vuex from 'vuex'
//  引入element

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import router from "./router"
import store from "./config";
// Vue.use(ElementPlus)
// new Vue({
//     router,
//     store,
//     render:(h)=>h(App),
// }).$mount('#app')


const app = createApp(App);
app.config.globalProperties.$store = store;
app.use(router)
    .use(ElementPlus)
    .use(store)
    .mount('#app');
