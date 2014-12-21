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
						title: 'Device'
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
				.state('app.client.backup.backup', {
					url: '/client/backup/backup',
					data: {
						title: 'Backup'
					},
					views: {
						"content@app": {
							templateUrl: "app/client/backup/views/backup.html",
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