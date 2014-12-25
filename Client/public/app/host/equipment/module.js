define([
	'angular',
	'angular-couch-potato',
	'angular-ui-router',
	'restangular'
], function (ng, couchPotato) {
	'use strict';

	var module = ng.module('app.host.equipment', [
		'ui.router'
	]);

	module.config([
		'$stateProvider',
		'$couchPotatoProvider',
		function ($stateProvider, $couchPotatoProvider) {
			$stateProvider
				.state('app.host.equipment', {
					abstract: true,
					data:{
						title: 'Equipment'
					}
				})
				.state('app.host.equipment.devices', {
					url: '/host/equipment/devices',
					data: {
						title: 'Devices'
					},
					views: {
						"content@app": {
							templateUrl: "app/host/equipment/views/devices.html",
							resolve: {
								deps: $couchPotatoProvider.resolveDependencies([
								])
							}
						}
					}
				})
				.state('app.host.equipment.device-software', {
					url: '/host/equipment/device-software',
					data: {
						title: 'Device Software'
					},
					views: {
						"content@app": {
							templateUrl: "app/host/equipment/views/device-software.html",
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