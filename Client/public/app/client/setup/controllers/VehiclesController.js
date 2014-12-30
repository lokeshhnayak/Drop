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
		'VehiclesService',
		'TableDefaults',
		function ($scope, $state, $timeout, _, Logger, VehiclesService, TableDefaults) {
			var logger = Logger.getInstance('VehiclesController');
			logger.info("In VehiclesController");

			$scope.vehicles = {
				dtOptions: TableDefaults.getVehiclesTableDefaults()
			};

			VehiclesService.getVehicles()
				.then(function(vehicles) {
					$scope.vehicles.data = vehicles;
				});

			$scope.editVehicle = function (row) {
				logger.warn(row);
			};

			$scope.deleteVehicle = function (row) {
				logger.info(row);
			}
		}
	]);
});