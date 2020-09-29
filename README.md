# IYIshoping
网购商城
小组项目

启动项目前，请确保在前后端页面中的axios请求地址与服务器地址一致

服务器默认配置的ip为127.0.0.1 端口号为7001（server端 config/config.default.js） axios请求 默认全局配置为 http://127.0.0.1:7001 (前后端入口文件main.js)

数据库默认配置 host: 'localhost', //数据库的主机地址 port: '3306', //数据库端口号 user: 'root', // 数据库账户 password: 'admin', //数据库密码 database: 'iyidatabase', //数据库名称 （配置位置： server端 config/config.default.js）

前后端上传图片资源之后，存储后的网络访问路径固定为"http://localhost:7001" + toFileName; （如需修改，在server端 service/uploadPicService.js 和service/personService.js这两个相关文件更改） 如果需要上传之后能够访问资源，建议全部使用默认配置。

为了上传文件不要太大， 部分商品在数据中存储的是网络图片的路径，自己上传了少部分图片在服务器中。

现有用户： 用户名：小王头 密码 a12345678 用户名：大王头 密码 a123456789 管理员账户(不支持注册) 用户名 :admin 密码 a123456789
