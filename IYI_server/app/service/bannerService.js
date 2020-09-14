const Service =require('egg').Service;

class BannerService extends Service{
  
  //蒋鑫瑞-查询banner表中的轮播图图片
  async getBanners() {
    
    let getBannersql = "select *  from banner"
    let result = await this.app.mysql.query(getBannersql,[]);
    return result;
  }


}

module.exports=BannerService;