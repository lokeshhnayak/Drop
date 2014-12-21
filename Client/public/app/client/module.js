define([
	'angular',
	'angular-couch-potato',
	'angular-ui-router'
], function (ng, couchPotato) {
	'use strict';

	var module = ng.module('app.client', [
		'ui.router'
	]);

	module.config([
		'$stateProvider',
		'$couchPotatoProvider',
		function ($stateProvider, $couchPotatoProvider) {
			$stateProvider
				.state('app.client', {
					abstract: true,
					data:{
						title: 'Client'
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