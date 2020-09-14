<template>
  <div id="order">
    <el-dialog
      title=""
      :visible.sync="orderVisible"
      width="60%"
      top="20px"
      :before-close="orderClose"
    >
      <div class="line"></div>
      <div class="address">
        <h2 class="title">收货地址</h2>
        <div class="address-list">
          <div v-for='(item,index) in addressInfo' :key='index' @click="chooseAddress" :class="['addressBox',{on:item.is_default}]">
            <h2 class="username">{{item.username}}</h2>
            <div class="phoneNum">{{item.phone}}</div>
            <div class="address-big">{{item.province}} {{item.city}} {{item.district}}</div>
            <div class="'address-small">{{item.address}}</div>
          </div>
        </div>
      </div>
      <div class="products">
        <h2 class="title">商品清单</h2>
        <div class="products-list">
          <ul>
            <li v-for='(item,index) in multipleSelection' :key='index'>
              <div class="mini-img">
                <img
                  :src= item.cover
                  alt=""
                />
              </div>
              <div class="product-name">{{item.name}}</div>
              <div class="count">{{item.price}}元 × {{item.count}}</div>
              <div class="subtotal">{{item.price * item.count}}元</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="shipping">
        <h2 class="title">配送方式</h2>
        <div class="shipping-way">包邮</div>
      </div>
      <div class="bill">
        <h2 class="title">发票</h2>
        <div class="bill-info">
          <div class="bill-kind">电子普通发票 个人 商品明细</div>
          <div class="bill-list">
            <div class="item-name">
              <div>商品件数：</div>
              <div>商品总价：</div>
              <div>活动优惠：</div>
              <div>优惠券抵扣：</div>
              <div>运费：</div>
              <div>应付总额：</div>
            </div>
            <div class="item-value">
              <div>{{total_count}}件</div>
              <div>{{total_price}}元</div>
              <div>-0元</div>
              <div>-0元</div>
              <div>0元</div>
              <div>{{should_pay}}元</div>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="orderVisible = false">取消</el-button>
        <el-button type="primary" @click="submitOrder">提交订单</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Bus from "../../../bus/bus.js";
export default {
  data() {
    return {
      orderVisible: false, //false
      addressInfo:[]
    };
  },
  props: {
    shopcartData: {
      type: Array,
    },
    multipleSelection: {
      type: Array,
    },
  },
  computed:{
    total_count(){
      let result = this.multipleSelection.reduce(function(total, val, index) {
        return (total += val.count);
      }, 0);
      return result;
    },
    total_price(){
      let result = this.multipleSelection.reduce(function(total, val, index) {
        return (total += val.count * val.price);
      }, 0);
      return result;
    },
    should_pay(){
      return this.total_price;
    }
  },
  created(){
    this.$http.get('/getAddress',{
      params:{
        id: JSON.parse(localStorage.getItem("user"))[0].id
      }
    })
    .then(res=>{
      this.addressInfo = res.data;
    })
    .catch(err=>{})
  },
  
  mounted() {
    Bus.$on("showOrder", () => {
      this.showOrder();
    });
  },
  methods: {
    //弹出订单表
    showOrder() {
    console.log(this.multipleSelection);
      this.orderVisible = true;
    },
    //关闭订单表
    orderClose() {
      //可以传回调
      this.$confirm("确认关闭？")
        .then((_) => {
          //参数_ 是string confirm
          this.orderVisible = false;
        })
        .catch((_) => {
          //参数_ 是string cancel
        });
    },
    //选择地址
    chooseAddress(e) {
      let addressBoxs = document.querySelectorAll(".addressBox");
      for (let i = 0; i < addressBoxs.length; i++) {
        addressBoxs[i].classList.remove("on");
      }
      if (e.target.matches(".addressBox")) {
        e.target.classList.add("on");
      }else{
        e.target.parentNode.classList.add("on");
      }
    },
    submitOrder() {
      let gidArr = this.multipleSelection.map(function(item) {
        return item.id;
      });
      let gidStr = gidArr.join(",");
      let countObj = {};
      for(let i =0;i<this.multipleSelection.length;i++){
        let temp = this.multipleSelection[i].id;
        countObj[temp] = this.multipleSelection[i].count;
      }
      this.$http.post("/submitOrder", {
        id: JSON.parse(localStorage.getItem("user"))[0].id,
        gids: gidStr,
        countObj,
      })
      .then(res=>{
        this.$store.commit("setCartData", res.data);
      
          // 9.4杨双星 新增了提交订单功能，需要刷新购物车数量，
          //帮段总触发了一下刷新操作
          let topbarshowNum = 0;
          for (let i = 0; i < res.data.length; i++) {
            topbarshowNum += res.data[i].count;
          }
          Bus.$emit("topbarshowNum", topbarshowNum);
      })
      .catch(err=>{});
      //关闭订单表
      this.orderVisible = false;
    },
  },
};
</script>

<style>
#order li {
  list-style: none;
}
#order .el-dialog {
  min-width: 900px;
}
#order .line {
  height: 0;
  border-bottom: 2px solid olivedrab;
}
#order .line::before {
  content: "确认订单";
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 15px;
  font-size: 28px;
  font-weight: 500;
  color: olivedrab;
}
#order .title {
  margin-top: 20px;
  margin-bottom: 20px;
}
#order .address-list {
  display: flex;
  justify-content: flex-start;
}
#order .addressBox {
  width: 160px;
  height: 100px;
  padding: 20px;
  border: 1px solid #ccc;
  cursor: pointer;
  margin-right: 14px;
  transition: all 0.2s;
}
#order .addressBox.on{
  border-color: orangered;
}
#order .addressBox:hover {
  border-color: rgb(75, 212, 75);
}
#order .addressBox .username {
  font-weight: normal;
  margin-bottom: 10px;
}
#order .addressBox .phoneNum {
  font-size: 16px;
  margin-bottom: 8px;
}
#order .addressBox .address-big {
  margin-bottom: 4px;
}
#order .products-list {
  max-height: 600px;
  overflow-y: auto;
  overflow-x: hidden;
}
#order .products-list li {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}
#order .products-list .mini-img {
  width: 40px;
  height: 40px;
  margin-right: 35px;
  margin-bottom:10px;
}
#order .products-list .mini-img img {
  width: 100%;
  height: 100%;
}
#order .products-list .product-name {
  width: 350px;
  margin-right: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
#order .products-list .count {
  margin-right: 150px;
  width: 100px;
  text-align: center;
}
#order .products-list .subtotal {
  color: orangered;
}
#order .shipping {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
#order .shipping .shipping-way {
  font-size: 18px;
  line-height: 20px;
  margin-left: 100px;
  color: orangered;
}
#order .bill-info {
  overflow: hidden;
}
#order .bill-kind {
  color: orangered;
}
#order .bill-list {
  float: right;
  overflow: hidden;
  font-size: 16px;
}
#order .bill-list .item-name {
  float: left;
  text-align: right;
}
#order .bill-list .item-name div {
  margin-bottom: 10px;
}
#order .bill-list .item-value {
  float: right;
  width: 150px;
  margin-right: 50px;
  text-align: right;
  color: orangered;
}
#order .bill-list .item-value div {
  margin-bottom: 10px;
}
#order .bill-list .item-name div:last-child {
  /* font-size: 24px; */
  line-height: 30px;
}
#order .bill-list .item-value div:last-child {
  font-size: 24px;
}
</style>
