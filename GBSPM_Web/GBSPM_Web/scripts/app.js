﻿angular.module('Tan', [])
.controller('MyFirstCtrl', function ($scope, $http) {
    $scope.text = "Hi My name is Tan.";
    $scope.Address = "CNX ";
    $scope.cities;
    $http.get('Json/testdata.json').success(function (data) {
        // you can do some processing here
        $scope.cities = data;
    }).
    error(function (data, status, headers, config) {
        console.log("failed");
    });
});

angular.module('Graph', [])
.controller('MyGraph', function ($scope, $http) {
    $scope.title = "This is example of graph using d3.js"
});

angular.module('myApp', []).
   directive('bars', function ($parse) {
       return {
           restrict: 'E',
           replace: true,
           template: '',
           link: function (scope, element, attrs) {
               var data = attrs.data.split(','),
               chart = d3.select('#chart')
                 .append("div").attr("class", "chart")
                 .selectAll('div')
                 .data(data).enter()
                 .append("div")
                 .transition().ease("elastic")
                 .style("width", function (d) { return d + "%"; })
                 .text(function (d) { return d + "%"; });
           }
       };
   });


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

            var force = d3.layout.force()
                .size([width, height])
                .charge(-400)
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
                force
                    .nodes(graph.nodes)
                    .links(graph.links)
                    .start();

                // To fixed position by node has no gravity
                force.gravity(0);

                // Manage all links properties
                link = link.data(graph.links)
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

                // Manage all right click event
                node.on("contextmenu", function (data, index) {
                    alert(data.node_id + " x : " + data.x + " y : " + data.y);
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
                d3.select(this).classed("selected", d.fixed = false);
            }

            function dragstart(d) {
                d3.select(this).classed("selected", d.fixed = true);
            }
    }
    };
});


