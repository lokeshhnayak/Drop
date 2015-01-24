define([
	'client/setup/module',                 // Angular Module for WebArtists VTSS app.
	'common/utils/supplant',               // Supplant
	'common/utils/Utils',                  // Utils Library
	'lodash',                              // Lodash Library
	'common/services/resources/Clients'    // Clients Resource
],
function(module, supplant) {

	'use strict';

	module.registerService('ClientsService', [
		'$q',
		'_',
		'Logger',
		'Clients',
		function ($q, _, Logger, Clients) {
			var logger = Logger.getInstance('ClientsService');
			logger.info("In ClientsService");

			var getClients = function () {
				return Clients.getList()
					.then(function(clients) {
						return clients;
					});
			};
			
			return {
				getClients : getClients
			};
		}
	]);
});