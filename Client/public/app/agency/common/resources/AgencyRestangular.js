// Agency Restangular
define([
	// Module
	'agency/common/module',
	'auth/login/AuthService',
	'restangular'
], function(module) {

	'use strict';

	module.registerService('AgencyRestangular', [
		'Restangular',
		'AuthService',
		function(Restangular, AuthService) {
			return Restangular.withConfig(function(RestangularConfigurer) {
				RestangularConfigurer.setBaseUrl(AuthService.getBaseUrl());
			});
		}
	]);
});