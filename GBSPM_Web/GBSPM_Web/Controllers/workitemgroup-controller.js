app.controller('workItemGroupController', function ($scope, $http, $modal, ServiceFactory) {
    $scope.workitemgroups;
    $scope.title = "Display All Work Item Group";
    $scope.subTitle = "All about work item group is here.";
    $scope.display = false;

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
                },
                additionalItems: function () {
                    return null;
                }
            },
            backdrop: 'static',
            keyboard: false
        });

        modalInstance.result.then(function (group) {
            //$scope.groups.push(group)
        }, function () {
            // the modal was dismissed
            InjectData();
        });
    }

    $scope.OnAddNew = function AddWorkItemGroup() {
        var workGroup = { WorkItemGroupId: 0, Description: null };
        var modalInstance = $modal.open({
            templateUrl: '/Views/modal-form/workitemgroup-form.html',
            controller: 'modalController',
            resolve: {
                item: function () {
                    return workGroup;
                },
                comtrolName: function () {
                    return "AddWorkItemGroup";
                },
                additionalItems: function () {
                    return null;
                }
            },
            backdrop: 'static',
            keyboard: false
        });

        modalInstance.result.then(function (group) {
            //$scope.groups.push(group)
        }, function () {
            // the modal was dismissed
            InjectData();
        });
    }

    function InjectData() {
        ServiceFactory.GetAllWorkItemGroups().then(function (data) {
            $scope.workitemgroups = data;
            $scope.display = true;
        },
        function (error) {

        });
    }

    InjectData();

    //setTimeout(function () {
    //    $scope.$apply(function () {
    //        $scope.display = true;
    //    });
    //}, 5000);

});