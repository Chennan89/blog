# blog
Vue+Node+Mongodb实现的一个博客

blog是博客展示的前端界面
  1. 使用了Vuex,Vue-router,axios
  2. 用highlight.js对markdown语法进行高亮展示
  3. 自动适配移动&PC端浏览器
  4. 使用axios(也可以用superagent等)发送http请求，并对所有请求进行拦截写了interceptor
  
  <div align=center><img width="80%" height="" src="https://github.com/Chennan89/blog/blob/master/imgs/blog_PC.jpg"/></div>
  <div align=center><img width="50%" height="" src="https://github.com/Chennan89/blog/blob/master/imgs/blog_mob.jpg"/></div>
  <div align=center><img width="80%" height="" src="https://github.com/Chennan89/blog/blob/master/imgs/blog_PC_D.jpg"/></div>
  <div align=center><img width="50%" height="" src="https://github.com/Chennan89/blog/blob/master/imgs/blogD_mob.jpg"/></div>
  
back_admin是后台管理部分

  1. 使用了Vuex,Vue-router,axios
  
  2. markdown编辑器使用的`mavon-editor`
  
  3. 使用了Element-UI
  
  <div align=center><img width="80%" height="" src="https://github.com/Chennan89/blog/blob/master/imgs/backadmin1.jpg"/></div>
  <div align=center><img width="80%" height="" src="https://github.com/Chennan89/blog/blob/master/imgs/backadmin2.jpg"/></div>
  
back_end是node服务端，使用KOA2及其middlewares
  1. 使用jsonwebtoken `An implementation of JSON Web Tokens`进行权限管理
  2. 使用markdown-it进行markdown语法的解析
  3. MongoDB进行数据存取操作
  4. 生产环境使用PM2进行应用管理

>后台管理用户名/密码：aaa/aaa,这个可以存到数据库中，在node中从数据库中取数据，这里就简单写了固定值  另需要安装MongoDB，collectionName自己修改

>blog和back_admin的config/const文件中的地址（nodeAPI的地址）根据实际情况修改，

#### 生产环境配置

  1. 使用nginx对nodeAPI的地址做了一个反向代理；
  
  2. 同时对blog的地址进行了rewrite（项目层级太深。。）
  
  3. 使用gulp对node服务进行打包 并将打包后文件上传到服务器
  
  4. 对blog和blog_admin使用npm run build对文件进行打包 上传打包后的文件到服务器
  
  >（注意打包后图片地址可能有问题，要修改配置文件中的路径 config/index.js的assetsPublicPath:'./'(对在HTML中直接引入的资源)和在build/utils.js的ExtractTextPlugin.extract中添加publicPath:'../../'(对CSS中引入的img文件)）

  5. 配置了本地服务器到远程服务器的免密登录 这样就不用每次操作都要输入用户名密码了 简单地依据 ssh hostname(配置的) 就可以了
  
  6. 用PM2启动并守护node服务
  
  7. mongod -f 配置文件  的方式启动MongoDB服务

遇到的问题：
 MongoDB启动的时候指定配置文件并在配置文件中设置fork=true 设置守护进程，否则关掉远程连接MongoDB服务就断了
