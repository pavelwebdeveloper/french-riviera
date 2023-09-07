exports.sqlDb = function () {

	var mysql = require('mysql');
	
	// Config dotnev
	require("dotenv").config();

	var con = mysql.createConnection({
	  host: process.env.MYSQLHOST,
	  user: process.env.MYSQLUSER,
	  password: process.env.MYSQLPASSWORD,
	  database: process.env.MYSQLDATABASE
	});

	con.connect(function(err) {
	  if (err) throw err;
	  console.log("Connected!");
	});
	
	return con;

};