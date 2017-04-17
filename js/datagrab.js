const MovieDB = require('moviedb')('1072b9e82e403bdcaab79c43aaa1a4a1');
var start = 61;
var end = 70;

var actual = 0;
var desired = end - start;

var results = [];

for (var i = start; i < end; i++) {
  (function(index) {
    MovieDB.movieCredits({ id: i}, function(err, res) {
      actual++
      if (err) {
        //console.log("error at " + index);
      } else {
        var movie = {};
        movie.id = index;
        movie.cast = [];
        people = res.cast;
        for(var actor in people){
          movie.cast.push(people[actor].name);
        }
        results.push(movie);
      }
      if (actual == desired) {
        resolve(results);
      }
    });
  })(i);
}

function resolve(results) {
  console.log(results);
}

