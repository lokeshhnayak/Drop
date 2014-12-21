define([
	'common/module', 
	'lodash'
], function (module, _) {

	'use strict';

	module.registerDirective('waRouterAnimationWrap', [
		'$rootScope',
		'$timeout',
		function ($rootScope,$timeout) {
			return {
				restrict: 'A',
				compile: function (element, attrs) {
					element.removeAttr('wa-router-animation-wrap data-wa-router-animation-wrap wrap-for data-wrap-for');
					element.addClass('router-animation-container');

					$('<div class="router-animation-loader"><i class="fa fa-gear fa-4x fa-spin"></i></div>').appendTo(element);

					var animateElementSelector = attrs.wrapFor;
					var viewsToMatch = attrs.waRouterAnimationWrap.split(/\s/);

					var needRunContentViewAnimEnd = false;
					function contentViewAnimStart() {
						needRunContentViewAnimEnd = true;
						element.css({
							height: element.height() + 'px',
							overflow: 'hidden'
						}).addClass('active');

						$(animateElementSelector).addClass('animated faster fadeOutDown');
					}

					function contentViewAnimEnd() {
						if(needRunContentViewAnimEnd){
							element.css({
								height: 'auto',
								overflow: 'visible'
							}).removeClass('active');

							$(animateElementSelector).addClass('animated faster fadeInUp');

							needRunContentViewAnimEnd = false;

							$timeout(function(){
								$(animateElementSelector).removeClass('animated');
							},10);
						}
					}


					var destroyForStart = $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
						var isAnimRequired = _.any(viewsToMatch, function(view){
						   return _.has(toState.views, view) || _.has(fromState.views, view);
						});
						if(isAnimRequired){
							contentViewAnimStart()
						}
					});

					var destroyForEnd = $rootScope.$on('$viewContentLoaded', function (event) {
						contentViewAnimEnd();
					});

					element.on('$destroy', function(){
						destroyForStart();
						destroyForEnd();
					});
				}
			};
		}
	]);
});
