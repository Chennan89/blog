<template>
  <a v-on:click.prevent="loadDetail(item._id)">
    <li class="item">
      <!-- <img class="itemImg" v-bind:src="item.thumbnail_pic_s" /> -->
      <p v-html="item.content"></p>
    </li>
  </a>
  <!-- <router-link to="/newsDetail?uniquekey="><li>{{ item.title }}</li></router-link> -->
</template>

<script>
export default {
  name: 'NewsLists',
  data () {
    return {
      msg: 'NewsLists'
    }
  },
  methods:{
    loadDetail(uniquekey){
      this.$router.push(`/newsDetail/${uniquekey}`);
    }
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
.item{/*height:12.6em;max-height:8em;*//*height:10em;*/list-style:none;width:99%;margin:0.8em 0.5%;border:2px solid #ddd;cursor:pointer;color:#333;padding:1.5em;box-sizing:border-box;-webkit-box-shadow:4px 4px 4px #efefef, -4px -4px 4px #efefef, 4px -4px 4px #efefef, -4px 4px 4px #efefef; box-shadow:4px 4px 4px #efefef, -4px -4px 4px #efefef, 4px -4px 4px #efefef, -4px 4px 4px #efefef;display:flex;flex-direction:column;justify-content:center;text-align:left;}
.item p{/*height:6em;line-height:1.2em;*//*height:5.4em;*/overflow: hidden;text-overflow:ellipsis;/*white-space: nowrap;*/}
.itemImg{height:4em;width:auto;margin:0 auto;}
</style>
