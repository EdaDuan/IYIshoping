<!--  -->
<template>
  <div>
    <!-- 女装分类头部 -->
    <!-- router.index.js配置了meta实现男女装头部切换 -->
    <div v-if="$route.meta.sex">
      <div class="femaletitle">
        <div class="left"></div>
          <div class="img"><img src="../../assets/img/female.png" alt=""></div>
        <div class="right"></div>
      </div>
      <div class="likewo"></div>
      <router-view></router-view>
    </div>
    <!-- 男装分类头部 -->
    <div v-else>
      <div class="maletitle">
        <div class="left"></div>
          <div class="img"><img src="../../assets/img/male.png" alt=""></div>
        <div class="right"></div>
      </div>
      <div class="likeman"></div>
      <router-view></router-view>
    </div>


  </div>
</template>


<script>
  export default {
    name: '',
    components: {},
    data() {
      //这里存放数据
      return {
        sex:true
      }
    },
    methods: {
      
    },
  }
</script>


<style scoped>
  /* @import url(); 引入公共css类 */
  *{
    margin: 0;
    padding: 0;
  }
  .femaletitle,.maletitle{
    display: flex;
  }
  .femaletitle .img,.maletitle .img{
    width: 70%;
    margin: 0 auto;
  }
  .femaletitle img,.maletitle img{
    width: 100%;
    height: 100%;
  }

  .femaletitle .left{
    width: 15%;
    background-color: #B6CEE1;
  }
  .femaletitle .right{
    width: 15%;
    background-color: #EAE9EE;
  }
  .maletitle .left{
    width: 15%;
    background-color: #C6C6C5;
  }
  .maletitle .right{
    width: 15%;
    background-color: #C6C6C5;
  }
  .likewo,.likeman{
    height: 100px;
    background-image: url("../../assets/img/like.png");
    background-repeat: no-repeat;
    background-position-x: center;
    background-position-y: center;
    background-color: #BFDAE3;
  }
  .likeman{
    background-color: #D4D4D3;
  }
  

  

</style>