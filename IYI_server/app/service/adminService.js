const Service = require('egg').Service;

class AdminService extends Service {

  //朱思霖-管理员查询所有用户
  async getAllUser() {
    let sql = "select *  from user"
    let result = await this.app.mysql.query(sql);
    return result;
  }
  //朱思霖-管理员删除用户
  async deleteUser(userid) {
    let sql = "delete from user where id=?"
    let r = await this.app.mysql.query(sql, [userid]);
    return r.affectedRows;
  }
  //朱思霖-管理员查询所有轮播图信息
  async getAllBanner() {
    let sql = "select *  from banner"
    let result = await this.app.mysql.query(sql);
    return result;
  }

  //朱思霖-管理员删除用户
  async deleteBanner(bannerid) {
    let sql = "delete from banner where id=?"
    let r = await this.app.mysql.query(sql, [bannerid]);
    return r.affectedRows;
  }


  //朱思霖- 管理员进行商品信息的分页查询
  async getGoodsDataByPage(page) {
    //需要返回对应页数的数据
    //还需要返回数据库数据的总条数
    // 1、查询总条数
    let sql1 = `select COUNT(*) totalCount from goods`
    const total = await this.app.mysql.query(sql1);
    // 2、分页查询数据
    let sql2 = `select * from goods limit ${(page-1)*10} ,10`
    let goodsData = await this.app.mysql.query(sql2);
    return {
      total: total[0].totalCount,
      goodsData
    };
  }

  //朱思霖- 管理员删除商品
  async deleteGoods(goodsid) {
    //1、 根据goodsid删除goods表中相应的商品
    console.log(goodsid)
    let sql1 = `delete from goods where id=?`;
    let r1 = await this.ctx.app.mysql.query(sql1, [goodsid])
    //2、同时删除掉shopcart表中相应商品的数据
    let sql2 = `delete from shopcart where goodsid=?`;
    let r2 = await this.ctx.app.mysql.query(sql2, [goodsid])
    return r1.affectedRows;
  }

  //朱思霖- 管理员查询已完成订单
  async getOrderData() {
    let result=await this.ctx.app.mysql.query(`select shopcart.id,user.username,goods.name,shopcart.count,shopcart.price,shopcart.count*shopcart.price as total, DATE_FORMAT(shopcart.time,'%Y-%m-%d %H:%i:%S') as time from user JOIN shopcart ON shopcart.userid=user.id join goods on shopcart.goodsid=goods.id where shopcart.state=1`)
    return result;
  }
   //朱思霖- 管理员删除订单信息
   async deleteOrder(orderid) {
     let result=await this.ctx.app.mysql.query(`delete from shopcart where id=?`,[orderid])
     return result.affectedRows;
  }
}

module.exports = AdminService;