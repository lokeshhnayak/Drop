define([
	'client/monitor/module', // Angular Module for WebArtists VTSS app.
	'common/utils/supplant', // Supplant
	'common/utils/Utils',    // Utils Library
	'lodash'                 // Lodash Library
],
function(module, supplant) {

	'use strict';

	module.registerController('MonitorController', [
		'$scope',
		'$state',
		'_',
		'Logger',
		function ($scope, $state, _, Logger) {
			var logger = Logger.getInstance('MonitorController');
			logger.info("In MonitorController");

			
		}
	]);
});