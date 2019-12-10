import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

Vue.prototype.$http = axios;
// axios发送请求的网址，本地调试
axios.defaults.baseURL = 'http://101.200.219.50:8080';
//网络版
// axios.defaults.baseURL = 'http://.';
Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
