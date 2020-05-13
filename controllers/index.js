var express = require("express");
var router = express.Router();

router.use("/chat",__dirname + "chat.js");

router.get("/", function(req,res){
	res.json({"message":"this is home page"});
});

router.get("/chat",function(req,res){
	res.render("chat");
})

module.exports=router;