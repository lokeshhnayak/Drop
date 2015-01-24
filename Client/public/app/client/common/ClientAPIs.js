// APIs
define([
	// Module
	'client/common/module'
], function(module) {

	'use strict';

	module.registerService('ClientAPIs', [
		function() {
			var APIs = {
				VEHICLES: 'vehicles',
				AGENCY: 'agency',
				ROUTES: 'route',
				HOLIDAYS: 'holidays'
			};

			return APIs;
		}
	]);
});