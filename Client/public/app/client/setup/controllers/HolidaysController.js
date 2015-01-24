define([
	'client/setup/module',   // Angular Module for WebArtists VTSS app.
	'common/utils/supplant', // Supplant
	'common/utils/Utils',    // Utils Library
	'common/utils/Notifications', // Notifications
	'lodash'               // Lodash Library
],
function(module, supplant) {

	'use strict';

	module.registerController('HolidaysController', [
		'$scope',
		'$state',
		'$timeout',
		'_',
		'Logger',
		'Notifications',
		'HolidaysService',
		'ModalService',
		'ClientModalService',
		'TableDefaults',
		function ($scope, $state, $timeout, _, Logger, Notifications, HolidaysService, ModalService, ClientModalService, TableDefaults) {
			var logger = Logger.getInstance('HolidaysController');
			logger.info("In HolidaysController");

			/*
			Scope Variables
			 */
			$scope.holidays = {
				dtOptions: TableDefaults.getHolidaysTableDefaults()
			};

			$scope.selectables = {
				holidaysList : []
			};

			$scope.onHolidaysSelectionChanged = function (selection) {
				$scope.selectables.holidaysList = selection;
				$timeout(function() {
					$scope.$apply();
				}, 0);
			};

			$scope.getHolidays = function () {
				HolidaysService.getHolidays()
					.then(function(holidays) {
						$scope.holidays.data = holidays;
					});
			};

			$scope.addHoliday = function () {
				var modalOptions = {
					closeButtonText: "Cancel",
					closeButtonIcon: "fa-ban",
					actionButtonText: "OK",
					actionButtonCss: "btn-success",
					actionButtonIcon: "fa-check",
					headerText: "Add Holiday",
					formIcon: "fa-plus",
					holiday: {}
				};

				ClientModalService.saveHoliday({}, modalOptions)
					.then(function (holiday) {
						HolidaysService.createHoliday(holiday)
							.then(function(updatedHoliday) {
								Notifications.success({
									title: "Success",
									content: supplant("Holiday - {0} added successfully", [holiday.name])
								});
							});
					});
			};

			$scope.editHoliday = function (holiday) {
				var modalOptions = {
					closeButtonText: "Cancel",
					closeButtonIcon: "fa-ban",
					actionButtonText: "OK",
					actionButtonCss: "btn-success",
					actionButtonIcon: "fa-check",
					headerText: "Edit Holiday",
					formIcon: "fa-edit",
					holiday: HolidaysService.copyHoliday(holiday)
				};

				ClientModalService.saveHoliday({}, modalOptions)
					.then(function (editedHoliday) {
						var index = $scope.holidays.data.map(function (d) { return d.id; }).indexOf(editedHoliday.id);
						$scope.holidays.data[index] = editedHoliday;
						HolidaysService.updateHoliday(editedHoliday)
							.then(function(updatedHoliday) {
								Notifications.success({
									title: "Success",
									content: supplant("Holiday - {0} updated successfully", [holiday.name])
								});
							});
					});
			};

			$scope.deleteHoliday = function (holiday) {
				var modalOptions = {
					closeButtonText: "Cancel",
					closeButtonIcon: "fa-ban",
					actionButtonText: "Delete Holiday",
					actionButtonCss: "btn-danger",
					actionButtonIcon: "fa-remove",
					headerText: supplant("Delete Holiday - {0}", [holiday.name]),
					bodyText: "Are you sure you want to delete this holiday?",
					formIcon: "fa-remove"
				};

				ModalService.showModal({}, modalOptions)
					.then(function (result) {
						HolidaysService.deleteHoliday(holiday)
							.then(function(deletedHoliday) {
								var index = $scope.holidays.data.map(function (d) { return d.id; }).indexOf(holiday.id);
								var deletedHoliday = $scope.holidays.data.splice(index, 1);
								Notifications.success({
									title: "Success",
									content: supplant("Holiday - {0} deleted successfully", [holiday.name])
								});
							});
					});
			};

			$scope.getHolidays();
		}
	]);
});