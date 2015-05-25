app.service('ServiceFactory', function ($http, $q) {

    var deferred = $q.defer();

    //#region User services
    this.GetAllUsers = function () {
        deferred = $q.defer();

        $http.get('http://localhost:50147/api/user').
        success(function (data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available
            deferred.resolve(data);
        }).
        error(function (error, status) {
            deferred.reject();
        });

        return deferred.promise;
    }

    this.UpdateUser = function (user) {
        deferred = $q.defer();
        $http({
            method: 'PUT',
            url: 'http://localhost:50147/api/user/',
            data: user
        })
       .success(function (data) {
           deferred.resolve(data);
       })
       .error(function (error, status) {
           deferred.reject();
       });

        return deferred.promise;
    }

    this.AddUser = function (user) {
        deferred = $q.defer();
        $http({
            method: 'POST',
            url: 'http://localhost:50147/api/user/',
            data: user
        })
       .success(function (data) {
           deferred.resolve(data);
       })
       .error(function (error, status) {
           deferred.reject();
       });

        return deferred.promise;
    }
    //#endregion User services


    //#region Tan
    var tan = function myfunction() {

    }
    //#endregion Tan
});
