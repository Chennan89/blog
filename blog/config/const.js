//console.log(process.env.NODE_ENV,'@@@@@@@@@@@@@')
let CONST_CONFIG;

switch(process.env.NODE_ENV){
	case 'development':
		CONST_CONFIG={
			SERVER_URL:'http://192.168.1.202:3000',//测试服务器地址
			UPLOAD_DEST:'http://localhost:8001/MyBlog/Chennan89.github.io/back_end/public/uploads/'
		}

		break;
	case 'production':
		CONST_CONFIG={
			SERVER_URL:'http://192.168.1.202:3000',//测试服务器地址
		}

		break;
}
export default CONST_CONFIG;