define([
	'layout/module'
], function (module) {

	'use strict';

	module.registerController('LayoutController', [
		'$scope',
		'$state',
		'User',
		'Logger',
		function ($scope, $state, User, Logger) {

			var logger = Logger.getInstance("LayoutController");
			logger.info("In LayoutController");

			$scope.isStateActive = function(stateName) {
				return $state.is(stateName);
			};

			/*$scope.isSubStateActive = function(stateName) {
				return 
			};*/

			User.initialized.then(function(){
				$scope.user = User;
				logger.info($scope.user);
			});
		}
	]);
});
