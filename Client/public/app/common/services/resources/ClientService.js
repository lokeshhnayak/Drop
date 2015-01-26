define([
	'common/module',                               // Angular Module for WebArtists VTSS app.
	'common/utils/supplant',                       // Supplant
	'common/utils/Utils',                          // Utils Library
	'lodash',                                      // Lodash Library
	'common/services/resources/RestangularFactory' // RestangularFactory Service
],
function(module, supplant) {

	'use strict';

	module.registerService('ClientService', [
		'_',
		'Logger',
		'RestangularFactory',
		function (_, Logger, RestangularFactory) {
			var logger = Logger.getInstance('ClientService');
			logger.info("In ClientService");

			var API_NAME = "client";
			var Client = RestangularFactory.getService(API_NAME);

			var getClients = function () {
				return Client.getList();
			};

			var getClient = function (id) {
				return Client.one(id).get();
			};

			var createClient = function (client) {
				return Client.post(client);
			};

			var updateClient = function (client) {
				return client.save();
			};

			var deleteClient = function (client) {
				return client.remove();
			};

			var copyClient = function (client) {
				return RestangularFactory.copy(client);
			};

			return {
				getClients   : getClients,
				getClient    : getClient,
				createClient : createClient,
				updateClient : updateClient,
				deleteClient : deleteClient,
				copyClient   : copyClient
			};
		}
	]);
});