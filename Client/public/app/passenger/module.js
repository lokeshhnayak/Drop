define([
	'angular',
	'angular-couch-potato',
	'angular-ui-router'
], function (ng, couchPotato) {
	'use strict';

	var module = ng.module('app.passenger', [
		'ui.router'
	]);

	module.config([
		'$stateProvider',
		'$couchPotatoProvider',
		function ($stateProvider, $couchPotatoProvider) {
			$stateProvider
				.state('app.passenger', {
					abstract: true,
					data:{
						title: 'Passenger'
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