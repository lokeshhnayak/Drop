define([
	'auth/module',           // Angular Module for WebArtists VTSS app.
	'common/utils/supplant', // Supplant
	'lodash',                // Lodash Library
	'satellizer'
],
function(module, supplant) {

	'use strict';

	module.registerService('AuthService', [
		'$auth',
		'$rootScope',
		'_',
		'Logger',
		'USER_ROLES',
		function ($auth, $rootScope, _, Logger, USER_ROLES) {
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
								break;
							case 'HA':
							case 'HT':
							case 'HF':
								redirectState = "app.host.home";
								break;
							case 'CA':
							case 'CT':
							case 'CF':
								redirectState = "app.client.home";
								break;
							case 'AA':
							case 'AT':
							case 'AF':
								redirectState = "app.agency.home";
								break;
							case 'P':
								redirectState = "app.passenger.home";
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