<!--  -->
<template>
  <div class="login">
      <loginbox></loginbox>
    </div>
  </div>
</template>


<script>
  import loginbox from "./loginchildcnp/LoginBox.vue"
  export default {
    name: '',
    components: {
      loginbox
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
  
  .login{
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: rgba(7, 7, 7, 0.172);
  }
  
</style>