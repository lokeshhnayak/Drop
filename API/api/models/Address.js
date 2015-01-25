/**
* Address
*
* @description :: Represents an Address
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	schema: true,

	seedData: require('./seed/addresses.json'),

	attributes: {
 		addressLine1: {
 			type: 'string',
 			required: true
 		},
 		addressLine2: 'string',
 		city: 'string',
 		state: 'string',
 		country: 'string',
 		pincode: 'string',
 		users: {
 			collection: 'User',
 			via: 'address'
 		},
 		clients: {
 			collection: 'Client',
 			via: 'address'
 		},
 		agencies: {
 			collection: 'Agency',
 			via: 'address'
 		},
 		hosts: {
 			collection: 'Host',
 			via: 'address'
 		}
	}
};

