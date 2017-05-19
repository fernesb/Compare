var express = require('express');
var app = express();
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: "127.0.0.1",
	user: "root",
	password: "6666"
});

connection.connect(function(err){
	if(err){
		console.log('Error connecting to Database');
		return
	}

	console.log('Connection to Database is successful!');
});

app.get('/', function (req, res) {
  res.send('Hello World!')
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});