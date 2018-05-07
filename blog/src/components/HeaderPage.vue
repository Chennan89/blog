<template>
  <article id="headerPg">
      <!-- <div id="bgImg"></div> --><!--大背景-->
      <div id="mask"></div><!--mask-->
      <section id="figure">
        <router-link tag='a' to="/" ><!--生成一个a链接-->
            <img ref="figureImg" src="../assets/figure.jpg" id="figureImg" v-on:mouseover="trans()" v-on:mouseout="transReverse()"/>
            <p title="跳转到首页" class="circleCont">
                <span>web前端</span>
                <span>PHP</span>
                <span>Node</span>
            </p>
        </router-link>
      </section>
      <section id="self">
        <p>辰男的博客</p>
        <hr />
      </section>
      <slot name="menu">
        <menu-page /><!--如果没有指定，这里默认就显示 该组件-->
      </slot>
    </article>
</template>

<script>
import M from './MenuPage.vue';
export default {
  name: 'HomePage',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      activeIndex: '1',
        activeIndex2: '1'
    }
  },
  components:{
    menuPage:M
  },
  methods:{
    handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
    trans:function(){
      //this.refs.figureImg.style.transform='rotateY(180deg)';//注意啊！！！$refs
      let ele=this.$refs;
      if(ele.figureImg!=undefined){
        ele.figureImg.style.transform='rotateY(180deg)';
        ele.figureImg.style.transition='1.5s';
        ele.figureImg.style.timingFunction="ease-in";        
      }
      //console.log(this.$refs.figureImg)
    },
    transReverse:function(){
      //this.refs.figureImg.style.transform='rotateY(180deg)';//注意啊！！！$refs
      let ele=this.$refs;
      if(ele.figureImg!=undefined){
         ele.figureImg.style.transform='rotateY(0)';
        ele.figureImg.style.transition='1.5s';
        ele.figureImg.style.timingFunction="ease-in";       
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="../assets/css/HomePage.css" lang="css"></style> 

<!--<style scoped>

</style>-->