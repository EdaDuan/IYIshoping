<template>
  <div class="personbigbox">
    <div class="personbox">
      <h1>个人中心</h1>
      <div class="topbox">
        <div class="headimgbox">
          <img :src="personinf.headimg" alt class="headimg" id="myImg" />
          <!-- <button>更改头像</button> -->
          <input type="file" id="myFile" style="margin:10px">
        </div>
        <div class="namebox">
          <!-- 用户名字部分 -->
          <p style="font-size:18px;margin:10px 0">个性名称</p>
          <h2 v-if="isname">{{personinf.username}}</h2>
          <div v-else class="userinbox">
            <el-input v-model="usernamein" placeholder="请输入内容" class="elinputname"
              style="width:64%;display:inline-block;"></el-input>
            <!-- <button @click="sure">确定</button> -->
            <el-button size="mini" @click.native="sureUsername" style="display:inline-block;">确定</el-button>
            <p v-html="usertip"></p>
          </div>
          <!-- <button @click="isupdatename" style="display:block">点击修改名字</button> -->
          <el-button size="small" @click.native="isupdatename">点击修改名字</el-button>
        </div>
      </div>
      <!-- 用户密码部分 -->
      <div class="pwdbox" v-if="ispwd">
        <p>个人密码：</p>
        <el-input v-model="pwd" :disabled="true" placeholder="请输入内容"
          style="width:30%;display:inline-block;margin:16px 0"></el-input>
        <el-button size="mini" @click.native="updatepwd">修改密码</el-button>
      </div>
      <div class="updatepwdbox" v-else>
        <p class="tips">请输入原始密码</p>
        <el-input v-model="pwdin" placeholder="请输入原始密码:" style="width:30%;display:inline-block;margin-top:6px">
        </el-input>
        <p v-html="pwdtip"></p>
        <p class="tips">请输入新密码</p>
        <el-input v-model="newpwdin" placeholder="请输入新密码:" style="width:30%;display:inline-block;margin-top:6px">
        </el-input>
        <p v-html="newpwdtip"></p>
        <el-button size="mini" @click.native="surePwd" style="margin:6px">确定</el-button>
        <el-button size="mini" @click.native="canclePwd" style="margin:6px">取消</el-button>
      </div>
      <!-- 用户电话号码部分 -->
      <div class="phonebox" v-if="isphone">
        <p>电话号码:</p>
        <span>{{personinf.phone}}</span>
        <el-button size="mini" @click.native="updatephone" style="margin:10px">修改电话号码</el-button>
      </div>
      <div class="phoneupbox" v-else>
        <el-input v-model="phonein" :disabled="false" placeholder="请输入电话号码"
          style="width:30%;display:inline-block;margin:10px 0"></el-input>
        <p v-html="phonetip"></p>
        <el-button size="mini" @click.native="surePhone" style="margin:10px">确定</el-button>
        <el-button size="mini" @click.native="canclePhone" style="margin:10px">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import bus from "../../bus/bus";
  export default {
    data() {
      return {
        personinf: {},
        isname: "false",
        usertip: "账户名由2-8个字符组成",
        usernamein: "",
        pwd: "***********",
        pwdin: "",
        newpwdin: "",
        pwdtip: "",
        newpwdtip: "密码8-16位数组，字母，下划线组成，字母开头",
        ispwd: true,
        isphone: "false",
        phonein: "",
        phonetip: "输入新的手机号",
        isheadimg: false
      };
    },
    created() {
      this.personinf = this.$route.query;
      this.usernamein = this.personinf.name;
      console.log(this.personinf);
      //根据id查手机号
      this.$http.get('/getphone', {
        params: {
          userid: this.personinf.id
        }
      }).then((res) => {
        console.log(res.data);
        this.personinf = res.data[0];
      })
    },
    mounted() {
      //上传头像
      let myFile = document.getElementById('myFile');
      myFile.onchange = () => {
        let choose_file = myFile.files[0];
        let formData = new FormData();
        console.log(this.personinf.id)
        //这里需要判断  如果变化之后没有文件的情况
        formData.append("uploadFile", choose_file, choose_file.name);
        formData.append("userid", this.personinf.id);
        const config = {
          headers: {
            "Content-Type": "multipart/form-data;boundary=" + new Date().getTime()
          }
        };
        let fType = choose_file.name.substring(choose_file.name.lastIndexOf('.') + 1);
        if (fType == 'jpg' || fType == 'png' || fType == 'jpeg' || fType == 'JPG') {
          let size = choose_file.size / 1024 / 1024;
          if (size > 2) {
            alert('文件不能超过2M');
            return false;
          }
          let reader = new FileReader();
          reader.readAsDataURL(choose_file);
          reader.onload = function () {
            let myImg = document.getElementById('myImg');
            myImg.setAttribute('src', this.result);
          }
          this.isheadimg = !this.isheadimg
          bus.$emit("headimgchange", this.isheadimg);
          // this.personinf.headimg=newimg;
          this.uploadPic(formData, config);
        } else {
          alert('文件格式不正确');
          return false;
        }
      }
    },
    methods: {

      //上传头像
      uploadPic(formData, config) {
        // console.log(this.personinf.id);
        this.$http.post('/uploadPic', formData, config).then(res => {
          console.log('文件上传成功');
          console.log(res.data);
         bus.$emit("headimgchange")
        }).catch(err => {
          console.log(err);
          console.log('上传文件ajax出错');
        })
      },
      //修改用户名字
      isupdatename() {
        this.isname = !this.isname;
      },
      // 确定修改用户名字 
      sureUsername() {
        if (this.usernamein != undefined && this.usernamein.length > 0 && this.usernamein.length <= 8) {
          this.$http
            .post("/checkUserName", {
              username: this.usernamein.trim(),
            })
            .then((r) => {
              if (r.data.length == 1) {
                //说明用户名已存在
                this.usertip = "<span style='color: red;'>用户名已经存在</span>";
                // this.userflag = false;
              } else {
                //说明用户名不存在，可以注册
                this.usertip = "<span style='color: green;'>恭喜用户名可用</span>";
                // this.userflag = true;
                this.$http
                  .post("/updateusername", {
                    userid: this.personinf.id,
                    username: this.usernamein,
                  })
                  .then((res) => {
                    this.personinf.username = res.data;
                    bus.$emit("username", res.data);
                    this.isname = !this.isname;
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            })
            .catch((err) => console.log(err));
        } else {
          this.usertip = "<span style='color: red;'>用户名不能为空</span>";
        }
      },


      //修改密码
      updatepwd() {
        this.ispwd = !this.ispwd;
      },
      //确认修改密码 发起ajax请求修改后台数据
      surePwd() {
        //验证原始密码是否正确
        if (this.pwdin != undefined && this.pwd.length > 8 && this.pwd.length <= 16) {
          this.$http.post("/userLogin", {
            username: this.personinf.username,
            password: this.pwdin
          }).then(r => {
            console.log(r.data)
            if (r.data.code == 1) {
              this.pwdtip = "<span style='color: red;'>密码错误</span>";
            } else if (r.data.code == 2) {
              this.pwdtip = "<span style='color: green;'>密码正确</span>";
              let res = this.password(this.newpwdin);
              if (res) {
                this.$http.post("/updateuserpwd", {
                  userid: this.personinf.id,
                  userpwd: this.newpwdin,
                }).then((res) => {
                  console.log(res.data);
                  if (res.data == 1) {
                    alert("密码修改成功");
                    this.pwdin = "";
                    this.newpwdin = "";
                    this.pwdtip = "",
                      this.newpwdtip = "密码8-16位数组，字母，下划线组成，字母开头",
                      this.ispwd = !this.ispwd;
                  } else {
                    alert("密码修改失败");
                  }
                }).catch((err) => {
                  console.log(err);
                });
              }
            }
          }).catch(err => {
            console.log(err)
          })
        }
      },
      //正则表达式验证密码是否合规范
      password(password) {
        let reg = /^[a-zA-Z][\w]{5,15}$/;
        if (reg.test(password)) {
          this.newpwdtip = "<span style='color: green;'>密码符合规范</span>";
          return true;
        } else {
          this.newpwdtip = "<span style='color: red;'>密码不符合规范</span>";
          return false;
        }
      },
      //取消修改密码
      canclePwd() {
        this.pwdtip = "";
        this.newpwdtip = "密码8-16位数组，字母，下划线组成，字母开头";
        this.ispwd = !this.ispwd;
      },



      //修改电话号码
      updatephone() {
        this.isphone = !this.isphone;
      },
      // 确定修改电话
      surePhone() {
        if (this.phonein != undefined) {
          if (this.phonein == this.personinf.phone) {
            this.phonetip = "<span style='color: red;'>修改的号码不能和原始号码相同</span>";
          } else {
            let res = this.phone(this.phonein);
            if (res) {
              this.$http.post('/updateuserphone', {
                userid: this.personinf.id,
                userphone: this.phonein
              }).then((res) => {
                // console.log(res.data);
                this.personinf.phone = res.data;
                this.phonein = "";
                this.phonetip = "输入新的手机号";
                alert("电话号码修改成功");
                this.isphone = !this.isphone;
              }).catch((err) => {
                console.log(err);
              })
            }
          }
        } else {
          this.phonetip = "<span style='color: red;'>手机号码不能为空</span>";
        }
      },
      //正则表达式验证手机号码是否正确
      phone(phone) {
        let reg = /^1[0-9]{10}$/;
        if (reg.test(phone)) {
          return true
        } else {
          this.phonetip = "<span style='color: red;'>输入正确的手机号码</span>";
          return false;
        }
      },
      //取消修改电话
      canclePhone() {
        this.phonein = "";
        this.phonetip = "输入新的手机号";
        this.isphone = !this.isphone;
      }
    },
  };
</script>

<style scoped>
  .personbigbox {
    width: 100%;
    height: 100%;
    min-height: 100vh;
    /* background-color: #F3F3F3; */
    /* background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); */
    /* background-image: linear-gradient(to top, #accbee 0%, #e7f0fd 100%); */
    background-image: linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%);
  }

  .personbox {
    width: 70%;
    min-height: 100vh;
    margin: 0 auto;
    padding: 40px;
    /* background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); */
    /* background-image: linear-gradient(to top, #accbee 0%, #e7f0fd 100%); */
    background-image: linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%);

    /* background-color: #E5E5E5; */
  }

  .topbox {
    width: 100%;
    display: flex;
    border-bottom: 3px solid white;
  }

  .headimgbox {
    width: 100px;
    height: 100px;
    background-color: #F4F4F4;
  }

  .headimg {
    width: 100%;
    height: 100%;
    border-radius: 50px;
  }

  .namebox {
    margin: 34px 300px;
  }

  .pwdbox:hover,
  .phonebox:hover,
  .updatepwdbox:hover,
  .phoneupbox:hover {
    /* transform: translateX(10px); */
    -webkit-transform: scale(1.02);
    -moz-transform: scale(1.02);
    -ms-transform: scale(1.02);
    -o-transform: scale(1.02);
    transform: scale(1.02);
    background-color: white;
  }

  .namebox p {
    margin-top: 20px;
  }

  .pwdbox,
  .updatepwdbox {
    padding: 30px;
    border-bottom: 2px solid white;
  }

  .phonebox,
  .phoneupbox {
    padding: 30px;
    border-bottom: 2px solid white;
  }

  .el-input__inner {
    height: 28px;
    display: inline-block;
  }

  .el-button--mini {
    margin-left: 20px;
  }

  .el-button--small {
    margin-top: 6px;
    height: 28px;
  }

  .userinbox {
    width: 220px;
  }

  .userinbox p {
    margin-top: 6px;
  }

  .tips {
    margin-top: 10px;
    font-size: 18px;
  }
</style>