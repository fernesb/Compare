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
		console.log('Error connecting to Database');
		return
	}

	console.log('Connection to Database is successful!');
});

connection.query('SELECT * from user', function(err, rows, fields) {
	console.log('The solution is: ',rows)
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

io.on('connection', function(socket){
	console.log('One client just connected: '+ socket.id);

	socket.on( 'disconnect', function() {
        console.log('Client: '+socket.id+" disconnect!");
    });

    socket.on('handshake',function(msg){
    	console.log(msg);
    });
});