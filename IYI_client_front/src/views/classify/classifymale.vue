<!--  -->
<template>
  <div class="male">
    <!-- 男装 分类 -->
    <div class="classifybox">
      <div class="classify" v-for="(item,index) in classify" :key="index" @click="change(item.name)">
        <img :src="item.pic" alt="">
        <div>
        <p>{{item.name}}</p>
        </div>
      </div>
    </div>

    <!-- 男装展示标题 -->
    <div class="showtitle"></div>
    
    <div class="showfemalebox">
      <!-- 侧边栏广告 -->
      <div class="aside">
        <img src="../../assets/img/asidem.png" alt="">
      </div>
    
    <!-- 男装商品展示 -->
      <showclothes  :goodslist="goodslist"></showclothes>
      <router-view></router-view>
    
    <!-- 点击换一批 -->
      <clickchange :newgoods="newgoods" @clickrand="clickrand"></clickchange>
      <router-view></router-view>

    </div>

    <!-- 回到顶部组件 -->
    <fiexdbox></fiexdbox>
    <router-view></router-view>

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
      //这里存放数据
      return {
        classify:[{name:"T恤",pic:"https://cbu01.alicdn.com/img/ibank/2020/104/007/19018700401_668809071.220x220.jpg?_=2020"},
        {name:"衬衣",pic:"https://cbu01.alicdn.com/img/ibank/2020/879/749/18279947978_189132386.220x220.jpg?_=2020"},
        {name:"针织衫",pic:"https://cbu01.alicdn.com/img/ibank/2020/781/903/18663309187_1245004789.220x220.jpg?_=2020"},
        {name:"外套",pic:"//cbu01.alicdn.com/img/ibank/2020/576/102/18304201675_2113678336.220x220.jpg?_=2020"},
        {name:"卫衣",pic:"https://cbu01.alicdn.com/img/ibank/2020/929/418/20215814929_1677217909.220x220.jpg?_=2020"},
        {name:"裤子",pic:"https://cbu01.alicdn.com/img/ibank/2020/974/684/14784486479_626110510.220x220.jpg?_=2020"},
        {name:"夏日短裤",pic:"https://cbu01.alicdn.com/img/ibank/2019/964/372/10795273469_1501232530.220x220.jpg?_=2020"},
        {name:"运动装",pic:"https://cbu01.alicdn.com/img/ibank/2020/456/357/20063753654_1353174659.220x220.jpg?_=2020"}],
        goodslist:[],
        changeClassify:"",
        newgoods:{sex:"男装"}
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
            classify:`%男装%${change}%`
          }

        }).then((res)=>{
          this.goodslist = res.data;
        }).catch((err)=>{
          console.log(err);
        })
      },
     
     //接收随机查询回来的子组件的值
      clickrand(randdata){
        this.goodslist =randdata;
      }
    },
     watch: {
      //监听分类的改变 一旦改变发起ajax请求获取新数据
      "changeClassify":function(){
        this.getclassifydata(this.changeClassify)
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
  .male{
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
    background-image: url("../../assets/img/fashionma.png");
    background-repeat: no-repeat;
    background-position-x: center;
    background-position-y: center;
    background-color: #D4D4D3;
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