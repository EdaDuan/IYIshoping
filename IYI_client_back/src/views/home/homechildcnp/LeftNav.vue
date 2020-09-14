<!--  -->
<template>
  <div class="left-nav">
    <router-link to="/home/user" tag="p">用户管理</router-link>
    <router-link to="/home/banner" tag="p">轮播图管理</router-link>
    <router-link to="/home/goods" tag="p">商品管理</router-link>
    <router-link to="/home/orders" tag="p">订单管理</router-link>
  </div>
</template>


<script>
  export default {
    name: '',
    components: {},
    data() {
      //这里存放数据
      return {

      };
    },
    
  }
</script>


<style scoped>
  /* @import url(); 引入公共css类 */
  .left-nav{
    width: 200px;
    text-align: center;
    height:100%;
    font-size: 20px;
    padding-top: 30px;
    border: 2px solid gainsboro;
    margin: 50px 0 0 50px;

  }
  .left-nav p{
    margin: 25px auto;
    width: 100px;
    cursor: pointer;
    color: rgb(209, 207, 207);
  }
  .left-nav p:hover{
    color: rgb(0, 0, 0);
    transition: all 0.5s linear;
  }
</style>