define([
	'angular',
	'angular-couch-potato',
	'angular-ui-router',
	'restangular'
], function (ng, couchPotato) {
	'use strict';

	var module = ng.module('app.client.monitor', [
		'ui.router'
	]);

	module.config([
		'$stateProvider',
		'$couchPotatoProvider',
		function ($stateProvider, $couchPotatoProvider) {
			$stateProvider
				.state('app.client.monitor', {
					url: '/client/monitor',
					data: {
						title: 'Monitor'
					},
					views: {
						"content@app": {
							templateUrl: "app/client/monitor/views/monitor.html",
							controller: "MonitorController",
							resolve: {
								deps: $couchPotatoProvider.resolveDependencies([
									"client/monitor/controllers/MonitorController"
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