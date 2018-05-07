<template>
        <div id="editor">
          <el-select v-model="value1" placeholder="请选择" ref="articleType">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
            <input type="hidden" value="" name="uniqueKey" ref="keyRef"/>
            <mavon-editor v-model="text" :ishljs = "true" @change="contentChange" ref=md @imgAdd="$imgAdd" @imgDel="$imgDel" @save="$saveContent"></mavon-editor>
        </div>
</template>
    <script>
    // Local Registration
    import { mavonEditor } from 'mavon-editor'
    import 'mavon-editor/dist/css/index.css';
    //import axios from 'axios'; 用全局的
    //import axios from 'axios';
    //import qs from 'qs';
    //import request from 'superagent';
    export default {
        name: 'editor',
        data(){
            return{
              options: [{
                  value: 'vue',
                  label: 'Vue'
                }, {
                  value: 'node',
                  label: 'Node'
                }, {
                  value: 'css',
                  label: 'Css'
                }, {
                  value: 'webpack',
                  label: '打包工具'
                }, {
                  value: 'others',
                  label: 'Others'
                }, {
                  value: 'javascript',
                  label: 'Javascript/ES6'
                },
                {
                  value: 'http',
                  label: 'Http'
                },{
                  value: 'database',
                  label: '数据库'
                },{
                  value: 'test',
                  label: '测试'
                }],
                value1:'',
              imgList:[],
              text:''
            }
        },
        /*watch:{
          value1:function(){
            console.log(this.value1,'-----------');
          }
        },*/
        async created(){
            const uniqueKey=this.$route.params.key;
            if(uniqueKey){
              const url=`${this.CONST_CONFIG.SERVER_URL}/getArticleByID/${uniqueKey}`;
      
              const newsInfo=await this.$axios.get(url);
              console.log(newsInfo)
              //this.news=newsInfo.data.pagecontent;
              const news=newsInfo.res[0].content;
              this.value1=newsInfo.res[0].type;//设置type
              this.text=news;
              this.$nextTick(function(){console.log(uniqueKey);this.$refs.keyRef.value=uniqueKey;});
            }
            console.log(333)
        },
        components: {
            mavonEditor
            // or 'mavon-editor': mavonEditor
        },
        methods: {
            getDate(){
              var time = new Date();   // 程序计时的月从0开始取值后+1   
              var m = time.getMonth() + 1;   
              var t = time.getFullYear() + "-" + m + "-"     
              + time.getDate() + " " + time.getHours() + ":"     
              + time.getMinutes() + ":" + time.getSeconds(); 
              return t;
            },
            getType(){
              return this.value1;
            },
            contentChange(){
                //console.log(this.$refs.md.d_value)//可以得到  编辑区的值
            },
            $saveContent(){
              const content=this.$refs.md.d_value;
              var formdata = new FormData();
              formdata.append('content', content);
              let url='';
              let sendData={};
              let jumpUrl='';
              if(this.$refs.keyRef.value.length==24){
                //修改
                url=`${this.CONST_CONFIG.SERVER_URL}/update`;
                //formdata.append('uniqueKey', this.$refs.keyRef.value);
                sendData={ content: content ,date:this.getDate(),type:this.getType(),uniqueKey:this.$refs.keyRef.value};
                //jumpUrl='/ShowArticles';
              }else{
                url=`${this.CONST_CONFIG.SERVER_URL}/insert`;
                sendData={ content: content ,date:this.getDate(),type:this.getType()};
                //jumpUrl='';
              }
              /*request
                .post(url)
                .send(sendData) // sends a JSON post body
                .set('accept', 'json')
                .end((err, res) => {
                  // Calling the end function will send the request
                  console.log(err)
                  //console.log(res,'000000000')
                  if(err){
                    this.$notify({
                      title: '操作失败',
                      message: '操作失败',
                      type: 'error',
                      duration:2000
                    });
                    return;
                  }
                  if(res.body.code==0 && res.body.result==1){
                    this.$notify({
                      title: '操作成功',
                      message: '操作成功',
                      type: 'success',
                      duration:2000
                    });
                  }
                  //window.location.reload();
                  this.$router.push('/ShowArticles');
                });*/


              this.$axios({
                 url: url,
                 //url: `http://localhost:3000/insert/${content}`,
                 method: 'post',
                 data:sendData,
                 //headers: { 'content-type': 'application/x-www-form-urlencoded' },
                 headers: { 'content-type': 'application/json' },//默认就是json数据
                 //headers: { 'content-type': 'text/html' }//这样会让node接收不到参数。。。undefined
             }).then((res) => {//这里的res已经是response.data了
                if(res.code==0 && res.result==1){
                    this.$notify({
                      title: '操作成功',
                      message: '操作成功',
                      type: 'success',
                      duration:2000
                    });
                    this.$router.push('/ShowArticles');
                  }else{
                    this.$notify({
                      title: '操作失败',
                      message: res.result,
                      type: 'error',
                      duration:0
                    });
                  }
             }).catch(function(error){
                console.log(error)
             })
              /*console.log(this.imgList)
              const cont=this.$refs.md.$imglst2Url(this.imgList);//只是修改了输入框的值
              console.log(cont)*/
            },
        // 绑定@imgAdd event
        $imgAdd(pos, $file){
            // 第一步.将图片上传到服务器.
           var formdata = new FormData();
           formdata.append('image', $file);
           this.$axios({
               url: `${this.CONST_CONFIG.SERVER_URL}/upload`,
               method: 'post',
               data: formdata,
               headers: { 'Content-Type': 'multipart/form-data' },
           }).then((url) => {
            console.log(url,pos,'--------')
            this.imgList.push([pos,`${this.CONST_CONFIG.UPLOAD_DEST}${url.filename}`]);
               // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
               // $vm.$img2Url 详情见本页末尾   node_modules里边的 mavon-editor.vue
                this.$refs.md.$img2Url(pos, `${this.CONST_CONFIG.UPLOAD_DEST}${url.filename}`);//可以再最后提交的时候 进行整体的转换
               //$vm.$img2Url(pos, url);
           })
        },
        $imgDel(){}
    }
    }
    </script>
    <style scoped>
    #editor {
        margin: auto;height: 580px;
    }
    .markdown-body{height:100%;}
    </style>