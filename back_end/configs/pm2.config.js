module.exports = {
  apps : [{
    name        : "app",
    script      : "../app.js",//需要在根目录执行pm2 start,如果写成../需要在当前目录执行
    watch       : true,
    "log_file": "../logs/combined.outerr.log",
    "out_file": "../logs/out.log",
    "error_file": "../logs/err.log",
    "log_date_format" : "YYYY-MM-DD HH:mm Z",
    instances  : 0,//或max
    exec_mode  : "cluster",
    env: {//默认
      "NODE_ENV": "development",
    },
    env_production : {
       "NODE_ENV": "production"
    }
  }/*,{
    name       : "api-app",
    script     : "./api.js",
    instances  : 4,
    exec_mode  : "cluster"//需要指定cluster才能让负载均衡生效
  }*/]
}