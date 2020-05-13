var socket = require("socket.io");
var express = require("express");
//var config = require("config");
var bodyParser = require("body-parser");


var app = express();
//body parser
app.use(bodyParser.json());
/*var host = config.get("server.host");
var port = config.get("server.port");*/
app.set("views",__dirname + "/views");
app.set("view engine","ejs");

//var controllers = require(__dirname + "/controllers");

//app.use(controllers);
app.get("/chat",function(req,res){
	res.render("chat");
})
var server = app.listen(3000, function(){
	console.log("this server is running on port:",3000);
})

var io = socket(server);
var socketcontrol = require(__dirname + "/socketcontrol")(io);