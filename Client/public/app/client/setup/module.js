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
				.state('app.client.setup.settings', {
					url: '/client/setup/settings',
					data: {
						title: 'Settings'
					},
					views: {
						"content@app": {
							templateUrl: "app/client/setup/views/settings.html",
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
							controller: "VehiclesController",
							resolve: {
								deps: $couchPotatoProvider.resolveDependencies([
									'client/setup/controllers/VehiclesController',
									'client/setup/services/TableDefaults',
									'client/setup/services/VehiclesService',
									'common/directives/waDatatables'
								]),
								vehicles: [
									'VehiclesService',
									function(VehiclesService) {
										return VehiclesService.getVehicles();
									}
								]
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