<template>
    <el-container>
      <el-aside width="200px">
        <el-row class="tac">
          <el-col :span="24">
              <el-menu
              default-active="1-1"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>管理博客</span>
                </template>
                  <router-link to="/ShowArticles"><el-menu-item index="1-1">查看博客列表</el-menu-item></router-link>
                  <router-link to="/AddArticle"><el-menu-item index="1-2">新增博客</el-menu-item></router-link>
              </el-submenu>
              <!-- <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
              </el-menu-item>
 -->            </el-menu>
          </el-col>
          </el-row>
      </el-aside>
      <el-container>

        <el-header>我的博客 
          <pre style="display:inline-block;float:right;"><span>{{uname}}</span>   <a class="logout" v-on:click="logout">退出</a></pre>
          </el-header>
        <el-main>
            <!-- <editor /> -->
            <router-view/>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>

    </template>
<script>    
    import editor from './AddArticle.vue';    
    export default {
        name:'AdminLayout',
        data(){
            return {
              uname:''
            }
        },
        created(){
          this.uname=localStorage.getItem('uname');
        },
        methods:{
          handleClose(){},
          handleOpen(){},
          logout(){
            sessionStorage.setItem('webtoken',null);
            localStorage.setItem('uname',null);
            this.$router.push('/');
          },
        },
        components:{editor}
    }
</script>

<style scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 320px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    /*line-height: 160px;*/padding:0;
  }
  
  .el-container {
    height:100%;box-sizing:border-box;background:red;
  }
   .tac{margin-top:100px;}
   .logout{color:red;font-weight:bold;font-size:1.5em;cursor:pointer;}
  </style>
  <style>
   </style>