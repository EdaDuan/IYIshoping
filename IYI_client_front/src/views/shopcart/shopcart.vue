<template>
  <div id="myshopcart">
    <div v-if="$store.state.ifLogin" id="shopcart">
      <div class="banner">
        我的购物车
        <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
      </div>
      <el-table
        class="shopcart-table"
        ref="multipleTable"
        :data="shopcartData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          align="center"
          label="全选"
          type="selection"
          width="100"
        >
        </el-table-column>
        <el-table-column prop="img" width="150">
          <template slot-scope="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.cover"
              :fit="fit"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品名称"
          width="300"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="price"
          label="单价"
          header-align="center"
          align="center"
        >
          <template slot-scope="scope">￥ {{ scope.row.price }}</template>
        </el-table-column>
        <el-table-column label="数量" header-align="center" align="center">
          <template slot-scope="scope">
            <el-input-number
              size="mini"
              v-model="scope.row.count"
              @change="handleChange(scope.row.count, scope.row.id)"
              :min="1"
              :max="10"
              label="描述文字"
            >
            </el-input-number>
          </template>
        </el-table-column>
        <el-table-column
          prop="subtotal"
          label="小计"
          header-align="center"
          align="center"
          width="250"
        >
          <template slot-scope="scope"
            >￥ {{ scope.row.count * scope.row.price }}</template
          >
        </el-table-column>
        <el-table-column
          width="120"
          label="操作"
          header-align="center"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <CartBar
        :multipleSelection="multipleSelection"
        :shopcartData="shopcartData"
        :isFixed="isFixed"
        @delChecked="delChecked"
      ></CartBar>
      <Order
        :multipleSelection="multipleSelection"
        :shopcartData="shopcartData"
      ></Order>
    </div>
    <div class="unlogin-tip" v-else>
      <p>您还没有登录哦~</p>
      <p>登录后即可查看您的购物车</p>
      <a class="button2" @click="shopcartLogin" href="javascript:;">立即登录</a>
      <!-- <button @click="shopcartLogin">立即登录</button> -->
    </div>
    <Bottom></Bottom>
  </div>
</template>

<script>
import bus from "../../bus/bus";
import Bottom from "../../components/bottom/bottom.vue";
import CartBar from "./shopcartchildcomps/cartbar.vue";
import Order from "./shopcartchildcomps/order.vue";
export default {
  data() {
    return {
      //商品数理计数器默认初始值
      num: 1,
      //商品图片的显示样式
      fit: "cover",
      //合计栏的定位
      isFixed: false,
      //购物车的信息
      shopcartData: this.$store.state.shopcartData,
      //勾选的商品信息
      multipleSelection: [],
      //判断是否登录

      //  段发钰
      topbarshowNum: 0,
      timer:null
    };
  },
  created() {
    // this.shopcartData = this.$store.state.shopcartData;
    // 如果是登录状态，在切换到组件的时候更新最新数据，没有登录就不请求
    if (localStorage.getItem("user")) {
      this.$store.commit('changeLogin',true);
      this.$http
        .get("/getCartData", {
          params: {
            id: JSON.parse(localStorage.getItem("user"))[0].id,
          },
        })
        .then((res) => {
          this.$store.commit("setCartData", res.data);
          //9.5 杨双星 新增 所有请求完数据的地方都需要加上
          let checkedArr = [];
          res.data.forEach((item, index) => {
            if (item.checked) {
              checkedArr.push(item);
            }
          });
          this.toggleSelection(checkedArr);
          // 段发钰 bus操作的导航栏购物车数量
          this.topbarshowNum = 0;
          for (let i = 0; i < res.data.length; i++) {
            this.topbarshowNum += res.data[i].count;
          }
          bus.$emit("topbarshowNum", this.topbarshowNum);
        })
        .catch((err) => {
          console.log(err);
        });
    }else{

    }
  },
  mounted() {
    bus.$on('checkEvent',(checkedArr)=>{
          this.toggleSelection(checkedArr);
    })
    //滚动事件，判断总计栏是否fixed
    window.onscroll = () => {
      let cart = document.querySelector("#shopcart");

      if (!!cart) {
        let cartBottom;
        if (this.isFixed) {
          cartBottom = cart.getBoundingClientRect().bottom + 115;
        } else {
          cartBottom = cart.getBoundingClientRect().bottom;
        }
        if (cartBottom < window.innerHeight) {
          this.isFixed = false;
        } else {
          this.isFixed = true;
        }
      }
    };
  },
  beforeDestroy() {
    window.onscroll = null;
  },
  watch:{
  },
  methods: {
    //去登录
    shopcartLogin() {
      bus.$emit("shopcartLogin");
    },
    //复选框的点击
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // timer = setTimeout(()=>{},)
      let gidArr = this.multipleSelection.map(function(item) {
        return item.id;
      });
      let gidStr = gidArr.join(",");
      this.$http.get("/checkShopcart", {
        params: {
          id: JSON.parse(localStorage.getItem("user"))[0].id,
          gids: gidStr,
        },
      });
    },
    //商品的勾选方法
    toggleSelection(rows) {
      // rows = [this.shopcartData[1], this.shopcartData[2]];
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    //商品数量调整
    handleChange(value, gid) {
      this.$http
        .get("/getCartData", {
          params: {
            id: JSON.parse(localStorage.getItem("user"))[0].id,
            gid: gid,
            count: value,
          },
        })
        .then((res) => {
          this.$store.commit("setCartData", res.data);
          //9.5 杨双星 新增 所有请求完数据的地方都需要加上
          let checkedArr = [];
          res.data.forEach((item, index) => {
            if (item.checked) {
              checkedArr.push(item);
            }
          });
          this.toggleSelection(checkedArr);
          // 段发钰 bus操作的导航栏购物车数量
          this.topbarshowNum = 0;
          for (let i = 0; i < res.data.length; i++) {
            this.topbarshowNum += res.data[i].count;
          }
          bus.$emit("topbarshowNum", this.topbarshowNum);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //单个删除按钮
    handleDelete(index, row) {
      //先弹出提示框，是否确认删除
      let gidStr = String(row.id);
      this.deleteThis(gidStr);
    },
    //删除方法，仅可被其他方法调用，不可直接调用
    deleteThis(gidStr) {
      //需要传一个字符串以“，”隔开

      this.$confirm("您确定要删除该商品么?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.$http
            .get("/delCartData", {
              params: {
                id: JSON.parse(localStorage.getItem("user"))[0].id,
                gids: gidStr,
              },
            })
            .then((res) => {
              this.$store.commit("setCartData", res.data);
              //9.5 杨双星 新增 所有请求完数据的地方都需要加上
              let checkedArr = [];
              res.data.forEach((item, index) => {
                if (item.checked) {
                  checkedArr.push(item);
                }
              });
              this.toggleSelection(checkedArr);
              // 段发钰 bus操作的导航栏购物车数量
              this.topbarshowNum = 0;
              for (let i = 0; i < res.data.length; i++) {
                this.topbarshowNum += res.data[i].count;
              }
              bus.$emit("topbarshowNum", this.topbarshowNum);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //批量删除勾选商品
    delChecked() {
      let gidArr = this.multipleSelection.map(function(item) {
        return item.id;
      });

      let gidStr = gidArr.join(",");
      this.deleteThis(gidStr);
    },
  },
  components: {
    CartBar,
    Bottom,
    Order,
  },
};
</script>
<style>
#myshopcart .unlogin-tip {
  box-sizing: border-box;
  width: 100%;
  height: 320px;
  background-image: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599236751356&di=e5e146981f5c40f3ca29d45c12528549&imgtype=0&src=http%3A%2F%2Fimg1.imgtn.bdimg.com%2Fit%2Fu%3D316319481%2C1142789276%26fm%3D214%26gp%3D0.jpg");
  background-repeat: no-repeat;
  background-position: 150px center;
  /* background-color: #fff; */
  font-size: 28px;
  padding-top: 50px;
  text-align: center;
}
#myshopcart .unlogin-tip p {
  width: 500px;
  margin-left: 750px;
  margin-bottom: 20px;
  color: transparent;
  font-weight: bold;
  background: linear-gradient(45deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
  -webkit-background-clip: text;
}

#myshopcart .unlogin-tip .button2 {
  display: block;
  position: relative;
  /*按钮大小*/
  width: 200px;
  height: 60px;
  margin-left: 888px;
  font-family: sans-serif;
  /*字体大小*/
  font-size: 24px;
  /*此处需和height一致*/
  line-height: 60px;
  text-align: center;
  text-decoration: none;
  /*字体颜色*/
  color: #fff;
  /*炫光的颜色（可使用图片代替）*/
  background: linear-gradient(45deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
  background-size: 400%;
  /*需为高度一半*/
  border-radius: 50px;
  z-index: 1;
}

#myshopcart .unlogin-tip .button2::before {
  content: "";
  position: absolute;
  /*按钮四周的模糊效果大小*/
  top: -7px;
  left: -7px;
  right: -7px;
  bottom: -7px;
  z-index: -1;
  /*需与a中一致*/
  background: linear-gradient(45deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
  background-size: 400%;
  /*需与a中一致*/
  border-radius: 50px;
  /*滤镜效果blur(20px)：模糊效果 brightness(105%)：亮度 contrast(120%)：对比度*/
  filter: blur(20px) brightness(105%) contrast(120%);
  opacity: 0;
  /*阴影出现时间*/
  transition: 0.5s;
}

#myshopcart .unlogin-tip .button2:hover {
  /*动画设置*/
  animation: dazzlelight 4s infinite;
}

#myshopcart .unlogin-tip .button2:hover::before {
  opacity: 1;
  /*动画设置 需与a:hover一致*/
  animation: dazzlelight 4s infinite;
}

@keyframes dazzlelight {
  0% {
    background-position: 0;
  }
  100% {
    background-position: 400%;
  }
}

/* #myshopcart .unlogin-tip button {
  padding: 10px 20px;
  border: 2px solid orange;
  border-radius: 5px;
  transition: all 0.2s;
  margin-left: 400px;
}
#myshopcart .unlogin-tip button:hover {
  border-color: orangered;
} */
#myshopcart #shopcart {
  width: 88%;
  min-width: 1250px;
  margin: 0 auto 20px;
  background-color: #f5f5f5;
}

#myshopcart #shopcart .banner {
  box-sizing: border-box;
  padding-left: 160px;
  padding-top: 20px;
  width: 100%;
  height: 100px;
  border-bottom: 2px solid orangered;
  background-color: #fff;
  line-height: 70px;
  font-size: 32px;
  color: #333;
}

#myshopcart #shopcart .banner span {
  font-size: 12px;
  color: slategray;
}

#myshopcart #shopcart .el-checkbox__inner {
  width: 20px;
  height: 20px;
}

#myshopcart #shopcart .shopcart-table {
  /* margin-top: 50px; */
  margin-bottom: 50px;
  box-shadow: 0 0 16px -3px rgba(0, 0, 0, 0.1);
}

/* tbody-样式 */
#myshopcart .el-table__header-wrapper .has-gutter {
  padding: 10px 0;
  font-weight: normal;
  color: #606266;
}

#myshopcart .el-checkbox__input.is-indeterminate .el-checkbox__inner::before {
  content: "";
  position: absolute;
  display: block;
  background-color: #fff;
  height: 5px;
  transform: scale(0.5);
  left: 0;
  right: 0;
  top: 7px;
}

#myshopcart .el-checkbox__inner::after {
  box-sizing: content-box;
  content: "";
  border: 2px solid #fff;
  border-left: 0;
  border-top: 0;
  height: 12px;
  left: 6px;
  position: absolute;
  top: 0;
  transform: rotate(45deg) scaleY(1);
  width: 5px;
}

#myshopcart .el-input-number--mini {
  width: 130px;
  line-height: 34px;
}

#myshopcart .el-input--mini .el-input__inner {
  height: 36px;
  line-height: 36px;
}

#myshopcart .el-input-number--mini .el-input__inner {
  padding-left: 28px;
  padding-right: 28px;
}

#myshopcart [class^="el-icon-"] {
  font-weight: bold;
}

#myshopcart
  .el-input-number--mini
  .el-input-number__increase
  [class*="el-icon"] {
  transform: scale(0.9);
}

/* 全选按钮字段 */
#myshopcart
  .el-table__header-wrapper
  .el-table_1_column_1
  .el-checkbox::before {
  content: "多选";
  position: absolute;
  top: 0;
  left: 30px;
  font-weight: bold;
  /* font-size: 14px; */
}

#myshopcart .el-table_1_column_5 .el-input__inner {
  font-size: 14px;
}

#myshopcart .el-table__body-wrapper .el-table__row {
  font-size: 16px;
  color: #424242;
  font-weight: 600;
  padding: 0 20px;
}

/* tbody-小计列样式 */
#myshopcart .el-table__body .el-table_1_column_6 {
  color: orangered;
}
#myshopcart .el-table_1_column_6.is-center {
  color: orangered !important;
}
/* tbody-商品名称列样式 */
#myshopcart .el-table__body .el-table_1_column_3 {
  font-weight: normal;
}

/* 删除商品弹框 */
#myshopcart .el-message-box .el-message-box__header {
  text-align: center;
  font-weight: bold;
}

#myshopcart .el-message-box .el-message-box__content {
  margin: 30px 50px 50px;
  font-size: 18px;
  color: #606266;
}

#myshopcart .el-message-box .el-message-box__btns {
  text-align: center;
}

#myshopcart .el-message-box__status + .el-message-box__message {
  padding-left: 40px;
}

#myshopcart .el-message-box__content {
  padding-left: 34px;
}
</style>
