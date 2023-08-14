

function getToInformation(informationKind){
	var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("change1").innerHTML = this.responseText;
	  document.getElementById(informationKind).scrollIntoView();
    }	
  };
  
  xhttp.open("GET", "/gotoinformation", true);
  xhttp.send();
}

