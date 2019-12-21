import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import Router from 'vue-router'

// 捕获路由异常
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => {window.console.log(err.toString());window.location.reload();});
}

Vue.prototype.$http = axios;
// axios发送请求的网址，本地调试
axios.defaults.baseURL = 'http://101.200.219.50:8000';
// 网络版
// axios.defaults.baseURL = 'http://.';
Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
