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
				return ClientResources.Vehicles.getList()
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