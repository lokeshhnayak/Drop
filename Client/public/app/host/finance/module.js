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
				.state('app.host.finance.cost-policy', {
					url: '/host/finance/cost-policy',
					data: {
						title: 'Cost Policy'
					},
					views: {
						"content@app": {
							templateUrl: "app/host/finance/views/cost-policy.html",
							resolve: {
								deps: $couchPotatoProvider.resolveDependencies([
								])
							}
						}
					}
				})
				.state('app.host.finance.cost-report', {
					url: '/host/finance/cost-report',
					data: {
						title: 'Cost Report'
					},
					views: {
						"content@app": {
							templateUrl: "app/host/finance/views/cost-report.html",
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