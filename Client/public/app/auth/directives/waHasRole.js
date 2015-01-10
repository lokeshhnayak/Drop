define([
	'auth/module',
	'auth/login/AuthService'
], function (module) {

	'use strict';

	module.registerDirective('waHasRole', [
		'AUTH_EVENTS',
		'USER_ROLES',
		'AuthService',
		function (AUTH_EVENTS, USER_ROLES, AuthService) {
			var linker = function(scope, element, attrs) {
				if(!attrs.waHasRole) {
					throw "waHasRole should define roles";
				}
				var roles = scope.$eval(attrs.waHasRole);
				
				function toggleVisibilityBasedOnRole() {
					AuthService.isAuthorized(roles) ? element.show() : element.hide();
				}

				toggleVisibilityBasedOnRole();

				scope.$on(AUTH_EVENTS.loginSuccess, toggleVisibilityBasedOnRole);
			};
			return {
				restrict: 'A',
				link: linker
			};
		}
	]);
});
