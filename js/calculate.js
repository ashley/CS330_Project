function calculate(){
	var src = document.getElementById("src").value;
	var dest = document.getElementById("dest").value;
    if(src=="" && dest==""){
        var srcdest = generateTwoActors();
        src = srcdest[0];
        dest = srcdest[1];
        document.getElementById("src").value = src;
        document.getElementById("dest").value = dest;
    }
	var actorResults = breadthFirst(src,dest);
	console.log(actorResults);
	if(actorResults.length < 2){
		document.getElementById("calculate_results").innerHTML = "There are no relations between " + src + " and " + dest + ".";
	}
	else{
		var movieResults = findMovieLinks(actorResults);
		document.getElementById("calculate_results").innerHTML = printPretty(actorResults,movieResults);
	}
}

function printPretty(actors, movies){
	var string = "";
	for (var i=0;i<actors.length-1;i++){
		console.log(i);
		string += actors[i] + " and " + actors[i+1] + " worked with each other in " + movies[i] + ". <br>";
	}
	return string;
}