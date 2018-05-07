<template>
  <el-menu
  :default-active="doneTodosCount"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
<!--     <router-link to="/"><el-menu-item index="1"> 首页</el-menu-item> </router-link> -->
  <el-button icon="el-icon-search" circle></el-button>
    <router-link to="/"><el-menu-item index="2"> 博客主页</el-menu-item> </router-link>
    <router-link to="/AllArticle"><el-menu-item index="3" > 所有文章</el-menu-item> </router-link>
    <router-link to="/AboutMe"><el-menu-item index="4"> 关于我</el-menu-item> </router-link>
    </el-menu>
</template>

<script>
export default {
  name: 'MenuPage',
  data () {
    return {
      activeIndex: '1'
    }
  },
    computed: {
      doneTodosCount () {
        console.log(this.$store.getters.getActiveIndex);
        return this.$store.getters.getActiveIndex;
      }
    },
    methods:{
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
        this.activeIndex=this.$store.getters.getActiveIndex;
        //this.activeIndex=key;
        this.$store.commit({type: 'changeIndex',selectedIndex: key})
      },
    }
}
</script>
<style scoped>
  .el-menu{position:relative;z-index:3;top:20%;margin-top:3.6em;left:50%;margin-left:-12.2em;/*ul宽度是342px*/display: -webkit-flex; /* Safari */display: flex;flex-direction:row;justify-content:center;width:24.4em;}

@media screen and (max-width:45.6em){
  .el-menu{top:0;margin-top:0;position:fixed;width:100%;left:0;margin-left:0;}
  .el-menu li{padding:0 8px;}
}
</style>