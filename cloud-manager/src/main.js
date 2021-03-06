import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/fonts/iconfont.css'
import './assets/css/global.css' // 全局样式

import axios from 'axios'

// 配置请求根路径
// axios.defaults.baseURL = 'http://192.168.23.139:8095/index.php'
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
