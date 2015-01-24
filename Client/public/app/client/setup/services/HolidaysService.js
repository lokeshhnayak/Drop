define([
	'client/setup/module',                             // Angular Module for WebArtists VTSS app.
	'common/utils/supplant',                           // Supplant
	'common/utils/Utils',                              // Utils Library
	'lodash',                                          // Lodash Library
	'client/common/resources/ClientRestangularFactory' // ClientRestangularFactory Service
],
function(module, supplant) {

	'use strict';

	module.registerService('HolidaysService', [
		'$q',
		'_',
		'Logger',
		'ClientRestangularFactory',
		'TableDefaults',
		function ($q, _, Logger, ClientRestangularFactory, TableDefaults) {
			var logger = Logger.getInstance('HolidaysService');
			logger.info("In HolidaysService");

			var API_NAME = "holidays";
			var Holidays = ClientRestangularFactory.getService(API_NAME);

			var getHolidays = function () {
				return Holidays.getList();
			};

			var createHoliday = function (holiday) {
				return Holidays.post(holiday)
					.then(function(updatedClient) {
						return ClientRestangularFactory.restangularizeCollection(updatedClient.holidays, API_NAME);
					});
			};

			var updateHoliday = function (holiday) {
				return holiday.save();
			};

			var deleteHoliday = function (holiday) {
				return holiday.remove();
			};

			var copyHoliday = function (holiday) {
				return ClientRestangularFactory.copy(holiday);
			};

			return {
				getHolidays   : getHolidays,
				createHoliday : createHoliday,
				updateHoliday : updateHoliday,
				deleteHoliday : deleteHoliday,
				copyHoliday   : copyHoliday
			};
		}
	]);
});