define([
	'client/setup/module',   // Angular Module for WebArtists VTSS app.
	'common/utils/supplant', // Supplant
	'common/utils/Utils',    // Utils Library
	'lodash'                 // Lodash Library
], 
function(module, supplant) {

	'use strict';

	module.registerController('PassengersController', [
		'$scope',
		'$state',
		'$timeout',
		'_',
		'Logger',
		'PassengersService',
		'TableDefaults',
		function ($scope, $state, $timeout, _, Logger, PassengersService, TableDefaults){
			var logger = Logger.getInstance('PassengersController');
			logger.info("In PassengersController");

			$scope.passengers = {
				dtOptions: TableDefaults.getPassengersTableDefaults()
			};

			PassengersService.getPassengers()
				.then(function(passengers){
					$scope.passengers.data = passengers;
			});

			$scope.addPassengers = function () {
				$state.go('app.client.setup.passengers.new');
			};

			$scope.editPassenger = function (row) {
				logger.warn(row);
			};

			$scope.deletePassenger = function (row) {
				logger.warn(row);
			};
		}

		]);

});