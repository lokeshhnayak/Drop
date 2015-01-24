define([
	'client/common/module',                     // Angular Module for WebArtists VTSS app.
	'client/common/resources/ClientRestangular' // Client Restangular Library
],
function(module, supplant) {

	'use strict';

	module.registerService('ClientRestangularFactory', [
		'ClientRestangular',
		function (ClientRestangular) {

			var getService = function (resource) {
				return ClientRestangular.service(resource);
			};

			var restangularizeCollection = function (collection, resource) {
				return ClientRestangular.restangularizeCollection(null, collection, resource);
			};

			var restangularizeElement = function (element, resource) {
				return ClientRestangular.restangularizeElement(null, element, resource);
			};

			var copy = function(object) {
				return ClientRestangular.copy(object);
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