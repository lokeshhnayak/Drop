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
		'app.auth',
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
							only: ['AU'],
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

			Permission.defineRole('AU', function (stateParams) {
				return AuthService.isAuthorized([USER_ROLES.AA, USER_ROLES.AT, USER_ROLES.AF]);
			});

			Permission.defineRole('AA', function (stateParams) {
				return AuthService.isAuthorized(USER_ROLES.AA);
			});

			Permission.defineRole('AT', function (stateParams) {
				return AuthService.isAuthorized(USER_ROLES.AT);
			});

			Permission.defineRole('AF', function (stateParams) {
				return AuthService.isAuthorized(USER_ROLES.AF);
			});
		}
	]);

	return module;
});