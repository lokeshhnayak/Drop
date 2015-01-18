define([
	'angular',
	'angular-couch-potato',
	'angular-ui-router',
	'angular-permission'
], function (ng, couchPotato) {
	'use strict';

	var module = ng.module('app.passenger', [
		'ui.router',
		'permission',
		'app.auth',
		'app.passenger.home',
		'app.passenger.account',
		'app.passenger.setup',
		'app.passenger.monitor',
		'app.passenger.alerts',
		'app.passenger.messages'
	]);

	module.config([
		'$stateProvider',
		'$couchPotatoProvider',
		function ($stateProvider, $couchPotatoProvider) {
			$stateProvider
				.state('app.passenger', {
					abstract: true,
					data:{
						title: 'Passenger',
						permissions: {
							only: ['P'],
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

			Permission.defineRole('P', function (stateParams) {
				return AuthService.isAuthorized([USER_ROLES.P]);
			});
		}
	]);

	return module;
});