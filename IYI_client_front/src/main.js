import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/css/base.css";
import axios from "axios";
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/fonts/iconfont.css"
import ElementUI from 'element-ui';
// 引入swiper的css文件
import 'swiper/dist/css/swiper.css';

// axios全局配置
axios.defaults.baseURL="http://127.0.0.1:7001";
Vue.prototype.$http=axios;

// 启用element插件
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
