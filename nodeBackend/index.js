var express = require('express');
var app = express();
// include mysql connector here 
var mysql = require('mysql');


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
		    				userName: "testUser"
		    			}
		    			socket.emit('loginStatus', loginAck);
		    		}

		    		if(error) console.log(error);
		    	});

    		}

    	});

		// connection.end();
    	// console.log(msg.email);
    	// console.log(msg.password);
    })
});