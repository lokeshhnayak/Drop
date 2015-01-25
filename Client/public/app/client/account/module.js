define([
	'angular',
	'angular-couch-potato',
	'angular-ui-router',
	'restangular'
], function (ng, couchPotato) {
	'use strict';

	var module = ng.module('app.client.account', [
		'ui.router'
	]);

	module.config([
		'$stateProvider',
		'$couchPotatoProvider',
		function ($stateProvider, $couchPotatoProvider) {
			$stateProvider
				.state('app.client.profile', {
					url: '/client/profile',
					data: {
						title: 'Profile'
					},
					views: {
						"content@app": {
							templateUrl: "app/client/account/views/profile.html",
							resolve: {
								deps: $couchPotatoProvider.resolveDependencies([
								])
							}
						}
					}
				})
				.state('app.client.accounts', {
					abstract: true,
					data:{
						title: 'Accounts'
					}
				})
				.state('app.client.accounts.profile', {
					url: '/client/account/profile',
					data: {
						title: 'Profile'
					},
					views: {
						"content@app": {
							templateUrl: "app/client/account/views/profile.html",
							resolve: {
								deps: $couchPotatoProvider.resolveDependencies([
								])
							}
						}
					}
				})
				.state('app.client.accounts.users', {
					url: '/client/account/users',
					data: {
						title: 'Users'
					},
					views: {
						"content@app": {
							templateUrl: "app/client/account/views/users.html",
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