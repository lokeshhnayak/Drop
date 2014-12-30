define([
	'angular',
	'angular-couch-potato',
	'angular-ui-router',
	'restangular'
], function (ng, couchPotato) {
	'use strict';

	var module = ng.module('app.agency.finance', [
		'ui.router'
	]);

	module.config([
		'$stateProvider',
		'$couchPotatoProvider',
		function ($stateProvider, $couchPotatoProvider) {
			$stateProvider
				.state('app.agency.finance', {
					abstract: true,
					data:{
						title: 'Finance'
					}
				})
				.state('app.agency.finance.policies', {
					url: '/agency/finance/policies',
					data: {
						title: 'Cost Structure'
					},
					views: {
						"content@app": {
							templateUrl: "app/agency/finance/views/policies.html",
							resolve: {
								deps: $couchPotatoProvider.resolveDependencies([
								])
							}
						}
					}
				})
				.state('app.agency.finance.reports', {
					url: '/agency/finance/reports',
					data: {
						title: 'Cost Report'
					},
					views: {
						"content@app": {
							templateUrl: "app/agency/finance/views/reports.html",
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