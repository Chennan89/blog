import Vue from 'vue';
import Router from 'vue-router';
import HeaderPage from '@/components/HeaderPage';
import BlogIndex from '@/components/BlogIndex';
import AboutMe from '@/components/AboutMe';
import AllArticle from '@/components/AllArticle';
import NewsDetail from '@/components/NewsDetail';
import IndexPage from '@/components/IndexPage';
import Search from '@/components/Search';

Vue.use(Router)

export default new Router({
  routes: [
    /*{
      path: '/',
      name: 'HeaderPage',
      component: HeaderPage
    },*/
    {
      path: '/',
      name: 'BlogIndex',
      component: BlogIndex,
      children:[
         { path: '/', component: IndexPage },
         { path: '/AllArticle', component: AllArticle },
         { path: '/AboutMe', component: AboutMe },
         { path: '/NewsDetail/:uniquekey', component: NewsDetail },
         {path: '/Search',component: Search}
      ]
    },
        {
      path: '/AllArticle',
      name: 'AllArticle',
      component: AllArticle,
      
      meta: { scrollToTop: true }
    },
    {
      path: '/AboutMe',
      name: 'AboutMe',
      component: AboutMe
    },
    {
      path: '/NewsDetail/:uniquekey',//需要带上参数的路径！！！
      name: 'NewsDetail',
      component: NewsDetail
    },
    {
      path: '/Search',
      name: 'Search',
      component: Search
    }

  ]
})
