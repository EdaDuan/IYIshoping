const Controller = require('egg').Controller;


class BannerController extends Controller {
  //蒋鑫瑞-查询banner表中的轮播图图片
  async getBanner() {
    
    let result = await this.ctx.service.bannerService.getBanners();
    this.ctx.response.body = result;
  }


};

module.exports = BannerController