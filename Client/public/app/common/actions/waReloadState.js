define([
	'common/module'
], function (module) {

	'use strict';

	module.registerDirective('waReloadState', [
		'$rootScope',
		function ($rootScope) {
			return {
				restrict: 'A',
				compile: function (element, attrs) {
					element.removeAttr('wa-reload-state data-wa-reload-state');
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
