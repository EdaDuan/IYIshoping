<!--  -->
<template>
  <div class='nav-box'>
    <div class='topnav'>
      <!-- logo放在h1里面提高权重 -->
      <h1 class='logo'>
        <a href title='IYI购'>
          <img src='../../assets/img/iyi.png' alt />
        </a>
      </h1>
      <router-link to='/home' tag='button'>首页</router-link>

      <router-link to='/classify/male' tag='button' @mouseenter.native='showMale($event)'>男装</router-link>

      <router-link to='/classify/female' tag='button' @mouseenter.native='showFemale($event)'>女装</router-link>

      <div class='search'>
        <input type='text' class='search-input' v-model='kw' />
        <router-link to='/search' tag='button' @click.native='search'>搜索</router-link>
      </div>

      <router-link to='/shopcart' class='cart'>
        <el-badge :value='shopcartNum' :max='99' class='item'>
          <span class='el-icon-shopping-cart-2'></span>
          购物车
        </el-badge>
      </router-link>

      <button type='button' @click='login' v-if='!isLogin'>登录</button>
      <div v-else class='logout'>
        <p style="font-size:14px;">欢迎你: </p>
        <p style="font-size:14px; margin-right: 5px;"> {{userInfo.username}} </p>
        <img :src='userInfo.headimg' />
        <p class='person' @click='person'> 个人中心 </p>
        <button type='button' @click='logout'> 注销</button>
      </div>
    </div>
  </div>
</template>


<script>
  import bus from "../../bus/bus.js"
  export default {
    name: '',
    components: {},
    data() {
      //这里存放数据
      return {
        isLogin: false,
        userInfo: {},
        kw: "", //搜索的关键字
        shopcartNum: 0
      };
    },

    created() {
      // 检查有没有localstroage
      if (JSON.parse(localStorage.getItem("user"))) {
        this.isLogin = true;
        this.userInfo = JSON.parse(localStorage.getItem("user"))[0];
      } else {
        this.isLogin = false;
        this.userInfo = {}
      }


      bus.$on("successLogin", () => {
        //如果登录成功就切换登录和注销的组件
        this.isLogin = true;
        this.userInfo = JSON.parse(localStorage.getItem("user"))[0];
      })


      //个人中心修改用户姓名
      bus.$on("username", (val) => {
        // console.log(val);
        this.userInfo.username = val
      })

      //个人中心修改用户头像
      bus.$on("headimgchange", () => {
        this.$http.get('/getnewheadimg', {
          params: {
            userid: this.userInfo.id
          }
        }).then((res) => {
          console.log(res.data);
          this.userInfo = res.data[0];
        }).catch((err) => {
          console.log(err);
        })
      })

      bus.$on('shopcartLogin', () => {
        this.login();
      })

      // 段发钰 bus接受 shopcartNum  显示导航栏购物车的数量
      bus.$on("topbarshowNum", (val) => {
        console.log(val)
        this.shopcartNum = val
      })
    },

    // 段发钰 显示导航栏购物车的数量
    // 两个一起使用
    mounted() {
      this.shopcartNum = this.$store.state.shopcartNum;
    },
    methods: {
      login() {
        bus.$emit("showbox") //这个指令可以打开登录窗口
      },

      // 展示男装
      showMale(e) {
        bus.$emit('showMale', e.target)
      },
      // 展示女装
      showFemale(e) {
        bus.$emit('showFemale', e.target)
      },
      // 注销
      logout() {
        localStorage.removeItem("user")
        this.isLogin = false;
        this.userInfo = {}
        // 先清除localstroage为0 
        localStorage.setItem("topbarshowNum", 0)
        //9.4 杨双星 新增 topbar购物车数量设置为0
        bus.$emit('topbarshowNum', 0);
        //9.4 杨双星修改 修改store
        this.$store.commit("clearCartData");
        this.$store.commit("changeLogin", false);
        this.$router.go(0)
      },

      // 通过得到的关键字查询数据
      search() {
        bus.$emit("showproduct", this.kw) //传到search.vue
      },
      person() {
        console.log(this.userInfo);
        this.$router.push({
          path: "/person",
          query: this.userInfo
        });
      }
    },
  }
</script>


<style scoped>
  /* @import url(); 引入公共css类 */
  .topnav {
    height: 80px;
  }

  .nav-box {
    width: 100%;
    height: 80px;
    line-height: 80px;
    font-size: 18px;
    background-color: transparent;
  }

  button {
    color: #add8e6;
    background-color: transparent;
    border: none;
    outline: none;
    border-radius: 5px;
    height: 60px;
    width: 60px;
  }

  button:hover {
    color: #52bfff;
    cursor: pointer;
  }

  .cart {
    background-color: transparent;
    margin: 0 80px 0 0;
  }

  .cart .el-button:hover {
    background-color: #fff;
  }

  el-badge {
    font-size: 18px;
  }

  .item {
    height: 30px;
    line-height: 30px;
    color: #add8e6;
  }

  .item:hover {
    color: #52bfff;
  }

  .topnav {
    width: 1246px;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .logout {
    color: #52bfff;
    display: flex;
    align-items: center;
  }

  .logout img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .logo {
    width: 300px;
    height: 50px;
    padding-bottom: 20px;
  }

  .logo img {
    width: 70px;
    height: 70px;
  }

  .search-input {
    height: 25px;
    border-radius: 50px;
    border: 1px solid #52bfff;
    padding-left: 10px;
    outline: none;
    color: #add8e6;
  }

  .person {
    cursor: pointer;
  }
</style>