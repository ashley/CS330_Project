function checkGame(){
	var degrees = [];
	degrees.push(document.getElementById("deg1").value);
	degrees.push(document.getElementById("deg2").value);
	degrees.push(document.getElementById("deg3").value);
	degrees.push(document.getElementById("deg4").value);
	degrees.push(document.getElementById("deg5").value);
	degrees.push(document.getElementById("deg6").value);
	console.log(degrees);
}

function generateGame(){
	gameDisplay.style.visibility='visible';
}