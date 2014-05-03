angular.module('template.controllers', []).
    controller('MainCtrl', function($scope, portfolioContentService, $window, $log) {
        $scope.title = 'Test App';
        $scope.interfaceExamples = portfolioContentService.interfaceExamples;
        $scope.identityExamples = portfolioContentService.identityExamples;
        $scope.musicExamples = portfolioContentService.musicExamples;
        $scope.drawerIsOpen = false;


        $scope.$on('drawOpened', function(){
        	$scope.drawerIsOpen = true;
        	$log.info('drawOpened triggered', $scope.drawerIsOpen);
        });
        $scope.$on('drawClosed', function(){
        	$scope.drawerIsOpen = false;
        	$log.info('drawClosed triggered', $scope.drawerIsOpen);
        });
        
        $scope.getDrawerClass = function() {
        	$log.info('getting drawer class');
        	return $scope.drawerIsOpen ? 'drawerOpen' : 'drawerClosed';
        }
        $scope.currentChoice = {
        	name: '', 
        	image: '', 
        	large: null, 
        	larger: null, 
        	description: null
        }
        $scope.selectPortfolioItem = function (name, type) {
        	$log.info('selecting portfolio item');
        	var localString = type + "Examples";
        	var selectedItem = $scope[localString][name];
        	$log.info('the selected obj', $scope[localString])
        	if (selectedItem.name === $scope.currentChoice.name) {
        		for (attr in $scope.currentChoice) {
        			$scope.currentChoice[attr] = '';
        			break;
        		}
        	} else {
        		for (attr in $scope.currentChoice) {
        		$scope.currentChoice[attr] = selectedItem[attr];
        		}	
        	}        	
        }

	})
;
