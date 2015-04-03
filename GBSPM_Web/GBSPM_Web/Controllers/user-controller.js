﻿app.controller('userController', function ($scope, $http, $modal) {
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

        modalInstance.result.then(function (group) {
            //$scope.groups.push(group)
        }, function () {
            // the modal was dismissed
            InjectData();
        });

    }

    function InjectData() {
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
    }

    InjectData();

});