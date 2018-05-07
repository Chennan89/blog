import Vue from 'vue'
import Router from 'vue-router'
import Admin from '@/components/Admin'
import Login from '@/components/Login'
import AddArticle from '@/components/AddArticle'
import ShowArticles from '@/components/ShowArticles'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
    {
      path: '/Admin',
      name: 'Admin',
      component: Admin,
      children: [
        { path: '/AddArticle', component: AddArticle },
        { path: '/AddArticle/:key', component: AddArticle },
        { path: '/ShowArticles', component: ShowArticles },
        { path: '', component: ShowArticles },// 当 /Admin 匹配成功，// ShowArticles 会被渲染在 admin/layout 的 <router-view> 中,否则就是空的因为灭有子路由匹配成功
      ]
    }

  ]
})
