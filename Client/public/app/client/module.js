define([
	'angular',
	'angular-couch-potato',
	'angular-ui-router',
	'angular-permission'
], function (ng, couchPotato) {
	'use strict';

	var module = ng.module('app.client', [
		'ui.router',
		'permission',
		'app.auth',
		'app.client.home',
		'app.client.account',
		'app.client.setup',
		'app.client.monitor',
		'app.client.backup',
		'app.client.finance',
		'app.client.connection-settings',
		'app.client.messages'
	]);

	module.config([
		'$stateProvider',
		'$couchPotatoProvider',
		function ($stateProvider, $couchPotatoProvider) {
			$stateProvider
				.state('app.client', {
					abstract: true,
					data:{
						title: 'Client',
						permissions: {
							only: ['CU'],
							redirectTo: 'login'
						}
					}
				});
		}
	]);

	couchPotato.configureApp(module);

	module.run([
		'$couchPotato',
		'Permission',
		'AuthService',
		'USER_ROLES',
		function($couchPotato, Permission, AuthService, USER_ROLES){
			module.lazy = $couchPotato;

			Permission.defineRole('CU', function (stateParams) {
				return AuthService.isAuthorized([USER_ROLES.CA, USER_ROLES.CT, USER_ROLES.CF]);
			});

			Permission.defineRole('CA', function (stateParams) {
				return AuthService.isAuthorized(USER_ROLES.CA);
			});

			Permission.defineRole('CT', function (stateParams) {
				return AuthService.isAuthorized(USER_ROLES.CT);
			});

			Permission.defineRole('CF', function (stateParams) {
				return AuthService.isAuthorized(USER_ROLES.CF);
			});
		}
	]);

	return module;
});