define([
	'agency/common/module',                            // Angular Module for WebArtists VTSS app.
	'common/utils/supplant',                           // Supplant
	'common/utils/Utils',                              // Utils Library
	'lodash',                                          // Lodash Library
	'agency/common/resources/AgencyRestangularFactory' // AgencyRestangularFactory Service
],
function(module, supplant) {

	'use strict';

	module.registerService('UsersService', [
		'$q',
		'_',
		'Logger',
		'AgencyRestangularFactory',
		function ($q, _, Logger, AgencyRestangularFactory) {
			var logger = Logger.getInstance('UsersService');
			logger.info("In UsersService");

			var API_NAME = "users";
			var Users = AgencyRestangularFactory.getService(API_NAME);

			var getUsers = function () {
				return Users.getList();
			};

			var createUser = function (user) {
				return Users.post(user)
					.then(function(updatedAgency) {
						return AgencyRestangularFactory.restangularizeCollection(updatedAgency.users, API_NAME);
					});
			};

			var updateUser = function (user) {
				return user.save();
			};

			var deleteUser = function (user) {
				return user.remove();
			};

			var copyUser = function (user) {
				return AgencyRestangularFactory.copy(user);
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