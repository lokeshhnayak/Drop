/**
 * ConfigLookupController
 *
 * @description :: Server-side logic for managing Configlookups
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	find: function (req, res) {

		var params = req.params.all();

		var valueType = params.valueType;
		var lookupType = params.lookupType;

		console.log(req.params.all());

		if(!valueType) {
			res.send({success: false, message: "valueType is required"});
		}

		if(!lookupType) {
			lookupType = 'Dropdown';
		}

		ConfigLookup.find({valueType: valueType, lookupType: lookupType})
			.exec(function(err, configValues) {
				if(err) {
					return res.send({success: false, message: err});
				}
				return res.send(configValues);
			})
	}
};

