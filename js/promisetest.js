const MovieDB = require('moviedb')('1072b9e82e403bdcaab79c43aaa1a4a1');


// Promise
var willGetNewMovie = new Promise(
    function (resolve, reject) {
    }
);
//MovieDB.movieImages({id:8}, function(err, res) {console.log(res.posters[0].file_path);} );


// call our promise
var getMovie = function () {
    willGetNewMovie
        .then(function (fulfilled) {
            console.log(fulfilled);
        })
        .catch(function (error) {
            console.log(error.message);
        });
};

askMom();