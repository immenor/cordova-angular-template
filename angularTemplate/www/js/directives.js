'use strict';

/* Directives */

var directives = angular.module('template.directives', []);
directives.directive('resizeElement', function() {
    // Linker function
    return {
        scope: {
            padding: '=?',
            mobile: '=?'

        },
        controller: function($scope, $element, $window, $log) {
            var resizeEverything = function() {
                $log.info('Running resize function, mobile is:', $scope.mobile);
                $scope.padding = $scope.padding || '0';
                var targetHeight = $(window).height();
                targetHeight = targetHeight - $scope.padding;
                $element.height(targetHeight);

                $(window).resize(function() {

                    var targetHeight = $(window).height();
                    targetHeight = targetHeight - $scope.padding;
                    $element.height(targetHeight);

                });
            };

            $log.info('resize things!!!');
            if ($(window).width() < 768) {
                $log.info('window height is mobile sized');
                if ($scope.mobile) {
                    $log.info('window height is mobile sized AND now I am going to resize things');
                    resizeEverything();
                };
            } else if ($(window).width() > 768) {
                $log.info('window height is desktop sized');
                resizeEverything();
            };



        }
    }
});

directives.directive('pullDown', function() {
	return {
		restrict: 'AE',
		scope: {
			theContainer: '=?',
			theTrigger: '=?'
		},
		// transclude: true,
		//template: '<span ng-transclude></span>',
		controller: function($scope, $log) {
			var windowHeight = $(window).height();
			$scope.targetHeight = windowHeight / 6;
			$scope.container = document.getElementById($scope.theContainer);
			$scope.trigger = document.getElementById($scope.theTrigger);
			$scope.hammertime = new Hammer($scope.trigger);
			$scope.dragCount = 0;
			$scope.breakpoint = $scope.targetHeight / 2;

			$scope.slidedown_height = 0;
			$scope.slideup_height = $scope.targetHeight;
			$scope.anim = null;
			$scope.draggedDown = false;

			$scope.originY = 0;

			$scope.opened = false;

			$scope.setHeight = function(height) {
				if(Modernizr.csstransforms3d) {
	                this.container.style.transform = 'translate3d(0,'+height+'px,0) ';
	                this.container.style.oTransform = 'translate3d(0,'+height+'px,0)';
	                this.container.style.msTransform = 'translate3d(0,'+height+'px,0)';
	                this.container.style.mozTransform = 'translate3d(0,'+height+'px,0)';
	                this.container.style.webkitTransform = 'translate3d(0,'+height+'px,0) scale3d(1,1,1)';
	            }
	            else if(Modernizr.csstransforms) {
	                this.container.style.transform = 'translate(0,'+height+'px) ';
	                this.container.style.oTransform = 'translate(0,'+height+'px)';
	                this.container.style.msTransform = 'translate(0,'+height+'px)';
	                this.container.style.mozTransform = 'translate(0,'+height+'px)';
	                this.container.style.webkitTransform = 'translate(0,'+height+'px)';
	            }
	            else {
	                this.container.style.top = height+"px";
	            }
			};

			$scope.updateHeight = function() {
				//$log.info('updating height');
	            $scope.setHeight($scope.slidedown_height);

	            $scope.anim = requestAnimationFrame(function() {
	                $scope.updateHeight();
	                
	            });
			};

			$scope.hide = function() {
				$scope.slidedown_height = 0;
	            $scope.setHeight(0);
	            cancelAnimationFrame($scope.anim);
	            $scope.anim = null;
	            $scope.draggedDown = false;
	            $scope.draggedUp = false;
			}

			$scope.reset = function() {
				cancelAnimationFrame($scope.anim);
	            $scope.anim = null;
	            $scope.draggedDown = false;
	            $scope.draggedUp = false;
	            //$scope.slidedown_height = 0;
	            setTimeout(function(){
	            	$scope.container.className = '';
	            }, 500)	
	            
			}

			$scope.renderHammer = function(ev) {
				switch(ev.type) {

		    			case "release":
		    				$log.info('case release!');	

			    			   	if($scope.draggedDown) {
			                     	// cancel animation
			                    	cancelAnimationFrame($scope.anim);

			                    	// over the breakpoint, trigger the callback
			                    	if(ev.gesture.deltaY >= $scope.breakpoint) {
			                    		$scope.container.className = 'animating';
			                        	$scope.setHeight($scope.targetHeight);
			                        	$scope.opened = true;
			                        	$scope.reset();
			                        	$scope.originY = $scope.targetHeight;
			                        	// get ready for your attack run
				                        $scope.slidedown_height = $scope.targetHeight;
			                      //   	if ($scope.slidedown_height > $scope.targetHeight) {
					                    // 	$scope.slidedown_height = $scope.targetHeight;
					                    // 	$scope.originY = $scope.targetHeight;
					                    // }
			                    	}  else {

				                        $scope.container.className = 'animating';
				                        $scope.originY = 0;
				                        $scope.opened = false;
				                        $scope.setHeight(0);
				                        $scope.reset();
				                        // get ready for your attack run
				                        $scope.slidedown_height = 0;		
				                    }
			                    	
		                    	}
		                    	if($scope.draggedUp) {
		                    		cancelAnimationFrame($scope.anim);

			                    	// over the breakpoint, trigger the callback
			                    	if(ev.gesture.deltaY <= $scope.breakpoint) {
			                    		$scope.container.className = 'animating';
			                        	$scope.setHeight(0);
			                        	$scope.opened = false;
			                        	$scope.reset();
			                        	// get ready for your attack run
				                        $scope.slidedown_height = 0;	
			                        	//$scope.slidedown_height = 0;
			                        	$scope.originY = 0;
			                      //   	if ($scope.slidedown_height > 500) {
					                    // 	$scope.slidedown_height = 500;
					                    // 	$scope.originY = $scope.slidedown_height;
					                    // }
			                    	} else {

				                        $scope.container.className = 'animating';
				                        $scope.originY = $scope.targetHeight;
				                        $scope.opened = true;
				                        $scope.setHeight($scope.targetHeight);
				                        $scope.reset();	
				                        // get ready for your attack run
				                        $scope.slidedown_height = $scope.targetHeight;		
				                    }
			                    	
			                    	
			                    }


		                    break; 
		    			case "dragdown":
		    				if ($scope.opened) {
		    					ev.gesture.preventDefault();
		    					return;
		    				};

		    				$log.info('case dragdown!');
		    				$log.info('deltay', ev.gesture.deltaY);
		                    $scope.draggedDown = true;

		                    // no requestAnimationFrame instance is running, start one
		                    if(!$scope.anim) {
		                        $scope.updateHeight();
		                    }

		                    // stop browser scrolling
		                    ev.gesture.preventDefault();

		                    // update slidedown height
		                    // it will be updated when requestAnimationFrame is called
		                    // if ($scope.slidedown_height ) {
		                    // 	$scope.slidedown_height = $scope.slideup_height + ev.gesture.deltaY;	
		                    // } else {
	                   		$scope.slidedown_height = ev.gesture.deltaY + $scope.originY;
		                    // }
		                    
		                    $log.info($scope.slidedown_height);
		                    break;

		                case "dragup":

		                	if (!$scope.opened) {
		                		ev.gesture.preventDefault();
		    					return;
		    				};
		    				$log.info('case dragup!');
		    				$log.info('deltay', ev.gesture.deltaY );
		    				
		                    $scope.draggedUp = true;

		                    // no requestAnimationFrame instance is running, start one
		                    if(!$scope.anim) {
		                        $scope.updateHeight();
		                    }

		                    // stop browser scrolling
		                    ev.gesture.preventDefault();

		                    // update slidedown height
		                    // it will be updated when requestAnimationFrame is called

		                    $scope.slidedown_height = ( $scope.slideup_height + (ev.gesture.deltaY));
		                    $log.info($scope.slidedown_height);
		                    break;
		    		}
			}
			$scope.hammertime.on("dragdown dragup release", function(ev) {
				$scope.renderHammer(ev);		    				    		
		    });
		}
	}
});