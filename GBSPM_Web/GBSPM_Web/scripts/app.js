/// <reference path="../Views/modal-form/sample-form.html" />
var app = angular.module('mainApp', ['ui.router', 'ui.bootstrap']);

// configure our routes
app.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: '/Views/home.html',
            controller: 'homeController'
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

        .state('DisplayPeople', {
            url: '/DisplayPeople',
            templateUrl: '/Views/DisplayPeople.html',
            controller: 'PeopleCtrl'

        })

    $urlRouterProvider.otherwise('/home');

});

app.controller('homeController', function ($scope, $http, $modal, $window) {
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

    $scope.OnPut = function () {
        $http({
            method: 'PUT',
            url: 'http://localhost:50147/api/person/',
            data: { Id: 1, FirstName: 'Tan', LastName: 'Ta' },
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            }
        })
            .success(function (data) {
                alert('success');
            })
            .error(function (error, status) {
                alert('failed');
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

app.controller('modalController', function ($scope, $modalInstance, $http, item, comtrolName, additionalItems, ServiceFactory) {
    $scope.Title = comtrolName
    $scope.data = item;
    var _this = this;
    this.$modalInstance = $modalInstance;
    InjectAdditionalDataForModal($scope, comtrolName, additionalItems);

    $scope.close = function () {
        _this.$modalInstance.dismiss("cancel");
    };

    $scope.submit = function () {
        OnSubmitHandler(comtrolName, $scope.data, $http, _this.$modalInstance, ServiceFactory);
    }

});

function OnSubmitHandler(comtrolName, data, $http, modal, ServiceFactory) {
    if (comtrolName == "EditUser") {
        ServiceFactory.UpdateUser(data).then(function (data) {
            alert('Success!');
            modal.dismiss("cancel");
        },
        function (error) {
            alert(error);
        });
    }
    else if (comtrolName == "EditPosition") {
        $http({
            method: 'PUT',
            url: 'http://localhost:50147/api/position/',
            data: data
        })
        .success(function (data) {
            alert('success');
            modal.dismiss("cancel");
        })
        .error(function (error, status) {
            alert('failed');
        });
    }
    else if (comtrolName == "EditProject") {
        $http({
            method: 'PUT',
            url: 'http://localhost:50147/api/project/',
            data: data
        })
        .success(function (data) {
            alert('success');
            modal.dismiss("cancel");
        })
        .error(function (error, status) {
            alert('failed');
        });
    }
    else if (comtrolName == "EditRights") {
        $http({
            method: 'PUT',
            url: 'http://localhost:50147/api/right/',
            data: data
        })
        .success(function (data) {
            alert('success');
            modal.dismiss("cancel");
        })
        .error(function (error, status) {
            alert('failed');
        });
    }
    else if (comtrolName == "EditStatus") {
        $http({
            method: 'PUT',
            url: 'http://localhost:50147/api/status/',
            data: data
        })
        .success(function (data) {
            alert('success');
            modal.dismiss("cancel");
        })
        .error(function (error, status) {
            alert('failed');
        });
    }
    else if (comtrolName == "EditWorkItemGroup") {
        $http({
            method: 'PUT',
            url: 'http://localhost:50147/api/workitemgroup/',
            data: data
        })
        .success(function (data) {
            alert('success');
            modal.dismiss("cancel");
        })
        .error(function (error, status) {
            alert('failed');
        });
    }
    else if (comtrolName == "EditWorkItemType") {
        $http({
            method: 'PUT',
            url: 'http://localhost:50147/api/workitemtype/',
            data: data
        })
        .success(function (data) {
            alert('success');
            modal.dismiss("cancel");
        })
        .error(function (error, status) {
            alert('failed');
        });
    }
    else if (comtrolName == "EditWorkItem") {
        $http({
            method: 'PUT',
            url: 'http://localhost:50147/api/workitem/',
            data: data
        })
        .success(function (data) {
            alert('success');
            modal.dismiss("cancel");
        })
        .error(function (error, status) {
            alert('failed');
        });
    }
    else if (comtrolName == "AddUser") {
        ServiceFactory.AddUser(data).then(function (data) {
            alert('Success!');
            modal.dismiss("cancel");
        },
         function (error) {
             alert(error);
         });
    }
    else if (comtrolName == "AddPosition") {
        ServiceFactory.AddPosition(data).then(function (data) {
            alert('Success!');
            modal.dismiss("cancel");
        },
         function (error) {
             alert(error);
         });
    }
    else if (comtrolName == "AddProject") {
        ServiceFactory.AddProject(data).then(function (data) {
            alert('Success!');
            modal.dismiss("cancel");
        },
         function (error) {
             alert(error);
         });
    }
    else if (comtrolName == "AddWorkItem") {
        ServiceFactory.AddWorkItem(data).then(function (data) {
            alert('Success!');
            modal.dismiss("cancel");
        },
         function (error) {
             alert(error);
         });
    }
    else if (comtrolName == "AddRight") {
        ServiceFactory.AddRight(data).then(function (data) {
            alert('Success!');
            modal.dismiss("cancel");
        },
         function (error) {
             alert(error);
         });
    }
    else if (comtrolName == "AddStatus") {
        ServiceFactory.AddStatus(data).then(function (data) {
            alert('Success!');
            modal.dismiss("cancel");
        },
         function (error) {
             alert(error);
         });
    }
    else if (comtrolName == "AddWorkItemGroup") {
        ServiceFactory.AddWorkItemGroup(data).then(function (data) {
            alert('Success!');
            modal.dismiss("cancel");
        },
         function (error) {
             alert(error);
         });
    }
    else if (comtrolName == "AddWorkItemType") {
        ServiceFactory.AddWorkItemType(data).then(function (data) {
            alert('Success!');
            modal.dismiss("cancel");
        },
         function (error) {
             alert(error);
         });
    }
}

function InjectAdditionalDataForModal($scope, controlName, additionalItems) {
    if (controlName == "EditUser" || controlName == "AddUser") {
        $scope.positions = additionalItems;
        $scope.LoginUser = JSON.parse(sessionStorage.getItem('login-user'));
    }
    else if (controlName == "EditWorkItem" || controlName == "AddWorkItem") {
        $scope.users = additionalItems['user'];
        $scope.statuses = additionalItems['status'];
        $scope.projects = additionalItems['project'];
        $scope.workitemgroups = additionalItems['workitemgroup'];
        $scope.workitemtypes = additionalItems['workitemtype'];
    }
}

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

app.controller('PeopleCtrl', function ($scope, $http, $modal, ServiceFactory) {
    var myCy = document.getElementById('cy');
    ServiceFactory.GetGraphDataByProject().then(function (peopleGraph) {
        
        $scope.num = peopleGraph;

    },
    function (error) {

    });
    $scope.display = false;
    $scope.name = 'World';
    $scope.items = [{ name: "One" }];
    setTimeout(function () {
        $scope.$apply(function () {
            $scope.items[0].lateLoader = 'i just loaded';
            $scope.display = true;
        });
    }, 5000);
});

app.controller('UserInfoCtrl', function ($scope, $window) {
    if (sessionStorage.getItem('login-user') == null) {
        $window.location = '/Login.html';
        return;
    }

    $scope.CurrentUser = JSON.parse(sessionStorage.getItem('login-user'));
});