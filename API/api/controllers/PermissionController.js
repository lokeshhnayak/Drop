/**
 * PermissionController
 *
 * @description :: Server-side logic for managing Permissions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	find: function(req, res) {
		Permission.find({api: { '!': 'NA'}})
			.then(function(permissions) {
				return res.send(permissions);
			})
			.catch(function(err){
				return res.serverError(err);
			});
	}
};

