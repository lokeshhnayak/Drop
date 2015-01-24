define([
	'common/module',
	'lodash'
], function (module, _) {

	'use strict';

	module.registerDirective('waLoadingSpinner', function () {
		var linker = function(scope, element, attrs) {
			// Not required. The template will take care of showing/hiding the spinner.
		}

		return {
			restrict: 'A',
			replace: true,
			transclude: true,
			scope: {
				loading: '=waLoadingSpinner'
			},
			templateUrl: 'app/common/directives/templates/waLoadingSpinner.tpl.html',
			link: linker
		};
	});
});
