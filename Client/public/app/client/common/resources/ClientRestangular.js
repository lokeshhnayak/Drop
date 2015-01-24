// Client Restangular
define([
	// Module
	'client/common/module',
	'auth/login/AuthService',
	'restangular'
], function(module) {

	'use strict';

	module.registerService('ClientRestangular', [
		'Restangular',
		'AuthService',
		function(Restangular, AuthService) {
			return Restangular.withConfig(function(RestangularConfigurer) {
				RestangularConfigurer.setBaseUrl(AuthService.getBaseUrl());
			});
		}
	]);
});