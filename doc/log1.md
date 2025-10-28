# log1

## 项目中用到的技术盘点

env 配置文件 dotenv库
typeorm + mysql2 连接数据库
nestjs/swagger 集成 swagger 文档

- 发送验证码（qq邮箱）使用 redis 缓存对验证码进行校验
- 邮箱验证码校验
- 鉴权模块完成 ->  casl 未完成，可登录注册发送验证码
- 用户模块完成 -> 用户 CURD
- 文章模块完成 -> 文章 CURD

基本完成了接口的编写，还有部分需要进行更深层次的权限验证管理
基于casl

redis 完成了验证码的存储与校验
文件上传 使用中间件 multer