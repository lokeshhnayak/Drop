define([
	'auth/module',           // Angular Module for WebArtists VTSS app.
	'common/utils/supplant', // Supplant
	'lodash',                // Lodash Library
	'restangular',           // Restangular
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
		'Restangular',
		function ($auth, $rootScope, _, Logger, USER_ROLES, APP_CONFIG, Restangular) {
			var logger = Logger.getInstance('AuthService');
			var loggedInUser;
			logger.info("In AuthService");

			var login = function (user) {
				return $auth.login(user)
					.then(function(response) {
						loggedInUser = response.data.user;
						response.data.redirectState = getRedirectState();
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

			var getRedirectState = function () {
				var redirectState = "app.login";
				if(loggedInUser && loggedInUser.roles) {
					_.each(loggedInUser.roles, function(role) {
						switch(role.name) {
							case 'RA':
								redirectState = "app.root.home";
								Restangular.setBaseUrl(supplant("{0}/{1}/{2}", [APP_CONFIG.BASE_URL, APP_CONFIG.ROOT_URL, loggedInUser.id]));
								break;
							case 'HA':
							case 'HT':
							case 'HF':
								redirectState = "app.host.home";
								Restangular.setBaseUrl(supplant("{0}/{1}/{2}", [APP_CONFIG.BASE_URL, APP_CONFIG.HOST_URL, loggedInUser.id]));
								break;
							case 'CA':
							case 'CT':
							case 'CF':
								redirectState = "app.client.home";
								Restangular.setBaseUrl(supplant("{0}/{1}/{2}", [APP_CONFIG.BASE_URL, APP_CONFIG.CLIENT_URL, loggedInUser.id]));
								break;
							case 'AA':
							case 'AT':
							case 'AF':
								redirectState = "app.agency.home";
								Restangular.setBaseUrl(supplant("{0}/{1}/{2}", [APP_CONFIG.BASE_URL, APP_CONFIG.AGENCY_URL, loggedInUser.id]));
								break;
							case 'P':
								redirectState = "app.passenger.home";
								Restangular.setBaseUrl(supplant("{0}/{1}/{2}", [APP_CONFIG.BASE_URL, APP_CONFIG.PASSENGER_URL, loggedInUser.id]));
								break;
						}
						return redirectState;
					});

					return redirectState;
				}
			};

			return {
				login            : login,
				logout           : logout,
				isAuthenticated  : isAuthenticated,
				isAuthorized     : isAuthorized,
				currentUser      : currentUser,
				getRedirectState : getRedirectState
			};
		}
	]);
});