const Koa = require('koa');//加载koa-multer模块  
var Router = require('koa-router');
var cors = require('koa-cors');//解决跨域问题
var mongo = require('koa-mongo');//mongodb数据库
const initRouter=require('./controllers/indexRouter.js');

var app = new Koa();

//app.use(cors({origin:'http://www.baidu.com'}));
app.use(cors({origin:'*'}));
app.use(mongo()); //要在use router之前用，因为router里边用到了

var router = new Router(); 
initRouter.init(router,mongo);

app
  .use(router.routes())
  .use(router.allowedMethods());
app.listen(3000,'192.168.1.202');

console.log('Server running at http://192.168.1.202:3000/');