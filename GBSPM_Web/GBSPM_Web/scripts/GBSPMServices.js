app.service('ServiceFactory', function ($http, $q) {

    //#region User services
    this.GetAllUsers = function () {
        var deferred = $q.defer();

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
        var deferred = $q.defer();
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


    //#region Position services
    this.GetAllPositions = function () {
        var deferred = $q.defer();
        $http.get('http://localhost:50147/api/position').
         success(function (data, status, headers, config) {
             deferred.resolve(data);
         }).
         error(function (data, status) {
             deferred.reject();
         });
        return deferred.promise;
    }

    this.AddPosition = function (position) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: 'http://localhost:50147/api/position/',
            data: position
        })
      .success(function (data) {
          deferred.resolve(data);
      })
      .error(function (error, status) {
          deferred.reject();
      });
        return deferred.promise;
    }

    this.UpdatePosiion = function (position) {
        var deferred = $q.defer();
        $http({
            method: 'PUT',
            url: 'http://localhost:50147/api/position/',
            data: position
        })
      .success(function (data) {
          deferred.resolve(data);
      })
      .error(function (error, status) {
          deferred.reject();
      });
        return deferred.promise;
    }
    //#endregion 

    // Project services
    this.GetAllProjects = function () {
        var deferred = $q.defer();
        $http.get('http://localhost:50147/api/project').
        success(function (data, status, headers, config) {
            deferred.resolve(data);
        }).
        error(function (data, status, headers, config) {
            deferred.reject();
        });
        return deferred.promise;
    }

    this.AddProject = function (project) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: 'http://localhost:50147/api/project/',
            data: project
        })
         .success(function (data) {
             deferred.resolve(data);
         })
         .error(function (error, status) {
             deferred.reject();
         });
        return deferred.promise;
    }

    this.UpdateProject = function (project) {
        var deferred = $q.defer();
        $http({
            method: 'PUT',
            url: 'http://localhost:50147/api/project/',
            data: project
        })
         .success(function (data) {
             deferred.resolve(data);
         })
         .error(function (error, status) {
             deferred.reject();
         });
        return deferred.promise;
    }
    //
});
