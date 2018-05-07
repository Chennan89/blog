const dbOperator=require  ('../models/dbOper.js');
const upload=require  ('./uploadModel.js');
const transMarkDown=require  ('../models/markdownTrans.js');//解析markdown  现在在前台进行解析了  但是列表页 目前还在用
const tokenUtil=require('../models/tokenUtil.js');
const koaBody = require('koa-body');

const initRouter={
	init:function(router,mongo){
		router.post('/login',koaBody(),  async (ctx, next) => {  //single参数是传递的 参数名
			const requestBody=ctx.request.body;
			let ret;
			if(requestBody.name=='aaa' && requestBody.pwd=='aaa'){
				//用户名密码正确，设置token
				const token=tokenUtil.createToken(requestBody.name,requestBody.pwd);
				console.log(token)
				ret={code:0,token:token};
			}else{
				//用户名或密码错误，返回提示
				ret={code:404,token:null};
			}
			ctx.body = ret;
		});

		//路由  
		router.post('/upload',tokenUtil.checkToken, upload.single('image'), async (ctx, next) => {  //single参数是传递的 参数名
			ctx.body = {  
			    filename: ctx.req.file.filename//返回文件名     .file必须是file
			  }  
			}
		);
		router.post('/insert',koaBody(),tokenUtil.checkToken, async (ctx,next)=>{
			let reqBody=ctx.request.body;
			dbname="articles";
			collectionName="article";
			if(!reqBody.content){
				ctx.body={code:400,result:'请输入内容'};
				return;
			}
			insertObj={content:reqBody.content,date:reqBody.date,type:reqBody.type};
			let res=await dbOperator.insertArticle(ctx,dbname,collectionName,insertObj);
			
			ctx.body={code:0,result:res.insertedCount};
		});

		router.post('/update',koaBody(),tokenUtil.checkToken,async (ctx,next)=>{
			let reqBody=ctx.request.body;
			dbname="articles";
			collectionName="article";
			updateObj={content:reqBody.content,date:reqBody.date,type:reqBody.type,uniqueKey:reqBody.uniqueKey};
			let res=await dbOperator.updateArticle(mongo,ctx,dbname,collectionName,updateObj);
			ctx.body={code:0,result:res.result.nModified};
		});

		router.get('/getAllArticles/:currentPage/:size/:total',async (ctx,next)=>{
			let reqParams=ctx.params;
			dbname="articles";
			collectionName="article";
			let currentPage=reqParams.currentPage || 1;
			let size=reqParams.size || 10;
			let getTotal=reqParams.total==0?true:false;//如果total是0 说明第一次请求，需要请求总条数
			let res=await dbOperator.getAllArticle(ctx,dbname,collectionName,currentPage,size,getTotal);
			let articles={};
			if(res){
				for(let article of res){//只遍历数字下标的
					if(article!=undefined){
						let content=transMarkDown(article.content).substring(0,200);
						Object.assign(article,{content:content});
					}
				}
			}
			Object.assign(articles,res);
			articles.code=0;
			ctx.body=articles;
		});

		router.get('/getArticleByID/:id',async (ctx,next)=>{
			let reqParams=ctx.params;
			dbname="articles";
			collectionName="article";
			let id=reqParams.id;
			let res=await dbOperator.getArticleByID(mongo,ctx,dbname,collectionName,id);
			
			if(res){
				ctx.body={code:0,res};
			}

		});

		router.get('/delArticle/:id',tokenUtil.checkToken,async (ctx,next)=>{
			let reqParams=ctx.params;
			dbname="articles";
			collectionName="article";
			let id=reqParams.id;
			//console.log(id)
			let res=await dbOperator.delArticle(mongo,ctx,dbname,collectionName,id);
			console.log(res);
			
			if(res){
				ctx.body={code:0,result:res};
			}

		});

	}
}
module.exports=initRouter;
