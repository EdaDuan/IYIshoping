exports.keys = 'abcdef';

//允许接收post请求
exports.security = {
	csrf: {
		enable: false,
		ignoreJSON: true
	} 
};

//允许上传文件
exports.multipart = {
  mode: 'file',
  // 修改上传文件的限制大小
  fileSize:"20mb",
  // 新增支持的文件格式
  fileExtensions: [ '.jfif' ],
  fileExtensions: [ '.wma' ],
  //或者直接设置白名单
  // whitelist: [ '.png' ], // 覆盖整个白名单，只允许上传 '.png' 格式
};

//配置数据库信息
exports.mysql = {
  client: {
    host: 'localhost', //数据库的主机地址
    port: '3306', //数据库端口号
    user: 'root', // 数据库账户
    password: '123456', //数据库密码
    database: 'iyidatabase', //哪一个数据库
  },
};

//跨域
exports.cors = {
	  origin:'*',
	  allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',

};

//配置服务器端口号
exports.cluster = {
	listen: {
		path: "",
		port: 7001
	}
}
