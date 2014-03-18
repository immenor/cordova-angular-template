angular.module('angularTemplate', ['ngRoute', 'angularTemplate.controllers'])
    .config(function ($routeProvider) {
        $routeProvider
        .when('/', {
            controller: 'MainCtrl',
            templateUrl: 'partials/main.html'
        })
        .otherwise({redirectTo: '/'});
    });
