app.controller('rightController', function ($scope, $http, $modal, ServiceFactory) {
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

    $scope.OnAddNew = function AddRight() {
        var right = { RightId: 0, Description: null };
        var modalInstance = $modal.open({
            templateUrl: '/Views/modal-form/right-form.html',
            controller: 'modalController',
            resolve: {
                item: function () {
                    return right;
                },
                comtrolName: function () {
                    return "AddRight";
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

        ServiceFactory.GetAllRights().then(function (data) {
            $scope.rights = data;
        },
        function (error) {

        });
    }

    InjectData();
});