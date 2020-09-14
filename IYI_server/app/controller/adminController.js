const Controller = require('egg').Controller;


class AdminController extends Controller {
  //朱思霖-管理员查询所有用户
  async getAllUser() {
    let result = await this.ctx.service.adminService.getAllUser();
    this.ctx.response.body = result;
  }
  //朱思霖-管理员删除用户
  async deleteUser() {
    let userid = this.ctx.request.body.userid;
    let result = await this.ctx.service.adminService.deleteUser(userid);
    this.ctx.response.body = result;
  }

  //朱思霖-管理员查询所有轮播图信息
  async getAllBanner() {
    let result = await this.ctx.service.adminService.getAllBanner();
    this.ctx.response.body = result;
  }
  //朱思霖-管理员删除轮播图
  async deleteBanner() {
    let bannerid = this.ctx.request.body.bannerid;
    let result = await this.ctx.service.adminService.deleteBanner(bannerid);
    this.ctx.response.body = result;
  }

   //朱思霖- 管理员进行商品信息的分页查询
  async getGoodsDataByPage() {
    let page = this.ctx.request.query.page;
    let result = await this.ctx.service.adminService.getGoodsDataByPage(page);
    this.ctx.response.body = result;
  }

  //朱思霖- 管理员删除商品
  async deleteGoods() {
    let goodsid = this.ctx.request.query.goodsid;
    console.log(goodsid)
    let result = await this.ctx.service.adminService.deleteGoods(goodsid);
    this.ctx.response.body = result;
  }

  //朱思霖- 管理员查询已完成订单
  async getOrderData() {
    let result = await this.ctx.service.adminService.getOrderData();
    this.ctx.response.body = result;
  }
   //朱思霖- 管理员删除订单信息
   async deleteOrder() {
    let orderid=this.ctx.request.body.orderid;
    let result = await this.ctx.service.adminService.deleteOrder(orderid);
    this.ctx.response.body = result;
  }
};

module.exports = AdminController