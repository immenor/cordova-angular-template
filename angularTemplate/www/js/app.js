angular.module('template', ['ngRoute', 'template.controllers', 'template.directives', 'template.services'])
    .config(function ($routeProvider) {
        $routeProvider
        .when('/', {
            controller: 'MainCtrl',
            templateUrl: 'partials/main.html'
        })
        .otherwise({redirectTo: '/'});
    });
