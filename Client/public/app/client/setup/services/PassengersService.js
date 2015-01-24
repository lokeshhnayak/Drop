define([
	'client/setup/module',                 // Angular Module for WebArtists VTSS app.
	'common/utils/supplant',               // Supplant
	'common/utils/Utils',                  // Utils Library
	'lodash',                              // Lodash Library
	'common/services/resources/Passengers'    // Passengers Resource
],
function(module, supplant) {

	'use strict';

	module.registerService('PassengersService', [
		'$q',
		'_',
		'Logger',
		'Passengers',
		'TableDefaults',
		function ($q, _, Logger, Passengers, TableDefaults) {
			var logger = Logger.getInstance('PassengersService');
			logger.info("In PassengersService");

			var getPassengers = function () {
				return Passengers.getPassengers()
					.then(function(passengers) {
						return passengers;
						console.log(passengers);
					});
			};

			return {
				getPassengers : getPassengers
			};
		}
	]);
});