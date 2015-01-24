define([
	'common/module',                            // Angular Module for WebArtists VTSS app.
	'common/services/APIs',                     // APIs Service
	'common/services/resources/BaseRestangular' // Base Restangular Library
],
function(module, supplant) {

	'use strict';

	module.registerService('Resources', [
		'BaseRestangular',
		'APIs',
		function (BaseRestangular, APIs) {
			return {
				Host: BaseRestangular.service(APIs.HOST),
				Agency: BaseRestangular.service(APIs.AGENCY),
				Client: BaseRestangular.service(APIs.CLIENT),
				Passenger: BaseRestangular.service(APIs.PASSENGER),
				User: BaseRestangular.service(APIs.USER),
				Device: BaseRestangular.service(APIs.DEVICE),
				Vehicle: BaseRestangular.service(APIs.VEHICLE),
				Route: BaseRestangular.service(APIs.ROUTE),
				DeviceSoftware: BaseRestangular.service(APIs.DEVICE_SOFTWARE)
			};
		}
	]);
});