define([
	'common/module',                               // Angular Module for WebArtists VTSS app.
	'common/utils/supplant',                       // Supplant
	'common/utils/Utils',                          // Utils Library
	'lodash',                                      // Lodash Library
	'common/services/resources/RestangularFactory' // RestangularFactory Service
],
function(module, supplant) {

	'use strict';

	module.registerService('HostService', [
		'_',
		'Logger',
		'RestangularFactory',
		function (_, Logger, RestangularFactory) {
			var logger = Logger.getInstance('HostService');
			logger.info("In HostService");

			var API_NAME = "host";
			var Host = RestangularFactory.getService(API_NAME);

			var getHosts = function () {
				return Host.getList();
			};

			var getHost = function (id) {
				return Host.one(id).get();
			};

			var createHost = function (host) {
				return Host.post(host);
			};

			var updateHost = function (host) {
				return host.save();
			};

			var deleteHost = function (host) {
				return host.remove();
			};

			var copyHost = function (host) {
				return RestangularFactory.copy(host);
			};

			return {
				getHosts   : getHosts,
				getHost    : getHost,
				createHost : createHost,
				updateHost : updateHost,
				deleteHost : deleteHost,
				copyHost   : copyHost
			};
		}
	]);
});