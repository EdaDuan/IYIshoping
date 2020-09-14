<template>
  <!-- 商品展示 -->
  <div class="showClothes">
    <div class="showClothesbox" v-for="item in goodslist" :key="item.id" @click="godetail(item.id)">
      <div class="shopClothes-img">
        <img :src="item.cover" alt="">
      </div>
      <div class="shopClothes-des">
        <p class="clothes-name">{{item.name}}</p>
        <p class="clothes-des">{{item.desc}}</p>
        <div class="clothes-inf">
          <p class="clothes-pri">￥{{item.price}}</p>
          <p class="clothes-rest">库存:{{item.rest}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data:function(){
    return {  
    }
  },
  props:["goodslist"],
  methods: {
    godetail(gid){
      this.$router.push({path: "/detail", query:{gid}});
    }
  }
}
</script>

<style>
.showClothes{
  width: 74%;
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-around; */
  justify-content: flex-start;
}
.showClothesbox{
    /* width: 240px; */
    width: 19%;
    height: 310px;
    padding: 10px 13px;
    margin: 12px 15px;
    background-color: #FFFFFF;
    cursor: pointer;
  }
  .showClothesbox:hover{
    box-shadow: 0 15px 30px rgba(0, 0, 0, .1);
    transform: translate3d(0,-2px,0);
  }
  .showClothesbox img{
    width: 100%;
    height: 250px;
  }
  .shopClothes-des{
    text-align: center;
    color: #B0B0B0;
    height: 60px;
    position: relative;
  }
  .clothes-name{
    color: black;
    font-size: 14px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .clothes-des{
    font-size: 12px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .clothes-pri{
    font-size: 14px;
    color:red;
    margin: 0 auto;
  }
  .clothes-rest{
    font-size: 12px;
  }
  .clothes-rest{
    position: absolute;
    bottom: 0;
    right: 0;
  }
</style>