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

function containsNode(name, arr){
    for(var i =0;i<arr.length; i++){
        if(arr[i].name == name){
            //console.log(i);
            return true;
        }
    }
    return false;
}