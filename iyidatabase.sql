/*
Navicat MySQL Data Transfer

Source Server         : test
Source Server Version : 50173
Source Host           : localhost:3306
Source Database       : iyidatabase

Target Server Type    : MYSQL
Target Server Version : 50173
File Encoding         : 65001

Date: 2020-09-05 22:22:54
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for address
-- ----------------------------
DROP TABLE IF EXISTS `address`;
CREATE TABLE `address` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `district` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `is_default` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of address
-- ----------------------------
INSERT INTO `address` VALUES ('1', '38', '四川', '成都', '金牛区', '新诚信大厦4楼', '1');
INSERT INTO `address` VALUES ('2', '38', '四川', '广安', '邻水县', '九龙镇', '0');
INSERT INTO `address` VALUES ('3', '39', '重庆市', '渝北区', '七星岗', '领事巷', '1');

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `headimg` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('1', 'admin', 'a123456789', 'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1812993978,4158651947&fm=26&gp=0.jpg');

-- ----------------------------
-- Table structure for banner
-- ----------------------------
DROP TABLE IF EXISTS `banner`;
CREATE TABLE `banner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `imgsrc` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of banner
-- ----------------------------
INSERT INTO `banner` VALUES ('4', 'adidas男子', 'https://img.adidas.com.cn/resources/2020kvbanner/aug/ADICOLOR/%E6%97%A7kv-pc-2.jpg?version=000000');
INSERT INTO `banner` VALUES ('5', '安踏水花鞋限定', 'https://img.fishfay.com/anta-cn-web/descente/2020/08/19/f9b73c8e2b5aba259d727f59930cc090.jpg');
INSERT INTO `banner` VALUES ('6', 'adidas杨颖', 'https://img.adidas.com.cn/resources/2020kvbanner/aug/zx/oldkv/kv-pc.jpg?version=000000');
INSERT INTO `banner` VALUES ('7', '安踏雪碧T恤限定', 'https://img.fishfay.com/theme/images/area/2020/0331/woman-01.jpg');
INSERT INTO `banner` VALUES ('8', 'colaa', 'http://anta-cn-web.obs.myhwclouds.com/anta-cn-web/descente/2020/08/31/56343ba965d05ff1bf96f3ade114cde3.jpg');

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `cover` varchar(255) DEFAULT NULL,
  `price` float(20,0) DEFAULT NULL,
  `descp` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `rest` int(11) DEFAULT NULL,
  `desimg` varchar(255) DEFAULT NULL,
  `sales` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES ('1', '【双层防透丝滑绸面】2020新款宽松显瘦女式吊带打底背心女 吊带', 'https://a.vpimg4.com/upload/merchandise/pdcvis/610778/2020/0618/169/74ec9d12-9a58-45b8-b0d4-5b83f7394b5a_503x503_90.jpg', '30', '【双层防透丝滑绸面】2020新款宽松显瘦女式吊带打底背心女 吊带', '女装', '192', 'https://a.vpimg2.com/upload/merchandise/pdcvis/610778/2020/0510/190/302a7cd4-ed3c-4aac-8e5c-c92836af48b1.jpg https://a.vpimg3.com/upload/merchandise/pdcvis/610778/2020/0510/91/81891384-7919-492e-b38b-9f1c08cac5b0.jpg', '4');
INSERT INTO `goods` VALUES ('2', '三十而已刺绣连衣裙夏秋20新款运动polo衫女裙子中长款t恤裙', 'https://h2.appsimg.com/a.appsimg.com/upload/merchandise/pdcvis/2020/02/28/91/9a537c75-35e0-4c96-b5a8-4a00e34e700b_282x282_90.jpg', '231', '最好看的连衣裙', '女装', '100', 'https://a.vpimg2.com/upload/merchandise/pdcvis/2020/02/28/160/75b7db17-81cd-4d75-9e97-94e8737d756c.jpg https://a.vpimg4.com/upload/merchandise/pdcvis/2020/02/28/27/49992b62-12e4-4750-98ee-0a940f9fc447.jpg', '0');
INSERT INTO `goods` VALUES ('3', '三十而已新款时尚拼接春秋爆款卫衣女连帽卫衣女式卫衣', 'https://h2.appsimg.com/a.appsimg.com/upload/merchandise/pdcvis/607777/2020/0716/22/30f7a68b-9faf-416d-bde7-36a349af0062_282x282_90.jpg', '60', '三十而已新款时尚拼接春秋爆款卫衣女连帽卫衣女式卫衣', '女装', '98', 'https://a.vpimg3.com/upload/merchandise/pdcvis/607777/2020/0826/130/d1ce40e4-c7ac-415a-aafa-0a1d6178362f.jpg https://a.vpimg4.com/upload/merchandise/pdcvis/607777/2020/0826/151/2952b60f-634e-49eb-9785-cda7c2617f78.jpg', '0');
INSERT INTO `goods` VALUES ('4', '2020新款韩版女气质收腰长袖纯色连衣裙', 'https://h2.appsimg.com/a.appsimg.com/upload/merchandise/pdcvis/2020/01/21/40/e230d008-a554-4529-8a8b-c6f1d20bf121_282x282_90.jpg', '100', '2020新款韩版女气质收腰长袖纯色连衣裙', '女装', '99', 'https://a.vpimg3.com/upload/merchandise/pdcvis/2020/01/21/41/cb5588a7-7450-4311-a481-a40414d4f4f7.jpg https://a.vpimg3.com/upload/merchandise/pdcvis/2020/01/21/81/e0156b23-8e88-41f7-ab3c-04f1633e15c5.jpg', '0');
INSERT INTO `goods` VALUES ('5', '女士衬衫女格子长袖衬衫女上衣女衬衣格子衬衫宽松休闲衬衫女衬衫', 'https://h2.appsimg.com/a.appsimg.com/upload/merchandise/pdcvis/2020/06/10/71/e932c3f8-fd7c-4207-85b7-b09bf1823942_420_531.jpg', '100', '女士衬衫女格子长袖衬衫女上衣女衬衣格子衬衫宽松休闲衬衫女衬衫', '女装', '97', 'https://a.vpimg4.com/upload/merchandise/pdcvis/2020/06/10/94/29ab10a8-cc45-4579-8936-16ac66df8ada.jpg https://a.vpimg2.com/upload/merchandise/pdcvis/2020/06/10/31/887f9d53-9c72-4c75-b705-822ea4920460.jpg', '0');
INSERT INTO `goods` VALUES ('6', '\r\n\r\n\r\n\r\n\r\n\r\n收藏宝贝 (320人气)\r\n2020夏季新款韩版V领套头字母印花人物T恤女短袖宽松白搭休闲上衣', 'https://img.alicdn.com/imgextra/i2/27562227/O1CN01I85TYi1SK0eJweKJA_!!0-saturn_solar.jpg_220x220.jpg_.webp', '200', '2020夏季新款韩版V领套头字母印花人物T恤女短袖宽松白搭休闲上衣', '女装', '20', 'https://img.alicdn.com/imgextra/i3/652002248/O1CN01RU070l1STcxaG5M3Q_!!652002248.jpg https://img.alicdn.com/imgextra/i1/652002248/O1CN01ME9PlM1STcxU7avuV_!!652002248.jpg', '0');
INSERT INTO `goods` VALUES ('7', '2020黑色碎花连衣裙女春季新款雪纺v领长袖法式长裙子及踝复古', 'https://img.alicdn.com/imgextra/i1/1290000029/O1CN01zr1n6y1C5K6Vlrm6x_!!0-saturn_solar.jpg_220x220.jpg_.webp', '30', '2020黑色碎花连衣裙女春季新款雪纺v领长袖法式长裙子及踝复古', '女装', '10', 'https://img.alicdn.com/imgextra/i2/3790201884/O1CN01BeRzzU1PmunyIMiHI_!!3790201884.jpg https://img.alicdn.com/imgextra/i2/3790201884/O1CN01adfXG11Pmunyw89yZ_!!3790201884.jpg', '0');
INSERT INTO `goods` VALUES ('8', '收腰显瘦白色蕾丝连衣裙中长款超仙女泡泡袖夏季短袖气质初恋裙子', 'https://img.alicdn.com/imgextra/i1/13664235/O1CN01pzQQvy1h9fwzD3lMo_!!0-saturn_solar.jpg_220x220.jpg_.webp', '300', '收腰显瘦白色蕾丝连衣裙中长款超仙女泡泡袖夏季短袖气质初恋裙子', '女装', '10', 'https://img.alicdn.com/imgextra/i1/73255395/O1CN01WDyR2L1pixN4O4pTc_!!73255395.jpg https://img.alicdn.com/imgextra/i4/73255395/O1CN01SVCroW1pixN69xhxI_!!73255395.jpg', '0');
INSERT INTO `goods` VALUES ('10', '加工定制| 2020夏季新款短袖', 'https://cbu01.alicdn.com/img/ibank/2020/703/426/14092624307_1813191783.220x220.jpg?_=2020', '80', 'ins情侣装潮流半袖潮牌宽松上衣', '男装 T恤', '300', 'https://cbu01.alicdn.com/img/ibank/2020/630/690/14055096036_1813191783.jpg https://cbu01.alicdn.com/img/ibank/2020/700/324/14141423007_1813191783.jpg https://cbu01.alicdn.com/img/ibank/2020/529/306/14092603925_1813191783.jpg', '0');
INSERT INTO `goods` VALUES ('11', 'NPH2020夏季新品粤语文化印花', 'https://cbu01.alicdn.com/img/ibank/2020/409/825/17603528904_398780112.220x220.jpg?_=2020', '70', '街头休闲半袖百搭恶搞宽松T', '男装 T恤', '300', 'https://cbu01.alicdn.com/img/ibank/2020/654/740/17476047456_398780112.jpg https://cbu01.alicdn.com/img/ibank/2020/673/975/17603579376_398780112.jpg https://cbu01.alicdn.com/img/ibank/2020/318/645/17603546813_398780112.jpg', '0');
INSERT INTO `goods` VALUES ('12', '新款男T恤', 'https://cbu01.alicdn.com/img/ibank/2020/974/354/14103453479_863958747.220x220.jpg?_=2020', '75', '品牌品质大货全检新款男t恤高档烫金宽松短袖T恤衫男士定制厂家', '男装 T恤', '196', 'https://cbu01.alicdn.com/img/ibank/2020/974/354/14103453479_863958747.jpg https://cbu01.alicdn.com/img/ibank/2020/603/870/14916078306_863958747.jpg', '0');
INSERT INTO `goods` VALUES ('13', '长袖t恤男士2020新款秋季上衣', 'https://cbu01.alicdn.com/img/ibank/2020/034/191/20194191430_1885687057.220x220.jpg?_=2020', '85', '新款秋季上衣服宽松情侣圆领卫衣简约打底衫秋装', '男装 T恤', '400', 'https://cbu01.alicdn.com/img/ibank/2020/036/225/20348522630_1885687057.jpg https://cbu01.alicdn.com/img/ibank/2020/518/225/20348522815_1885687057.jpg https://cbu01.alicdn.com/img/ibank/2020/683/443/20194344386_1885687057.jpg', '0');
INSERT INTO `goods` VALUES ('14', 'SUPIMA短袖', 'https://cbu01.alicdn.com/img/ibank/2019/989/203/13131302989_173494456.220x220.jpg?_=2020', '65', '铂衫RawSoul 170克50支皮马棉空白T恤男 ', '男装 T恤', '200', 'https://cbu01.alicdn.com/img/ibank/2019/683/407/12450704386_173494456.jpg https://cbu01.alicdn.com/img/ibank/2019/712/950/12376059217_173494456.jpg ', '0');
INSERT INTO `goods` VALUES ('15', '男式t恤', 'https://cbu01.alicdn.com/img/ibank/2020/072/379/14505973270_710348603.220x220.jpg?_=2020', '90', '新款男装圆领纯色休闲百搭T恤 青年男士薄款汗衫厂家直销', '男装 T恤', '350', 'https://cbu01.alicdn.com/img/ibank/2020/768/743/14467347867_710348603.jpg https://cbu01.alicdn.com/img/ibank/2020/457/358/14505853754_710348603.jpg', '0');
INSERT INTO `goods` VALUES ('16', '新款男士T恤短袖', 'https://cbu01.alicdn.com/img/ibank/2020/764/673/15529376467_1859769946.220x220.jpg?_=2020', '105', '2020年夏季圆领 半袖透气男生帅气青年上衣批发', '男装 T恤', '90', 'https://cbu01.alicdn.com/img/ibank/2020/910/934/15529439019_1859769946.jpg https://cbu01.alicdn.com/img/ibank/2020/654/398/15421893456_1859769946.jpg', '0');
INSERT INTO `goods` VALUES ('17', 'HeyHenry小清新韩版宽松条纹情侣长袖', 'https://cbu01.alicdn.com/img/ibank/2019/454/960/11592069454_1582773879.220x220.jpg?_=2020', '100', '男女打低衫纯棉港风ins潮', '男装 T恤', '130', 'https://cbu01.alicdn.com/img/ibank/2019/730/871/11659178037_1582773879.jpg https://cbu01.alicdn.com/img/ibank/2019/035/780/11592087530_1582773879.jpg', '0');
INSERT INTO `goods` VALUES ('18', '真丝连衣裙', 'https://cbu01.alicdn.com/img/ibank/2020/055/901/15544109550_1136347950.220x220.jpg?_=2020', '150', ' 100桑蚕丝高档印花短袖小清新法式夏装收腰显瘦中长裙', '女装 连衣裙', '120', 'https://cbu01.alicdn.com/img/ibank/2020/399/041/15436140993_1136347950.jpg https://cbu01.alicdn.com/img/ibank/2020/560/085/15483580065_1136347950.jpg https://cbu01.alicdn.com/img/ibank/2020/080/371/15436173080_1136347950.jpg', '0');
INSERT INTO `goods` VALUES ('19', '淳设品牌连衣裙', 'https://cbu01.alicdn.com/img/ibank/2020/185/637/15034736581_71816578.220x220.jpg?_=2020', '140', '淳设品牌跨境热销2020春夏季新款公主风荷叶边时尚女', '女装 连衣裙', '98', 'https://cbu01.alicdn.com/img/ibank/2020/219/277/15034772912_71816578.jpg https://cbu01.alicdn.com/img/ibank/2020/919/280/14979082919_71816578.jpg', '2');
INSERT INTO `goods` VALUES ('20', '纯色套头卫衣', 'https://cbu01.alicdn.com/img/ibank/2020/863/606/19637606368_669441480.220x220.jpg?_=2020', '65', '韩版潮流2020秋季新款宽松纯色ins纯棉套头卫衣', '女装 卫衣', '300', 'https://cbu01.alicdn.com/img/ibank/2020/311/298/19560892113_669441480.jpg https://cbu01.alicdn.com/img/ibank/2020/165/809/19486908561_669441480.jpg', '0');
INSERT INTO `goods` VALUES ('21', '原宿外套', 'https://cbu01.alicdn.com/img/ibank/2020/493/817/20087718394_589365518.220x220.jpg?_=2020', '130', '春秋2020新款潮韩版宽松百搭秋装上衣ins超火连帽', '女装 外套', '200', 'https://cbu01.alicdn.com/img/ibank/2020/560/500/20241005065_589365518.jpg https://cbu01.alicdn.com/img/ibank/2020/527/189/20240981725_589365518.jpg https://cbu01.alicdn.com/img/ibank/2020/804/999/20240999408_589365518.jpg', '0');
INSERT INTO `goods` VALUES ('22', '呢子外套', 'https://cbu01.alicdn.com/img/ibank/2018/668/906/9318609866_133862534.220x220.jpg?_=2020', '350', '2019秋冬新款水波纹双面羊绒大衣女士加长款系带收腰羊毛呢子外套', '女装 外套', '200', 'https://cbu01.alicdn.com/img/ibank/2019/431/577/12150775134_133862534.jpg https://cbu01.alicdn.com/img/ibank/2019/732/037/12184730237_133862534.jpg', '0');
INSERT INTO `goods` VALUES ('23', '原宿风白色卫衣', 'https://cbu01.alicdn.com/img/ibank/2020/288/045/19275540882_1583535311.220x220.jpg?_=2020', '110', '原宿风白色卫衣女宽松韩版2020新款高腰短款上衣春秋薄款长袖外套', '女装 卫衣', '220', 'https://cbu01.alicdn.com/img/ibank/2020/492/879/19348978294_1583535311.jpg https://cbu01.alicdn.com/img/ibank/2020/917/489/19348984719_1583535311.jpg https://cbu01.alicdn.com/img/ibank/2020/363/369/19275963363_1583535311.jpg', '0');
INSERT INTO `goods` VALUES ('24', '慵懒风衬衫', 'https://cbu01.alicdn.com/img/ibank/2020/073/789/19295987370_235474776.220x220.jpg?_=2020', '100', '慵懒帅气廓感 侧摆抓褶立体剪裁顺滑宽松中长款显瘦棉衬衣衬衫女', '女装 衬衣', '180', 'https://cbu01.alicdn.com/img/ibank/2020/073/789/19295987370_235474776.jpg https://cbu01.alicdn.com/img/ibank/2020/364/993/19149399463_235474776.jpg', '0');
INSERT INTO `goods` VALUES ('25', 'POLO领拼接撞色条纹薄长袖', 'https://cbu01.alicdn.com/img/ibank/2020/269/397/19955793962_62562423.220x220.jpg?_=2020', '88', '2020秋装新品，宽松韩版POLP衫', '女装 衬衣', '220', 'https://cbu01.alicdn.com/img/ibank/2020/657/500/20030005756_62562423.jpg https://cbu01.alicdn.com/img/ibank/2020/253/990/19956099352_62562423.jpg', '0');
INSERT INTO `goods` VALUES ('26', '秋冬新款2020针织衫', 'https://cbu01.alicdn.com/img/ibank/2019/467/632/11006236764_733468692.220x220.jpg?_=2020', '68', '韩版套头式高领纯色打底衫长袖堆堆领针织衫', '女装 针织衫', '170', 'https://cbu01.alicdn.com/img/ibank/2019/838/670/11050076838_733468692.jpg https://cbu01.alicdn.com/img/ibank/2019/623/566/11021665326_733468692.jpg https://cbu01.alicdn.com/img/ibank/2019/483/866/11021668384_733468692.jpg', '0');
INSERT INTO `goods` VALUES ('27', '潮牌BEII&BAPE秋装', 'https://cbu01.alicdn.com/img/ibank/2020/277/777/15862777772_1522097053.220x220.jpg?_=2020', '110', '加绒儿童鲨鱼带帽外套亲子童装拉链卫衣', '男装 卫衣', '220', 'https://cbu01.alicdn.com/img/ibank/2020/277/777/15862777772_1522097053.220x220.jpg?_=2020', '0');
INSERT INTO `goods` VALUES ('28', '2020新款瑜伽裤', 'https://cbu01.alicdn.com/img/ibank/2020/291/289/16092982192_428450071.220x220.jpg?_=2020', '78', '柔而有力，轻柔触感稳定提拉', '女装 运动装', '100', 'https://cbu01.alicdn.com/img/ibank/2020/268/996/16157699862_428450071.jpg https://cbu01.alicdn.com/img/ibank/2020/899/370/16043073998_428450071.jpg https://cbu01.alicdn.com/img/ibank/2020/467/621/16093126764_428450071.jpg', '0');
INSERT INTO `goods` VALUES ('29', '春秋新款运动裤', 'https://cbu01.alicdn.com/img/ibank/2020/309/642/19866246903_1719793834.220x220.jpg?_=2020', '70', '男士休闲，韩版宽松收口束脚裤', '男装 裤子', '1100', 'https://cbu01.alicdn.com/img/ibank/2020/092/299/20019992290_1719793834.jpg https://cbu01.alicdn.com/img/ibank/2020/034/282/19866282430_1719793834.jpg', '0');
INSERT INTO `goods` VALUES ('30', '2020新款高腰速干健身瑜伽', 'https://cbu01.alicdn.com/img/ibank/2020/938/310/18525013839_1815379197.220x220.jpg?_=2020', '80', '假两件紧身运动裤', '女装 运动', '1000', 'https://cbu01.alicdn.com/img/ibank/2020/276/881/18600188672_1815379197.jpg https://cbu01.alicdn.com/img/ibank/2020/110/422/18600224011_1815379197.jpg https://cbu01.alicdn.com/img/ibank/2020/973/550/18525055379_1815379197.jpg', '0');
INSERT INTO `goods` VALUES ('31', '长袖衬衣', 'https://cbu01.alicdn.com/img/ibank/2020/298/737/18751737892_1862940734.220x220.jpg?_=2020', '120', '鹿西 娃娃领长袖衬衫女2020秋新款韩版设计感小众法式包扣', '女装 衬衣', '800', 'https://cbu01.alicdn.com/img/ibank/2020/503/229/18892922305_1862940734.jpg https://cbu01.alicdn.com/img/ibank/2020/826/477/18817774628_1862940734.jpg https://cbu01.alicdn.com/img/ibank/2020/316/259/18892952613_1862940734.jpg', '0');
INSERT INTO `goods` VALUES ('32', '休闲衬衣男', 'https://cbu01.alicdn.com/img/ibank/2020/143/178/15943871341_848333422.220x220.jpg?_=2020', '79', '浪鲸厂家2020夏季韩版修身短袖衬衫 新款青年休闲纯色牛津纺衬衣', '男装 衬衣', '980', 'https://cbu01.alicdn.com/img/ibank/2020/584/824/15678428485_848333422.jpg https://cbu01.alicdn.com/img/ibank/2020/387/098/15568890783_848333422.jpg https://cbu01.alicdn.com/img/ibank/2020/307/153/15616351703_848333422.jpg', '0');
INSERT INTO `goods` VALUES ('33', 'Nike Sportswear', 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/22e66d66-24f0-4e2d-b5f7-3a9715f74c81/sportswear-%E7%94%B7%E5%AD%90%E9%92%88%E7%BB%87%E6%B0%B4%E6%B4%97%E5%A4%B9%E5%85%8B-3DTNC9.jpg', '498', '男子针织水洗夹克', '热卖', '120', 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/22e66d66-24f0-4e2d-b5f7-3a9715f74c81/sportswear-%E7%94%B7%E5%AD%90%E9%92%88%E7%BB%87%E6%B0%B4%E6%B4%97%E5%A4%B9%E5%85%8B-3DTNC9.jpg', '0');
INSERT INTO `goods` VALUES ('34', 'Nike Swoosh', 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/4e6af582-884c-4afe-ba45-c01f3c5d2e74/swoosh-luxe-%E5%A5%B3%E5%AD%90%E4%B8%AD%E5%BC%BA%E5%BA%A6%E6%94%AF%E6%92%91%E8%BF%90%E5%8A%A8%E5%86%85%E8%A1%A3-JNfxxM.jpg', '395', '女子中强度支撑一片式衬垫运动内衣', '热卖', '102', 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/4e6af582-884c-4afe-ba45-c01f3c5d2e74/swoosh-luxe-%E5%A5%B3%E5%AD%90%E4%B8%AD%E5%BC%BA%E5%BA%A6%E6%94%AF%E6%92%91%E8%BF%90%E5%8A%A8%E5%86%85%E8%A1%A3-JNfxxM.jpg', '0');
INSERT INTO `goods` VALUES ('35', 'ANTA水花2', 'https://img.fishfay.com/anta-cn-web/descente/2020/08/19/f9b73c8e2b5aba259d727f59930cc090.jpg', '100', 'ANTA水花2', '限定', '10', 'https://img.fishfay.com/anta-cn-web/descente/2020/08/19/f9b73c8e2b5aba259d727f59930cc090.jpg', '0');
INSERT INTO `goods` VALUES ('36', 'lol战队代言宣传海报', 'https://uxresources.baozun.com/prod/88000060/20200821/C5306DE4C2BD73A10E0B2A7C9EE13764.jpg', '100', '主页男推系列，点击进入男装', '男推', '20', 'https://uxresources.baozun.com/prod/88000060/20200821/C5306DE4C2BD73A10E0B2A7C9EE13764.jpg', '0');
INSERT INTO `goods` VALUES ('37', '刘雯代言宣传海报', 'https://uxresources.baozun.com/prod/88000060/20200731/D209123D92B4EF8A13E3AC440EBBA198.jpg', '0', '主页女推系列，点击进入女装', '女推', '100', 'https://uxresources.baozun.com/prod/88000060/20200731/D209123D92B4EF8A13E3AC440EBBA198.jpg', '0');
INSERT INTO `goods` VALUES ('38', '\'Nike Dri-FIT', 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/f9c6f876-0103-4b99-bb2b-41aaa76b3626/dri-fit-%E7%94%B7%E5%AD%90%E7%AF%AE%E7%90%83%E4%B8%8A%E8%A1%A3-6prZCH.jpg', '299', '男子篮球上衣', '热卖', '1000', 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/f9c6f876-0103-4b99-bb2b-41aaa76b3626/dri-fit-%E7%94%B7%E5%AD%90%E7%AF%AE%E7%90%83%E4%B8%8A%E8%A1%A3-6prZCH.jpg', '0');

-- ----------------------------
-- Table structure for shopcart
-- ----------------------------
DROP TABLE IF EXISTS `shopcart`;
CREATE TABLE `shopcart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) DEFAULT NULL,
  `goodsid` int(11) DEFAULT NULL,
  `count` int(11) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `state` tinyint(4) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `checked` tinyint(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shopcart
-- ----------------------------
INSERT INTO `shopcart` VALUES ('27', '38', '19', '2', '140', '1', '2020-09-05 11:41:27', '1');
INSERT INTO `shopcart` VALUES ('28', '38', '1', '4', '30', '1', '2020-09-05 11:41:27', '1');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户唯一标识',
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `headimg` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('38', '小王头', 'a12345678', 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2319772070,3114389419&fm=26&gp=0.jpg', '12345678900');
INSERT INTO `user` VALUES ('39', '大王头', 'a12345678', 'http://localhost:7001/public/headimg/1599218357055证件照.png', '19149847273');
