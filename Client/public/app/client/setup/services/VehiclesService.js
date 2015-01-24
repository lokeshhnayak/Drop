define([
	'client/setup/module',                             // Angular Module for WebArtists VTSS app.
	'common/utils/supplant',                           // Supplant
	'common/utils/Utils',                              // Utils Library
	'lodash',                                          // Lodash Library
	'client/common/resources/ClientRestangularFactory' // ClientRestangularFactory Resource
],
function(module, supplant) {

	'use strict';

	module.registerService('VehiclesService', [
		'$q',
		'_',
		'Logger',
		'ClientRestangularFactory',
		'TableDefaults',
		function ($q, _, Logger, ClientRestangularFactory, TableDefaults) {
			var logger = Logger.getInstance('VehiclesService');
			logger.info("In VehiclesService");

			var API_NAME = "vehicles";
			var Vehicles = ClientRestangularFactory.getService(API_NAME);

			var getVehicles = function () {
				return Vehicles.getList();
			};

			var createVehicle = function (vehicle) {
				return Vehicles.post(vehicle)
					.then(function(updatedClient) {
						return ClientRestangularFactory.restangularizeCollection(updatedClient.vehicles, API_NAME);
					});
			};

			var updateVehicle = function (vehicle) {
				return vehicle.save();
			};

			var deleteVehicle = function (vehicle) {
				return vehicle.remove();
			};

			var copyVehicle = function(vehicle){
				return ClientRestangularFactory.copy(vehicle);
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