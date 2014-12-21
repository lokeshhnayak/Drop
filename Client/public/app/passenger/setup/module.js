define([
	'angular',
	'angular-couch-potato',
	'angular-ui-router',
	'restangular'
], function (ng, couchPotato) {
	'use strict';

	var module = ng.module('app.passenger.setup', [
		'ui.router'
	]);

	module.config([
		'$stateProvider',
		'$couchPotatoProvider',
		function ($stateProvider, $couchPotatoProvider) {
			$stateProvider
				.state('app.passenger.setup', {
					url: '/passenger/setup',
					data: {
						title: 'Setup'
					},
					views: {
						"content@app": {
							templateUrl: "app/passenger/setup/views/setup.html",
							controller: "PassengerSetupController",
							resolve: {
								deps: $couchPotatoProvider.resolveDependencies([
									'passenger/setup/services/PassengerSetup',
									'passenger/setup/controllers/PassengerSetupController'
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