<template>
  <div id="AllArticles">

          <div id="content" >
             <ul>
              <li is="news-lists" v-for="news of newsLists" v-bind:key="news._id" v-bind:item="news" v-on:deleteeSucceed="openDialog"  v-on:deletefailed="openErrDialog"></li>
              </ul>

              <div class="block">
                <el-pagination 
                  layout="prev, pager, next"
                  :total="total" :current-page.sync="currentPage" v-bind:page-size="size" :pager-count="pageCount"
                  v-on:current-change="changePage" v-on:prev-click="" v-on:next-click="">
                </el-pagination>
              </div>
          </div>

  </div>
</template>

<script>
import NewsLists from './NewsLists.vue'
//import axios from 'axios';
import { mapMutations } from 'vuex';

export default {
  name: 'AboutMe',
  data () {
    return {
      total:0,//记录总条数
      size:20,//每页显示的条数
      currentPage:1,//当前页数
      pageCount:7,
      newsLists:[]
   }
  },
  // 将 `this.changeIndex()` 映射为 `this.$store.commit('changeIndex')`
  // 将 `this.allArticles()` 映射为 `this.$store.commit('setAllArticles')`
  methods:{
    ...mapMutations({
      'changeIndex':'changeIndex', 
      'allArticles':'setAllArticles'
    }),
    openDialog() {
    //Element 为 Notification 组件准备了四种通知类型：success, warning, info, error。通过type字段来设置，除此以外的值将被忽略。同时，我们也为 Notification 的各种 type 注册了方法，可以在不传入type字段的情况下像open5和open6那样直接调用。
    //Element 为 Vue.prototype 添加了全局方法 $notify。因此在 vue instance 中可以采用本页面中的方式调用 Notification。
        this.$notify({
          title: '成功',
          message: '成功删除该文章',
          type: 'success',
          duration:2000
        });
      },
      openErrDialog() {
        this.$notify({
          title: '操作失败',
          message: '删除文章失败',
          type: 'error',
          duration:2000
        });
      },
     changePage:function(page){
          this.currentPage=page;
          localStorage.currentPage=page;
            this.getArticles();
       },
       async getArticles(){
          //let currentPage=this.currentPage;

          let currentPage=localStorage.currentPage?parseInt(localStorage.currentPage):this.currentPage;
          const url=`${this.CONST_CONFIG.SERVER_URL}/getAllArticles/${currentPage}/${this.size}/${this.total}`;
          let news=await this.$axios.get(url);
          //let news=await this.$axios.get(url,{responseType: 'json'});
          this.currentPage=currentPage;//第一次进来（包括返回回来的时候） 请求完数据之后   会变回1 了。。  所以设置localStorage住了 
          if(news){//在axiosUtils中处理过，已经得到了 response.data
            let dt=news;
            this.total=(this.total==0)?dt['total']:this.total;
                        if(dt['total'] && dt['total']>0){
              dt.length=Object.keys(dt).length-2;//必须，不指定length 无法转换为数组   total和code
              this.newsLists=dt?Array.from(dt):[];
            }else{
              dt.length=Object.keys(dt).length-1;//把对象转换为数组，去掉  code
              this.newsLists=dt?Array.from(dt):[];
            }
            let key=1;
            //this.$store.commit({type: 'changeIndex',selectedIndex: key})
            this.changeIndex({selectedIndex: key});

            this.allArticles({allArticles: this.newsLists});
        }
      }
    },
   created(){
    //这里设置selectedIndex
    this.$store.commit({type:'changeIndex', selectedIndex:"3"});
    this.getArticles();
  },
  destroyed(){
    console.log('AllArticle Destroyed')
  },
  mounted(){

  },
  components:{NewsLists}//所有用到的需要在这里注册才能在模板中使用，否则会报错没有正确注册
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
#AllArticles{height:100%;overflow:scroll;}
</style>
