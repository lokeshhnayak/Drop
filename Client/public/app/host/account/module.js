define([
	'angular',
	'angular-couch-potato',
	'angular-ui-router',
	'restangular'
], function (ng, couchPotato) {
	'use strict';

	var module = ng.module('app.host.account', [
		'ui.router'
	]);

	module.config([
		'$stateProvider',
		'$couchPotatoProvider',
		function ($stateProvider, $couchPotatoProvider) {
			$stateProvider
				.state('app.host.account', {
					abstract: true,
					data:{
						title: 'Account'
					}
				})
				.state('app.host.account.users', {
					url: '/host/account/users',
					data: {
						title: 'Users'
					},
					views: {
						"content@app": {
							templateUrl: "app/host/account/views/users.html",
							resolve: {
								deps: $couchPotatoProvider.resolveDependencies([
								])
							}
						}
					}
				})
				.state('app.host.account.access-control', {
					url: '/host/account/access-control',
					data: {
						title: 'Access Control'
					},
					views: {
						"content@app": {
							templateUrl: "app/host/account/views/access-control.html",
							resolve: {
								deps: $couchPotatoProvider.resolveDependencies([
								])
							}
						}
					}
				})
				.state('app.host.account.agencies', {
					url: '/host/account/agencies',
					data: {
						title: 'Agencies'
					},
					views: {
						"content@app": {
							templateUrl: "app/host/account/views/agencies.html",
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