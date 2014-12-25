define([
	'common/module',         // Angular Module for WebArtists VTSS app.
	'common/utils/supplant', // Supplant
	'lodash'                 // Lodash Library
],
function(module, supplant) {

	'use strict';

	module.registerService('Utils', [
		'_',
		'Logger',
		function (_, Logger) {
			var logger = Logger.getInstance('Utils');
			logger.info("In Utils");

			
		}
	]);
});