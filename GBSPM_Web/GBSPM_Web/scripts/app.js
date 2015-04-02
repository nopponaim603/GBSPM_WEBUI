/// <reference path="../Views/modal-form/sample-form.html" />
var app = angular.module('mainApp', ['ui.router', 'ui.bootstrap']);

// configure our routes
app.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: '/Views/home.html',
            controller : 'homeController'
        })

        .state('displayGraph', {
            url: '/displayGraph',
            templateUrl: '/Views/displaygraph_sample.html',
            controller: 'graphController'

        })

        .state('manageUser', {
            url: '/manageUser',
            templateUrl: '/Views/userlist.html',
            controller: 'userController'

        })

        .state('PositionList', {
            url: '/PositionList',
            templateUrl: '/Views/PositionList.html',
            controller: 'positionController'

        })

        .state('ProjectList', {
            url: '/ProjectList',
            templateUrl: '/Views/ProjectList.html',
            controller: 'projectController'

        })

        .state('WorkItemList', {
            url: '/WorkItemList',
            templateUrl: '/Views/WorkItemList.html',
            controller: 'workItemController'

        })

        .state('RightList', {
            url: '/RightList',
            templateUrl: '/Views/RightList.html',
            controller: 'rightController'

        })

        .state('StatusList', {
            url: '/StatusList',
            templateUrl: '/Views/StatusList.html',
            controller: 'statusController'

        })

        .state('WorkItemGroupList', {
            url: '/WorkItemGroupList',
            templateUrl: '/Views/WorkItemGroupList.html',
            controller: 'workItemGroupController'

        })

        .state('WorkItemTypeList', {
            url: '/WorkItemTypeList',
            templateUrl: '/Views/WorkItemTypeList.html',
            controller: 'workItemTypeController'

        })

        $urlRouterProvider.otherwise('/home');


    //$routeProvider

    //    // route for the home page
    //    .when('/', {
    //        templateUrl: '/Views/home.html',
    //        controller: 'homeController'
    //    })

    //.when('/displayGraph', {
    //    templateUrl: '/Views/displaygraph_sample.html',
    //    controller: 'graphController'
    //})

    //.when('/manageUser', {
    //    templateUrl: '/Views/userlist.html',
    //    controller: 'userController'
    //})

    //.when('/PositionList', {
    //    templateUrl: '/Views/PositionList.html',
    //    controller: 'positionController'
    //})

    //.when('/ProjectList', {
    //    templateUrl: '/Views/ProjectList.html',
    //    controller: 'projectController'
    //})

    //.when('/WorkItemList', {
    //    templateUrl: '/Views/WorkItemList.html',
    //    controller: 'workItemController'
    //})

    //.when('/RightList', {
    //    templateUrl: '/Views/RightList.html',
    //    controller: 'rightController'
    //})

    //.when('/StatusList', {
    //    templateUrl: '/Views/StatusList.html',
    //    controller: 'statusController'
    //})

    //.when('/WorkItemGroupList', {
    //    templateUrl: '/Views/WorkItemGroupList.html',
    //    controller: 'workItemGroupController'
    //})

    //.when('/WorkItemTypeList', {
    //    templateUrl: '/Views/WorkItemTypeList.html',
    //    controller: 'workItemTypeController'
    //})
});


app.controller('homeController', function ($scope, $http, $modal) {
    $scope.title = "Home";
    $scope.subTitle = "All about thing is here.";
    $scope.onSubmit = function myfunction() {
        alert($scope.Address);
    }

    $scope.OnSelectItem = function myfunction(item) {
        alert(item.Name);
    }

    $scope.OnEdit = function myfunction(x) {
        var modalInstance = $modal.open({
            templateUrl: '/Views/modal-form/sample-form.html',
            controller: 'modalController',
            resolve: {
                item: function () {
                    return x.Name;
                },
                comtrolName: function () {
                    return "Update Country";
                }
            }
        });
    }
   

    $http.get('Json/testdata.json').success(function (data) {
        // you can do some processing here
        $scope.cities = data;
    }).
    error(function (data, status, headers, config) {
        console.log("failed");
    });
});

app.controller('modalController', function ($scope, $modalInstance, $http, item, comtrolName) {
    $scope.test = comtrolName;
    $scope.Title = comtrolName
    $scope.data = item;
    var _this = this;
    this.$modalInstance = $modalInstance;


    $scope.close = function () {
        _this.$modalInstance.dismiss("cancel");
    };

    $scope.submit = function () {
        // TODO : Create each function to control the CRUD process.
        if (comtrolName == "EditUser") {
            var user = $scope.data;
            var newPerson =  { id : 1, LastName : "", FirstName : "" };
            //$http.put('http://localhost:50147/api/person/', newPerson)
            //.success = function () {
            //    alert('Succes');
            //}
            //.error = function () {
            //    alert('Failed');
            //}

            //$.ajax({
            //    type: "PUT",
            //    url: 'http://localhost:50147/api/person/',
            //    data: JSON.stringify(newPerson),
            //    dataType: 'json',
            //    contentType: "application/json",
            //    success: function (data) { alert(data); },
            //    failure: function (errMsg) {
            //        alert(errMsg);
            //    }
            //});
        }
    }

});

app.controller('userController', function ($scope, $http, $modal) {
    $scope.users;
    $scope.title = "Display User";
    $scope.subTitle = "All about user is here.";

    $scope.OnEdit = function myfunction(x) {
        var modalInstance = $modal.open({
            templateUrl: '/Views/modal-form/user-form.html',
            controller: 'modalController',
            resolve: {
                item: function () {
                    return angular.copy(x);
                },
                comtrolName: function () {
                    return "EditUser";
                }
            }
        });
    }

    $http.get('http://localhost:50147/api/user').
  success(function (data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
      $scope.users = data;
  }).
  error(function (data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log("failed");
  });
});

app.controller('positionController', function ($scope, $http, $modal) {
    $scope.positions;
    $scope.title = "Display Position";
    $scope.subTitle = "All about position is here.";

    $scope.OnEdit = function myfunction(x) {
        var modalInstance = $modal.open({
            templateUrl: '/Views/modal-form/position-form.html',
            controller: 'modalController',
            resolve: {
                item: function () {
                    return angular.copy(x);
                },
                comtrolName: function () {
                    return "EditPosition";
                }
            }
        });
    }

    $http.get('http://localhost:50147/api/position').
  success(function (data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
      $scope.positions = data;
  }).
  error(function (data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log("failed");
  });
});

app.controller('projectController', function ($scope, $http, $modal) {
    $scope.projects;
    $scope.title = "Display Project";
    $scope.subTitle = "All about project is here.";

    $scope.OnEdit = function myfunction(x) {
        var modalInstance = $modal.open({
            templateUrl: '/Views/modal-form/project-form.html',
            controller: 'modalController',
            resolve: {
                item: function () {
                    return angular.copy(x);
                },
                comtrolName: function () {
                    return "EditProject";
                }
            }
        });
    }

    $http.get('http://localhost:50147/api/project').
  success(function (data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
      $scope.projects = data;
  }).
  error(function (data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log("failed");
  });
});

app.controller('workItemController', function ($scope, $http, $modal) {
    $scope.workitems;
    $scope.title = "Display Work Item";
    $scope.subTitle = "All about work items is here.";

    $scope.OnEdit = function myfunction(x) {
        var modalInstance = $modal.open({
            templateUrl: '/Views/modal-form/workitem-form.html',
            controller: 'modalController',
            resolve: {
                item: function () {
                    return angular.copy(x);
                },
                comtrolName: function () {
                    return "EditWorkItem";
                }
            }
        });
    }

    $http.get('http://localhost:50147/api/workitem').
  success(function (data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
      $scope.workitems = data;
  }).
  error(function (data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log("failed");
  });
});

app.controller('rightController', function ($scope, $http, $modal) {
    $scope.rights;
    $scope.title = "Display All Right";
    $scope.subTitle = "All about rights is here.";

    $scope.OnEdit = function myfunction(x) {
        var modalInstance = $modal.open({
            templateUrl: '/Views/modal-form/right-form.html',
            controller: 'modalController',
            resolve: {
                item: function () {
                    return angular.copy(x);
                },
                comtrolName: function () {
                    return "EditRights";
                }
            }
        });
    }

    $http.get('http://localhost:50147/api/right').
  success(function (data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
      $scope.rights = data;
  }).
  error(function (data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log("failed");
  });
});

app.controller('statusController', function ($scope, $http, $modal) {
    $scope.statuses;
    $scope.title = "Display All Staus";
    $scope.subTitle = "All about status is here.";

    $scope.OnEdit = function myfunction(x) {
        var modalInstance = $modal.open({
            templateUrl: '/Views/modal-form/status-form.html',
            controller: 'modalController',
            resolve: {
                item: function () {
                    return angular.copy(x);
                },
                comtrolName: function () {
                    return "EditStatus";
                }
            }
        });
    }

    $http.get('http://localhost:50147/api/status').
  success(function (data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
      $scope.statuses = data;
  }).
  error(function (data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log("failed");
  });
});

app.controller('workItemGroupController', function ($scope, $http, $modal) {
    $scope.workitemgroups;
    $scope.title = "Display All Work Item Group";
    $scope.subTitle = "All about work item group is here.";

    $scope.OnEdit = function myfunction(x) {
        var modalInstance = $modal.open({
            templateUrl: '/Views/modal-form/workitemgroup-form.html',
            controller: 'modalController',
            resolve: {
                item: function () {
                    return angular.copy(x);
                },
                comtrolName: function () {
                    return "EditWorkItemGroup";
                }
            }
        });
    }

    $http.get('http://localhost:50147/api/workitemgroup').
  success(function (data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
      $scope.workitemgroups = data;
  }).
  error(function (data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log("failed");
  });
});

app.controller('workItemTypeController', function ($scope, $http, $modal) {
    $scope.workitemtypes;
    $scope.title = "Display All Work Item Type";
    $scope.subTitle = "All about work item type is here.";

    $scope.OnEdit = function myfunction(x) {
        var modalInstance = $modal.open({
            templateUrl: '/Views/modal-form/workitemtype-form.html',
            controller: 'modalController',
            resolve: {
                item: function () {
                    return angular.copy(x);
                },
                comtrolName: function () {
                    return "EditWorkItemType";
                }
            }
        });
    }

    $http.get('http://localhost:50147/api/workitemtype').
  success(function (data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
      $scope.workitemtypes = data;
  }).
  error(function (data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      console.log("failed");
  });
});

app.controller('graphController', function ($scope, $http) {
    $scope.title = "Display Graph";
    $scope.subTitle = "This is the mockup of relational graph.";
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
        template: "",//'Name: {{customer.name}} Address: {{customer.address}}',
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
                    d3.select('#contextMenu')
                      .style('position', 'absolute')
                      .style('left', position[0] + 200 + "px")
                      .style('top', position[1] + 100 + "px")
                      .style('display', 'inline-block')
                      .on('mouseleave', function () {
                          //d3.select(this).remove();
                          d3.select(this).style('display', 'none');
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