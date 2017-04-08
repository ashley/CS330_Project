var height = 500;
var width = 500;
var svg = d3.select("#graph");
var color = d3.scale.category10();
var force = d3.layout.force() //links nodes together
    .charge(-180)
    .linkDistance(70)
    .size([width, height]);


d3.json("relation.json", function(json) { //start of creating nodes and links
    force
      .nodes(json.nodes)
      .links(json.links)
      .start();

    var links = svg.append("g").selectAll("line.link")
        .data(force.links())
        .enter().append("line")
        .attr("class", "link")
        .attr("marker-end", "url(#arrow)");

    var nodes = svg.append("g").selectAll("circle.node")
        .data(force.nodes())
        .enter().append("circle")
        .attr("class", "node")
        .attr("r", 8)
        .style("fill", function(d) { return color(d.group); })
        .call(force.drag);

    var texts = svg.append("g").selectAll("circle.node")
        .data(force.nodes())
        .enter().append("text")
        .attr("class", "label")
        .text(function(d) { return d.name; })
        .call(force.drag);

    force.on("tick", function() {
        links.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        nodes.attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });

        texts.attr("x", function(d) { return d.x; })
            .attr("y", function(d) { return d.y; });

    });

});