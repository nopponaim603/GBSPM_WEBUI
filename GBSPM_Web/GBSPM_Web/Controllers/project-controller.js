app.controller('projectController', function ($scope, $http, $modal, ServiceFactory) {
    $scope.projects;
    $scope.title = "Display Project";
    $scope.subTitle = "All about project is here.";
    $scope.display = false;

    $scope.OnEdit = function myfunction(x) {
        var modalInstance = $modal.open({
            templateUrl: '/Views/modal-form/project-form.html',
            controller: 'modalController',
            resolve: {
                item: function () {
                    return angular.copy(x);
                },
                comtrolName: function () {
                    return "EditProject";
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

    $scope.OnAddNew = function myfunction(x) {
        var project = { ProjectId: 0, Description: null };
        var modalInstance = $modal.open({
            templateUrl: '/Views/modal-form/project-form.html',
            controller: 'modalController',
            resolve: {
                item: function () {
                    return project;
                },
                comtrolName: function () {
                    return "AddProject";
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
        ServiceFactory.GetAllProjects().then(function (data) {
            $scope.projects = data;
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