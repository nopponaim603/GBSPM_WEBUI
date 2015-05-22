app.controller('positionController', function ($scope, $http, $modal) {
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

    function InjectData() {
        $http.get('http://localhost:50147/api/position').
         success(function (data, status, headers, config) {
             // this callback will be called asynchronously
             // when the response is available
             $scope.positions = data;
         }).
         error(function (data, status, headers, config) {
             // called asynchronously if an error occurs
             // or server returns response with an error status.
             console.log("failed");
         });
    }

    InjectData();
});