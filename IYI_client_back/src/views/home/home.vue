<!--  -->
<template>
  <div class="home-box">
    <topnav></topnav>
    <div class="home-content">
      <leftnav></leftnav>
      <router-view></router-view>
    </div>
  </div>
</template>


<script>
  import topnav from "./homechildcnp/TopNav.vue";
  import leftnav from "./homechildcnp/LeftNav.vue";

  export default {
    name: '',
    components: {
      topnav,
      leftnav,
    },
    data() {
      //这里存放数据
      return {

      };
    },

  }
</script>


<style scoped>
  /* @import url(); 引入公共css类 */
  .home-box {
    width: 100vw;
    height: 100vh;
    background-color: rgba(207, 204, 204, 0.469);
  }
  .home-content{
    display: flex;
  }
</style>