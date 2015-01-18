/**
* Client Cost Policy
*
* @description :: Represents a Client Cost Policy
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
		serviceType: {
			type: 'string',
			enum: ['F', 'P'],
			defaultsTo: 'P'
		},
		costPerVehicle: 'decimal',
		costPerPassenger: 'decimal',
		discount: {
			type: 'float',
			is_percentage: true
		},
		client: {
			model: 'Client'
		}
	}
};

