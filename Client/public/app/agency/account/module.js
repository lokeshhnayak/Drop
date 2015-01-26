define([
	'angular',
	'angular-couch-potato',
	'angular-ui-router',
	'restangular'
], function (ng, couchPotato) {
	'use strict';

	var module = ng.module('app.agency.account', [
		'ui.router'
	]);

	module.config([
		'$stateProvider',
		'$couchPotatoProvider',
		function ($stateProvider, $couchPotatoProvider) {
			$stateProvider
				.state('app.agency.account', {
					abstract: true,
					data:{
						title: 'Account'
					}
				})
				.state('app.agency.account.profile', {
					url: '/agency/account/profile',
					data: {
						title: 'Profile'
					},
					views: {
						"content@app": {
							templateUrl: "app/agency/account/views/profile.html",
							resolve: {
								deps: $couchPotatoProvider.resolveDependencies([
								])
							}
						}
					}
				})
				.state('app.agency.account.users', {
					url: '/agency/account/users',
					data: {
						title: 'Users'
					},
					views: {
						"content@app": {
							templateUrl: "app/agency/account/views/users.html",
							controller:"UsersController",
							resolve: {
								deps: $couchPotatoProvider.resolveDependencies([
									'agency/account/controllers/UsersController',
									'agency/common/resources/UsersService',
									'agency/account/services/TableDefaults',
									'common/directives/waDatatables',
									'common/services/ModalService',
									'agency/common/AgencyModalService'
								])
							}
						}
					}
				})
				.state('app.agency.account.clients', {
					url: '/agency/account/clients',
					data: {
						title: 'Clients'
					},
					views: {
						"content@app": {
							templateUrl: "app/agency/account/views/clients.html",
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