define([
	'client/common/module',                            // Angular Module for WebArtists VTSS app.
	'common/utils/supplant',                           // Supplant
	'common/utils/Utils',                              // Utils Library
	'lodash',                                          // Lodash Library
	'client/common/resources/ClientRestangularFactory' // ClientRestangularFactory Service
],
function(module, supplant) {

	'use strict';

	module.registerService('UsersService', [
		'$q',
		'_',
		'Logger',
		'ClientRestangularFactory',
		'TableDefaults',
		function ($q, _, Logger, ClientRestangularFactory, TableDefaults) {
			var logger = Logger.getInstance('UsersService');
			logger.info("In UsersService");

			var API_NAME = "users";
			var Users = ClientRestangularFactory.getService(API_NAME);

			var getUsers = function () {
				return Users.getList();
			};

			var createHoliday = function (user) {
				return Users.post(user)
					.then(function(updatedClient) {
						return ClientRestangularFactory.restangularizeCollection(updatedClient.users, API_NAME);
					});
			};

			var updateUser = function (user) {
				return user.save();
			};

			var deleteUser = function (user) {
				return user.remove();
			};

			var copyUser = function (user) {
				return ClientRestangularFactory.copy(user);
			};

			return {
				getUsers   : getUsers,
				createUser : createUser,
				updateUser : updateUser,
				deleteUser : deleteUser,
				copyUser   : copyUser
			};
		}
	]);
});