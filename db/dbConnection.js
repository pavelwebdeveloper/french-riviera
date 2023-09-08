/*exports.sqlDb = function () {

	var mysql = require('mysql');

	var con = mysql.createConnection({
	  host: "localhost",
	  user: "root",
	  password: "",
	  database: "french-riviera"
	});

	con.connect(function(err) {
	  if (err) throw err;
	  console.log("Connected!");
	});
	
	return con;

};*/


const mysql = require('mysql2');
	
	// Config dotnev
	require("dotenv").config();
	

	connection = mysql.createConnection({
	  host: process.env.MYSQLHOST,
	  port: process.env.MYSQLPORT,
	  user: process.env.MYSQLUSER,
	  password: process.env.MYSQLPASSWORD,
	  database: process.env.MYSQLDATABASE
	  /*host: "localhost",
	  user: "root",
	  password: "",
	  database: "french-riviera"*/


	});

	connection.connect(function(err) {
		if (err) {
		console.error("CONNECTION FAILED", err.code);
	  } else console.log("Connected!");
	});
	
	module.exports = { connection };
	
	
