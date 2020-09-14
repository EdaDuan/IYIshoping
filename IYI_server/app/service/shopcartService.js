const Service = require('egg').Service;

class ShopcartService extends Service {
  //杨双星-获取购物车数据或者添加数据再获取
  async getCartData(uid, gid, count) {
    if (gid && count) {
      console.log(`参数：gid：${gid} count： ${count} uid：${uid}`);
      let queryExist = `select * from shopcart where userid=? and goodsid=?`
      let queryResult = await this.ctx.app.mysql.query(queryExist, [uid, gid]);
      if (queryResult.length) {
        //如果购物车中有该商品，则直接修改数量
        // console.log('购物车中有该商品');
        let newCount = Number(count);
        console.log(`newCount:${newCount},uid:${uid},goodsid:${gid}`);
        let addCountSql = `update shopcart set count = ? where userid = ? and goodsid=?`;
        let r = await this.ctx.app.mysql.query(addCountSql, [newCount, uid, gid]);
        console.log(r);
      } else {
        //购物车中不存在该商品，新增数据
        // console.log('购物车中无该商品');
        //先根据商品id获取价格
        let getPriceSql = `select price from goods where id=?`;
        let priceResult = await this.ctx.app.mysql.query(getPriceSql, gid);
        let price = priceResult[0].price;
        //在将加购信息插入到shopcart
        let insertDataSql = `insert \
into \
shopcart(userid,goodsid,count,price)\
values(?,?,?,?)`
        await this.ctx.app.mysql.query(insertDataSql, [uid, gid, count, price]);
      }

    }
    let getCartDataSql = `select goods.id,goods.name,goods.price,goods.cover,goods.rest,shopcart.count,shopcart.checked from user join shopcart on user.id = shopcart.userid join goods on shopcart.goodsid = goods.id where user.id=? and shopcart.state = 0;`;
    let result = await this.app.mysql.query(getCartDataSql, uid);
    return result;
  }
  //杨双星- 删除购物车数据
  async delCartData(uid, gids) {
    let delDataSql = `delete from shopcart where userid = ? and goodsid in` + gids;
    // console.log(delDataSql);
    let r = await this.ctx.app.mysql.query(delDataSql, uid);
    // console.log(r);
    let getCartDataSql = `select goods.id,goods.name,goods.price,goods.cover,goods.rest,shopcart.count,shopcart.checked from user join shopcart on user.id = shopcart.userid join goods on shopcart.goodsid = goods.id where user.id=? and shopcart.state = 0`;
    let result = await this.app.mysql.query(getCartDataSql, uid);
    return result;
  }

  //杨双星 - 获取用户的地址信息
  async getaddress(uid) {
    let result = [];
    let userSql = `select username ,phone from user where id = ?`;
    let userResult = await this.ctx.app.mysql.query(userSql, uid);
    let addressSql = `select province ,city,district,address,is_default from address where userid = ?`;
    let addressResult = await this.ctx.app.mysql.query(addressSql, uid);
    for (let i = 0; i < addressResult.length; i++) {
      let obj = {};
      obj.username = userResult[0].username;
      obj.phone = userResult[0].phone;
      obj.province = addressResult[i].province;
      obj.city = addressResult[i].city;
      obj.district = addressResult[i].district;
      obj.address = addressResult[i].address;
      obj.is_default = addressResult[i].is_default;
      result.push(obj);
    }
    return result;
  }

  //杨双星 - 提交订单
  async submitOrder(uid, gids, countObj) {
    //先增加销量 减少库存
    let getInfoSql = `select id, rest,sales from goods where id in` + gids;
    let goodsInfo = await this.ctx.app.mysql.query(getInfoSql);
    console.log(goodsInfo);
    for (let i = 0; i < goodsInfo.length; i++) {
      goodsInfo[i].rest -= countObj[goodsInfo[i].id];
      goodsInfo[i].sales += countObj[goodsInfo[i].id];
    }
    let updateRestSql = `update goods set rest = ?,sales = ? where id = ?`;
    for (let i = 0; i < goodsInfo.length; i++) {
      let temp = goodsInfo[i];
      await this.ctx.app.mysql.query(updateRestSql, [temp.rest, temp.sales, temp.id]);
    }
    //将购物车的state设置为1
    let stateSql = `update shopcart set state = 1,time = now() where userid = ? and goodsid in` + gids;
    await this.ctx.app.mysql.query(stateSql, uid);
    //返回最新数据
    let getCartDataSql = `select goods.id,goods.name,goods.price,goods.cover,goods.rest,shopcart.count,shopcart.checked from user join shopcart on user.id = shopcart.userid join goods on shopcart.goodsid = goods.id where user.id=? and shopcart.state = 0`;
    let result = await this.app.mysql.query(getCartDataSql, uid);
    return result;
  }

  //杨双星 - 更改多选框状态
  async checkShopcart(uid, gids) {
    console.log(`gids:${gids}`);
    let clearCheckSql = `update shopcart set checked = 0 where userid=? and state = 0`;
    await this.ctx.app.mysql.query(clearCheckSql, uid);
    if (gids !== '()') {
      let checkSql = `update shopcart set checked = 1 where userid=? and state = 0 and goodsid in` + gids;
      let result = await this.ctx.app.mysql.query(checkSql, uid);
    }

  }

  //段发钰-添加商品到购物车
  async addCartDataS(obj) {
    let gid = obj.gid;
    let uid = obj.uid;
    let count = obj.num;
    let price = obj.price
    // 根据用户id和商品id查询shopcart中是否已经添加
    let findSql = "select *  from shopcart where userid = ? and goodsid = ?"
    let findRes = await this.app.mysql.query(findSql, [uid, gid]);
    console.log(findRes == '');
    // findRes === [] 没有查询到  想数据库中新增数据
    if (findRes == '') {
      let addCartDataSql = "insert into shopcart(userid,goodsid,count, price, state) values(?,?,?,?,0)";
      let addCartDataRes = await this.app.mysql.query(addCartDataSql, [uid, gid, count, price]);
      // // 添加成功  返回数据
      return addCartDataRes;
    } else {
      // 之前数据库中的count + 新添加的count
      let num = findRes[0].count + count;
      // 查询到  数据库中已经包含  修改数据库中的count
      let updataCartDataSql = "update shopcart set count = ? where userid = ? and goodsid = ?";
      let updataCartDataRes = await this.app.mysql.query(updataCartDataSql, [num, uid, gid]);
      //  返回更新后的结果
      return updataCartDataRes;
    }
  }


}

module.exports = ShopcartService;