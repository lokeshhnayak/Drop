define([
	'client/common/module',                     // Angular Module for WebArtists VTSS app.
	'client/common/ClientAPIs',                 // APIs Service
	'client/common/resources/ClientRestangular',// Restangular Library
	'restangular'
],
function(module, supplant) {

	'use strict';

	module.registerService('ClientResources', [
		'Restangular',
		'ClientRestangular',
		'ClientAPIs',
		function (Restangular, ClientRestangular, ClientAPIs) {
			var copy = function (object) {
				return Restangular.copy(object);
			};

			return {
				Vehicles: ClientRestangular.service(ClientAPIs.VEHICLES),
				Agency: ClientRestangular.service(ClientAPIs.AGENCY),
				Routes: ClientRestangular.service(ClientAPIs.ROUTES),
				Holidays: ClientRestangular.service(ClientAPIs.HOLIDAYS),
				copy: copy
			};
		}
	]);
});