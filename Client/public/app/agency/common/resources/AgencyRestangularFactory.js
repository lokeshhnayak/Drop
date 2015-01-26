define([
	'agency/common/module',                     // Angular Module for WebArtists VTSS app.
	'agency/common/resources/AgencyRestangular' // Agency Restangular Library
],
function(module, supplant) {

	'use strict';

	module.registerService('AgencyRestangularFactory', [
		'AgencyRestangular',
		function (AgencyRestangular) {

			var getService = function (resource) {
				return AgencyRestangular.service(resource);
			};

			var restangularizeCollection = function (collection, resource) {
				return AgencyRestangular.restangularizeCollection(null, collection, resource);
			};

			var restangularizeElement = function (element, resource) {
				return AgencyRestangular.restangularizeElement(null, element, resource);
			};

			var copy = function(object) {
				return AgencyRestangular.copy(object);
			};

			return {
				copy                     : copy,
				getService               : getService,
				restangularizeCollection : restangularizeCollection,
				restangularizeElement    : restangularizeElement
			};
		}
	]);
});