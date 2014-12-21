define([
	'angular',
	'angular-couch-potato',
	'angular-ui-router',
	'restangular'
], function (ng, couchPotato) {
	'use strict';

	var module = ng.module('app.client.setup', [
		'ui.router'
	]);

	module.config([
		'$stateProvider',
		'$couchPotatoProvider',
		function ($stateProvider, $couchPotatoProvider) {
			$stateProvider
				.state('app.client.setup', {
					abstract: true,
					data:{
						title: 'Setup'
					}
				})
				.state('app.client.setup.general', {
					url: '/client/setup/general',
					data: {
						title: 'General'
					},
					views: {
						"content@app": {
							templateUrl: "app/client/setup/views/general.html",
							resolve: {
								deps: $couchPotatoProvider.resolveDependencies([
								])
							}
						}
					}
				})
				.state('app.client.setup.vehicles', {
					url: '/client/setup/vehicles',
					data: {
						title: 'Vehicles'
					},
					views: {
						"content@app": {
							templateUrl: "app/client/setup/views/vehicles.html",
							resolve: {
								deps: $couchPotatoProvider.resolveDependencies([
								])
							}
						}
					}
				})
				.state('app.client.setup.routes', {
					url: '/client/setup/routes',
					data: {
						title: 'Routes'
					},
					views: {
						"content@app": {
							templateUrl: "app/client/setup/views/routes.html",
							resolve: {
								deps: $couchPotatoProvider.resolveDependencies([
								])
							}
						}
					}
				})
				.state('app.client.setup.passengers', {
					url: '/client/setup/passengers',
					data: {
						title: 'Passengers'
					},
					views: {
						"content@app": {
							templateUrl: "app/client/setup/views/passengers.html",
							resolve: {
								deps: $couchPotatoProvider.resolveDependencies([
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