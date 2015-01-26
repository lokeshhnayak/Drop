define([
	'client/common/module',                        // Angular Module for WebArtists VTSS app.
	'common/utils/supplant',                       // Supplant
	'common/utils/Utils',                          // Utils Library
	'lodash',                                      // Lodash Library
	'common/services/resources/RestangularFactory' // RestangularFactory Service
],
function(module, supplant) {

	'use strict';

	module.registerService('AgencyService', [
		'_',
		'Logger',
		'RestangularFactory',
		function (_, Logger, RestangularFactory) {
			var logger = Logger.getInstance('AgencyService');
			logger.info("In AgencyService");

			var API_NAME = "agency";
			var Agency = RestangularFactory.getService(API_NAME);

			var getAgencies = function () {
				return Agency.getList();
			};

			var getAgency = function (id) {
				return Agency.one(id).get();
			};

			var createAgency = function (agency) {
				return Agency.post(agency);
			};

			var updateAgency = function (agency) {
				return agency.save();
			};

			var deleteAgency = function (agency) {
				return agency.remove();
			};

			var copyAgency = function (agency) {
				return RestangularFactory.copy(agency);
			};

			return {
				getAgencies  : getAgencies,
				getAgency    : getAgency,
				createAgency : createAgency,
				updateAgency : updateAgency,
				deleteAgency : deleteAgency,
				copyAgency   : copyAgency
			};
		}
	]);
});