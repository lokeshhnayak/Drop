define([
	'client/common/module',                        // Angular Module for WebArtists VTSS app.
	'common/utils/supplant',                       // Supplant
	'lodash',                                      // Lodash Library
	'common/services/resources/RestangularFactory' // RestangularFactory Service
],
function(module, supplant) {

	'use strict';

	module.registerService('LookupService', [
		'$q',
		'_',
		'Logger',
		'RestangularFactory',
		function ($q, _, Logger, RestangularFactory) {
			var logger = Logger.getInstance('LookupService');
			logger.info("In LookupService");
			var lookupValues;

			var API_NAME = "configlookup";
			var Lookup = RestangularFactory.getService(API_NAME);

			var getLookupValues = function () {
				var deferred = $q.defer();
				if(lookupValues) {
					return $q.when(lookupValues);
				} else {
					Lookup.getList()
						.then(function(values) {
							lookupValues = values;
							return $q.resolve(lookupValues);
						});
				}
				return deferred.promise;
			};

			var getLookupValuesByType = function(valueType) {
				return _.filter(lookupValues, { valueType: valueType });
			};

			getLookupValues();

			return {
				getLookupValuesByType  : getLookupValuesByType
			};
		}
	]);
});