var actors_list = makeActorsList(actor_to_actor); //list of actors from actor_to_actor map. Makes it easier generate two actors
var srcActor = "";
var destActor = "";
var degrees = [];
var newDeg = [];

//Parses answer submitted by users
function submitValues(){
	degrees = [];
	degrees.push(document.getElementById("deg1").value);
	degrees.push(document.getElementById("deg2").value);
	degrees.push(document.getElementById("deg3").value);
	degrees.push(document.getElementById("deg4").value);
	degrees.push(document.getElementById("deg5").value);
	degrees.push(document.getElementById("deg6").value);
	console.log(degrees);
	newDeg = [srcActor];

	//Parses actors, in case user uses less than 6 actors.
	var degIter = degrees[Symbol.iterator]();
	for(let actor of degIter){
		if(actor != ""){
			newDeg.push(actor);
		}
	}
	newDeg.push(destActor);
	degrees = newDeg;
}

//For Demo
function generateDemoGame(){
	srcActor = "Tom Hanks";
	destActor = "Johnny Depp";
	document.getElementById("gameNames").innerHTML = srcActor + " and " + destActor;
	gameDisplay.style.visibility='visible';
}

//Executes generate function and controls front-end
function generateGame(){
	generateTwoActors();
	document.getElementById("gameNames").innerHTML = srcActor + " and " + destActor;
	gameDisplay.style.visibility='visible';
}

//Uses random to get actors from list
function generateTwoActors(){
	var srcActorNum = Math.floor(Math.random() * (actors_list.length - 0)) + 0;
	srcActor = actors_list[srcActorNum];
	generateDestActor();
	while(srcActor==destActor){
		generateDestActor();
	}
	return [srcActor,destActor];
}

//Refers to first randoma actor chosen, and chooses a random number of deg to get to the second actor
function generateDestActor(){
		numOfDegs = Math.floor(Math.random() * (7 - 2)) + 0;
		var nextActor = srcActor;
		for(var i=0;i<numOfDegs;i++){
			nextActor = randomActorFromSet(actor_to_actor.get(nextActor));
			console.log(nextActor);
		}
		destActor = nextActor;
}

//Setups actor array
function makeActorsList(map) {
    var arr = [];
    var mapIter = map.keys();
    for(let actor of mapIter){
    	arr.push(actor);
    }
    return arr;
}

//Validate user game
function checkGame(){
	submitValues();
	console.log(degrees);
	if(checkEachConnection(degrees)){ //Executes actual validation
		console.log("You Win");
		document.getElementById("gameWin").innerHTML = "Good Job!";
		document.getElementById("gameWin").style.color="green";
	}
	else{
		console.log("Nope, Try again");
		document.getElementById("gameWin").innerHTML = "Nope, try again.";	
		document.getElementById("gameWin").style.color="red";			
	}

}

//Follows through the connection amde by the user
function checkEachConnection(deg){
	for(var i=0;i<deg.length-1;i++){
		if(!directConnection(deg[i],deg[i+1])){
			return false;
		}
	}
	return true;
}

//Gets random actor
function randomActorFromSet(set){
	var randNum = Math.floor(Math.random() * (set.size - 1)) + 0;
	var setIter = set[Symbol.iterator]();
	var result = "";
	for (var i=0;i<randNum;i++) {
		setIter.next();
	}
	return setIter.next().value;
}