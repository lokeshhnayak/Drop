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
				.state('app.agency.finance.cost-structure', {
					url: '/agency/finance/cost-structure',
					data: {
						title: 'Cost Structure'
					},
					views: {
						"content@app": {
							templateUrl: "app/agency/finance/views/cost-structure.html",
							resolve: {
								deps: $couchPotatoProvider.resolveDependencies([
								])
							}
						}
					}
				})
				.state('app.agency.finance.cost-report', {
					url: '/agency/finance/cost-report',
					data: {
						title: 'Cost Report'
					},
					views: {
						"content@app": {
							templateUrl: "app/agency/finance/views/cost-report.html",
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