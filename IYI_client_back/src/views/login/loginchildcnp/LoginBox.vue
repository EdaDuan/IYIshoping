<!--  -->
<template>
  <div>
    <div class="login-box">
      <h1>易购后台管理系统</h1>
      <label><input type="text" v-model.lazy="adminname" placeholder="账户"></label>
      <p v-html="usertip"></p>

      <label><input type="password" v-model="password" placeholder="密码"></label>
      <p v-html="pwdtip"></p>

      <div class="btns">
        <button type="button" @click="login" :disabled="isdisable">登录</button>
      </div>
    </div>

  </div>

</template>


<script>
  export default {
    name: '',
    data() {
      return {
        adminname: "",
        password: "",
        userflag: false,
        pwdflag: false,
        usertip: "",
        pwdtip: ""
      };
    },
    methods: {

      login() {
        //发送登录请求  
        this.$http.post("/adminLogin", {
          adminname: this.adminname,
          password: this.password
        }).then(r => {
          if (r.data.code == 0) {
            this.$message({
              showClose: true,
              message: '账户不存在',
              type: 'error',
              center: true,
              duration: 1000,
              offset: 160
            });
          } else if (r.data.code == 1) {
            this.$message({
              showClose: true,
              message: '密码错误',
              type: 'error',
              center: true,
              duration: 1000,
              offset: 160
            });
          } else if (r.data.code == 2) {
            //登录成功之后存成localstroage,在 localstroage中拿到用户的id值
            localStorage.setItem("admin", JSON.stringify(r.data.user))

            this.$message({
              showClose: true,
              message: '登录成功',
              type: 'success',
              center: true,
              duration: 1000,
              offset: 160
            });
            this.$router.replace('/home')
          }
        }).catch(err => {
          console.log(err)
        })
      }
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
      adminname() {
        if (this.adminname.length < 2 || this.adminname.length > 8) {
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

  h1 {
    color: rgb(167, 223, 243);
  }

  .login-box {
    width: 400px;
    height: 350px;
    margin: 0 auto;
    margin-top: 200px;
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
    box-shadow: 5px 2px 5px gainsboro;
    transition: all 0.2s linear;
  }

  .login-box p {
    position: absolute;
    left: 10%;
  }

  .login-box p:nth-of-type(1) {
    top: 160px;
  }

  .login-box p:nth-of-type(2) {
    top: 250px;
  }

  .btns button {
    width: 100px;
    height: 35px;
    margin: 0 30px;
  }
</style>