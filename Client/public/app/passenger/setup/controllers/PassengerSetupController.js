define([
	'passenger/setup/module'
], function (module) {

	'use strict';

	module.registerController('PassengerSetupController', [
		'$scope',
		'$state',
		'Logger',
		'PassengerSetup',
		function ($scope, $state, Logger, PassengerSetup) {

			var logger = Logger.getInstance("PassengerSetupController");
			logger.info("In PassengerSetupController");

			PassengerSetup.getPassengerSetup(1)
				.then(function(passengerSetupDetails) {
					$scope.passengerSetup = passengerSetupDetails;
					logger.warn(passengerSetupDetails);
				});
		}
	]);
});
