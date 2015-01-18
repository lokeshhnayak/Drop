'use strict';
var _ = require("lodash");

/**
 * AuthorizationHelper
 *
 * @module      :: Services
 * @description :: Contains reusable authorization helpers.
 */
module.exports = {
	authorizeRequest: function(userId, permission) {
		return User.findOneById(userId)
			.populate("roles")
			.then(function(userWithRoles) {

				return Permission.findOne({name: permission})
					.populate("roles")
					.then(function(permissionWithRoles) {
						var authorized = false;
						var roles = _.pluck(userWithRoles.roles, "name")
						_.some(permissionWithRoles.roles, function(role) {
							if(roles.toString().indexOf(role.name) !== -1) {
								authorized = true;
								console.log(authorized);
							}
						})

						return authorized;
					});
			})
			.catch(function(err) {
				throw err;
			});
	}
};