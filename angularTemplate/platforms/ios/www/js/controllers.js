angular.module('template.controllers', [])
    .controller('MainCtrl', ['$scope', '$window', function ($scope, portfolioContentService, $window) {
        $scope.title = 'Test App';
        $scope.interfaceElements = portfolioContentService.interfaceElements;
        $scope.interface = portfolioContentService.interface;
//        $scope.identity = portfolioContentService.identity;
//        $scope.music = portfolioContentService.music;


	}])
;
