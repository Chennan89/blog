<template>
  <!--最外层必须有一个根元素-->
  <div style="height:100%;">
    <div id="app" style="height:100%;">
      <!--<img src="./assets/logo.png">-->
      <!-- <keep-alive> -->
      <router-view />
      <!-- </keep-alive> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
    console.log(this.isHomePage);
  },
  destroyed(){
    console.log('aaaaaaa')
  }
}
</script>

<style>
*{padding:0;margin:0;text-decoration:none;outline:none;}
/*position:absolute/fixed;设置的height:100%;才有效！！！*/
html,body{height:100%;}
#app {font-family: 'Avenir', Helvetica, Arial, sans-serif;-webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;/*margin-top: 60px;text-align: center;*/color: #2c3e50;}
/*div{height:100%}
*/</style>
