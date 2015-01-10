define([
	'angular',
	'angular-couch-potato',
	'angular-ui-router',
	'angular-permission'
], function (ng, couchPotato) {
	'use strict';

	var module = ng.module('app.client', [
		'ui.router',
		'permission',
		'app.client.home',
		'app.client.account',
		'app.client.setup',
		'app.client.monitor',
		'app.client.backup',
		'app.client.finance',
		'app.client.connection-settings',
		'app.client.messages'
	]);

	module.config([
		'$stateProvider',
		'$couchPotatoProvider',
		function ($stateProvider, $couchPotatoProvider) {
			$stateProvider
				.state('app.client', {
					abstract: true,
					data:{
						title: 'Client',
						permissions: {
							except: ['anonymous'],
							redirectTo: 'login'
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