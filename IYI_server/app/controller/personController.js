const Controller = require('egg').Controller;


class personController extends Controller {
    //宋宇-修改用户名称
    async updateUserName() {
      let userid = this.ctx.request.body.userid;
      let username = this.ctx.request.body.username;
      let result = await this.service.personService.updateUserName(userid,username);
      this.ctx.response.body=result;
    }
    //宋宇-修改用户密码
    async updateUserPwd() {
      let userid = this.ctx.request.body.userid;
      let userpwd = this.ctx.request.body.userpwd;
      let result = await this.service.personService.updateUserPwd(userid,userpwd);
      this.ctx.response.body=result;
    }
    //宋宇-根据用户id查询用户手机号
    async getphone() {
      let userid = this.ctx.request.query.userid;
      let result = await this.service.personService.getphone(userid);
      this.ctx.response.body=result;
    }
    //宋宇-修改电话号码
    async updateUserPhone() {
      let userid = this.ctx.request.body.userid
      let userphone = this.ctx.request.body.userphone;
      let result = await this.service.personService.updateUserPhone(userid,userphone);
      this.ctx.response.body=result;
    }
    //宋宇-上传头像到文件夹
    async uploadPic() {
      let result = await this.service.personService.uploadPic();
      this.ctx.response.body=result;
    }
    //宋宇-导航栏获取新头像
    async getnewheadimg() {
      let userid = this.ctx.request.query.userid;
      let result = await this.service.personService.getnewheadimg(userid);
      this.ctx.response.body=result;
    }
    

    
};

module.exports = personController