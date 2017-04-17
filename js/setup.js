function tabChange(evt, pageName) {
    // Declare all variables
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(pageName).style.display = "block";
    evt.currentTarget.className += " active";
}

function optionTest(){
    var list = document.getElementById("actors_list");
    actor_to_actor.forEach(function(key,value){
       var option = document.createElement('option');
       option.value = value;
       list.appendChild(option);
    });
}

function calculate(){
	var src = document.getElementById("src").value;
	var dest = document.getElementById("dest").value;
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
	for (var i in movies){
		string += actors[i*2] + " and " + actors[i*2+1] + " worked with each other in " + movies[i] + ". <br>";
	}
	return string;
}

makeActorMap();
makeMovieMap();
optionTest();