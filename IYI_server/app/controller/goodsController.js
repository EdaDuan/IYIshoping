const Controller = require('egg').Controller;


class GoodsController extends Controller {
  //段发钰-根据商品ID获取goods表中的所有数据
  async getDetailC() {
    let obj = this.ctx.request.query;
    let result = await this.ctx.service.goodsService.getDetailS(obj);
    this.ctx.response.body = result;
  }
 





  //宋宇-根据分类获取goods表中所有的数据渲染到页面
  async getAllClassify() {
    let classify = this.ctx.request.query.classify;
    let result = await this.ctx.service.goodsService.getAllClassify(classify);
    this.ctx.response.body = result;
  }
  //宋宇-根据女装/男装 以及连衣裙等分类进行随机查询 渲染到商品展示部分
  async getrandinf() {
    let randclassify = this.ctx.request.query.randclassify;
    let result = await this.ctx.service.goodsService.getrandinf(randclassify);
    console.log(result);
    this.ctx.response.body = result;
  }


  // 蒋鑫瑞-根据goods表中type获取主页热卖区域的商品数据
  async getHot() {
    let result = await this.ctx.service.goodsService.gethot();
    this.ctx.response.body = result;
  }
  // 蒋鑫瑞-根据goods表中type获取主页男推、女推的图片及描述，以便点击跳转到男装和女装
  async getRecom() {
    let result = await this.ctx.service.goodsService.getrecom();
    this.ctx.response.body = result;
  }
  // 蒋鑫瑞-根据goods表type获取限定图片
  async getLimit() {
    let result = await this.ctx.service.goodsService.getlimit();
    this.ctx.response.body = result;
  }
  // 蒋鑫瑞-根据goods表type随机查询商品
  async getLike() {
    let result = await this.ctx.service.goodsService.getlike();
    this.ctx.response.body = result;
  }

};

module.exports = GoodsController