'use strict';

var _ = require("lodash");

/**
 * authorizeAction
 *
 * @module      :: Policy
 * @description :: Authorize an action based on user permissions
 */
module.exports = function authorizeAction (permission) {
	return function (req, res, next) {

		if(!req.currentUser) {
			return res.forbidden("User not found or unauthorized");
		}

		AuthorizationHelper.authorizeRequest(req.currentUser.id, permission)
			.then(function(isAuthorized) {
				if(isAuthorized) {
					return next();
				} else {
					throw "Not Authorized";
				}
			})
			.catch(function(err) {
				waterlock.logger.debug(err);
				res.forbidden(err);
			});

		/*var user = req.session.user;

		console.log(req.currentUser);

		if(!user) {
			var access_token = req.headers.access_token;

			Jwt.findOneByToken(access_token)
				.populate("owner")
				.then(function(tokenWithUser) {
					if(!tokenWithUser) {
						waterlock.logger.debug("User not found");
						return res.forbidden("User not found");
					}

					Authorize(tokenWithUser.owner.id, permission);
				});
		} else {
			Authorize(user.id, permission);
		}

		function Authorize(userId, permission) {
			AuthorizationHelper.authorizeRequest(userId, permission)
				.then(function(isAuthorized) {
					if(isAuthorized) {
						return next();
					} else {
						throw "Not Authorized";
					}
				})
				.catch(function(err) {
					waterlock.logger.debug(err);
					res.forbidden(err);
				});
		} */
	}
}