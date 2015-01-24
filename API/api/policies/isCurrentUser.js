'use strict';

/**
 * isCurrentUser
 *
 * @module      :: Policy
 * @description :: Checks if the requested user is the current logged in user
 *
 * @docs        :: http://waterlock.ninja/documentation
 */
module.exports = function(req, res, next) {
	return function (req, res, next) {

		if(!req.currentUser) {
			return res.forbidden("User not found or unauthorized");
		}

		var userId = req.params.id;

		if(!userId) {
			return res.forbidden("User id not found in requested parameters");
		}

		return userId === req.currentUser.id;
	}
};
