define([
	'common/module'
], function (module) {

	'use strict';

	module.registerDirective('waPageTitle', [
		'$rootScope',
		'$timeout',
		function ($rootScope, $timeout) {
			return {
				restrict: 'A',
				compile: function (element, attributes) {
					element.removeAttr('wa-page-title data-wa-page-title');

					var defaultTitle = attributes.waPageTitle;
					var listener = function(event, toState, toParams, fromState, fromParams) {
						var title = defaultTitle;
						if (toState.data && toState.data.title) title = toState.data.title + ' | ' + title;
						// Set asynchronously so page changes before title does
						$timeout(function() {
							$('html head title').text(title);
						});
					};

					$rootScope.$on('$stateChangeStart', listener);

				}
			};
		}
	]);
});
