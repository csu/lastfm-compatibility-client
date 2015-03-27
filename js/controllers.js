'use strict';

var param = function(obj) {
    var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
      
    for (name in obj) {
        value = obj[name];

        if (value instanceof Array) {
            for (i=0; i<value.length; ++i) {
                subValue = value[i];
                fullSubName = name + '[' + i + ']';
                innerObj = {};
                innerObj[fullSubName] = subValue;
                query += param(innerObj) + '&';
            }
        }
        else if (value instanceof Object) {
            for (subName in value) {
                subValue = value[subName];
                fullSubName = name + '[' + subName + ']';
                innerObj = {};
                innerObj[fullSubName] = subValue;
                query += param(innerObj) + '&';
            }
        }
        else if (value !== undefined && value !== null)
            query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
    }
      
    return query.length ? query.substr(0, query.length - 1) : query;
};

var compatApp = angular.module('compatApp', []);

compatApp.controller('CompatCtrl', function ($scope, $http) {
    $scope.layout = {};
    $scope.displayForm = function() {
        console.log("hi");
        $scope.layout.mainContent = "/static/html/home-form.html";
    }();

    $scope.person = {};

    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $http.defaults.transformRequest = [function(data) {
        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];

    $scope.submitMainForm = function() {
        $http.post('/api/compute', {
                    me: $scope.person.first,
                    friend: $scope.person.second
        }).
        success(function(data, status, headers, config) {
            $scope.result = data;
            $scope.layout.mainContent = "/static/html/results.html";
        }).
        error(function(data, status, headers, config) {});
    };
});