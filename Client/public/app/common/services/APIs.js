// APIs
define([
	// Module
	'common/module'
], function(module) {

	'use strict';

	module.registerService('APIs', [
		function() {
			var APIs = {
				// Client
				// 
				// Host
				// 
				// Passenger
				PASSENGER_SETUP: "api/passenger/setup.json",
				//VEHICLES: "api/client/vehicles.json"
				VEHICLES: "vehicle"
			};

			return APIs;
		}
	]);
});