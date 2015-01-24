// APIs
define([
	// Module
	'common/module'
], function(module) {

	'use strict';

	module.registerService('APIs', [
		function() {
			var APIs = {
				CLIENT: 'client',
				VEHICLE: 'vehicle',
				AGENCY: 'agency',
				HOLIDAY: 'holiday',
				DEVICE: 'device',
				PASSENGER: 'passenger',
				USER: 'user',
				HOST: 'host',
				ROUTE: 'route',
				DEVICE_SOFTWARE: 'devicesoftware'
			};

			return APIs;
		}
	]);
});