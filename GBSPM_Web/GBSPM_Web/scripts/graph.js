angular.module('sampleCircleGraph', [])
.controller('Controller', function ($scope, $http) {
    $scope.text = "Hi My name is Tan.";
    $scope.Address = "CNX ";
    $scope.cities;
    $scope.customer = {
        name: 'Naomi',
        address: '1600 Amphitheatre'
    };
    //$http.get('Json/graph.json').success(function (data) {
    //    // you can do some processing here
    //    $scope.graph = data;
    //}).
    //error(function (data, status, headers, config) {
    //    console.log("failed");
    //});
})
.directive('force', function () {
    return {
        template: 'Name: {{customer.name}} Address: {{customer.address}}',
        link: function (scope, element, attrs) {
            var width = 1280,
            height = 800;
            var context = null;

            var force = d3.layout.force()
                .size([width, height])
                .charge(-600)
                .linkDistance(50)
                .on("tick", tick);

            var drag = force.drag()
                .on("dragstart", dragstart);

            var svg = d3.select("#chart").append("svg")
                .attr("width", width)
                .attr("height", height);

            var link = svg.selectAll(".link"),
                node = svg.selectAll(".node");

            d3.json("Json/mockup_graph.json", function (error, graph) {

                var edges = [];
                // Change target and source link to be use id instead
                graph.links.forEach(function (e) {
                    // Get the source and target nodes
                    var sourceNode = graph.nodes.filter(function (n) {
                        return n.id === e.source;
                    })[0],
                        targetNode = graph.nodes.filter(function (n) {
                            return n.id === e.target;
                        })[0];

                    // Add the edge to the array
                    edges.push({ source: sourceNode, target: targetNode, isCritical: e.isCritical, color: e.color });
                });

                force.nodes(graph.nodes).links(edges).start();

                // To fixed position by node has no gravity
                force.gravity(0);                

                // Manage all links properties
                link = link.data(edges)
                  .enter().append("line")
                    .attr("class", "link")
                    .style("stroke", function (d) { return d.isCritical ? "red" : "#000"; });

                link.on("contextmenu", function (data) {
                    alert(data.isCritical);
                    d3.event.preventDefault();
                });

                // Manage all nodes properties
                node = node.data(graph.nodes)
                  .enter().append("circle")
                    .attr("class", "node")
                    .attr("r", 20)
                    .on("dblclick", dblclick)
                    .call(drag); // call drag event : TODO

                node.append("text")
                .text(function (d) { return "text"; });


                node.append("title")
                    .text(function (d) { return d.name; });

                // Manage all right click event with context menu
                node.on("contextmenu", function (data, index) {
                    var position = d3.mouse(this);
                    d3.select('#my_custom_menu')
                      .style('position', 'absolute')
                      .style('left', position[0] + "px")
                      .style('top', position[1] + "px")
                      .style('display', 'inline-block')
                       .style('color', 'blue')
                        .append("h4").text('Name : ' + data.name + ' ID : ' + data.id)
                      .on('mouseleave', function () {
                          d3.select(this).remove();
                      });

                    d3.event.preventDefault();
                });
            });            
            
            function tick() {
                link.attr("x1", function (d) { return d.source.x; })
                    .attr("y1", function (d) { return d.source.y; })
                    .attr("x2", function (d) { return d.target.x; })
                    .attr("y2", function (d) { return d.target.y; });

                node.attr("cx", function (d) { return d.x; })
                    .attr("cy", function (d) { return d.y; })
                    .attr("fill", function (d) { return d.color; })
                    .append("text")
                    .text(function (d) { return d.name; });

            }

            function dblclick(d) {
                alert(d.weight);
                d3.select(this).classed("selected", d.fixed = !d.fixed);
            }

            function dragstart(d) {
                //d3.select(this).classed("selected", d.fixed = true);
            }
        }
    };
});