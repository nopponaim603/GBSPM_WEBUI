angular.module('Tan', [])
.controller('MyFirstCtrl', function ($scope, $http) {
    $scope.text = "Hi My name is Tan.";
    $scope.Address = "CNX ";
    $scope.cities;
    $http.get('Json/testdata.json').success(function (data) {
        // you can do some processing here
        $scope.cities = data;
    }).
    error(function (data, status, headers, config) {
        console.log("failed");
    });
});

angular.module('Graph', [])
.controller('MyGraph', function ($scope, $http) {
    $scope.title = "This is example of graph using d3.js"
});

angular.module('myApp', []).
   directive('bars', function ($parse) {
       return {
           restrict: 'E',
           replace: true,
           template: '<div id="chart"></div>',
           link: function (scope, element, attrs) {
               var data = attrs.data.split(','),
               chart = d3.select('#chart')
                 .append("div").attr("class", "chart")
                 .selectAll('div')
                 .data(data).enter()
                 .append("div")
                 .transition().ease("elastic")
                 .style("width", function (d) { return d + "%"; })
                 .text(function (d) { return d + "%"; });
           }
       };
   });
