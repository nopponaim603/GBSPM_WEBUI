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


    //#region WorkItem services
    this.GetAllWorkItems = function () {
        var deferred = $q.defer();
        $http.get('http://localhost:50147/api/workitem').
         success(function (data, status) {
             deferred.resolve(data);
         }).
         error(function (data, status) {
             deferred.reject();
         });
        return deferred.promise;
    }

    this.AddWorkItem = function (workitem) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: 'http://localhost:50147/api/workitem/',
            data: workitem
        })
      .success(function (data) {
          deferred.resolve(data);
      })
      .error(function (error, status) {
          deferred.reject();
      });
        return deferred.promise;
    }

    this.UpdateWorkItem = function (workitem) {
        var deferred = $q.defer();
        $http({
            method: 'PUT',
            url: 'http://localhost:50147/api/workitem/',
            data: workitem
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

    //region Right services
    this.GetAllRights = function () {
        var deferred = $q.defer();
        $http.get('http://localhost:50147/api/right').
         success(function (data, status) {
             deferred.resolve(data);
         }).
         error(function (data, status) {
             deferred.reject();
         });
        return deferred.promise;
    }

    this.AddRight = function (right) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: 'http://localhost:50147/api/right/',
            data: right
        })
      .success(function (data) {
          deferred.resolve(data);
      })
      .error(function (error, status) {
          deferred.reject();
      });
        return deferred.promise;
    }

    this.UpdateRight = function (right) {
        var deferred = $q.defer();
        $http({
            method: 'PUT',
            url: 'http://localhost:50147/api/right/',
            data: right
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

    //region Status service
    this.GetAllStatuses = function () {
        var deferred = $q.defer();
        $http.get('http://localhost:50147/api/status').
         success(function (data, status) {
             deferred.resolve(data);
         }).
         error(function (data, status) {
             deferred.reject();
         });
        return deferred.promise;
    }

    this.AddStatus = function (status) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: 'http://localhost:50147/api/status/',
            data: status
        })
      .success(function (data) {
          deferred.resolve(data);
      })
      .error(function (error, status) {
          deferred.reject();
      });
        return deferred.promise;
    }

    this.UpdateStatus = function (status) {
        var deferred = $q.defer();
        $http({
            method: 'PUT',
            url: 'http://localhost:50147/api/status/',
            data: status
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


    //region WorkItemGroup services
    this.GetAllWorkItemGroups = function () {
        var deferred = $q.defer();
        $http.get('http://localhost:50147/api/workitemgroup').
         success(function (data, status) {
             deferred.resolve(data);
         }).
         error(function (data, status) {
             deferred.reject();
         });
        return deferred.promise;
    }

    this.AddWorkItemGroup = function (workitemgroup) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: 'http://localhost:50147/api/workitemgroup/',
            data: workitemgroup
        })
      .success(function (data) {
          deferred.resolve(data);
      })
      .error(function (error, status) {
          deferred.reject();
      });
        return deferred.promise;
    }

    this.UpdateWorkItemGroup = function (workitemgroup) {
        var deferred = $q.defer();
        $http({
            method: 'PUT',
            url: 'http://localhost:50147/api/workitemgroup/',
            data: workitemgroup
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

    //region WorkItemType services
    this.GetAllWorkItemTypes = function () {
        var deferred = $q.defer();
        $http.get('http://localhost:50147/api/workitemtype').
         success(function (data, status) {
             deferred.resolve(data);
         }).
         error(function (data, status) {
             deferred.reject();
         });
        return deferred.promise;
    }

    this.AddWorkItemType = function (workitemtype) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: 'http://localhost:50147/api/workitemtype/',
            data: workitemtype
        })
      .success(function (data) {
          deferred.resolve(data);
      })
      .error(function (error, status) {
          deferred.reject();
      });
        return deferred.promise;
    }

    this.UpdateWorkItemType = function (workitemtype) {
        var deferred = $q.defer();
        $http({
            method: 'PUT',
            url: 'http://localhost:50147/api/workitemgroup/',
            data: workitemtype
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

    // region Graph services
    this.GetGraphDataByProject = function (projectId) {
        var deferred = $q.defer();

        $http.get('http://localhost:50147/api/graph/1').
        success(function (data, status) {
            deferred.resolve(data);
        }).
        error(function (data, status) {
            deferred.reject();
        });

        return deferred.promise;

    }
    //

    this.Login = function (username, password) {
        return true;

    }


});
