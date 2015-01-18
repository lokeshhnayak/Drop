define([
	'angular',
	'angular-couch-potato',
	'angular-ui-router',
	'angular-permission',
	'restangular'
], function (ng, couchPotato) {
	'use strict';

	var module = ng.module('app.host', [
		'ui.router',
		'permission',
		'app.auth',
		'app.host.home',
		'app.host.account',
		'app.host.devices',
		'app.host.finance',
		'app.host.messages'
	]);

	module.config([
		'$stateProvider',
		'$couchPotatoProvider',
		function ($stateProvider, $couchPotatoProvider) {
			$stateProvider
				.state('app.host', {
					abstract: true,
					data:{
						title: 'Host',
						permissions: {
							only: ['HU'],
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

			Permission.defineRole('HU', function (stateParams) {
				return AuthService.isAuthorized([USER_ROLES.HA, USER_ROLES.HT, USER_ROLES.HF]);
			});

			Permission.defineRole('HA', function (stateParams) {
				return AuthService.isAuthorized(USER_ROLES.HA);
			});

			Permission.defineRole('HT', function (stateParams) {
				return AuthService.isAuthorized(USER_ROLES.HT);
			});

			Permission.defineRole('HF', function (stateParams) {
				return AuthService.isAuthorized(USER_ROLES.HF);
			});
		}
	]);

	return module;
});