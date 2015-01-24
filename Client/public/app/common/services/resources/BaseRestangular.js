// Client Restangular
define([
	// Module
	'common/module',
	'restangular'
], function(module) {

	'use strict';

	module.registerService('BaseRestangular', [
		'Restangular',
		'APP_CONFIG',
		function(Restangular, APP_CONFIG) {
			return Restangular.withConfig(function(RestangularConfigurer) {
				RestangularConfigurer.setBaseUrl(APP_CONFIG.BASE_URL);
			});
		}
	]);
});