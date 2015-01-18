/**
* Agency Cost Policy
*
* @description :: Represents a Agency Cost Policy
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	schema: true,

	types: {
		is_percentage: function(num) {
			return num >= 0 && num <= 100;
		}
	},

	attributes: {
		termStart: {
			type: 'date',
			required: true
		},
		termEnd: {
			type: 'date',
			required: true
		},
		agencyCommision: {
			type: 'float',
			is_percentage: true
		},
		bonus: 'decimal',
		agency: {
			model: 'Agency'
		}
	}
};

