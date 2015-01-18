/**
* Vehicle
*
* @description :: Represents a Vehicle
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	schema: true,

	seedData: require('./seed/vehicles.json'),

	attributes: {
		description: 'string',
		passengerCapacity: 'integer',
		registrationNumber: {
			type: 'string',
			required: true
		},
		vehicleType: {
			type: 'string',
			enum: ['Car', 'Bus', 'Van'],
			defaultsTo: 'Bus'
		},
		client: {
			model: 'Client'
		},
		routes: {
			collection: 'Route',
			via: 'vehicles',
			dominant: true
		}
	}
};

