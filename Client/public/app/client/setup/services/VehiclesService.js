define([
	'client/setup/module',                     // Angular Module for WebArtists VTSS app.
	'common/utils/supplant',                   // Supplant
	'common/utils/Utils',                      // Utils Library
	'lodash',                                  // Lodash Library
	'client/common/resources/ClientResources'  // ClientResources Resource
],
function(module, supplant) {

	'use strict';

	module.registerService('VehiclesService', [
		'$q',
		'_',
		'Logger',
		'ClientResources',
		'TableDefaults',
		function ($q, _, Logger, ClientResources, TableDefaults) {
			var logger = Logger.getInstance('VehiclesService');
			logger.info("In VehiclesService");

			var getVehicles = function () {
				return ClientResources.Vehicles.getList();
			};

			var createVehicle = function (vehicle) {
				return ClientResources.Vehicles.post(vehicle);
			};

			var updateVehicle = function (vehicle) {
				return vehicle.save();
			};

			var deleteVehicle = function (vehicle) {
				return vehicle.remove();
			};

			var copyVehicle = function(vehicle){
				return ClientResources.copy(vehicle);
			};

			return {
				getVehicles : getVehicles,
				createVehicle : createVehicle,
				updateVehicle : updateVehicle,
				deleteVehicle : deleteVehicle,
				copyVehicle : copyVehicle
			};
		}
	]);
});