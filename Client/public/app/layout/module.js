define([
	'angular',
	'angular-couch-potato',
	'angular-ui-router'
], function (ng, couchPotato) {

	"use strict";

	var module = ng.module('app.layout', ['ui.router']);

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
									'layout/LayoutController'
								])
							}
						}
					}
				});
			$urlRouterProvider.otherwise('/home');
		}
	]);

	module.run([
		'$couchPotato',
		function($couchPotato){
			module.lazy = $couchPotato;
		}
	]);

	return module;

});
