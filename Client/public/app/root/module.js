define([
	'angular',
	'angular-couch-potato',
	'angular-ui-router',
	'angular-permission',
	'restangular'
], function (ng, couchPotato) {
	'use strict';

	var module = ng.module('app.root', [
		'ui.router',
		'permission',
		'app.root.home',
		'app.root.account',
		'app.root.access-control',
		'app.root.hosts',
		'app.root.device-software'
	]);

	module.config([
		'$stateProvider',
		'$couchPotatoProvider',
		function ($stateProvider, $couchPotatoProvider) {
			$stateProvider
				.state('app.root', {
					abstract: true,
					data:{
						title: 'Root'/*,
						permissions: {
							except: ['anonymous'],
							redirectTo: 'login'
						}*/
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