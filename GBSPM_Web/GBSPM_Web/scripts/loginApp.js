angular.module('loginApp', [])
.controller('LoginController', function ($scope, $window, LoginService) {
    $scope.IsLogIn = false;
    $scope.Message = '';
    $scope.Submitted = false;
    $scope.IsFormValidate = false;
    $scope.LogInData = { username: '', password: '' };
    sessionStorage.removeItem('login-user');
    $scope.display = true;

    $scope.$watch('f1.$valid', function (isValid) {
        $scope.IsFormValidate = isValid;
    });

    $scope.Login = function () {
        $scope.Submitted = true;
        $scope.display = false;
        $scope.Message = '';
        if ($scope.IsFormValidate) {
            LoginService.GetUser($scope.LogInData).then(function (d) {
                if (d != null) {
                    sessionStorage.setItem('login-user', JSON.stringify(d));
                    $window.location = '/#/home';
                    $scope.display = true;
                }
                else {
                    $scope.Message = 'Login failed';
                    $scope.display = true;
                }

            });
        }
    };
})
.service('LoginService', function ($http, $q) {

    this.GetUser = function (data) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: 'http://localhost:50147/api/user/?username=' + data.username + '&password=' + data.password
        })
     .success(function (data) {
         deferred.resolve(data);
     })
     .error(function (error, status) {
         deferred.reject();
     });
        return deferred.promise;
    }

});