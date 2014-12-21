define([
	'angular',
	'angular-couch-potato',
	'angular-ui-router',
	'restangular'
], function (ng, couchPotato) {
	'use strict';

	var module = ng.module('app.agency', [
		'ui.router'
	]);

	module.config([
		'$stateProvider',
		'$couchPotatoProvider',
		function ($stateProvider, $couchPotatoProvider) {
			$stateProvider
				.state('app.agency', {
					url: '/agency',
					views: {
						"content@app": {
							controller: 'AgencyController',
							templateUrl: 'app/agency/agency.html',
							resolve: {
								deps: $couchPotatoProvider.resolveDependencies([
									'agency/AgencyController'
								])
							}
						}
					},
					data:{
						title: 'Agency'
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