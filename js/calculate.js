//Acts as an action listener for calculate, the second feature
function calculate(){
	var src = document.getElementById("src").value;
	var dest = document.getElementById("dest").value;
    if(src=="" && dest==""){ //If user has not entered anything
        var srcdest = generateTwoActors(); //n
        src = srcdest[0];
        dest = srcdest[1];
        document.getElementById("src").value = src;
        document.getElementById("dest").value = dest;
    }
    if(src!=dest){
		var actorResults = dfs_paths(actor_to_actor,src,dest);
		console.log(actorResults);
		if(actorResults.length < 2){
			document.getElementById("calculate_results").innerHTML = "There are no relations between " + src + " and " + dest + ".";
		}
		else{
			var movieResults = findMovieLinks(actorResults);
			document.getElementById("calculate_results").innerHTML = printPretty(actorResults,movieResults);
		}
	}
	else{
		document.getElementById("calculate_results").innerHTML = "These are the same actor";
	}
}

//Front-end work to return new string
function printPretty(actors, movies){
	var string = "";
	console.log(movies);
	for (var i=0;i<actors.length-1;i++){
		console.log(i);
		string += actors[i] + " and " + actors[i+1] + " worked with each other in " + movies[i] + ". <br>";
	}
	return string;
}