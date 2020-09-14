<!--  -->
<template>
  <div>
    <div class="login-box">
      <label><input type="text" v-model.lazy="username" placeholder="一个好听的用户名"></label>
      <p v-html="usertip"></p>

      <label><input type="password" v-model.lazy="password" placeholder="一段安全的密码"></label>
      <p v-html="pwdtip"></p>

      <label><input type="text" v-model.lazy="phone" placeholder="输入您的电话号码"></label>
      <p v-html="phonetip"></p>

      <div class="btns">
        <button type="button" @click="regist">注册</button>
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
        phone: "",
        userflag: false,
        pwdflag: false,
        phoneflag: false,
        usertip: "账户名由2-8个字符组成",
        pwdtip: "密码8-16位数组，字母，下划线组成，字母开头",
        phonetip: "输入您的手机号"
      };
    },
    methods: {
      cancle() {
        bus.$emit("closebox")
      },
      //用户名改变时验证用户是否已经存在
      checkusername() {
        if(this.username.length>0){
          this.$http.post("/checkUserName", {
          username: this.username.trim()
        }).then(r => {
          if (r.data.length == 1) {
            //说明用户名已存在
            this.usertip = "<span style='color: red;'>用户名已经存在</span>";
            this.userflag = false;
          } else {
            //说明用户名不存在，可以注册
            this.usertip = "<span style='color: green;'>恭喜用户名可用</span>";
            this.userflag = true;
          }
        }).catch(err => console.log(err))
        }
      },
      //验证手机号码是否已经存在
      checkphonenum() {
        if(this.phone.length==11){
          this.$http.post("/checkPhoneNum", {
          phone: this.phone
        }).then(r => {
          if (r.data.length == 0) {
            this.phonetip = "";
            this.phoneflag = true
          } else {
            this.phonetip = "手机号码已存在";
            this.phoneflag = false;
          }
        }).catch(err => console.log(err))
        }
      },
      regist() {

        if (this.userflag && this.pwdflag && this.phoneflag) {
          //前往注册
          this.$http.post("/userRegist", {
            username: this.username,
            password: this.password,
            phone: this.phone
          }).then(r => {
            alert("注册成功，请登录")
            this.userflag=false;
            this.phoneflag=false;
          }).catch(err => console.log(err))
        } else {
          alert("请正确填写信息")
        }
        // this.checkusername();
        // this.checkphonenum();
      }
    },
    watch: {
      username() {
        if (this.username.length < 2 || this.username.length > 8) {
          this.usertip = "<span style='color: red;'>用户名长度不符合规范</span>"
          this.userflag = false;
        } else {
          //验证用户名是否已经存在
          this.checkusername()
        }
      },

      password() {
        let reg = /^[a-zA-Z][\w]{5,15}$/;
        if (reg.test(this.password)) {
          this.pwdtip = "";
          this.pwdflag = true;

        } else {
          this.pwdtip = "<span style='color: red;'>密码不符合规范</span>";
          this.pwdflag = false;

        }
      },

      phone() {
        let reg = /^1[0-9]{10}$/;
        if (reg.test(this.phone)) {
          //验证手机号码是否存在
          this.checkphonenum()
        } else {
          this.phonetip = "<span style='color: red;'>输入正确的手机号码</span>";
          this.phoneflag = false;
        }
      }

    }

  }
</script>


<style scoped>
  /* @import url(); 引入公共css类 */

  .login-box {
    width: 80%;
    height: 300px;
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
  .login-box p span{
    font-size: 14px;
  }

  .login-box p:nth-of-type(1) {
    top: 70px;
  }

  .login-box p:nth-of-type(2) {
    top: 145px;
  }

  .login-box p:nth-of-type(3) {
    top: 225px;
  }

  .btns button {
    width: 80px;
    height: 30px;
    margin: 0 30px;
  }
</style>