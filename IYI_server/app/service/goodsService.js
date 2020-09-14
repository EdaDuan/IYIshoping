const Service = require('egg').Service;

class GoodsService extends Service {

  //段发钰-根据商品ID获取goods表中的所有数据
  async getDetailS(obj) {
    let gid = obj.gid;
    let getDetailSql = "select *  from goods where id=?"
    let result = await this.app.mysql.query(getDetailSql, gid);
    return result;
  }




  //宋宇-根据分类获取goods表中所有的数据渲染到页面
  async getAllClassify(classify) {
    let sql = "select * from goods where type like ?"
    let result = await this.app.mysql.query(sql, [classify]);
    return result;
  }
  //宋宇-根据女装/男装 以及连衣裙等分类进行随机查询 渲染到商品展示部分
  async getrandinf(randclassify) {
    let sql = `select * from goods where type like ? order by rand();`
    let result = await this.app.mysql.query(sql, [randclassify])
    return result;
  }



  // 蒋鑫瑞-根据goods表中type获取主页热卖区域的商品数据
  async gethot() {
    let type = this.ctx.request.query.type
    let sql = "select * from goods where type=?"
    let result = await this.app.mysql.query(sql, [type]);
    return result;
  }
  // 蒋鑫瑞-根据goods表中type获取主页男推、女推的图片及描述，以便点击跳转到男装和女装
  async getrecom() {
    let man = this.ctx.request.query.man
    let woman = this.ctx.request.query.woman
    let sql = "select * from goods where type in (?,?)"
    let result = await this.app.mysql.query(sql, [man, woman]);
    return result;
  }
  // 蒋鑫瑞-根据goods表type获取限定图片
  async getlimit() {
    let type = this.ctx.request.query.type
    let sql = "select * from goods where type=?"
    let result = await this.app.mysql.query(sql, [type]);
    return result;
  }
  // 蒋鑫瑞-根据goods表type随机查询商品
  async getlike() {
    let man = this.ctx.request.query.man
    let woman = this.ctx.request.query.woman
    let sql = "select * from goods where type like ? or type like ?"
    let result = await this.app.mysql.query(sql, ['%' + man + '%', '%' + woman + '%']);
    return result;
  }
}

module.exports = GoodsService;