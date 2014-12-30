define([
	'common/module',         // Angular Module for WebArtists VTSS app.
	'common/services/APIs',   // APIs Service
	'restangular'            // Restangular Library
],
function(module, supplant) {

	'use strict';

	module.registerService('Vehicles', [
		'Restangular',
		'APIs',
		function (Restangular, APIs) {
			return Restangular.service(APIs.VEHICLES);
		}
	]);
});