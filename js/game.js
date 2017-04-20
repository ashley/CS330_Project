var actors_list = makeActorsList(actor_to_actor);
var srcActor = "";
var destActor = "";
var degrees = [];
var newDeg = [];

function submitValues(){
	degrees.push(document.getElementById("deg1").value);
	degrees.push(document.getElementById("deg2").value);
	degrees.push(document.getElementById("deg3").value);
	degrees.push(document.getElementById("deg4").value);
	degrees.push(document.getElementById("deg5").value);
	degrees.push(document.getElementById("deg6").value);
	console.log(degrees);
	newDeg = [srcActor];
	var degIter = degrees[Symbol.iterator]();
	for(let actor of degIter){
		if(actor != ""){
			newDeg.push(actor);
		}
	}
	newDeg.push(destActor);
	degrees = newDeg;
}

function generateGame(){
	var srcActorNum = Math.floor(Math.random() * (actors_list.length - 0)) + 0;
	var destActorNum = Math.floor(Math.random() * (actors_list.length - 0)) + 0;;
	while(srcActorNum == destActorNum){
		destActorNum = Math.floor(Math.random() * (actors_list.length - 0)) + 0;
	}
	srcActor = actors_list[srcActorNum];
	destActor = actors_list[destActorNum];
	document.getElementById("gameNames").innerHTML = srcActor + " and " + destActor;
	gameDisplay.style.visibility='visible';
}

function makeActorsList(map) {
    var arr = [];
    var mapIter = map.keys();
    for(let actor of mapIter){
    	arr.push(actor);
    }
    return arr;
}

function checkGame(){
	submitValues();
	console.log(degrees);
	if(checkEachConnection){
		document.getElementById("gameWin").innerHTML = "Good Job!";
	}
	else{
		document.getElementById("gameWin").innerHTML = "Nope, try again.";		
	}

}

function checkEachConnection(){
	for(var i=0;i<degrees.length-1;i++){
		if(!directConnection(degrees[i],degrees[i+1])){
			return false;
		}
	}
	return true;
}