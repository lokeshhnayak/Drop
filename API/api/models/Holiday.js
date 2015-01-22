/**
* Route
*
* @description :: Represents a Route
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	schema: true,

	seedData: require('./seed/holidays.json'),

	attributes: {
		dateFrom: {
			type: 'date',
			required: true
		},
		dateTo: {
			type: 'date',
			required: true
		},
		description: 'string',
		name: {
			type: 'string',
			required: true
		},
		client: {
			model: 'Client'
		}
	}
};

