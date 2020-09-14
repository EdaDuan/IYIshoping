<!--  -->
<template>
  <div>
    <div class="login-box">
      <label><input type="text" v-model.lazy="username" placeholder="账户"></label>
      <p class="password-tip" v-html="usertip"></p>

      <label><input type="password" v-model="password" placeholder="密码"></label>
      <p class="password-tip" v-html="pwdtip"></p>

      <div class="btns">
        <button type="button" @click="login" :disabled="isdisable">登录</button>
        <button type="button" @click="cancle">取消</button>
      </div>
    </div>
  </div>

</template>


<script>
  import bus from "../../../bus/bus.js"
  export default {
    name: '',
    components: {},
    data() {
      return {
        username: "",
        password: "",
        userflag: false,
        pwdflag: false,
        usertip: "",
        pwdtip: ""
      };
    },
    methods: {
      cancle() {
        bus.$emit("closebox")
      },
      login() {
        //发送登录请求
        this.$http.post("/userLogin", {
          username: this.username,
          password: this.password
        }).then(r => {

          if (r.data.code == 0) {
            this.usertip = "<span style='color: red;'>用户名不存在</span>"
          } else if (r.data.code == 1) {
            this.pwdtip = "<span style='color: red;'>密码错误</span>"
          } else if (r.data.code == 2) {
            //登录成功之后存成localstroage,在 localstroage中拿到用户的id值
            alert("登录成功")
            localStorage.setItem("user", JSON.stringify(r.data.user))
            bus.$emit("closebox")
            bus.$emit("successLogin")
            //杨双星+++
            this.getCartData()
            this.$store.commit('changeLogin', true);

          }
        }).catch(err => {
          console.log(err)
        })
      },
      getCartData() {
        this.$http
          .get("/getCartData", {
            params: {
              id: JSON.parse(localStorage.getItem("user"))[0].id,
            },
          })
          .then((res) => {
            this.$store.commit("setCartData", res.data);
            //9.5 杨双星 新增 
            let checkedArr = [];
            res.data.forEach((item, index) => {
              if (item.checked) {
                checkedArr.push(item);
              }
            });
            bus.$emit("checkEvent", checkedArr);
            // 段发钰 bus操作的导航栏购物车数量
            let topbarshowNum = 0;
            for (let i = 0; i < res.data.length; i++) {
              topbarshowNum += res.data[i].count
            }
            bus.$emit('topbarshowNum', topbarshowNum);
          })
          .catch((err) => {
            console.log(err);
          });
      },
    },
    computed: {
      isdisable() {
        if (this.userflag && this.pwdflag) {
          return false
        } else {
          return true
        }
      }
    },
    watch: {
      username() {
        if (this.username.length < 2 || this.username.length > 8) {
          this.usertip = "<span style='color: red;'>用户名长度不符合规范</span>"
          this.userflag = false;
        } else {
          this.usertip = ""
          this.userflag = true;
        }
      },

      password() {
        if (this.password.length < 8 || this.password.length > 16) {
          this.pwdtip = "<span style='color: red;'>密码长度为6-18位</span>"
          this.pwdflag = false;
        } else {
          this.pwdtip = ""
          this.pwdflag = true;
        }
      }
    }

  }
</script>


<style scoped>
  /* @import url(); 引入公共css类 */
  .fail {
    color: red;
  }

  .login-box {
    width: 80%;
    height: 250px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    position: relative;
  }

  .login-box label {
    width: 100%;
    text-align: center;
  }

  .login-box input {
    width: 80%;
    height: 40px;
    border-radius: 5px;
    outline: none;
    padding-left: 10px;
    background-color: whitesmoke;
  }

  .login-box input:focus {
    box-shadow: 5px 5px 5px gainsboro;
    transition: all 0.2s linear;
  }

  .login-box p {
    position: absolute;
    margin: 0;
    left: 10%;
  }

  .login-box p span {
    font-size: 14px;
  }

  .login-box p:nth-of-type(1) {
    top: 70px;
  }

  .login-box p:nth-of-type(2) {
    top: 160px;
  }

  .btns button {
    width: 80px;
    height: 30px;
    margin: 0 30px;
  }
</style>