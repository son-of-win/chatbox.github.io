module.exports = function(io){

	var usernames = [];
	io.sockets.on("connection",function(socket){
		console.log("Have a new user connected");

		//listen adduser event
		socket.on("adduser",function(username){ // server lắng nghe một sự kiện có tên là adduser
			//save 
			socket.username = username;
			usernames.push(username);

			//Notify to myself
			var data = {
				sender: "SERVER",
				message: "You have join chat room"
			};

			socket.emit("update_message",data);

			//notify to other users
			var data = {
				sender:"SERVER:",
				message: username + " have join to chat room"
			};

			socket.broadcast.emit("update_message",data);
		});
	

	 	//listen send_message event
		 socket.on("send_message",function(message){
			//notify to my self
			var data = {
				sender:"You",
				message: message
			};
			socket.emit("update_message",data);
			//notify to other users
			var data = {
				sender:socket.username,
				message: message
			};
			socket.broadcast.emit("update_message",data);
		});

		//listen disconnect event
		socket.on("disconnect",function(){
			//delete username
			for(var i = 0 ; i < usernames.length;i++){
				if(usernames[i] == socket.username){
					usernames.splice(i,1);
				}
			}

			//notify to other user
			var data = {
				sender:"SERVER",
				message: socket.username + " leave this room"
			};
			socket.broadcast.emit("update_message",data);
		})
		
	});
}