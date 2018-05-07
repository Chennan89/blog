/**
 * @file Axios的Vue插件（添加全局请求/响应拦截器）
 */

import axios from 'axios'
import router from  '../router';
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    if(sessionStorage.getItem('webtoken')){
        config.headers['webtoken'] = sessionStorage.getItem('webtoken');
    }else{
      config.headers['webtoken'] =null;
    }
    return config;
  }, function (error) {
    // Do something with request error
    console.log(error)
    return Promise.reject(error);
  });

// 拦截响应response，并做一些错误处理
axios.interceptors.response.use((response) => {
  const data = response.data
  // 根据返回的code值来做不同的处理（和后端约定）
  switch (data.code) {
    case 0:
      //正常
      // 这一步保证数据返回，如果没有return则会走接下来的代码，不是未登录就是报错
      return data;
    case 404:
        //用户名、密码错误
        return data;
    default:
      return data;
  }
  // 若不是正确的返回code，且已经登录，就抛出错误
  /*const err = new Error(data.description)
console.log(err)
  err.data = data
  err.response = response

  throw err*/
}, (err) => { // 这里是返回状态码不为200时候的错误处理
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '请求错误'
        break

      case 401:
        alert('token已失效，请重新登录')
        router.push('/');
        return;
        //err.message = '未授权，请登录'
        //break

      case 403:
        err.message = '拒绝访问'
        break

      case 404:
        err.message = `请求地址出错: ${err.response.config.url}`
        break

      case 408:
        err.message = '请求超时'
        break

      case 500:
        err.message = '服务器内部错误'
        break

      case 501:
        err.message = '服务未实现'
        break

      case 502:
        err.message = '网关错误'
        break

      case 503:
        err.message = '服务不可用'
        break

      case 504:
        err.message = '网关超时'
        break

      case 505:
        err.message = 'HTTP版本不受支持'
        break

      default:
    }
  }

  return Promise.reject(err)
})

axios.install = (Vue) => {
  Vue.prototype.$axios = axios
}

export default axios