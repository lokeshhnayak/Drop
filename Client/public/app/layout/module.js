define([
	'angular',
	'angular-couch-potato',
	'angular-permission',
	'angular-ui-router'
], function (ng, couchPotato) {

	"use strict";

	var module = ng.module('app.layout', [
		'ui.router',
		'app.auth',
		'permission'
	]);

	couchPotato.configureApp(module);

	module.config([
		'$stateProvider',
		'$couchPotatoProvider',
		'$urlRouterProvider',
		function ($stateProvider, $couchPotatoProvider, $urlRouterProvider) {

			$stateProvider
				.state('app', {
					abstract: true,
					views: {
						root: {
							templateUrl: 'app/layout/layout.tpl.html',
							controller: 'LayoutController',
							resolve: {
								deps: $couchPotatoProvider.resolveDependencies([
									'auth/directives/loginInfo',
									'auth/directives/waHasRole',
									'layout/LayoutController'
								])
							}
						}
					}
				});
			$urlRouterProvider.otherwise('login');
		}
	]);

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
