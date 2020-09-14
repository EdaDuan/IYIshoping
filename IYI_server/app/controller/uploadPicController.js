const Controller = require('egg').Controller;


class uploadPicController extends Controller {
    // 朱思霖-管理员编辑轮播图信息
    async updataBanner() {
        let r = await this.service.uploadPicService.updataBanner();
        this.ctx.response.body = r;
    }
     // 朱思霖-管理员上传新的轮播图
     async uploadBanner() {
        let r = await this.service.uploadPicService.uploadBanner();
        this.ctx.response.body = r;
    }
      //朱思霖- 管理员上传商品
     async updataGoods() {
        let r = await this.service.uploadPicService.updataGoods();
        this.ctx.response.body = r;
    }
     //朱思霖- 管理员上传商品
     async uploadGoods() {
        let r = await this.service.uploadPicService.uploadGoods();
        this.ctx.response.body = r;
    }
};

module.exports = uploadPicController