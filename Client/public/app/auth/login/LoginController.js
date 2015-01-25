define([
	'auth/module',
	'lodash',
	'common/utils/Notifications'
], function (module) {

	"use strict";

	module.registerController('LoginController', [
		'$scope',
		'$state',
		'Logger',
		'Notifications',
		'User',
		'AuthService',
		function ($scope, $state, Logger, Notifications, User, AuthService) {
			$scope.user = {};
			var logger = Logger.getInstance("LoginController");

			$scope.login = function(user) {
				AuthService.login(user)
					.then(function(response) {
						Notifications.success({
							title: "Logged In",
							content: "Welcome, " + response.user.firstName
						});
						$state.go(response.redirectState);
					});
			};
		}
	]);
});
