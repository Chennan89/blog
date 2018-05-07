<template>
  <el-menu
  :default-active="doneTodosCount"
  class="el-menu-vertical-demo"
  mode="vertical" 
  background-color="rgba(68, 68, 68, 1)"
  text-color="#fff"
  active-text-color="#ffd04b"
  @select="handleSelect">
    <!-- <router-link to="/"><el-menu-item index="1"> 首页</el-menu-item></router-link> -->
    <!-- <a  v-on:click="goFoward('\/')"><el-menu-item index="1"> 首页</el-menu-item> </a> -->
    <router-link to="/"><el-menu-item index="2"> 博客主页</el-menu-item> </router-link>
    <router-link to="/AllArticle"><el-menu-item index="3" > 所有文章</el-menu-item> </router-link>
    <router-link to="/AboutMe"><el-menu-item index="4"> 关于我</el-menu-item> </router-link>
    <!-- <el-button type="primary" icon="el-icon-search">搜索</el-button> -->
    <el-dropdown trigger="click" @command="handleCommand">
      <span class="el-dropdown-link">
        下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="search"><el-button type="primary" icon="el-icon-search">搜索</el-button></el-dropdown-item>
        <el-dropdown-item command="return"><el-button type="primary" icon="el-icon-back">返回</el-button></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    </el-menu>
</template>

<script>
export default {
  name: 'MenuPageVertical',
  data () {
    return {

    }
  },
      computed: {
      doneTodosCount () {
        console.log(this.$store.getters.getActiveIndex);
        return this.$store.getters.getActiveIndex;
      }
    },
    methods:{
      handleCommand(command) {
        //this.$message('click on item ' + command);
        if(command=='return'){
          this.$router.go(-1)
        }else if(command=='search'){
          this.$message('开发中，请等候~~~');
          this.$router.push('/Search');
        }
      },
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
    .el-menu{position:relative;z-index:10;top:15%;margin-top:3.6em;width:100%;left:0;display: -webkit-flex; display: flex;flex-direction:column;justify-content:center;text-decoration:none;background:none;}
    .el-menu{color:#FFF;}
  @media screen and (max-width:45.6em){
  .el-menu{top:0;margin-top:0;position:fixed;width:100%;left:0;margin-left:0;flex-direction:row;}
  .el-menu li{padding:0 8px;}}
  .el-button{padding:6px 10px;}
  .el-button--primary{color:#333;background:rgb(255, 255, 255);border:none;float:left;}
  .el-dropdown{color:#FFF;line-height:56px;padding-left:20px;}
  .el-dropdown-menu__item{padding:0 10px;}
  @media screen and (min-width:45.6em){
    .el-dropdown{display:none;}
  }
</style>