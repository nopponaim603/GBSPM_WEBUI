app.controller('statusController', function ($scope, $http, $modal, ServiceFactory) {
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

    $scope.OnAddNew = function AddStatus() {
        var status = { StatusId: 0, Description: null };
        var modalInstance = $modal.open({
            templateUrl: '/Views/modal-form/status-form.html',
            controller: 'modalController',
            resolve: {
                item: function () {
                    return status;
                },
                comtrolName: function () {
                    return "AddStatus";
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
        ServiceFactory.GetAllStatuses().then(function (data) {
            $scope.statuses = data;
        },
        function (error) {

        });
    }

    InjectData();

});