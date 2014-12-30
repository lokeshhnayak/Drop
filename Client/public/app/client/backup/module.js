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
				.state('app.client.backup.storage-setup', {
					url: '/client/backup/storage-setup',
					data: {
						title: 'Storage Setup'
					},
					views: {
						"content@app": {
							templateUrl: "app/client/backup/views/storage-setup.html",
							resolve: {
								deps: $couchPotatoProvider.resolveDependencies([
								])
							}
						}
					}
				})
				.state('app.client.backup.storage-status', {
					url: '/client/backup/storage-status',
					data: {
						title: 'Storage Status'
					},
					views: {
						"content@app": {
							templateUrl: "app/client/backup/views/storage-status.html",
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