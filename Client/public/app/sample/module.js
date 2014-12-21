define([
	'angular',
	'angular-couch-potato',
	'angular-ui-router'
], function (ng, couchPotato) {

	"use strict";

	var module = ng.module('app.sample', ['ui.router']);

	module.config([
		'$stateProvider',
		'$couchPotatoProvider',
		function($stateProvider, $couchPotatoProvider){

			$stateProvider
			.state('app.sample', {
				abstract: true,
				data: {
					title: 'UI Elements'
				}
			})
			.state('app.sample.general', {
				url: '/sample/general',
				data: {
					title: 'General Elements'
				},
				views: {
					"content@app": {
						templateUrl: "app/sample/views/general.html",
							resolve: {
								deps: $couchPotatoProvider.resolveDependencies([
								])
							}
					}
				}
			})
			.state('app.sample.forms', {
				url: '/sample/forms',
				data: {
					title: 'Forms'
				},
				views: {
					"content@app": {
						templateUrl: "app/sample/views/forms.html",
							resolve: {
								deps: $couchPotatoProvider.resolveDependencies([
								])
							}
					}
				}
			})
			.state('app.sample.bootstrap-forms', {
				url: '/sample/bootstrap-forms',
				data: {
					title: 'Bootstrap Forms'
				},
				views: {
					"content@app": {
						templateUrl: "app/sample/views/bootstrap-forms.tpl.html",
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
		function ($couchPotato) {
			module.lazy = $couchPotato;
		}
	]);

	return module;

});
