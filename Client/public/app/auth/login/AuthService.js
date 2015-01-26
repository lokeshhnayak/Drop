define([
	'auth/module',           // Angular Module for WebArtists VTSS app.
	'common/utils/supplant', // Supplant
	'lodash',                // Lodash Library
	'satellizer'             // Satellizer
],
function(module, supplant) {

	'use strict';

	module.registerService('AuthService', [
		'$auth',
		'$rootScope',
		'_',
		'Logger',
		'USER_ROLES',
		'APP_CONFIG',
		function ($auth, $rootScope, _, Logger, USER_ROLES, APP_CONFIG) {
			var logger = Logger.getInstance('AuthService');
			var loggedInUser;
			logger.info("In AuthService");

			var login = function (user) {
				return $auth.login(user)
					.then(function(response) {
						loggedInUser = response.data.user;
						var entity = getEntity();
						loggedInUser.entity = entity.obj;
						response.data.redirectState = entity.redirectState;
						return response.data;
					});
			};

			var logout = function () {
				return $auth.logout()
					.then(function(response) {
						loggedInUser = undefined;
						return response;
					});
			};

			var isAuthenticated = function() {
				return $auth.isAuthenticated();
			};

			var currentUser = function () {
				return loggedInUser;
			};

			var isAuthorized = function (roles) {
				var authorized = false;

				if(!angular.isArray(roles)) {
					roles = [roles];
				}

				if(roles.indexOf(USER_ROLES.A) !== -1) {
					return true;
				}

				if(!isAuthenticated() || !loggedInUser || !loggedInUser.roles) {
					return false;
				}

				_.some(loggedInUser.roles, function(role) {
					if(roles.toString().indexOf(role.name) !== -1) {
						authorized = true;
					}
				});

				return authorized;
			};

			var getEntity = function () {
				var entity = {redirectState: "app.login"};
				if(loggedInUser && loggedInUser.roles) {
					_.each(loggedInUser.roles, function(role) {
						switch(role.name) {
							case 'RA':
								entity.obj = loggedInUser.root;
								entity.redirectState = "app.root.home";
								break;
							case 'HA':
							case 'HT':
							case 'HF':
								entity.obj = loggedInUser.host;
								entity.redirectState = "app.host.home";
								break;
							case 'CA':
							case 'CT':
							case 'CF':
								entity.obj = loggedInUser.client;
								entity.redirectState = "app.client.home";
								break;
							case 'AA':
							case 'AT':
							case 'AF':
								entity.obj = loggedInUser.agency;
								entity.redirectState = "app.agency.home";
								break;
							case 'P':
								entity.obj = loggedInUser.passenger;
								entity.redirectState = "app.passenger.home";
								break;
						}
						return entity;
					});
				}
				return entity;
			};

			var getBaseUrl = function() {
				var baseUrl = APP_CONFIG.BASE_URL;

				if(loggedInUser && loggedInUser.roles) {
					_.each(loggedInUser.roles, function(role) {
						switch(role.name) {
							case 'RA':
								baseUrl = supplant("{0}/{1}/{2}", [APP_CONFIG.BASE_URL, APP_CONFIG.ROOT_URL, loggedInUser.id]);
								break;
							case 'HA':
							case 'HT':
							case 'HF':
								baseUrl = supplant("{0}/{1}/{2}", [APP_CONFIG.BASE_URL, APP_CONFIG.HOST_URL, loggedInUser.host.id]);
								break;
							case 'CA':
							case 'CT':
							case 'CF':
								baseUrl = supplant("{0}/{1}/{2}", [APP_CONFIG.BASE_URL, APP_CONFIG.CLIENT_URL, loggedInUser.client.id]);
								break;
							case 'AA':
							case 'AT':
							case 'AF':
								baseUrl = supplant("{0}/{1}/{2}", [APP_CONFIG.BASE_URL, APP_CONFIG.AGENCY_URL, loggedInUser.agency.id]);
								break;
							case 'P':
								baseUrl = supplant("{0}/{1}/{2}", [APP_CONFIG.BASE_URL, APP_CONFIG.PASSENGER_URL, loggedInUser.id]);
								break;
						}
						return baseUrl;
					});
				}
				return baseUrl;
			};

			return {
				login           : login,
				logout          : logout,
				isAuthenticated : isAuthenticated,
				isAuthorized    : isAuthorized,
				currentUser     : currentUser,
				getBaseUrl      : getBaseUrl,
				getEntity       : getEntity,
			};
		}
	]);
});