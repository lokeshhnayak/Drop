define([
	'common/module',         // Angular Module for WebArtists VTSS app.
	'common/utils/supplant', // Supplant
	'common/utils/Utils',    // Utils Library
	'lodash',                // Lodash Library
	'angular-bootstrap'      // Angular Bootstrap
],
function(module, supplant) {

	'use strict';

	module.registerService('ModalService', [
		'$modal',
		'_',
		'Logger',
		function ($modal, _, Logger) {
			var logger = Logger.getInstance('ModalService');
			logger.info("In ModalService");

			var modalDefaults = {
				backdrop: true,
				keyboard: true,
				modalFade: true,
				templateUrl: 'app/common/templates/modal.tpl.html'
			};

			var modalOptions = {
				closeButtonText: 'Close',
				closeButtonCss: 'btn-default',
				actionButtonText: 'OK',
				actionButtonCss: 'btn-primary',
				headerText: 'Proceed?',
				bodyText: 'Perform this action?',
				showCloseButton: true,
				showActionButton: true
			};

			var showModal = function (customModalDefaults, customModalOptions) {
				if (!customModalDefaults) customModalDefaults = {};
				customModalDefaults.backdrop = 'static';
				return this.show(customModalDefaults, customModalOptions);
			};

			var show = function (customModalDefaults, customModalOptions) {
				//Create temp objects to work with since we're in a singleton service
				var tempModalDefaults = {};
				var tempModalOptions = {};

				//Map angular-ui modal custom defaults to modal defaults defined in service
				angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

				//Map modal.html $scope custom properties to defaults defined in service
				angular.extend(tempModalOptions, modalOptions, customModalOptions);

				if (!tempModalDefaults.controller) {
					tempModalDefaults.controller = function ($scope, $modalInstance, $filter) {
						$scope.modalOptions = tempModalOptions;
						$scope.modalOptions.ok = function (result) {
							$modalInstance.close(result);
						};
						$scope.modalOptions.close = function (result) {
							$modalInstance.dismiss('cancel');
						};
					}
				}

				return $modal.open(tempModalDefaults).result;
			};

			return {
                show      : show,
                showModal : showModal
			};
		}
	]);
});