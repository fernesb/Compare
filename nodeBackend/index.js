var express = require('express');
var app = express();
// include mysql connector here 
var mysql = require('mysql');
var jwt = require('jsonwebtoken');



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

app.get('/', function (req, res) {
  res.send('Hello World!')
});

// web server set up listening at 3000
var webServer = app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});

// set up socket io 
var io = require( 'socket.io' ).listen( webServer );
var connectedClients ={};

io.on('connection', function(socket){
	// pushing new socket in to connected clients array
	connectedClients[socket.id] = socket;
	console.log('One client just connected: '+ socket.id); 

	// Objects.keys() return the keys in this object in an array form;
	console.log("Total connected user numbers: "+Object.keys(connectedClients).length+" : "+Object.keys(connectedClients) );

	socket.on( 'disconnect', function() {
        console.log('Client: '+socket.id+" disconnect!");
        // then remove that socket from the array
        delete connectedClients[socket.id];
        console.log("Total connected user numbers: "+Object.keys(connectedClients).length+" : "+Object.keys(connectedClients) );
    });

    socket.on('handshake',function(msg){
    	console.log(msg);
    	socket.emit('test','This is a fake test');
    });

    socket.on('checkToken',function(msg){
    	console.log("The new token: "+msg);
    	try{
	    	var decoded = jwt.verify(msg, 'fernesyucompare');
	    	console.log("The new decoded: "+decoded);

	    	connection.query('SELECT * FROM loginSession WHERE userId=? AND token=?',
	    	[decoded, msg],
	    	function(error,results,fields){
	    		if(error){
	    			console.log(error);
	    		}
	    		console.log(results);

	    		if(results!=''){
	    			socket.emit('TokenFeedback',msg);
	    		}else{
	    			console.log('Need to login first');
	    		}
	    	});
    	} catch(err){
    		console.log('Potential attack: '+err);
    	}

    });

    // latest login function
    socket.on('userLogin',function(msg){
    	// generate tokes first
    	var token = jwt.sign(msg.userId, 'fernesyucompare');

    	// check if the user has logged in already
    	connection.query('SELECT * FROM loginSession WHERE token=? AND userId=?',
		[token, msg.userId],
		function(error,results,fields){
			if(error){
				console.log(error);
			}

			var callbackData = JSON.parse(JSON.stringify(results));
			if(results!=''){
				if(callbackData[0].socketId!= socket.id){
					console.log("User Logged in somewhere else already");
				}else{
					console.log("You are in!");
				}
			}else{
				// if user not logged in yet, then check credentials first

				connection.query('SELECT id from user WHERE userId = ?',
				[msg.userId], 
				function(error,results,fields){
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
		    			
		    			connection.query('SELECT * FROM user WHERE userId = ? and password = ? ', 
		    			[msg.userId, msg.password],
		    			function(error,results,fields){

		   					var callbackData = JSON.parse(JSON.stringify(results));
		   					
				    		if(results == ''){
				    			console.log("Password is not correct");
				    			var loginAck = {
				    				status: false,
				    				msg: "Password is not correct",
				    				userName: ''
				    			}
		    					socket.emit('loginStatus', loginAck);

				    		} else {
				    			// user login credentials are good, then store the token in login session
				    			connection.query('INSERT INTO loginSession (token, userId, socketId) VALUES (?,?,?)',
								[token, msg.userId, socket.id],
								function(error, results,fields){
									if (error){
										console.log(error);
									}
									console.log("just created the login session");

								});

				    			console.log('User just logged in');
				    			var loginAck = {
				    				status: true,
				    				msg: "User just logged in",
				    				userId: callbackData[0].userId,
				    				userName: callbackData[0].username,
				    				token: token,
				    			}
				    			socket.emit('loginStatus', loginAck);
				    		}

				    		if(error) console.log(error);
				    	});

		    		}
    			});

			}
		});
    });

	// latest sign up function
	socket.on('userSignUp',function(msg){
		// generate token
		var token = jwt.sign(msg.userId, 'fernesyucompare');

		connection.query('INSERT INTO USER (email, userId, fullName, password, shortInfo) VALUES (?,?,?,?,?)', 
		[msg.email, msg.userId, msg.fullname, msg.password, msg.shortinfo],
		function(error, results,fields){
			
			if (error){
				console.log(error);
			}else{

				var registerAck = {
					status: true,
					msg: "Registration successful!",
					token: token
				}

				socket.emit("SignUpStatus", registerAck);

				// created a loggin session
				connection.query('INSERT INTO loginSession (token, userId, socketId) VALUES (?,?,?)',
				[token, msg.userId, socket.id],
				function(error, results,fields){
					if (error){
						console.log(error);
					}
					console.log("just created the login session");

				});

				console.log("Registration successful!");

			}
		});

		
	}); 

    socket.on('newLogin',function(msg){
		//generate token
		console.log("UserId: "+msg);
		var token = jwt.sign(msg, 'fernesyucompare');
		//check if the login session existed already
		connection.query('SELECT * FROM loginSession WHERE token=? AND userId=?',
		[token, msg],
		function(error,results,fields){
			if(error){
				console.log(error);
			}

			var callbackData = JSON.parse(JSON.stringify(results));
			if(results!=''){
				if(callbackData[0].socketId!= socket.id){
					console.log("User Logged in somewhere else already");
				}else{
					console.log("You are in!");
				}
			}else{
				
				connection.query('INSERT INTO loginSession (token, userId, socketId) VALUES (?,?,?)',
				[token, msg, socket.id],
				function(error, results,fields){
					if (error){
						console.log(error);
					}
					console.log("just created the login session");

				});

				var object = {
					token: token,
					socketId: socket.id,
				}
				socket.emit('newLoginAck',object);

			}
		});

    });

    socket.on('logout',function(msg){
    	connection.query('DELETE FROM loginSession WHERE token=?',
    	[msg],
    	function(error,results,fields){
    		if(error){
    			console.log(error);
    		}

    		console.log("logged out successfully");
    	});
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
		// verify token first

		try {

		  	var decoded = jwt.verify(msg.token, 'fernesyucompare');
		  	console.log(decoded);

		  	connection.query('SELECT * FROM user WHERE userId=?',
			[msg.userName], 
			function(error,results,fields){
			
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

		} catch(err) {
		  	console.log(err);
		  	return;
		}
	});

	socket.on('friendRequest',function(msg){

		try {
			var decoded = jwt.verify(msg.token, 'fernesyucompare');
			
			// if the verification pass then,  
			connection.query("INSERT INTO relationship (user_one_id, user_two_id, status, action_user_id) VALUES (?, ?, ?, ?)",
			[decoded, msg.user_two_id, 0, decoded],
			function(error,results,fields){
				if(error){
					console.log(error);
				}

				if(results){
					// Insert works then sent back ack
					socket.emit('friendRequestAck', true);

					// here generate token
					var token = jwt.sign(msg.user_two_id, 'fernesyucompare');
					console.log(token);
					// then check if the user exist in the loginsession already
					connection.query('SELECT * FROM loginSession WHERE token=?',
					[token],
					function(error,results,fields){
						if(error){
							console.log(error);
						}
						
						if(results!=''){
							// if the user is connected
							var callbackData = JSON.parse(JSON.stringify(results));
							var socketId = callbackData[0].socketId;

							var requestSentFriendsList = [];
							// broadcast to the user_two (who will receive the request);
							connection.query('SELECT * FROM relationship WHERE (user_two_id =? ) AND status = 0',
							[msg.user_two_id],
							function(error,results,fields){
								
								if(error){
									console.log(error);
								}

								if(results!=''){
									var callbackData = JSON.parse(JSON.stringify(results));
									console.log(callbackData);
									//process the callback data, msg here is the logged in user
									for(i=0; i < callbackData.length; i++){

										console.log(callbackData[i]);
									
										var friendInfo = {
											friendId : callbackData[i].action_user_id
										}
										
										requestSentFriendsList.push(friendInfo);

									}

									console.log(requestSentFriendsList);
									connectedClients[socketId].emit('requestSentFriendsListAck',requestSentFriendsList);
								}else{
									//no friends yet
									console.log(requestSentFriendsList);
									connectedClients[socketId].emit('requestSentFriendsListAck',requestSentFriendsList);
								}
							}); // close tag for sql function

						}else{
							// not connected 
							console.log('This user is not connected');
						}
					});
					

					console.log(results);
				}
			});

		} catch(err) {
			console.log(err);
		}

		
	});

	socket.on('friendList',function(msg){
		var friendList = [];
		var decoded;
		// verify token first
		try {
		  	decoded = jwt.verify(msg, 'fernesyucompare');
		  	console.log(decoded);
		} catch(err) {
		  	console.log(err);
		  	return;
		}

		connection.query('SELECT * FROM relationship WHERE (user_one_id = ? or user_two_id =? ) AND status = 1',
		[decoded, decoded],
		function(error,results,fields){
			if(error){
				console.log(error);
			}

			if(results!=''){
				var callbackData = JSON.parse(JSON.stringify(results));
				console.log(callbackData);
				//process the callback data, msg here is the logged in user
				for(i=0; i < callbackData.length; i++){

					console.log(callbackData[i]);
					if(callbackData[i].user_one_id == decoded){
						console.log('found it');
						var friendInfo = {
							friendId : callbackData[i].user_two_id
						}
						friendList.push(friendInfo);
					}else{
						console.log('found it here');

						var friendInfo = {
							friendId : callbackData[i].user_one_id
						}
						
						friendList.push(friendInfo);
					}
				}

				console.log(friendList);
				socket.emit('friendListAck',friendList);
			}else{
				//no friends yet
				console.log(friendList);
				socket.emit('friendListAck',friendList);
			}
		});
	});

	socket.on('groupCompareList',function(msg){
		var decoded;
		var groupCompareList = [];
		try {

			decoded = jwt.verify(msg,'fernesyucompare');

			connection.query('SELECT * from user_group, groupInfo WHERE (user_group.user_id = ? AND user_group.group_id = groupInfo.id)',
			[decoded],
			function(error,results,fields){
				if(error){
					console.log(error);
				}

				if(results!=''){
					var callbackData = JSON.parse(JSON.stringify(results));
					console.log(results);
					for( i=0; i < callbackData.length; i++ ){
						var groupCompareInfo = {
							groupCompareId : callbackData[i].group_id,
							groupCompareName: callbackData[i].name
						}

						groupCompareList.push(groupCompareInfo);
					}
					console.log(groupCompareList);
					socket.emit('groupCompareListAck',groupCompareList);
				}else{
					console.log(groupCompareList);
					socket.emit('groupCompareListAck',groupCompareList);
				}
			});
		} catch (err) {
			console.log(err);
		}
	});

	socket.on('requestSentFriendsList',function(msg){
		var requestSentFriendsList = [];
		var decoded;

		try {
			
			decoded = jwt.verify(msg, 'fernesyucompare');

			connection.query('SELECT * FROM relationship WHERE (user_two_id =? ) AND status = 0',
			[decoded],
			function(error,results,fields){
				if(error){
					console.log(error);
				}

				if(results!=''){
					var callbackData = JSON.parse(JSON.stringify(results));
					console.log(callbackData);
					//process the callback data, msg here is the logged in user
					for(i=0; i < callbackData.length; i++){

						console.log(callbackData[i]);
					
						var friendInfo = {
							friendId : callbackData[i].action_user_id
						}
						
						requestSentFriendsList.push(friendInfo);

					}

					console.log(requestSentFriendsList);
					socket.emit('requestSentFriendsListAck',requestSentFriendsList);
				}else{
					//no friends yet
					console.log(requestSentFriendsList);
					socket.emit('requestSentFriendsListAck',requestSentFriendsList);
				}
			}); // close tag for sql function

		} catch(err) {
			console.log(err);
		}
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
					connection.query('SELECT * FROM profilePicPosts WHERE postBy=?',
					[msg.user_two_id],function(error,results,fields){
						var callbackData = JSON.parse(JSON.stringify(results));
						socket.emit('voteAck', callbackData);
					});
					
				});

			});
		});
	});

	socket.on('chatMessage',function(msg){
		socket.broadcast.emit('chatMessage', msg);
	});


	socket.on('individualChatMessage',function(msg){

		var friendToken =  jwt.sign(msg.friendId,'fernesyucompare' );
		var decoded = jwt.verify(msg.token,'fernesyucompare');
		// 是相反的
		var eventName = decoded+friendToken;

		connection.query('SELECT * FROM loginsession WHERE token = ?',
		[friendToken],
		function(error,results,field){
			if(error){
				console.log(error);
			}else{
				if(results!=''){
					var callbackData = JSON.parse(JSON.stringify(results));
					var socketId = callbackData[0].socketId;
					connectedClients[socketId].emit(eventName, msg.message);
				}
			}
		});

	});

	socket.on('groupChatMessage',function(msg){
		// check token
		var decoded;
		var groupClients = [];

		try {
			decoded = jwt.verify(msg.token,'fernesyucompare');

			//get groupid 
			var groupId = msg.groupId;
			console.log(groupId);
			// get all the users who have this groupId
			connection.query('SELECT loginSession.socketId from user_group, loginSession WHERE (user_group.group_id = ? AND user_group.user_id = loginSession.userId)',
			[groupId],
			function(error,results,fields){
				if(error){
					console.log(error);
				}

				if(results!=''){
					var callbackData = JSON.parse(JSON.stringify(results));
					console.log(callbackData);

					// create an array for sockets in the same group
					for( i = 0; i < callbackData.length; i++ ){
						groupClients.push( callbackData[i].socketId );
					}

					for( i = 0; i < groupClients.length; i++ ){
						connectedClients[ groupClients[i] ].emit(groupId, msg.message);
					}

					console.log(groupClients);
				}else{
					console.log('no data here');
				}

			});
		} catch(err) {
			console.log(err);
		}

	});


	socket.on('acceptRequest',function(msg){
		var decoded;

		try{
			decoded = jwt.verify(msg.token, 'fernesyucompare');
			// update relationship
			connection.query('UPDATE relationship SET status=? WHERE action_user_id = ? AND user_two_id =?',
			[1, msg.friendId, decoded],
			function(error,fields,results){
				if(error){
					console.log(error);
				}else{
					socket.emit('acceptRequestAck',true);
					// also real-time update my own contacts list
					// if the other user is connected to server, give real-time update
					// modify later
				}

			});
		} catch(err) {

		}
	});

});