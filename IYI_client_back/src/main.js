import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/css/base.css"
import axios from "axios"
axios.defaults.baseURL="http://127.0.0.1:7001"

Vue.prototype.$http=axios;
Vue.use(ElementUI);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
