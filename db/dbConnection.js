

	const mysql = require('mysql');
	
	// Config dotnev
	require("dotenv").config();

	connection = mysql.createConnection({
	  host: process.env.MYSQLHOST,
	  user: process.env.MYSQLUSER,
	  password: process.env.MYSQLPASSWORD,
	  database: process.env.MYSQLDATABASE

	});

	connection.connect(function(err) {
		if (err) {
		console.error("CONNECTION FAILED", err.code);
	  } else console.log("Connected!");
	});
	
	module.exports = { connection };
	
	