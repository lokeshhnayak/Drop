define([
	'angular',
	'angular-couch-potato',
	'angular-ui-router',
	'restangular'
], function (ng, couchPotato) {
	'use strict';

	var module = ng.module('app.client.connection-settings', [
		'ui.router'
	]);

	module.config([
		'$stateProvider',
		'$couchPotatoProvider',
		function ($stateProvider, $couchPotatoProvider) {
			$stateProvider
				.state('app.client.connection-settings', {
					abstract: true,
					data:{
						title: 'Accounts'
					}
				})
				.state('app.client.connection-settings.device-settings', {
					url: '/client/connection-settings/device-settings',
					data: {
						title: 'Device Settings'
					},
					views: {
						"content@app": {
							templateUrl: "app/client/connection-settings/views/device-settings.html",
							resolve: {
								deps: $couchPotatoProvider.resolveDependencies([
								])
							}
						}
					}
				})
				.state('app.client.connection-settings.office-settings', {
					url: '/client/connection-settings/office-settings',
					data: {
						title: 'Office Settings'
					},
					views: {
						"content@app": {
							templateUrl: "app/client/connection-settings/views/office-settings.html",
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