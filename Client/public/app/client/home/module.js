define([
	'angular',
	'angular-couch-potato',
	'angular-ui-router',
	'restangular'
], function (ng, couchPotato) {
	'use strict';

	var module = ng.module('app.client.home', [
		'ui.router'
	]);

	module.config([
		'$stateProvider',
		'$couchPotatoProvider',
		function ($stateProvider, $couchPotatoProvider) {
			$stateProvider
				.state('app.client.home', {
					url: '/client/home',
					data: {
						title: 'Profile'
					},
					views: {
						"content@app": {
							templateUrl: "app/client/home/views/home.html",
							controller: 'HomeController',
							resolve: {
								deps: $couchPotatoProvider.resolveDependencies([
									'common/directives/waUserProfile',
									'client/home/controllers/HomeController',
									'common/services/resources/AgencyService',
									'common/services/resources/ClientService'
								])
							}
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