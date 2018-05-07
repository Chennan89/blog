<template>
	<div>
	<el-input
	    placeholder="请输入内容"
	    prefix-icon="el-icon-search"
	    v-model="searchContent">
	  </el-input>
	  <el-button type="primary" icon="el-icon-search">搜索</el-button>
	  </div>
</template>

<script>
export default {
  data() {
    return {
      searchContent:''
    }
  }
}
</script>
<style scoped>
	.el-input{margin-top:15em;position:absolute;left:0;top:0;height:5em;}

	.el-input__inner{display:inline-block;height:5em;font-size:1.2em;}
	.el-button--primary{margin-top:15em;height:3em;font-size:1.2em;position:absolute;left:50%;margin-left:-5em;width:10em;}
</style>