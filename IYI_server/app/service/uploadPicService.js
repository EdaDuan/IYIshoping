const Service = require('egg').Service;
const fs = require('fs');
const path = require("path");

class uploadPicService extends Service {
  // 朱思霖管理员编辑轮播图信息
  async updataBanner() {
    const file = this.ctx.request.files[0]; //拿到文件对象
    const name = this.ctx.request.body.name; //拿到轮播图文件名
    const id = this.ctx.request.body.bannerId;
    console.log(file, name, id)
    if (file) { //如果有上传新的文件，则删除掉banner表中的imgsrc并生成新的src进行存放，同时更改名称
      const toFileName = '/public/banner/' + Date.now() + file.filename; //把图片放进uploadPic文件夹中并取了一个独一无二的名字

      let to = path.dirname(__dirname) + toFileName;
      //file.filepath是上传的临时文件
      //把临时文件写入到文件to
      await fs.copyFileSync(file.filepath, to);
      //删除临时文件
      await fs.unlinkSync(file.filepath);
      //得到上传文件的网络访问 url
      const newUrl = "http://localhost:7001" + toFileName;

      let sql = "update banner set name=?,imgsrc=? where id=?;";
      let result = await this.ctx.app.mysql.query(sql, [name, newUrl, id])
      console.log(result.affectedRows)
      return result.affectedRows;
    } else { //如果没有上传新的文件，则只进行名称的修改
      let sql = "update banner set name=? where id=?;";
      let result = await this.ctx.app.mysql.query(sql, [name, id])
      console.log(result.affectedRows)
      return result.affectedRows
    }
  }

  //朱思霖-管理员上传新的轮播图
  async uploadBanner() {
    const file = this.ctx.request.files[0]; //拿到文件对象
    const name = this.ctx.request.body.name; //拿到名称
    console.log(file, name)

    const toFileName = '/public/banner/' + Date.now() + file.filename; //把图片放进uploadPic文件夹中并取了一个独一无二的名字

    let to = path.dirname(__dirname) + toFileName;
    //file.filepath是上传的临时文件
    //把临时文件写入到文件to
    await fs.copyFileSync(file.filepath, to);
    //删除临时文件
    await fs.unlinkSync(file.filepath);
    //得到上传文件的网络访问 url
    const newUrl = "http://localhost:7001" + toFileName;

    let sql = "insert into banner(name,imgsrc) values(?,?)";
    let result = await this.ctx.app.mysql.query(sql, [name, newUrl])
    return result.affectedRows;

  }

  //朱思霖-管理员编辑商品信息
  async updataGoods() {
    let id = this.ctx.request.body.id; //商品id
    let name = this.ctx.request.body.name; //商品名称
    let price = this.ctx.request.body.price; //商品价格
    let descp = this.ctx.request.body.descp; //商品描述
    let type = this.ctx.request.body.type; //商品分类
    let rest = this.ctx.request.body.rest; //商品库存
    let files = this.ctx.request.files; //拿到上传的文件
    let cover = "";
    let desimgs = [];
    console.log(files)
    if (files.length == 0) {
      //1.如果没有上传文件，说明没有修改主图和详情图，直接根据id修改其他信息即可
      let sql = "update goods set name=?,price=?,descp=?,type=?,rest=? where id=?;";
      let result = await this.ctx.app.mysql.query(sql, [name, price, descp, type, rest, id])
      return result.affectedRows;
    } else {
      //2、如果上传了文件，则先根据文件的filed来进行分类
      for (let item of files) {
        //2.1如果当前field为cover，处理之后url直接赋值给cover变量
        //2.2如果当前field为desimg，处理之后的url直接push到desimgs数组中
        if (item.field == "cover") {
          let toFileName = '/public/goodsCover/' + Date.now() + item.filename; //把图片放进uploadPic文件夹中并取了一个独一无二的名字
          let to = path.dirname(__dirname) + toFileName;
          await fs.copyFileSync(item.filepath, to);
          await fs.unlinkSync(item.filepath);
          let newUrl = "http://localhost:7001" + toFileName;
          cover = newUrl;
        } else if (item.field == "desimg") {
          let toFileName = '/public/goodsDesImg/' + Date.now() + item.filename; //把图片放进uploadPic文件夹中并取了一个独一无二的名字
          let to = path.dirname(__dirname) + toFileName;
          await fs.copyFileSync(item.filepath, to);
          await fs.unlinkSync(item.filepath);
          let newUrl = "http://localhost:7001" + toFileName;
          desimgs.push(newUrl)
        }
      }

      // 3.文件处理完成之后
      //判断如果cover为空字符串，说明只有详情图，除了cover字段其他的都进行修改
      //如果desimgs 为空数组，说明只有主图,除了desimg字段其他都进行修改
      //如果两个都不为空，说明全都需要修改
      if (desimgs.length != 0 && cover) {
        //两个都不为空说明两个都需要改
        let desimg = desimgs.join(" ");
        let sql = "update goods set name=?,price=?,descp=?,type=?,rest=?,cover=?,desimg=? where id=?;";
        let result = await this.ctx.app.mysql.query(sql, [name, price, descp, type, rest, cover, desimg, id])
        return result.affectedRows;
      } else if (desimgs.length != 0) {
        //详情图不为空，则只修改详情图
        let desimg = desimgs.join(" ");
        let sql = "update goods set name=?,price=?,descp=?,type=?,rest=?,desimg=? where id=?;";
        let result = await this.ctx.app.mysql.query(sql, [name, price, descp, type, rest, desimg, id])
        return result.affectedRows;
      } else if (cover) {
        //主图不为空，则只修改主图
        let sql = "update goods set name=?,price=?,descp=?,type=?,rest=?,cover=? where id=?;";
        let result = await this.ctx.app.mysql.query(sql, [name, price, descp, type, rest, cover, id])
        return result.affectedRows;
      }
    }
  }

  //朱思霖-管理员上传商品信息
  async uploadGoods() {
    let name = this.ctx.request.body.name; //商品名称
    let price = this.ctx.request.body.price; //商品价格
    let descp = this.ctx.request.body.descp; //商品描述
    let type = this.ctx.request.body.type; //商品分类
    let rest = this.ctx.request.body.rest; //商品库存
    let files = this.ctx.request.files; //拿到上传的文件
    let cover = ""; //保存主图地址
    let desimgs = []; //保存详情图地址
    console.log(files)
    //根据文件的filed来进行分类
    for (let item of files) {
      //2.1如果当前field为cover，处理之后url直接赋值给cover变量
      //2.2如果当前field为desimg，处理之后的url直接push到desimgs数组中
      if (item.field == "cover") {
        let toFileName = '/public/goodsCover/' + Date.now() + item.filename; //把图片放进uploadPic文件夹中并取了一个独一无二的名字
        let to = path.dirname(__dirname) + toFileName;
        await fs.copyFileSync(item.filepath, to);
        await fs.unlinkSync(item.filepath);
        let newUrl = "http://localhost:7001" + toFileName;
        cover = newUrl;
      } else if (item.field == "desimg") {
        let toFileName = '/public/goodsDesImg/' + Date.now() + item.filename; //把图片放进uploadPic文件夹中并取了一个独一无二的名字
        let to = path.dirname(__dirname) + toFileName;
        await fs.copyFileSync(item.filepath, to);
        await fs.unlinkSync(item.filepath);
        let newUrl = "http://localhost:7001" + toFileName;
        desimgs.push(newUrl)
      }
    }
    // 3.文件处理完成之后
    let desimg = desimgs.join(" ");
    let sql = "insert into goods(name,cover,price,descp,type,rest,desimg) values(?,?,?,?,?,?,?)";
    let result = await this.ctx.app.mysql.query(sql, [name,cover,price,descp,type,rest,desimg])
    return result.affectedRows;
  }

}
module.exports = uploadPicService;