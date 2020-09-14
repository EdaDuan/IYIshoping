<template>
  <div id="cart-bar" :class="{fixed:isFixed}">
    <!-- class="unviewed" -->
    <div class="left-box">
      <span class="deleteChecked" @click="deleteChecked">
        删除选中的商品
      </span>
      <span class="split"></span>
      <span class="info">
        共 <span>{{ allGoodsCount }}</span> 件商品，已选择
        <span>{{ checkedGoodsCount }}</span> 件
      </span>
    </div>
    <div class="right-box">
      <div class="totalPrice">
        合计：<span> {{ totalCount }} </span>元
      </div>
      <button class="balance" @click='showOrder'>
        去结算
      </button>
    </div>
  </div>
</template>

<script>
import Bus from "../../../bus/bus.js";
export default {
  data: function() {
    return {
    };
  },
  props: {
    shopcartData: {
      type: Array,
    },
    multipleSelection: {
      type: Array,
    },
    isFixed:{
      type:Boolean
    }
  },
  computed: {
    //选中的商品总价
    totalCount() {
      let result = this.multipleSelection.reduce(function(total, val, index) {
        return (total += val.count * val.price);
      }, 0);
      return result;
    },
    //所有的商品总件数
    allGoodsCount() {
      let result = this.shopcartData.reduce(function(total, val, index) {
        return (total += val.count);
      }, 0);
      return result;
    },
    //选中的商品件数
    checkedGoodsCount() {
      let result = this.multipleSelection.reduce(function(total, val, index) {
        return (total += val.count);
      }, 0);
      return result;
    },
  },
  
  methods: {
    deleteChecked() {
      this.$emit('delChecked');
    },
    //显示订单表
    showOrder(){
      if(this.multipleSelection.length === 0){
        alert('您还没有选中商品哦，快去勾选想要的商品吧！')
        return ;
      }
      Bus.$emit('showOrder');
    }
  },
};
</script>

<style scoped>
#cart-bar {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 65px;
  background-color: #fff;
  padding-left: 20px;
  box-shadow: 0 0 16px -3px rgba(0, 0, 0, 0.1);
  /* line-height: 65px; */
}
#cart-bar.fixed {
  position: fixed;
  bottom: 0;
  margin: 0 auto;
  z-index: 999;
  width: 88%;
  min-width: 1250px;
}
#cart-bar .left-box,
#cart-bar .rigth-box {
  overflow: hidden;
}
#cart-bar .left-box {
  color: #757575;
}
#cart-bar .left-box .deleteChecked {
  cursor: pointer;
  transition: color 0.2s;
}
#cart-bar .left-box .deleteChecked:hover {
  color: orangered;
}
#cart-bar .left-box .split {
  display: inline-block;
  margin: 0 15px;
  width: 1px;
  height: 18px;

  background-color: #ccc;
  vertical-align: middle;
}
#cart-bar .left-box .info span {
  color: orangered;
}
#cart-bar .right-box .totalPrice {
  display: inline-block;
  margin-right: 50px;
}
#cart-bar .right-box .totalPrice span {
  font-size: 30px;
  color: orangered;
  vertical-align: text-bottom;
}
#cart-bar .right-box .balance {
  /* display: inline-block; */
  width: 200px;
  height: 100%;
  background-color: orangered;
  color: #fff;
  font-size: 20px;
  line-height: 65px;
  outline: none;
  border: none;
  cursor: pointer;
}
</style>
