var app = angular.module('myApp', ["ngRoute"]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/main.html',
            controller: 'myCtrl'
        })
        .when('/clients', {
            templateUrl: 'pages/clients.html',
            controller: 'myCtrl'
        })
        .when('/upload', {
            templateUrl: 'pages/upload.html',
            controller: 'myCtrl'
        });
    }]);


app.controller('myCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) { 
    
    $scope.goToClients = function(){
        $location.path('clients')
    }

    //check connection
    $scope.init = function(){
        $http({
            method: "GET",
            dataType: 'JSONP', 
            url: "http://localhost:5000/"
        }).then(function(data){
            console.log("ALL DAY LONG KURWA");
        }, function(error){
            console.log("Missing connection. Please refresh or restart flask server.");
        });
    }
    //get clients
    $scope.getData = function(){
        $http({
            method: "GET",
            dataType: 'JSONP', 
            url: "http://localhost:5000/getClients"
        }).then(function(data){
            $scope.dane = data.data
            $scope.arr = [];
            for(i=0;i<$scope.dane.length;i++){
                $scope.arr.push($scope.dane[i]['name']);
                console.log($scope.dane[i]['name']);
            }
            console.log($scope.arr);
        }, function(error){
            console.log(error);
        });
    }

}]);