exports.sqlDb = function () {

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

};