CREATE TABLE placesofinterest (
placeOfInterestId SERIAL PRIMARY KEY,
placeOfInterestName VARCHAR(100) NOT NULL,
placeOfInterestDescription VARCHAR(355) NOT NULL,
placeOfInterestImage VARCHAR(150),
placeOfInterestWebsite VARCHAR(100)
);

/*CREATE TABLE placesofinterest (
id SERIAL PRIMARY KEY,
placeofinterestname VARCHAR(100) NOT NULL,
placeofinterestdescription VARCHAR(355) NOT NULL,
locationname VARCHAR(100) NOT NULL,
locationid INT NOT NULL REFERENCES locations (id),
priceforvisit VARCHAR(150) NOT NULL,
locationmap VARCHAR(150) NOT NULL,
openhours VARCHAR(150) NOT NULL,
phonenumber VARCHAR(150) NOT NULL,
website VARCHAR(150) NOT NULL
);*/

CREATE TABLE locations (
id SERIAL PRIMARY KEY,
locationname VARCHAR(100) NOT NULL,
population INT NOT NULL
);

CREATE TABLE contacts (
id SERIAL PRIMARY KEY,
contactname VARCHAR(100) NOT NULL,
contactemail VARCHAR(100) NOT NULL,
message VARCHAR(700) NOT NULL
);

SELECT * FROM placesofinterest;

SELECT * FROM locations;

INSERT INTO contacts (contactname, contactemail, message) VALUES ('Kiev', 2900000);


INSERT INTO locations (locationname, population) VALUES ('Kiev', 2900000);
INSERT INTO locations (locationname, population) VALUES ('Kamianets-Podilskyi', 101000);

DROP TABLE placesofinterest;

INSERT INTO placesofinterest (placeOfInterestId, placeOfInterestName, placeOfInterestDescription, placeOfInterestImage, placeOfInterestWebsite) VALUES (1, 'Saint-Raphaël', 'Saint-Raphaël is a commune in the Var department, Provence-Alpes-Côte de Azur region, Southeastern France. In 2017, it had a population of 35,042. Immediately to the west of Saint-Raphaël lies a larger and older town, Fréjus; together they form an urban agglomeration known as Var Estérel Méditerranée, which also encompasses the smaller communes of Les Adrets-de-le Estérel, Puget-sur-Argens and Roquebrune-sur-Argens. In the second half of the 19th century, the township came under the influence of Mayor Felix Martin and writer Jean-Baptiste Alphonse Karr; owing to their efforts and its beneficial climate the commune developed into a seaside resort popular with artists, sportsmen and politicians. Saint-Raphaël has four large sandy beaches: one near the city centre, called the Veillat; one at Boulouris; one at Le Dramont, and the fourth at Agay. There are two smaller ones at Anthéor and Le Trayas.
St. Raphaël is located on the Côte de Azur and enjoys a Mediterranean climate with hot, dry summers and mild, humid winters.', '../images/places_of_interest/Le_TrayasEsterelFrance.jpg', 'www.ville-saintraphael.fr');
INSERT INTO placesofinterest (placeOfInterestId, placeOfInterestName, placeOfInterestDescription, placeOfInterestImage, placeOfInterestWebsite) VALUES (2, 'Saint-Tropez', 'Saint-Tropez is a commune in the Var department and the region of Provence-Alpes-Côte de Azur, Southern France. It is 68 kilometres (42 miles) west of Nice and 100 kilometres (62 miles) east of Marseille, on the French Riviera, of which it is one of the best-known towns. In 2018, Saint-Tropez had a population of 4,103. The adjacent narrow body of water is the Gulf of Saint-Tropez (French: Golfe de Saint-Tropez), stretching to Sainte-Maxime to the north under the Massif des Maures.
Saint-Tropez was a military stronghold and fishing village until the beginning of the 20th century. It was the first town on its coast to be liberated during World War II as part of Operation Dragoon. After the war, it became an internationally known seaside resort, renowned principally because of the influx of artists of the French New Wave in cinema and the Yé-yé movement in music. It later became a resort for the European and American jet set and tourists.', '../images/places_of_interest/Aerial_view_of_the_old_town_of_Saint-Tropez,_France_(52724270908).jpg', 'www.saint-tropez.fr');
INSERT INTO placesofinterest (placeofinterestname, placeofinterestdescription, locationname, locationid, priceforvisit, locationmap, openhours, phonenumber, website, image) VALUES ('Khortytsya National Park', 'The major part of the reserve (historic park) covers the Zaporizhian Cossack Museum that includes the Cossack horse show. The museum building is modern, nestling low in the landscape with dramatic views of the Dnieper Hydroelectric Station to the north. The expo area of the museum was accounted for 1,600 m2 (17,000 sq ft) portraying the following themes: Khortytsia in ancient times, history of Zaporizhian Cossacks, history of Zaporizhia at times of construction of socialism. There also existed four dioramas: "Battle of Sviatoslav at rapids" (author - M.Oviechkin), "Uprising of the impoverished cossacks at Zaporizhian Sich in 1768" (M.Oviechkin), "Construction of Dnieper HES" (V.Trotsenko), "Night storm of Zaporizhia city in October 1943" (M.Oviechkin). The museum contains exhibits dating from the Stone Age through the Scythian period (c.750 - 250 BC) down to the 20th century.', 'Zaporizhia', 1, '48 UAH', 'https://en.wikipedia.org/wiki/Khortytsia', 'From 9:30 am to 16:30 pm', 'Tours Desk: +38 (096)-254-12-09, +38 (095)-914-77-06', 'https://en.wikipedia.org/wiki/Khortytsia', 'images/khortitza_sich.jpg');


ALTER TABLE placesofinterest
ADD placeOfInterestWebsite varchar(100);

ALTER TABLE placesofinterest
ALTER COLUMN placeofinterestdescription TYPE varchar(1150);


UPDATE placesofinterest
SET image = 'images/kiev_lavra.jpg'
WHERE id = 2;

UPDATE placesofinterest
SET image = 'images/sofia-kievskaya3.jpg'
WHERE id = 3;


CREATE TABLE users (
id SERIAL PRIMARY KEY,
username VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL,
password VARCHAR(700) NOT NULL,
userlevel INT
);

UPDATE users
SET email = 'birt@ukr.net'
WHERE id = 7;

DROP TABLE users;

SELECT * FROM users;

DELETE FROM users WHERE id BETWEEN 13 AND 25;

UPDATE users
SET userlevel = 3
WHERE id = 1;

function Submit() {
console.log("Hi the form is working");
var fname = document.getElementById("fname").value;
var email = document.getElementById("email").value;
var message = document.getElementById("message").value;
var values = [fname, email, message];
console.log(values);
var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("change1").innerHTML = this.responseText;
    }
  };
  xhttp.open("POST", "/contactinfo", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhttp.send("fname=" + fname + "&email=" + email + "&message=" + message);
}



bcrypt.compare(password, hashForCompare, function(err, res) {
	if (res == true) {
	console.log("Result of comparing the passwords:");
	console.log(res);
	loggedin = true;
	req.session.user = result.rows[0].username;
	console.log("Session info:");
	console.log(req.session);
	console.log("Session user info:");
	console.log(req.session.user);
	} else {
		console.log(res);
	}
	
	
})
