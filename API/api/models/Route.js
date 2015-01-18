/**
* Route
*
* @description :: Represents a Route
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	schema: true,

	attributes: {
		routeId: {
			type: 'string',
			required: true
		},
		description: 'string',
		stopSequence: {
			type: 'int',
			required: true,
		},
		client: {
			model: 'Client'
		},
		timings: {
			collection: 'Timing',
			via: 'route'
		},
		vehicles: {
			collection: 'Vehicle',
			via: 'routes'
		}
	}
};

