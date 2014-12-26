'use strict';

define([
	'angular',
	'angular-couch-potato',
	'angular-ui-router',
	'angular-animate',
	'angular-sanitize',
	'angular-bootstrap',
	'smartwidgets',
	'notification',
	'restangular'
], function (ng, couchPotato) {

	var logger = ng.module('wa.logger', ['ngSanitize']);

	var lodash = ng.module('lodash', ['ngSanitize']);

	// Expose lodash as a factory so that it can be used by angular.
	lodash.factory('_', function() {
		return window._; // assumes lodash has already been loaded on the page
	});

	logger.provider('Logger', [function() {
		// Set this to false if logging is not required in PROD.
		var isLoggingEnabled = true;
		var isTimerEnabled = true;

		this.enabled = function(_isLoggedEnabled) {
			isLoggingEnabled = !!_isLoggedEnabled;
		}

		this.timerEnabled = function(_isTimerEnabled) {
			_isTimerEnabled = !!_isTimerEnabled;
		}

		this.$get = ['$log', function($log) {
			var Logger = function(context) {
				this.context = context;
			};
			Logger.getInstance = function(context) {
				return new Logger(context);
			};
			Logger.supplant = function(str, o) {
				return str.replace(
					/\{([^{}]*)\}/g,
					function (a, b) {
						var r = o[b];
						return typeof r === 'string' || typeof r === 'number' ? r : a;
					}
				);
			};
			Logger.getFormattedTimestamp = function(date) {
			   return Logger.supplant('{0}:{1}:{2}:{3}', [
					date.getHours(),
					date.getMinutes(),
					date.getSeconds(),
					date.getMilliseconds()
				]);
			};
			Logger.prototype = {
				_log: function(originalFn, args) {
					if (!isLoggingEnabled) {
						return;
					}
					
					var now  = Logger.getFormattedTimestamp(new Date());
					var message = '', supplantData = [];
					$log[originalFn].call(null, Logger.supplant("Web Artists - VTSS: {0}::{1}", [now, this.context]));
					for (var i = 0; i < args.length; i++) {
						$log[originalFn].call(null, args[i]);
					}
				},
				log: function() {
					this._log('log', arguments);
				},
				info: function() {
					this._log('info', arguments);
				},
				warn: function() {
					this._log('warn', arguments);
				},
				debug: function() {
					this._log('debug', arguments);
				},
				error: function() {
					this._log('error', arguments);
				},
				time: function(name, reset) {
					if(!isTimerEnabled) {
						return;
					}
					if(window.console && typeof(window.console.time) != "undefined") {
						console.time(Logger.supplant("{0}:{1}", [this.context, name]));
					} else if(window.console) {
						if(!name) { return; }
						var time = new Date().getTime();
						if(!console.timeCounters) { console.timeCounters = {}; }
						var key = "KEY" + name.toString();
						if(!reset && console.timeCounters[key]) { return; }
						console.timeCounters[key] = time;
					}
				},
				timeEnd: function(name) {
					if(!isTimerEnabled) {
						return;
					}
					if(window.console && typeof(window.console.timeEnd) != "undefined") {
						console.timeEnd(Logger.supplant("{0}:{1}", [this.context, name]));
					} else if(window.console) {
						var time = new Date().getTime();
						if(!console.timeCounters) { return; }
						var key = "KEY" + name.toString();
						var timeCounter = console.timeCounters[key];
						var diff;
						if(timeCounter) {
							diff = time - timeCounter;
							var label = name + ": " + diff + "ms";
							console.info(label);
							delete console.timeCounters[key];
						}
						return diff;
					}
				}
			};
			return Logger;
		}];
	}]);

	var app = ng.module('app', [
		'ngSanitize',
		'lodash',
		'restangular',
		'scs.couch-potato',
		'ngAnimate',
		'ui.router',
		'ui.bootstrap',

		// Common
		'wa.common',
		'wa.logger',

		// App
		'app.auth',
		'app.layout',
		'app.forms',
		'app.home',
		'app.widgets',
		// Client
		'app.client',
		'app.client.account',
		'app.client.setup',
		'app.client.monitor',
		'app.client.backup',
		'app.client.messages',
		// Host
		'app.host',
		'app.host.account',
		'app.host.equipment',
		'app.host.messages',
		'app.host.finance',
		// Agency
		'app.agency',
		'app.agency.account',
		'app.agency.devices',
		'app.agency.messages',
		'app.agency.finance',
		// Passenger
		'app.passenger',
		'app.passenger.account',
		'app.passenger.setup',
		'app.passenger.monitor',
		'app.passenger.alerts',
		'app.passenger.messages',
		// Samples
		'app.sample'
	]);

	couchPotato.configureApp(app);

	app.config([
		'$provide',
		'$httpProvider',
		function ($provide, $httpProvider) {
			// Intercept http calls.
			$provide.factory('ErrorHttpInterceptor', [
				'$q',
				function ($q) {
					var errorCounter = 0;
					function notifyError(rejection){
						console.log(rejection);
						$.bigBox({
							title: rejection.status + ' ' + rejection.statusText,
							content: rejection.data,
							color: "#C46A69",
							icon: "fa fa-warning shake animated",
							number: ++errorCounter,
							timeout: 6000
						});
					}

					return {
						// On request failure
						requestError: function (rejection) {
							// show notification
							notifyError(rejection);

							// Return the promise rejection.
							return $q.reject(rejection);
						},

						// On response failure
						responseError: function (rejection) {
							// show notification
							notifyError(rejection);
							// Return the promise rejection.
							return $q.reject(rejection);
						}
					};
				}
			]);

			// Enhance $q to provide a handy "spread" delegate during $q.all
			var resolveWith = function($q) {
				return function resolved(val) {
					var dfd = $q.defer();
					dfd.resolve(val);
					return dfd.promise;
				};
			};

			$provide.decorator('$q', [
				'$delegate',
				function($delegate) {
					if (ng.isUndefined($delegate.spread)) {
						// Let's add a `spread()` that is very useful
						// when using $q.all()
						$delegate.spread = function(targetFn, scope) {
							return function() {
								var params = [].concat(arguments[0]);
								targetFn.apply(scope, params);
							};
						};
					}

					if (ng.isUndefined($delegate.resolve)) {
						// Similar to $q.reject(), add $q.resolve()
						// to easily make an immediately-resolved promise
						// ... this is useful for mock promise-returning APIs.
						$delegate.resolve = resolveWith($delegate);
					}

					return $delegate;
				}
			]);

			// Add the interceptor to the $httpProvider.
			$httpProvider.interceptors.push('ErrorHttpInterceptor');
		}

	]);

	app.run([
		'$couchPotato',
		'$rootScope',
		'$state',
		'$stateParams',
		function ($couchPotato, $rootScope, $state, $stateParams) {
			app.lazy = $couchPotato;
			$rootScope.$state = $state;
			$rootScope.$stateParams = $stateParams;
			// editableOptions.theme = 'bs3';
			
			// handle any route related errors (specifically used to check for hidden resolve errors)
			$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){ 
				console.log(error);
			});
		}
	]);

	return app;
});
