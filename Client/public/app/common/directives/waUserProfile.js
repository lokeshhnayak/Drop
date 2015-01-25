define([
	'common/module',
	'moment',
	'lodash'
], function (module, _) {

	'use strict';

	module.registerDirective('waUserProfile', [
		'AuthService',
		function (AuthService) {

			var linker = function(scope, element, attrs) {
				scope.vtssUser = AuthService.currentUser();
				scope.curDate = moment(new Date()).format("ll");
				scope.getEntityName = function() {
					return (scope.vtssUser.entity) ? scope.vtssUser.entity.name : '';
				};
			};

			return {
				restrict: 'AE',
				replace: true,
				templateUrl: 'app/common/directives/templates/waUserProfile.tpl.html',
				link: linker
			};
		}
	]);
});
