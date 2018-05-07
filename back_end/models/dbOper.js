const operator={
	insertArticle:async function(ctx,dbname,collectionName,insertObj){
		//console.log(ctx.mongo)
		const result=await ctx.mongo.db(dbname).collection(collectionName).insert(insertObj);
		//const result=ctx.mongo.db(dbname).collection(collectionName).insert({name:'就不告诉你咯~~😜'});
		//console.log(result);
		return result;
	},
	updateArticle:async function(mongo,ctx,dbname,collectionName,updateObj){
		//console.log(ctx.mongo)
		var ObjectId = mongo.ObjectID;
		const result=await ctx.mongo.db(dbname).collection(collectionName).update({_id:ObjectId(updateObj.uniqueKey)},{$set:{'content':`${updateObj.content}`,'type':`${updateObj.type}`,'date':`${updateObj.date}`}});
		//const result=ctx.mongo.db(dbname).collection(collectionName).insert({name:'就不告诉你咯~~😜'});
		//console.log(result,'---------------');
		return result;
	},
	getAllArticle:async function(ctx,dbname,collectionName,currentPage,size,getTotal=true){
		//如果getTotal==true需要获取总条数
		let skip=(currentPage-1)*size;
		size=parseInt(size);
		let result=await ctx.mongo.db(dbname).collection(collectionName).find().sort({"date":-1}).skip(skip).limit(size).toArray();
		if(getTotal){
			const allArticle=await ctx.mongo.db(dbname).collection(collectionName).find().toArray();//必须用toArray
			let total=allArticle.length;
			result['total']=total;//返回的数组必须是纯数字下标的
			//result[10000]=total;
		}
		return result;
	},
	getArticleByID:async function(mongo,ctx,dbname,collectionName,id){
		var ObjectId = mongo.ObjectID;
		
		const result=await ctx.mongo.db(dbname).collection(collectionName).find({_id:ObjectId(id)}).toArray();//必须用toArray
		//console.log(result,'============')
		return result;
	},
	delArticle:async function(mongo,ctx,dbname,collectionName,id){
		var ObjectId = mongo.ObjectID;
		
		const result=await ctx.mongo.db(dbname).collection(collectionName).remove({_id:ObjectId(id)},1);//必须用toArray
		return result;
	}

}
module.exports=operator;