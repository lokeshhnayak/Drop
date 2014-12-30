define([
	'angular',
	'angular-couch-potato',
	'angular-ui-router',
	'restangular'
], function (ng, couchPotato) {
	'use strict';

	var module = ng.module('app.host.finance', [
		'ui.router'
	]);

	module.config([
		'$stateProvider',
		'$couchPotatoProvider',
		function ($stateProvider, $couchPotatoProvider) {
			$stateProvider
				.state('app.host.finance', {
					abstract: true,
					data:{
						title: 'Finance'
					}
				})
				.state('app.host.finance.policies', {
					url: '/host/finance/policies',
					data: {
						title: 'Cost Policies'
					},
					views: {
						"content@app": {
							templateUrl: "app/host/finance/views/policies.html",
							resolve: {
								deps: $couchPotatoProvider.resolveDependencies([
								])
							}
						}
					}
				})
				.state('app.host.finance.reports', {
					url: '/host/finance/reports',
					data: {
						title: 'Cost Reports'
					},
					views: {
						"content@app": {
							templateUrl: "app/host/finance/views/reports.html",
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