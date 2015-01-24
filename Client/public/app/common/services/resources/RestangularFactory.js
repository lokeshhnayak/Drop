define([
	'common/module',                            // Angular Module for WebArtists VTSS app.
	'common/services/resources/BaseRestangular' // Base Restangular Library
],
function(module, supplant) {

	'use strict';

	module.registerService('RestangularFactory', [
		'BaseRestangular',
		function (BaseRestangular) {

			var getService = function (resource) {
				return BaseRestangular.service(resource);
			};

			return {
				getService : getService
			};
		}
	]);
});