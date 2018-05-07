<template>
  <!-- <a v-on:click.prevent="loadDetail(item._id)">-->
    <li class="item">
      <p v-html="item.content"></p>
      <p>
       <a v-on:click.prevent="editArticle(item._id)">编辑</a>
       <a v-on:click.prevent="delArticle(item._id)">删除</a>
      </p>
    </li>
</template>

<script>
//import axios from 'axios';
import { mapGetters,mapMutations } from 'vuex';

export default {
  name: 'NewsLists',
  data () {
    return {
      msg: 'NewsLists'
    }
  },
    computed: {
        // 使用对象展开运算符将 getter 混入 computed 对象中
        //如果key一样，可以省略
        ...mapGetters({
          getAllArticles:'getAllArticles', 
          getActiveIndex:'getActiveIndex',
        })
      /*getAllArticles () {
        console.log(this.$store.getters.getAllArticles);
        return this.$store.getters.getAllArticles;
      }*/
    },
  methods:{
    ...mapMutations([
      'changeIndex', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'setAllArticles' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    async delArticle(uniquekey){
      //this.$emit('deleteeSucceed');
      //return;
      
      const url=`${this.CONST_CONFIG.SERVER_URL}/delArticle/${uniquekey}`;
      //需要同时删除图片 这里没有处理  后期加上
      let news=await this.$axios.get(url);
      if(news && news.result.n==1 && this.getAllArticles.length>0){
        for(let [index,article] of this.getAllArticles.entries()){
          if(article._id==uniquekey){
            this.getAllArticles.splice(index,1);
            this.setAllArticles({allArticles: this.getAllArticles});
            this.$emit('deleteeSucceed');
            return;
          }
        }
        //const newArticles=this.getAllArticles;
        //console.log(news.data);
            /*let dt=news.data;
            this.total=(this.total==0)?dt['total']:this.total;
            if(dt['total'] && dt['total']>0){
              dt.length=Object.keys(dt).length-1;//必须，不指定length 无法转换为数组
              this.newsLists=dt?Array.from(dt):[];
            }else{
              dt.length=Object.keys(dt).length;//把对象转换为数组，否则对象.total也会出现在列表里边。。
              this.newsLists=dt?Array.from(dt):[];
            }*/
        }else{
          this.$emit('deletefailed');
        }
    },
    async editArticle(uniquekey){
      this.$router.push(`/AddArticle/${uniquekey}`);
    },

  },
  destroyed(){
    console.log('NewsList Destroyed')
  },
  props:['item'],
  created(){
  }
  }
</script>
<style scoped>
.item{list-style:none;width:99%;margin:0.8em 0.5%;border:2px solid #ddd;/*cursor:pointer;*/color:#333;padding:1.5em;box-sizing:border-box;-webkit-box-shadow:4px 4px 4px #efefef, -4px -4px 4px #efefef, 4px -4px 4px #efefef, -4px 4px 4px #efefef; box-shadow:4px 4px 4px #efefef, -4px -4px 4px #efefef, 4px -4px 4px #efefef, -4px 4px 4px #efefef;display:flex;flex-direction:column;justify-content:center;text-align:left;}
.item p{/*height:6em;line-height:1.2em;*/overflow: hidden;text-overflow:ellipsis;}
.itemImg{height:4em;width:auto;margin:0 auto;}
.item p>*{line-height:1.8em;}
.item a{margin-top:1em;color:#F00;font-weight:bold;cursor:pointer;/*width:3em;*/}
</style>
