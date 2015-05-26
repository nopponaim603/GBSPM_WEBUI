app.controller('positionController', function ($scope, $http, $modal, ServiceFactory) {
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
                },
                additionalItems: function () {
                    return null;
                }
            }
        });

        // Manage after close the modal popup.
        modalInstance.result.then(function (group) {
            //$scope.groups.push(group)
        }, function () {
            // the modal was dismissed
            InjectData();
        });
    }

    $scope.OnAddNew = function AddPosition() {
        var position = { PositionId: 0, Description: null };

        var modalInstance = $modal.open({
            templateUrl: '/Views/modal-form/position-form.html',
            controller: 'modalController',
            resolve: {
                item: function () {
                    return position;
                },
                comtrolName: function () {
                    return "AddPosition";
                },
                additionalItems: function () {
                    return null;
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
        ServiceFactory.GetAllPositions().then(function (data) {
            $scope.positions = data;
        }, 
        function (error) {

        });
    }

    InjectData();
});