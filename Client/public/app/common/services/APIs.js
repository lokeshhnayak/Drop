// APIs
define([
	// Module
	'common/module'
], function(module) {

	'use strict';

	module.registerService('APIs', [
		function() {
			var APIs = {
				// Root
				//
				// Host
				//
				// Agency
				AGENCY_CLIENTS: "clients",
				// Client
				CLIENT_VEHICLES: "vehicles",
				// Passenger
				PASSENGER_SETUP: "api/passenger/setup.json"
				//VEHICLES: "api/client/vehicles.json"
			};

			return APIs;
		}
	]);
});