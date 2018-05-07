<template>
    <el-container>
      <el-aside style="">
              <header-page>
                  <menu-page-vertical slot="menu" /><!--放到模板的menu为name的slot里-->
              </header-page>
      </el-aside>
      <el-main>   
              <router-view />
      </el-main>
    </el-container>
</template>

<script>
import HeaderPage from './HeaderPage.vue'
import MenuPageVertical from './MenuPageVertical.vue'


export default {
  name: 'AboutMe',
  data () {
    return {
      msg: 'About Me'
    }
  },
  created(){
    //这里设置selectedIndex  因为如果不设置，首次直接进来一直是1
    this.$store.commit({type:'changeIndex', selectedIndex:"2"});
  },
  destroyed(){
    console.log('BlogIndex Destroyed')
  },
  mounted(){

  },
  components:{HeaderPage,MenuPageVertical}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="../assets/css/HomePage.css" lang="css"></style> 
<style src="../assets/css/publicHeader.css" lang="css" scoped></style> 

<style scoped>

</style>
