define([
	'angular',
	'angular-couch-potato',
	'angular-ui-router',
	'restangular'
], function (ng, couchPotato) {
	'use strict';

	var module = ng.module('app.client.inspect', [
		'ui.router'
	]);

	module.config([
		'$stateProvider',
		'$couchPotatoProvider',
		function ($stateProvider, $couchPotatoProvider) {
			$stateProvider
				.state('app.client.inspect', {
					abstract: true,
					data:{
						title: 'Inspect'
					}
				})
				.state('app.client.inspect.track', {
					url: '/client/inspect/track',
					data: {
						title: 'Track'
					},
					views: {
						"content@app": {
							templateUrl: "app/client/inspect/views/track.html",
							resolve: {
								deps: $couchPotatoProvider.resolveDependencies([
								])
							}
						}
					}
				})
				.state('app.client.inspect.message', {
					url: '/client/inspect/message',
					data: {
						title: 'Messages'
					},
					views: {
						"content@app": {
							templateUrl: "app/client/inspect/views/message.html",
							resolve: {
								deps: $couchPotatoProvider.resolveDependencies([
								])
							}
						}
					}
				})
				.state('app.client.inspect.review', {
					url: '/client/inspect/review',
					data: {
						title: 'Review'
					},
					views: {
						"content@app": {
							templateUrl: "app/client/inspect/views/review.html",
							resolve: {
								deps: $couchPotatoProvider.resolveDependencies([
								])
							}
						}
					}
				})
				.state('app.client.inspect.feedback', {
					url: '/client/inspect/feedback',
					data: {
						title: 'Feedback'
					},
					views: {
						"content@app": {
							templateUrl: "app/client/inspect/views/feedback.html",
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