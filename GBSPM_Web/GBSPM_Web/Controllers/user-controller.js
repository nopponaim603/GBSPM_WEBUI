app.controller('userController', function ($scope, $http, $modal, ServiceFactory) {
    $scope.users;
    $scope.title = "Display User";
    $scope.subTitle = "All about user is here.";
    $scope.positions;

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
                },
                additionalItems: function () {
                    return $scope.positions;
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

    $scope.OnAddNew = function AddUser() {
        var user = { UserId: 0, FirstName: null, LastName: null, UserName: "11", Password: "11", PositionId: null, Email: null }
        var modalInstance = $modal.open({
            templateUrl: '/Views/modal-form/user-form.html',
            controller: 'modalController',
            resolve: {
                item: function () {
                    return user;
                },
                comtrolName: function () {
                    return "AddUser";
                },
                additionalItems: function () {
                    return $scope.positions;
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
        ServiceFactory.GetAllUsers().then(function (data) {
            $scope.users = data;

           
        },
        function (error) {
            //alert(error);
        });
        

        ServiceFactory.GetAllPositions().then(function (data) {
            $scope.positions = data;
        },
           function (error) {
        });
    }

    InjectData();

});