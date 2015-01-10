define([
	'layout/module'
], function (module) {

	'use strict';

	module.registerController('LayoutController', [
		'$scope',
		'$state',
		'User',
		'Logger',
		'AuthService',
		function ($scope, $state, User, Logger, AuthService) {

			var logger = Logger.getInstance("LayoutController");
			logger.info("In LayoutController");

			$scope.isStateActive = function(stateName) {
				return $state.is(stateName);
			};

			/*$scope.isSubStateActive = function(stateName) {
				return 
			};*/

			$scope.$on("$waRoleChange", function(event, role) {
				if(!$scope.user) {
					User.initialized.then(function() {
						$scope.user = User;
						$scope.user.role = role.role;
						$scope.user.getShortcuts($scope.user.role);
						logger.info($scope.user);
					});
				} else {
					$scope.user.role = role.role;
					$scope.user.getShortcuts($scope.user.role);
				}
			});

			loadUser();

			function loadUser() {
				if(!$scope.user) {
					User.initialized.then(function() {
						$scope.user = User;
						logger.info($scope.user);
					});
				}
			}
		}
	]);
});
