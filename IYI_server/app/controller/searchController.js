const Controller = require('egg').Controller;


class SearchController extends Controller {
    //刘俊良  查询满足条件的商品
    async showgoods() {
        let kw = this.ctx.request.query.kw
        let page = this.ctx.request.query.page
        let ways = this.ctx.request.query.ways
        let r = await this.service.searchService.showgood(kw, page, ways);
        this.ctx.response.body = r;
    }

    async advsale() {
        let r = await this.service.searchService.advsale();
        this.ctx.response.body = r;
    }

};

module.exports = SearchController