/**
 * AgencyController
 *
 * @description :: Server-side logic for managing Agencies
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */


var _ = require("lodash");

module.exports = {
	getAgencyUsers: function(req, res) {
		var params = req.params.all();
		if(!params.parentid) {
			return res.serverError("Agency Id not found");
		}
		Agency.findOne(params.parentid)
			.populate("users")
			.then(function(agencyWithUsers) {
				var userIds = _.pluck(agencyWithUsers.users, "id");
				return User.find()
					.where({id: userIds})
					.populate("roles")
					.populate("address");
			})
			.then(function(userWithRoles) {
				return res.send(userWithRoles);
			})
			.catch(function(err) {
				res.serverError(err);
			});
	},
	findOne: function(req, res) {
		var params = req.params.all();
		Agency.findOne(params.id)
			.populate("address")
			.then(function(agency) {
				return res.send(agency);
			})
			.catch(function(err) {
				return res.serverError(err);
			});
	}
};

