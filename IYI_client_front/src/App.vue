<!--  -->
<template>
  <div>
    <div class="max-box">
      <!-- 顶部导航栏，跳转路由 -->
      <topbar ref="topbar"></topbar>
      <!-- 路由出口 -->
      <keep-alive include="search">
        <router-view></router-view>
      </keep-alive>
      <!-- 下拉框展示分类 -->
      <show></show>
      <!-- 登录注册弹框 -->
      <loginorregist></loginorregist>

    </div>
  </div>
</template>


<script>
  import topbar from "./components/topbar/topbar.vue";
  import loginorregist from "./views/loginorregist/loginorregist.vue";
  import show from "./components/topbar/show.vue"
  
  export default {
    name: 'app',
    components: {
      topbar,
      loginorregist,
      show
    },
    data() {
      //这里存放数据
      return {
        msg:"app"
      };
    },
    mounted() {
      if (sessionStorage.getItem("store")) {
        this.$store.replaceState(
          Object.assign({},
            this.$store.state,
            JSON.parse(sessionStorage.getItem("store"))
          )
        );
        sessionStorage.removeItem("store");
      }
      window.addEventListener("pagehide", () => {
        sessionStorage.setItem("store", JSON.stringify(this.$store.state));
      });
    },
  }
</script>


<style scoped>
  /* @import url(); 引入公共css类 */
</style>