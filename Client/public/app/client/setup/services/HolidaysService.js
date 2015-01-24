define([
	'client/setup/module',                      // Angular Module for WebArtists VTSS app.
	'common/utils/supplant',                    // Supplant
	'common/utils/Utils',                       // Utils Library
	'lodash',                                   // Lodash Library
	'common/services/resources/Resources',       // CommonResources Service
	'client/common/resources/ClientResources'   // ClientResources Service
],
function(module, supplant) {

	'use strict';

	module.registerService('HolidaysService', [
		'$q',
		'_',
		'Logger',
		'Resources',
		'ClientResources',
		'TableDefaults',
		function ($q, _, Logger, Resources, ClientResources, TableDefaults) {
			var logger = Logger.getInstance('HolidaysService');
			logger.info("In HolidaysService");

			var getHolidays = function () {
				return ClientResources.Holidays.getList();
			};

			var createHoliday = function (holiday) {
				return ClientResources.Holidays.post(holiday);
			};

			var updateHoliday = function (holiday) {
				return holiday.save();
			};

			var deleteHoliday = function (holiday) {
				return holiday.remove();
			};

			var copyHoliday = function (holiday) {
				return ClientResources.copy(holiday);
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