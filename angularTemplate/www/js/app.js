angular.module('template', ['ngRoute', 'template.controllers'])
    .config(function ($routeProvider) {
        $routeProvider
        .when('/', {
            controller: 'MainCtrl',
            templateUrl: 'partials/main.html'
        })
        .otherwise({redirectTo: '/'});
    });
