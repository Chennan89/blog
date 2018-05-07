const jwt = require('jsonwebtoken');
const secret='@#$';//线上换掉

const tokenUtil={
	createToken:function(uname,pwd){
		console.log(uname,pwd,'000000000')
		return jwt.sign({
		  uname: uname,
		  pwd:pwd
		}, secret, { expiresIn: '30d' });//如果只写1表示1s失效 1h表示1小时失效 30d表示30天
	},
	checkToken:async  function(ctx,next){
		var hasErr=false;
		if(ctx.request.headers.webtoken!=undefined){
			var token=ctx.request.headers.webtoken;
			jwt.verify(token, secret,   function(err, decoded) {
			  //console.log(decoded) // { uname: 'abc', pwd: '123456', iat: 1525409145, exp: 1525412745 }
			  console.log(err);
			  if (err) {
			  	hasErr=true;
			            ctx.status=401;//unauthorized
			            ctx.message=err.message;
			            return;
		              }
		              //await next();//写在这里不生效
		          	});
		}else{
			hasErr=true;
			ctx.status=401;//unauthorized
		            ctx.message=err.message;
			return;
		}

		!hasErr && await next();//必须用await进行等待 不用await 不起作用   放在 Function里边不起作用。。。
	}
}

module.exports=tokenUtil;