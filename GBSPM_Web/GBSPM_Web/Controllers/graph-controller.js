app.controller('graphController', function ($scope, $http, $modal, ServiceFactory) {
    $scope.positions;
    $scope.title = "Display Graph";
    $scope.subTitle = "All about graph is here.";
    $scope.display = false;
    $scope.ProjectId = 1;

    function InjectData() {
        ServiceFactory.GetAllProjects().then(function (data) {

            $scope.projects = [{ ProjectId: 1, Name: 'test1' }, { ProjectId: 2, Name: 'test2' }];
            $scope.ProjectId = data[0].ProjectId;
            InjectGraphData($scope.ProjectId);
            $scope.display = true;
        },
        function (error) {

        });
    }

    function InjectGraphData(projectId) {
        alert(projectId);
        // TODO : change the graph to display by each project
    }

    $scope.OnSelectedProjectChanged = function (projectId) {
        InjectGraphData(projectId);
    }

    InjectData();
});