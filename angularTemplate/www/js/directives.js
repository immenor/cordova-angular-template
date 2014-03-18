'use strict';

/* Directives */

var directives = angular.module('template.directives', []);

directives.directive('uiGesture', function() {
   console.log('I am in uigesture');
   return {
       restrict: 'EA',
       //transclude: true,
       scope: {
           theContainer: "=",
           theSlidebox: "=",
           styleBool: "=?"
       },
//       link: function($scope) {
//           console.log('inside link funciton');
//
//
//       },
       controller: function($scope, $log) {
           $scope.topBarToggle = $scope.topBarToggle;
//         setTimeout(function() {
           $scope.draggedDown = function() {
               $log.info('toggle is:', $scope.topBarToggle);
               $scope.topBarToggle = true;
//            $scope.topBarToggle = !$scope.topBarToggle;
               $log.info('toggle is:', $scope.topBarToggle);
           }

           $scope.closeUp = function() {
               $log.info('toggle is:', $scope.topBarToggle);
               $scope.topBarToggle = false;
//            $scope.topBarToggle = !$scope.topBarToggle;
               $log.info('toggle is:', $scope.topBarToggle);
           }

           console.log('inside controller');

           (function() {
               console.log('doing the weird thing');
               var lastTime = 0;
               var vendors = ['ms', 'moz', 'webkit', 'o'];
               for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
                   window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
                   window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
               }

               if (!window.requestAnimationFrame)
                   window.requestAnimationFrame = function(callback, element) {
                       var currTime = new Date().getTime();
                       var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                       var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                           timeToCall);
                       lastTime = currTime + timeToCall;
                       return id;
                   };

               if (!window.cancelAnimationFrame)
                   window.cancelAnimationFrame = function(id) {
                       clearTimeout(id);
                   };
           }());

           var uiGesture = (function() {
               console.log('in UI gesture object');
               function Main(container, slidebox, handler) {
                   console.log('in main obj');
                   var self = this;
                   this.breakpoint = 80;

                   this.container = container;
                   this.slidebox = slidebox;
                   this.handler = handler;

                   $log.info('container', this.container);
                   $log.info('slidebox', this.slidebox);

                   this._slidedown_height = 0;
                   this._anim = null;
                   this._dragged_down = false;

                   $log.info('before on event', this.container);
                   this.hammertime = Hammer(this.container)
                       .on("touch dragdown release", function(ev) {
                           $log.info('hammer time on', this.container);
                           console.log(this, ev);
                           self.handleHammer(ev);
                       });
               };

               Main.prototype.handleHammer = function(ev) {

                   switch(ev.type) {
                       // reset element on start
                       case 'touch':
                           this.hide();
                           break;

                       // on release we check how far we dragged
                       case 'release':

                           if(!this._dragged_down) {
                               return;
                           }

                           // cancel animation
                           cancelAnimationFrame(this._anim);

                           // over the breakpoint, trigger the callback
                           if(ev.gesture.deltaY >= 200) {
                               $log.info('Greater than 200');

                               this.setHeight(60);
                               $scope.draggedDown();
                               this.handler.call(this);
                               // this will call the handler!

//                               this.draggedDown();
                           }
                           // just hide it
                           else{
                               $log.info('less than 200');
                               //this.closeUp();
                               container_el.className = 'pullrefresh-slideup';
                               $log.info('adding classname', container_el.className);
                               this.hide();
                           }
                           break;

                       // when we dragdown
                       case 'dragdown':
                           // if we are not at the top move down
                           var scrollY = window.scrollY;
                           if(scrollY > 5) {
                               return;
                           }
                           else if(scrollY !== 0) {
                               window.scrollTo(0,0);
                           }

                           this._dragged_down = true;

                           // no requestAnimationFrame instance is running, start one
                           if(!$scope._anim) {
                               this.updateHeight();
                           }
                           // stop browser scrolling
                           ev.gesture.preventDefault();

                           // update slidedown height
                           // it will be updated when requestAnimationFrame is called
                           this._slidedown_height = ev.gesture.deltaY * 0.4;
                           break;
                   }
               };

               // Set Height with CSS Transform
               Main.prototype.setHeight = function(height) {
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

               // Update Height

               Main.prototype.hide = function() {
                   console.log('hiding');
                   container_el.className = '';
                   this._slidedown_height = 0;
                   this.setHeight(0);
                   cancelAnimationFrame(this._anim);
                   this._anim = null;
                   this._dragged_down = false;
               };

               Main.prototype.slideUp = function() {
                   console.log('sliding up');
                   var self = this;
                   cancelAnimationFrame(this._anim);

                   pullrefresh_el.className = 'slideup';
                   container_el.className = 'pullrefresh-slideup';

                   this.setHeight(0);

                   setTimeout(function() {
                       self.hide();
                   }, 500);
               };

               Main.prototype.updateHeight = function() {
                   var self = this;

                   this.setHeight(this._slidedown_height);

                   this._anim = requestAnimationFrame(function() {
                       self.updateHeight();
                   });
               };

               return Main;
           })();

           function getEl(id) {
               $log.info('getting element by id', id);
               return document.getElementById(id);
           }

           var container_el = getEl($scope.theContainer);
           var pullrefresh_el = getEl($scope.theSlidebox);


           $log.info('theContainerObj', container_el);
           var refresh = new uiGesture(container_el, pullrefresh_el);
           console.log('handler before');
           refresh.handler = function() {
               console.log('ima handle this gesture');
               // Do things
           }


//         }, 5000);

       }
   }
});
