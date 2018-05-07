<template>
  <!--<div id="aboutMe">
     <el-container>
      <el-aside style="">
              <header-page>
                  <menu-page-vertical slot="menu" />放到模板的menu为name的slot里
              </header-page>
      </el-aside>
      <el-main>--> 
          <div id="content" class="markdown-body" >
             <p v-html="news" class="contentContainer"></p><!--v-html将变量显示成HTML而不是纯文本-->
          </div>
      <!-- </el-main>
    </el-container>
  </div> -->
</template>

<script>
	/*import HeaderPage from './HeaderPage.vue'
	import MenuPageVertical from './MenuPageVertical.vue'*/
	import axios from 'axios';
	import  markdownit  from 'markdown-it'; // https://highlightjs.org/
	import  hljs  from 'highlight.js'; // https://highlightjs.org/

	// Actual default values
	var md = markdownit({//配置
	  highlight: function (str, lang) {
	  	console.log(str,'-----------------------');
		    if (lang && hljs.getLanguage(lang)) {
		      try {
		        return '<pre class="hljs"><code>' +
		               hljs.highlight(lang, str, true).value +
		               '</code></pre>';
		      } catch (__) {}
		    }
	  }
	});
	console.log(md,'000000000000000')
	export default{
		name:'NewsDetail',
		data(){
			return{
				news:''
			}//data Function should return an object
		},
		methods:{},
		async created(){
			let _id=this.$route.params.uniquekey;
			let url=`${this.CONST_CONFIG.SERVER_URL}/getArticleByID/${_id}`;
			const newsInfo=await axios.get(url);
			
			this.news=md.render((newsInfo.data.res[0].content));
		},
		//components:{HeaderPage,MenuPageVertical}
	}
</script>

<style  src="../assets/css/highlight.css" lang="css"></style>

<style  src="../assets/css/markdown.css" lang="css"></style>
<style scoped>
	.contentContainer{height:auto;}
	#content,.contentContainer,.el-main{height:100%;}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- <style src="../assets/css/HomePage.css" lang="css"></style> 
<style src="../assets/css/publicHeader.css" lang="css" scoped></style> 
 -->