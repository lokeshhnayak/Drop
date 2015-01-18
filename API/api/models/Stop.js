/**
* Stop
*
* @description :: Represents a Stop
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	schema: true,

	types: {
		is_point: function(geoLocation) {
			return geoLocation.x && geoLocation.y;
		}
	},

	attributes: {
		name: {
			type: 'string',
			required: true
		},
		description: 'string',
		type: {
			type: 'string',
			enum: ['P', 'D'], // P - Pickup, D - Drop
			defaultsTo: 'P'
		},
		stopSequence: {
			type: 'int',
			required: true,
		},
		location: {
			type: 'json',
			is_point: true
		},
		route: {
			model: 'Route'
		}
	}
};

