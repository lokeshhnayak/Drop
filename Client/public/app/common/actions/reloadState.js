define([
	'common/module'
], function (module) {

	'use strict';

	module.registerDirective('reloadState', [
		'$rootScope',
		function ($rootScope) {
			return {
				restrict: 'A',
				compile: function (element, attrs) {
					element.removeAttr('reload-state data-reload-state');
					element.on('click', function (e) {
						$rootScope.$state.transitionTo($rootScope.$state.current, $rootScope.$stateParams, {
							reload: true,
							inherit: false,
							notify: true
						});
						e.preventDefault();
					})
				}
			};
		}
	]);
});
