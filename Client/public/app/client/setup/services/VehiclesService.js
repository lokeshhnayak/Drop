define([
	'client/setup/module',                 // Angular Module for WebArtists VTSS app.
	'common/utils/supplant',               // Supplant
	'common/utils/Utils',                  // Utils Library
	'lodash',                              // Lodash Library
	'common/service/resources/Vehicles'    // Vehicles Resource
],
function(module, supplant) {

	'use strict';

	module.registerService('VehiclesService', [
		'$q',
		'_',
		'Logger',
		'Vehicles',
		'TableDefaults',
		function ($q, _, Logger, Vehicles, TableDefaults) {
			var logger = Logger.getInstance('VehiclesService');
			logger.info("In VehiclesService");

			var getVehicles = function () {
				return Vehicles.getVehicles()
					.then(function(vehicles) {
						return vehicles;
					});
			};

			return {
				getVehicles : getVehicles
			};
		}
	]);
});