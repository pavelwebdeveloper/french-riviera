// index.js for travel-in-ukraine-app
// load the things we need

require('dotenv').config();
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 3000
const app = express();
//const connectionString = process.env.DATABASE_URL;
//var db = require('./db/dbConnection');

//const { connection } = require("./db/dbConnection");
//console.log("Database was supposed to connect !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

// Connect to Back4App
var Parse = require('parse/node');
Parse.initialize("v3yxu9UrfPZ4bQrbZ0uZ64VEvVRBHEnzz0WJAY7J","dfISjDozh05179znZBdlKzvuN9RCkxQfIhDP68LV"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
Parse.serverURL = 'https://parseapi.back4app.com/'





const { Pool } = require('pg')
var myParser = require("body-parser");
//const pool = new Pool({connectionString: connectionString,
//  ssl: {
//    rejectUnauthorized: false
//		}
//	});
const bcrypt = require('bcrypt');
const saltRounds = 10;
var session = require('express-session');

// set up sessions
app.use(session({
  secret: 'my express secret',
  saveUninitialized: true,
  resave: false
}));

app
  .use(express.static(path.join(__dirname, 'public')))
  .use(myParser.urlencoded({extended : true}))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  // index2 page
  .get('/gotoinformation', goToInformation)
  .get('/', (req, res) => res.render('pages/index2'))
  .get('/getcontactform', getContactForm)
  .get('/getloginform', getLogInForm)
  .get('/getloginoutmenu', getLogInOutMenu)
  .get('/getsignupform', getSignUpForm)
  .get('/getsignupform', getSignUpForm)
  .post('/login', logIn)
  .get('/logout', logOut)
  .post('/signup', signUp)
  //.get('/placesofinterestlist', getPlacesOfInterest)
  .get('/placesofinterest_french_riviera', getPlacesOfInterest)
  .get('/manageaccount', manageAccount)
  .put('/updateaccountinfo', updateAccountInfo)
  .post('/updatepassword', updatePassword)
  .get('/getmanageaccountform', getManageAccountForm)
  .post('/contactinfo', saveContactInfo)
  .get('/getmanageplacesofinterestpage', getManagePlacesOfInterestPage)
  .get('/getaddplaceofinterestpage', getAddPlaceOfInterestPage)
  .post('/addplaceofinterest', addPlaceOfInterest)
  .get('/getupdateplaceofinterestpage', getUpdatePlaceOfInterestPage)
  .post('/updateplaceofinterest', updatePlaceOfInterest)
  .get('/getdeleteplaceofinterestpage', getDeletePlaceOfInterestPage)
  .get('/deleteplaceofinterest', deletePlaceOfInterest)
  // placesofinterest page
  //.get('/placesofinterest', (req, res) => res.render('pages/placesofinterest'))
  .get('/placesofinterest', getPlacesOfInterest)
  .get('/showplaceofinterestdetails', getAndShowPlaceOfInterestDetails)
  
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
  
  function goToInformation(req, res){
		res.render('pages/mainpage')	  
  }
  
  function getContactForm(req, res){
	  console.log("Let's look at the informationKinda !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
	  var infomessage = "";
	res.render('pages/contactform', {
		infomessage: infomessage
		});  
  }
  
  function getManagePlacesOfInterestPage(req, res) {
	  var infomessage = "";
	 console.log("Getting places of interest from DB");
	
		// This runs the query, and then calls the provided anonymous callback function
		// with the results.
  		Parse.Query('SELECT * FROM placesofinterest_french_riviera', function(err, result) {
      if (err) {
        return console.error('error running query', err);
      }
	  
	  // Log this to the console for debugging purposes.
    console.log("Back from DB with result:");
	console.log(result.rows);
	const placesOfInterest = result.rows;
	console.log("placesOfInterest variable:");
	console.log(placesOfInterest);
	//res.status(200).json(placesOfInterest);
	
	res.render('pages/manage_places_of_interest_page', {
        placesOfInterest: placesOfInterest,
		infomessage: infomessage
    });
	
	//callback(null, result.rows);
    }); 
  }
  
  function getAddPlaceOfInterestPage(req, res){
	res.render('pages/add_place_of_interest_page');  
  }
  
  async function addPlaceOfInterest(req, res){

		
	  	var infomessage = "";
		console.log("Add Place of Interest Info:");
		console.log(req.body.jsonstring);
		var obj = JSON.parse(req.body.jsonstring);
		if(!obj.placeofinterestname || !obj.placeofinterestdescription || !obj.image || !obj.imagewikipedialink) {
			infomessage = "Please, provide all the required information.";
				res.render('pages/add_place_of_interest_page', {
				infomessage: infomessage
			});	
		}
		/*
		Parse.Query('INSERT INTO placesofinterest_french_riviera (placeofinterestname, placeofinterestdescription, locationname, locationid, priceforvisit, locationmap, openhours, phonenumber, website, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9 , $10)', [obj.placeofinterestname, obj.placeofinterestdescription, obj.locationname, obj.locationid, obj.priceforvisit, obj.locationmap, obj.openhours, obj.phonenumber, obj.website, obj.image], function(err, result) {
	  
		if (err) {
			return console.error('error running query', err);
		}
	  
	  	// Log this to the console for debugging purposes.
		console.log("Back from DB with result of signup:");
		console.log(result);
		console.log(result.rowCount);
		console.log(`User added with ID: ${result.insertId}`);
		
		//res.sendStatus(200);
		
		if(result.rowCount){
			infomessage = "You have successfully added " + obj.placeofinterestname + " Place of Interest.";
		} else {
			infomessage = "Sorry. Adding the new Place of Interest has failed. Please, try again.";
			res.render('pages/add_place_of_interest_page', {
			infomessage: infomessage
		});
		}
		
		res.render('pages/manage_places_of_interest_page', {
			infomessage: infomessage
		});
		
		//callback(null, result.rows);
		});*/


		const placeOfInterest = new Parse.Object("Place_of_interest");

		placeOfInterest.set("name", obj.placeofinterestname);
		placeOfInterest.set("description", obj.placeofinterestdescription);
		placeOfInterest.set("image", obj.image);
		placeOfInterest.set("imageWikipediaLink", obj.imagewikipedialink);

		placeOfInterest.save().then(function(place_of_interest){
			console.log('Pet created successful with name: ' + place_of_interest.get("name") + ' and description: ' + place_of_interest.get("description"));
		}).catch(function(error){
			console.log('Error: ' + error.message);
		});
  }

  function getUpdatePlaceOfInterestPage(req, res){
	  console.log("Getting place of interest from DB");
	
	// This runs the query, and then calls the provided anonymous callback function
	// with the results.
	Parse.Query('SELECT * FROM placesofinterest_french_riviera WHERE id=' + req.query.id + '', function(err, result) {
      if (err) {
        return console.error('error running query', err);
      }
	  
	  // Log this to the console for debugging purposes.
    console.log("Back from DB with result:");
	console.log(req.query.id);
	console.log(result.rows);
	const placeOfInterest = result.rows;
	console.log("placeOfInterest variable:");
	console.log(placeOfInterest);
	console.log(placeOfInterest[0].placeofinterestname);
	console.log(placeOfInterest[0].placeofinterestdescription);
	console.log(placeOfInterest[0].locationname);
	console.log(placeOfInterest[0].locationid);
	console.log(placeOfInterest[0].priceforvisit);
	console.log(placeOfInterest[0].locationmap);
	console.log(placeOfInterest[0].openhours);
	console.log(placeOfInterest[0].phonenumber);
	console.log(placeOfInterest[0].website);
	console.log(placeOfInterest[0].image);
	var id = placeOfInterest[0].id;
	var name = placeOfInterest[0].placeofinterestname;
	var description = placeOfInterest[0].placeofinterestdescription;
	var locationname = placeOfInterest[0].locationname;
	var locationid = placeOfInterest[0].locationid;
	var price = placeOfInterest[0].priceforvisit;
	var locationmap = placeOfInterest[0].locationmap;
	var openhours = placeOfInterest[0].openhours;
	var phonenumber = placeOfInterest[0].phonenumber;
	var website = placeOfInterest[0].website;
	var image = placeOfInterest[0].image;
	
	//res.status(200).json(placesOfInterest);
	
	res.render('pages/update_place_of_interest_page', {
		id: id,
        name: name,
		description: description,
		locationname: locationname,
		locationid: locationid,
		price: price,
		locationmap: locationmap,
		openhours: openhours,
		phonenumber: phonenumber,
		website: website,
		image: image
    });
	
	//callback(null, result.rows);
    });
	  	
  }
  
  function updatePlaceOfInterest(req, res){
	  var infomessage = "";
	  console.log("Update Place Of Interest: %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
		
	console.log(req.body.jsonstring);
	var obj = JSON.parse(req.body.jsonstring);
	console.log(obj);
	
	var emailForQuery = obj.email;

 
	Parse.Query('UPDATE placesofinterest_french_riviera SET placeofinterestname = $2, placeofinterestdescription = $3, locationname = $4, locationid = $5, priceforvisit = $6, locationmap = $7, openhours = $8, phonenumber = $9, website = $10, image = $11  WHERE id = $1', [obj.id, obj.placeofinterestname, obj.placeofinterestdescription, obj.locationname, obj.locationid, obj.priceforvisit, obj.locationmap, obj.openhours, obj.phonenumber, obj.website, obj.image], function(err, result) {
	console.log("Result from DB with ");
	console.log(result);

	
	  
      if (err) {
        return console.error('error running query', err);
      }
});

     
	  console.log(userInformation);

infomessage = "The information about " + result.rows[0].placeofinterestname + " Place of Interest has been successfully updated";

res.render('pages/manage_places_of_interest_page', {
        infomessage: infomessage
    });
  }
  
  function getDeletePlaceOfInterestPage (req, res) {
	  console.log("Getting place of interest from DB");
	
	// This runs the query, and then calls the provided anonymous callback function
	// with the results.
	Parse.Query('SELECT * FROM placesofinterest_french_riviera WHERE id=' + req.query.id + '', function(err, result) {
      if (err) {
        return console.error('error running query', err);
      }
	  
	  // Log this to the console for debugging purposes.
    console.log("Back from DB with result:");
	console.log(req.query.id);
	console.log(result.rows);
	const placeOfInterest = result.rows;
	console.log("placeOfInterest variable:");
	console.log(placeOfInterest);
	console.log(placeOfInterest[0].placeofinterestname);
	console.log(placeOfInterest[0].placeofinterestdescription);
	var id = placeOfInterest[0].id;
	var name = placeOfInterest[0].placeofinterestname;
	var description = placeOfInterest[0].placeofinterestdescription;
	
	//res.status(200).json(placesOfInterest);
	
	res.render('pages/delete_place_of_interest_page', {
		id: id,
        name: name,
		description: description
    });
	
	//callback(null, result.rows);
    });
	  	
  }
  
  function deletePlaceOfInterest(req, res) {
	  console.log("Id of Place of Interest that is going to be deleted:");
	  var name = req.query.placeofinterestname;
	  var infomessage = "";
	console.log(req.query.id);
	Parse.Query('DELETE FROM placesofinterest_french_riviera WHERE id=$1', [req.query.id], function(err, result) {
      if (err) {
        return console.error('error running query', err);
      }
	  
	  // Log this to the console for debugging purposes.
    console.log("Back from DB with result:");
	console.log(result);
	
	if(result.rowCount === 1){
		infomessage = "You have successfully deleted " + name + " Place of Interest.";
	} else {
		infomessage = "Sorry. Deleting the " + name + " Place of Interest has failed. Please, try again.";
		res.render('pages/manage_places_of_interest_page', {
        infomessage: infomessage
    });
	}
	
	//callback(null, result.rows);
    });
  }
  
  function getLogInOutMenu(req, res) {
	  console.log("getLogInOutMenu is working !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
	  console.log(req.session);
	  console.log(req.session.user);
	  if(req.session.user){
		  var loggedinas = "You are logged in as " + req.session.user;
		 res.render('partials/loggedinnav', {
        loggedinas: loggedinas
    }); 
	  } else {
		 res.render('partials/loggedoutnav');
	  }
  }
  
  
  function getLogInForm(req, res) {
	  var loggedinas = "";
	  var infomessage = "";
	var name = "";
	res.render('pages/loginform', {
        name: name,
		infomessage: infomessage
    });
  }
  
  function getSignUpForm(req, res) {
	  var infomessage = "";
	res.render('pages/signupform', {
		infomessage: infomessage
    });
  }
  
  function signUp(req, res) {
	  var infomessage = "";
	console.log("Sign Up Info:");
	console.log(req.body.jsonstring);
	var obj = JSON.parse(req.body.jsonstring);
	console.log(obj);
	console.log(obj.name);
	console.log(obj.email);
	console.log(obj.password);
	var password = obj.password;
	if(!obj.name || !obj.email || !obj.password) {
	infomessage = "Please, provide all the required information.";
		res.render('pages/signupform', {
        infomessage: infomessage
    });	
	}
	bcrypt.hash(password, saltRounds, function(err, hash) {
		Parse.Query('INSERT INTO users_french_riviera (username, email, password) VALUES ($1, $2, $3)', [obj.name, obj.email, hash], function(err, result) {
	  
      if (err) {
        return console.error('error running query', err);
      }
	  
	  // Log this to the console for debugging purposes.
    console.log("Back from DB with result of signup:");
	console.log(result);
	console.log(result.rowCount);
	console.log(`User added with ID: ${result.insertId}`);
	
	//res.sendStatus(200);
	
	
	if(result.rowCount === 1){
		infomessage = "You have successfully signed up as " + obj.name + ". Now you can log in.";
	} else {
		infomessage = "Sorry. Signing up has failed. Please, try again.";
		res.render('pages/signupform', {
        infomessage: infomessage
    });
	}
	
	res.render('pages/loginform', {
        infomessage: infomessage
    });
	
	//callback(null, result.rows);
    });
});

  }
  
  function logIn(req, res) {
	  var infomessage = "";
	console.log("Log In Info:");
	console.log(req.body.jsonstring);
	var obj = JSON.parse(req.body.jsonstring);
	console.log(obj);
	console.log(obj.email);
	console.log(obj.password);
	if(!obj.email || !obj.password) {
	infomessage = "Please, provide all the required information.";
		res.render('pages/loginform', {
        infomessage: infomessage
    });	
	}
	
	
	
	Parse.Query('SELECT * FROM users_french_riviera WHERE email = $1', [obj.email], function(err, result) {
		
	  
	  console.log("Result from DB");
	console.log(result);
	  
      if (err) {
        return console.error('error running query', err);
      }
	  if(result.rowCount === 0) {
	  console.log("Found records:");
	  console.log(result.rowCount);
		  console.log("Hi there!");
		  infomessage = "The credentials are wrong. Login failed. Please, provide the correct credentials.";
		  console.log("Infomessage:");
		  console.log(infomessage);
		  return res.render("pages/loginform", {
        infomessage: infomessage
    });
	  }
	  
	  // Log this to the console for debugging purposes.
    console.log("Back from DB with result of selecting for login:");
	console.log(result.rows[0].password);
	
	// Load hash from your password DB.
	var password = obj.password;
	console.log("Password for bcrypt.compare");
	console.log(password);
	var hashForCompare = result.rows[0].password;
	console.log("Hash for bcrypt.compare");
	console.log(hashForCompare);
	var loggedin = false;
	if(bcrypt.compare(password, hashForCompare)){
		console.log("Result of comparing the passwords:");
	console.log(res);
	loggedin = true;
	req.session.userid = result.rows[0].id;
	req.session.user = result.rows[0].username;
	req.session.email = result.rows[0].email;
	req.session.userlevel = result.rows[0].userlevel;
	console.log("INFO FOR THE SESSION !!!!!!!!!!!!!!!");
	console.log(result.rows[0].id);
	console.log(result.rows[0].username);
	console.log(result.rows[0].email);
	console.log(result.rows[0].userlevel);
	console.log("Session info:");
	console.log(req.session);
	console.log("Session user info:");
	console.log(req.session.user);
		res.render("pages/mainpage");
		}
});
}


function logOut(req, res) {
	req.session.destroy(function(err) {
  res.render("pages/index2");
})
	
}

function manageAccount(req, res){
	var userid = req.session.userid;
	var name = req.session.user;
	var email = req.session.email;
	var userlevel = req.session.userlevel;
	var updateaccountresult = "";
	Parse.Query('SELECT * FROM users_french_riviera WHERE id = $1',  [userid], function(err, result) {
		if (err) {
        return console.error('error running select query', err);
      }
		console.log("Result from ---------------------------------------------------DB");
		console.log(result);
		console.log(result.rowCount);
		console.log(result.rows);
		name = result.rows[0].username;
		email = result.rows[0].email;
		var id = result.rows[0].id;
	if(userlevel > 1) {
	return res.render("pages/manage_account_as_admin", {
        name: name,
		email: email,
		updateaccountresult: updateaccountresult,
		id: id
    });	
	}
	res.render("pages/manageaccount", {
        name: name,
		email: email,
		updateaccountresult: updateaccountresult
    });
	});
}

function getManageAccountForm(req, res){
	var userid = req.session.userid;
	var name = req.session.user;
	var email = req.session.email;
	Parse.Query('SELECT * FROM users_french_riviera WHERE id = $1',  [userid], function(err, result) {
		if (err) {
        return console.error('error running select query', err);
      }
		console.log("Result from ---------------------------------------------------DB");
		console.log(result.rows[0].id);
		var id = result.rows[0].id;
		name = result.rows[0].username;
		email = result.rows[0].email;
		
		res.render("pages/manage_account_page", {
        name: name,
		email: email,
		id: id
    });
});
	
}



function updateAccountInfo(req, res){
	console.log("Update Info: %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
		
	console.log(req.body.jsonstring);
	var obj = JSON.parse(req.body.jsonstring);
	console.log(obj);
	console.log(obj.userid);
	console.log(obj.name);
	console.log(obj.email);
	var emailForQuery = obj.email;

 
	Parse.Query('UPDATE users_french_riviera SET username = $1, email = $2 WHERE id = $3', [obj.name, obj.email, obj.userid], function(err, result) {
	console.log("Result from DB with ");
	console.log(result);
	if (err) {
        return console.error('error running query', err);
      }
	if(result.rowCount === 0){
		var updateaccountresult = "Sorry, update has failed. Please, try again";
		res.render("pages/manageaccount");
	} 
	Parse.Query('SELECT * FROM users WHERE id = $1',  [obj.userid], function(err, result) {
		if (err) {
        return console.error('error running select query', err);
      }
		var updateaccountresult = "Your account information has been successfully updated";
		console.log("Your account information has been successfully updated");
		var name = result.rows[0].username;
var email = result.rows[0].email;
req.session.user = name;
req.session.email = email;
console.log(result.rows[0].username);
console.log(result.rows[0].email);
console.log(name);
console.log(email);
console.log(req.session.user);
console.log(req.session.email);
res.render("pages/manageaccount", {
        name: name,
		email: email,
		updateaccountresult: updateaccountresult
    });
console.log(result.rowCount);
		
		
	
});	
});


}
 
function updatePassword(req, res){
	var obj = JSON.parse(req.body.jsonstring);
	var password = obj.password;
	bcrypt.hash(password, saltRounds, function(err, hash) {
		var id = obj.userid;
		console.log(id);
		Parse.Query('UPDATE users_french_riviera SET password = $1 WHERE id = $2', [hash, id], function(err, result) {
	console.log("Result from DB with ");
	console.log(result);
	if(result.rowCount === 0){
		var updateaccountresult = "Sorry, update has failed. Please, try again";
		res.render("pages/manageaccount");
	}

	
	  
      if (err) {
        return console.error('error running query', err);
      }
});

Parse.Query('SELECT * FROM users_french_riviera WHERE id = $1',  [obj.userid], function(err, result) {
		if (err) {
        return console.error('error running select query', err);
      }
		var updateaccountresult = "Your password has been successfully updated";
		var name = result.rows[0].username;
var email = result.rows[0].email;
req.session.user = name;
req.session.email = email;
		
		res.render("pages/manageaccount", {
        name: name,
		email: email,
		updateaccountresult: updateaccountresult
    });
});
	});
}
 
  function saveContactInfo(req, res, next){
	  var infomessage = "";
	  console.log("Inserting info into DB");
	var obj = JSON.parse(req.body.jsonstring2);
	// This runs the query, and then calls the provided anonymous callback function
	// with the results.
	console.log(obj.name);
	console.log(obj.email);
	console.log(obj.message);
	if(obj.name === "" || obj.email === "" || obj.message === "") {
		console.log("Please, provide all the required information.");
	infomessage = "Please, provide all the required information.";
		res.render('pages/contactform', {
        infomessage: infomessage
    });	
	} else {
  //connection.query('INSERT INTO contacts (contactname, contactemail, message) VALUES ($1, $2, $3)', [obj.name, obj.email, obj.message], function(err, data) {
	  connection.query("INSERT INTO contacts (contactname, contactemail, message) VALUES ('" + obj.name + "', '" + obj.email + "', '" + obj.message + "')", function(err, data) {
	  
      if (err) {
        return console.error('error running query', err);
      }
	  
	  // Log this to the console for debugging purposes.
    console.log("Back from DB with result:");
	console.log(data);
	console.log(`User added with ID: ${result.insertId}`);
	console.log(result.rowCount);
	if(result.rowCount === 1){
		infomessage = "Thank you for getting in touch with us";		
	} else {
		infomessage = "Sorry, something went wrong. Please, try again.";
	}
	res.render("pages/answer", {
		infomessage: infomessage
		});
    });
	}
  }
  
  async function getPlacesOfInterest(req, res){

	  console.log("Getting places of interest from DB");
	
		// This runs the query, and then calls the provided anonymous callback function
		// with the results.
		/*db.query('SELECT * FROM placesofinterest', function(err, result) {
      if (err) {
        return console.error('error running query', err);
      }
	  
	  // Log this to the console for debugging purposes.
		console.log("Back from DB with result:");
		console.log(result.rows);
		const placesOfInterest = result.rows;
		console.log("placesOfInterest variable:");
		console.log(placesOfInterest);
		//res.status(200).json(placesOfInterest);
		
		res.render('pages/placesofinterestlist', {
			placesOfInterest: placesOfInterest
		});
		
		//callback(null, result.rows);
		});*/
	
	
		  //db.sqlDb().query("SELECT * FROM placesofinterest", function (err, result, fields) {

			//if (err) throw err;
			//console.log(data);
			
			// Log this to the console for debugging purposes.
			//console.log("Back from DB with result:");
			//console.log(result);
			//const placesOfInterest = result;
			//console.log(data);
			//const placesOfInterest = data;
			//console.log("placesOfInterest variable:");
			//console.log(placesOfInterest);
			
			/*res.render('pages/placesofinterestlist', {
				placesOfInterest: placesOfInterest
			});*/
		//});
		//try {
				//Query the soccerPlayers object using the objectId you've copied
				//query.get();
				//access each object property using the get method
				/*const name = player.get("namePlayer");
				const email = player.get("emailContact");
				const birth = player.get("yearOfBirth");
				const attributes = player.get("attributes");
			
				alert(`Name: ${name}, email: ${email}, birth: ${birth}, attributes: ${attributes}`);
				} catch (error) {
				alert(`Failed to retrieve the object, with error code: ${error.message}`);*/
				//}

				//const query = new Parse.Query("Place_of_interest");

				/*await query.get("BKR9IyCiaz").then(function(place_of_interest){
					console.log('Place of interest retrieved successfully with name: ' + place_of_interest.get("name") + ' and description: ' + place_of_interest.get("description"));
			  }).catch(function(error){
				   console.log('Error: ' + error.message);
			  });*/

			  const places_of_interest = new Parse.Query("Place_of_interest");

			  //query.descending('name');

			  //let objectType = "place_of_interest";

			  try {
			  const places_of_interest_list = await places_of_interest.find();
						//places_of_interest.equalTo("place_of_interest", objectType);
						console.log("Here is places of interest list:");
						console.log(places_of_interest_list);
				for (let place_of_interest of places_of_interest_list) {
					console.log(place_of_interest.get("name"));
				}

					
						res.render('pages/placesofinterestlist', {
							places_of_interest_list: places_of_interest_list
						});
				
				} catch (error) {
		      console.log(`Failed to query object: ${error.message}`);
		      return false;
		    }
			  
			
				/*await query.get("BKR9IyCiaz").then(function(place_of_interest){
					
					//console.log(setQueryResults(places_of_interest));
					console.log(place_of_interest);

			  }).catch(function(error){
				   console.log('Error: ' + error.message);
			  });*/		  
  }
	
	
	
	async function getAndShowPlaceOfInterestDetails(req, res){
	  console.log("Getting place of interest from DB");
	
	// This runs the query, and then calls the provided anonymous callback function
	// with the results.
  //db.sqlDb().query('SELECT * FROM placesofinterest WHERE placeOfInterestId=' + req.query.id + '', function(err, result) {
	/*Parse.Query('SELECT * FROM placesofinterest WHERE placeOfInterestId=' + req.query.id + '', function(err, data) {
      if (err) {
        return console.error('error running query', err);
      }
	  
	  // Log this to the console for debugging purposes.
    console.log("Back from DB with result:");
	//console.log(req.query.id);
	console.log(data);
	const placeOfInterest = data;
	console.log("placeOfInterest variable:");
	console.log(placeOfInterest);
	console.log(placeOfInterest[0].placeOfInterestName);
	
	//res.status(200).json(placesOfInterest);
	
	res.render('pages/placeofinterest', {
        placeOfInterest: placeOfInterest[0]
    });
	
	//callback(null, result.rows);
    });*/

	const query = new Parse.Query("Place_of_interest");
	console.log("Here is the req.query.id inside getAndShowPlaceOfInterestDetails: " + req.query.id);
	console.log(req.query.id);

				await query.get(req.query.id).then(function(place_of_interest){
					console.log('Place of interest retrieved successfully with name: ' + place_of_interest.get("name") + ' and description: ' + place_of_interest.get("description"));

					res.render('pages/placeofinterest', {
						place_of_interest: place_of_interest
					});
			  }).catch(function(error){
				   console.log('Error: ' + error.message);
			  });
	  	
  }
  
  
  function getPlacesOfInterestFromDb(callback) {
	
  }
  
  // cd cs313-node/travel_in_ukraine_app


  
	
	   //Reading your First Data Object from Back4App
	   async function retrievePerson() {
	     const query = new Parse.Query("Person");
	  
	     /*try {
	       const person = await query.get("jgWctehbw7");
	       const name = person.get("name");
	       const age = person.get("age");
	  
	       alert(`Name: ${name} age: ${age}`);
     		} catch (error) {
	       alert(`Failed to retrieve the object, with error code: ${error.message}`);
	     }*/
		 await query.get("D2LsaiCrsv").then(function(person){
			console.log('Person retrieved successfully with name: ' + person.get("name") + ' and age: ' + person.get("age"));
	  }).catch(function(error){
		   console.log('Error: ' + error.message);
	  });
	  } 
