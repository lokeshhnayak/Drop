define([
	'agency/common/module',                            // Angular Module for WebArtists VTSS app.
	'common/utils/supplant',                           // Supplant
	'common/utils/Utils',                              // Utils Library
	'lodash',                                          // Lodash Library
	'agency/common/resources/AgencyRestangularFactory' // AgencyRestangularFactory Service
],
function(module, supplant) {

	'use strict';

	module.registerService('ClientsService', [
		'$q',
		'_',
		'Logger',
		'AgencyRestangularFactory',
		function ($q, _, Logger, AgencyRestangularFactory) {
			var logger = Logger.getInstance('ClientsService');
			logger.info("In ClientsService");

			var API_NAME = "clients";
			var Clients = AgencyRestangularFactory.getService(API_NAME);

			var getClients = function () {
				return Clients.getList();
			};

			var createClient = function (client) {
				return Clients.post(client)
					.then(function(updatedAgency) {
						return AgencyRestangularFactory.restangularizeCollection(updatedAgency.clients, API_NAME);
					});
			};

			var updateClient = function (client) {
				return client.save();
			};

			var deleteClient = function (client) {
				return client.remove();
			};

			var copyClient = function (client) {
				return AgencyRestangularFactory.copy(client);
			};

			return {
				getClients   : getClients,
				createClient : createClient,
				updateClient : updateClient,
				deleteClient : deleteClient,
				copyClient   : copyClient
			};
		}
	]);
});