define([
	'client/home/module',    // Angular Module for WebArtists VTSS app.
	'common/utils/supplant', // Supplant
	'common/utils/Utils',    // Utils Library
	'moment',                // Moment Library for date manipulation
	'lodash'                 // Lodash Library
],
function(module, supplant) {

	'use strict';

	module.registerController('HomeController', [
		'$scope',
		'$state',
		'_',
		'Logger',
		'AuthService',
		function ($scope, $state, _, Logger, AuthService) {
			var logger = Logger.getInstance('HomeController');
			logger.info("In HomeController");

			$scope.vtssUser = AuthService.currentUser();
			$scope.curDate = moment(new Date()).format("ll");
			$scope.getEntityName = function() {
				return ($scope.vtssUser.entity) ? $scope.vtssUser.entity.name : '';
			};
		}
	]);
});