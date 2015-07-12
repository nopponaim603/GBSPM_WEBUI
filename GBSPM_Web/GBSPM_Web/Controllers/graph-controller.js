app.controller('graphController', function ($scope, $http, $modal, ServiceFactory, workItemsGraph) {

    $scope.positions;
    $scope.title = "Display Graph";
    $scope.subTitle = "All about graph is here.";
    $scope.display = false;
    $scope.ProjectId = 1;

    function InjectData() {
        ServiceFactory.GetAllProjects().then(function (data) {

            $scope.projects = [{ ProjectId: 1, Name: 'test1' }, { ProjectId: 2, Name: 'test2' }];
            $scope.ProjectId = data[0].ProjectId;
            InjectGraphData($scope.ProjectId);
            $scope.display = true;
        },
        function (error) {

        });
    }



    function InjectGraphData(projectId) {
        
        var modalcontrol = $modal;

        ServiceFactory.GetGraphDataByProject(projectId).then(function (workItemGroups) {
            // TODO : change the graph to display by each project
            workItemsGraph( genGraph(workItemGroups) , $scope).then(function (data) {
                //alert(data);
            });
        });
    }

    


    $scope.OnSelectedProjectChanged = function (projectId) {
        InjectGraphData(projectId);
    }

    /////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////

    $scope.OnSelectedNodeInfo = function () {

        console.log(this.data('nodeType'));

        if (this.data('nodeType').indexOf('Start') != 0 && this.data('nodeType').indexOf('End') != 0) {

            alert("Info Mode \n" + this.id() + " : Node Type = " + this.data('nodeType') + " : Node ID = " + this.data('workId'));

            // TODO : Call Modal
            /*
            var modalInstance = modalcontrol.open({
                templateUrl: '/Views/modal-form/position-form.html',
                controller: 'modalController',
                resolve: {
                    item: function () {
                        return null;
                    },
                    comtrolName: function () {
                        return "EditPosition";
                    },
                    additionalItems: function () {
                        return null;
                    }
                }
            });
            */
        }
    }

    $scope.OnSelectedNodeAdd = function () {
        console.log(this.data('nodeType'));

        if (this.data('nodeType').indexOf('Start') != 0 && this.data('nodeType').indexOf('End') != 0 && this.data('nodeType') != "WorkItem" ) {

            alert("Info Mode \n" + this.id() + " : Node Type = " + this.data('nodeType') + " : Node ID = " + this.data('workId'));

            // TODO : Call Modal
            /*
            var modalInstance = modalcontrol.open({
                templateUrl: '/Views/modal-form/position-form.html',
                controller: 'modalController',
                resolve: {
                    item: function () {
                        return null;
                    },
                    comtrolName: function () {
                        return "EditPosition";
                    },
                    additionalItems: function () {
                        return null;
                    }
                }
            });
            */
        }
    }

    $scope.OnSelectedNodeEdit = function () {
        console.log(this.data('nodeType'));
    }

    $scope.OnSelectedNodeDelete = function () {
        console.log(this.data('nodeType'));
    }

    function genGraph( data ) {
    
        var nodes  = [];
  
        var edges = [];

        // TODO : Add Node Start
        nodes.push({
            id: 'start',
            nodeType: 'Start',
            faveShape: 'ellipse',
            faveColor: '#056B22',
            name: 'start',
            isCritical: true
        });


        for (var index = 0; index < data.length; index++) {

            var workItemGroup = data[index];

            // TODO : Add Node WorkItemGroups
            console.log(data[index].WorkItemGroupId);
            nodes.push({
                id: 'wg' + data[index].WorkItemGroupId.toString(),
                nodeType: 'WorkItemGroup',
                faveShape: 'ellipse',
                faveColor: '#3581B7',
                name: 'WorkItemGroupID : ' + data[index].WorkItemGroupId,
                workId: data[index].WorkItemGroupId,
                isCritical: true
            });

            // TODO : Link start to work
            if (index == 0) {
                edges.push({
                    source: 'start',
                    target: 'wg' + data[index].WorkItemGroupId.toString(),
                    faveColor: '#C62828'
                });
            }

            
            for (var i = 0 ; i < workItemGroup.WorkItems.length; i++) {
                console.log(data[index].WorkItems[i].WorkItemId);

                // TODO : Add Node WorkItems
                nodes.push({
                    id: 'wi' + data[index].WorkItems[i].WorkItemId.toString(),
                    nodeType: 'WorkItem',
                    faveShape: 'roundrectangle',
                    faveColor: '#B2B2B2',
                    name: 'WorkItemID : ' + data[index].WorkItems[i].WorkItemId,
                    workId: data[index].WorkItems[i].WorkItemId,
                    isCritical: true
                });

                // TODO : Link WorkGroupItems to WorkItems
                edges.push({
                    source: 'wg' + data[index].WorkItemGroupId.toString(),
                    target: 'wi' + data[index].WorkItems[i].WorkItemId.toString(),
                    faveColor: function () {
                        if (true) {
                            return '#C62828';
                        } else {
                            return '#333333';
                        }
                    }
                });


                if (index + 1 < data.length) {
                    // TODO : Link WorkItem to Next WorkGroupItems
                    edges.push({
                        source: 'wi' + data[index].WorkItems[i].WorkItemId.toString(),
                        target: 'wg' + data[index + 1].WorkItemGroupId.toString(),
                        faveColor: function () {
                            if (true) {
                                return '#C62828';
                            } else {
                                return '#333333';
                            }
                        }
                    });

                } else {
                    // TODO : Link WorkItem to End Node.
                    edges.push({
                        source: 'wi' + data[index].WorkItems[i].WorkItemId.toString(),
                        target: 'end',
                        faveColor: function () {
                            if (true) {
                                return '#C62828';
                            } else {
                                return '#333333';
                            }
                        }
                    });
                }
            }




        }

        // TODO : Add Node End
        nodes.push({
            id: 'end',
            nodeType: 'End',
            faveShape: 'ellipse',
            faveColor: '#056B22',
            name: 'end',
            isCritical: true
        });


        var result = { "nodes": nodes, "edges": edges };
       return result;
    }

    InjectData();
});