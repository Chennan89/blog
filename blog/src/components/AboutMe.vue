<template>
  <!--<div id="aboutMe">
      <el-container>
       <el-aside style="">
              <header-page>
                  <menu-page-vertical slot="menu" />放到模板的menu为name的slot里
              </header-page>
      </el-aside>
      <el-main> -->
          <div id="content" >
            <h2>关于我</h2>
            <hr />
              <p>一个永远保持学习 的女青年</p>
              <p>英语凑合 可以看看英文文档啥的</p>
              <p>爱唱歌、爱吉他 还没学会...</p>
              <p>就爱写代码(脸呢)</p>
              <p>喜欢养生 却因工作性质快秃了</p>
              <p>喜欢一切美好事物</p>
              <p><a href="https://github.com/Chennan89">Github地址</a>东西不多。。。包含博客源码</p>
          </div>
      <!-- </el-main>
    </el-container> 
  </div>-->
</template>

<script>
import HeaderPage from './HeaderPage.vue'
import MenuPageVertical from './MenuPageVertical.vue';
export default {
  name: 'AboutMe',
  data () {
    return {
      msg: 'About Me'
    }
  },
  created(){
      console.log(222222)
    //这里设置selectedIndex
    this.$store.commit({type:'changeIndex', selectedIndex:"4"});
  },
  destroyed(){
      console.log('AboutMe destroyed');
    },
  mounted(){

  },
  components:{HeaderPage,MenuPageVertical}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- <style src="../assets/css/HomePage.css" lang="css"></style> 
<style src="../assets/css/publicHeader.css" lang="css" scoped></style> 
 -->
<style scoped>
#content{box-sizing:border-box;padding:4em 3em;height:auto;display:flex;flex-direction:column;justify-content:top;}
#content p{font-size:1.2em;color:#333;font-weight:bold;line-height:1.8em;}
</style>
