define([
	'angular',
	'angular-couch-potato',
	'angular-ui-router'
], function (ng, couchPotato) {

	"use strict";

	var module = ng.module('app.auth', [
		'ui.router'
	]);

	couchPotato.configureApp(module);

	module.config([
		'$stateProvider',
		'$couchPotatoProvider',
		'$urlRouterProvider',
		function ($stateProvider, $couchPotatoProvider, $urlRouterProvider) {

			$urlRouterProvider.otherwise("login");

			$stateProvider.state('realLogin', {
				url: '/real-login',

				views: {
					root: {
						templateUrl: "app/auth/login/login.html",
						controller: 'LoginController',
						resolve: {
							deps: $couchPotatoProvider.resolveDependencies([
								'auth/models/User',
								'auth/directives/loginInfo',
								'auth/login/AuthService',
								'auth/login/LoginController'
							])
						}
					}
				},
				data: {
					title: 'Login',
					rootId: 'extr-page'
				}

			})

			.state('login', {
				url: '/login',
				views: {
					root: {
						templateUrl: 'app/auth/views/login.html',
						controller: 'LoginController',
						resolve: {
							deps: $couchPotatoProvider.resolveDependencies([
								'modules/forms/directives/waValidateForm',
								'auth/models/User',
								'auth/directives/loginInfo',
								'auth/login/AuthService',
								'auth/login/LoginController'
							])
						}
					}
				},
				data: {
					title: 'Login',
					htmlId: 'extr-page'
				}
			})

			.state('register', {
				url: '/register',
				views: {
					root: {
						templateUrl: 'app/auth/views/register.html'
					}
				},
				data: {
					title: 'Register',
					htmlId: 'extr-page'
				},
				resolve: {
					deps: $couchPotatoProvider.resolveDependencies([
						'modules/forms/directives/waValidateForm'
					])
				}
			})

			.state('forgotPassword', {
				url: '/forgot-password',
				views: {
					root: {
						templateUrl: 'app/auth/views/forgot-password.html'
					}
				},
				data: {
					title: 'Forgot Password',
					htmlId: 'extr-page'
				},
				resolve: {
					deps: $couchPotatoProvider.resolveDependencies([
						'modules/forms/directives/waValidateForm'
					])
				}
			})

			.state('lock', {
				url: '/lock',
				views: {
					root: {
						templateUrl: 'app/auth/views/lock.html'
					}
				},
				data: {
					title: 'Locked Screen',
					htmlId: 'lock-page'
				}
			});
		}
	]);

	module.run([
		'$couchPotato',
		function($couchPotato){
			module.lazy = $couchPotato;
		}
	]);
	return module;
});