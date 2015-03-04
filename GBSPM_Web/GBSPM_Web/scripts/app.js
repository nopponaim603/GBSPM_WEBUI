angular.module('Tan', [])
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


angular.module('SampleSVG', [])
.controller('MySVG', function ($scope, $http) {
    $scope.text = "Hello my Sample SVG";
    //$http.get('Json/graph.json').success(function (data) {
    //    // you can do some processing here
    //    $scope.graph = data;
    //}).
    //error(function (data, status, headers, config) {
    //    console.log("failed");
    //});
})
.directive('content', function () {
    return {
        template: "{{text}}",
        link: function (scope, element, attrs) {
            var width = 1000,
            height = 600;

            var nodeSize = 0.02 * width;

            var svg = d3.select("#sub_content").append("svg")
                .attr("width", width)
                .attr("height", height);

           

            //The x1 attribute defines the start of the line on the x-axis
            //The y1 attribute defines the start of the line on the y-axis
            //The x2 attribute defines the end of the line on the x-axis
            //The y2 attribute defines the end of the line on the y-axis

            var jsonCircles = [
                { "x_axis": 30, "y_axis": 230, "radius": 20, "color": "#EDEDED", "name": "Circle 1", "isClicked": false, "isCollapse": false },
                { "x_axis": 130, "y_axis": 230, "radius": 20, "color": "#EDEDED", "name": "Circle 2", "isClicked": false, "isCollapse": false },
                { "x_axis": 330, "y_axis": 230, "radius": 20, "color": "#EDEDED", "name": "Circle 3", "isClicked": false, "isCollapse": false },
                { "x_axis": 530, "y_axis": 230, "radius": 20, "color": "#EDEDED", "name": "Circle 4", "isClicked": false, "isCollapse": false }];

            var jsonRect = [
                { "x": 180, "y": 50, "color": "gray", "name": "rect1", "isClicked": false },
                { "x": 180, "y": 310, "color": "gray", "name": "rect1", "isClicked": false },
                { "x": 380, "y": 50, "color": "gray", "name": "rect1", "isClicked": false },
                { "x": 380, "y": 205, "color": "gray", "name": "rect1", "isClicked": false },
                { "x": 380, "y": 310, "color": "gray", "name": "rect1", "isClicked": false },
            ];

            var jsonLines = [
                { "x1": 130, "y1": 230, "x2": 180, "y2": 75, "color": "#000" },
                { "x1": 30, "y1": 230, "x2": 130, "y2": 230, "color": "#000" },
                { "x1": 130, "y1": 230, "x2": 180, "y2": 335, "color": "#000" },
                { "x1": 280, "y1": 75, "x2": 330, "y2": 230, "color": "#000" },
                { "x1": 330, "y1": 230, "x2": 280, "y2": 325, "color": "#000" },
                { "x1": 100, "y1": 130, "x2": 170, "y2": 230, "color": "#000" },
                { "x1": 100, "y1": 130, "x2": 170, "y2": 230, "color": "#000" },
                { "x1": 100, "y1": 130, "x2": 170, "y2": 230, "color": "#000" },
                { "x1": 100, "y1": 130, "x2": 170, "y2": 230, "color": "#000" },
                { "x1": 100, "y1": 130, "x2": 170, "y2": 230, "color": "#000" },
                { "x1": 100, "y1": 130, "x2": 170, "y2": 230, "color": "#000" }];


            var line = svg.selectAll("line")
                .data(jsonLines)
                .enter()
                .append("line");

            //line.attr("x1", function (d) { return d.x1 })
            //    .attr("y1", function (d) { return d.y1 })
            //    .attr("x2", function (d) { return d.x2 })
            //    .attr("y2", function (d) { return d.y2 })
            //    .style("stroke", function (d) { return d.color })
            //    .style("stroke-width", 2);

            var circles = svg.selectAll("cirle")
                                      .data(jsonCircles)
                                      .enter()
                                      .append("circle");

            var circleAttributes = circles
                                  .attr("cx", function (d) { return d.x_axis; })
                                  .attr("cy", function (d) { return d.y_axis; })
                                  .attr("r", nodeSize)
                                   .attr("class", "cirle")
                                  .style("fill", function (d) { return d.color; })
                                    .style("stroke", "black");
            circleAttributes.append("title")
                    .text(function (d) { return d.name; })


            var text = svg.selectAll("text")
                        .data(jsonCircles)
                        .enter()
                        .append("text");

            //text
            //.attr("x", function (d) { return d.x_axis; })
            //.attr("y", function (d) { return d.y_axis; })
            //.text(function (d) { return "( " + d.x_axis + ", " + d.y_axis + " )"; })
            //.attr("font-family", "sans-serif")
            //.attr("font-size", "11px")
            //.attr("fill", "red");

            var rectangulars = svg.selectAll("rect")
                        .data(jsonRect)
                        .enter()
                        .append("rect");

            //var rectAttributes = rectangulars
            //    .attr("x", function (d) { return d.x })
            //    .attr("y", function (d) { return d.y })
            //    .attr("width", 100)
            //    .attr("height", 50)
            //    .style("fill", function (d) { return d.color; });


            circles.on("contextmenu", function (d) {
                myfunction(d);
                d3.event.preventDefault();
            });

            circles.on("click", function (d) {
                //alert(this);
                if (!d.isClicked) {
                    d3.select(this).style("stroke", "red");
                    d.isClicked = true;
                    d3.selectAll("circle")
                }
                else {
                    d3.select(this).style("stroke", "black");
                    d.isClicked = false;
                }
            });

           

            function myfunction(data) {
                //alert("My name is " + data.name + " My color is " + data.color);
                var text = "All circle name : ";
                d3.selectAll('circle').each(function (d, i) {
                    text += ", " + d.name;
                   // console.log(this);
                    if (data.name != d.name) {
                        if (!d.isCollapse) {
                            d3.select(this).style("display", "none")
                        }
                        else {
                            d3.select(this).style("display", "")
                        }
                        d.isCollapse = !d.isCollapse;
                    }
                });
                //alert(text);
            }

            d3.json("Json/mockup_svg.json", function (error, graph) {
                var test = "";
                graph.forEach(function (d) {
                    drawNode(d);
                });

            });

            function drawNode(node) {
                circles.attr("cx", node.x)
                    .attr("cy", node.y)
                    .attr("r", nodeSize)
                    .attr("class", "cirle")
                    .style("fill", node.color)
                    .style("stroke", "black");

                if (node.target != null) {
                    node.target.forEach(function (d_target, i) {
                        drawLine(node, d_target);
                        drawNode(d_target);
                    });

                }
            }

            function drawLine(source, target) {

                line.attr("x1", source.x)
                    .attr("y1", source.y)
                    .attr("x2", target.x)
                    .attr("y2", target.y)
                    .style("stroke", function (d) { return d.color })
                    .style("stroke-width", 2);
            }


        }
    };
});

angular.module('SampleSVG2', [])
.controller('MySVG', function ($scope, $http) {
    $scope.text = "Hello my Sample SVG";
    //$http.get('Json/graph.json').success(function (data) {
    //    // you can do some processing here
    //    $scope.graph = data;
    //}).
    //error(function (data, status, headers, config) {
    //    console.log("failed");
    //});
})
.directive('content', function () {
    return {
        template: "{{text}}",
        link: function (scope, element, attrs) {
            var width = 1000,
            height = 600;

            var nodeSize = 0.02 * width;

            var svg = d3.select("#sub_content").append("svg")
                .attr("width", width)
                .attr("height", height);
            
          

            d3.json("Json/mockup_svg.json", function (error, graph) {
                var test = "";
                var dataSource = [];

                graph.forEach(function (d) {
                    createDataSource(d, dataSource);
                
                });

                var circles = d3
                    .selectAll("svg")
                    .selectAll("circle")
                    .data(dataSource).enter()
                    .append("circle")

                circles
                    .attr("cx", function (d) { return d.x })
                    .attr("cy", function (d) { return d.y })
                    .attr("r", nodeSize)
                    .style("stroke", "black")
                    .style("fill", "blue");

                circles.on("contextmenu", function (d) {
                    alert(d.name);
                    d3.event.preventDefault();
                });

                circles.on("dblclick", dblclick)

                circles.on("click", function (d) {
                    //alert(this);
                    if (!d.isClicked) {
                        d3.select(this).style("stroke", "red");
                        d.isClicked = true;
                        d3.selectAll("circle")
                    }
                    else {
                        d3.select(this).style("stroke", "black");
                        d.isClicked = false;
                    }
                });
            });

            function createDataSource(node, datasource) {
                datasource.push(node);
                node["isClicked"] = false;
                node["isCollapse"] = false;
                if (node.target != null) {
                    node.target.forEach(function (d_target, i) {
                        d_target.source = node;
                        drawLine(node, d_target);
                        createDataSource(d_target, datasource);
                    });

                }
            }

            function drawNode(node, svgD) {
         
                svgD
                    .selectAll("circle")
                    .data(node).enter()
                    .append("circle")
                    .attr("cx", node.x)
                    .attr("cy", node.y)
                    .attr("r", nodeSize)
                    .attr("class", "cirle")
                    .style("stroke", "black");

                if (node.target != null) {
                    node.target.forEach(function (d_target, i) {
                        drawLine(node, d_target);
                        drawNode(d_target, svgD);
                    });

                }
            }

            function drawLine(source, target) {
                d3.selectAll("svg")
                    .append("line")
                    .attr("id", source.name + "-" + target.name)
                    .attr("x1", source.x)
                    .attr("y1", source.y)
                    .attr("x2", target.x)
                    .attr("y2", target.y)
                    .style("stroke", "black")
                    .style("stroke-width", 2);
            }


            function dblclick(data) {
                //alert("My name is " + data.name + " My color is " + data.color);
                var text = "All circle name : ";
                var allCircles = d3.selectAll('circle');

                collapseNode(data);
            }

            function collapseNode(data) {
                if (data.target != null) {

                    data.target.forEach(function (node, i) {
                        collapseNode(node);
                        var cicle = findCircle(node);
                        var line = findLink(data.name + "-" + node.name);
                        if (!node.isCollapse) {
                            d3.select(cicle).attr("class", "collapse");
                            d3.select(line).attr("class", "collapse");
                        }
                        else {
                            d3.select(cicle).attr("class", "expand");
                            d3.select(line).attr("class", "expand");
                        }
                        node.isCollapse = !node.isCollapse;

                    });
                }
                
            }

            function collapseLink(data) {
                if (data.target != null) {

                    data.target.forEach(function (node, i) {
                        collapseNode(node);
                        var cicle = findCircle(node);

                        if (!node.isCollapse) {
                            d3.select(cicle).style("display", "none")
                        }
                        else {
                            d3.select(cicle).style("display", "")
                        }
                        node.isCollapse = !node.isCollapse;

                    });
                }
            }

            function findCircle(data) {
                var allCircles = d3.selectAll('circle');
                var circle;
                allCircles.each(function (c, i) {
                    if (data.name == c.name) {
                        circle = this;
                    }
                });
                return circle;
            }
            
            function findLink(data) {
                var allCircles = d3.selectAll('line');
                var circle;
                allCircles.each(function () {
                    if (this.id.indexOf(data) > -1) {
                        circle = this;
                    }
                });
                return circle;
            }


        }
    };
});
