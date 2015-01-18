/**
 * PostController - This is only for test purposes - Santhosh
 *
 * @description :: Server-side logic for managing Posts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	restricted: function(req, res) {
		return res.json({
			message: "This is restricted!"
		});
	},
	open: function(req, res) {
		return res.json({
			message: "This is open for all"
		});
	},
	jwt: function(req, res) {
		return res.json({
			message: "JWT is present",
			user: req.currentUser
		});
	},
	currentUser: function(req, res) {
		return res.json({
			user: global.waterlock.cycle.user
		});
	}
};

