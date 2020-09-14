<!--  -->
<template>
  <div class="login-or-regist">
    <el-dialog top="25vh" :visible.sync="dialogVisible" width="40%" center>

      <div class="btns">
        <button :class={choose:ischoose} @click="ischoose=true">登录</button>
        <button :class={choose:!ischoose} @click="ischoose=false">注册</button>
      </div>
      <div class="login-box" v-if="ischoose">
        <login></login>
      </div>
      <div class="regist-box" v-else>
        <regist></regist>
      </div>

    </el-dialog>
  </div>
</template>


<script>
  import bus from "../../bus/bus.js";
  import login from "./loginorregist/login.vue"
  import regist from "./loginorregist/regist.vue"

  export default {
    data() {
      return {
        dialogVisible: false,
        ischoose: true
      };
    },
    components: {
      login,
      regist
    },
    // 对两个事件进行监听
    created() {
      bus.$on("showbox", () => {
        this.dialogVisible = true
      })
      bus.$on("closebox", () => {
        this.dialogVisible = false
      })
    },
    methods: {

    }
  };
</script>


<style scoped>
  /* @import url(); 引入公共css类 */
  .login-or-regist {
    text-align: center;
  }

  .loginbox {
    width: 200px;
    height: 200px;
    background-color: aqua;
    margin: 0 auto;
  }

  .btns {
    width: 80%;
    margin: 20px auto;
    display: flex;
    font-size: 25px;
  }

  .btns button {
    flex: 1;
    height: 50px;
    outline: none;
    border: none;
    border-bottom: 3px solid transparent;
  }

  .btns button:focus {
    background-color: #90d4fb;
    transition: all 0.5s linear;
  }

  .btns .choose {
    background-color: #8fcff5;
    border-bottom: 3px solid gray;
  }
</style>