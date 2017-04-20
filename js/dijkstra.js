function breadthFirst(root, dest){
	var visited = new Set();
	var tail = [];
	var queue = [];
	if(actor_to_actor.has(root)){
		queue.push(root);
		visited.add(root);
		while(queue.length != 0){
			var current = queue[0];
			var added = false;
			tail.push(current);
			for(let c of actor_to_actor.get(current)){
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
function getArrayDiff(a, b) {
    var ret = [];
    if (!(Array.isArray(a) && Array.isArray(b))) {
        return ret;
    }
    var i;
    var key;

    for (i = a.length - 1; i >= 0; i--) {
      key = a[i];
      if (-1 === b.indexOf(key)) {
        ret.push(key);
      }
    }

    return ret;
}
//TEST: console.log(breadthFirst("Johnny Depp"));

function depthFirst(root, dest){
	var visited = new Set();
	var tail = [];
	var stack = [];
	if(actor_to_actor.has(root)){
		stack.push(root);
		visited.add(root);
		tail.push(root);
		while(stack.length != 0){
			var current = stack[stack.length-1];
			for(let c of actor_to_actor.get(current)){
				tail.push(current);
				if(current == dest){
					return tail;
				}
				else{
					if(!visited.has(c)){
						visited.add(c);
						stack.push(c);
					}
					tail.pop();
				}

			}
			stack.pop();
			
		}
	}
	else{
		console.log("Actor does not exist");
	}
	return tail
}

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

function findMovie(actor1,actor2){
	for(let movie of actor_to_movie.get(actor1)){
		if(actor_to_movie.get(actor2).has(movie)){
			return movie_to_movie.get(movie);
		}
	}
	return undefined;
}

function findMovieLinks(arr){
	var results = [];
	for(var i=0;i<arr.length-1;i++){
		results.push(findMovie(arr[i],arr[i+1]));
	}
	return results;
}

function directConnection(src,dest){
	return actor_to_actor.get(src).has(dest);
}

//var newSet = new Set();
//console.log(connectionExist("Johnny Depp","Tom Hanks",[],1,newSet));
//Test: console.log(breadthFirst("Johnny Depp","Tom Hanks"));
//Johnny Depp -> Geoffrey Rush -> Albert Brooks -> Tom Hanks