var fs = require('fs'),
	md = require('markdown-it')();

function transMarkDown(content){
	//return markdown.toHTML(content);
	return md.render(content);
}
module.exports=transMarkDown;