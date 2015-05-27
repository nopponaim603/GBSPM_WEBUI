app.controller('workItemController', function ($scope, $http, $modal, ServiceFactory) {
    $scope.workitems;
    $scope.title = "Display Work Item";
    $scope.subTitle = "All about work items is here.";


    var l_additionalItems = { user: null, status: null, project: null, workitemgroup: null, workitemtype: null };

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
                },
                additionalItems: function () {
                    return l_additionalItems;
                }
            },
            backdrop: 'static',
            keyboard: false
        });

        // Manage after close the modal popup.
        modalInstance.result.then(function (group) {
            //$scope.groups.push(group)
        }, function () {
            // the modal was dismissed
            InjectData();
        });
    }

    $scope.OnAddNew = function myfunction(x) {
        var workItem = { WorkItemId: 0, Title: null, Description: null, Priority: 0, AssignTo: null, StatusId: 0, ProjectId: 0, EstimateTime: null, ActualTime: null, WorkItemGroupId: 0 };
        var modalInstance = $modal.open({
            templateUrl: '/Views/modal-form/workitem-form.html',
            controller: 'modalController',
            resolve: {
                item: function () {
                    return angular.copy(x);
                },
                comtrolName: function () {
                    return "EditWorkItem";
                },
                additionalItems: function () {
                    return l_additionalItems;
                }
            },
            backdrop: 'static',
            keyboard: false
        });

        // Manage after close the modal popup.
        modalInstance.result.then(function (group) {
            //$scope.groups.push(group)
        }, function () {
            // the modal was dismissed
            InjectData();
        });
    }

    function InjectData() {
        ServiceFactory.GetAllWorkItems().then(function (data) {
            $scope.workitems = data;
        },
        function (error) {

        });

        ServiceFactory.GetAllWorkItemTypes().then(function (data) {
            l_additionalItems['workitemtype'] = data;
        },
         function (error) {

         });

        ServiceFactory.GetAllUsers().then(function (data) {
            l_additionalItems['user'] = data;
        },
         function (error) {

         });

        ServiceFactory.GetAllStatuses().then(function (data) {
            l_additionalItems['status'] = data;
        },
        function (error) {

        });

        ServiceFactory.GetAllProjects().then(function (data) {
            l_additionalItems['project'] = data;
        },
         function (error) {

         });

        ServiceFactory.GetAllWorkItemGroups().then(function (data) {
            l_additionalItems['workitemgroup'] = data;
        },
         function (error) {

         });

    }

    InjectData();
});