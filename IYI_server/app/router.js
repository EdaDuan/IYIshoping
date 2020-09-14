module.exports = app => {
    const {
        router,
        controller
    } = app;

    //朱思霖-用户登录接口
    router.post('/userLogin', controller.loginController.userLogin)
    //朱思霖-用户注册验证用户名是否存在
    router.post('/checkUserName', controller.loginController.checkUserName)
    //朱思霖-用户注册验证手机号是否已经存在
    router.post('/checkPhoneNum', controller.loginController.checkPhoneNum)
    //朱思霖-用户注册
    router.post('/userRegist', controller.loginController.userRegist)
    //朱思霖-管理员登录
    router.post('/adminLogin', controller.loginController.adminLogin)
    //朱思霖-管理员查询所有用户
    router.post('/getAllUser', controller.adminController.getAllUser)
    //朱思霖-管理员删除用户
    router.post('/deleteUser', controller.adminController.deleteUser)
    //朱思霖-管理员查询所有轮播图
    router.post('/getAllBanner', controller.adminController.getAllBanner)
    //朱思霖-管理员删除轮播图
    router.post('/deleteBanner', controller.adminController.deleteBanner)
    // 朱思霖管理员编辑轮播图信息
    router.post('/updataBanner', controller.uploadPicController.updataBanner)
    //朱思霖- 管理员上传新的轮播图
    router.post('/uploadBanner', controller.uploadPicController.uploadBanner)
    //朱思霖- 管理员进行商品信息的分页查询
    router.get('/getGoodsDataByPage', controller.adminController.getGoodsDataByPage)
    //朱思霖- 管理员删除商品
    router.get('/deleteGoods', controller.adminController.deleteGoods)
    //朱思霖- 管理员修改商品信息
    router.post('/updataGoods', controller.uploadPicController.updataGoods)
    //朱思霖- 管理员上传商品信息
    router.post('/uploadGoods', controller.uploadPicController.uploadGoods)
    //朱思霖- 管理员查询已完成订单
    router.post('/getOrderData', controller.adminController.getOrderData)
    //   //朱思霖- 管理员删除订单信息
    router.post('/deleteOrder', controller.adminController.deleteOrder)


    // 蒋鑫瑞-查询banner表中的轮播图图片
    router.get('/getBanner', controller.bannerController.getBanner);
    // 蒋鑫瑞-根据goods表中type获取主页热卖区域的商品数据
    router.get('/getHot', controller.goodsController.getHot);
    // 蒋鑫瑞-根据goods表中type获取主页男推、女推的图片及描述，以便点击跳转到男装和女装
    router.get('/getRecom', controller.goodsController.getRecom);
    // 蒋鑫瑞-根据goods表type获取限定图片
    router.get('/getLimit', controller.goodsController.getLimit);
    // 蒋鑫瑞-根据goods表type随机查询商品
    router.get('/getLike', controller.goodsController.getLike);



    //宋宇-根据分类获取goods表中所有的数据渲染到页面
    router.get('/getAllClassify', controller.goodsController.getAllClassify);
    //宋宇-根据女装/男装 以及连衣裙等分类进行随机查询 渲染到商品展示部分
    router.get('/getrandinf', controller.goodsController.getrandinf);
    //宋宇-修改用户名称
    router.post('/updateusername', controller.personController.updateUserName);
    //宋宇-修改用户密码
    router.post('/updateuserpwd', controller.personController.updateUserPwd);
    //宋宇-根据用户id查询用户手机号
    router.get('/getphone', controller.personController.getphone);
    //宋宇-修改电话号码
    router.post('/updateuserphone', controller.personController.updateUserPhone);
    //宋宇-上传头像到文件夹
    router.post('/uploadPic', controller.personController.uploadPic);
    //宋宇-导航栏获取新头像
    router.get('/getnewheadimg', controller.personController.getnewheadimg);






    // 段发钰-根据商品ID获取goods表中的所有数据
    router.get('/getDetail', controller.goodsController.getDetailC);
    // 段发钰-向购物车中添加数据
    router.post('/addCartData', controller.shopcartController.addCartDataC);





    // 刘俊良查询显示商品接口
    router.get('/showproduct', controller.searchController.showgoods);
    //刘俊良 右侧热卖
    router.get('/advsale', controller.searchController.advsale);


    //杨双星- 根据用户ID获取对应的购物车数据
    router.get('/getCartData', controller.shopcartController.getCartData);
    //杨双星- 删除购物车数据
    router.get('/delCartData', controller.shopcartController.delCartData);
    //杨双星 - 获取订单基本信息
    router.get('/getAddress', controller.shopcartController.getAddress);
    //杨双星 - 提交订单
    router.post('/submitOrder', controller.shopcartController.submitOrder);
    //杨双星 - 更改多选框状态
    router.get('/checkShopcart', controller.shopcartController.checkShopcart);
}