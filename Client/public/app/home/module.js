define([
	'angular',
	'angular-couch-potato',
	'angular-ui-router',
	'angular-resource'
], function (ng, couchPotato) {
	'use strict';

	var module = ng.module('app.home', [
		'ui.router',
		'ngResource'
	]);

	module.config([
		'$stateProvider',
		'$couchPotatoProvider',
		function ($stateProvider, $couchPotatoProvider) {
			$stateProvider
				.state('app.home', {
					url: '/home',
					views: {
						"content@app": {
							controller: 'HomeController',
							templateUrl: 'app/home/home.html',
							resolve: {
								deps: $couchPotatoProvider.resolveDependencies([
									'home/HomeController'
								])
							}
						}
					},
					data:{
						title: 'Home'
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