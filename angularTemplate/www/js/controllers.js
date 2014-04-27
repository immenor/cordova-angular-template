angular.module('template.controllers', []).
    controller('MainCtrl', function($scope, portfolioContentService, $window) {
        $scope.title = 'Test App';
        $scope.interfaceExamples = portfolioContentService.interfaceExamples;
        $scope.identityExamples = portfolioContentService.identityExamples;
        $scope.musicExamples = portfolioContentService.musicExamples;


	})
;
