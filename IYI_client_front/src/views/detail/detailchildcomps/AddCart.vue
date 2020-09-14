<template>
  <div class='addCart'>
    <!-- 	el-icon-shopping-cart-2 -->
    <!-- *********************点击加入购物车*************************** -->
    <el-button :plain='true' @click='addCar'>
      <i class='el-icon-shopping-cart-2'></i>
      加入购物车
    </el-button>
    <!-- <div @click='addCar'>
      <i class='el-icon-shopping-cart-2'></i>
      加入购物车
    </div>-->
  </div>
</template>

<script>
import bus from "../../../bus/bus"
export default {
  data() {
    return {
      goodsDtail: []
    }
  },
  props: [
    'num'
  ],
  mounted() {
    bus.$on('goodsDtail', goodsDtail => {
      this.goodsDtail = goodsDtail;
    })
  },
  methods: {
    // 加入购物车
    addCar() {
      let user = JSON.parse(localStorage.getItem("user"));
      let price = this.goodsDtail.price;
      if (user === null) {
        alert("没有登录，请登录！");
        bus.$emit("showbox");
      } else {
        let uid = user[0].id;
        let num = this.num;
        let gid = this.$route.query.gid
        let url = `/addCartData`;
        this.$http
          .post(
            url, {
            uid,
            num,
            gid,
            price
          },
          ).then(res => {
            console.log(res.data);
            // 成功的弹框信息
            this.$message({
              showClose: true,
              message: '恭喜你，添加成功',
              type: 'success'
            });
            
            let topBarNum=Number(localStorage.getItem("topbarshowNum"))
            topBarNum+=num;
            localStorage.setItem("topbarshowNum",topBarNum)
            this.$router.go(0)
          });
      }

    }
  }

}
</script>

<style scope>
.addCart {
  cursor: pointer;
}
/* #add8e6 */
.is-plain {
  width: 300px;
  height: 48px;
  font-size: 26px;
  background-color: #add8e6;
}
.addCart .is-plain:hover {
  background-color: #52bfff;
  color: #fff;
}
/* el-button el-button--default is-plain */
/* el-button el-button--default */
</style>