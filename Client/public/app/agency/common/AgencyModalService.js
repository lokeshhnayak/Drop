define([
	'agency/module',         // Angular Module for WebArtists VTSS app.
	'common/utils/supplant', // Supplant
	'common/utils/Utils',    // Utils Library
	'lodash',                // Lodash Library
	'angular-bootstrap'      // Angular Bootstrap
],
function(module, supplant) {

	'use strict';

	module.registerService('AgencyModalService', [
		'$modal',
		'_',
		'Logger',
		function ($modal, _, Logger) {
			var logger = Logger.getInstance('AgencyModalService');
			logger.info("In AgencyModalService");

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

			var saveUser = function(customModalDefaults, customModalOptions) {
				//Create temp objects to work with since we're in a singleton service
				var tempModalDefaults = {};
				var tempModalOptions = {};

				//Map angular-ui modal custom defaults to modal defaults defined in service
				angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

				//Map modal.html $scope custom properties to defaults defined in service
				angular.extend(tempModalOptions, modalOptions, customModalOptions);

				tempModalDefaults.templateUrl = 'app/agency/account/views/modals/modal-user.tpl.html';
				if (!tempModalDefaults.controller) {
					tempModalDefaults.controller = function ($scope, $modalInstance, $filter) {
						$scope.modalOptions = tempModalOptions;
						$scope.user = $scope.modalOptions.user;

						$scope.modalOptions.ok = function (result) {
							$modalInstance.close($scope.user);
						};
						$scope.modalOptions.close = function (result) {
							$modalInstance.dismiss('cancel');
						};
					}
				}
				return $modal.open(tempModalDefaults).result;
			};

			return {
                saveUser : saveUser
			};
		}
	]);
});