//Front-end option, not related to app function
//File only includes functions

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

//Executes actor list in option input forms
function optionTest(){
    actors_list  = document.getElementById("actors_list");
    actor_to_actor.forEach(function(key,value){
       var option = document.createElement('option');
       option.value = value;
       actors_list.appendChild(option);
    });
}

makeActorMap(); //Setup links and nodes for the actor graph
makeMovieMap(); //Setup helpful graph for movies
optionTest(); //Setup option