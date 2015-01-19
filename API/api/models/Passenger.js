/**
* Passenger
*
* @description :: Represents an Passenger
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	schema: true,

	seedData: require('./seed/passengers.json'),

	attributes: {
 		status: {
			type: 'string',
			enum: ['A', 'I'], // A = Active, I = Inactive
			defaultsTo: 'I'
		},
		client: {
			model: 'Client'
		},
		pickupRoute: {
			model: 'Route'
		},
		pickupStop: {
			model: 'Stop'
		},
		dropRoute: {
			model: 'Route'
		},
		dropStop: {
			model: 'Stop'
		},
		user: {
			model: 'User',
			via: 'passenger'
		}
	}
};

