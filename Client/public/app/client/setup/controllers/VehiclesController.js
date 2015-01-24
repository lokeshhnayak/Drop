define([
	'client/setup/module',   // Angular Module for WebArtists VTSS app.
	'common/utils/supplant', // Supplant
	'common/utils/Utils',    // Utils Library
	'common/utils/Notifications', // Notifications
	'lodash'                 // Lodash Library
],
function(module, supplant) {

	'use strict';

	module.registerController('VehiclesController', [
		'$scope',
		'$state',
		'$timeout',
		'_',
		'Logger',
		'Notifications',
		'VehiclesService',
		'ModalService',
		'ClientModalService',
		'TableDefaults',
		function ($scope, $state, $timeout, _, Logger, Notifications, VehiclesService, ModalService, ClientModalService, TableDefaults) {
			var logger = Logger.getInstance('VehiclesController');
			logger.info("In VehiclesController");

			/*Scope Variables*/

			$scope.vehicles = {
				dtOptions: TableDefaults.getVehiclesTableDefaults()
			};

			$scope.selectables = {
				vehiclesList: []
			};

			$scope.onVehiclesSelectionChanged = function (selection) {
				$scope.selectables.vehiclesList = selection;
				$timeout(function() {
					$scope.$apply();
				}, 0);
			};

			$scope.deleteSelectedVehicles = function(){


			};

			$scope.getVehicles = function(){
				VehiclesService.getVehicles()
					.then(function(vehicles) {
					$scope.vehicles.data = vehicles;
				});
			};			
			
			$scope.addVehicle = function(row){
				var modalOptions = {
					closeButtonText: "Cancel",
					closeButtonIcon: "fa-ban",
					actionButtonText: "Create",
					actionButtonCss: "btn-success",
					actionButtonIcon: "fa-check",
					headerText: "Add Vehicle",
					formIcon: "fa-plus",
					vehicle: {}
				};
				ClientModalService.saveVehicle({}, modalOptions)
					.then(function (vehicle) {						
						VehiclesService.createVehicle(vehicle)
							.then(function(updatedClient) {
								$scope.vehicles.data = updatedClient.vehicles;						
								Notifications.success({
									title: "Success",
									content: supplant("Vehicle - {0} added successfully", [vehicle.registrationNumber])
								});
							});
					});
			};

			$scope.editVehicle = function (vehicle) {
				var modalOptions = {
					closeButtonText: "Cancel",
					closeButtonIcon: "fa-ban",
					actionButtonText: "Update",
					actionButtonCss: "btn-success",
					actionButtonIcon: "fa-edit",
					headerText: "Edit Vehicle",
					formIcon: "fa-edit",
					vehicle: VehiclesService.copyVehicle(vehicle)
				};

				ClientModalService.saveVehicle({}, modalOptions)
					.then(function (editedVehicle) {
						var index = $scope.vehicles.data.map(function(d) {return d.id;}).indexOf(editedVehicle.id);
						$scope.vehicles.data[index]= editedVehicle;
						VehiclesService.updateVehicle(editedVehicle)
							.then(function(updatedVehicle) {
								Notifications.success({
								title: "Success",
								content: supplant("Vehicle - {0} updated successfully", [vehicle.registrationNumber])
								});
							});
					});
			};

			$scope.deleteVehicle = function (vehicle) {
				var modalOptions = {
					closeButtonText: "Cancel",
					closeButtonIcon: "fa-ban",
					actionButtonText: "Delete Vehicle",
					actionButtonCss: "btn-danger",
					actionButtonIcon: "fa-remove",
					headerText: supplant("Delete Vehicle - {0}", [vehicle.registrationNumber]),
					bodyText: "Are you sure you want to delete this vehicle " + vehicle.registrationNumber +" ?",
					formIcon: "fa-remove"
				};

				ModalService.showModal({}, modalOptions)
					.then(function (result) {
						VehiclesService.deleteVehicle(vehicle)
							.then(function(deletedVehicle) {
								var index = $scope.vehicles.data.map(function (d) { return d.id; }).indexOf(vehicle.id);
								var deletedVehicle = $scope.vehicles.data.splice(index, 1);
								Notifications.success({
									title: "Success",
									content: supplant("Vehicle - {0} deleted successfully", [vehicle.registrationNumber])
								});
							});
					});
			};

			$scope.getVehicles();
		}
	]);
});