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
		'$q',
		'_',
		'Logger',
		'AuthService',
		'ClientService',
		'AgencyService',
		'LookupService',
		function ($scope, $q, _, Logger, AuthService, ClientService, AgencyService, LookupService) {
			var logger = Logger.getInstance('HomeController');
			logger.info("In HomeController");

			$scope.entity = AuthService.currentUser().client;

			$q.all([
				ClientService.getClient($scope.entity.id),
				AgencyService.getAgency($scope.entity.agency)
			])
			.then($q.spread(function(client, agency) {
				$scope.client = client;
				$scope.agency = agency;
			}));
		}
	]);
});