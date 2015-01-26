/**
 * AgencyController
 *
 * @description :: Server-side logic for managing Agencies
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
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

