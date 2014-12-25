define([
	'angular',
	'angular-couch-potato',
	'angular-ui-router',
	'restangular'
], function (ng, couchPotato) {
	'use strict';

	var module = ng.module('app.passenger.account', [
		'ui.router'
	]);

	module.config([
		'$stateProvider',
		'$couchPotatoProvider',
		function ($stateProvider, $couchPotatoProvider) {
			$stateProvider
				.state('app.passenger.profile', {
					url: '/passenger/account/profile',
					data: {
						title: 'Accounts'
					},
					views: {
						"content@app": {
							templateUrl: "app/passenger/account/views/profile.html",
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