<template>
  <!-- <div id="AllArticles">
    <el-container>
      <el-aside style="">
              <header-page>
                  <menu-page-vertical slot="menu" />放到模板的menu为name的slot里
              </header-page>
      </el-aside>
        <el-main> -->
          <div id="content" >
             <ul>
              <li is="news-lists" v-for="news of newsLists" v-bind:key="news._id" v-bind:item="news"></li>
              </ul>

              <div class="block">
                <el-pagination 
                  layout="prev, pager, next"
                  :total="total" :current-page.sync="currentPage" v-bind:page-size="size" :pager-count="pageCount"
                  v-on:current-change="changePage" v-on:prev-click="" v-on:next-click="">
                </el-pagination>
              </div>
          </div>
<!--       </el-main>
    </el-container>
   </div>-->
</template>

<script>
import HeaderPage from './HeaderPage.vue'
import MenuPageVertical from './MenuPageVertical.vue'
import NewsLists from './NewsLists.vue'
import axios from 'axios';

export default {
  name: 'AboutMe',
  data () {
    return {
      total:0,//记录总条数
      size:5,//每页显示的条数
      currentPage:1,//当前页数
      pageCount:7,
      newsLists:[],
    }
  },
  methods:{
     changePage:function(page){
          this.currentPage=page;
          localStorage.currentPage=page;
            this.getArticles();
       },
       async getArticles(){
          //let currentPage=this.currentPage;
          let currentPage=localStorage.currentPage?parseInt(localStorage.currentPage):this.currentPage;
          const url=`${this.CONST_CONFIG.SERVER_URL}/getAllArticles/${currentPage}/${this.size}/${this.total}`;
          let news=await axios.get(url);
          this.currentPage=currentPage;//第一次进来（包括返回回来的时候） 请求完数据之后   会变回1 了。。  所以设置localStorage住了 
          if(news.data){
            let dt=news.data;
            this.total=(this.total==0)?dt['total']:this.total;
            if(dt['total'] && dt['total']>0){
              dt.length=Object.keys(dt).length-2;//必须，不指定length 无法转换为数组
              this.newsLists=dt?Array.from(dt):[];
            }else{
              dt.length=Object.keys(dt).length-1;//把对象转换为数组，否则对象.total也会出现在列表里边。。
              this.newsLists=dt?Array.from(dt):[];
            }
        }
        //this.currentPage=localStorage.currentPage?parseInt(localStorage.currentPage):3;
        //localStorage.currentPage=this.currentPage;
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
  components:{HeaderPage,MenuPageVertical,NewsLists}//所有用到的需要在这里注册才能在模板中使用，否则会报错没有正确注册
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- <style src="../assets/css/HomePage.css" lang="css"></style> 
<style src="../assets/css/publicHeader.css" lang="css" scoped></style> 
 -->
<style scoped>
#AllArticles{height:100%;overflow:scroll;}
.block{text-align:center;}
</style>
