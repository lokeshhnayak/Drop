define([
	'angular',
	'angular-couch-potato',
	'angular-ui-router',
	'angular-permission',
	'restangular'
], function (ng, couchPotato) {
	'use strict';

	var module = ng.module('app.agency', [
		'ui.router',
		'permission',
		'app.agency.home',
		'app.agency.account',
		'app.agency.devices',
		'app.agency.finance',
		'app.agency.messages'
	]);

	module.config([
		'$stateProvider',
		'$couchPotatoProvider',
		function ($stateProvider, $couchPotatoProvider) {
			$stateProvider
				.state('app.agency', {
					abstract: true,
					data:{
						title: 'Agency',
						permissions: {
							except: ['anonymous'],
							redirectTo: 'login'
						}
					}
				});
		}
	]);

	couchPotato.configureApp(module);

	module.run([
		'$couchPotato',
		function($couchPotato){
			module.lazy = $couchPotato;
		}
	]);

	return module;
});