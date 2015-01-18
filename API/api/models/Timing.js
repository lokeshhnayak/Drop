/**
* Timing
*
* @description :: Represents a Timing
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	schema: true,

	attributes: {
		day: {
			type: 'string',
			enum: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
			defaultsTo: 'Mon'
		},
		pickupStartTime: {
			type: 'datetime',
			required: true
		},
		pickupEndTime: {
			type: 'datetime',
			required: true
		},
		dropStartTime: {
			type: 'datetime',
			required: true
		},
		dropEndTime: {
			type: 'datetime',
			required: true
		},
		route: {
			model: 'Route'
		}
	}
};

