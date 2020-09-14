<template>
  <div class="clickchange"  @click="clickchange">
    <p>换一批</p>
  </div>
</template>

<script>
export default {
  data:function(){
    return {
      randinf:[]
    }
  },
  methods: {
    clickchange(){
        // console.log(this.newgoods.classify);
        if(this.newgoods.classify==undefined){
          this.newgoods.classify=""
        }
      //根据女装/男装 以及连衣裙等分类进行随机查询 渲染到商品展示部分
      this.$http.get("/getrandinf",{
        params:{
          randclassify:`%${this.newgoods.sex}%${this.newgoods.classify}`
        }
      }).then((res)=>{
        this.$emit("clickrand",res.data);

      }).catch((err)=>{
        console.log(err);
      })
      
    }
  },
  props:["newgoods"]
}
</script>

<style>
  .clickchange{
    width: 60px;
    height: 40px;
    margin-top: 12px;
    font-size: 12px;
    background: url("../../../assets/img/update.png") no-repeat;
    background-size: 30px;
    background-position-y: center;
    background-position-x: center;
    border-radius: 20px;
    text-align: center;
    cursor: pointer;
  }
  .clickchange p{
    margin-top: 32px;
  }
</style>