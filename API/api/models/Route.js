/**
* Route
*
* @description :: Represents a Route
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	schema: true,

	seedData: require('./seed/routes.json'),

	attributes: {
		routeCode: {
			type: 'string',
			required: true
		},
		description: 'string',
		stops: {
			collection: 'Stop',
			via: 'route'
		},
		client: {
			model: 'Client'
		},
		timings: {
			collection: 'Timing',
			via: 'route'
		},
		routeType: {
			type: 'string',
			enum: ['P', 'D'],
			defaultsTo: 'P'
		},
		vehicles: {
			collection: 'Vehicle',
			via: 'routes'
		}
	}
};

