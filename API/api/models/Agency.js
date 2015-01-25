/**
* Agency
*
* @description :: Represents a Agency
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	schema: true,

	seedData: require('./seed/agencies.json'),

	attributes: {
		name: {
			type: 'string',
			required: true
		},
		description: 'string',
		agencyStatus: {
			type: 'string',
			enum: ['Prospect', 'Active', 'Inactive'],
			defaultsTo: 'Prospect'
		},
		address: {
			model: 'Address'
		},
		client: {
			collection: 'Client',
			via: 'agency'
		},
		host: {
			model: 'Host'
		},
		users: {
			collection: 'User',
			via: 'agency'
		}
	}
};

