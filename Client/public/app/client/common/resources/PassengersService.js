define([
	'client/common/module',                            // Angular Module for WebArtists VTSS app.
	'common/utils/supplant',                           // Supplant
	'common/utils/Utils',                              // Utils Library
	'lodash',                                          // Lodash Library
	'client/common/resources/ClientRestangularFactory' // Passengers Resource
],
function(module, supplant) {

	'use strict';

	module.registerService('PassengersService', [
		'$q',
		'_',
		'Logger',
		'ClientRestangularFactory',
		'TableDefaults',
		function ($q, _, Logger, ClientRestangularFactory, TableDefaults) {
			var logger = Logger.getInstance('PassengersService');
			logger.info("In PassengersService");

			var API_NAME = "passengers";
			var Passengers = ClientRestangularFactory.getService(API_NAME);

			var getPassengers = function () {
				return Passengers.getList();
			};

			return {
				getPassengers : getPassengers
			};
		}
	]);
});