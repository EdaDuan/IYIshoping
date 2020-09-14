const Service =require('egg').Service;
const fs = require('fs');
const path = require("path");

class personService extends Service{
  
  //宋宇-修改用户名称
  async updateUserName(userid,username) {
    let sql = "update user set username = ? where id = ?"
    let result = await this.app.mysql.query(sql,[username,userid]);
    return username;
  }
  //宋宇-修改用户密码
  async updateUserPwd(userid,userpwd) {
    let sql = "update user set password = ? where id = ?"
    let result = await this.app.mysql.query(sql,[userpwd,userid]);
    return result.affectedRows;
  }
  //宋宇-根据用户id查询用户手机号
  async getphone(userid) {
    let sql = "select * from user where id = ?"
    let result = await this.app.mysql.query(sql,[userid]);
    return result;
  }
  //宋宇-修改电话号码
  async updateUserPhone(userid,userphone) {
    let sql = "update user set phone = ? where id = ?"
    let result = await this.app.mysql.query(sql,[userphone,userid]);
    return userphone;
  }
  //宋宇-上传头像到文件夹
  async uploadPic(){
   
    const file = this.ctx.request.files[0]; //拿到文件对象
    const userid = this.ctx.request.body.userid;
    const toFileName = '/public/headimg/' + Date.now() + file.filename; 
  
    let to = path.dirname(__dirname) + toFileName;
    //file.filepath是上传的临时文件
    //把临时文件写入到文件to
    console.log(to);
    await fs.copyFileSync(file.filepath, to);
    //删除临时文件
    await fs.unlinkSync(file.filepath);
    //得到上传文件的网络访问 url
    const newUrl = "http://localhost:7001" + toFileName;
    let sql="update  user set headimg=?  where id = ?";
    let result=await this.ctx.app.mysql.query(sql,[newUrl,userid])
    
    //返回添加的结果
    return result.affectedRows;
  }
  //宋宇-导航栏获取新头像
  async getnewheadimg(userid) {
    let sql = "select * from user where id = ?"
    let result = await this.app.mysql.query(sql,[userid]);
    return result;
  }
  

}

module.exports=personService;