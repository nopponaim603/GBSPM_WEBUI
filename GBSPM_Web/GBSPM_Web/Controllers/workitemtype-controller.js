app.controller('workItemTypeController', function ($scope, $http, $modal, ServiceFactory) {
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

    $scope.OnAddNew = function AddWorkItemType() {
        var workItemType = { WorkItemTypeId: 0, Description: null };
        var modalInstance = $modal.open({
            templateUrl: '/Views/modal-form/workitemtype-form.html',
            controller: 'modalController',
            resolve: {
                item: function () {
                    return workItemType;
                },
                comtrolName: function () {
                    return "AddWorkItemType";
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
        ServiceFactory.GetAllWorkItemTypes().then(function (data) {
            $scope.workitemtypes = data;
        },
        function (error) {

        });
    }

    InjectData();

});