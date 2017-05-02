//breath-first search
function breadthFirst(root, dest){
	var visited = new Set();
	var tail = []; //track path
	var queue = [];
	if(actor_to_actor.has(root)){
		queue.push(root);
		visited.add(root);
		while(queue.length != 0){ //Until either all nodes have been visited or till dest node has been reached
			var current = queue[0];
			var added = false;
			tail.push(current);
			for(let c of actor_to_actor.get(current)){ //Goes through each link in a node's connection
				if(current == dest){
					return tail;
				}
				else{
					if(!visited.has(c)){
						added = true;
						visited.add(c);
						queue.push(c);
					}
				}
			}
			if(!added){
				tail.splice(tail.indexOf(current), 1);
			}
			queue.shift();
		}
	}
	else{
		console.log("Actor does not exist");
	}
	return tail
}

//depth-first search
function depthFirst(root, dest){
	var visited = new Set();
	var tail = [];
	var stack = [];
	if(actor_to_actor.has(root)){
		stack.push(root);
		visited.add(root);
		while(stack.length != 0){
			var current = stack[stack.length-1];
			for(let c of actor_to_actor.get(current)){
				if(current == dest){
					return tail;
				}
				else{
					if(!visited.has(c)){
						visited.add(c);
						stack.push(c);
					}
				}

			}
			stack.pop();
			
		}
	}
	else{
		console.log("Actor does not exist");
	}
}

function dfs_paths(graph, start, goal){
	"use strict";
	var stack = [[start,[start]]];
	var visited = new Set()

	while(stack.length!=0){
		var vertex,path;
		console.log(stack)
		var cur = stack.shift();
		vertex = cur[0];
		path = cur[1];
		if(!visited.has(vertex)){
			if(vertex == goal){
				return path;
			}
			visited.add(vertex);
			for(let neighbor of graph.get(vertex)){
				stack.push([neighbor,path.concat([neighbor])]);
			}
		}

	}
	return ["None"];
}

//Resurive function that does not work, because graph is too big.
function connectionExist(src,dest){
	if(actor_to_actor.get(src).has(dest)){
		return true;
	}
	else{
		for(let actor of actor_to_actor.get(src)){
			if(actor == dest){
				return true;
			}
			else{
				return connectionExist(actor,dest);
			}
		}
	}
	return false;
}

//Helper function to get movie between two actors
function findMovie(actor1,actor2){
	for(let movie of actor_to_movie.get(actor1)){
		if(actor_to_movie.get(actor2).has(movie)){
			return movie_to_movie.get(movie);
		}
	}
	return undefined; //instead of throwing an error
}

//Helper function to get movies to print out with actor degrees
function findMovieLinks(arr){
	var results = [];
	for(var i=0;i<arr.length-1;i++){
		results.push(findMovie(arr[i],arr[i+1]));
	}
	return results;
}
//Helper function to get list of movies in an array
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

//Helper function to to return boolean if there is a direct connection
function directConnection(src,dest){
	return actor_to_actor.get(src).has(dest);
}

//var newSet = new Set();
//console.log(connectionExist("Johnny Depp","Tom Hanks",[],1,newSet));
//Test: console.log(breadthFirst("Johnny Depp","Tom Hanks"));
//Johnny Depp -> Geoffrey Rush -> Albert Brooks -> Tom Hanks