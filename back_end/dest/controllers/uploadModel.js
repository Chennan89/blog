"use strict";var multer=require("koa-multer"),storage=multer.diskStorage({destination:function(e,t,l){l(null,"public/uploads/")},filename:function(e,t,l){var a=t.originalname.split(".");l(null,Date.now()+"."+a[a.length-1])}}),upload=multer({storage:storage});module.exports=upload;