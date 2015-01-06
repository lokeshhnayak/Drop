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
		function ($auth, $rootScope, _, Logger) {
			var logger = Logger.getInstance('AuthService');
			logger.info("In AuthService");

			var login = function (user) {
				return $auth.login(user)
					.then(function(response) {
						$rootScope.user = response.data.user;
						return response.data;
					});
			};

			var logout = function () {
				return $auth.logout()
					.then(function(response) {
						return response;
					});
			};

			return {
				login : login,
				logout : logout
			};
		}
	]);
});