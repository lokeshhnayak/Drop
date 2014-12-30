define([
	'angular',
	'angular-couch-potato',
	'angular-ui-router',
	'restangular'
], function (ng, couchPotato) {
	'use strict';

	var module = ng.module('app.client.finance', [
		'ui.router'
	]);

	module.config([
		'$stateProvider',
		'$couchPotatoProvider',
		function ($stateProvider, $couchPotatoProvider) {
			$stateProvider
				.state('app.client.finance', {
					abstract: true,
					data:{
						title: 'Finance'
					}
				})
				.state('app.client.finance.policies', {
					url: '/client/finance/policies',
					data: {
						title: 'Cost Structure'
					},
					views: {
						"content@app": {
							templateUrl: "app/client/finance/views/policies.html",
							resolve: {
								deps: $couchPotatoProvider.resolveDependencies([
								])
							}
						}
					}
				})
				.state('app.client.finance.reports', {
					url: '/client/finance/reports',
					data: {
						title: 'Cost Report'
					},
					views: {
						"content@app": {
							templateUrl: "app/client/finance/views/reports.html",
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