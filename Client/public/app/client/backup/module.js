define([
	'angular',
	'angular-couch-potato',
	'angular-ui-router',
	'restangular'
], function (ng, couchPotato) {
	'use strict';

	var module = ng.module('app.client.backup', [
		'ui.router'
	]);

	module.config([
		'$stateProvider',
		'$couchPotatoProvider',
		function ($stateProvider, $couchPotatoProvider) {
			$stateProvider
				.state('app.client.backup', {
					abstract: true,
					data:{
						title: 'Backup'
					}
				})
				.state('app.client.backup.device', {
					url: '/client/backup/device',
					data: {
						title: 'Device Storage'
					},
					views: {
						"content@app": {
							templateUrl: "app/client/backup/views/device.html",
							resolve: {
								deps: $couchPotatoProvider.resolveDependencies([
								])
							}
						}
					}
				})
				.state('app.client.backup.primary', {
					url: '/client/backup/primary',
					data: {
						title: 'Primary Storage'
					},
					views: {
						"content@app": {
							templateUrl: "app/client/backup/views/primary.html",
							resolve: {
								deps: $couchPotatoProvider.resolveDependencies([
								])
							}
						}
					}
				})
				.state('app.client.backup.secondary', {
					url: '/client/backup/secondary',
					data: {
						title: 'Secondary Storage'
					},
					views: {
						"content@app": {
							templateUrl: "app/client/backup/views/secondary.html",
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