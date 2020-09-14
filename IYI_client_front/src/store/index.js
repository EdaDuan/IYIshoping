import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sex: "",
    num: 1,
    shopcartData: [],
    ifLogin: false,
    // 段发钰在localStorage中获取购物车数量
    shopcartNum: Number(localStorage.getItem('topbarshowNum')) || 0

  },
  // mutations改变num
  mutations: {
    changeNum(state, val) {
      state.num = val;
    },
    setCartData(state, arr) {
      state.shopcartData.length = 0;
      state.shopcartData.splice(0, 0, ...arr);
      state.shopcartNum = state.shopcartData.reduce(function (total, val) {
        return total += val.count;
      }, 0);
      console.log(state.shopcartNum);
      // 段发钰在localStorage中缓存购物车数量
      localStorage.setItem('topbarshowNum', state.shopcartNum)

    },
    clearCartData(state) {
      console.log('qingchu');
      state.shopcartData.length = 0;
      state.shopcartNum = 0;
      console.log(state.shopcartNum);
    },
    changeLogin(state, flag) {
      state.ifLogin = flag;
    }
  },
  actions: {},
  modules: {}
})