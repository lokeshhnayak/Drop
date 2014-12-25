define([
	'client/setup/module',   // Angular Module for WebArtists VTSS app.
	'common/utils/supplant', // Supplant
	'common/utils/Utils',    // Utils Library
	'lodash'                 // Lodash Library
],
function(module, supplant) {

	'use strict';

	module.registerController('VehiclesController', [
		'$scope',
		'$state',
		'$timeout',
		'_',
		'Logger',
		'TableDefaults',
		'vehicles',
		function ($scope, $state, $timeout, _, Logger, TableDefaults, vehicles) {
			var logger = Logger.getInstance('VehiclesController');
			logger.info("In VehiclesController");

			$scope.vehicles = {
				dtOptions: TableDefaults.getVehiclesTableDefaults(),
				data: vehicles
			};
			logger.warn(vehicles);
		}
	]);
});