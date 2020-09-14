<!--  -->
<template>
  <div class="female">
    <!-- 女装 分类 -->
    <div class="classifybox">
      <div class="classify" v-for="(item,index) in classify" :key="index" @click="change(item.name)">
        <img :src="item.pic" alt="">
        <div>
        <p>{{item.name}}</p>
        </div>
      </div>
    </div>

    <!-- 女装展示标题 -->
    <div class="showtitle"></div>

    <!-- 女装页面内容展示 -->
    <div class="showfemalebox">
      <!-- 侧边栏广告 -->
      <div class="aside">
        <img src="../../assets/img/asidef.png" alt="">
      </div>
    
    <!-- 女装商品展示 -->
    <!-- v-for="item in goodslist" :key="item.id" :goods="item" -->
      <showclothes  :goodslist="goodslist"></showclothes>
      <router-view></router-view>
      
      <!-- 点击换一批 -->
      <clickchange :newgoods="newgoods" @clickrand="clickrand"></clickchange>
      <router-view></router-view>
     
    <!-- 回到顶部 -->
      <fiexdbox></fiexdbox>
      <router-view></router-view>
    </div>
    <!-- 底部组件 -->
    <bottombox></bottombox>
    <router-view></router-view>
    
    

  </div>
</template>


<script>
import showclothes from "./classifychildcomps/showClothes.vue";
import fiexdbox from "./classifychildcomps/fixedbox.vue";
import bottombox from "../../components/bottom/bottom.vue";
import clickchange from "./classifychildcomps/clickchange.vue";
  export default {
    name: '',
    components: {showclothes,fiexdbox,bottombox,clickchange},
    data() {
      //这里存放数据 假数据
      return {
        classify:[{name:"连衣裙",pic:"https://cbu01.alicdn.com/img/ibank/2020/185/637/15034736581_71816578.220x220.jpg?_=2020"},
        {name:"T恤",pic:"https://cbu01.alicdn.com/img/ibank/2019/036/835/10505538630_893106422.220x220.jpg?_=2020"},
        {name:"衬衣",pic:"https://cbu01.alicdn.com/img/ibank/2020/999/052/17462250999_1421289810.220x220.jpg?_=2020"},
        {name:"针织衫",pic:"https://cbu01.alicdn.com/img/ibank/2019/467/632/11006236764_733468692.220x220.jpg?_=2020"},
        {name:"外套",pic:"https://cbu01.alicdn.com/img/ibank/2018/668/906/9318609866_133862534.220x220.jpg?_=2020"},
        {name:"卫衣",pic:"https://cbu01.alicdn.com/img/ibank/2020/367/975/18251579763_1102452806.220x220.jpg?_=2020"},
        {name:"裤子",pic:"https://cbu01.alicdn.com/img/ibank/2020/356/656/13605656653_493527419.220x220.jpg?_=2020"},
        {name:"运动装",pic:"https://cbu01.alicdn.com/img/ibank/2019/818/969/11687969818_46371432.220x220.jpg?_=2020"}],
        goodslist:[],
        changeClassify:"",
        newgoods:{sex:"女装"}
      };
    },
    methods: {
      //点击改变分类
      change(item){
        this.changeClassify = item;
        this.newgoods.classify = item;
      },
      //根据分类发起ajax请求 获取数据
      getclassifydata(change){
        this.$http.get("/getAllClassify",{
          params:{
            classify:`%女装%${change}%`
          }
        }).then((res)=>{
          // console.log(res.data)
          this.goodslist = res.data;
        }).catch((err)=>{
          console.log(err);
        })
      },
      //接收随机查询回来的子组件的值
      clickrand(randdata){
        // console.log(randdata);
        this.goodslist =randdata;
      }

    },
    watch: {
      //监听分类的改变 一旦改变发起ajax请求获取新数据
      "changeClassify":function(){
        this.getclassifydata(this.changeClassify)
        // console.log("执行了")
      }
    },
    created() {
      //初始化分类为女装 发起ajax请求
      this.getclassifydata(this.changeClassify)
    }
  }
</script>


<style scoped>
  /* @import url(); 引入公共css类 */
  .female{
    background-color: #F4F4F4;
  }
  .classifybox{
    margin: 0 auto;
    width: 70%;
    display: flex;
    /* justify-content: space-between; */
    flex-wrap: wrap;
  }
  .classify{
    width: 25%;
    height: 190px;
    margin: 10px auto;
    position: relative;
    cursor: pointer;
  }
  .classify img{
    width: 160px;
    height: 160px;
    border-radius: 8px 8px 0 0;
  }
  .classify>div{
    display: inline-block;
    width: 160px;
    height: 30px;
    background-color: #e2ebf0;
    border-radius: 0 0 8px 8px;
    position: absolute;
    bottom: 0;
    left: 0;
    text-align: center;
  }
  .classify p{
    line-height: 30px;
    color: #aaa;
  }
  .showtitle{
    height: 100px;
    background-image: url("../../assets/img/fashionfe.png");
    background-repeat: no-repeat;
    background-position-x: center;
    background-position-y: center;
    background-color: #C3D8E5;
  }
  .showfemalebox{
    display: flex;
    overflow: hidden;
  }
  .aside{
    width: 18%;
    height: 500px;
    background-color: #D3DCE6;
    color: #333;
    margin-top: 12px;
    margin-left: 4%;
  }
  .aside img{
    width: 100%;
    height: 100%;
  }
  



</style>