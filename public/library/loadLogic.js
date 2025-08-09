

function removeLoader(){
    //setTimeout(remove, 10000);
    remove();
}

function remove(){
    document.getElementById("bodyDiv").style.display = "block";
    document.getElementById("loader").style.display = "none";
}