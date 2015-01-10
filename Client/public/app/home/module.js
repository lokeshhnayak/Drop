define([
	'angular',
	'angular-couch-potato',
	'angular-ui-router',
	'angular-permission',
	'auth/login/AuthService'
], function (ng, couchPotato) {
	'use strict';

	var module = ng.module('app.home', [
		'ui.router',
		'app.auth',
		'permission'
	]);

	module.config([
		'$stateProvider',
		'$couchPotatoProvider',
		function ($stateProvider, $couchPotatoProvider) {
			$stateProvider
				.state('app.home', {
					url: '/home',
					views: {
						"content@app": {
							controller: 'HomeController',
							templateUrl: 'app/home/home.html',
							resolve: {
								deps: $couchPotatoProvider.resolveDependencies([
									'home/HomeController'
								])
							}
						}
					},
					data:{
						title: 'Home',
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
		'Permission',
		'AuthService',
		function($couchPotato, Permission, AuthService){
			module.lazy = $couchPotato;

			Permission.defineRole('anonymous', function (stateParams) {
				if(!AuthService.currentUser()) {
					return true;
				}
				return false;
			});
		}
	]);

	return module;
});