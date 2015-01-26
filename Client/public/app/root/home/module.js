define([
	'angular',
	'angular-couch-potato',
	'angular-ui-router',
	'restangular'
], function (ng, couchPotato) {
	'use strict';

	var module = ng.module('app.root.home', [
		'ui.router'
	]);

	module.config([
		'$stateProvider',
		'$couchPotatoProvider',
		function ($stateProvider, $couchPotatoProvider) {
			$stateProvider
				.state('app.root.home', {
					url: '/root/home',
					data: {
						title: 'Profile'
					},
					views: {
						"content@app": {
							templateUrl: "app/root/home/views/home.html",
							resolve: {
								deps: $couchPotatoProvider.resolveDependencies([
									'common/directives/waUserProfile',
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