const MovieDB = require('moviedb')('1072b9e82e403bdcaab79c43aaa1a4a1');


// Promise
var willIGetNewPhone = new Promise(
    function (resolve, reject) {
    }
);
//MovieDB.movieImages({id:8}, function(err, res) {console.log(res.posters[0].file_path);} );


// call our promise
var askMom = function () {
    willIGetNewPhone
        .then(function (fulfilled) {
            // yay, you got a new phone
            console.log(fulfilled);
         // output: { brand: 'Samsung', color: 'black' }
        })
        .catch(function (error) {
            // oops, mom don't buy it
            console.log(error.message);
         // output: 'mom is not happy'
        });
};

askMom();