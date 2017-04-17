var actors = {};
var movies = new Map();
var actor_to_movie = new Map();
var actor_to_actor = new Map();
var movie_to_movie = new Map();

function makeActorMap(){
	for(var raw_movie in rawdata_actors){
		for(var actor in rawdata_actors[raw_movie].cast){
			iterate_cast_array(actor_to_movie, rawdata_actors[raw_movie].cast[actor], rawdata_actors[raw_movie].id);
			iterate_actor_array(rawdata_actors[raw_movie].cast[actor],rawdata_actors[raw_movie].cast);
		}
	}
}

function makeMovieMap(){
	for(var raw_movie in rawdata_movies){
		if (!movie_to_movie.has(rawdata_movies[raw_movie].id)){
			movie_to_movie.set(rawdata_movies[raw_movie].id,rawdata_movies[raw_movie].title);
		}
	}
}

function iterate_actor_array(actor,castArr){
	for(var name in castArr){
		if(!actor_to_actor.has(actor)){
			actor_to_actor.set(actor,new Set());
		}
		if(actor != castArr[name] && !actor_to_actor.get(actor).has(castArr[name])){
			actor_to_actor.get(actor).add(castArr[name]);
		}
	}
}

function iterate_cast_array(map,actor,movieid){
	if(!map.has(actor)){
		map.set(actor,new Set());
		map.get(actor).add(movieid);
	}
	else{
		map.get(actor).add(movieid);
	}
}

function list_of_movies(actor){
	if(actor_to_movie.has(actor)){
		var arr = [];
		for(let movieid of actor_to_movie.get(actor)){
			arr.push(movie_to_movie.get(movieid));
		}
		return arr;
	}
	else{
		console.log("Actor does not exist.");
		return undefined;
	}
}

function scrapGraph(){
	var names = ["Johnny Depp", "Geoffrey Rush", "Stellan Skarsgård", "Albert Brooks", "Allison Janney", "Siobhan Fallon", "Tom Hanks"];
	var tracker = new Set();
	for(var i in names){
		tracker.add(names[i]);
	}

	for(var i=0;i<7;i++){
		for(let actor of actor_to_actor.get(names[i])){
			if(!tracker.has(actor)){
				tracker.add(actor);
				names.push(actor);
			}
		}
	}

	for(var i in names){
		//console.log("{ " + "\"name\": " + "\"" + names[i] + "\"\, \"group\": 1 },");	
		for(var a in names){
			if(actor_to_actor.get(names[i]).has(names[a])){
				console.log("{ " + "\"source\": " + i +", \"target\": " + a + ", \"value\": 1 },");	
			}
		}
	}
	console.log(actor_to_actor.get(names[0]).size); //81

}




function containsNode(name, arr){
    for(var i =0;i<arr.length; i++){
        if(arr[i].name == name){
            //console.log(i);
            return true;
        }
    }
    return false;
}