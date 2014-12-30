define([
	'common/module',
	'common/services/FullscreenService'
], function (module) {

	"use strict";

	module.registerDirective('waFullscreen', [
		'$timeout',
		'FullscreenService',
		function($timeout, FullscreenService){

			var linker = function($scope, $element, $attrs) {
				  // Watch for changes on scope if model is provided
				if ($attrs.waFullscreen) {
					$scope.$watch($attrs.fullscreen, function(value) {
						var isEnabled = FullscreenService.isEnabled();
						if (value && !isEnabled) {
							FullscreenService.enable($element[0]);
							$element.addClass('isInFullScreen');
						} else if (!value && isEnabled) {
							FullscreenService.cancel();
							$element.removeClass('isInFullScreen');
						}
					});

					// Listen on the `WAFullscreen.change`
					// the event will fire when anything changes the fullscreen mode
					var removeFullscreenHandler = FullscreenService.$on('WAFullscreen.change', function(evt, isFullscreenEnabled){
						if(!isFullscreenEnabled){
							$scope.$evalAsync(function(){
								$scope.$eval($attrs.waFullscreen + '= false');
								$element.removeClass('isInFullScreen');
							});
						}
					});

					$scope.$on('$destroy', function() {
						removeFullscreenHandler();
					});

				} else {
					if ($attrs.onlyWatchedProperty !== undefined) {
						return;
					}

					$element.on('click', function (ev) {
						FullscreenService.enable(  $element[0] );
					});
				}
			}

			return {
				link: linker
			};
		}
	]);
});
