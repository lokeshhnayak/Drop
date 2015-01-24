define([
	'client/module',         // Angular Module for WebArtists VTSS app.
	'common/utils/supplant', // Supplant
	'common/utils/Utils',    // Utils Library
	'lodash',                // Lodash Library
	'angular-bootstrap'      // Angular Bootstrap
],
function(module, supplant) {

	'use strict';

	module.registerService('ClientModalService', [
		'$modal',
		'_',
		'Logger',
		function ($modal, _, Logger) {
			var logger = Logger.getInstance('ClientModalService');
			logger.info("In ClientModalService");

			var modalDefaults = {
				backdrop: true,
				keyboard: true,
				modalFade: true,
				templateUrl: 'app/common/templates/modal.tpl.html'
			};

			var modalOptions = {
				closeButtonText: 'Cancel',
				closeButtonCss: 'btn-default',
				closeButtonIcon: 'fa-ban',
				actionButtonText: 'OK',
				actionButtonCss: 'btn-primary',
				actionButtonIcon: 'fa-check',
				headerText: 'Proceed?',
				bodyText: 'Perform this action?',
				showCloseButton: true,
				showActionButton: true
			};

			var saveHoliday = function (customModalDefaults, customModalOptions) {
				//Create temp objects to work with since we're in a singleton service
				var tempModalDefaults = {};
				var tempModalOptions = {};

				//Map angular-ui modal custom defaults to modal defaults defined in service
				angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

				//Map modal.html $scope custom properties to defaults defined in service
				angular.extend(tempModalOptions, modalOptions, customModalOptions);

				tempModalDefaults.templateUrl = 'app/client/setup/views/modals/modal-holiday.tpl.html';

				if (!tempModalDefaults.controller) {
					tempModalDefaults.controller = function ($scope, $modalInstance, $filter) {
						$scope.modalOptions = tempModalOptions;
						$scope.holiday = $scope.modalOptions.holiday;

						$scope.dateOptions = { showWeeks: false};

						$scope.modalOptions.ok = function (result) {
							$modalInstance.close($scope.holiday);
						};
						$scope.modalOptions.close = function (result) {
							$modalInstance.dismiss('cancel');
						};
					}
				}

				return $modal.open(tempModalDefaults).result;
			};

			var saveVehicle = function(customModalDefaults, customModalOptions) {
				//Create temp objects to work with since we're in a singleton service
				var tempModalDefaults = {};
				var tempModalOptions = {};

				//Map angular-ui modal custom defaults to modal defaults defined in service
				angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

				//Map modal.html $scope custom properties to defaults defined in service
				angular.extend(tempModalOptions, modalOptions, customModalOptions);

				tempModalDefaults.templateUrl = 'app/client/setup/views/modals/modal-vehicle.tpl.html';
				if (!tempModalDefaults.controller) {
					tempModalDefaults.controller = function ($scope, $modalInstance, $filter) {
						$scope.modalOptions = tempModalOptions;
						$scope.vehicle = $scope.modalOptions.vehicle;

						$scope.modalOptions.ok = function (result) {
							$modalInstance.close($scope.vehicle);
						};
						$scope.modalOptions.close = function (result) {
							$modalInstance.dismiss('cancel');
						};
					}
				}
				return $modal.open(tempModalDefaults).result;
			};

			return {
                saveHoliday : saveHoliday,
                saveVehicle : saveVehicle
			};
		}
	]);
});