'use strict';

var compatApp = angular.module('compatApp', []);

compatApp.controller('CompatCtrl', function ($scope, $http) {
    $scope.layout = {};
    $scope.layout.mainContent = "/static/html/home-form.html";

    $scope.person = {};

    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    $scope.submitMainForm = function() {
        $http.post('/api/compute', {
                    me: $scope.person.first,
                    friend: $scope.person.second
        }).
        success(function(data, status, headers, config) {
            $layout.mainContent = "/static/html/results.html";
        }).
        error(function(data, status, headers, config) {});
    }
});