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
		'$urlRouterProvider',
		function ($stateProvider, $couchPotatoProvider, $urlRouterProvider) {
			$stateProvider
				.state('app.client.setup', {
					abstract: true,
					data:{
						title: 'Setup'
					}
				})
				.state('app.client.setup.holidays', {
					url: '/client/setup/holidays',
					data: {
						title: 'Holidays'
					},
					views: {
						"content@app": {
							templateUrl: "app/client/setup/views/holidays.html",
							controller: "HolidaysController",
							resolve: {
								deps: $couchPotatoProvider.resolveDependencies([
									'client/setup/controllers/HolidaysController',
									'client/setup/services/HolidaysService',
									'client/setup/services/TableDefaults',
									'common/directives/waDatatables',
									'common/services/ModalService',
									'client/common/ClientModalService'
								])
							}
						}
					}
				})
				.state('app.client.setup.exceptions', {
					url: '/client/setup/exceptions',
					data: {
						title: 'Exceptions'
					},
					views: {
						"content@app": {
							templateUrl: "app/client/setup/views/exceptions.html",
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
									'client/setup/services/VehiclesService',
									'client/setup/services/TableDefaults',
									'common/directives/waDatatables'
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

			$urlRouterProvider.when('/client/setup', '/client/setup/holidays');
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