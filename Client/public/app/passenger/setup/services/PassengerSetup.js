define([
	'passenger/setup/module',
	'restangular'
], function (module) {

	'use strict';

	module.registerService('PassengerSetup', [
		'Logger',
		'Restangular',
		'APIs',
		function (Logger, Restangular, APIs) {

			var logger = Logger.getInstance("PassengerSetup");
			logger.info("In PassengerSetup");

			var PassengerSetup = Restangular.all(APIs.PASSENGER_SETUP);

			var getPassengerSetup = function(passengerId) {
				return Restangular.one(APIs.PASSENGER_SETUP).get()
					.then(function(passengerSetupDetails) {
						return passengerSetupDetails;
					});
			};

			return {
				getPassengerSetup : getPassengerSetup
			};
		}
	]);
});
