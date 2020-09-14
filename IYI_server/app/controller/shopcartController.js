const Controller = require('egg').Controller;

class ShopcartController extends Controller {


    //杨双星-根据用户ID获取购物车数据
    async getCartData() {
        let uid = this.ctx.request.query.id;
        let gid = this.ctx.request.query.gid;
        let count = this.ctx.request.query.count;
        let r = await this.service.shopcartService.getCartData(uid, gid, count);
        this.ctx.response.body = r;
    }
    //杨双星 - 根据用户ID和商品ID删除购物车数据
    async delCartData() {
        let uid = this.ctx.request.query.id;
        let gidsStr = this.ctx.request.query.gids;
        let gids = '(' + gidsStr + ')'; //(3,5)
        let r = await this.service.shopcartService.delCartData(uid, gids);
        this.ctx.response.body = r;
    }
    //杨双星 - 获取用户的地址信息
    async getAddress() {
        let uid = this.ctx.request.query.id;
        let r = await this.service.shopcartService.getaddress(uid);
        this.ctx.response.body = r;
    }

    //杨双星 - 提交订单
    async submitOrder() {
        let uid = this.ctx.request.body.id;
        let countObj = this.ctx.request.body.countObj;
        let gidsStr = this.ctx.request.body.gids;
        let gids = '(' + gidsStr + ')'; //(3,5)
        console.log(uid, gids, countObj);
        let r = await this.service.shopcartService.submitOrder(uid, gids, countObj);
        this.ctx.response.body = r;
    }

    //杨双星 - 更改多选框状态
    async checkShopcart() {
        let uid = this.ctx.request.query.id;
        let gidsStr = this.ctx.request.query.gids;
        let gids = '(' + gidsStr + ')'; //(3,5)
        console.log(`controller:${gids}`);
        await this.service.shopcartService.checkShopcart(uid, gids);
        this.ctx.response.body = '';
    }

    //段发钰-加入购物车 商品id 用户id 数量

    async addCartDataC() {
        let obj = this.ctx.request.body;
        let result = await this.ctx.service.shopcartService.addCartDataS(obj);
        this.ctx.response.body = result;
    }
}
module.exports = ShopcartController;