var color = d3.scale.category10();
var jsonFile = "json/test.json"

function jsonFileChooser(){
    if (document.getElementById("m5").selected){
        jsonFile = "json/test.json";
        console.log("Movie 5 is selected");
    }
    else if (document.getElementById("m4").selected){
        jsonFile = "json/Movies4.json";
        console.log("Movie 4 is selected");
    }
    else if (document.getElementById("m3").selected){
        jsonFile = "json/Movies3.json";
        console.log("Movie 3 is selected");
    }
    else if (document.getElementById("m2").selected){
        jsonFile = "json/Movies2.json";
        console.log("Movie 2 is selected");
    }
    else if (document.getElementById("m1").selected){
        jsonFile = "json/Movies1.json";
        console.log("Movie 1 is selected");
    }
    execute(jsonFile);
}

function execute(jsonFile){      
    var width = 930,
        height = 500;

    var n = 100,
        nodes = testData.nodes,
        links = testData.links;

    var force = d3.layout.force()
        .nodes(nodes)
        .links(links)
        .size([width, height]);

    var svg = d3.select("#graph");

    var loading = svg.append("text")
        .attr("x", width / 2)
        .attr("y", height / 2)
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .text("Simulating. One moment please…");

    setTimeout(function() {
      force.start();
      for (var i = n * n; i > 0; --i) force.tick();
      force.stop();

      svg.selectAll("line")
          .data(links)
        .enter().append("line")
          .attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });

      svg.selectAll("circle")
          .data(nodes)
        .enter().append("circle")
          .attr("cx", function(d) { return d.x; })
          .attr("cy", function(d) { return d.y; })
          .attr("r", 4.5);

      loading.remove();
    }, 10);             
}
