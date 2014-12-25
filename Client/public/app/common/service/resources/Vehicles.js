define([
	'common/module',         // Angular Module for WebArtists VTSS app.
	'common/utils/supplant', // Supplant
	'common/utils/Utils',    // Utils Library
	'lodash',                // Lodash Library
	'restangular'            // Restangular Library
],
function(module, supplant) {

	'use strict';

	module.registerService('Vehicles', [
		'_',
		'Logger',
		'Restangular',
		'APIs',
		function (_, Logger, Restangular, APIs) {
			var logger = Logger.getInstance('Vehicles');
			logger.info("In Vehicles Resource");

			var Vehicles = Restangular.all(APIs.VEHICLES);

			var getVehicles = function() {
				return Vehicles.getList()
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