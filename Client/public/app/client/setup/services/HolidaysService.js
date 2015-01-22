define([
	'client/setup/module',                 // Angular Module for WebArtists VTSS app.
	'common/utils/supplant',               // Supplant
	'common/utils/Utils',                  // Utils Library
	'lodash',                              // Lodash Library
	'common/services/resources/Holidays'   // Holidays Resource
],
function(module, supplant) {

	'use strict';

	module.registerService('HolidaysService', [
		'$q',
		'_',
		'Logger',
		'Holidays',
		'TableDefaults',
		function ($q, _, Logger, Holidays, TableDefaults) {
			var logger = Logger.getInstance('HolidaysService');
			logger.info("In HolidaysService");

			var getHolidays = function () {
				return Holidays.getList();
			};

			var createHoliday = function (holiday) {
				return Holidays.post(holiday);
			};

			var updateHoliday = function (holiday) {
				return holiday.save();
			};

			var deleteHoliday = function (holiday) {
				return holiday.remove();
			};

			return {
				getHolidays : getHolidays,
				createHoliday : createHoliday,
				updateHoliday : updateHoliday,
				deleteHoliday : deleteHoliday
			};
		}
	]);
});