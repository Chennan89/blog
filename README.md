# blog
Vue+Node+Mongodb实现的一个博客

blog是博客展示的前端界面
  1. 使用了Vuex,Vue-router,axios
  2. 用highlight.js对markdown语法进行高亮展示
  3. 自动适配移动&PC端浏览器
  <div align=center><img width="80%" height="" src="https://github.com/Chennan89/blog/blob/master/imgs/blog_PC.jpg"/></div>
  <div align=center><img width="50%" height="" src="https://github.com/Chennan89/blog/blob/master/imgs/blog_mob.jpg"/></div>
  <div align=center><img width="80%" height="" src="https://github.com/Chennan89/blog/blob/master/imgs/blog_PC_D.jpg"/></div>
  <div align=center><img width="50%" height="" src="https://github.com/Chennan89/blog/blob/master/imgs/blogD_mob.jpg"/></div>

back_admin是后台管理部分
  1. 使用了Vuex,Vue-router
  1. markdown编辑器使用的`mavon-editor`
  2. 使用了Element-UI
  3. 使用axios(也可以用superagent等)发送http请求，并对所有请求进行拦截写了interceptor
  <div align=center><img width="80%" height="" src="https://github.com/Chennan89/blog/blob/master/imgs/backadmin1.jpg"/></div>
  <div align=center><img width="80%" height="" src="https://github.com/Chennan89/blog/blob/master/imgs/backadmin2.jpg"/></div>
  
back_end是node服务端，使用KOA2及其middlewares
  1. 使用jsonwebtoken `An implementation of JSON Web Tokens`进行权限管理
  2. 使用markdown-it进行markdown语法的解析
  3. MongoDB进行数据存取操作
  4. 生产环境使用PM2进行应用管理

>后台管理用户名/密码：aaa/aaa  另需要安装MongoDB，collectionName自己修改
