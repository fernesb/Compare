var express = require('express');
var app = express();
// include mysql connector here 
var mysql = require('mysql');


// database connection 
var connection = mysql.createConnection({
	host: "127.0.0.1",
	user: "root",
	password: "6666",
	database: "compare"
});

connection.connect(function(err){
	if(err){
		console.log("Database connection: "+err);
		return
	}
	// console.log('Connection to Database is successful!');
});

// trying to do the error handling here, but there is still something wrong
// try{
// 	connection.connect(function(err){
// 		if(err){
// 			throw err;
// 			return;
// 		} else {
// 			console.log('Connection to Database is successful!');
// 		}
// 	});
// } catch(e) {
// 	console.log("Connection failed: "+e);
// }



// connection.query('SELECT * from user', function(err, rows, fields) {
// 	console.log('The solution is: ',rows)
// });
/////////////////////////////////////////////////////////////////////////////////

app.get('/', function (req, res) {
  res.send('Hello World!')
});

// web server set up listening at 3000
var webServer = app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

// set up socket io 
var io = require( 'socket.io' ).listen( webServer );

io.on('connection', function(socket){
	console.log('One client just connected: '+ socket.id);

	socket.on( 'disconnect', function() {
        console.log('Client: '+socket.id+" disconnect!");
    });

    socket.on('handshake',function(msg){
    	console.log(msg);
    	socket.emit('test','This is a fake test');
    });

    socket.on('login',function(msg){

		connection.query('SELECT id from user WHERE email = ?',[msg.email], function(error,results,fields){
    		if(error) {
    			console.log("Error checking if the user exists: "+error)
    		}

    		if(results==''){
    			console.log("User does not exist");
    			var loginAck = {
    				status: false,
    				msg: "User does not exist",
    				userName:''
    			}
    			socket.emit('loginStatus', loginAck);
    		}else{
    			
    			connection.query('SELECT * FROM user WHERE email = ? and password = ? ', [msg.email, msg.password],function(error,results,fields){
   					var callbackData = JSON.parse(JSON.stringify(results));
   					console.log(callbackData[0].userId);
		    		if(results == ''){
		    			console.log("Password is not correct");
		    			var loginAck = {
		    				status: false,
		    				msg: "Password is not correct",
		    				userName: ''
		    			}
    					socket.emit('loginStatus', loginAck);

		    		} else {
		    			console.log('User just logged in');
		    			var loginAck = {
		    				status: true,
		    				msg: "User just logged in",
		    				userId: callbackData[0].userId,
		    				userName: callbackData[0].username
		    			}
		    			socket.emit('loginStatus', loginAck);
		    		}

		    		if(error) console.log(error);
		    	});

    		}

    	});

		
    }); // close tag for socket("login")

	socket.on("register",function(msg){
		console.log(msg);
		connection.query('SELECT * FROM user WHERE email = ?',[msg.email],function(error,results,fields){
			if(error) {
				console.log(error);
			} 

			if(results!=''){
				console.log("This email has been used already!");
				var registerAck = {
					status: false,
					msg: "This email has been used already!"
				}
				socket.emit("registerStatus", registerAck);

			}else{
				// insert new user here 
				connection.query('INSERT INTO USER (email, password) VALUES (?,?)', [msg.email, msg.password],function(error, results,fields){
					if (error){
						console.log(error);
					}
				});
				var registerAck = {
					status: true,
					msg: "Registration successful!"
				}
				socket.emit("registerStatus", registerAck);

				console.log("Registration successful!");
			}
		});
	});

	socket.on('searchContacts',function(msg){
		connection.query('SELECT * FROM user WHERE userId=?',[msg.userName], function(error,results,fields){
			if(error){
				console.log(error)
			}

			if(results!=''){
				console.log('Found user: '+ msg.userName);

				var callbackData = JSON.parse(JSON.stringify(results));
				console.log(callbackData);

				var searchAck = {
					status: true,
					content: callbackData,
				};
				socket.emit('searchStatus',searchAck);
			}else{
				console.log('Did not find user: '+ msg.userName);
				var searchAck = {
					status: false,
					msg: 'Did not find this user'
				};
				socket.emit('searchStatus',searchAck);
			}
		});
	});

	socket.on('friendRequest',function(msg){
		connection.query("INSERT INTO relationship (user_one_id, user_two_id, status, action_user_id) VALUES (?, ?, ?, ?)",
			[msg.user_one_id, msg.user_two_id, 0, msg.user_one_id],
			function(error,results,fields){
				if(error){
					console.log(error);
				}

				if(results){
					console.log(results);
				}
			}
		);
	});

	socket.on('friendList',function(msg){
		var friendList = [];

		connection.query('SELECT * FROM relationship WHERE (user_one_id = ? or user_two_id =? ) AND status = 1',
		[msg, msg],
		function(error,results,fields){
			if(error){
				console.log(error);
			}

			if(results!=''){
				var callbackData = JSON.parse(JSON.stringify(results));
				//process the callback data, msg here is the logged in user
				for(i=0; i < callbackData.length; i++){
					if(callbackData[i].user_one_id == msg){
						var friendInfo = {
							friendId : callbackData[i].user_two_id
						}
						friendList.push(friendInfo);
					}else{
						var friendsInfo = {
							friendId : callbackData[i].user_one_id
						}
						friendList.push(friendInfo);
					}
				}

				console.log(friendList);
				socket.emit('friendListAck',friendList);
			}
		});
	});

	socket.on('profilePicsRequest', function(msg){
		connection.query('SELECT * FROM profilePicPosts WHERE postBy = ?',
		[msg],
		function(error,results,fields){
			if(error){
				console.log(error);
			}

			if(results!=''){
				var callbackData = JSON.parse(JSON.stringify(results));
				socket.emit('profilePicsRequestAck', callbackData);
				console.log(callbackData);
			}else{
				console.log('no posts yet');
			}
		});
	});

	socket.on('voteStatus',function(msg){
		console.log(msg);
		connection.query('SELECT status FROM voteStatus WHERE user_one_id =? AND user_two_id =?',
		[msg.user_one_id,msg.user_two_id],
		function(error,results,fields){
			if(error){
				console.log(error);
			}

			console.log(results);
			// check if exists a cell between the two users
			// false means not voted yet
			if(results==''){
				socket.emit('voteStatusAck',false);
				connection.query('INSERT INTO voteStatus (user_one_id, user_two_id, status) VALUES (?, ?, ?)',
				[msg.user_one_id, msg.user_two_id, 0],
				function(error,results,fields){
					if(error){
						console.log(error)
					}

					if(results!=''){
						console.log('created entry successfully');
					}
				});
			}else{
				var callbackData = JSON.parse(JSON.stringify(results));
				console.log(callbackData);
				if(callbackData[0].status == 1){
					console.log('status is 1');
					socket.emit('voteStatusAck',true);
				}else{
					console.log('status is 0');
					socket.emit('voteStatusAck',false);
				}	
			}
		});
	});

	socket.on('vote',function(msg){
		connection.query('SELECT id FROM voteStatus WHERE user_one_id =? AND user_two_id =?',
		[msg.user_one_id,msg.user_two_id],
		function(error,results,fields){
			if(error){
				console.log(error);
			}
			console.log('found row')
			var callbackData = JSON.parse(JSON.stringify(results));
			connection.query('UPDATE voteStatus SET status=? WHERE id =?',[1, callbackData[0].id],function(error,results,fields){
				if(error){
					console.log(error);
				}

				//here increment the vote counts for that specific picture
				connection.query('UPDATE profilePicPosts SET votes=votes+1 WHERE id=?',
				[msg.photoId],
				function(error,results,fields){
					connection.query('SELECT * FROM profilePicPosts WHERE id=?',
					[msg.photoId],function(error,results,fields){
						var callbackData = JSON.parse(JSON.stringify(results));
						socket.emit('voteAck', callbackData);
					});
					
				});

			});
		});
	});

});